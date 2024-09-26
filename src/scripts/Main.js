import ComponentFactory from './ComponentFactory';
import Icons from './utils/Icons';
import Carousel from './Carousel';

class Main {
  constructor() {
    this.init();
  }

  init() {
    document.documentElement.classList.add('has-js');
    console.log('Carousel');
    const carousel = document.querySelectorAll("[data-component='Carousel']");
    for (let i = 0; i < carousel.length; i++) {
      const carous = carousel[i];
      new Carousel(carous);
    }
    new ComponentFactory();

    Icons.load();
  }
}
new Main();
