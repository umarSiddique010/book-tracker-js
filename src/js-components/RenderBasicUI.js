import UtilityModule from './UtilityModule.js';
import BookStore from './BookStore.js';
import CreateIcon from '../asset/create.png';
import DeleteAllIcon from '../asset/delete-folder.png';
export default class RenderBasicUI {
  constructor() {
    this.mainTag = UtilityModule.createElement(
      'main',
      UtilityModule.rootDiv,
      null,
      null
    );

    this.bookCreateAndDeleteSection = UtilityModule.createElement(
      'section',
      this.mainTag,
      null,
      'book-create-delete-section'
    );
  }

  createTrackerHandler() {
    document.addEventListener('click', (e) => {
      const createBtn = e.target.closest('.create-book');
      if (createBtn) {
        const formContainer = document.querySelector('.form-container');
        formContainer.classList.remove('hidden');
        formContainer.classList.remove('first-load-hidden-form');
      }
    });
  }

  deleteAllTrackerHandle(renderTracker) {
    document.addEventListener('click', (e) => {
      const deleteAllBtn = e.target.closest('.delete-all-books');

      if (deleteAllBtn) {
        if (BookStore.storedBooks.length <= 0) {
          UtilityModule.activityMsg('Your Book Tracker is already empty');
        } else {
          BookStore.deleteAllBook();
          BookStore.storedBooks = [];
          renderTracker.renderBooks();
          UtilityModule.activityMsg('Your Book Tracker is now empty');
        }
      }
    });
  }

  mainHeading() {
    UtilityModule.createElement(
      'h1',
      this.mainTag,
      'Track Your Books & Reading Progress',
      'main-heading'
    );
  }

  bookCreateAndDeleteBtns() {
    const btnWrapper = UtilityModule.createElement(
      'button',
      this.bookCreateAndDeleteSection,
      null,
      'create-read-btn-wrapper'
    );

    const deleteAllBtn = UtilityModule.createElement(
      'button',
      btnWrapper,
      null,
      'delete-all-books'
    );

    const deleteAllIcon = UtilityModule.createElement(
      'img',
      deleteAllBtn,
      null,
      'delete-all-icon'
    );
    deleteAllIcon.src = DeleteAllIcon;
    deleteAllIcon.alt = 'delete all';

    const createBtn = UtilityModule.createElement(
      'button',
      btnWrapper,
      null,
      'create-book'
    );
    const createIcon = UtilityModule.createElement(
      'img',
      createBtn,
      null,
      'create-icon'
    );
    createIcon.src = CreateIcon;
    createIcon.alt = 'create';
  }
}
