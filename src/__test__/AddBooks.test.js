import { describe, it, expect } from 'vitest';
import AddBooks from '../js-components/AddBooks.js';

describe('AddBooks class', () => {
  it('should correctly instantiate with given values', () => {
    const book = new AddBooks(1, 'George Orwell', '1984', 328, 'Yes');

    expect(book).toBeInstanceOf(AddBooks);
    expect(book.bookId).toBe(1);
    expect(book.bookName).toBe('1984');
    expect(book.authorName).toBe('George Orwell');
    expect(book.pageNumber).toBe(328);
    expect(book.haveRead).toBe('Yes');
  });

  it('should allow different data types (e.g., number for haveRead)', () => {
    const book = new AddBooks(2, 'Dune', 'Frank Herbert', 412, true);

    expect(book.haveRead).toBe(true);
  });

  it('should work with empty or undefined inputs', () => {
    const book = new AddBooks();

    expect(book.bookId).toBeUndefined();
    expect(book.bookName).toBeUndefined();
    expect(book.authorName).toBeUndefined();
    expect(book.pageNumber).toBeUndefined();
    expect(book.haveRead).toBeUndefined();
  });
});
