import closeBtn from '../asset/close-hamburger.svg';
import UtilityModule from './UtilityModule.js';
import { fields, dropDowns } from './data/bookFormInputsData.js';

export default class RenderInput {
  renderBookForm() {
    if (!Array.isArray(fields) || fields.length <= 0) {
      throw new Error('fields data is missing or Invalid');
    }

    if (!Array.isArray(dropDowns) || dropDowns.length <= 0) {
      throw new Error('dropDowns data is missing or invalid');
    }

    const formContainer = UtilityModule.createElement(
      'div',
      UtilityModule.rootDiv,
      null,
      'form-container hidden first-load-hidden-form'
    );

    const inputForm = UtilityModule.createElement(
      'form',
      formContainer,
      null,
      null
    );
    inputForm.setAttribute('id', 'form');

    const closeFormBtn = UtilityModule.createElement(
      'button',
      inputForm,
      null,
      'close-form-btn'
    );

    const closeBtnImg = UtilityModule.createElement(
      'img',
      closeFormBtn,
      null,
      'close-btn-img'
    );

    closeBtnImg.src = closeBtn;

    fields.forEach((field) => this.inputFields(field, inputForm));
    dropDowns.forEach((dropDown) => this.dropDownFields(dropDown, inputForm));

    this.inputSubmitBtn(inputForm);
  }

  inputSubmitBtn(inputForm) {
    const btnWrapper = UtilityModule.createElement(
      'div',
      inputForm,
      null,
      'create-btn-wrapper'
    );

    const submitBtn = UtilityModule.createElement(
      'button',
      btnWrapper,
      'Add book',
      null
    );

    submitBtn.setAttribute('type', 'submit');
    submitBtn.id = 'submitBtn';
  }

  inputFields(field, inputForm) {
    const { label, id, placeholder, type } = field;

    const fieldWrapper = UtilityModule.createElement(
      'div',
      inputForm,
      null,
      'field-wrapper'
    );

    const fieldLabel = UtilityModule.createElement(
      'label',
      fieldWrapper,
      label,
      null
    );
    fieldLabel.setAttribute('for', id);

    UtilityModule.createElement('br', fieldWrapper, null, null);

    const fieldInput = UtilityModule.createElement(
      'input',
      fieldWrapper,
      null,
      null
    );
    fieldInput.type = type;
    fieldInput.id = id;
    fieldInput.placeholder = placeholder;
  }

  dropDownFields(dropDown, inputForm) {
    const { label, id, options } = dropDown;

    const optionWrapper = UtilityModule.createElement(
      'div',
      inputForm,
      null,
      'dropdown-wrapper'
    );

    const optionLabel = UtilityModule.createElement(
      'label',
      optionWrapper,
      label,
      null
    );

    optionLabel.setAttribute('for', id);

    UtilityModule.createElement('br', optionWrapper, null, null);

    const selectElement = UtilityModule.createElement(
      'select',
      optionWrapper,
      null,
      null
    );
    selectElement.setAttribute('name', id);
    selectElement.id = id;

    options.forEach((option) => {
      const optionTag = UtilityModule.createElement(
        'option',
        selectElement,
        option,
        null
      );
      optionTag.setAttribute('value', option);
    });
  }

  stopFormPropagation() {
    const form = document.getElementById('form');
    if (!form) return;
    form.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  formContainerHandler() {
    const formCont = document.querySelector('.form-container');
    formCont.addEventListener('click', (e) => {
      e.preventDefault();
      formCont.classList.add('hidden');
    });
    this.stopFormPropagation();
  }

  formElementCloseHandler() {
    const closeFormBtn = document.querySelector('.close-form-btn');
    const formCont = document.querySelector('.form-container');

    closeFormBtn.addEventListener('click', (e) => {
      e.preventDefault();
      formCont.classList.add('hidden');
    });
    this.stopFormPropagation();
  }
}
