import LibraryStore from './LibraryStore.js';
import UtilityModule from './UtilityModule.js';
import DeleteIcon from '../asset/delete.png';
import EditIcon from '../asset/edit.png';
import DoneIcon from '../asset/tick.png';

export default class RenderLibrary {
  constructor(libraryState, renderUI, asideBar) {
    this.libraryState = libraryState;
    this.renderUI = renderUI;
    this.asideBar = asideBar;
    this.librarySection = UtilityModule.createElement(
      'section',
      this.renderUI.mainTag,
      null,
      'library-section'
    );
  }

  renderBooks() {
    if (this.librarySection) {
      this.librarySection.innerHTML = '';
    }

    const libraryContainer = UtilityModule.createElement(
      'div',
      this.librarySection,
      null,
      'library-container'
    );

    LibraryStore.storedBooks.forEach(
      ({ bookId, authorName, bookName, pageNumber, haveRead }) => {
        this.renderBooksElements(
          libraryContainer,
          bookId,
          authorName,
          bookName,
          pageNumber,
          haveRead
        );
      }
    );

    this.asideBar.appendDoneReading();
    this.asideBar.appendYetToRead();
  }

  renderBooksElements(
    libraryContainer,
    bookId,
    bookName,
    authorName,
    pageNumber,
    haveRead
  ) {
    const libraryWrapper = UtilityModule.createElement(
      'div',
      libraryContainer,
      null,
      'library-wrapper'
    );

    libraryWrapper.setAttribute('id', `${bookId}`);

    UtilityModule.createElement(
      'h2',
      libraryWrapper,
      `Book: ${bookName}`,
      'book-heading'
    );

    UtilityModule.createElement(
      'h3',
      libraryWrapper,
      `Author: ${authorName}`,
      'author-heading'
    );

    UtilityModule.createElement(
      'p',
      libraryWrapper,
      `Pages: ${pageNumber}`,
      'page-num-para'
    );

    const readPara = UtilityModule.createElement(
      'p',
      libraryWrapper,
      null,
      'read-para-box'
    );

    readPara.innerHTML = `<span><span>Read: </span><span class="read-para">${haveRead}</span></span>`;

    const editBtn = UtilityModule.createElement(
      'button',
      libraryWrapper,
      null,
      'edit-btn'
    );

    const editIcon = UtilityModule.createElement(
      'img',
      editBtn,
      null,
      'edit-icon'
    );

    editIcon.src = EditIcon;
    editIcon.alt = 'edit';

    const deleteBtn = UtilityModule.createElement(
      'button',
      libraryWrapper,
      null,
      'delete-btn'
    );

    const deleteIcon = UtilityModule.createElement(
      'img',
      deleteBtn,
      null,
      'delete-icon'
    );

    deleteIcon.src = DeleteIcon;
    deleteIcon.alt = 'delete';
  }

  capitalizeEditValue(haveRead) {
    return haveRead.charAt(0).toUpperCase() + haveRead.slice(1).toLowerCase();
  }

  successfulEditMsg(readValue, libraryWrapper) {
    let message = [];

    const bookName = libraryWrapper
      .querySelector('.book-heading')
      .textContent.trim();
    if (readValue === 'Yes') {
      message.push(`Edited to Yes. "${bookName}" added in 'Done reading'`);
    }

    if (readValue === 'No') {
      message.push(`Edited to No. "${bookName}" added in 'Yet to read'`);
    }

    if (message.length > 0) {
      message.forEach((msg) => UtilityModule.activityMsg(`${msg}`));
      message = [];
    }
  }

  attachEditAndDoneHandler() {
    document.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.edit-btn');
      const doneBtn = e.target.closest('.done-edit-btn');

      if (editBtn) {
        const libraryWrapper = editBtn.closest('.library-wrapper');
        const readPara = libraryWrapper.querySelector('.read-para');

        readPara.contentEditable = 'true';
        readPara.classList.add('highlight');

        readPara.focus();

        editBtn.classList.add('done-edit-btn');
        editBtn.classList.remove('edit-btn');
        editBtn.innerHTML = `
        <img src="${DoneIcon}" alt="done" class="done-icon">
        `;
      } else if (doneBtn) {
        const libraryWrapper = doneBtn.closest('.library-wrapper');
        const getBookId = parseInt(libraryWrapper.getAttribute('id'), 10);
        const readPara = libraryWrapper.querySelector('.read-para');
        const haveRead = readPara.textContent.trim().toLowerCase();

        if (!['yes', 'no'].includes(haveRead)) {
          UtilityModule.activityMsg('Please enter "yes" or "no"');
          return;
        }
        const readValue = this.capitalizeEditValue(haveRead);
        this.libraryState.editRead(readValue, getBookId);

        doneBtn.innerHTML = `
        <img src="${EditIcon}" alt="edit" class="edit-icon">
        `;
        doneBtn.classList.remove('done-edit-btn');
        readPara.classList.remove('highlight');
        readPara.contentEditable = 'false';
        doneBtn.classList.add('edit-btn');

        this.renderBooks();
        this.successfulEditMsg(readValue, libraryWrapper);
      }
    });
  }

  attachDeleteBookHandler() {
    document.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete-btn');

      if (deleteBtn) {
        const libraryWrapper = deleteBtn.closest('.library-wrapper');
        const bookName = libraryWrapper
          .querySelector('.book-heading')
          .textContent.trim();

        const getBookId = parseInt(libraryWrapper.getAttribute('id'));

        this.libraryState.deleteBook(getBookId);
        this.renderBooks();
        UtilityModule.activityMsg(
          `"${bookName}" book been successfully removed from library`
        );
      }
    });
  }
}
