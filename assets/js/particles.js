export function initParticles() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const particles = [];
  const colors = ["#ff5e57", "#ffbe0b", "#3a86ff", "#8338ec", "#fb5607"];

  function createParticle(x, y) {
    const radius = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const life = 100;
    particles.push({ x, y, dx, dy, radius, color, life });
  }

  function updateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      p.radius *= 0.96;
      if (p.life <= 0 || p.radius < 0.5) {
        particles.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (particles.length < 300)
      createParticle(Math.random() * width, Math.random() * height * 0.7);
    updateParticles();
  }

  document.body.addEventListener("click", (e) => {
    for (let i = 0; i < 30; i++) {
      createParticle(e.clientX, e.clientY);
    }
  });

  animate();
}
