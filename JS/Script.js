let swiper = null;
const thumbs = ["Elements/1.jpg", "Elements/2.jpg", "Elements/3.jpg", "Elements/5.jpg", "Elements/4.jpg"];

function initSwiper() {
    
  let currentIndex = 0;
  if (swiper) {
    currentIndex = swiper.realIndex;
    swiper.destroy(true, true);
    swiper = null;
  }

  // Main Slider
  swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    initialSlide: currentIndex,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination-default",
      clickable: true,
    },
  });

  // Custom
  const bulletsContainer = document.querySelector(".swiper-pagination-thumbs");
  bulletsContainer.innerHTML = thumbs.map(src => `<span class="swiper-pagination-bullet"><img src="${src}" /></span>`).join("");

  function updateBullets() {
    const activeIndex = swiper.realIndex;
    const total = thumbs.length;
    const bullets = document.querySelectorAll(".swiper-pagination-thumbs .swiper-pagination-bullet");

    bullets.forEach((bullet, i) => {
      const offset = i - Math.floor(bullets.length / 2);
      const thumbIndex = (activeIndex + offset + total) % total;

      const img = bullet.querySelector("img");
      if (img) img.src = thumbs[thumbIndex];

      bullet.classList.remove("left", "right", "active");
      if (offset === 0) bullet.classList.add("active");
      else if (offset < 0) bullet.classList.add("left");
      else bullet.classList.add("right");
    });
  }

  swiper.on("slideChange", updateBullets);
  updateBullets();
}

window.addEventListener("resize", initSwiper);
initSwiper();
