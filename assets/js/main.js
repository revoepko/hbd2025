import { initParticles } from "./particles.js";

document.addEventListener("DOMContentLoaded", () => {
  initParticles();

  const giftBtn = document.getElementById("gift-btn");
  const letterBtn = document.getElementById("letter-btn");
  const content = document.getElementById("content");

  giftBtn.addEventListener("click", () => {
    content.innerHTML =
      "<h2>🎁 깜짝 선물! 🎁</h2><p>당신의 하루가 행복으로 가득하길!</p>";
  });

  letterBtn.addEventListener("click", () => {
    fetch("assets/letter.html")
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;
      });
  });
});

