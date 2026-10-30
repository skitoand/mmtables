// SFERA_REPO=/path/to/knowledge-base PLAYWRIGHT_MODULE=/path/to/playwright node tests/test_autosave_embed_browser.cjs
const assert=require('node:assert/strict'),{spawn}=require('node:child_process'),path=require('node:path');
const playwright=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const fixture=spawn('python3',[path.join(__dirname,'autosave_embed_fixture.py')],{env:process.env,stdio:['pipe','pipe','pipe']});
 let errors='';fixture.stderr.on('data',b=>errors+=b);
 const config=await new Promise((resolve,reject)=>{let buf='';fixture.stdout.on('data',b=>{buf+=b;for(const line of buf.split('\n'))if(line.startsWith('{')){try{resolve(JSON.parse(line));return}catch{}}});fixture.on('exit',code=>reject(Error(`Fixture exited ${code}: ${errors}`)));setTimeout(()=>reject(Error(errors||'Fixture timeout')),20000).unref()});
 try{for(const engine of (process.env.TEST_ENGINES||'webkit,firefox').split(',')){
  await fetch(`http://127.0.0.1:${config.mmPort}/__test/reset`,{method:'POST'});
  const browser=await playwright[engine].launch({headless:true});let closing=false;
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
    }catch(error){if(!closing)throw error}finally{if(save)active--}
   });
   const page=await context.newPage();page.setDefaultTimeout(15000);page.on('dialog',d=>d.accept());page.on('pageerror',e=>console.error(engine,e.message));
   await page.goto('https://sfera.crystalsystems.ru/test-host');
   const iframe=page.locator('.knowledge-mmtable-portal iframe');await iframe.waitFor();
   let frame=await iframe.elementHandle().then(e=>e.contentFrame());
   const ready=async()=>frame.waitForFunction(()=>typeof currentDocumentId!=='undefined'&&currentDocumentId==='abcdef123456');await ready();
   await frame.locator('.doc-mode-btn[data-mode="edit"]').click();await frame.waitForFunction(()=>canEditCurrentDocument());

   const result=await frame.evaluate(()=>{
    const check=(ok,message)=>{if(!ok)throw Error(message)};
    const styleFields=['color','width','lineStyle','opacity','shadow','startArrowShape','endArrowShape','routeStyle','gapStart','gapEnd'];
    const readStyle=c=>Object.fromEntries(styleFields.map(k=>[k,c[k]]));
    const root=createShapeRectangle({text:'ЛПР',x:1100,y:1100,width:200,height:80});
    setNodePosition(root,1100,1100);
    const first=spawnLinkedShapeFromAnchor(root,'e');

    const initial=findMindMapConnectorBetween(root,first);
    check(initial.startArrowShape==='line'&&initial.endArrowShape==='line','New mindmap link must have no arrows');
    Object.assign(initial,{color:'#7c3aed',width:5,lineStyle:'dashed',opacity:.6,shadow:3,startArrowShape:'open',endArrowShape:'line',routeStyle:'orthogonal-horizontal',gapStart:0,gapEnd:36,labelText:'DO NOT COPY'});
    const expected=JSON.stringify(readStyle(initial));
    const next=spawnLinkedShapeFromAnchor(root,'s');
    check(JSON.stringify(readStyle(findMindMapConnectorBetween(root,next)))===expected,'Sibling must inherit entire connector style, even when bottom plus continues a right-hand stack');
    const nested=spawnLinkedShapeFromAnchor(first,'e');
    check(JSON.stringify(readStyle(findMindMapConnectorBetween(first,nested)))===expected,'First nested child must inherit incoming branch style');
    check(!findMindMapConnectorBetween(first,nested).labelText,'Do not copy connector label contents');
    const nested2=spawnLinkedShapeFromAnchor(nested,'s');
    check(JSON.stringify(readStyle(findMindMapConnectorBetween(nested,nested2)))===expected,'Style must survive further nested levels');
    // Existing connector style must survive explicit geometry/layout updates.
    updateMindMapLinkStyle(root,first,'e',initial.routeStyle);
    check(JSON.stringify(readStyle(initial))===expected,'Relayout must preserve explicit arrowheads and zero/large gaps');
    initial.routeStyle='curve';initial.startArrowShape='line';initial.labelText='';initial.color='#1f2937';initial.width=2;initial.lineStyle='solid';initial.shadow=0;initial.opacity=1;
    const target=createShapeRectangle({text:'JTBD',x:1470,y:1500,width:240,height:100});
    setNodePosition(target,1470,1500);
    const edgeConn={id:nextConnectorId(),from:{nodeId:getShapeEndpointId(root),anchor:'e'},to:{nodeId:getShapeEndpointId(target),anchor:'edge',rx:0,ry:.5},routeStyle:'curve',startArrowShape:'line',endArrowShape:'classic',gapStart:0,gapEnd:0};
    connectors.push(edgeConn);
    const state=getConnectorPathState(edgeConn);
    check(state.curve.c2.y===state.curve.p2.y&&state.curve.c2.x<state.curve.p2.x,'Left-edge arrow must approach horizontally from outside, even when source is far above');
    // Exercise the ordinary connector creation path using actual DOM hit testing.
    const box=root.getBoundingClientRect();
    connectorDraft={fromNodeId:getShapeEndpointId(target),fromAnchor:'n'};
    styleClipboard=null;
    finishConnectorDraft({clientX:box.left+box.width/2,clientY:box.top+box.height/2});
    const ordinary=connectors[connectors.length-1];
    check(ordinary!==edgeConn,'Actual drop must create ordinary connector');
    check(ordinary.startArrowShape==='line'&&ordinary.endArrowShape==='line','Ordinary connector default must have no arrows');
    selectedConnector=edgeConn.id;fpResetBtn.click();
    check(edgeConn.startArrowShape==='line'&&edgeConn.endArrowShape==='line','Reset connector style must also remove arrows');
    renderConnectors();
    const path=document.querySelector(`[data-connector-id="${initial.id}"] .conn-line`);
    check(path?.getAttribute('marker-start')==='none'&&path?.getAttribute('marker-end')==='none','No SVG arrow markers on plain connection');
    scheduleLayoutSave({immediate:true});
    return {expected,rootId:getShapeEndpointId(root),nextId:getShapeEndpointId(next),nestedId:getShapeEndpointId(nested),edgeId:edgeConn.id};
   });
   await frame.waitForFunction(()=>!pendingPersistTimer&&!documentSaveQueue.isBusy(documentSaveKey()));
   await page.screenshot({path:`/private/tmp/mmtable-mindmap-${engine}.png`});
   await frame.goto('https://mmtable.crystalsystems.ru/d/abcdef123456?embed=sfera');await ready();
   await frame.waitForFunction(({rootId,nextId})=>connectors.some(c=>c.from.nodeId===rootId&&c.to.nodeId===nextId),result);
   assert.equal(await frame.evaluate(({rootId,nextId,expected})=>{
    const c=connectors.find(c=>c.from.nodeId===rootId&&c.to.nodeId===nextId);
    const fields=['color','width','lineStyle','opacity','shadow','startArrowShape','endArrowShape','routeStyle','gapStart','gapEnd'];
    return JSON.stringify(Object.fromEntries(fields.map(k=>[k,c[k]])))===expected;
   },result),true,'Inherited style survives server save and reload');
   console.log(engine+': real Sfera iframe; sibling/nested connector style inheritance; arrows/zero gaps preserved; default/reset no arrows; free-edge perpendicular curve; server save/reload — passed');

   await frame.evaluate(()=>requestDocumentEditMode());await frame.waitForFunction(()=>canEditCurrentDocument());
   const placementFixture=await frame.evaluate(({rootId})=>{
    const root=getConnectableById(rootId),[prev,last]=getMindMapChildNodes(root);
    // Keep this real document fixture small enough to see the manually positioned row.
    desktop.querySelectorAll('.shape').forEach(node=>{if(![root,prev,last].includes(node))node.remove()});
    const keep=new Set([getShapeEndpointId(prev),getShapeEndpointId(last)]);
    const links=connectors.filter(c=>c.from.nodeId===rootId&&keep.has(c.to.nodeId));connectors.splice(0,connectors.length,...links);
    const place=(node,left,top,width,height,text)=>{
     node.style.width=width+'px';node.style.height=height+'px';setNodePosition(node,left,top);
     const el=node.querySelector('.shape-text');el.textContent=text;finishInlineShapeEditing(el);
    };
    place(root,1100,1100,220,100,'JTBD');
    place(prev,1420,1000,360,80,'Вернуть выручку, которая упала');
    place(last,1426,1103,348,110,'Вернуть прибыль, которая упала');
    renderConnectors();selectShape(root);
    return {rootId,previous:[prev,last].map(n=>({id:getShapeEndpointId(n),...getMindMapNodeRect(n)})),gap:last.offsetTop-prev.offsetTop-prev.offsetHeight};
   },result);
   const rootLocator=frame.locator(`[data-conn-id="${placementFixture.rootId}"]`);
   await rootLocator.click({position:{x:12,y:12}});
   await page.keyboard.down('Alt');
   await rootLocator.locator('.conn-plus[data-anchor="e"]').click();
   await page.keyboard.up('Alt');
   const third=await frame.evaluate(({rootId,previous,gap})=>{
    const root=getConnectableById(rootId),children=getMindMapChildNodes(root);
    if(children.length!==3)throw Error('Plus must add exactly one child');
    for(const before of previous){const now=getMindMapNodeRect(getConnectableById(before.id));for(const k of ['left','top','width','height'])if(now[k]!==before[k])throw Error('An existing block moved/resized: '+k)}
    const child=children[2],last=children[1];
    if(child.offsetLeft!==last.offsetLeft)throw Error('Narrow new block must keep last block left edge, not its center');
    if(child.offsetTop-last.offsetTop-last.offsetHeight!==gap)throw Error('Repeat measured edge gap');
    selectShape(root);
    return {id:getShapeEndpointId(child),...getMindMapNodeRect(child)};
   },placementFixture);
   // A different plus on the same parent continues the manually arranged sibling row.
   await rootLocator.click({position:{x:12,y:12}});
   await page.keyboard.down('Alt');
   await rootLocator.locator('.conn-plus[data-anchor="s"]').click();
   await page.keyboard.up('Alt');
   const fourth=await frame.evaluate(({fixture,third})=>{
    const children=getMindMapChildNodes(getConnectableById(fixture.rootId)),last=children[3];
    if(children.length!==4||last.offsetLeft!==third.left||last.offsetTop-third.top-third.height!==fixture.gap)throw Error('Subsequent plus must preserve edge alignment and gap');
    for(const before of fixture.previous){const now=getMindMapNodeRect(getConnectableById(before.id));for(const k of ['left','top','width','height'])if(now[k]!==before[k])throw Error('Later creation changed an existing block')}
    clearSelection();scheduleLayoutSave({immediate:true});
    return {id:getShapeEndpointId(last),...getMindMapNodeRect(last)};
   },{fixture:placementFixture,third});
   await frame.waitForFunction(()=>!pendingPersistTimer&&!documentSaveQueue.isBusy(documentSaveKey()));
   await page.screenshot({path:`/private/tmp/mmtable-placement-${engine}.png`});
   await frame.goto('https://mmtable.crystalsystems.ru/d/abcdef123456?embed=sfera');await ready();
   await frame.waitForFunction(id=>!!getConnectableById(id),fourth.id);
   assert.deepEqual(await frame.evaluate(id=>getMindMapNodeRect(getConnectableById(id)),fourth.id),{left:fourth.left,top:fourth.top,width:fourth.width,height:fourth.height},'Placement survives server save/reload');
   console.log(engine+': real parent plus buttons; manually aligned unequal-width siblings; third/fourth repeat left edge and 23px gap; existing nodes unchanged; placement survives server save/reload — passed');

  }finally{closing=true;await browser.close()}
 }}finally{fixture.stdin.end();await new Promise(r=>fixture.on('exit',r))}
})().catch(e=>{console.error(e);process.exitCode=1});
