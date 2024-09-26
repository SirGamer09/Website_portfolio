import ComponentFactory from './ComponentFactory';
import Icons from './utils/Icons';
import Carousel from './Carousel';

class Main {
  constructor() {
    this.init();
  }

  init() {
    
    new ComponentFactory();

    Icons.load();
  }
}
new Main();
