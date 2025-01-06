import AddBooks from "./AddBooks.js";
import LibraryStore from "./LibraryStore.js";

export default class LibraryState {
  storeBooks(bookId, authorName, bookName, pageNumber, haveRead) {
    const newBook = new AddBooks(
      bookId,
      authorName,
      bookName,
      pageNumber,
      haveRead
    );
    LibraryStore.storedBooks.push(newBook);
    LibraryStore.saveBook();
  }

  deleteBook(bookId) {
    LibraryStore.storedBooks = LibraryStore.storedBooks.filter(
      (book) => book.bookId !== bookId
    );
    LibraryStore.saveBook();
  }

  editRead(haveRead, bookId) {
    const authorIndex = LibraryStore.storedBooks.findIndex(
      (book) => book.bookId === bookId
    );

    if (authorIndex !== -1) {
      LibraryStore.storedBooks[authorIndex].haveRead = haveRead;
      LibraryStore.saveBook();
    } else {
      alert("no book found");
    }
  }
}
