import LibraryStore from "./LibraryStore.js";
import UtilityModule from "./UtilityModule.js";

export default class RenderLibrary {
  constructor(libraryState, renderUI, asideBar) {
    this.libraryState = libraryState;
    this.renderUI = renderUI;
    this.asideBar = asideBar;
    this.librarySection = UtilityModule.createElement(
      "section",
      this.renderUI.mainTag,
      null,
      "library-section"
    );
  }

  renderInfoBar() {
    const infoBarContainer = UtilityModule.createElement(
      "div",
      this.librarySection,
      null,
      "info-bar-container"
    );

    infoBarContainer.innerHTML = `
    <div class="info-bar-box">
    <h2 class="inf-book-heading">Book name</h2>
    <h3 class="info-author-heading">Author name</h3>
    <p class="info-page-num">Page number</p>
    <p class="info-read-para">Have You read</p>
    <p class="info-edit">Edit</p>
    <p class="info-delete">Delete</p>
    </div>
    `;
  }

  renderBooks() {
    if (this.librarySection) {
      this.librarySection.innerHTML = "";
    }

    this.renderInfoBar();
    const libraryContainer = UtilityModule.createElement(
      "div",
      this.librarySection,
      null,
      "library-container"
    );

    LibraryStore.storedBooks.forEach(
      ({ bookId, authorName, bookName, pageNumber, haveRead }) => {
        this.renderBooksElements(
          libraryContainer,
          bookId,
          authorName,
          bookName,
          pageNumber,
          haveRead
        );
      }
    );

    this.asideBar.appendDoneReading();
    this.asideBar.appendYetToRead();
  }

  renderBooksElements(
    libraryContainer,
    bookId,
    bookName,
    authorName,
    pageNumber,
    haveRead
  ) {
    const libraryWrapper = UtilityModule.createElement(
      "div",
      libraryContainer,
      null,
      "library-wrapper"
    );

    libraryWrapper.setAttribute("id", `${bookId}`);

    UtilityModule.createElement("h2", libraryWrapper, bookName, "book-heading");

    UtilityModule.createElement(
      "h3",
      libraryWrapper,
      authorName,
      "author-heading"
    );

    UtilityModule.createElement(
      "p",
      libraryWrapper,
      pageNumber,
      "page-num-para"
    );

    const readPara = UtilityModule.createElement(
      "p",
      libraryWrapper,
      null,
      "read-para-box"
    );

    readPara.innerHTML = `<span>Read: </span> <span class="read-para">${haveRead}</span> `;

    UtilityModule.createElement("button", libraryWrapper, "Edit", "edit-btn");

    UtilityModule.createElement(
      "button",
      libraryWrapper,
      "Delete",
      "delete-btn"
    );
  }

  capitalizeEditValue(haveRead) {
    return haveRead.charAt(0).toUpperCase() + haveRead.slice(1).toLowerCase();
  }

  successfulEditMsg(readValue, libraryWrapper) {
    let errorMessage = [];

    const bookName = libraryWrapper
      .querySelector(".book-heading")
      .textContent.trim();
    if (readValue === "Yes") {
      errorMessage.push(`Edited to Yes. "${bookName}" added in 'Done reading'`);
    }

    if (readValue === "No") {
      errorMessage.push(`Edited to No. "${bookName}" added in 'Yet to read'`);
    }

    if (errorMessage.length > 0) {
      errorMessage.forEach((msg) => UtilityModule.activityMsg(`${msg}`));
      errorMessage = []
    }
  }

  attachEditAndDoneHandler() {
    document.addEventListener("click", (e) => {
      const target = e.target;

      if (target.classList.contains("edit-btn")) {
        const libraryWrapper = e.target.closest(".library-wrapper");

        const readPara = libraryWrapper.querySelector(".read-para");

        readPara.contentEditable = "true";
        readPara.classList.add("highlight");
        target.textContent = "Done";
        target.classList.add("done-edit-btn");
        target.classList.remove("edit-btn");
      } else if (target.classList.contains("done-edit-btn")) {
        const libraryWrapper = e.target.closest(".library-wrapper");
        const getBookId = parseInt(libraryWrapper.getAttribute("id"));
        const readPara = libraryWrapper.querySelector(".read-para");

        const haveRead = readPara.textContent;

        const readValue = this.capitalizeEditValue(haveRead);

        this.libraryState.editRead(readValue, getBookId);

        if (!["Yes", "yes", "No", "no"].includes(haveRead)) {
          UtilityModule.activityMsg("Please enter 'Yes' or 'No'");
          return;
        }

        readPara.classList.remove("highlight");
        readPara.contentEditable = "false";
        target.textContent = "Edit";
        target.classList.add("edit-btn");
        target.classList.remove("done-edit-btn");

        this.renderBooks();
        this.successfulEditMsg(readValue, libraryWrapper);
      }
    });
  }

  attachDeleteBookHandler() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const libraryWrapper = e.target.closest(".library-wrapper");
        const bookName = libraryWrapper
          .querySelector(".book-heading")
          .textContent.trim();

        const getBookId = parseInt(libraryWrapper.getAttribute("id"));

        this.libraryState.deleteBook(getBookId);
        this.renderBooks();
        UtilityModule.activityMsg(
          `"${bookName}" book's been successfully removed from library`
        );
      }
    });
  }
}
