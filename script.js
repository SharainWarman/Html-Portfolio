// Smooth scroll for navbar links
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    if(this.hash !== "") {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in sections on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
},{ threshold: 0.3 });
fadeEls.forEach(el => observer.observe(el));

// Hero Canvas particles with mouse interaction
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 150;
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

for(let i=0;i<particleCount;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx: Math.random()*1-0.5,
    dy: Math.random()*1-0.5
  });
}

function connectParticles(){
  for(let a=0; a<particles.length; a++){
    for(let b=a; b<particles.length; b++){
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < 100){
        ctx.strokeStyle = 'rgba(0,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate(){
  ctx.fillStyle = '#0f111a';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = '#00ffff';
    ctx.fill();

    // Move particles
    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if(p.x<0 || p.x>canvas.width) p.dx *= -1;
    if(p.y<0 || p.y>canvas.height) p.dy *= -1;

    // Mouse interaction
    if(mouse.x && mouse.y){
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < mouse.radius){
        let angle = Math.atan2(dy, dx);
        let force = (mouse.radius - dist)/mouse.radius;
        p.x += Math.cos(angle) * force * 2;
        p.y += Math.sin(angle) * force * 2;
      }
    }
  });

  connectParticles();
  requestAnimationFrame(animate);
}

animate();

// Resize canvas
window.addEventListener('resize', ()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });

// 3D tilt effect on project cards
document.querySelectorAll('.project-card-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X
    const y = e.clientY - rect.top;  // mouse Y
    const centerX = rect.width/2;
    const centerY = rect.height/2;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    card.querySelector('.card-inner').style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', e => {
    card.querySelector('.card-inner').style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

document.querySelectorAll('.project-card-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width/2;
    const centerY = rect.height/2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.querySelector('.card-inner').style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', e => {
    card.querySelector('.card-inner').style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});
