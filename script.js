const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const links = [...document.querySelectorAll('.nav a')];

function setHeader() {
  header.classList.toggle('scrolled', window.scrollY > 12);
}
function closeNav() {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('locked');
}
menu.addEventListener('click', () => {
  const opening = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(opening));
  nav.classList.toggle('open', opening);
  document.body.classList.toggle('locked', opening);
});
links.forEach((link) => link.addEventListener('click', closeNav));
window.addEventListener('resize', () => { if (window.innerWidth > 1020) closeNav(); });
window.addEventListener('scroll', setHeader, { passive: true });
setHeader();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('visible'));
} else {
  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((item) => reveal.observe(item));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-38% 0px -52% 0px', threshold: 0.01 });
document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();
