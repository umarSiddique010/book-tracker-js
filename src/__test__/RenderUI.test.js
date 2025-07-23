import { beforeEach, describe, expect, it, vi } from 'vitest';
import UtilityModule from '../js-components/UtilityModule.js';
import RenderUI from '../js-components/RenderUI.js';
import TrackerStore from '../js-components/TrackerStore.js';

let renderUI, rootDiv;

beforeEach(() => {
  document.body.innerHTML = `<div id="root"><div class="form-container hidden first-load-hidden-form"></div></div>`;
  UtilityModule.rootDiv = document.querySelector('#root');
  rootDiv = UtilityModule.rootDiv;
  renderUI = new RenderUI();
});

describe('RenderUI.js', () => {
  describe('constructor', () => {
    it('should create a <main> tag', () => {
      const main = rootDiv.querySelector('main');
      expect(main).toBeTruthy();
      expect(main.tagName).toBe('MAIN');
    });

    it('should create book-create-delete-section inside <main>', () => {
      const section = rootDiv.querySelector('section.book-create-delete-section');
      expect(section).toBeTruthy();
    });
  });

  describe('createTrackerHandler()', () => {
    it('should reveal the form container when Create button is clicked', () => {
      renderUI.createTrackerHandler();

      const createBtn = document.createElement('button');
      createBtn.classList.add('create-book');
      rootDiv.appendChild(createBtn);

      const formContainer = document.querySelector('.form-container');
      expect(formContainer.classList.contains('hidden')).toBe(true);
      expect(formContainer.classList.contains('first-load-hidden-form')).toBe(
        true
      );

      createBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(formContainer.classList.contains('hidden')).toBe(false);
      expect(formContainer.classList.contains('first-load-hidden-form')).toBe(
        false
      );
    });
  });

  describe('mainHeading()', () => {
    it('should add an <h1> with correct text and class', () => {
      renderUI.mainHeading();

      const heading = rootDiv.querySelector('h1.main-heading');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toBe('Track Your Books & Reading Progress');
    });
  });

  describe('deleteAllTrackerHandle()', () => {
    it('should delete books, clear store, call render and show success message', async () => {
      const activitySpy = vi.spyOn(UtilityModule, 'activityMsg');
      const renderMock = vi.fn();
      const deleteMock = vi.fn();

      TrackerStore.storedBooks = [{ bookId: 1, bookName: 'Book 1' }];
      TrackerStore.deleteAllBook = deleteMock;

      renderUI.deleteAllTrackerHandle({ renderBooks: renderMock });

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-all-books');
      rootDiv.appendChild(deleteBtn);

      deleteBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();

      expect(deleteMock).toHaveBeenCalled();
      expect(renderMock).toHaveBeenCalled();
      expect(activitySpy).toHaveBeenCalledWith(
        'Your Book Tracker is now empty'
      );
      expect(TrackerStore.storedBooks).toEqual([]);
    });

    it('should show warning if no books are present in store', () => {
      const activitySpy = vi.spyOn(UtilityModule, 'activityMsg');
      TrackerStore.storedBooks = [];

      renderUI.deleteAllTrackerHandle({ renderBooks: vi.fn() });

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-all-books');
      rootDiv.appendChild(deleteBtn);

      deleteBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(activitySpy).toHaveBeenCalledWith(
        'Your Book Tracker is already empty'
      );
    });
  });

  describe('bookCreateAndDeleteBtns()', () => {
    it('should create wrapper, delete and create buttons with correct structure', () => {
      renderUI.bookCreateAndDeleteBtns();

      const btnWrapper = rootDiv.querySelector('.create-read-btn-wrapper');
      expect(btnWrapper).toBeTruthy();

      const deleteBtn = btnWrapper.querySelector('button.delete-all-books');
      const createBtn = btnWrapper.querySelector('button.create-book');

      expect(deleteBtn).toBeTruthy();
      expect(createBtn).toBeTruthy();

      const deleteIcon = deleteBtn.querySelector('img.delete-all-icon');
      const createIcon = createBtn.querySelector('img.create-icon');

      expect(deleteIcon).toBeTruthy();
      expect(createIcon).toBeTruthy();
      expect(createIcon.alt).toBe('create');
    });
  });
});
