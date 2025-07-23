import CreateInput from './js-components/CreateInput.js';
import RenderUI from './js-components/RenderUI.js';
import AsideBar from './js-components/AsideBar.js';
import TrackerState from './js-components/TrackerState.js';
import RenderTracker from './js-components/RenderTracker.js';
import RenderInput from './js-components/RenderInput.js';
import './style.css';

const trackerState = new TrackerState();
const asideBar = new AsideBar();
const renderUI = new RenderUI();
const createInput = new CreateInput(renderUI);
const renderTracker = new RenderTracker(trackerState, renderUI, asideBar);
const renderInput = new RenderInput(trackerState, renderTracker);

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

  renderUI.createTrackerHandler();
  renderUI.deleteAllTrackerHandle(renderTracker);

  renderInput.initializeForm();
  renderTracker.renderBooks();
  renderTracker.attachEditAndDoneHandler();
  renderTracker.attachDeleteBookHandler();
});
