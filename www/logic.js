(function(root){
const BUILTIN=[
{id:'b1',text:'سبحان الله',target:33},
{id:'b2',text:'الحمد لله',target:33},
{id:'b3',text:'الله أكبر',target:34},
{id:'b4',text:'أستغفر الله',target:100},
{id:'b5',text:'لا حول ولا قوة إلا بالله',target:100},
{id:'b6',text:'سبحان الله وبحمده، سبحان الله العظيم',target:100},
{id:'b7',text:'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',target:10},
{id:'b8',text:'اللهم صلِّ وسلم على نبينا محمد',target:10},
{id:'b9',text:'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم',target:7}];
function todayKey(d){d=d||new Date();const p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());}
function addCustom(list,text,target,idGen){text=(text||'').trim();target=Math.floor(Number(target));
 if(!text)throw new Error('empty');if(!(target>=1&&target<=100000))throw new Error('bad target');
 return list.concat([{id:(idGen||(()=>'c'+Date.now()+Math.random().toString(36).slice(2,6)))(),text,target,custom:true}]);}
function removeCustom(list,id){return list.filter(x=>!(x.id===id&&x.custom));}
function tap(state,id,day,target){const s=JSON.parse(JSON.stringify(state));s.counts[id]=(s.counts[id]||0)+1;
 s.daily[day]=(s.daily[day]||0)+1;s.total=(s.total||0)+1;
 return {state:s,done:target>0&&s.counts[id]===target};}
function resetCount(state,id){const s=JSON.parse(JSON.stringify(state));s.counts[id]=0;return s;}
function lastDays(state,n,from){const out=[];const base=from||new Date();for(let i=n-1;i>=0;i--){const d=new Date(base);d.setDate(d.getDate()-i);const k=todayKey(d);out.push({day:k,count:state.daily[k]||0});}return out;}
const api={BUILTIN,todayKey,addCustom,removeCustom,tap,resetCount,lastDays};
if(typeof module!=='undefined')module.exports=api;else root.ADH=api;
})(typeof window!=='undefined'?window:globalThis);
