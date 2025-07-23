import UtilityModule from './UtilityModule.js';

export default class RenderInput {
  constructor(trackerState, renderTracker) {
    this.trackerState = trackerState;
    this.renderTracker = renderTracker;
  }

  initializeForm() {
    const submitBtn = document.querySelector('#submitBtn');

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newBookId = Date.now();
      const bookNameValue = document.querySelector('#bookName').value.trim();
      const authorNameValue = document
        .querySelector('#authorName')
        .value.trim();
      const pageNumberValue = document
        .querySelector('#pageNumber')
        .value.trim();
      const haveReadValue = document.querySelector('#haveRead').value.trim();

      if (bookNameValue === '' || authorNameValue === '') {
        UtilityModule.activityMsg(
          'Book name, Author name or page number cannot be empty'
        );
        return;
      }

      if (isNaN(Number(pageNumberValue)) || pageNumberValue === '') {
        UtilityModule.activityMsg("page number's value must be number");
        return;
      }

      this.trackerState.storeBooks(
        newBookId,
        authorNameValue,
        bookNameValue,
        pageNumberValue,
        haveReadValue
      );

      this.renderTracker.renderBooks();

      document.querySelector('.form-container').classList.add('hidden');

      this.resetForm();
      UtilityModule.activityMsg('Book added successfully');
    });
  }

  resetForm() {
    document.querySelector('#bookName').value = '';
    document.querySelector('#authorName').value = '';
    document.querySelector('#pageNumber').value = '';
    document.querySelector('#haveRead').value = 'Yes';
  }
}
