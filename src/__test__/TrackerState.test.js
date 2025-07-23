import { describe, it, beforeEach, expect, vi } from 'vitest';
import TrackerState from '../js-components/TrackerState.js';
import TrackerStore from '../js-components/TrackerStore.js';
import AddBooks from '../js-components/AddBooks.js';

describe('TrackerState.js', () => {
  let trackerState;

  beforeEach(() => {
    trackerState = new TrackerState();
    TrackerStore.storedBooks = [];
    vi.restoreAllMocks();
  });

  describe('storeBooks()', () => {
    it('should add a new book to TrackerStore and call saveBook()', () => {
      const spySave = vi.spyOn(TrackerStore, 'saveBook');
      const bookId = 'book-1';
      const bookData = {
        authorName: 'Author A',
        bookName: 'Book A',
        pageNumber: '100',
        haveRead: 'Yes',
      };

      trackerState.storeBooks(
        bookId,
        bookData.authorName,
        bookData.bookName,
        bookData.pageNumber,
        bookData.haveRead
      );

      expect(TrackerStore.storedBooks).toHaveLength(1);
      const stored = TrackerStore.storedBooks[0];
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
      const spySave = vi.spyOn(TrackerStore, 'saveBook');

      const book1 = new AddBooks('1', 'Author 1', 'Book 1', '123', 'Yes');
      const book2 = new AddBooks('2', 'Author 2', 'Book 2', '456', 'No');
      TrackerStore.storedBooks = [book1, book2];

      trackerState.deleteBook('1');

      expect(TrackerStore.storedBooks).toHaveLength(1);
      expect(TrackerStore.storedBooks[0].bookId).toBe('2');
      expect(spySave).toHaveBeenCalled();
    });

    it('should not crash if bookId does not exist and still call saveBook()', () => {
      const spySave = vi.spyOn(TrackerStore, 'saveBook');
      TrackerStore.storedBooks = [];

      trackerState.deleteBook('non-existent');

      expect(TrackerStore.storedBooks).toEqual([]);
      expect(spySave).toHaveBeenCalled();
    });
  });

  describe('editRead()', () => {
    it('should update haveRead value of the matching book and call saveBook()', () => {
      const spySave = vi.spyOn(TrackerStore, 'saveBook');
      const book = new AddBooks('xyz', 'Author X', 'Book X', '300', 'No');
      TrackerStore.storedBooks = [book];

      trackerState.editRead('Yes', 'xyz');

      expect(TrackerStore.storedBooks[0].haveRead).toBe('Yes');
      expect(spySave).toHaveBeenCalled();
    });

    it('should alert if bookId is not found', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const spySave = vi.spyOn(TrackerStore, 'saveBook');

      TrackerStore.storedBooks = [];

      trackerState.editRead('Yes', 'invalid-id');

      expect(alertSpy).toHaveBeenCalledWith('no book found');
      expect(spySave).not.toHaveBeenCalled();
    });
  });
});
