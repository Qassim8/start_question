AOS.init();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 60; // عشان الهيدر
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

let show = false;
const btn = document.querySelector(".menu-btn");
const menu = document.querySelector("nav ul");

btn.onclick = () => {
  show = !show;

  if (show) {
    menu.classList.remove(
      "opacity-0",
      "scale-95",
      "translate-y-4",
      "pointer-events-none"
    );
    menu.classList.add(
      "opacity-100",
      "scale-100",
      "translate-y-0",
      "pointer-events-auto"
    );

    btn.classList.remove("!bg-transparent", "!text-main");
    btn.classList.add("!bg-slate-800", "!text-white");
  } else {
    menu.classList.remove(
      "opacity-100",
      "scale-100",
      "translate-y-0",
      "pointer-events-auto"
    );
    menu.classList.add(
      "opacity-0",
      "scale-95",
      "translate-y-4",
      "pointer-events-none"
    );

    btn.classList.remove("!bg-slate-800", "!text-white");
    btn.classList.add("!bg-transparent", "!text-main");
  }
};

const counters = document.querySelectorAll("[data-counter]");
let hasCounted = false;

const startCounting = () => {
  counters.forEach((counter) => {
    const target = +counter.dataset.counter;
    let count = 0;

    const isMillion = target >= 1000000;
    const step = Math.ceil(target / 200); // عد ناعم

    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(interval);
      }

      // التنسيق
      if (isMillion) {
        counter.innerText = count >= 1000000 ? "1M" : `${count}`;
      } else {
        counter.innerText = count;
      }
    }, 30);
  });
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasCounted) {
        startCounting();
        hasCounted = true;
        observer.disconnect();
      }
    });
  },
  {
    threshold: 0.4,
  }
);

// نراقب العنصر الرئيسي
const grid = document.querySelector("#stats");
if (grid) observer.observe(grid);
