(function initMeasurement(root) {
  'use strict';
  const xyz = point => [Number(point?.x),Number(point?.y),Number(point?.z)];
  const valid = values => values.every(Number.isFinite);
  function distance(a,b,angstromPerWorldUnit) {
    const pa=xyz(a),pb=xyz(b),scale=Number(angstromPerWorldUnit);
    if (!valid([...pa,...pb,scale]) || scale <= 0) return null;
    const world=Math.hypot(pb[0]-pa[0],pb[1]-pa[1],pb[2]-pa[2]);
    const angstrom=world*scale;
    return {world,angstrom,picometer:angstrom*100};
  }
  function angleDegrees(a,vertex,c) {
    const pa=xyz(a),pv=xyz(vertex),pc=xyz(c);
    if (!valid([...pa,...pv,...pc])) return null;
    const u=[pa[0]-pv[0],pa[1]-pv[1],pa[2]-pv[2]];
    const v=[pc[0]-pv[0],pc[1]-pv[1],pc[2]-pv[2]];
    const lu=Math.hypot(...u),lv=Math.hypot(...v);
    if (lu === 0 || lv === 0) return null;
    const cosine=Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1]+u[2]*v[2])/(lu*lv)));
    return Math.acos(cosine)*180/Math.PI;
  }
  root.NULLA_MEASUREMENT=Object.freeze({distance,angleDegrees});
})(globalThis);
