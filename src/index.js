import RenderForm from './js-components/RenderForm.js';
import RenderBasicUI from './js-components/RenderBasicUI.js';
import Aside from './js-components/Aside.js';
import BookStateManagement from './js-components/BookStateManagement.js';
import RenderTracker from './js-components/RenderTracker.js';
import InputField from './js-components/InputField.js';
import './style.css';

const bookStateManagement = new BookStateManagement();
const aside = new Aside();
const renderBasicUI = new RenderBasicUI();
const renderForm = new RenderForm(renderBasicUI);
const renderTracker = new RenderTracker(bookStateManagement, renderBasicUI, aside);
const inputField = new InputField(bookStateManagement, renderTracker);

document.addEventListener('DOMContentLoaded', () => {
  // Directly inside root div
  renderForm.renderBookForm();
  renderForm.formContainerHandler();
  renderForm.formElementCloseHandler();
  // rendering aside bar
  aside.doneReading();
  aside.yetToRead();
  aside.smallScreenAside();
  aside.smallScreenAsideHandler();
  aside.asideContainerHandler();

  // inside main
  renderBasicUI.mainHeading();
  renderBasicUI.bookCreateAndDeleteBtns();
  // Create and Delete all section

  renderBasicUI.createTrackerHandler();
  renderBasicUI.deleteAllTrackerHandle(renderTracker);

  inputField.initializeForm();
  renderTracker.renderBooks();
  renderTracker.attachEditAndDoneHandler();
  renderTracker.attachDeleteBookHandler();
});
