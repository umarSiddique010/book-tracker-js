import UtilityModule from "./UtilityModule.js";
import LibraryStore from "./LibraryStore.js";
export default class RenderUI {
  constructor() {
    this.mainTag = UtilityModule.createElement(
      "main",
      UtilityModule.rootDiv,
      null,
      null
    );

    this.bookCreateAndDeleteSection = UtilityModule.createElement(
      "section",
      this.mainTag,
      null,
      "book-curd-section"
    );
  }

  createLibraryHandler() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("create-book")) {
        const formContainer = document.querySelector(".form-container");
        formContainer.classList.remove("hidden");
      }
    });
  }

  deleteAllLibraryHandle(renderLibrary) {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-all-books")) {
        if (LibraryStore.storedBooks.length <= 0) {
          UtilityModule.activityMsg("No books to be removed from library");
        } else {
          LibraryStore.deleteAllBook();
          LibraryStore.storedBooks = [];
          renderLibrary.renderBooks();
          UtilityModule.activityMsg("All books have been removed from library");
        }
      }
    });
  }

  mainHeading() {
    UtilityModule.createElement(
      "h1",
      this.mainTag,
      "Your library",
      "main-heading"
    );
  }

  bookCreateAndDeleteBtns() {
    const btnWrapper = UtilityModule.createElement(
      "button",
      this.bookCreateAndDeleteSection,
      null,
      "curd-btn-wrapper"
    );

    UtilityModule.createElement(
      "button",
      btnWrapper,
      "Delete all",
      "delete-all-books"
    );

    UtilityModule.createElement("button", btnWrapper, "Create", "create-book");
  }
}
