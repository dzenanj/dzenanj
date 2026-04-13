const reveals = document.querySelectorAll(".reveal");

reveals.forEach((item) => {
  item.classList.add("ready");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.12
});

reveals.forEach((item) => {
  observer.observe(item);
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

const galleryImages = Array.from(lightboxTriggers).map((item) =>
  item.getAttribute("data-image")
);

let currentImageIndex = 0;

function showLightboxImage(index) {
  if (!lightboxImage || galleryImages.length === 0) return;

  if (index < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (index >= galleryImages.length) {
    currentImageIndex = 0;
  } else {
    currentImageIndex = index;
  }

  lightboxImage.style.backgroundImage = `url("${galleryImages[currentImageIndex]}")`;
}

lightboxTriggers.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentImageIndex = index;
    showLightboxImage(currentImageIndex);
    if (lightbox) {
      lightbox.classList.add("active");
    }
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  setTimeout(() => {
    if (lightboxImage) {
      lightboxImage.style.backgroundImage = "";
    }
  }, 300);
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    showLightboxImage(currentImageIndex - 1);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();
    showLightboxImage(currentImageIndex + 1);
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (lightbox && lightbox.classList.contains("active")) {
    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showLightboxImage(currentImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showLightboxImage(currentImageIndex + 1);
    }
  }
});

document.addEventListener("contextmenu", (event) => {
  if (event.target.closest(".gallery-item") || event.target.closest(".lightbox-display")) {
    event.preventDefault();
  }
});

document.addEventListener("dragstart", (event) => {
  if (event.target.closest(".gallery-item") || event.target.closest(".lightbox-display")) {
    event.preventDefault();
  }
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

document.querySelectorAll('a[href]').forEach((link) => {
  const href = link.getAttribute('href');

  if (
    href &&
    !href.startsWith('#') &&
    !href.startsWith('mailto:') &&
    !href.startsWith('tel:') &&
    !link.hasAttribute('target')
  ) {
    link.addEventListener('click', (event) => {
      const url = link.href;

      if (url && url !== window.location.href) {
        event.preventDefault();
        document.body.classList.add('fade-out');

        setTimeout(() => {
          window.location.href = url;
        }, 220);
      }
    });
  }
});

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});
