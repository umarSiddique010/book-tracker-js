import { beforeEach, describe, expect, it, vi } from 'vitest';
import UtilityModule from '../js-components/UtilityModule';
import RenderLibrary from '../js-components/RenderLibrary';
import LibraryState from '../js-components/LibraryState';
import RenderUI from '../js-components/RenderUI';
import AsideBar from '../js-components/AsideBar';
import LibraryStore from '../js-components/LibraryStore';

let rootDiv,
  renderLibrary,
  libraryState,
  renderUI,
  asideBar = null;

beforeEach(() => {
  LibraryStore.deleteAllBook();
  localStorage.clear();
  document.body.innerHTML = `<div id="div"></div>`;
  UtilityModule.rootDiv = document.querySelector('#div');

  libraryState = new LibraryState();
  renderUI = new RenderUI();
  asideBar = new AsideBar();
  renderLibrary = new RenderLibrary(libraryState, renderUI, asideBar);

  libraryState.storeBooks('Test Book', 'Author A', '100', 'Yes');
  libraryState.storeBooks('Another Book', 'Author B', '200', 'No');
  renderLibrary.renderBooks();

  rootDiv = UtilityModule.rootDiv;
});

describe('RenderLibrary.js', () => {
  describe('constructor', () => {
    it('should create a new instance of RenderLibrary', () => {
      expect(renderLibrary.libraryState).toBeInstanceOf(LibraryState);
      expect(renderLibrary.renderUI).toBeInstanceOf(RenderUI);
      expect(renderLibrary.asideBar).toBeInstanceOf(AsideBar);
      expect(renderLibrary.librarySection).toBeInstanceOf(HTMLElement);

      const librarySection = renderLibrary.librarySection;
      expect(librarySection.classList.contains('library-section')).toBe(true);
      expect(renderLibrary.renderUI.mainTag.contains(librarySection)).toBe(
        true
      );
    });
  });
  describe('renderBooks', () => {
    beforeEach(() => {
      LibraryStore.deleteAllBook();
      libraryState.storeBooks('The Hobbit', 'Tolkien', 295, 'Yes');
      libraryState.storeBooks('1984', 'Orwell', 328, 'No');
      renderLibrary.renderBooks();
    });

    it('should clear previous content inside librarySection', () => {
      renderLibrary.librarySection.innerHTML = '<p>Old Content</p>';
      renderLibrary.renderBooks();
      expect(renderLibrary.librarySection.innerHTML).not.toContain(
        'Old Content'
      );
    });

    it('should create a library-container div inside librarySection', () => {
      const libraryContainer =
        renderLibrary.librarySection.querySelector('.library-container');
      expect(libraryContainer).toBeTruthy();
    });

    it('should render each stored book using renderBooksElements', () => {
      const wrappers = rootDiv.querySelectorAll('.library-wrapper');
      expect(wrappers.length).toBe(2);

      const first = wrappers[0];
      const second = wrappers[1];

      expect(first.querySelector('.book-heading').textContent).toContain(
        'Tolkien'
      );
      expect(first.querySelector('.author-heading').textContent).toContain(
        'Author: 295'
      );
      expect(second.querySelector('.book-heading').textContent).toContain(
        'Orwell'
      );
      expect(second.querySelector('.author-heading').textContent).toContain(
        'Author: 328'
      );
    });

    it('should call asideBar.appendDoneReading and appendYetToRead', () => {
      const spyDone = vi.spyOn(asideBar, 'appendDoneReading');
      const spyYet = vi.spyOn(asideBar, 'appendYetToRead');
      renderLibrary.renderBooks();
      expect(spyDone).toHaveBeenCalled();
      expect(spyYet).toHaveBeenCalled();
    });
  });

  describe('renderBooksElements', () => {
    it('should render wrapper with correct id and content structure', () => {
      const container = document.createElement('div');
      renderLibrary.renderBooksElements(
        container,
        'book-101',
        'Book Title',
        'Author Name',
        '123',
        'Yes'
      );

      const wrapper = container.querySelector('.library-wrapper');
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
      renderLibrary.renderBooksElements(
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
      renderLibrary.renderBooksElements(
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
      expect(renderLibrary.capitalizeEditValue('yes')).toBe('Yes');
      expect(renderLibrary.capitalizeEditValue('nO')).toBe('No');
      expect(renderLibrary.capitalizeEditValue('YEs')).toBe('Yes');
      expect(renderLibrary.capitalizeEditValue('NO')).toBe('No');
    });
  });

  describe('successfulEditMsg', () => {
    it('should show success message for readValue "Yes"', () => {
      const wrapper = UtilityModule.createElement(
        'div',
        rootDiv,
        null,
        'library-wrapper'
      );
      UtilityModule.createElement('h2', wrapper, 'Book: Dune', 'book-heading');

      const spy = vi.spyOn(UtilityModule, 'activityMsg');
      renderLibrary.successfulEditMsg('Yes', wrapper);

      expect(spy).toHaveBeenCalledWith(
        `Edited to Yes. "Book: Dune" added in 'Done reading'`
      );
    });

    it('should show success message for readValue "No"', () => {
      const wrapper = UtilityModule.createElement(
        'div',
        rootDiv,
        null,
        'library-wrapper'
      );
      UtilityModule.createElement('h2', wrapper, 'Book: Dune', 'book-heading');

      const spy = vi.spyOn(UtilityModule, 'activityMsg');
      renderLibrary.successfulEditMsg('No', wrapper);

      expect(spy).toHaveBeenCalledWith(
        `Edited to No. "Book: Dune" added in 'Yet to read'`
      );
    });

    it('should not call activityMsg for unknown readValue', () => {
      const wrapper = UtilityModule.createElement(
        'div',
        rootDiv,
        null,
        'library-wrapper'
      );
      UtilityModule.createElement('h2', wrapper, 'Book: Dune', 'book-heading');

      const spy = vi.spyOn(UtilityModule, 'activityMsg');
      renderLibrary.successfulEditMsg('Maybe', wrapper);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('attachEditAndDoneHandler', () => {
    beforeEach(() => {
      LibraryStore.deleteAllBook();
      libraryState.storeBooks('Book 1', 'Author 1', 123, 'Yes');
      renderLibrary.renderBooks();
      renderLibrary.attachEditAndDoneHandler();
    });

    it('should enable contentEditable and highlight readPara when edit button is clicked', () => {
      const editBtn = rootDiv.querySelector('.edit-btn');
      editBtn.click();

      const libraryWrapper = rootDiv.querySelector('.library-wrapper');
      const readPara = libraryWrapper.querySelector('.read-para');

      expect(readPara.contentEditable).toBe('true');
      expect(readPara.classList.contains('highlight')).toBe(true);
      expect(editBtn.classList.contains('done-edit-btn')).toBe(true);
      expect(editBtn.classList.contains('edit-btn')).toBe(false);
      expect(editBtn.innerHTML).toContain('done');
    });

    it('should reject invalid input and show warning message', () => {
      const editBtn = rootDiv.querySelector('.edit-btn');
      editBtn.click();

      const readPara = rootDiv.querySelector('.read-para');
      readPara.textContent = 'maybe';

      const doneBtn = rootDiv.querySelector('.done-edit-btn');
      const spy = vi.spyOn(UtilityModule, 'activityMsg');
      doneBtn.click();

      expect(spy).toHaveBeenCalledWith('Please enter "yes" or "no"');
    });

    it('should update read status and render books on valid input', () => {
      const editBtn = rootDiv.querySelector('.edit-btn');
      editBtn.click();

      const readPara = rootDiv.querySelector('.read-para');
      readPara.textContent = 'no';

      const doneBtn = rootDiv.querySelector('.done-edit-btn');
      const spyEdit = vi.spyOn(libraryState, 'editRead');
      const spyRender = vi.spyOn(renderLibrary, 'renderBooks');
      const spyMsg = vi.spyOn(renderLibrary, 'successfulEditMsg');

      doneBtn.click();

      expect(spyEdit).toHaveBeenCalledWith('No', expect.any(Number));
      expect(spyRender).toHaveBeenCalled();
      expect(spyMsg).toHaveBeenCalled();
    });

    it('should restore button to edit mode after successful edit', () => {
      const editBtn = rootDiv.querySelector('.edit-btn');
      editBtn.click();

      const readPara = rootDiv.querySelector('.read-para');
      readPara.textContent = 'yes';

      const doneBtn = rootDiv.querySelector('.done-edit-btn');
      doneBtn.click();

      setTimeout(() => {
        const updatedWrapper = rootDiv.querySelector('.library-wrapper');
        const newEditBtn = updatedWrapper.querySelector('.edit-btn');
        const updatedReadPara = updatedWrapper.querySelector('.read-para');

        expect(newEditBtn).toBeTruthy();
        expect(newEditBtn.innerHTML).toContain('edit');
        expect(updatedReadPara.isContentEditable).toBe(false);
        expect(updatedReadPara.classList.contains('highlight')).toBe(false);
      }, 100);
    });
  });

  describe('attachDeleteBookHandler', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
      UtilityModule.rootDiv = document.createElement('div');
      UtilityModule.rootDiv.id = 'root';
      document.body.appendChild(UtilityModule.rootDiv);

      libraryState = new LibraryState();
      renderUI = new RenderUI();
      asideBar = new AsideBar();
      renderLibrary = new RenderLibrary(libraryState, renderUI, asideBar);

      libraryState.storeBooks('Tolkien', 295, 'Yes');
      libraryState.storeBooks('Lewis', 350, 'No');

      renderUI.mainHeading();
      renderUI.bookCreateAndDeleteBtns();
      renderLibrary.renderBooks();
      renderLibrary.attachDeleteBookHandler();
    });

    it('should delete the correct book from DOM and LibraryStore', () => {
      const allWrappersBefore = rootDiv.querySelectorAll('.library-wrapper');
      expect(allWrappersBefore.length).toBe(2);

      const firstDeleteBtn = allWrappersBefore[0].querySelector('.delete-btn');
      firstDeleteBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      setTimeout(() => {
        const allWrappersAfter = rootDiv.querySelectorAll('.library-wrapper');
        expect(allWrappersAfter.length).toBe(1);

        const remainingHeadings = [...allWrappersAfter].map(
          (wrapper) => wrapper.querySelector('h2').textContent
        );
        expect(remainingHeadings).toContain('Lewis');
      }, 100);
    });

    it('should show a success activity message after deletion', () => {
      const deleteBtn = rootDiv.querySelector('.delete-btn');
      expect(deleteBtn).toBeTruthy();

      const libraryWrapper = deleteBtn.closest('.library-wrapper');
      const bookName = libraryWrapper
        .querySelector('.book-heading')
        .textContent.trim();

      deleteBtn.click();

      setTimeout(() => {
        const activityMsg = document.querySelector('.activity-message');
        expect(activityMsg).toBeTruthy();
        expect(activityMsg.textContent).toContain(
          `"${bookName}" book been successfully removed from library`
        );
      }, 100);
    });
  });
});
