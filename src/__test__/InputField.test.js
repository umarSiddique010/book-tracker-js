import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InputField from '../js-components/InputField.js';
import BookStateManagement from '../js-components/BookStateManagement.js';
import RenderTracker from '../js-components/RenderTracker.js';
import UtilityModule from '../js-components/UtilityModule.js';
import RenderBasicUI from '../js-components/RenderBasicUI.js';
import Aside from '../js-components/Aside.js';
import RenderForm from '../js-components/RenderForm.js';

let rootDiv,
  inputField,
  bookStateManagement,
  renderTracker,
  renderBasicUI,
  aside,
  renderForm = null;

beforeEach(() => {
  document.body.innerHTML = `<div id="root"></div>`;
  UtilityModule.rootDiv = document.querySelector('#root');
  rootDiv = UtilityModule.rootDiv;
  bookStateManagement = new BookStateManagement();
  renderBasicUI = new RenderBasicUI();
  aside = new Aside();
  renderTracker = new RenderTracker(bookStateManagement, renderBasicUI, aside);
  inputField = new InputField(bookStateManagement, renderTracker);
  renderForm = new RenderForm();
});

describe('InputField', () => {
  beforeEach(() => {
    renderForm.renderBookForm();
  });

  describe('constructor', () => {
    it('should create an instance of bookStateManagement', () => {
      expect(inputField.bookStateManagement).toBeInstanceOf(
        BookStateManagement
      );
    });

    it('should create an instance of renderTracker', () => {
      expect(inputField.renderTracker).toBeInstanceOf(RenderTracker);
    });
  });

  describe('initializeForm', () => {
    let spyActivityMsg, spyStoreBooks, spyRenderBooks;

    beforeEach(() => {
      inputField.initializeForm();

      spyActivityMsg = vi
        .spyOn(UtilityModule, 'activityMsg')
        .mockImplementation(() => {});
      spyStoreBooks = vi
        .spyOn(inputField.bookStateManagement, 'storeBooks')
        .mockImplementation(() => {});
      spyRenderBooks = vi
        .spyOn(inputField.renderTracker, 'renderBooks')
        .mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should show error if book name, author or page number is empty', () => {
      const bookName = rootDiv.querySelector('#bookName');
      const authorName = rootDiv.querySelector('#authorName');
      const pageNumber = rootDiv.querySelector('#pageNumber');
      const haveRead = rootDiv.querySelector('#haveRead');
      const submitBtn = rootDiv.querySelector('#submitBtn');

      bookName.value = '';
      authorName.value = '';
      pageNumber.value = '';
      haveRead.value = 'Yes';

      submitBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(spyActivityMsg).toHaveBeenCalledWith(
        'Book name, Author name or page number cannot be empty'
      );
      expect(spyStoreBooks).not.toHaveBeenCalled();
    });

    it("should show error if page number's value is not a number", () => {
      const bookName = rootDiv.querySelector('#bookName');
      const authorName = rootDiv.querySelector('#authorName');
      const pageNumber = rootDiv.querySelector('#pageNumber');
      const haveRead = rootDiv.querySelector('#haveRead');
      const submitBtn = rootDiv.querySelector('#submitBtn');

      bookName.value = 'Some Book';
      authorName.value = 'Some Author';
      pageNumber.value = 'abc123';
      haveRead.value = 'Yes';

      submitBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(spyActivityMsg).toHaveBeenCalledWith(
        "page number's value must be number"
      );
      expect(spyStoreBooks).not.toHaveBeenCalled();
    });

    it('should store book and reset form when input is valid', () => {
      const bookName = rootDiv.querySelector('#bookName');
      const authorName = rootDiv.querySelector('#authorName');
      const pageNumber = rootDiv.querySelector('#pageNumber');
      const haveRead = rootDiv.querySelector('#haveRead');
      const submitBtn = rootDiv.querySelector('#submitBtn');

      bookName.value = '1984';
      authorName.value = 'George Orwell';
      pageNumber.value = '328';
      haveRead.value = 'Yes';

      submitBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(spyStoreBooks).toHaveBeenCalledWith(
        expect.any(Number),
        'George Orwell',
        '1984',
        '328',
        'Yes'
      );
      expect(spyRenderBooks).toHaveBeenCalled();
      expect(spyActivityMsg).toHaveBeenCalledWith('Book added successfully');
    });
  });

  describe('resetForm()', () => {
    it('should clear all form input values and reset haveRead to "Yes"', () => {
      const bookName = rootDiv.querySelector('#bookName');
      const authorName = rootDiv.querySelector('#authorName');
      const pageNumber = rootDiv.querySelector('#pageNumber');
      const haveRead = rootDiv.querySelector('#haveRead');

      bookName.value = '1984';
      authorName.value = 'George Orwell';
      pageNumber.value = '328';
      haveRead.value = 'No';

      inputField.resetForm();

      expect(bookName.value).toBe('');
      expect(authorName.value).toBe('');
      expect(pageNumber.value).toBe('');
      expect(haveRead.value).toBe('Yes');
    });
  });
});
