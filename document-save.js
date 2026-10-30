/* Serial document saves and account/document-scoped recovery drafts. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DocumentSave = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  function createQueue({send, onSaved = () => {}, onError = () => {}}) {
    const states = new Map(), pending = new Map();
    let running = false, activeKey = null, idleWaiters = [];
    const state = key => {
      if (!states.has(key)) states.set(key, {version: null, blocked: null});
      return states.get(key);
    };
    async function drain() {
      if (running) return;
      running = true;
      try {
        while (pending.size) {
          const [key, batch] = pending.entries().next().value;
          pending.delete(key); activeKey = key;
          const s = state(key), base = s.version || batch.job.base;
          try {
            if (s.blocked) throw s.blocked;
            if (!base) throw Object.assign(new Error('baseUpdatedAt_required'), {status: 409});
            const result = await send(batch.job, base);
            if (!result?.updatedAt) throw new Error('save_ack_missing_version');
            s.version = String(result.updatedAt);
            onSaved(batch.job, base, result);
            batch.waiters.forEach(w => w.resolve(result));
          } catch (error) {
            if (error.status === 409) s.blocked = error;
            batch.waiters.forEach(w => w.reject(error));
            if (s.blocked && pending.has(key)) {
              pending.get(key).waiters.forEach(w => w.reject(error)); pending.delete(key);
            }
            onError(batch.job, error);
          } finally { activeKey = null; }
        }
      } finally {
        running = false; idleWaiters.splice(0).forEach(resolve => resolve());
      }
    }
    return {
      enqueue(job) {
        const s = state(job.key);
        if (s.blocked) return Promise.reject(s.blocked);
        const promise = new Promise((resolve, reject) => {
          const previous = pending.get(job.key);
          pending.set(job.key, {job, waiters: [...(previous?.waiters || []), {resolve, reject}]});
        });
        void drain();
        return promise;
      },
      version: key => state(key).version,
      setVersion(key, version) { const s = state(key); s.version = version ? String(version) : null; s.blocked = null; },
      block(key, error) { state(key).blocked = error; },
      isBlocked: key => !!state(key).blocked,
      isBusy: key => activeKey === key || pending.has(key),
      idle() { return running ? new Promise(resolve => idleWaiters.push(resolve)) : Promise.resolve(); }
    };
  }
  function createDraftStore(storage) {
    const storageKey = key => 'mmtable-recovery-v1:' + encodeURIComponent(key);
    const read = key => {
      try {
        const value = JSON.parse(storage.getItem(storageKey(key)) || 'null');
        return value?.schema === 1 && Array.isArray(value.layout?.sheets) && value.layout.sheets.length ? value : null;
      } catch { return null; }
    };
    const write = (key, value) => {
      try { storage.setItem(storageKey(key), JSON.stringify({...value, schema: 1})); return true; }
      catch { return false; }
    };
    const remove = key => { try { storage.removeItem(storageKey(key)); } catch {} };
    return {
      read, write, remove,
      acknowledge(key, layout, base, version) {
        const draft = read(key);
        if (!draft) return true;
        if (JSON.stringify(draft.layout) === JSON.stringify(layout)) { remove(key); return true; }
        // Newer keystrokes are descendants of this acknowledged snapshot.
        if (draft.base === base) write(key, {...draft, base: version});
        return false;
      }
    };
  }
  function createIndexedDBPersistence(factory) {
    let opening;
    function open() {
      if (!opening) opening = new Promise((resolve, reject) => {
        if (!factory) return reject(new Error('IndexedDB unavailable'));
        let request;
        const timer = setTimeout(() => reject(new Error('IndexedDB open timeout')), 4000);
        try { request = factory.open('mmtable-recovery', 1); } catch (error) { clearTimeout(timer); reject(error); return; }
        request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains('drafts')) request.result.createObjectStore('drafts'); };
        request.onerror = () => { clearTimeout(timer); reject(request.error); };
        request.onblocked = () => { clearTimeout(timer); reject(new Error('IndexedDB blocked')); };
        request.onsuccess = () => {
          clearTimeout(timer); const db = request.result;
          db.onversionchange = () => { db.close(); opening = null; };
          resolve(db);
        };
      });
      return opening;
    }
    async function transaction(mode, operation) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('drafts', mode), request = operation(tx.objectStore('drafts'));
        tx.oncomplete = () => resolve(request.result);
        tx.onerror = tx.onabort = () => reject(tx.error || request.error || new Error('Draft transaction failed'));
      });
    }
    return {read: key => transaction('readonly', store => store.get(key)),
      write: (key, value) => transaction('readwrite', store => store.put(value, key)),
      remove: key => transaction('readwrite', store => store.delete(key))};
  }
  function createPersistentDraftStore({storage, indexedDB, persistence, onError = () => {}, onChange = () => {}}) {
    const legacy = createDraftStore(storage), backend = persistence || createIndexedDBPersistence(indexedDB);
    const cache = new Map(), revisions = new Map(), states = new Map(), pending = new Map(), loads = new Map();
    let running = false, idleWaiters = [];
    const valid = value => value?.schema === 1 && Array.isArray(value.layout?.sheets) && value.layout.sheets.length;
    const read = key => cache.has(key) ? cache.get(key) : legacy.read(key);
    const revision = key => { const next = (revisions.get(key) || 0) + 1; revisions.set(key, next); return next; };
    const change = (key, status) => { states.set(key, status); onChange(key, status); };
    async function drain() {
      if (running) return;
      running = true;
      try {
        while (pending.size) {
          const [key, job] = pending.entries().next().value; pending.delete(key);
          let status, error;
          try {
            if (job.value) await backend.write(key, job.value); else await backend.remove(key);
            legacy.remove(key); status = job.value ? 'indexeddb' : 'removed';
          } catch (failure) {
            error = failure;
            if (job.value) status = legacy.write(key, job.value) ? 'localStorage' : 'failed';
            else { legacy.remove(key); status = 'removed'; }
          }
          if (revisions.get(key) === job.revision) {
            change(key, status);
            if (status === 'failed') onError(key, error);
          }
        }
      } finally { running = false; idleWaiters.splice(0).forEach(resolve => resolve()); }
    }
    const enqueue = (key, value) => {
      pending.set(key, {value, revision: revision(key)}); change(key, 'pending'); void drain();
    };
    const write = (key, value) => {
      const record = {...value, schema: 1}; cache.set(key, record); enqueue(key, record); return true;
    };
    const remove = key => { cache.set(key, null); enqueue(key, null); };
    return {
      read, write, remove,
      state: key => states.get(key) || (legacy.read(key) ? 'localStorage' : 'none'),
      isDurable: key => ['indexeddb', 'localStorage'].includes(states.get(key) || (legacy.read(key) ? 'localStorage' : 'none')),
      async load(key) {
        if (cache.has(key)) return read(key);
        if (!loads.has(key)) {
          const started = revisions.get(key) || 0;
          loads.set(key, (async () => {
            let saved;
            try { saved = await backend.read(key); } catch {}
            if ((revisions.get(key) || 0) !== started || cache.has(key)) return read(key);
            const old = legacy.read(key);
            const value = valid(saved) && (!old || String(saved.savedAt || '') >= String(old.savedAt || '')) ? saved : old;
            cache.set(key, value || null);
            if (value === old && old) write(key, old); // Migrate only after IndexedDB commits successfully.
            else change(key, value ? 'indexeddb' : 'none');
            return value || null;
          })().finally(() => loads.delete(key)));
        }
        return loads.get(key);
      },
      async flush(key) {
        if (running) await new Promise(resolve => idleWaiters.push(resolve));
        return !read(key) || this.isDurable(key);
      },
      acknowledge(key, layout, base, version) {
        const draft = read(key);
        if (!draft) return true;
        if (draft.layout === layout || JSON.stringify(draft.layout) === JSON.stringify(layout)) { remove(key); return true; }
        if (draft.base === base) write(key, {...draft, base: version});
        return false;
      }
    };
  }

  return {createQueue, createDraftStore, createPersistentDraftStore};
});
