const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const card = document.getElementById("mainCard");
const surprise = document.getElementById("surprise");
const wittyComment = document.getElementById("wittyComment");
const lovePhoto = document.querySelector(".lovePhoto");
const loveMessage = document.querySelector(".loveMessage");
const bgMusic = document.getElementById("bgMusic");

// NO button escapes
noBtn.addEventListener("mouseenter", () => {
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = cardRect.width - btnRect.width;
  const maxY = cardRect.height - btnRect.height;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
});

// Witty comments
const comments = [
  "I see… my Rizz is officially un-avoidable 😏💖",
  "Trying to say no? Cute. But we both know who runs this app 😎",
  "Ah, the sweet sound of unavoidable victory ❤️",
  "Looks like destiny had no other choice… except yes ✨"
];

// Typing effect
function typeText(element, text, speed = 60) {
  element.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i === text.length) clearInterval(timer);
  }, speed);
}

// YES click
yesBtn.addEventListener("click", () => {
  // Start music
  bgMusic.currentTime = 0;
  bgMusic.loop = true;
  bgMusic.play();

  // Confetti
  confetti({
    particleCount: 300,
    spread: 150,
    origin: { y: 0.6 }
  });

  // Hide main card
  card.style.display = "none";

  // Show surprise
  surprise.classList.remove("hidden");

  // Random witty comment
  const comment = comments[Math.floor(Math.random() * comments.length)];
  wittyComment.style.opacity = 1;
  wittyComment.classList.add("fade-in");
  typeText(wittyComment, comment, 60);

  // Sequential fade-in photo + message
  lovePhoto.classList.add("hidden-element");
  loveMessage.classList.add("hidden-element");

  setTimeout(() => lovePhoto.classList.add("fade-in"), comment.length * 60 + 300);
  setTimeout(() => loveMessage.classList.add("fade-in"), comment.length * 60 + 800);
});

// Floating hearts generator
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = Math.random() > 0.5 ? "💖" : "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 400);

// Mouse parallax for card
document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 25;
  const y = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
