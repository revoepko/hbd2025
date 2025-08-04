import { initParticles } from "./particles.js";

document.addEventListener("DOMContentLoaded", () => {
  initParticles();

  const giftBtn = document.getElementById("gift-btn");
  const letterBtn = document.getElementById("letter-btn");
  const content = document.getElementById("content");

  giftBtn.addEventListener("click", () => {
    fetch("assets/gift.html")
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;
      });
  });

  letterBtn.addEventListener("click", () => {
    fetch("assets/letter.html")
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;
      });
  });
});

