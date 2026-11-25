const $=id=>document.getElementById(id);
const load=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))||f}catch(e){return f}};
let custom=load('adh-custom',[]);let state=load('adh-state',{counts:{},daily:{},total:0});let sel=localStorage.getItem('adh-sel')||'b1';
const all=()=>ADH.BUILTIN.concat(custom);
function save(){localStorage.setItem('adh-custom',JSON.stringify(custom));localStorage.setItem('adh-state',JSON.stringify(state));localStorage.setItem('adh-sel',sel);}
function cur(){return all().find(x=>x.id===sel)||all()[0];}
function render(){const c=cur();sel=c.id;const n=state.counts[c.id]||0;
 $('dtext').textContent=c.text;$('tap').textContent=n+' / '+c.target;$('prog').style.width=Math.min(100,n/c.target*100)+'%';
 $('today').textContent='اليوم: '+(state.daily[ADH.todayKey()]||0);
 const L=$('list');L.innerHTML='';all().forEach(x=>{const d=document.createElement('div');d.className='item'+(x.id===sel?' sel':'');
  const s=document.createElement('span');s.textContent=x.text+' ('+(state.counts[x.id]||0)+'/'+x.target+')';s.onclick=()=>{sel=x.id;save();render();};d.appendChild(s);
  if(x.custom){const b=document.createElement('button');b.className='danger';b.textContent='حذف';b.onclick=()=>{if(confirm('حذف الذكر؟')){custom=ADH.removeCustom(custom,x.id);save();render();}};d.appendChild(b);}
  L.appendChild(d);});
 const S=$('stats');S.innerHTML='';ADH.lastDays(state,7).reverse().forEach(r=>{const d=document.createElement('div');d.className='stat';d.innerHTML='<span>'+r.day+'</span><b>'+r.count+'</b>';S.appendChild(d);});}
$('tap').onclick=()=>{const c=cur();const r=ADH.tap(state,c.id,ADH.todayKey(),c.target);state=r.state;if(navigator.vibrate)navigator.vibrate(r.done?[100,60,100]:15);save();render();};
$('reset').onclick=()=>{state=ADH.resetCount(state,cur().id);save();render();};
$('add').onclick=()=>{try{custom=ADH.addCustom(custom,$('newText').value,$('newTarget').value);sel=custom[custom.length-1].id;$('newText').value='';save();render();}catch(e){alert('اكتب نص الذكر وعدد صحيح');}};
render();if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
