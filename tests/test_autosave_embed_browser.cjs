// SFERA_REPO=/path/to/knowledge-base PLAYWRIGHT_MODULE=/path/to/playwright node tests/test_autosave_embed_browser.cjs
const assert=require('node:assert/strict'),{spawn}=require('node:child_process'),path=require('node:path');
const playwright=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const fixture=spawn('python3',[path.join(__dirname,'autosave_embed_fixture.py')],{env:process.env,stdio:['pipe','pipe','pipe']});
 let errors='';fixture.stderr.on('data',b=>errors+=b);
 const config=await new Promise((resolve,reject)=>{let buf='';fixture.stdout.on('data',b=>{buf+=b;for(const line of buf.split('\n'))if(line.startsWith('{')){try{resolve(JSON.parse(line));return}catch{}}});fixture.on('exit',code=>reject(Error(`Fixture exited ${code}: ${errors}`)));setTimeout(()=>reject(Error(errors||'Fixture timeout')),20000).unref()});
 try{for(const engine of (process.env.TEST_ENGINES||'webkit,firefox').split(',')){
  await fetch(`http://127.0.0.1:${config.mmPort}/__test/reset`,{method:'POST'});
  const browser=await playwright[engine].launch({headless:true});
  try{
   const context=await browser.newContext({viewport:{width:1400,height:1000}});
   await context.addCookies([{name:'kb_session',value:'embed-session',domain:'sfera.crystalsystems.ru',path:'/',secure:true,sameSite:'Lax'}]);
   let hold=false,release=null,offline=false,active=0,maxActive=0,posts=0,activations=0,conflicts=0;
   await context.route('https://**/*',async route=>{
    const req=route.request(),u=new URL(req.url()),port=u.hostname==='sfera.crystalsystems.ru'?config.kbPort:u.hostname==='mmtable.crystalsystems.ru'?config.mmPort:null;
    if(!port)return route.abort();
    const save=u.hostname==='mmtable.crystalsystems.ru'&&u.pathname==='/api/layout'&&req.method()==='POST';
    if(u.hostname==='mmtable.crystalsystems.ru'&&/\/activate$/.test(u.pathname))activations++;
    if(save){posts++;active++;maxActive=Math.max(maxActive,active);if(offline){active--;return route.abort('failed')}}
    try{
     const headers=await req.allHeaders(),cookies=await context.cookies(u.origin);headers.cookie=cookies.map(c=>c.name+'='+c.value).join('; ');
     const response=await route.fetch({headers,url:`http://127.0.0.1:${port}${u.pathname}${u.search}`,maxRedirects:0});
     if(save&&response.status()===409)conflicts++;
     if(save&&hold){hold=false;await new Promise(r=>release=r);release=null}
     if(response.status()>=300&&response.status()<400){
      for(const h of response.headersArray().filter(h=>h.name.toLowerCase()==='set-cookie')){const pair=h.value.split(';')[0],eq=pair.indexOf('=');await context.addCookies([{name:pair.slice(0,eq),value:pair.slice(eq+1),domain:u.hostname,path:'/',secure:true,sameSite:'Lax'}])}
      return route.fulfill({status:200,contentType:'text/html',body:'<script>location.replace('+JSON.stringify(new URL(response.headers().location,u.origin).href)+')</script>'});
     }
     await route.fulfill({response});
    }finally{if(save)active--}
   });
   const page=await context.newPage();page.setDefaultTimeout(15000);page.on('dialog',d=>d.accept());page.on('pageerror',e=>console.error(engine,e.message));
   await page.goto('https://sfera.crystalsystems.ru/test-host');
   const iframe=page.locator('.knowledge-mmtable-portal iframe');await iframe.waitFor();
   let frame=await iframe.elementHandle().then(e=>e.contentFrame());
   const ready=async()=>frame.waitForFunction(()=>typeof currentDocumentId!=='undefined'&&currentDocumentId==='abcdef123456');await ready();
   await frame.locator('.doc-mode-btn[data-mode="edit"]').click();await frame.waitForFunction(()=>canEditCurrentDocument());
   await frame.evaluate(()=>{createShapeRectangle({text:'initial',x:1100,y:1100,width:300,height:160});scheduleLayoutSave({immediate:true})});
   await frame.waitForFunction(()=>!documentSaveQueue.isBusy(documentSaveKey())&&!pendingPersistTimer);
   const edit=async text=>{await frame.evaluate(()=>startInlineShapeEditing(document.querySelector('.shape-rect')));await frame.locator('.shape-rect .shape-text[contenteditable="true"]').fill(text)};
   const saved=()=>frame.evaluate(async()=>await (await fetch('/api/docs/abcdef123456')).json());
   // A real multi-megabyte document must save even when localStorage is full.
   await frame.evaluate(()=>{
    documentSheetsState.push({id:2,name:'Large fixture',layout:{...createBlankLayout(),shapes:[{...readShapeData(document.querySelector('.shape-rect')),id:'large-fixture',text:'X'.repeat(8*1024*1024)}]}});
    let quotaReached=false;
    for(let i=0;i<200;i++){try{localStorage.setItem('quota-fixture-'+i,'Q'.repeat(128*1024))}catch{quotaReached=true;break}}
    if(!quotaReached)throw Error('Fixture did not fill localStorage');
    try{localStorage.setItem('oversized-fixture',JSON.stringify(buildDocumentLayoutPayload()))}catch{return}
    throw Error('Large payload unexpectedly fit into localStorage');
   });
   // Hold the first response after the real server accepts it; type through two autosave intervals.
   hold=true;await edit('SAVE A');const saveDeadline=Date.now()+20000;while(!release){if(Date.now()>saveDeadline)throw Error('Autosave never reached the server');await page.waitForTimeout(30)}
   const baselinePosts=posts;
   assert.equal(await frame.evaluate(()=>documentDrafts.flush(documentSaveKey())),true);
   assert.equal(await frame.evaluate(()=>documentDrafts.state(documentSaveKey())),'indexeddb');
   assert.equal(await frame.locator('#document-save-notice[data-reason="storage"]').count(),0);

   await edit('SAVE B');await page.waitForTimeout(850);assert.equal(posts,baselinePosts,'No second POST before the first acknowledgement');
   await edit('SAVE C — latest');await page.waitForTimeout(850);assert.equal(posts,baselinePosts);
   release();await frame.waitForFunction(()=>!documentSaveQueue.isBusy(documentSaveKey())&&!pendingPersistTimer);
   assert.equal(maxActive,1);assert.equal(conflicts,0);assert.match(JSON.stringify((await saved()).document.layout),/SAVE C — latest/);
   // Parent shell re-render must preserve this exact iframe, text and save coordinator.
   await frame.evaluate(()=>window.__saveContinuity='retained');await page.evaluate(()=>{document.querySelector('#app').innerHTML=__embedTest.render();__embedTest.layout();__embedTest.mount()});assert.equal(await frame.evaluate(()=>window.__saveContinuity),'retained');
   // A real external version change yields 409; no /activate or canvas replacement follows.
   await frame.evaluate(()=>fetch('/__test/advance',{method:'POST'}));const activationBase=activations;
   await edit('LOCAL CONFLICT');await frame.locator('#document-save-notice').waitFor();
   assert.equal(conflicts,1);assert.equal(activations,activationBase);assert.match(await frame.locator('.shape-rect .shape-text').innerText(),/LOCAL CONFLICT/);
   await edit('LOCAL NEWEST after conflict');await page.waitForTimeout(850);
   assert.match(await frame.evaluate(()=>JSON.stringify(documentDrafts.read(documentSaveKey()).layout)),/LOCAL NEWEST/);
   assert.match(JSON.stringify((await saved()).document.layout),/SERVER VERSION/);
   await page.screenshot({path:`/private/tmp/mmtable-safe-conflict-${engine}.png`});
   await frame.evaluate(()=>documentDrafts.flush(documentSaveKey()));
   // Reload the embedded app, then explicitly restore the draft. The newer server remains untouched.
   await frame.goto('https://mmtable.crystalsystems.ru/d/abcdef123456?embed=sfera');await ready();
   await frame.locator('[data-document-save-action="restore"]').waitFor();
   await frame.locator('[data-document-save-action="restore"]').click();
   await frame.waitForFunction(()=>documentSaveQueue.isBlocked(documentSaveKey()));
   assert.match(await frame.locator('.shape-rect .shape-text').innerText(),/LOCAL NEWEST/);
   assert.match(JSON.stringify((await saved()).document.layout),/SERVER VERSION/);
   await frame.locator('[data-document-save-action="copy"]').click();
   await frame.waitForFunction(()=>currentDocumentId&&currentDocumentId!=='abcdef123456');
   await frame.waitForFunction(()=>canEditCurrentDocument());
   const copyId=await frame.evaluate(()=>currentDocumentId);
   const copy=await frame.evaluate(async()=>await (await fetch('/api/docs/'+currentDocumentId)).json());assert.match(JSON.stringify(copy.document.layout),/LOCAL NEWEST/);
   // Switching documents saves before releasing the lock.
   await edit('COPY LAST CHANGE');await frame.evaluate(()=>openDocumentById('abcdef123456',{mode:'view'}));await ready();
   const copyAfter=await frame.evaluate(async id=>await (await fetch('/api/docs/'+id)).json(),copyId);assert.match(JSON.stringify(copyAfter.document.layout),/COPY LAST CHANGE/);
   await frame.locator('.doc-mode-btn[data-mode="edit"]').click();await frame.waitForFunction(()=>canEditCurrentDocument());
   offline=true;await edit('NETWORK DRAFT');await frame.locator('#document-save-notice').waitFor();
   assert.match(await frame.locator('.shape-rect .shape-text').innerText(),/NETWORK DRAFT/);
   assert.match(await frame.evaluate(()=>JSON.stringify(documentDrafts.read(documentSaveKey()).layout)),/NETWORK DRAFT/);
   offline=false;await frame.locator('[data-document-save-action="retry"]').click();
   await frame.waitForFunction(()=>!documentDrafts.read(documentSaveKey())&&!documentSaveQueue.isBusy(documentSaveKey()));assert.match(JSON.stringify((await saved()).document.layout),/NETWORK DRAFT/);
   assert.equal(maxActive,1);
   await frame.evaluate(()=>requestDocumentViewMode());
   const standalone=await context.newPage();standalone.on('console',m=>{if(m.type()==='error')console.error('standalone:',m.text())});await standalone.goto('https://mmtable.crystalsystems.ru/d/abcdef123456');
   await standalone.waitForFunction(()=>typeof currentDocumentId!=='undefined'&&currentDocumentId==='abcdef123456');
   await standalone.evaluate(()=>requestDocumentEditMode());await standalone.waitForFunction(()=>canEditCurrentDocument());
   await standalone.evaluate(()=>startInlineShapeEditing(document.querySelector('.shape-rect')));
   await standalone.locator('.shape-rect .shape-text[contenteditable="true"]').fill('STANDALONE SAVE');
   await standalone.waitForFunction(()=>!pendingPersistTimer&&!documentSaveQueue.isBusy(documentSaveKey())&&!documentDrafts.read(documentSaveKey()));
   assert.match(JSON.stringify(await standalone.evaluate(async()=>await (await fetch('/api/docs/'+currentDocumentId)).json())),/STANDALONE SAVE/);
   assert.equal(await standalone.locator('#document-save-notice[data-reason="storage"]').count(),0);
   await standalone.close();
   console.log(engine+': actual Sfera iframe; delayed A/B/C saves serialized; real 409 preserves text/no reload; newest draft restored after reload; copy leaves server original intact; save-before-unlock switch; offline/retry; standalone editor; 8 MiB document, full localStorage, real IndexedDB draft/reload, no false storage warning — passed');
  }finally{await browser.close()}
 }}finally{fixture.stdin.end();await new Promise(r=>fixture.on('exit',r))}
})().catch(e=>{console.error(e);process.exitCode=1});
