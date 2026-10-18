const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open)});
document.querySelectorAll('.dropdown-toggle').forEach(button=>{button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.closest('.nav-dropdown').classList.toggle('open',open)})});
function closeDropdowns(){document.querySelectorAll('.nav-dropdown.open').forEach(el=>{el.classList.remove('open');el.querySelector('button').setAttribute('aria-expanded','false')})}
document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown'))closeDropdowns()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeDropdowns();if(menuButton?.getAttribute('aria-expanded')==='true'){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('open');menuButton.focus()}}});
document.querySelectorAll('.compare-input').forEach(input=>{input.addEventListener('input',()=>input.closest('.comparison').style.setProperty('--split',`${input.value}%`))});
document.querySelectorAll('.why-list').forEach(group=>{group.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)group.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false})}))});
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const cinemaHero=document.querySelector('.cinema-hero');
if(cinemaHero){
 let heroViewportWidth=window.innerWidth;
 const sizeHero=()=>{const height=Math.max(window.innerWidth<=620?780:640,window.innerHeight);cinemaHero.style.height=`${height}px`;cinemaHero.style.minHeight=`${height}px`};
 sizeHero();
 window.addEventListener('resize',()=>{if(window.innerWidth!==heroViewportWidth){heroViewportWidth=window.innerWidth;sizeHero()}});
}
document.querySelectorAll('.service-deck').forEach(deck=>{
 const panels=[...deck.querySelectorAll('.service-window')];
 panels.forEach(panel=>panel.querySelector('.window-select').addEventListener('click',event=>{
  if(panel.classList.contains('selected'))return;
  const before=panels.map(item=>item.getBoundingClientRect());
  panels.forEach(item=>{item.getAnimations().forEach(animation=>animation.cancel());item.classList.toggle('selected',item===panel);item.querySelector('button').setAttribute('aria-pressed',String(item===panel))});
  if(reduceMotion.matches||event.detail===0)return;
  panels.forEach((item,i)=>{
   const after=item.getBoundingClientRect();
   item.animate([{transform:`translate(${before[i].x-after.x}px,${before[i].y-after.y}px) scale(${before[i].width/after.width},${before[i].height/after.height})`},{transform:'none'}],{duration:250,easing:'cubic-bezier(.23,1,.32,1)',fill:'none',composite:'replace'});
   item.style.transformOrigin='top left';
  });
 }));
});
