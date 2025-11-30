// Basic interactivity: mobile menu, year, simple contact form behaviour, smooth nav
document.addEventListener('DOMContentLoaded', function(){
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu toggle
  const hambtn = document.getElementById('hambtn');
  const nav = document.getElementById('nav');
  hambtn.addEventListener('click', () => {
    if(nav.style.display === 'flex') {
      nav.style.display = '';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.background = 'rgba(255,255,255,0.98)';
      nav.style.padding = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '18px';
      nav.style.top = '62px';
      nav.style.borderRadius = '10px';
      nav.style.boxShadow = '0 10px 30px rgba(2,6,23,0.08)';
    }
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav if open
        if(window.innerWidth <= 980 && nav.style.display === 'flex') {
          nav.style.display = '';
        }
      }
    })
  });

  // simple fake contact submit (no backend) - shows success message
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Sending message...';
    // simulate async send
    setTimeout(() => {
      status.textContent = 'Thanks — your message was sent (demo). I will reply to your email soon.';
      form.reset();
    }, 900);
  });
});
