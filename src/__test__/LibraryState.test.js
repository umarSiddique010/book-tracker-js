import { describe, it, beforeEach, expect, vi } from 'vitest';
import LibraryState from '../js-components/LibraryState';
import LibraryStore from '../js-components/LibraryStore';
import AddBooks from '../js-components/AddBooks';

describe('LibraryState.js', () => {
  let libraryState;

  beforeEach(() => {
    libraryState = new LibraryState();
    LibraryStore.storedBooks = [];
    vi.restoreAllMocks();
  });

  describe('storeBooks()', () => {
    it('should add a new book to LibraryStore and call saveBook()', () => {
      const spySave = vi.spyOn(LibraryStore, 'saveBook');
      const bookId = 'book-1';
      const bookData = {
        authorName: 'Author A',
        bookName: 'Book A',
        pageNumber: '100',
        haveRead: 'Yes',
      };

      libraryState.storeBooks(
        bookId,
        bookData.authorName,
        bookData.bookName,
        bookData.pageNumber,
        bookData.haveRead
      );

      expect(LibraryStore.storedBooks).toHaveLength(1);
      const stored = LibraryStore.storedBooks[0];
      expect(stored).toBeInstanceOf(AddBooks);
      expect(stored.bookId).toBe(bookId);
      expect(stored.authorName).toBe(bookData.authorName);
      expect(stored.bookName).toBe(bookData.bookName);
      expect(stored.pageNumber).toBe(bookData.pageNumber);
      expect(stored.haveRead).toBe(bookData.haveRead);
      expect(spySave).toHaveBeenCalled();
    });
  });

  describe('deleteBook()', () => {
    it('should remove a book by bookId and call saveBook()', () => {
      const spySave = vi.spyOn(LibraryStore, 'saveBook');

      const book1 = new AddBooks('1', 'Author 1', 'Book 1', '123', 'Yes');
      const book2 = new AddBooks('2', 'Author 2', 'Book 2', '456', 'No');
      LibraryStore.storedBooks = [book1, book2];

      libraryState.deleteBook('1');

      expect(LibraryStore.storedBooks).toHaveLength(1);
      expect(LibraryStore.storedBooks[0].bookId).toBe('2');
      expect(spySave).toHaveBeenCalled();
    });

    it('should not crash if bookId does not exist and still call saveBook()', () => {
      const spySave = vi.spyOn(LibraryStore, 'saveBook');
      LibraryStore.storedBooks = [];

      libraryState.deleteBook('non-existent');

      expect(LibraryStore.storedBooks).toEqual([]);
      expect(spySave).toHaveBeenCalled();
    });
  });

  describe('editRead()', () => {
    it('should update haveRead value of the matching book and call saveBook()', () => {
      const spySave = vi.spyOn(LibraryStore, 'saveBook');
      const book = new AddBooks('xyz', 'Author X', 'Book X', '300', 'No');
      LibraryStore.storedBooks = [book];

      libraryState.editRead('Yes', 'xyz');

      expect(LibraryStore.storedBooks[0].haveRead).toBe('Yes');
      expect(spySave).toHaveBeenCalled();
    });

    it('should alert if bookId is not found', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const spySave = vi.spyOn(LibraryStore, 'saveBook');

      LibraryStore.storedBooks = [];

      libraryState.editRead('Yes', 'invalid-id');

      expect(alertSpy).toHaveBeenCalledWith('no book found');
      expect(spySave).not.toHaveBeenCalled();
    });
  });
});
