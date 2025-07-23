import { beforeEach, describe, expect, it, vi } from 'vitest';
import UtilityModule from '../js-components/UtilityModule.js';
import Aside from '../js-components/Aside.js';
import BookStore from '../js-components/BookStore.js';
import {
  asideDoneReading,
  asideYetToRead,
} from '../js-components/data/asideElementsData.js';

let rootDiv,
  aside = null;
beforeEach(() => {
  document.body.innerHTML = `<div id="root"></div>`;
  UtilityModule.rootDiv = document.querySelector('#root');
  rootDiv = UtilityModule.rootDiv;
  aside = new Aside();
});

describe('Aside', () => {
  describe('constructor', () => {
    it('should create an aside bar', () => {
      expect(aside.aside).toBeDefined();
      expect(aside.aside).toBeInstanceOf(HTMLElement);
      expect(aside.aside.classList.contains('aside-bar')).toBe(true);
    });

    it('should create an aside container', () => {
      expect(aside.asideContainer).toBeDefined();
      expect(aside.asideContainer).toBeInstanceOf(HTMLElement);
      expect(aside.asideContainer.classList.contains('aside-container')).toBe(
        true
      );
    });
  });

  describe('doneReading()', () => {
    it('should create a "done-reading-container" and populate it with elements from asideDoneReading', () => {
      aside.doneReading();

      const container = document.querySelector('.done-reading-container');
      expect(container).toBeInstanceOf(HTMLElement);

      expect(container.children.length).toBe(asideDoneReading.length);

      asideDoneReading.forEach(({ element, text, classNames }) => {
        const matchingElements = Array.from(container.children).filter((el) => {
          return (
            el.tagName.toLowerCase() === element &&
            (text === null || el.textContent === text) &&
            classNames.split(' ').every((cls) => el.classList.contains(cls))
          );
        });

        expect(matchingElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('yetToRead()', () => {
    it('should create a "yet-to-read-container" and populate it with elements from asideYetToRead', () => {
      aside.yetToRead();

      const container = document.querySelector('.yet-to-read-container');
      expect(container).toBeDefined();
      expect(container).toBeInstanceOf(HTMLElement);

      expect(container.children.length).toBe(asideYetToRead.length);

      asideYetToRead.forEach(({ element, text, classNames }) => {
        const matchingElements = Array.from(container.children).filter(
          (el) =>
            el.tagName.toLowerCase() === element &&
            (text ? el.textContent === text : true) &&
            classNames.split(' ').every((cls) => el.classList.contains(cls))
        );

        expect(matchingElements.length).toBeGreaterThan(0);

        const created = matchingElements[0];
        expect(created).toBeDefined();

        if (text) {
          expect(created.textContent).toBe(text);
        }

        classNames.split(' ').forEach((cls) => {
          expect(created.classList.contains(cls)).toBe(true);
        });
      });
    });
  });

  describe('appendDoneReading()', () => {
    it('should clear the done-reading-box and append anchors for books with haveRead "Yes"', () => {
      aside.doneReading();

      const doneReadingBox = document.querySelector('.done-reading-box');
      expect(doneReadingBox).toBeDefined();

      doneReadingBox.innerHTML = '<p>Old Content</p>';
      expect(doneReadingBox.innerHTML).toContain('Old Content');

      BookStore.storedBooks = [
        {
          bookId: 'book-1',
          bookName: 'Atomic Habits',
          authorName: 'James Clear',
          pageNumber: 320,
          haveRead: 'Yes',
        },
        {
          bookId: 'book-2',
          bookName: 'Thinking Fast and Slow',
          authorName: 'Daniel Kahneman',
          pageNumber: 499,
          haveRead: 'No',
        },
        {
          bookId: 'book-3',
          bookName: 'Deep Work',
          authorName: 'Cal Newport',
          pageNumber: 300,
          haveRead: 'Yes',
        },
      ];

      aside.appendDoneReading();

      expect(doneReadingBox.innerHTML).not.toContain('Old Content');

      const anchors = doneReadingBox.querySelectorAll('a.book-name-anchor');
      expect(anchors.length).toBe(2);

      expect(anchors[0].textContent).toBe('Atomic Habits');
      expect(anchors[0].getAttribute('href')).toBe('#book-1');

      expect(anchors[1].textContent).toBe('Deep Work');
      expect(anchors[1].getAttribute('href')).toBe('#book-3');
    });

    it('should not append anything if no books have haveRead as "Yes"', () => {
      aside.doneReading();
      const doneReadingBox = document.querySelector('.done-reading-box');
      BookStore.storedBooks = [
        {
          bookId: 'book-4',
          bookName: 'The Alchemist',
          authorName: 'Paulo Coelho',
          pageNumber: 208,
          haveRead: 'No',
        },
      ];

      aside.appendDoneReading();

      const anchors = doneReadingBox.querySelectorAll('a.book-name-anchor');
      expect(anchors.length).toBe(0);
      expect(doneReadingBox.innerHTML).toBe('');
    });
  });

  describe('appendYetToRead()', () => {
    it('should not throw if .yet-to-read-box does not exist', () => {
      expect(() => aside.appendYetToRead()).not.toThrow();
    });

    it('should clear yet-to-read-box content before appending', () => {
      aside.yetToRead();

      const yetToReadBox = document.querySelector('.yet-to-read-box');
      yetToReadBox.innerHTML = '<span>Old Content</span>';

      BookStore.storedBooks = [
        {
          bookId: 'book-7',
          bookName: 'Book A',
          authorName: 'Author A',
          pageNumber: '111',
          haveRead: 'No',
        },
      ];

      aside.appendYetToRead();

      expect(yetToReadBox.innerHTML.includes('Old Content')).toBe(false);
    });

    it('should append anchors for books with haveRead === "No"', () => {
      aside.yetToRead();

      BookStore.storedBooks = [
        {
          bookId: 'book-9',
          bookName: 'Read Later',
          authorName: 'Someone',
          pageNumber: '321',
          haveRead: 'No',
        },
        {
          bookId: 'book-10',
          bookName: 'Already Read',
          authorName: 'Other',
          pageNumber: '123',
          haveRead: 'Yes',
        },
      ];

      aside.appendYetToRead();

      const anchors = document.querySelectorAll(
        '.yet-to-read-box a.book-name-anchor'
      );
      expect(anchors.length).toBe(1);
      expect(anchors[0].textContent).toBe('Read Later');
      expect(anchors[0].getAttribute('href')).toBe('#book-9');
    });

    it('should not append anything if no books have haveRead === "No"', () => {
      aside.yetToRead();

      BookStore.storedBooks = [
        {
          bookId: 'book-11',
          bookName: 'Done Book',
          authorName: 'Whoever',
          pageNumber: '456',
          haveRead: 'Yes',
        },
      ];

      aside.appendYetToRead();

      const anchors = document.querySelectorAll(
        '.yet-to-read-box a.book-name-anchor'
      );
      expect(anchors.length).toBe(0);
    });
  });
  describe('smallScreenAside()', () => {
    it('should create a button with class "small-screen-aside-Btn" inside UtilityModule.rootDiv', () => {
      aside.smallScreenAside();
      const button = document.querySelector('.small-screen-aside-Btn');
      expect(button).toBeInstanceOf(HTMLButtonElement);
      expect(button.parentElement).toBe(UtilityModule.rootDiv);
    });

    it('should create an img with class "ham-img" inside the small screen button', () => {
      aside.smallScreenAside();
      const button = document.querySelector('.small-screen-aside-Btn');
      const img = button.querySelector('.ham-img');
      expect(img).toBeInstanceOf(HTMLImageElement);
      expect(img.parentElement).toBe(button);
    });

    it('should set the src of the img to hamburgerMenu', () => {
      aside.smallScreenAside();
      const img = document.querySelector('.ham-img');
      expect(img.src).toMatch(/image\/svg\+xml/);
    });
  });

  describe('smallScreenAsideHandler()', () => {
    beforeEach(() => {
      aside.smallScreenAside();
      UtilityModule.rootDiv.appendChild(aside.aside);
      aside.aside.classList.add('aside-bar');
      aside.smallScreenAsideHandler();
    });

    it('should toggle to small-aside-bar and change hamImg src to closeHamburger on first click', () => {
      const button = document.querySelector('.small-screen-aside-Btn');
      const aside = document.querySelector('.aside-bar');
      const img = document.querySelector('.ham-img');

      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(aside.classList.contains('small-aside-bar')).toBe(true);
      expect(aside.classList.contains('aside-bar')).toBe(false);
      expect(img.src).toMatch(/image\/svg\+xml/);
    });

    it('should toggle back to aside-bar and change hamImg src to hamburgerMenu on second click', () => {
      const button = document.querySelector('.small-screen-aside-Btn');
      const aside = document.querySelector('.aside-bar');
      const img = document.querySelector('.ham-img');

      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(aside.classList.contains('aside-bar')).toBe(true);
      expect(aside.classList.contains('small-aside-bar')).toBe(false);
      expect(img.src).toMatch(/image\/svg\+xml/);
    });

    it('should do nothing if .small-screen-aside-Btn does not exist', () => {
      document.querySelector('.small-screen-aside-Btn').remove();
      expect(() => aside.smallScreenAsideHandler()).not.toThrow();
      const button = document.querySelector('.small-screen-aside-Btn');
      expect(button).toBeNull();
    });
  });

  describe('asideContainerHandler()', () => {
    beforeEach(() => {
      UtilityModule.rootDiv.innerHTML = `
        <div class="aside-bar"></div>
        <div class="aside-container"></div>
        <img class="ham-img" />
      `;
    });

    it('should stop propagation and toggle classes when aside-bar is clicked', () => {
      const asideEl = document.querySelector('.aside-bar');
      const hamImg = document.querySelector('.ham-img');

      hamImg.src = 'initial.png';

      aside.asideContainerHandler();

      const clickEvent = new Event('click', { bubbles: true });
      const stopSpy = vi.spyOn(clickEvent, 'stopPropagation');

      asideEl.dispatchEvent(clickEvent);

      expect(stopSpy).toHaveBeenCalled();
      expect(asideEl.classList.contains('aside-bar')).toBe(true);
      expect(asideEl.classList.contains('small-aside-bar')).toBe(false);
      expect(hamImg.src).toMatch(/image\/svg\+xml/);
    });

    it('should stop propagation when aside-container is clicked', () => {
      const asideContainer = document.querySelector('.aside-container');
      aside.asideContainerHandler();

      const clickEvent = new Event('click', { bubbles: true });
      const stopSpy = vi.spyOn(clickEvent, 'stopPropagation');

      asideContainer.dispatchEvent(clickEvent);
      expect(stopSpy).toHaveBeenCalled();
    });

    it('should do nothing if .aside-bar does not exist', () => {
      document.querySelector('.aside-bar').remove();
      expect(() => aside.asideContainerHandler()).not.toThrow();
    });

    it('should not fail if .aside-container does not exist', () => {
      document.querySelector('.aside-container').remove();
      expect(() => aside.asideContainerHandler()).not.toThrow();
    });

    it('should not fail if .ham-img does not exist', () => {
      document.querySelector('.ham-img').remove();
      expect(() => aside.asideContainerHandler()).not.toThrow();
    });
  });
});
