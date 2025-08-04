import { initParticles } from "./particles.js";

document.addEventListener("DOMContentLoaded", () => {
  initParticles();

  const giftBtn = document.getElementById("gift-btn");
  const letterBtn = document.getElementById("letter-btn");
  const musicBtn = document.getElementById("music-btn");
  const content = document.getElementById("content");
  let audioCtx = null;

  giftBtn.addEventListener("click", () => {
    content.innerHTML =
      "<h2>🎁 깜짝 선물! 🎁</h2><p>당신의 하루가 행복으로 가득하길!</p>";
  });

  letterBtn.addEventListener("click", () => {
    content.innerHTML =
      '<textarea id="letter" placeholder="여기에 편지를 적어보세요..." rows="5"></textarea>';
  });

  function playMelody() {
    const notes = [
      { f: 392, d: 0.4 },
      { f: 392, d: 0.4 },
      { f: 440, d: 0.4 },
      { f: 392, d: 0.4 },
      { f: 523, d: 0.4 },
      { f: 494, d: 0.8 },
      { f: 392, d: 0.4 },
      { f: 392, d: 0.4 },
      { f: 440, d: 0.4 },
      { f: 392, d: 0.4 },
      { f: 587, d: 0.4 },
      { f: 523, d: 0.8 },
      { f: 392, d: 0.4 },
      { f: 392, d: 0.4 },
      { f: 784, d: 0.4 },
      { f: 659, d: 0.4 },
      { f: 523, d: 0.4 },
      { f: 494, d: 0.4 },
      { f: 440, d: 0.8 },
      { f: 698, d: 0.4 },
      { f: 698, d: 0.4 },
      { f: 659, d: 0.4 },
      { f: 523, d: 0.4 },
      { f: 587, d: 0.4 },
      { f: 523, d: 0.8 },
    ];

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let current = audioCtx.currentTime;
    notes.forEach((n) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = n.f;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(current);
      osc.stop(current + n.d);
      current += n.d + 0.05;
    });
    const total = notes.reduce((s, n) => s + n.d + 0.05, 0);
    setTimeout(() => {
      if (audioCtx) {
        audioCtx.close();
        audioCtx = null;
        musicBtn.textContent = "🎵 음악 재생";
      }
    }, total * 1000);
  }

  musicBtn.addEventListener("click", () => {
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
      musicBtn.textContent = "🎵 음악 재생";
    } else {
      musicBtn.textContent = "⏸ 음악 정지";
      playMelody();
    }
  });
});
