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

if (music) {
    music.volume = 0.12;
}

// Atualiza barra de progresso
function updateInterface() {

    if (progressBar) {
        progressBar.style.width =
            ((currentSlide + 1) / slides.length) * 100 + "%";
    }

    if (slideCounter) {
        slideCounter.innerText =
            `${currentSlide + 1} / ${slides.length}`;
    }

    if (backButton) {
        if (currentSlide > 0) {
            backButton.classList.add("visible");
        } else {
            backButton.classList.remove("visible");
        }
    }
}

// Troca de tela
function showSlide(index) {

    if (isTransitioning) return;

    if (index < 0 || index >= slides.length) return;

    isTransitioning = true;

    slides[currentSlide].classList.remove("active");

    slides[index].classList.add("active");

    currentSlide = index;

    updateInterface();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Inicia música
async function startMusic() {

    if (musicStarted) return;

    if (!music) return;

    try {

        await music.play();

        musicStarted = true;

        if (musicButton) {
            musicButton.classList.add("playing");
        }

    } catch (e) {

        console.log("Áudio bloqueado.");

        if (musicNotice) {

            musicNotice.classList.add("show");

            setTimeout(() => {

                musicNotice.classList.remove("show");

            }, 4000);

        }

    }

}

// BOTÃO CONTINUAR
nextButtons.forEach((button) => {

    button.addEventListener("click", async function () {

        if (currentSlide === 0) {
            await startMusic();
        }

        showSlide(currentSlide + 1);

    });

});

// BOTÃO VOLTAR
if (backButton) {

    backButton.addEventListener("click", function () {

        showSlide(currentSlide - 1);

    });

}

// REINICIAR
if (restartButton) {

    restartButton.addEventListener("click", function () {

        showSlide(0);

    });

}

// BOTÃO MÚSICA
if (musicButton && music) {

    musicButton.addEventListener("click", async function () {

        if (music.paused) {

            await music.play();

            musicButton.classList.add("playing");

        } else {

            music.pause();

            musicButton.classList.remove("playing");

        }

    });

}

// BLOQUEIA SCROLL
window.addEventListener("wheel", function (e) {

    e.preventDefault();

}, { passive: false });

window.addEventListener("touchmove", function (e) {

    e.preventDefault();

}, { passive: false });

// TECLADO
window.addEventListener("keydown", function (e) {

    if (e.key === "ArrowRight" || e.key === "Enter") {

        if (currentSlide < slides.length - 1) {

            if (currentSlide === 0) {
                startMusic();
            }

            showSlide(currentSlide + 1);

        }

    }

    if (e.key === "ArrowLeft") {

        showSlide(currentSlide - 1);

    }

});

// Inicialização
updateInterface();
