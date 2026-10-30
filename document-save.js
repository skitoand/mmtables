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
  return {createQueue, createDraftStore};
});
