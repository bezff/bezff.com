const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

if(localStorage.getItem('theme') === 'light'){
    toggle.checked = true;
    html.setAttribute('data-theme','light');
}

toggle.addEventListener('change', () => {
    const mode = toggle.checked ? 'light' : 'dark';
    html.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
},{threshold:.15});

document.querySelectorAll('.reveal').forEach(sec=>observer.observe(sec));

const spot = document.getElementById('spot');
const shapes = document.querySelectorAll('.shape');
function moveLight(e){
  const x = (e.clientX || e.touches?.[0].clientX || innerWidth/2) / innerWidth * 100;
  const y = (e.clientY || e.touches?.[0].clientY || innerHeight/2) / innerHeight * 100;
  spot.setAttribute('cx', x + '%');
  spot.setAttribute('cy', y + '%');
  shapes.forEach((s,i)=>{
    const depth = (i+1)*8;                      
    const tx = (50-x)/depth, ty=(50-y)/depth;
    s.style.transform = `translate(${tx}%, ${ty}%)`;
  });
}
window.addEventListener('mousemove', moveLight);
window.addEventListener('touchmove', moveLight);

document.querySelectorAll('.project-grid article').forEach(card=>{
  const perspective = 700;       
  const maxTilt = 20;           

  function tilt(e){
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;     
    const y = e.clientY - rect.top;
    const rx = -(y - rect.height/2) / rect.height * maxTilt;
    const ry =  (x - rect.width/2)  / rect.width  * maxTilt;
    card.style.transform =
      `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`;
    card.style.transition='transform .05s';
  }
  function reset(){
    card.style.transform='perspective(700px) rotateX(0) rotateY(0)';
    card.style.transition='transform .45s cubic-bezier(.22,1,.36,1)';
  }
  card.addEventListener('mousemove', tilt);
  card.addEventListener('mouseleave', reset);
  card.addEventListener('touchmove', e=>tilt(e.touches[0]));
  card.addEventListener('touchend', reset);
});

window.addEventListener('load', () => {
  const pl = document.getElementById('preloader');
  pl.classList.add('hide');
  pl.addEventListener('transitionend', ()=>pl.remove());
});