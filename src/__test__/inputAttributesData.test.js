import { describe, it, expect } from 'vitest';
import {
  bookInputFields,
  bookFormDropDowns,
} from '../js-components/data/inputAttributesData.js';

describe('inputAttributesData.js', () => {
  describe('fields', () => {
    it('should define three form field configs with correct structure', () => {
      expect(bookInputFields).toHaveLength(3);

      expect(bookInputFields[0]).toEqual({
        label: 'Enter book name:',
        id: 'bookName',
        placeholder: 'Book Name',
        type: 'text',
      });

      expect(bookInputFields[1]).toEqual({
        label: 'Enter author name:',
        id: 'authorName',
        placeholder: 'Author Name',
        type: 'text',
      });

      expect(bookInputFields[2]).toEqual({
        label: 'Enter page number:',
        id: 'pageNumber',
        placeholder: 'page number',
        type: 'number',
      });

      //  ensure IDs are unique
      const ids = bookInputFields.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('dropDowns', () => {
    it('should define one dropdown config with Yes/No options', () => {
      expect(bookFormDropDowns).toHaveLength(1);

      expect(bookFormDropDowns[0]).toEqual({
        label: 'Have you read?',
        id: 'haveRead',
        options: ['Yes', 'No'],
      });

      expect(bookFormDropDowns[0].options).toContain('Yes');
      expect(bookFormDropDowns[0].options).toContain('No');
    });
  });
});
