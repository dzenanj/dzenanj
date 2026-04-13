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
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

lightboxTriggers.forEach((item) => {
  item.addEventListener("click", () => {
    const imageSrc = item.getAttribute("data-image");
    lightboxImage.style.backgroundImage = `url("${imageSrc}")`;
    lightbox.classList.add("active");
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

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
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
