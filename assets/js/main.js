import { initParticles } from "./particles.js";

document.addEventListener("DOMContentLoaded", () => {
  initParticles();

  const content = document.getElementById("content");
  const giftBtn = document.getElementById("giftBtn");
  const letterBtn = document.getElementById("letterBtn");
  const musicBtn = document.getElementById("musicBtn");

  giftBtn.addEventListener("click", () => {
    content.innerHTML = "<div class='gift'>🎁 깜짝 선물! 🎁</div>";
  });

  letterBtn.addEventListener("click", () => {
    content.innerHTML =
      "<div class='letter'><textarea placeholder='편지를 작성하세요...'></textarea></div>";
  });

  let audioCtx = null;

  function playMelody() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const notes = [
      { f: 392.0, d: 0.5 },
      { f: 392.0, d: 0.5 },
      { f: 440.0, d: 1 },
      { f: 392.0, d: 1 },
      { f: 523.25, d: 1 },
      { f: 493.88, d: 2 },
      { f: 392.0, d: 0.5 },
      { f: 392.0, d: 0.5 },
      { f: 440.0, d: 1 },
      { f: 392.0, d: 1 },
      { f: 587.33, d: 1 },
      { f: 523.25, d: 2 },
      { f: 392.0, d: 0.5 },
      { f: 392.0, d: 0.5 },
      { f: 784.0, d: 1 },
      { f: 659.25, d: 1 },
      { f: 523.25, d: 1 },
      { f: 493.88, d: 1 },
      { f: 440.0, d: 1.5 },
      { f: 698.46, d: 0.5 },
      { f: 698.46, d: 0.5 },
      { f: 659.25, d: 1 },
      { f: 523.25, d: 1 },
      { f: 587.33, d: 1 },
      { f: 523.25, d: 2 },
    ];

    let t = audioCtx.currentTime;
    notes.forEach((n) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = n.f;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);
      osc.start(t);
      osc.stop(t + n.d);
      t += n.d;
    });

    setTimeout(() => {
      audioCtx = null;
      musicBtn.textContent = "음악 재생";
    }, t * 1000);
  }

  musicBtn.addEventListener("click", () => {
    if (!audioCtx) {
      playMelody();
      musicBtn.textContent = "음악 일시정지";
    } else if (audioCtx.state === "running") {
      audioCtx.suspend();
      musicBtn.textContent = "음악 재생";
    } else if (audioCtx.state === "suspended") {
      audioCtx.resume();
      musicBtn.textContent = "음악 일시정지";
    }
  });
});
