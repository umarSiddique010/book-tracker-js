import { describe, it, beforeEach, expect, vi } from 'vitest';
import BookStateManagement from '../js-components/BookStateManagement.js';
import BookStore from '../js-components/BookStore.js';
import AddBooks from '../js-components/AddBooks.js';
import UtilityModule from '../js-components/UtilityModule.js';

describe('BookStateManagement.js', () => {
  let bookStateManagement;

  beforeEach(() => {
    bookStateManagement = new BookStateManagement();
    BookStore.storedBooks = [];
    vi.restoreAllMocks();
  });

  describe('storeBooks()', () => {
    it('should add a new book to TrackerStore and call saveBook()', () => {
      const spySave = vi.spyOn(BookStore, 'saveBook');
      const bookId = 'book-1';
      const bookData = {
        authorName: 'Author A',
        bookName: 'Book A',
        pageNumber: '100',
        haveRead: 'Yes',
      };

      bookStateManagement.storeBooks(
        bookId,
        bookData.authorName,
        bookData.bookName,
        bookData.pageNumber,
        bookData.haveRead
      );

      expect(BookStore.storedBooks).toHaveLength(1);
      const stored = BookStore.storedBooks[0];
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
      const spySave = vi.spyOn(BookStore, 'saveBook');

      const book1 = new AddBooks('1', 'Author 1', 'Book 1', '123', 'Yes');
      const book2 = new AddBooks('2', 'Author 2', 'Book 2', '456', 'No');
      BookStore.storedBooks = [book1, book2];

      bookStateManagement.deleteBook('1');

      expect(BookStore.storedBooks).toHaveLength(1);
      expect(BookStore.storedBooks[0].bookId).toBe('2');
      expect(spySave).toHaveBeenCalled();
    });

    it('should not crash if bookId does not exist and still call saveBook()', () => {
      const spySave = vi.spyOn(BookStore, 'saveBook');
      BookStore.storedBooks = [];

      bookStateManagement.deleteBook('non-existent');

      expect(BookStore.storedBooks).toEqual([]);
      expect(spySave).toHaveBeenCalled();
    });
  });

  describe('editRead()', () => {
    it('should alert if bookId is not found', () => {
      const activityMsgSpy = vi
        .spyOn(UtilityModule, 'activityMsg')
        .mockImplementation(() => {});
      const spySave = vi.spyOn(BookStore, 'saveBook');

      BookStore.storedBooks = [];

      bookStateManagement.editRead('Yes', 'invalid-id');

      expect(activityMsgSpy).toHaveBeenCalledWith('No book found');
      expect(spySave).not.toHaveBeenCalled();
    });
  });
});
