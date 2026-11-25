const assert=require('assert');const A=require('./logic.js');
let l=A.addCustom(A.BUILTIN,'  سبحان الله العظيم ',50,()=>'c1');
assert.strictEqual(l.length,A.BUILTIN.length+1);assert.strictEqual(l[l.length-1].text,'سبحان الله العظيم');
assert.throws(()=>A.addCustom(l,'',5));assert.throws(()=>A.addCustom(l,'x',0));
assert.strictEqual(A.removeCustom(l,'b1').length,l.length);// builtin cannot be removed
assert.strictEqual(A.removeCustom(l,'c1').length,A.BUILTIN.length);
let st={counts:{},daily:{},total:0};let r;
for(let i=0;i<3;i++)r=A.tap(st,'b1','2026-11-25',3),st=r.state;
assert.ok(r.done);assert.strictEqual(st.counts.b1,3);assert.strictEqual(st.daily['2026-11-25'],3);
assert.strictEqual(A.resetCount(st,'b1').counts.b1,0);assert.strictEqual(st.counts.b1,3);
assert.strictEqual(A.todayKey(new Date(2026,10,5)),'2026-11-05');
const ld=A.lastDays(st,3,new Date(2026,10,25));assert.deepStrictEqual(ld.map(x=>x.count),[0,0,3]);
console.log('adhkar tests passed');
