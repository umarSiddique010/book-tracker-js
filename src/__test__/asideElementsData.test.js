import { describe, it, expect } from 'vitest';
import {
  asideDoneReading,
  asideYetToRead,
} from '../js-components/data/asideElementsData.js';

describe('asideElementsData.js', () => {
  describe('asideDoneReading', () => {
    it('should be an array with correct heading and box objects', () => {
      expect(asideDoneReading).toHaveLength(2);

      expect(asideDoneReading[0]).toEqual({
        element: 'h2',
        text: 'Done reading',
        classNames: 'done-reading-heading',
      });

      expect(asideDoneReading[1]).toEqual({
        element: 'div',
        text: null,
        classNames: 'done-reading-box',
      });
    });
  });

  describe('asideYetToRead', () => {
    it('should be an array with correct heading and box objects', () => {
      expect(asideYetToRead).toHaveLength(2);

      expect(asideYetToRead[0]).toEqual({
        element: 'h2',
        text: 'Yet to read',
        classNames: 'yet-to-read-heading',
      });

      expect(asideYetToRead[1]).toEqual({
        element: 'div',
        text: null,
        classNames: 'yet-to-read-box',
      });
    });
  });
});
