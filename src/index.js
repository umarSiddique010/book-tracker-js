import CreateInput from './js-components/CreateInput.js';
import RenderUI from './js-components/RenderUI.js';
import AsideBar from './js-components/AsideBar.js';
import LibraryState from './js-components/LibraryState.js';
import RenderLibrary from './js-components/RenderLibrary.js';
import RenderInput from './js-components/RenderInput.js';
import './style.css';

const libraryState = new LibraryState();
const asideBar = new AsideBar();
const renderUI = new RenderUI();
const createInput = new CreateInput(renderUI);
const renderLibrary = new RenderLibrary(libraryState, renderUI, asideBar);
const renderInput = new RenderInput(libraryState, renderLibrary);

document.addEventListener('DOMContentLoaded', () => {
  // Directly inside root div
  createInput.renderBookForm();
  createInput.formContainerHandler();
  createInput.formElementCloseHandler();
  // rendering aside bar
  asideBar.doneReading();
  asideBar.yetToRead();
  asideBar.smallScreenAsideBar();
  asideBar.smallScreenAsideHandler();
  asideBar.asideContainerHandler();

  // inside main
  renderUI.mainHeading();
  renderUI.bookCreateAndDeleteBtns();
  // Create and Delete all section

  renderUI.createLibraryHandler();
  renderUI.deleteAllLibraryHandle(renderLibrary);

  renderInput.initializeForm();
  renderLibrary.renderBooks();
  renderLibrary.attachEditAndDoneHandler();
  renderLibrary.attachDeleteBookHandler();
});
