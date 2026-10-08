(()=>{
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,$=(s,r=document)=>[...r.querySelectorAll(s)];
const prog=document.createElement('div');prog.id='prog';document.body.prepend(prog);
const top=document.createElement('button');top.className='top';top.setAttribute('aria-label','Back to top');
top.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
top.onclick=()=>scrollTo({top:0});document.body.append(top);
const hd=document.querySelector('header');
function sc(){const y=scrollY,m=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${m>0?y/m:0})`;hd.classList.toggle('sc',y>8);top.classList.toggle('show',y>500)}
addEventListener('scroll',sc,{passive:true});sc();
if(rm)return;
// reveal cards in sequence
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>{t.classList.remove('rv','in');t.style.transitionDelay=''},1200)}}),{threshold:.12});
function reveal(){$('.tile,.brand,.client,.cbox,.photos figure').forEach(el=>{if(el.dataset.rv)return;el.dataset.rv=1;const i=$(':scope > *',el.parentNode).indexOf(el);el.classList.add('rv');el.style.transitionDelay=Math.min(i%4,3)*70+'ms';io.observe(el)})}
reveal();addEventListener('load',reveal);
// 3D tilt on tiles
$('.tile').forEach(t=>{t.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`});t.addEventListener('pointerleave',()=>t.style.transform='')});
// hero spotlight
const hero=document.querySelector('.hero');
if(hero)hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
// count-up
$('[data-to]').forEach(el=>{const to=+el.dataset.to,from=to>100?to-40:0,suf=el.dataset.suf||'';let d=0;const go=()=>{const t0=performance.now();(function f(n){const p=Math.min((n-t0)/1400,1);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f)})(t0)};new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){go();o.disconnect()}}).observe(el)});
})();
