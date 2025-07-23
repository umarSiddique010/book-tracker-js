import { beforeEach, describe, expect, it, vi } from 'vitest';
import UtilityModule from '../js-components/UtilityModule.js';
import RenderTracker from '../js-components/RenderTracker.js';
import BookStateManagement from '../js-components/BookStateManagement.js';
import RenderBasicUI from '../js-components/RenderBasicUI.js';
import Aside from '../js-components/Aside.js';
import BookStore from '../js-components/BookStore.js';
import { waitFor } from '@testing-library/dom';

let rootDiv,
  renderTracker,
  bookStateManagement,
  renderBasicUI,
  aside = null;

beforeEach(() => {
  BookStore.deleteAllBook();
  localStorage.clear();
  document.body.innerHTML = `<div id="div"></div>`;
  UtilityModule.rootDiv = document.querySelector('#div');

  bookStateManagement = new BookStateManagement();
  renderBasicUI = new RenderBasicUI();
  aside = new Aside();
  renderTracker = new RenderTracker(bookStateManagement, renderBasicUI, aside);

  renderTracker.renderBooks();

  rootDiv = UtilityModule.rootDiv;
  localStorage.clear();
});

describe('RenderTracker.js', () => {
  describe('constructor', () => {
    it('should create a new instance of RenderTracker', () => {
      expect(renderTracker.bookStateManagement).toBeInstanceOf(
        BookStateManagement
      );
      expect(renderTracker.renderBasicUI).toBeInstanceOf(RenderBasicUI);
      expect(renderTracker.aside).toBeInstanceOf(Aside);
      expect(renderTracker.trackerSection).toBeInstanceOf(HTMLElement);
      const trackerSection = renderTracker.trackerSection;
      expect(trackerSection.classList.contains('tracker-section')).toBe(true);
      expect(renderTracker.renderBasicUI.mainTag.contains(trackerSection)).toBe(
        true
      );
    });
  });
  describe('renderBooks', () => {
    beforeEach(() => {
      BookStore.deleteAllBook();
      bookStateManagement.storeBooks(
        12345678910,
        'John Doe',
        'The Great Gatsby',
        299,
        'No'
      );
      bookStateManagement.storeBooks(
        12345678911,
        'Tolkien',
        'The Hobbit',
        295,
        'No'
      );
      renderTracker.renderBooks();
    });

    it('should clear previous content inside trackerSection', () => {
      renderTracker.trackerSection.innerHTML = '<p>Old Content</p>';
      renderTracker.renderBooks();
      expect(renderTracker.trackerSection.innerHTML).not.toContain(
        'Old Content'
      );
    });

    it('should create a tracker-container div inside trackerSection', () => {
      const trackerContainer =
        renderTracker.trackerSection.querySelector('.tracker-container');
      expect(trackerContainer).toBeTruthy();
    });

    it('should render each stored book using renderBooksElements', () => {
      const wrappers = rootDiv.querySelectorAll('.tracker-wrapper');
      expect(wrappers.length).toBe(2);

      const first = wrappers[0];
      const second = wrappers[1];

      expect(first.querySelector('.book-heading').textContent).toContain(
        'Book: The Great Gatsby'
      );
      expect(first.querySelector('.author-heading').textContent).toContain(
        'Author: John Doe'
      );

      expect(second.querySelector('.book-heading').textContent).toContain(
        'Book: The Hobbit'
      );
      expect(second.querySelector('.author-heading').textContent).toContain(
        'Author: Tolkien'
      );
    });

    it('should call aside.appendDoneReading and aside.appendYetToRead', () => {
      const spyDone = vi.spyOn(aside, 'appendDoneReading');
      const spyYet = vi.spyOn(aside, 'appendYetToRead');
      renderTracker.renderBooks();
      expect(spyDone).toHaveBeenCalled();
      expect(spyYet).toHaveBeenCalled();
    });
  });

  describe('renderBooksElements', () => {
    it('should render wrapper with correct id and content structure', () => {
      const container = document.createElement('div');
      renderTracker.renderBooksElements(
        container,
        'book-101',
        'Author Name',
        'Book Title',
        '123',
        'Yes'
      );

      const wrapper = container.querySelector('.tracker-wrapper');
      expect(wrapper).toBeTruthy();
      expect(wrapper.id).toBe('book-101');

      expect(wrapper.querySelector('.book-heading').textContent).toBe(
        'Book: Book Title'
      );
      expect(wrapper.querySelector('.author-heading').textContent).toBe(
        'Author: Author Name'
      );
      expect(wrapper.querySelector('.page-num-para').textContent).toBe(
        'Pages: 123'
      );
      expect(wrapper.querySelector('.read-para').textContent).toBe('Yes');
    });

    it('should render edit button with correct icon and alt text', () => {
      const container = document.createElement('div');
      renderTracker.renderBooksElements(
        container,
        'book-102',
        'Test Book',
        'Tester',
        '456',
        'No'
      );

      const editBtn = container.querySelector('.edit-btn');
      const editIcon = editBtn.querySelector('.edit-icon');

      expect(editBtn).toBeTruthy();
      expect(editIcon).toBeTruthy();
      expect(editIcon.tagName).toBe('IMG');
      expect(editIcon.alt).toBe('edit');
      expect(editIcon.src).toContain('/src/asset/edit.png');
    });

    it('should render delete button with correct icon and alt text', () => {
      const container = document.createElement('div');
      renderTracker.renderBooksElements(
        container,
        'book-103',
        'Sample Book',
        'Author X',
        '789',
        'Yes'
      );

      const deleteBtn = container.querySelector('.delete-btn');
      const deleteIcon = deleteBtn.querySelector('.delete-icon');

      expect(deleteBtn).toBeTruthy();
      expect(deleteIcon).toBeTruthy();
      expect(deleteIcon.tagName).toBe('IMG');
      expect(deleteIcon.alt).toBe('delete');
      expect(deleteIcon.src).toContain('/src/asset/delete.png');
    });
  });
  describe('capitalizeEditValue', () => {
    it('should capitalize first letter and lowercase the rest', () => {
      expect(renderTracker.capitalizeEditValue('No')).toBe('No');
      expect(renderTracker.capitalizeEditValue('NO')).toBe('No');
      expect(renderTracker.capitalizeEditValue('yes')).toBe('Yes');
      expect(renderTracker.capitalizeEditValue('YES')).toBe('Yes');
    });
  });

  describe('successfulEditMsg', () => {
    it('should show success message for readValue "Yes"', () => {
      const wrapper = UtilityModule.createElement(
        'div',
        rootDiv,
        null,
        'tracker-wrapper'
      );
      UtilityModule.createElement('h2', wrapper, 'Book: Dune', 'book-heading');

      const spy = vi.spyOn(UtilityModule, 'activityMsg');
      renderTracker.successfulEditMsg('Yes', wrapper);

      expect(spy).toHaveBeenCalledWith(
        `Edited to Yes. "Book: Dune" added in 'Done reading'`
      );
    });

    it('should show success message for readValue "No"', () => {
      const wrapper = UtilityModule.createElement(
        'div',
        rootDiv,
        null,
        'tracker-wrapper'
      );
      UtilityModule.createElement('h2', wrapper, 'Book: Dune', 'book-heading');

      const spy = vi.spyOn(UtilityModule, 'activityMsg');
      renderTracker.successfulEditMsg('No', wrapper);

      expect(spy).toHaveBeenCalledWith(
        `Edited to No. "Book: Dune" added in 'Yet to read'`
      );
    });
  });

  describe('attachEditAndDoneHandler', () => {
    beforeEach(() => {
      BookStore.deleteAllBook();
      bookStateManagement.storeBooks(
        '12345678910',
        'John Doe',
        'The Great Gatsby',
        299,
        'No'
      );
      bookStateManagement.storeBooks(
        '12345678911',
        'Tolkien',
        'The Hobbit',
        295,
        'No'
      );
      renderTracker.renderBooks();
      renderTracker.attachEditAndDoneHandler();
    });

    it('should enable select with two options readPara when edit button is clicked', () => {
      const editBtn = rootDiv.querySelector('.edit-btn');
      editBtn.click();

      const trackerWrapper = rootDiv.querySelector('.tracker-wrapper');
      const readPara = trackerWrapper.querySelector('.read-para');

      const selectDropdown = readPara.querySelector('select.read-dropdown');
      expect(selectDropdown).toBeTruthy();
      expect(selectDropdown.options.length).toBe(2);
      expect(selectDropdown.options[0].textContent).toBe('Yes');
      expect(selectDropdown.options[1].textContent).toBe('No');
      expect(editBtn.classList.contains('done-edit-btn')).toBe(true);
      expect(editBtn.classList.contains('edit-btn')).toBe(false);
      expect(editBtn.innerHTML).toContain('done');
    });

    it('should restore button to edit mode after successful edit', async () => {
      renderTracker.attachEditAndDoneHandler();

      const wrapper = rootDiv.querySelectorAll('.tracker-wrapper')[0];
      const editBtn = wrapper.querySelector('.edit-btn');
      editBtn.click();

      const readDropdown = wrapper.querySelector('.read-dropdown');

      readDropdown.value = 'no';

      const doneBtn = wrapper.querySelector('.done-edit-btn');
      doneBtn.click();

      await waitFor(
        () => {
          const updatedWrapper =
            rootDiv.querySelectorAll('.tracker-wrapper')[0];
          const newEditBtn = updatedWrapper.querySelector('.edit-btn');
          const updatedReadPara = updatedWrapper.querySelector('.read-para');
          const updatedReadDropdown =
            updatedWrapper.querySelector('.read-dropdown');

          expect(newEditBtn.querySelector('.edit-icon').alt).toContain('edit');
          expect(updatedReadPara.textContent).toContain('No');
          expect(updatedReadDropdown).toBeNull();
        },
        { timeout: 1000 }
      );
    });
  });

  describe('attachDeleteBookHandler', () => {
    beforeEach(() => {
      BookStore.deleteAllBook();
      bookStateManagement.storeBooks(
        '12345678910',
        'John Doe',
        'The Great Gatsby',
        299,
        'No'
      );
      bookStateManagement.storeBooks(
        '12345678911',
        'Tolkien',
        'The Hobbit',
        295,
        'No'
      );

      renderTracker.renderBooks();
      renderTracker.attachDeleteBookHandler();
    });

    it('should delete the correct book from DOM and BookStore and show activity msg', async () => {
      const allWrappersBefore = rootDiv.querySelectorAll('.tracker-wrapper');

      expect(allWrappersBefore.length).toBe(2);

      const firstDeleteBtn = allWrappersBefore[0].querySelector('.delete-btn');
      const bookName =
        allWrappersBefore[0].querySelector('.book-heading').textContent;
      firstDeleteBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await waitFor(
        () => {
          const activityBox = rootDiv.querySelector('.activity-msg-box');
          expect(activityBox).toBeTruthy();

          const msg = activityBox.querySelector('.msg-para');
          expect(msg).toBeTruthy();
          expect(msg.textContent).toContain(
            `"${bookName}" book been successfully removed from Tracker`
          );
        },
        { timeout: 1000 }
      );
    });
  });
});
