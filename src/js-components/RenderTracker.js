import TrackerStore from './TrackerStore.js';
import UtilityModule from './UtilityModule.js';
import DeleteIcon from '../asset/delete.png';
import EditIcon from '../asset/edit.png';
import DoneIcon from '../asset/tick.png';

export default class RenderTracker {
  constructor(trackerState, renderUI, asideBar) {
    this.trackerState = trackerState;
    this.renderUI = renderUI;
    this.asideBar = asideBar;
    this.trackerSection = UtilityModule.createElement(
      'section',
      this.renderUI.mainTag,
      null,
      'tracker-section'
    );
  }

  renderBooks() {
    if (this.trackerSection) {
      this.trackerSection.innerHTML = '';
    }

    const trackerContainer = UtilityModule.createElement(
      'div',
      this.trackerSection,
      null,
      'tracker-container'
    );

    TrackerStore.storedBooks.forEach(
      ({ bookId, authorName, bookName, pageNumber, haveRead }) => {
        this.renderBooksElements(
          trackerContainer,
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
    trackerContainer,
    bookId,
    authorName,
    bookName,
    pageNumber,
    haveRead
  ) {
    const trackerWrapper = UtilityModule.createElement(
      'div',
      trackerContainer,
      null,
      'tracker-wrapper'
    );

    trackerWrapper.setAttribute('id', `${bookId}`);

    UtilityModule.createElement(
      'h2',
      trackerWrapper,
      `Book: ${bookName}`,
      'book-heading'
    );

    UtilityModule.createElement(
      'h3',
      trackerWrapper,
      `Author: ${authorName}`,
      'author-heading'
    );

    UtilityModule.createElement(
      'p',
      trackerWrapper,
      `Pages: ${pageNumber}`,
      'page-num-para'
    );

    const readPara = UtilityModule.createElement(
      'p',
      trackerWrapper,
      null,
      'read-para-box'
    );

    readPara.innerHTML = `<span><span>Read: </span><span class="read-para">${haveRead}</span></span>`;

    const editBtn = UtilityModule.createElement(
      'button',
      trackerWrapper,
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
      trackerWrapper,
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

  successfulEditMsg(readValue, trackerWrapper) {
    let message = [];

    const bookName = trackerWrapper
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
    document.addEventListener('click', async (e) => {
      const editBtn = e.target.closest('.edit-btn');
      const doneBtn = e.target.closest('.done-edit-btn');

      if (editBtn) {
        const trackerWrapper = editBtn.closest('.tracker-wrapper');
        const readPara = trackerWrapper.querySelector('.read-para');

        readPara.innerHTML = `<select class="read-dropdown">
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </select>`;

        editBtn.classList.add('done-edit-btn');
        editBtn.classList.remove('edit-btn');
        editBtn.innerHTML = `
        <img src="${DoneIcon}" alt="done" class="done-icon">
        `;
      } else if (doneBtn) {
        const trackerWrapper = doneBtn.closest('.tracker-wrapper');
        const getBookId = Number(trackerWrapper.getAttribute('id'));
        const readDropdown = trackerWrapper.querySelector('.read-dropdown');
        const readPara = trackerWrapper.querySelector('.read-para');
        

        if (!readDropdown) return;

        const readValue = this.capitalizeEditValue(readDropdown.value);
        await this.trackerState.editRead(readValue, getBookId);
        readPara.innerHTML = `${readValue}`;
        doneBtn.innerHTML = `
        <img src="${EditIcon}" alt="edit" class="edit-icon">
        `;
        doneBtn.classList.remove('done-edit-btn');
        doneBtn.classList.add('edit-btn');

        this.renderBooks();
        this.successfulEditMsg(readValue, trackerWrapper);
      }
    });
  }

  attachDeleteBookHandler() {
    document.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete-btn');

      if (deleteBtn) {
        const trackerWrapper = deleteBtn.closest('.tracker-wrapper');
        const bookName = trackerWrapper
          .querySelector('.book-heading')
          .textContent.trim();

        const getBookId = Number(trackerWrapper.getAttribute('id'));

        this.trackerState.deleteBook(getBookId);
        this.renderBooks();
        UtilityModule.activityMsg(
          `"${bookName}" book been successfully removed from Tracker`
        );
      }
    });
  }
}
