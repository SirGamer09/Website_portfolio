
import Header from "./Header";
export default class ComponentFactory{
    constructor() {
        this.componentList = {
            Header,
        };


    this.init();
  }

  init() {
    document.documentElement.classList.add('has-js');
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;


        if (this.componentList[componentName]){
            new this.componentList[componentName](element);
        }

        else{
            console.log(`la composante ${componentName} n'existe pas`);
        }
        
    }

  
    // Chargement du sprite svg par le système d'icône
    
  }
}


  
