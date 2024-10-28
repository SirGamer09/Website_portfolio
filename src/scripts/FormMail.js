export default class FormMail {
  /**
   * @param {HTMLFormElement} element
   */
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;
    this.init();
  }

  init() {
    // Disable the default HTML5 validation
    this.element.setAttribute('novalidate', '');

    // Add input event listeners for validation
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];
      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    // Add submit event listener
    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log('Form submission successful');
      this.showConfirmation();
      const formData = new FormData(this.element);

      fetch('https://formspree.io/f/xovqjnpn', {
        // Remplace par ton Form ID
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
    } else {
      console.log(' formulaire marche pas ');
    }
  }

  /**
   * Validates the entire form
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

  /**
   * Validates a single input field
   * @param {Event|HTMLInputElement} eventOrInput
   * @return {boolean}
   */
  validateInput(eventOrInput) {
    const input = eventOrInput.currentTarget || eventOrInput;

    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container = input.closest('.form-group');
    if (container) {
      container.classList.add('error');
    }
  }

  removeError(input) {
    const container = input.closest('.form-group');
    if (container) {
      container.classList.remove('error');
    }
  }

  showConfirmation() {
    // Hide the form
    this.element.style.display = 'none';

    // Create a confirmation message element
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('form-confirmation');
    confirmationMessage.innerText =
      'Le formulaire à été envoyé! Je vous contacte sous peu. ';

    // Insert the confirmation message after the form
    this.element.parentElement.appendChild(confirmationMessage);

    // Optional: Add a class for animations or styling
    setTimeout(() => {
      confirmationMessage.classList.add('active');
    }, 100);
  }
}
