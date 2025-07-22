import { describe, it, expect, beforeEach, vi } from 'vitest';
import UtilityModule from '../js-components/UtilityModule';
import LibraryState from '../js-components/LibraryState';
import AsideBar from '../js-components/AsideBar';
import RenderUI from '../js-components/RenderUI';
import CreateInput from '../js-components/CreateInput';
import RenderLibrary from '../js-components/RenderLibrary';
import RenderInput from '../js-components/RenderInput';
import LibraryStore from '../js-components/LibraryStore.js';

let rootDiv,
  libraryState,
  asideBar,
  renderUI,
  createInput,
  renderLibrary,
  renderInput = null;

beforeEach(async () => {
  document.body.innerHTML = `<div id="div"></div>`;
  UtilityModule.rootDiv = document.querySelector('#div');
  rootDiv = UtilityModule.rootDiv;

  await import('../index.js');
  document.dispatchEvent(new Event('DOMContentLoaded'));

  libraryState = new LibraryState();
  asideBar = new AsideBar();
  renderUI = new RenderUI();
  createInput = new CreateInput(renderUI);
  renderLibrary = new RenderLibrary(libraryState, renderUI, asideBar);
  renderInput = new RenderInput(libraryState, renderLibrary);
});

describe('index.js', () => {
  describe('createInput', () => {
    beforeEach(() => {
      createInput.renderBookForm();
      createInput.formContainerHandler();
      createInput.formElementCloseHandler();
      asideBar.asideContainerHandler();
    });

    it('should call renderBookForm() and render a div with class form-container', () => {
      expect(rootDiv.querySelector('.form-container')).toBeTruthy();
    });
    it('should call formContainerHandler() and add a class hidden to the form-container', () => {
      const formContainer = rootDiv.querySelector('.form-container');
      formContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(formContainer.classList.contains('hidden')).toBe(true);
    });
    it('should call formElementCloseHandler() and render a div with class form-element', () => {
      const closeFormBtn = document.querySelector('.close-form-btn');
      const formContainer = document.querySelector('.form-container');
      closeFormBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(formContainer.classList.contains('hidden')).toBe(true);
    });
  });

  describe('asideBar', () => {
    beforeEach(() => {
      asideBar.doneReading();
      asideBar.yetToRead();
      asideBar.smallScreenAsideBar();
      asideBar.smallScreenAsideHandler();
    });

    it('should call doneReading() and render a div with class done-reading-container', () => {
      expect(rootDiv.querySelector('.done-reading-container')).toBeTruthy();
    });
    it('should call yetToRead() and render a div with class yet-to-read-container', () => {
      expect(rootDiv.querySelector('.yet-to-read-container')).toBeTruthy();
    });
    it('should call smallScreenAsideBar() and render a button and img with class small--screen-aside-Btn and ham-img', () => {
      expect(rootDiv.querySelector('.small--screen-aside-Btn')).toBeTruthy();
      expect(rootDiv.querySelector('.ham-img').src).toMatch(/image\/svg\+xml/);
    });
    it('should toggle .small-aside-bar class on click', (done) => {
      const smScreen = rootDiv.querySelector('.small--screen-aside-Btn');
      const aside = rootDiv.querySelector('.aside-bar');

      expect(aside).toBeTruthy();

      setTimeout(() => {
        smScreen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(aside.classList.contains('small-aside-bar')).toBe(true);

        smScreen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(aside.classList.contains('small-aside-bar')).toBe(false);
        done();
      }, 100);
    });
    it('should call asideContainerHandler() and render a div with class aside-container', () => {
      const asideBar = rootDiv.querySelector('.aside-bar');
      const asideContainer = rootDiv.querySelector('.aside-container');
      const hamImg = rootDiv.querySelector('.ham-img');

      expect(asideBar).toBeTruthy();
      expect(asideContainer).toBeTruthy();
      expect(hamImg).toBeTruthy();

      asideBar.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(asideBar.classList.contains('aside-bar')).toBe(true);
      expect(asideBar.classList.contains('small-aside-bar')).toBe(false);
      expect(hamImg.src).toMatch(/image\/svg\+xml/);
    });
  });

  describe('renderUI', () => {
    beforeEach(() => {
      renderUI.mainHeading();
      renderUI.bookCreateAndDeleteBtns();
      renderUI.createLibraryHandler();
      renderUI.deleteAllLibraryHandle(renderLibrary);
      renderInput.initializeForm();
      renderLibrary.renderBooks();
      renderLibrary.attachEditAndDoneHandler();
      renderLibrary.attachDeleteBookHandler();
    });
    it('should call mainHeading() and render a h1 with class main-heading', () => {
      expect(rootDiv.querySelector('.main-heading')).toBeTruthy();
    });
    it('should call bookCreateAndDeleteBtns() and render a two buttons with class curd-btn-wrapper and delete-all-books', () => {
      expect(rootDiv.querySelector('.curd-btn-wrapper')).toBeTruthy();
      expect(rootDiv.querySelector('.delete-all-books')).toBeTruthy();
    });
    it('should call createLibraryHandler() and render a and render form by removing "hidden" class', () => {
      const createBookBtn = rootDiv.querySelector('.create-book');
      createBookBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(
        rootDiv.querySelector('.form-container').classList.contains('hidden')
      ).toBe(false);
    });
    it('should call deleteAllLibraryHandle() and return a message if there are no books to delete', () => {
      const deleteAllBooksBtn = rootDiv.querySelector('.delete-all-books');
      LibraryStore.storedBooks.length = 0;
      const spyMsg = vi.spyOn(UtilityModule, 'activityMsg');
      deleteAllBooksBtn.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      expect(spyMsg).toHaveBeenCalledWith(
        'Your Book Tracker is already empty'
      );
      expect(LibraryStore.storedBooks.length).toBe(0);
    });
    it('should call deleteAllLibraryHandle() and delete all books from library', () => {
      const deleteAllBooksBtn = rootDiv.querySelector('.delete-all-books');
      LibraryStore.storedBooks.length = 100;
      const spyMsg = vi.spyOn(UtilityModule, 'activityMsg');
      deleteAllBooksBtn.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      expect(spyMsg).toHaveBeenCalledWith(
        'Your Book Tracker is now empty'
      );
      expect(LibraryStore.storedBooks.length).toBe(0);
    });
    it('should call initializeForm() and store book when valid input is provided', (done) => {
      const submitBtn = rootDiv.querySelector('#submitBtn');
      const bookName = rootDiv.querySelector('#bookName');
      const authorName = rootDiv.querySelector('#authorName');
      const pageNumber = rootDiv.querySelector('#pageNumber');
      const haveRead = rootDiv.querySelector('#haveRead');

      const spyStoreBooks = vi.spyOn(renderInput.libraryState, 'storeBooks');

      submitBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      setTimeout(() => {
        const id = 12345678910;
        bookName.value = 'The Great Gatsby';
        authorName.value = 'John Doe';
        pageNumber.value = 299;
        haveRead.value = 'Yes';
        expect(spyStoreBooks).toHaveBeenCalledWith(
          id,
          bookName.value,
          authorName.value,
          pageNumber.value,
          haveRead.value
        );
        done();
      }, 100);
    });
    it('should call renderBooks() and render a div with class library-container', () => {
      expect(rootDiv.querySelector('.library-container')).toBeTruthy();
    });
    it('should call attachEditAndDoneHandler() and attach a click event listener to the edit buttons', (done) => {
      const editBtn = rootDiv.querySelector('.edit-btn');

      setTimeout(() => {
        editBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(rootDiv.querySelector('.read-para').textContent).toBe('true');
        expect(
          rootDiv.querySelector('.read-para').classList.contains('highlight')
        ).toBe(true);
        done();
      }, 100);
    });

    it('should call attachDeleteBookHandler and delete a book from library', (done) => {
      const deleteBtn = rootDiv.querySelector('.delete-btn');

      LibraryStore.storedBooks.length = 100;

      setTimeout(() => {
        deleteBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(LibraryStore.storedBooks.length).toBe(0);
        done();
      }, 100);
    });
  });
});
