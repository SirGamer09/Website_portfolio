export default class Form {
  /**
   *
   * @param {HTMLElement} element
   */

  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;
    this.init();
  }

  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log('success');
      this.showConfirmation();
    } else {
      console.log('fail');
    }
  }

  /**
   *
   * @return {boolean}
   */

  validate() {
    let isValid = true;
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }

    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event;

    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.add('error');
  }

  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    // Cache le formulaire
    this.element.style.display = 'none';

    // Crée un élément pour afficher le message de confirmation
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('form__confirmation-message');
    confirmationMessage.innerText = 'Votre formulaire a bien été envoyé !';

    // Ajoute le message après le formulaire
    this.element.parentElement.appendChild(confirmationMessage);

    setTimeout(() => {
      confirmationMessage.classList.add('active');
    }, 100); // Délai de 100ms pour s'assurer que le message soit bien ajouté au DOM avant d'ajouter la classe
  }
}
