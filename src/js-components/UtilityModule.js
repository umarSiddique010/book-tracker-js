import CloseImg from "../asset/close-hamburger.svg";

export default class UtilityModule {
  static rootDiv = document.querySelector("#root");

  static createElement(tagName, parentName, texts, classNames) {
    const elementName = document.createElement(tagName);

    if (texts) {
      elementName.textContent = texts;
    }

    if (classNames) {
      elementName.classList.add(...classNames.split(" "));
    }

    parentName.appendChild(elementName);

    return elementName;
  }

  static activityMsg(message) {
    const msgBox = this.createElement(
      "div",
      this.rootDiv,
      null,
      "activity-msg-box"
    );

    const closeBtn = this.createElement(
      "button",
      msgBox,
      null,
      "activity-close-btn"
    );

    const closeImg = this.createElement("img", closeBtn, null, null);
    closeImg.src = CloseImg;

    this.createElement("p", msgBox, message, "msg-para");

    closeBtn.addEventListener("click", () => msgBox.remove());

    setTimeout(() => {
      msgBox.remove();
    }, 4000);
  }
}
