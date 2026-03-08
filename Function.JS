document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     🔹 HERO con transición suave (crossfade)
  =================================================== */
  const hero = document.querySelector(".hero");
  if (hero) {
    const images = [
      "IMG/3.jpg",
       "IMG/02.jpg",
       "IMG/Fachada 02.png",
        "IMG/Diseño sin título (76).png","IMG/Diseño sin título (78).png","IMG/AEREO.jpg","IMG/001.png"
    ];

    const imgA = document.createElement("img");
    const imgB = document.createElement("img");
    hero.appendChild(imgA);
    hero.appendChild(imgB);

    // precarga
    images.forEach(src => new Image().src = src);

    let current = 0;
    imgA.src = images[current];
    imgA.classList.add("active");
    imgB.src = images[(current + 1) % images.length];

    setInterval(() => {
      current = (current + 1) % images.length;
      if (imgA.classList.contains("active")) {
        imgB.src = images[current];
        imgB.classList.add("active");
        imgA.classList.remove("active");
      } else {
        imgA.src = images[current];
        imgA.classList.add("active");
        imgB.classList.remove("active");
      }
    }, 2000);
  }

  /* ===================================================
     🔹 CARRUSEL DE EQUIPO (horizontal, drag + auto scroll)
  =================================================== */
  const carousel = document.getElementById("equipoCarousel");
  if (carousel) {
    // precargar
    carousel.querySelectorAll("img").forEach(img => new Image().src = img.src);

    let isDown = false, startX, scrollLeft;

    // Drag con mouse
    carousel.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.add("dragging");
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
      carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mouseleave", () => {
      isDown = false;
      carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.6;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Drag táctil
    carousel.addEventListener("touchstart", e => {
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      isDown = true;
    }, { passive: true });

    carousel.addEventListener("touchend", () => { isDown = false; });
    carousel.addEventListener("touchmove", e => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.6;
      carousel.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    // Auto scroll
    let autoScrollInterval;
    const startAuto = () => {
      stopAuto();
      autoScrollInterval = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 5) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: 240, behavior: "smooth" });
        }
      }, 3500);
    };
    const stopAuto = () => clearInterval(autoScrollInterval);

    // pausa durante interacción
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mousedown", stopAuto);
    carousel.addEventListener("touchstart", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("touchend", startAuto);

    startAuto();
  }

  /* ===================================================
     🔹 FRAME DE "NOSOTROS" (rotación + arrastre manual)
  =================================================== */
  const frame = document.querySelector(".nosotros-image-frame");
  if (frame) {
    const imgs = frame.querySelectorAll("img");
    let current = 0;
    let interval;
    let dragging = false;
    let startX = 0;

    function showImage(index) {
      imgs.forEach((img, i) => img.classList.toggle("active", i === index));
    }

    function nextImage() {
      current = (current + 1) % imgs.length;
      showImage(current);
    }

    function prevImage() {
      current = (current - 1 + imgs.length) % imgs.length;
      showImage(current);
    }

    function startAuto() {
      interval = setInterval(nextImage, 4000);
    }

    function stopAuto() {
      clearInterval(interval);
    }

    // inicializar
    showImage(current);
    startAuto();

    // drag con mouse
    frame.addEventListener("mousedown", e => {
      dragging = true;
      startX = e.pageX;
      stopAuto();
    });

    frame.addEventListener("mouseup", e => {
      if (!dragging) return;
      dragging = false;
      const delta = e.pageX - startX;
      if (delta > 50) prevImage();
      else if (delta < -50) nextImage();
      startAuto();
    });

    frame.addEventListener("mouseleave", () => dragging = false);

    // drag táctil
    frame.addEventListener("touchstart", e => {
      dragging = true;
      startX = e.touches[0].pageX;
      stopAuto();
    }, { passive: true });

    frame.addEventListener("touchend", e => {
      if (!dragging) return;
      dragging = false;
      const delta = e.changedTouches[0].pageX - startX;
      if (delta > 50) prevImage();
      else if (delta < -50) nextImage();
      startAuto();
    });
  }
  const inputBusqueda = document.getElementById("busqueda");
const proyectos = document.querySelectorAll(".proyecto-card");

inputBusqueda.addEventListener("input", () => {
  const filtro = inputBusqueda.value.toLowerCase().trim();
  proyectos.forEach(card => {
    const nombre = (card.dataset.nombre || "").toLowerCase();
    const etiqueta = (card.dataset.etiqueta || "").toLowerCase();
    card.style.display = (nombre.includes(filtro) || etiqueta.includes(filtro)) ? "block" : "none";
  });
});
});
const slider = document.querySelector('.slider-wrapper');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

btnPrev.addEventListener('click', () => {
  slider.scrollBy({ left: -320, behavior: 'smooth' });
});

btnNext.addEventListener('click', () => {
  slider.scrollBy({ left: 320, behavior: 'smooth' });
});


