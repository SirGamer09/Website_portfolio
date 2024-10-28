import Header from './Header';
import FormMail from './FormMail';
import Scrolly from './components/Scrolly';
import YouTube from './components/Youtube';
import Toggle from './components/Toggle';

export default class ComponentFactory {
  constructor() {
    this.componentList = {
      Header,
      FormMail,
      Scrolly,
      YouTube,
    };

    this.init();
  }

  init() {
    document.documentElement.classList.add('has-js');
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        new this.componentList[componentName](element);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }

    // Instancier Toggle pour le comportement de bascule
    new Toggle();
  }
}
