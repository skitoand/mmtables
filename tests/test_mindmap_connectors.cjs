// Exercise the actual geometry functions without a DOM or copied implementation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app.js'), 'utf8');
const names = ['getConnectorEndpointSide', 'getConnectorRenderPoints', 'normalizeConnectorRouteStyle',
  'isCurveRouteStyle', 'isOrthogonalRouteStyle', 'shouldOffsetConnectorAlongAnchor',
  'getOffsetPointFromAnchorDirection', 'connectorAnchorTravelDir', 'buildCurveControlPoints',
  'sampleCubicBezier', 'connectorCurvePathD', 'cloneConnectorPoint', 'pointsEqual',
  'normalizeConnectorRoutePoints', 'buildDefaultConnectorRoutePoints', 'alignOrthogonalEndpoint', 'getConnectorPathState',
  'getPreferredCenterExitDirection', 'getOffsetPointFromShapeCenterDirected', 'getOffsetPointFromShapeCenter'];
const context = vm.createContext({Math, Number, Array,
  clamp: (n, min, max) => Math.max(min, Math.min(max, n)),
  getConnectableBounds: n => n,
  connectorEndHasCell: () => false,
  getConnectableFromEnd: end => end.node,
  getConnectorPoint: end => end.point,
  getConnectorAttachmentPoint: end => end.point
});
for (const name of names) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `Missing ${name}`);
  vm.runInContext(source.slice(start, source.indexOf('\n}', start) + 2), context);
}
const target = {left:500, top:600, width:240, height:100};
const edges = {w:{x:500,y:640,rx:0,ry:.4},e:{x:740,y:640,rx:1,ry:.4},n:{x:596,y:600,rx:.4,ry:0},s:{x:596,y:700,rx:.4,ry:1}};
for (const [side, edge] of Object.entries(edges)) {
  for (const role of ['from', 'to']) {
    const attached = {anchor:'edge', rx:edge.rx, ry:edge.ry, point:edge, node:target};
    const free = {anchor:'c',point:{x:100,y:20}};
    const conn = {from:role==='from'?attached:free,to:role==='to'?attached:free,routeStyle:'curve',gapStart:13,gapEnd:17};
    const state = context.getConnectorPathState(conn);
    const endpoint = role==='from'?state.curve.p1:state.curve.p2;
    const control = role==='from'?state.curve.c1:state.curve.c2;
    const normal = context.connectorAnchorTravelDir(side, endpoint, control, 'out');
    const gap = role==='from'?13:17;
    assert.equal(endpoint.x, edge.x + normal.x*gap);
    assert.equal(endpoint.y, edge.y + normal.y*gap);
    assert.equal((control.x-endpoint.x)*normal.y-(control.y-endpoint.y)*normal.x,0,`${side}/${role}: perpendicular tangent`);
    assert.ok((control.x-endpoint.x)*normal.x+(control.y-endpoint.y)*normal.y>0,`${side}/${role}: outside shape`);
    assert.equal(conn[role].anchor,'edge','Rendering must not rewrite saved anchors');
    for (const routeStyle of ['orthogonal-horizontal','orthogonal-vertical']) {
      const orthogonal=context.getConnectorPathState({...conn,routeStyle});
      const points=role==='from'?orthogonal.points:orthogonal.points.slice().reverse();
      const vx=points[1].x-points[0].x,vy=points[1].y-points[0].y;
      assert.equal(vx*normal.y-vy*normal.x,0,`${side}/${role}/${routeStyle}: perpendicular endpoint`);
      assert.ok(vx*normal.x+vy*normal.y>0);
      for(let i=1;i<points.length;i++)assert.ok(points[i].x===points[i-1].x||points[i].y===points[i-1].y,'Every segment must remain orthogonal');
    }
  }
}
// Center anchors resolve their physical boundary side before calculating tangents.
const centered = context.getConnectorPathState({from:{anchor:'c',node:{left:0,top:0,width:200,height:100},point:{x:100,y:50}},to:{anchor:'c',node:target,point:{x:620,y:650}},routeStyle:'curve'});
assert.equal(centered.curve.c1.x,centered.curve.p1.x);
assert.equal(centered.curve.c2.x,centered.curve.p2.x);
// A target behind an endpoint's outward normal needs an outside detour, not a reversal through the shape.
for(const side of ['w','e','n','s']){
  const normal=context.connectorAnchorTravelDir(side,{x:0,y:0},{x:100,y:100},'out');
  const end={x:50,y:50};const next={x:end.x-normal.x*100,y:end.y-normal.y*100};
  const points=context.alignOrthogonalEndpoint([end,next],side);
  assert.ok((points[1].x-end.x)*normal.x+(points[1].y-end.y)*normal.y>0);
  for(let i=1;i<points.length;i++)assert.ok(points[i].x===points[i-1].x||points[i].y===points[i-1].y);
}
console.log('Connector curve/orthogonal geometry: all four free-edge sides, source and target, outward gaps, perpendicular curve tangents, center anchors — passed');
