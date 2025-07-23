import { describe, it, expect, beforeEach, vi } from 'vitest';
import CreateInput from '../js-components/CreateInput.js';
import UtilityModule from '../js-components/UtilityModule.js';
import { bookInputFields, bookFormDropDowns } from '../js-components/data/bookFormInputsData.js';

let rootDiv,
  createInput = null;
beforeEach(() => {
  document.body.innerHTML = `<div id="root"></div>`;
  UtilityModule.rootDiv = document.querySelector('#root');
  rootDiv = UtilityModule.rootDiv;
  createInput = new CreateInput();
});

describe('CreateInput', () => {
  describe('renderBookForm()', () => {
    it('throws if fields data is invalid', () => {
      const backup = [...bookInputFields];
      bookInputFields.length = 0;

      expect(() => createInput.renderBookForm()).toThrowError(
        'fields data is missing or Invalid'
      );

      bookInputFields.push(...backup);
    });

    it('throws if dropDowns data is invalid', () => {
      const backup = [...bookFormDropDowns];
      bookFormDropDowns.length = 0;

      expect(() => createInput.renderBookForm()).toThrowError(
        'dropDowns data is missing or invalid'
      );

      bookFormDropDowns.push(...backup);
    });

    it('creates .form-container inside #root with .hidden and .first-load-hidden-form', () => {
      createInput.renderBookForm();

      const container = document.querySelector('.form-container');
      expect(container).not.toBeNull();
      expect(container.classList.contains('hidden')).toBe(true);
      expect(container.classList.contains('first-load-hidden-form')).toBe(true);
      expect(rootDiv.contains(container)).toBe(true);
    });

    it('creates a form with id="form" inside .form-container', () => {
      createInput.renderBookForm();

      const form = document.querySelector('.form-container form');
      expect(form).not.toBeNull();
      expect(form.id).toBe('form');
    });

    it('creates close-form button and image inside form', () => {
      createInput.renderBookForm();

      const closeBtn = document.querySelector('.close-form-btn');
      expect(closeBtn).not.toBeNull();

      const img = closeBtn.querySelector('img');
      expect(img).not.toBeNull();
      expect(img.classList.contains('close-btn-img')).toBe(true);
      expect(img.src).toMatch(/image\/svg\+xml/);
    });

    it('renders all input fields from fields[]', () => {
      createInput.renderBookForm();

      bookInputFields.forEach(({ id, placeholder, type }) => {
        const input = document.getElementById(id);
        expect(input).not.toBeNull();
        expect(input.placeholder).toBe(placeholder);
        expect(input.type).toBe(type);
      });
    });

    it('renders all dropdowns from dropDowns[] with options', () => {
      createInput.renderBookForm();

      bookFormDropDowns.forEach(({ id, options }) => {
        const select = document.getElementById(id);
        expect(select).not.toBeNull();

        options.forEach((opt) => {
          const option = Array.from(select.options).find(
            (o) => o.value === opt
          );
          expect(option).not.toBeUndefined();
          expect(option.textContent).toBe(opt);
        });
      });
    });

    it('adds a submit button with id="submitBtn" and text "Add book"', () => {
      createInput.renderBookForm();

      const btn = document.getElementById('submitBtn');
      expect(btn).not.toBeNull();
      expect(btn.textContent).toBe('Add book');
      expect(btn.getAttribute('type')).toBe('submit');
    });

    it('calls inputFields() for each field in renderBookForm()', () => {
      const spy = vi.spyOn(createInput, 'inputFields');
      createInput.renderBookForm();
      expect(spy).toHaveBeenCalledTimes(bookInputFields.length);
      spy.mockRestore();
    });

    it('calls dropDownFields() for each dropdown in renderBookForm()', () => {
      const spy = vi.spyOn(createInput, 'dropDownFields');
      createInput.renderBookForm();
      expect(spy).toHaveBeenCalledTimes(bookFormDropDowns.length);
      spy.mockRestore();
    });

    it('calls inputSubmitBtn() exactly once in renderBookForm()', () => {
      const spy = vi.spyOn(createInput, 'inputSubmitBtn');
      createInput.renderBookForm();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });

  describe('inputSubmitBtn()', () => {
    it('adds a submit button with id="submitBtn", type="submit", and text "Add"', () => {
      const dummyForm = document.createElement('form');
      rootDiv.appendChild(dummyForm);

      createInput.inputSubmitBtn(dummyForm);

      const wrapper = dummyForm.querySelector('.create-btn-wrapper');
      expect(wrapper).not.toBeNull();

      const submitBtn = wrapper.querySelector('#submitBtn');
      expect(submitBtn).not.toBeNull();
      expect(submitBtn.getAttribute('type')).toBe('submit');
      expect(submitBtn.textContent).toBe('Add book');
    });
  });

  describe('inputFields()', () => {
    it('renders a labeled input field inside a .field-wrapper', () => {
      const dummyForm = document.createElement('form');
      rootDiv.appendChild(dummyForm);

      const field = {
        label: 'Title',
        id: 'title',
        placeholder: 'Book Title',
        type: 'text',
      };

      createInput.inputFields(field, dummyForm);

      const wrapper = dummyForm.querySelector('.field-wrapper');
      expect(wrapper).not.toBeNull();

      const labelEl = wrapper.querySelector('label');
      expect(labelEl).not.toBeNull();
      expect(labelEl.textContent).toBe('Title');
      expect(labelEl.getAttribute('for')).toBe('title');

      const br = wrapper.querySelector('br');
      expect(br).not.toBeNull();

      const input = wrapper.querySelector('input');
      expect(input).not.toBeNull();
      expect(input.type).toBe('text');
      expect(input.id).toBe('title');
      expect(input.placeholder).toBe('Book Title');
    });
  });

  describe('dropDownFields()', () => {
    it('renders a labeled select dropdown with correct options', () => {
      const dummyForm = document.createElement('form');
      rootDiv.appendChild(dummyForm);

      const dropDown = {
        label: 'Have you read it?',
        id: 'haveRead',
        options: ['Yes', 'No'],
      };

      createInput.dropDownFields(dropDown, dummyForm);

      const wrapper = dummyForm.querySelector('.dropdown-wrapper');
      expect(wrapper).not.toBeNull();

      const labelEl = wrapper.querySelector('label');
      expect(labelEl).not.toBeNull();
      expect(labelEl.textContent).toBe('Have you read it?');
      expect(labelEl.getAttribute('for')).toBe('haveRead');

      const br = wrapper.querySelector('br');
      expect(br).not.toBeNull();

      const select = wrapper.querySelector('select');
      expect(select).not.toBeNull();
      expect(select.id).toBe('haveRead');
      expect(select.getAttribute('name')).toBe('haveRead');

      const renderedOptions = Array.from(select.options).map(
        (opt) => opt.value
      );
      expect(renderedOptions).toEqual(['Yes', 'No']);

      dropDown.options.forEach((val) => {
        const option = Array.from(select.options).find((o) => o.value === val);
        expect(option).not.toBeUndefined();
        expect(option.textContent).toBe(val);
      });
    });
  });

  describe('stopFormPropagation()', () => {
    it('adds a click event listener to #form that stops propagation', () => {
      createInput.renderBookForm();
      const form = document.getElementById('form');
      const stopPropagationSpy = vi.fn();

      createInput.stopFormPropagation();

      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'stopPropagation', {
        value: stopPropagationSpy,
      });
      form.dispatchEvent(clickEvent);

      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('does nothing if #form does not exist', () => {
      const form = document.getElementById('form');
      if (form) form.remove();

      expect(() => createInput.stopFormPropagation()).not.toThrow();
    });
  });

  describe('formContainerHandler()', () => {
    it('adds click listener to .form-container that hides it and calls stopFormPropagation()', () => {
      createInput.renderBookForm();
      const formCont = document.querySelector('.form-container');
      const stopSpy = vi.spyOn(createInput, 'stopFormPropagation');

      createInput.formContainerHandler();

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      formCont.dispatchEvent(clickEvent);

      expect(formCont.classList.contains('hidden')).toBe(true);
      expect(stopSpy).toHaveBeenCalled();

      stopSpy.mockRestore();
    });
  });

  describe('formElementCloseHandler()', () => {
    it('adds click listener to .close-form-btn that hides .form-container and calls stopFormPropagation()', () => {
      createInput.renderBookForm();
      const closeBtn = document.querySelector('.close-form-btn');
      const formCont = document.querySelector('.form-container');
      const stopSpy = vi.spyOn(createInput, 'stopFormPropagation');

      createInput.formElementCloseHandler();
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      closeBtn.dispatchEvent(clickEvent);

      expect(formCont.classList.contains('hidden')).toBe(true);
      expect(stopSpy).toHaveBeenCalled();

      stopSpy.mockRestore();
    });
  });
});
