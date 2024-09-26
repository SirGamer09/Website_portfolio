import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        clickable: true,
      },
    };
    this.init();
  }

  init() {
    console.log('Initialisation de ma composante Carousel');
    this.setOptions();
    const swiper = new Swiper(this.element, this.options);
  }

  setOptions() {

   
    if ('slidesPerView' in this.element.dataset) {
        this.options.breakpoints = {slidesPerView: 2.5};
      }
  }
}

