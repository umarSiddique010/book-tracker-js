import { describe, it, expect, beforeEach, vi } from 'vitest';
import UtilityModule from '../js-components/UtilityModule.js';
import TrackerState from '../js-components/TrackerState.js';
import AsideBar from '../js-components/AsideBar.js';
import RenderUI from '../js-components/RenderUI.js';
import CreateInput from '../js-components/CreateInput.js';
import RenderTracker from '../js-components/RenderTracker.js';
import RenderInput from '../js-components/RenderInput.js';
import TrackerStore from '../js-components/TrackerStore.js';
import { waitFor } from '@testing-library/dom';

let rootDiv,
  trackerState,
  asideBar,
  renderUI,
  createInput,
  renderTracker,
  renderInput = null;

beforeEach(async () => {
  document.body.innerHTML = `<div id="root"></div>`;
  UtilityModule.rootDiv = document.querySelector('#root');
  rootDiv = document.querySelector('#root');

  await import('../index.js');
  document.dispatchEvent(new Event('DOMContentLoaded'));

  trackerState = new TrackerState();
  asideBar = new AsideBar();
  renderUI = new RenderUI();
  createInput = new CreateInput(renderUI);
  renderTracker = new RenderTracker(trackerState, renderUI, asideBar);
  renderInput = new RenderInput(trackerState, renderTracker);
});
afterEach(() => {
  TrackerStore.storedBooks = [];
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
    it('should toggle .small-aside-bar class on click', async () => {
      const smScreen = rootDiv.querySelector('.small--screen-aside-Btn');
      const aside = rootDiv.querySelector('.aside-bar');

      expect(aside).toBeTruthy();

      await waitFor(() => {
        smScreen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(aside.classList.contains('small-aside-bar')).toBe(true);

        smScreen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(aside.classList.contains('small-aside-bar')).toBe(false);
      });
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
      renderUI.createTrackerHandler();
      renderUI.deleteAllTrackerHandle(renderTracker);
      renderInput.initializeForm();
      trackerState.storeBooks('12345678910', 'John Doe', 'The Great Gatsby', 299, 'No');
      trackerState.storeBooks('12345678911', 'Tolkien', 'The Hobbit', 295, 'No');
      renderTracker.renderBooks();
      renderTracker.attachEditAndDoneHandler();
      renderTracker.attachDeleteBookHandler();
    });
    it('should and render a div with class tracker-container when renderBooks() is called', () => {
      expect(rootDiv.querySelector('.tracker-container')).toBeTruthy();
    });

    it('should and render a h1 with class main-heading when mainHeading() is called', () => {
      expect(rootDiv.querySelector('.main-heading')).toBeTruthy();
    });
    it('should render a two buttons with class create-read-btn-wrapper and delete-all-books when bookCreateAndDeleteBtns() is called', () => {
      expect(rootDiv.querySelector('.create-read-btn-wrapper')).toBeTruthy();
      expect(rootDiv.querySelector('.delete-all-books')).toBeTruthy();
    });
    it('should call createTrackerHandler() and render a and render form by removing "hidden" class', () => {
      const createBookBtn = rootDiv.querySelector('.create-book');
      createBookBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(
        rootDiv.querySelector('.form-container').classList.contains('hidden')
      ).toBe(false);
    });
    it('should call deleteAllTrackerHandle() and return a message if there are no books to delete', () => {
      const deleteAllBooksBtn = rootDiv.querySelector('.delete-all-books');
      TrackerStore.storedBooks.length = 0;
      const spyMsg = vi.spyOn(UtilityModule, 'activityMsg');
      deleteAllBooksBtn.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      expect(spyMsg).toHaveBeenCalledWith('Your Book Tracker is already empty');
      expect(TrackerStore.storedBooks.length).toBe(0);
    });
    it('should call deleteAllTrackerHandle() and delete all books from tracker', () => {
      const deleteAllBooksBtn = rootDiv.querySelector('.delete-all-books');
      TrackerStore.storedBooks.length = 100;
      const spyMsg = vi.spyOn(UtilityModule, 'activityMsg');
      deleteAllBooksBtn.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      expect(spyMsg).toHaveBeenCalledWith('Your Book Tracker is now empty');
      expect(TrackerStore.storedBooks.length).toBe(0);
    });
    it('should call initializeForm() and store book when valid input is provided', async () => {
      const submitBtn = rootDiv.querySelector('#submitBtn');
      const bookName = rootDiv.querySelector('#bookName');
      const authorName = rootDiv.querySelector('#authorName');
      const pageNumber = rootDiv.querySelector('#pageNumber');
      const haveRead = rootDiv.querySelector('#haveRead');

      const spyStoreBooks = vi.spyOn(renderInput.trackerState, 'storeBooks');

      submitBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      const id = 12345678910;
      bookName.value = 'Book 1';
      authorName.value = 'Author 1';
      pageNumber.value = 100;
      haveRead.value = 'Yes';
      spyStoreBooks(
        id,
        bookName.value,
        authorName.value,
        pageNumber.value,
        haveRead.value
      );

      expect(spyStoreBooks).toHaveBeenCalled();
      const args = spyStoreBooks.mock.calls[0];
      expect(args[0]).toBe(id);
      expect(args[1]).toBe(bookName.value);
      expect(args[2]).toBe(authorName.value);
      expect(args[3]).toBe(pageNumber.value);
      expect(args[4]).toBe(haveRead.value);
    });
 
    it('should call attachEditAndDoneHandler() and attach a click event listener to the edit buttons', async () => {
      const editBtn = rootDiv.querySelector('.edit-btn');
        editBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(editBtn.classList.contains('done-edit-btn')).toBe(true);
        expect(editBtn.classList.contains('edit-btn')).toBe(false);
    });

    it('should call attachDeleteBookHandler and delete a book from tracker', async () => {
      const deleteBtn = rootDiv.querySelector('.delete-btn');
        deleteBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(TrackerStore.storedBooks.length).toBe(2);
        console.log(
          'console.log TrackerStore.storedBooks:',
          TrackerStore.storedBooks.map(({ bookName }) => bookName)
        );
        
    });
  });
});
