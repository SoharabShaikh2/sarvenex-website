const root=document.documentElement;
const saved=localStorage.getItem('sarvenex-theme');
if(saved) root.dataset.theme=saved;
const toggle=document.getElementById('themeToggle');
const icon=document.getElementById('themeIcon');
function setTheme(theme){root.dataset.theme=theme;localStorage.setItem('sarvenex-theme',theme);if(icon)icon.textContent=theme==='dark'?'☾':'☼';}
setTheme(root.dataset.theme==='dark'?'dark':'light');
toggle?.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));

document.getElementById('year').textContent=new Date().getFullYear();

const header=document.getElementById('header');
const progress=document.getElementById('progress');
const parallaxItems=[...document.querySelectorAll('.parallax')];
function onScroll(){
 const y=window.scrollY;
 header.classList.toggle('scrolled',y>10);
 const max=document.documentElement.scrollHeight-window.innerHeight;
 progress.style.width=(max>0?(y/max)*100:0)+'%';
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 parallaxItems.forEach(el=>{const speed=parseFloat(el.dataset.speed||0.08);el.style.transform=`translate3d(0,${y*speed}px,0)`;});
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const localProjectFallback = [{"title":"Business Operations Platform","category":"Software / Platform","description":"A modern business platform concept bringing workflows, dashboards, approvals and operational data into one focused experience.","technologies":[".NET","Angular","Azure"],"image":"assets/img/projects/business-platform.svg","url":"","featured":true},{"title":"AI Knowledge Assistant","category":"AI / Automation","description":"An AI workspace concept for searching internal knowledge, generating useful answers and automating repetitive business tasks.","technologies":["Python","AI","APIs"],"image":"assets/img/projects/ai-assistant.svg","url":"","featured":true},{"title":"Commerce Experience","category":"Web / eCommerce","description":"A conversion-focused commerce experience concept designed for product discovery, checkout and scalable online growth.","technologies":["React","Shopify","PHP"],"image":"assets/img/projects/commerce.svg","url":"","featured":true},{"title":"Mobile Product Suite","category":"Mobile App","description":"A mobile product concept with a clean customer journey, secure APIs and a consistent experience across iOS and Android.","technologies":["iOS","Android","React Native"],"image":"assets/img/projects/mobile-app.svg","url":"","featured":true},{"title":"Cloud Delivery Platform","category":"Cloud / DevOps","description":"A cloud delivery concept covering deployment automation, environments, observability and reliable release workflows.","technologies":["Azure","AWS","Docker","DevOps"],"image":"assets/img/projects/cloud-devops.svg","url":"","featured":true},{"title":"Digital Growth System","category":"Digital Marketing","description":"A digital growth concept connecting content, search, campaigns and analytics into a measurable customer acquisition workflow.","technologies":["SEO","Analytics","Automation"],"image":"assets/img/projects/digital-growth.svg","url":"","featured":true}];

function renderProjects(projects){
 const grid=document.getElementById('projectGrid');
 if(!grid) return;
 grid.innerHTML='';
 projects.filter(p=>p.featured!==false).slice(0,6).forEach((p,i)=>{
  const card=document.createElement('article');card.className='project';
  const visual=p.image?`<div class="project-image"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy"></div>`:`<div class="project-visual"><span>${String(i+1).padStart(2,'0')}</span><i></i></div>`;
  const tags=(p.technologies||[]).map(t=>`<b>${escapeHtml(t)}</b>`).join('');
  card.innerHTML=`${visual}<div class="project-content"><div class="project-top"><span>${escapeHtml(p.category||'Project')}</span>${p.url?`<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener">View ↗</a>`:''}</div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description||'')}</p><div class="project-tags">${tags}</div></div>`;
  grid.appendChild(card);
 });
}

async function loadProjects(){
 const grid=document.getElementById('projectGrid');
 if(!grid) return;
 try{
  // Fetch the JSON when served from HTTP(S), so editing projects.json updates the site automatically.
  if(location.protocol !== 'file:'){
   const res=await fetch('assets/data/projects.json',{cache:'no-store'});
   if(!res.ok) throw new Error('HTTP '+res.status);
   const projects=await res.json();
   renderProjects(projects);
   return;
  }
  // Browsers block fetch() of local JSON files opened via file://.
  // Use the embedded copy for local preview instead of showing an error.
  renderProjects(localProjectFallback);
 }catch(e){
  // Still show useful portfolio content if the JSON cannot be reached.
  renderProjects(localProjectFallback);
 }
}
function escapeHtml(value=''){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
loadProjects();

const wa=document.getElementById('whatsappLink');
const whatsappNumber='91XXXXXXXXXX';
if(wa && /^\d{10,15}$/.test(whatsappNumber)) wa.href=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi SARVENEX, I would like to discuss a project.')}`;
