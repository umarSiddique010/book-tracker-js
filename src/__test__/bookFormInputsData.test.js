import { describe, it, expect } from 'vitest';
import { fields, dropDowns } from '../js-components/data/bookFormInputsData.js';

describe('bookFormInputsData.js', () => {
  describe('fields', () => {
    it('should define three form field configs with correct structure', () => {
      expect(fields).toHaveLength(3);

      expect(fields[0]).toEqual({
        label: 'Enter book name:',
        id: 'bookName',
        placeholder: 'Book Name',
        type: 'text',
      });

      expect(fields[1]).toEqual({
        label: 'Enter author name:',
        id: 'authorName',
        placeholder: 'Author Name',
        type: 'text',
      });

      expect(fields[2]).toEqual({
        label: 'Enter page number:',
        id: 'pageNumber',
        placeholder: 'page number',
        type: 'number',
      });

      //  ensure IDs are unique
      const ids = fields.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('dropDowns', () => {
    it('should define one dropdown config with Yes/No options', () => {
      expect(dropDowns).toHaveLength(1);

      expect(dropDowns[0]).toEqual({
        label: 'Have you read?',
        id: 'haveRead',
        options: ['Yes', 'No'],
      });

      expect(dropDowns[0].options).toContain('Yes');
      expect(dropDowns[0].options).toContain('No');
    });
  });
});
