import AddBooks from './AddBooks.js';
import BookStore from './BookStore.js';
import UtilityModule from './UtilityModule.js';

export default class BookStateManagement {
  storeBooks(bookId, authorName, bookName, pageNumber, haveRead) {
    const newBook = new AddBooks(
      bookId,
      authorName,
      bookName,
      pageNumber,
      haveRead
    );
    BookStore.storedBooks.push(newBook);
    BookStore.saveBook();
  }

  deleteBook(bookId) {
    BookStore.storedBooks = BookStore.storedBooks.filter(
      (book) => book.bookId !== bookId
    );
    BookStore.saveBook();
  }

  editRead(haveRead, bookId) {
    const authorIndex = BookStore.storedBooks.findIndex(
      (book) => book.bookId === bookId
    );

    if (authorIndex !== -1) {
      BookStore.storedBooks[authorIndex].haveRead = haveRead;
      BookStore.saveBook();
    } else {
      UtilityModule.activityMsg('No book found');
    }
  }
}
