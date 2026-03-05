function toggleMenu(){
  const m=document.getElementById('mobileMenu');
  if(!m) return;
  m.hidden=!m.hidden;
}
function currentLang(){
  const s=localStorage.getItem('kiduhim_lang');
  if(s) return s;
  return (navigator.language||'en').toLowerCase().startsWith('ru') ? 'ru' : 'en';
}
function setLang(lang){
  localStorage.setItem('kiduhim_lang', lang);
  applyLang();
}
function applyLang(){
  const lang=currentLang();
  const dict=(window.I18N && window.I18N[lang]) ? window.I18N[lang] : (window.I18N?window.I18N.en:{});
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(dict && dict[k]) el.textContent=dict[k];
  });
  document.querySelectorAll('.lang').forEach(b=>{
    b.classList.toggle('active', b.getAttribute('data-lang')===lang);
  });
  document.documentElement.lang = lang;
}
function fakeSubmit(e){
  e.preventDefault();
  const s=document.getElementById('formStatus');
  const lang=currentLang();
  const dict=(window.I18N && window.I18N[lang]) ? window.I18N[lang] : (window.I18N?window.I18N.en:{});
  if(s) s.textContent = dict.form_sent || 'Thanks.';
  return false;
}
function revealOnScroll(){
  const els=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.14});
  els.forEach(el=>io.observe(el));
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click', ()=>setLang(b.getAttribute('data-lang'))));
  applyLang();
  revealOnScroll();
});