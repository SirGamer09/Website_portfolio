import Swiper from 'swiper/bundle';
// After page content loads

// Instance pour la section summary-side-right avec autoplay
const summarySwiper = new Swiper('.summary-swiper', {
  direction: 'horizontal',
  loop: true, // Tu peux changer selon tes besoins

  slidesPerView: 1, // Une seule image à la fois
  spaceBetween: 30, // Espacement entre les images
  pagination: {
    el: '.swiper-pagination', // Pagination si besoin
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

const mySwiper = new Swiper('.swiper-container', {
  loop: false, // Enable looping
  slidesPerView: 1, // Show one slide at a time
  spaceBetween: 30, // Space between slides
  centeredSlides: true, // Center the active slide
  effect: 'coverflow', // Use the coverflow effect
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true, // Enable shadows for a 3D effect
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // Enable clickable pagination
  },
});
