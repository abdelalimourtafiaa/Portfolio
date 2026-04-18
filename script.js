// Custom Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .info-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = 'rgba(124,58,237,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = 'rgba(124,58,237,0.5)';
  });
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
const reveals = document.querySelectorAll('.section > .container > *, .hero-content, .hero-avatar, .project-card, .info-card, .skill-category, .contact-item');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Smooth nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✅ Message envoyé !';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  setTimeout(() => {
    btn.textContent = 'Envoyer le message ✉️';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// Typing effect for hero subtitle
const subtitles = ['Développeur Mobile & Web', 'Flutter Developer', 'Android Developer', 'UI/UX Enthusiast'];
let si = 0, ci = 0, deleting = false;
const subEl = document.querySelector('.hero-sub');

function typeEffect() {
  const current = subtitles[si];
  if (!deleting) {
    subEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(typeEffect, 2000); return; }
  } else {
    subEl.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; si = (si + 1) % subtitles.length; }
  }
  setTimeout(typeEffect, deleting ? 50 : 80);
}
typeEffect();
