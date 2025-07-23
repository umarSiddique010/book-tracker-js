import hamburgerMenu from '../asset/hamburger-menu.svg';
import closeHamburger from '../asset/close-hamburger.svg';
import UtilityModule from './UtilityModule.js';
import BookStore from './BookStore.js';
import {
  asideDoneReading,
  asideYetToRead,
} from './data/asideElementsData.js';

export default class Aside {
  constructor() {
    this.aside = UtilityModule.createElement(
      'aside',
      UtilityModule.rootDiv,
      null,
      'aside-bar'
    );

    this.asideContainer = UtilityModule.createElement(
      'div',
      this.aside,
      null,
      'aside-container'
    );
  }

  doneReading() {
    const doneReadingContainer = UtilityModule.createElement(
      'div',
      this.asideContainer,
      null,
      'done-reading-container'
    );

    asideDoneReading.forEach(({ element, text, classNames }) => {
      UtilityModule.createElement(
        element,
        doneReadingContainer,
        text,
        classNames
      );
    });
  }

  yetToRead() {
    const yetToReadContainer = UtilityModule.createElement(
      'div',
      this.asideContainer,
      null,
      'yet-to-read-container'
    );

    asideYetToRead.forEach(({ element, text, classNames }) => {
      UtilityModule.createElement(
        element,
        yetToReadContainer,
        text,
        classNames
      );
    });
  }

  appendDoneReading() {
    const doneReadingBox = document.querySelector('.done-reading-box');

    if (doneReadingBox) {
      doneReadingBox.innerHTML = '';
    }

    BookStore.storedBooks.forEach(
      ({ bookId, bookName, authorName, pageNumber, haveRead }) => {
        if (haveRead === 'Yes') {
          const bookNameAnchor = UtilityModule.createElement(
            'a',
            doneReadingBox,
            `${bookName}`,
            'book-name-anchor'
          );
          bookNameAnchor.setAttribute('href', `#${bookId}`);
        }
      }
    );
  }

  appendYetToRead() {
    const yetToReadBox = document.querySelector('.yet-to-read-box');

    if (!yetToReadBox) return;

    yetToReadBox.innerHTML = '';

    BookStore.storedBooks.forEach(
      ({ bookId, bookName, authorName, pageNumber, haveRead }) => {
        if (haveRead === 'No') {
          const bookNameAnchor = UtilityModule.createElement(
            'a',
            yetToReadBox,
            `${bookName}`,
            'book-name-anchor'
          );
          bookNameAnchor.setAttribute('href', `#${bookId}`);
        }
      }
    );
  }

  smallScreenAside() {
    const smallScreenAsideBtn = UtilityModule.createElement(
      'button',
      UtilityModule.rootDiv,
      null,
      'small-screen-aside-Btn'
    );
    const hamImg = UtilityModule.createElement(
      'img',
      smallScreenAsideBtn,
      null,
      'ham-img'
    );
    hamImg.src = hamburgerMenu;
  }

  smallScreenAsideHandler() {
    const hamImg = document.querySelector('.ham-img');
    const aside = document.querySelector('.aside-bar');
    const btn = document.querySelector('.small-screen-aside-Btn');

    if (!hamImg || !aside || !btn) return;

    btn.addEventListener('click', () => {
      if (aside.classList.contains('aside-bar')) {
        aside.classList.remove('aside-bar');
        aside.classList.add('small-aside-bar');
        hamImg.src = closeHamburger;
      } else {
        aside.classList.add('aside-bar');
        aside.classList.remove('small-aside-bar');
        hamImg.src = hamburgerMenu;
      }
    });
  }

  asideContainerHandler() {
    const aside = document.querySelector('.aside-bar');
    const asideContainer = document.querySelector('.aside-container');
    const hamImg = document.querySelector('.ham-img');

    if (aside) {
      aside.addEventListener('click', (e) => {
        e.stopPropagation();
        aside.classList.add('aside-bar');
        aside.classList.remove('small-aside-bar');
        hamImg.src = hamburgerMenu;
      });
    }

    if (asideContainer) {
      asideContainer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }
}
