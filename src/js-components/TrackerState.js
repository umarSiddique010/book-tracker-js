import AddBooks from './AddBooks.js';
import TrackerStore from './TrackerStore.js';

export default class TrackerState {
  storeBooks(bookId, authorName, bookName, pageNumber, haveRead) {
    const newBook = new AddBooks(
      bookId,
      authorName,
      bookName,
      pageNumber,
      haveRead
    );
    TrackerStore.storedBooks.push(newBook);
    TrackerStore.saveBook();
  }

  deleteBook(bookId) {
    TrackerStore.storedBooks = TrackerStore.storedBooks.filter(
      (book) => book.bookId !== bookId
    );
    TrackerStore.saveBook();
  }

  editRead(haveRead, bookId) {
    const authorIndex = TrackerStore.storedBooks.findIndex(
      (book) => book.bookId === bookId
    );

    if (authorIndex !== -1) {
      TrackerStore.storedBooks[authorIndex].haveRead = haveRead;
      TrackerStore.saveBook();
    } else {
      alert('no book found');
    }
  }
}
