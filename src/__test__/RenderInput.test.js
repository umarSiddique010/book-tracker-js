import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RenderInput from '../js-components/RenderInput';
import LibraryState from '../js-components/LibraryState';
import RenderLibrary from '../js-components/RenderLibrary';
import UtilityModule from '../js-components/UtilityModule';
import RenderUI from '../js-components/RenderUI';
import AsideBar from '../js-components/AsideBar';
import CreateInput from '../js-components/CreateInput';

let rootDiv,
  renderInput,
  libraryState,
  renderLibrary,
  renderUI,
  asideBar,
  createInput = null;

beforeEach(() => {
  document.body.innerHTML = `<div id="root"></div>`;
  UtilityModule.rootDiv = document.querySelector('#root');
  rootDiv = UtilityModule.rootDiv;
  libraryState = new LibraryState();
  renderUI = new RenderUI();
  asideBar = new AsideBar();
  renderLibrary = new RenderLibrary(libraryState, renderUI, asideBar);
  renderInput = new RenderInput(libraryState, renderLibrary);
  createInput = new CreateInput();
});

describe('RenderInput', () => {
  beforeEach(() => {
    createInput.renderBookForm();
  });

  describe('constructor', () => {
    it('should create an instance of libraryState', () => {
      expect(renderInput.libraryState).toBeInstanceOf(LibraryState);
    });

    it('should create an instance of renderLibrary', () => {
      expect(renderInput.renderLibrary).toBeInstanceOf(RenderLibrary);
    });
  });

  describe('initializeForm', () => {
    let spyActivityMsg, spyStoreBooks, spyRenderBooks;

    beforeEach(() => {
      renderInput.initializeForm();

      spyActivityMsg = vi
        .spyOn(UtilityModule, 'activityMsg')
        .mockImplementation(() => {});
      spyStoreBooks = vi
        .spyOn(renderInput.libraryState, 'storeBooks')
        .mockImplementation(() => {});
      spyRenderBooks = vi
        .spyOn(renderInput.renderLibrary, 'renderBooks')
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
        '1984',
        'George Orwell',
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

      renderInput.resetForm();

      expect(bookName.value).toBe('');
      expect(authorName.value).toBe('');
      expect(pageNumber.value).toBe('');
      expect(haveRead.value).toBe('Yes');
    });
  });
});
