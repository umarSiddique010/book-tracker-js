import { expect, it, describe, beforeEach, vi } from 'vitest';
import LibraryStore from '../js-components/LibraryStore';

beforeEach(() => {
  localStorage.clear();
});

describe('LibraryStore', () => {
  it('should be defined', () => {
    expect(LibraryStore).toBeDefined();
  });

  describe('LibraryStore.saveBook()', () => {
    LibraryStore.storedBooks = [
      {
        bookId: 1,
        authorName: 'John Doe',
        bookName: 'The Fantasy Gatsby',
        pageNumber: 100,
        haveRead: true,
      },
    ];

    it('should save a book by saveBook()', () => {
      LibraryStore.storedBooks.push({
        bookId: 2,
        authorName: 'Laura Doe',
        bookName: 'The Beautiful Gatsby',
        pageNumber: 105,
        haveRead: false,
      });

      const setItem = vi.spyOn(localStorage.__proto__, 'setItem');
      LibraryStore.saveBook();
      expect(localStorage.getItem('savedLocalBooks')).not.toBeUndefined();
      expect(setItem).toHaveBeenCalledWith(
        'savedLocalBooks',
        JSON.stringify(LibraryStore.storedBooks)
      );
      expect(LibraryStore.storedBooks.length).toBe(2);
    });

    it('should check if the object is defined in the local storage with correct data type', () => {
      LibraryStore.storedBooks.forEach((book) => {
        expect(typeof book).toBe('object');
        expect(typeof book.bookId).toBe('number');
        expect(typeof book.authorName).toBe('string');
        expect(typeof book.bookName).toBe('string');
        expect(typeof book.pageNumber).toBe('number');
        expect(typeof book.haveRead).toBe('boolean');
      });
    });

    it('should delete all book by deleteAllBook()', () => {
      LibraryStore.saveBook();
      LibraryStore.deleteAllBook();
      expect(localStorage.getItem('savedLocalBooks')).toBeNull();
      expect(LibraryStore.storedBooks.length).toBe(0);
    });
  });
});
