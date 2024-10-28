export default class Toggle {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const btnClick1 = document.querySelector('.btn-click-1');
      const btnClick2 = document.querySelector('.btn-click-2');
      const btnClick3 = document.querySelector('.btn-click-3');

      const container1 = document.querySelector('.outils-container-1');
      const container2 = document.querySelector('.outils-container-2');
      const container3 = document.querySelector('.outils-container-3');

      let currentVisibleContainer = 1; // Suivi du conteneur actuellement visible

      // Fonction pour afficher le prochain conteneur et masquer l'actuel
      this.toggleContainers = () => {
        if (currentVisibleContainer === 1) {
          container1.style.display = 'none';
          container2.style.display = 'block';
          currentVisibleContainer = 2;
        } else if (currentVisibleContainer === 2) {
          container2.style.display = 'none';
          container3.style.display = 'block';
          currentVisibleContainer = 3;
        } else if (currentVisibleContainer === 3) {
          container3.style.display = 'none';
          container1.style.display = 'block';
          currentVisibleContainer = 1;
        }
      };

      // Ajout des événements de clic aux boutons
      btnClick1.addEventListener('click', this.toggleContainers.bind(this));
      btnClick2.addEventListener('click', this.toggleContainers.bind(this));
      btnClick3.addEventListener('click', this.toggleContainers.bind(this));
    });
  }
}
