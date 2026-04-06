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
