// vibe.js

// ============ MOBILE MENU TOGGLE ============
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    navLinks.classList.remove("open");
  });
});

// ============ BUY BUTTON CLICK ============
const buyBtn = document.getElementById("buy-btn");
buyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("LAUNCHING SOON ON SOLANA!\n\nGet ready to own the trend with $VIBE, the ultimate meme token fueling culture, community, and viral vibes. Built on Solana's lightning-fast network for seamless transactions and low fees. Stay tuned for the official launch date – we'll announce it in our Telegram and X communities. Join now for early access, airdrops, and exclusive updates!");
});

// ============ TOKENOMICS COUNTER ANIMATION ============
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    let count = 0;
    const target = parseInt(counter.getAttribute("data-target"));
    const isPercentage = target <= 100; // Assume <= 100 is a percentage
    const step = target > 1000 ? target / 1000 : target / 200; // Slower for large numbers
    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(interval);
      }
      counter.innerText = Math.floor(count).toLocaleString() + (isPercentage ? "%" : "");
    }, target > 1000 ? 5 : 15); // Faster updates for large numbers
  });
}

function createPieChart() {
  const ctx = document.getElementById("tokenChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Liquidity",
        "Staking Rewards",
        "Marketing & Community",
        "Development & Partnerships",
        "Team & Advisors",
        "Community Incentives"
      ],
      datasets: [{
        data: [40, 20, 15, 15, 7, 3],
        backgroundColor: [
          "#00f5ff", // Cyan
          "#ff00e6", // Pink
          "#00ff9d", // Green
          "#ff007a", // Dark Pink
          "#00c4ff", // Light Cyan
          "#ff66cc"  // Light Pink
        ],
        borderColor: "#0d0d0d",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top", labels: { color: "#fff", font: { size: 14 } } }
      }
    }
  });
}

// Trigger pie chart when tokenomics section is visible
function handleScrollChart() {
  const section = document.getElementById("tokenomics");
  const sectionPos = section.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;
  if (sectionPos < screenPos && !section.classList.contains("charted")) {
    section.classList.add("charted");
    createPieChart();
  }
}

window.addEventListener("scroll", handleScrollChart);

function handleScrollCounters() {
  const section = document.getElementById("tokenomics");
  const sectionPos = section.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionPos < screenPos && !section.classList.contains("counted")) {
    section.classList.add("counted");
    animateCounters();
  }
}

window.addEventListener("scroll", handleScrollCounters);

// ============ PARTICLES BACKGROUND ============
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * (window.innerWidth - size * 2);
    let y = Math.random() * (window.innerHeight - size * 2);
    let directionX = (Math.random() * 0.4) - 0.2;
    let directionY = (Math.random() * 0.4) - 0.2;
    let color = "#00f5ff";
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        opacityValue = 1 - (distance / 120);
        ctx.strokeStyle = "rgba(0,245,255," + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

init();
animate();