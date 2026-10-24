const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open)});
document.querySelectorAll('.dropdown-toggle').forEach(button=>{button.addEventListener('click',event=>{const open=(event.detail>0&&window.matchMedia('(hover: hover)').matches&&window.innerWidth>1100)||button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.closest('.nav-dropdown').classList.toggle('open',open)})});
function closeDropdowns(){document.querySelectorAll('.nav-dropdown.open').forEach(el=>{el.classList.remove('open');el.querySelector('button').setAttribute('aria-expanded','false')})}
document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown'))closeDropdowns()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeDropdowns();if(menuButton?.getAttribute('aria-expanded')==='true'){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('open');menuButton.focus()}}});
document.querySelectorAll('.compare-input').forEach(input=>{input.addEventListener('input',()=>input.closest('.comparison').style.setProperty('--split',`${input.value}%`))});
document.querySelectorAll('.why-list').forEach(group=>{group.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)group.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false})}))});
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
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

// Close the mobile disclosure after choosing a link or clicking outside.
function closeMobileNavigation(){
 if(menuButton?.getAttribute('aria-expanded')==='true'){
  menuButton.setAttribute('aria-expanded','false');
  navigation?.classList.remove('open');
 }
}
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMobileNavigation()});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMobileNavigation()});
window.matchMedia('(min-width:1101px)').addEventListener('change',()=>{closeMobileNavigation();closeDropdowns()});
// Pointer hover and keyboard focus expose both desktop dropdowns.
document.querySelectorAll('.nav-dropdown').forEach(dropdown=>{
 const toggle=dropdown.querySelector('.dropdown-toggle');
 const open=()=>{closeDropdowns();dropdown.classList.add('open');toggle.setAttribute('aria-expanded','true')};
 const close=()=>{dropdown.classList.remove('open');toggle.setAttribute('aria-expanded','false')};
 dropdown.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&window.innerWidth>1100)open()});
 dropdown.addEventListener('pointerleave',()=>{if(!dropdown.contains(document.activeElement))close()});
 dropdown.addEventListener('focusout',event=>{if(!dropdown.contains(event.relatedTarget))close()});
 toggle.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();open();dropdown.querySelector('a')?.focus()}});
});
