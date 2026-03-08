# <img height="20" src="./src/asset/favicon.png"> Resume Craft

<hr/>

<div align="center">

![Project Banner](https://placehold.co/1200x300/183b4e/ffffff?text=Vanilla+JS+Book+Tracker+Architecture)

# Modular Book Tracker SPA

**A high-performance, framework-free Single Page Application built with modern Vanilla JavaScript, focusing on Object-Oriented Architecture, Real DOM manipulation, and comprehensive Unit Testing.**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack&logoColor=black)](https://webpack.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

</div>

---

## 🚀 Overview

This project demonstrates advanced frontend engineering fundamentals by eschewing modern frameworks to build a robust SPA from scratch. It utilizes a **modular class-based architecture** to manage state, handle persistent storage, and manipulate the DOM efficiently.

The application allows users to track their reading library, filter books by read status ("Done" vs "Yet to read"), and manage inventory with a custom-built, responsive UI.

## ✨ Key Features

- **Object-Oriented Architecture**: The codebase is strictly divided into classes (`BookStore`, `RenderTracker`, `Aside`, `UtilityModule`) to ensure Separation of Concerns (SoC).
- **Persistent State Management**: Custom-built `BookStore` class utilizes `localStorage` to persist library data across sessions without external dependencies.
- **Dynamic DOM Rendering**: UI components (`RenderBasicUI`, `RenderForm`) are generated programmatically using pure JavaScript, ensuring total control over the rendering lifecycle.
- **Responsive Sidebar Navigation**: A fully interactive `Aside` component that handles filtering and toggles via a hamburger menu on mobile devices.
- **Custom Notification System**: A built-in "Toast" notification system (`UtilityModule.activityMsg`) that provides animated user feedback for CRUD operations.
- **Form Validation & Guard Clauses**: Robust input handling in `InputField.js` prevents invalid data entry using defensive programming techniques.
- **Optimized Event Delegation**: Centralized event handling on parent containers reduces memory footprint. Dynamically added elements instantly inherit behavior without redundant listener bindings.

## 🛠 Tech Stack

### Core

- **Language**: JavaScript (ES6+ Modules, Classes, Async/Await)
- **Markup/Styling**: HTML5, CSS3 (CSS Variables, Flexbox, Grid)
- **DOM Manipulation**: Native DOM API (No jQuery)

### Build & Tooling

- **Bundler**: Webpack 5 (Asset modules, CSS loaders, HTML plugin)
- **Linting/Formatting**: Prettier (implied by code style)

### Testing

- **Runner**: Vitest
- **Environment**: JSDOM
- **Utilities**: `@testing-library/dom`

## 🏗 Architecture & Engineering Flex

This project goes beyond simple scripting. It implements a structured MVC-lite pattern:

1.  **State (Model)**: `BookStateManagement.js` and `BookStore.js` handle data logic and storage I/O.
2.  **UI (View)**: `RenderTracker.js`, `RenderForm.js`, and `RenderBasicUI.js` handle DOM creation and updates.
3.  **Logic (Controller)**: `InputField.js` bridges the gap between user input and state updates.
4.  **Performance (Event Delegation)**: Leverages event bubbling via a single listener for broad UI sections, boosting performance and preventing memory leaks caused by per-element binding.

### 🧪 Testing Strategy

The codebase maintains a high level of test coverage using **Vitest**. Tests are designed to simulate real DOM interactions via `jsdom`.

- **Unit Tests**: Verify logic in isolated classes like `AddBooks` and `utilityModule`.
- **Integration Tests**: Validate the interaction between `BookStateManagement` and `RenderTracker`.
- **DOM Tests**: Ensure elements (Forms, Buttons, Sidebar) render correctly and event listeners fire as expected (`fireEvent` / `dispatchEvent`).

## 📂 Project Structure

```text
src/
├── __test__/               # Vitest test suites (100% coverage goal)
│   ├── AddBooks.test.js
│   ├── BookStore.test.js
│   ├── RenderTracker.test.js
│   └── ...
├── asset/                  # SVG icons and static images
├── css-components/         # Modular CSS files (Separated by component)
├── js-components/          # Core Application Logic
│   ├── data/               # Static configuration data
│   ├── AddBooks.js         # Book Model
│   ├── Aside.js            # Sidebar Component
│   ├── BookStateManagement.js # Logic Controller
│   ├── BookStore.js        # LocalStorage Wrapper
│   ├── InputField.js       # Form Handling
│   ├── RenderBasicUI.js    # Layout Skeleton
│   ├── RenderForm.js       # Dynamic Form Generator
│   ├── RenderTracker.js    # Main Book Grid Renderer
│   └── UtilityModule.js    # DOM & Notification Helpers
├── index.js                # Entry Point
├── style.css               # Global Variables & Reset
└── template.html           # HTML Shell
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/umarSiddique010/book-tracker-js.git
    cd book-tracker-js
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run Development Server**
    Starts Webpack Dev Server with hot reloading.

    ```bash
    npm start
    ```

4.  **Build for Production**
    Outputs optimized files to the `build/` directory.
    ```bash
    npm run build
    ```

### Running Tests

This project uses Vitest for instant feedback.

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p><strong>Developed by Md Umar Siddique</strong></p>

  <a href="https://www.linkedin.com/in/md-umar-siddique-1519b12a4/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://www.npmjs.com/~umarSiddique010">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
  </a>
  <a href="https://dev.to/umarsiddique010">
    <img src="https://img.shields.io/badge/DEV.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white" alt="DEV Community" />
  </a>
  <a href="https://github.com/umarSiddique010">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:us70763@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>

<br/><br/>

  <p>
    <strong>Project Links:</strong> 
    <a href="https://umarsiddique010.github.io/book-tracker-js/">🚀 Live Demo</a> • 
    <a href="https://github.com/umarSiddique010/book-tracker-js/issues">🐞 Report an Issue</a> • 
    <a href="https://github.com/umarSiddique010/book-tracker-js">⭐ Star this Repo</a>
  </p>
</div>
