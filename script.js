const slides = Array.from(document.querySelectorAll(".slide"));
const nextButtons = document.querySelectorAll(".next-button");
const backButton = document.getElementById("backButton");
const restartButton = document.getElementById("restartButton");
const progressBar = document.getElementById("progressBar");
const slideCounter = document.getElementById("slideCounter");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicNotice = document.getElementById("musicNotice");

let currentSlide = 0;
let isTransitioning = false;
let musicStarted = false;

music.volume = 0.12;

function updateInterface() {
  const progress = ((currentSlide + 1) / slides.length) * 100;

  progressBar.style.width = `${progress}%`;
  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;

  backButton.classList.toggle("visible", currentSlide > 0);

  const theme = slides[currentSlide].dataset.theme;
  const isCream = theme === "cream";

  document.querySelector(".experience-header").style.color =
    isCream ? "#071f46" : "#ffffff";

  document.querySelector(".experience-footer").style.color =
    isCream ? "rgba(7, 31, 70, 0.55)" : "rgba(255, 255, 255, 0.65)";

  musicButton.style.borderColor =
    isCream ? "rgba(7, 31, 70, 0.18)" : "rgba(255, 255, 255, 0.2)";

  document.querySelector(".monogram").style.color =
    isCream ? "#c7952d" : "#e2bd70";
}

function showSlide(nextIndex, direction = 1) {
  if (
    isTransitioning ||
    nextIndex < 0 ||
    nextIndex >= slides.length ||
    nextIndex === currentSlide
  ) {
    return;
  }

  isTransitioning = true;

  const current = slides[currentSlide];
  const next = slides[nextIndex];

  current.classList.add("leaving");

  next.style.transform =
    direction > 0 ? "translateY(24px) scale(1.02)" : "translateY(-24px) scale(1.02)";

  requestAnimationFrame(() => {
    next.classList.add("active");

    requestAnimationFrame(() => {
      next.style.transform = "";
    });
  });

  window.setTimeout(() => {
    current.classList.remove("active", "leaving");
    currentSlide = nextIndex;
    updateInterface();
    isTransitioning = false;
  }, 680);
}

async function tryStartMusic() {
  if (musicStarted) return;

  try {
    await music.play();
    musicStarted = true;
    musicButton.classList.add("playing");
    musicButton.setAttribute("aria-label", "Pausar música");
  } catch (error) {
    showMusicNotice();
  }
}

function showMusicNotice() {
  musicNotice.classList.add("show");

  window.setTimeout(() => {
    musicNotice.classList.remove("show");
  }, 4500);
}

nextButtons.forEach((button, index) => {
  button.addEventListener("click", async () => {
    if (index === 0) {
      await tryStartMusic();
    }

    showSlide(currentSlide + 1, 1);
  });
});

backButton.addEventListener("click", () => {
  showSlide(currentSlide - 1, -1);
});

restartButton.addEventListener("click", () => {
  showSlide(0, -1);
});

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicStarted = true;
      musicButton.classList.add("playing");
      musicButton.setAttribute("aria-label", "Pausar música");
    } catch (error) {
      showMusicNotice();
    }
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicButton.setAttribute("aria-label", "Ativar música");
  }
});

/*
  Impede que a rolagem do mouse, trackpad ou gesto vertical
  avance pelas telas. A navegação acontece somente pelos botões.
*/
window.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "touchmove",
  (event) => {
    const content = event.target.closest(".slide-content");

    if (content && content.scrollHeight > content.clientHeight) {
      return;
    }

    event.preventDefault();
  },
  { passive: false }
);

/*
  Teclado:
  Enter ou seta para a direita = avançar
  Seta para a esquerda = voltar
*/
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "Enter") {
    if (currentSlide < slides.length - 1) {
      if (currentSlide === 0) {
        tryStartMusic();
      }
      showSlide(currentSlide + 1, 1);
    }
  }

  if (event.key === "ArrowLeft") {
    showSlide(currentSlide - 1, -1);
  }
});

music.addEventListener("error", () => {
  musicButton.classList.remove("playing");
});

updateInterface();
