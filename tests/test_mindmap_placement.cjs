const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(process.env.APP_JS||path.join(__dirname,'../app.js'),'utf8');
const context=vm.createContext({Math});
for(const name of ['getMindMapNodeRect','resolveMindMapSiblingAlignment','inferMindMapSiblingPlacement','positionFromMindMapSiblingPlacement']){
 const start=source.indexOf(`function ${name}(`);
 if(start<0&&name==='resolveMindMapSiblingAlignment')continue; // Also exercise the pre-fix production code.
 assert.notEqual(start,-1,name);vm.runInContext(source.slice(start,source.indexOf('\n}',start)+2),context);
}
const rect=(left,top,width,height)=>({offsetLeft:left,offsetTop:top,offsetWidth:width,offsetHeight:height});
const cases=[
 ['near-left edges, coincident centers',rect(500,200,640,80),rect(506,303,628,110),200,90,{axis:'y',direction:1,align:'left',gap:23},{left:506,top:436}],
 ['left-aligned very different widths',rect(500,200,900,80),rect(500,300,120,70),200,90,{axis:'y',direction:1,align:'left',gap:20},{left:500,top:390}],
 ['right alignment',rect(100,200,600,80),rect(500,300,200,70),150,90,{axis:'y',direction:1,align:'right',gap:20},{left:550,top:390}],
 ['true center alignment',rect(100,200,600,80),rect(300,310,200,120),100,90,{axis:'y',direction:1,align:'center',gap:30},{left:350,top:460}],
 ['near-top edges, coincident middle',rect(200,500,120,300),rect(345,506,160,288),90,80,{axis:'x',direction:1,align:'top',gap:25},{left:530,top:506}],
 ['top-aligned very different heights',rect(200,100,100,900),rect(400,100,110,120),90,80,{axis:'x',direction:1,align:'top',gap:100},{left:610,top:100}],
 ['bottom alignment',rect(200,100,100,600),rect(330,500,120,200),90,80,{axis:'x',direction:1,align:'bottom',gap:30},{left:480,top:620}],
 ['true middle alignment',rect(200,100,100,600),rect(330,300,120,200),90,80,{axis:'x',direction:1,align:'middle',gap:30},{left:480,top:360}],
 ['upwards, unequal heights',rect(500,400,640,120),rect(500,290,300,80),200,90,{axis:'y',direction:-1,align:'left',gap:30},{left:500,top:170}],
 ['leftwards, unequal widths',rect(500,200,120,100),rect(300,200,150,100),90,80,{axis:'x',direction:-1,align:'top',gap:50},{left:160,top:200}],
 ['touching vertical edges',rect(500,200,200,80),rect(500,280,200,80),100,90,{axis:'y',direction:1,align:'left',gap:0},{left:500,top:360}]
];
for(const [name,prev,last,width,height,expected,position] of cases){
 const placement=context.inferMindMapSiblingPlacement(prev,last);
 assert.deepEqual(JSON.parse(JSON.stringify(placement)),expected,name);
 assert.deepEqual(JSON.parse(JSON.stringify(context.positionFromMindMapSiblingPlacement(last,placement,width,height))),position,name);
}
console.log('Mindmap placement: manual edge alignment, unequal dimensions, genuine center/middle, four directions, edge gaps and touching blocks — passed');
