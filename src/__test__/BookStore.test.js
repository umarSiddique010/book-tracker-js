import { expect, it, describe, beforeEach, vi } from 'vitest';
import BookStore from '../js-components/BookStore.js';

beforeEach(() => {
  localStorage.clear();
});

describe('BookStore', () => {
  it('should be defined', () => {
    expect(BookStore).toBeDefined();
  });

  describe('BookStore.saveBook()', () => {
    BookStore.storedBooks = [
      {
        bookId: 1,
        authorName: 'John Doe',
        bookName: 'The Fantasy Gatsby',
        pageNumber: 100,
        haveRead: true,
      },
    ];

    it('should save a book by saveBook()', () => {
      BookStore.storedBooks.push({
        bookId: 2,
        authorName: 'Laura Doe',
        bookName: 'The Beautiful Gatsby',
        pageNumber: 105,
        haveRead: false,
      });

      const setItem = vi.spyOn(localStorage.__proto__, 'setItem');
      BookStore.saveBook();
      expect(localStorage.getItem('savedLocalBooks')).not.toBeUndefined();
      expect(setItem).toHaveBeenCalledWith(
        'savedLocalBooks',
        JSON.stringify(BookStore.storedBooks)
      );
      expect(BookStore.storedBooks.length).toBe(2);
    });

    it('should check if the object is defined in the local storage with correct data type', () => {
      BookStore.storedBooks.forEach((book) => {
        expect(typeof book).toBe('object');
        expect(typeof book.bookId).toBe('number');
        expect(typeof book.authorName).toBe('string');
        expect(typeof book.bookName).toBe('string');
        expect(typeof book.pageNumber).toBe('number');
        expect(typeof book.haveRead).toBe('boolean');
      });
    });

    it('should delete all book by deleteAllBook()', () => {
      BookStore.saveBook();
      BookStore.deleteAllBook();
      expect(localStorage.getItem('savedLocalBooks')).toBeNull();
      expect(BookStore.storedBooks.length).toBe(0);
    });
  });
});
