# Book Tracker App — Dynamic JavaScript Architecture, Modular Design, Fully Tested

<div align="center">

A fully modular, real-DOM-based **Book Tracker SPA** built with **vanilla JavaScript**. Uses localStorage to persist books, supports add/remove/update actions, and features a fully tested architecture using **Vitest** with `jsdom` — without mocks or frameworks.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev)
[![jsdom](https://img.shields.io/badge/jsdom-DOM_Simulation-blue?style=for-the-badge)](https://github.com/jsdom/jsdom)
[![Accessibility](https://img.shields.io/badge/Accessibility-Focused-green?style=for-the-badge)](https://www.w3.org/WAI/)

</div>

## Live Demo

[View Live Application](https://umarsiddique010.github.io/book-tracker-js/) | [Source Code](https://github.com/umarSiddique010/book-tracker-js)

---

## Performance Metrics

<div align="center">

| Metric             | Score   | Status       |
| ------------------ | ------- | ------------ |
| **Performance**    | 96/100  | ✅ Excellent |
| **Accessibility**  | 100/100 | ✅ Perfect   |
| **Best Practices** | 100/100 | ✅ Perfect   |
| **SEO**            | 100/100 | ✅ Perfect   |

_Lighthouse audit results demonstrating production-ready performance without framework dependencies_

</div>

---

## Project Overview

**Book Tracker App** is a fully modular, animated, and accessible SPA that allows users to manage their personal book library with real-time updates and category filtering. No page reloads, no frameworks — all content is dynamically rendered with vanilla JavaScript and custom animations.

> **For Technical Recruiters & Clients**:  
> This demonstrates production-level frontend engineering with **component isolation**, **localStorage persistence**, **custom animations**, **accessibility compliance**, and **comprehensive test coverage** via `Vitest` and `jsdom`. Built from scratch using modern tooling including `Webpack`, `ES Modules`, and `CSS custom properties`.

### Technical Highlights

- **Pure Vanilla JavaScript**: No frameworks, no dependencies — built with modern ES6+ features
- **Fully Dynamic HTML**: Complete UI generated programmatically from a single `<div id="root"></div>`
- **Comprehensive Test Coverage**: Real DOM testing with Vitest and jsdom
- **Perfect Accessibility Score**: 100/100 Lighthouse accessibility rating
- **Production Architecture**: Modular design with proper build pipeline and optimization

---

## Features

### User Experience

- **Instant Animated Feedback**: Custom animated activity messages and progress loaders for every user interaction
- **Single Page Application**: Dynamic UI updates through real DOM manipulation without page reloads
- **Accessible Responsive Design**: Smooth sidebar toggle for enhanced navigation across all screen sizes
- **Responsive Book Grid**: Automatic card rearrangement for optimal display across all devices
- **Form Validation**: Duplicate prevention with clear, animated alert messages
- **Modern Visual Design**: Subtle shadows, consistent grid spacing, and adaptive styling

### Technical Implementation

| Feature               | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| Book Management       | Add, remove, and update books with title, author, category, status |
| Real DOM Rendering    | Dynamic UI updates with live feedback and animations               |
| Persistent Storage    | localStorage integration for data persistence across sessions      |
| Category Filtering    | Interactive sidebar with category-based book filtering             |
| Responsive Grid       | Adaptive book card layout for all screen sizes                     |
| Custom Animations     | Smooth activity messages and progress indicators                   |
| Accessibility Support | Semantic HTML, keyboard navigation, and screen reader friendly     |
| Form Validation       | Duplicate prevention with contextual error messaging               |
| Testing Coverage      | Comprehensive test suite using `Vitest` and `jsdom`                |

---

## Technology Stack

- **Vanilla JavaScript (ES6+)**: Object-oriented programming, classes, modular structure
- **HTML5 & CSS3**: Semantic markup, responsive design using Flexbox/Grid
- **Webpack**: Module bundler for development and production builds
- **Vitest**: Modern testing framework with fast execution
- **jsdom**: Browser-like DOM simulation for testing
- **localStorage**: Client-side data persistence
- **CSS animations**: Custom keyframe animations for smooth UI feedback

---

## Architecture Overview

### Core Modules

| Module          | Responsibility                                          |
| --------------- | ------------------------------------------------------- |
| `AddBooks`      | Handles book addition logic and form submission         |
| `LibraryStore`  | Manages localStorage: load, sync, modify books          |
| `LibraryState`  | Stores current app state: filters, input, selected book |
| `RenderLibrary` | Renders books grid; supports update/remove UI logic     |
| `RenderUI`      | Renders buttons, tabs, badges, and activity messages    |
| `RenderInput`   | Handles input field rendering and validation            |
| `CreateInput`   | Builds book form input (dynamic fields, dropdowns)      |
| `AsideBar`      | Handles side menu UI and category filtering             |
| `UtilityModule` | Helpers: DOM creation, string format, storage checks    |

### Data Configuration

| File                      | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `asideBarElementsData.js` | Sidebar categories and filter configurations |
| `bookFormInputsData.js`   | Form field definitions and validation rules  |

---

## Testing Strategy

> All modules are tested in isolation using `Vitest`. DOM-based classes use `jsdom` to simulate browser rendering. No spies or mocks unless absolutely required. Strict line-by-line coverage per file.

Tests are written to interact with the **real DOM**, including dynamic rendering and user events. Each test suite corresponds directly to a module — with **no mocks** unless unavoidable. Coverage includes constructor logic, UI render integrity, state handling, and event propagation.

### Test Coverage

| File                    | Type              | Test Description                              |
| ----------------------- | ----------------- | --------------------------------------------- |
| `AddBooks.test.js`      | Integration       | Book addition flow and form validation        |
| `LibraryStore.test.js`  | Unit (Logic)      | Load, add, update, remove, persist operations |
| `LibraryState.test.js`  | Unit (Logic/UI)   | State updates, filters, current book state    |
| `RenderLibrary.test.js` | Integration (DOM) | Book cards, update buttons, remove logic      |
| `RenderUI.test.js`      | Unit (UI)         | Badge count, progress bars, activity messages |
| `RenderInput.test.js`   | Unit (DOM)        | Input field rendering and validation          |
| `CreateInput.test.js`   | Unit (DOM/Form)   | Dynamic form creation, dropdowns, handlers    |
| `AsideBar.test.js`      | Integration (DOM) | Filter rendering, tab switching, events       |
| `UtilityModule.test.js` | Unit              | Helper functions and DOM utilities            |

---

## Project Structure

```
book-tracker-js/
├── package.json                    # Project metadata and dependencies
├── package-lock.json              # Dependency lock file
├── README.md                       # Project documentation
├── vitest.config.js               # Testing configuration
├── webpack.config.js              # Build configuration
├── node_modules/                  # Dependencies (auto-generated)
│
└── src/
    ├── index.js                   # Application entry point
    ├── index.html                 # Minimal HTML shell
    ├── style.css                  # Global styles
    │
    ├── __test__/                  # Test suites
    │   ├── AddBooks.test.js       # Book addition functionality tests
    │   ├── AsideBar.test.js       # Sidebar component tests
    │   ├── CreateInput.test.js    # Input form creation tests
    │   ├── LibraryState.test.js   # State management tests
    │   ├── LibraryStore.test.js   # Data persistence tests
    │   ├── RenderInput.test.js    # Input rendering tests
    │   ├── RenderLibrary.test.js  # Library display tests
    │   ├── RenderUI.test.js       # UI component tests
    │   ├── UtilityModule.test.js  # Utility function tests
    │   ├── asideBarElementsData.test.js  # Sidebar data tests
    │   └── bookFormInputsData.test.js    # Form data tests
    │
    ├── assets/                    # Static resources
    │   ├── close-hamburger.svg    # Menu close icon
    │   ├── delete-folder.png      # Bulk delete icon
    │   ├── delete.png             # Single delete icon
    │   ├── edit.png               # Edit book icon
    │   ├── favicon.png            # Browser tab icon
    │   ├── hamburger-menu.svg     # Mobile menu icon
    │   ├── main-bg.jpg            # Background image
    │   └── tick.png               # Success/completion icon
    │
    ├── css-components/            # Modular CSS files
    │   ├── asideBar.css           # Sidebar styling
    │   ├── bookCreateAndDeleteSection.css  # CRUD operations styling
    │   ├── inputForm.css          # Form styling
    │   └── librarySection.css     # Book grid styling
    │
    └── js-components/             # JavaScript modules
        ├── AddBooks.js            # Book addition logic
        ├── AsideBar.js            # Sidebar functionality
        ├── CreateInput.js         # Dynamic form creation
        ├── LibraryState.js        # Application state management
        ├── LibraryStore.js        # localStorage operations
        ├── RenderInput.js         # Input rendering logic
        ├── RenderLibrary.js       # Book grid rendering
        ├── RenderUI.js            # UI component rendering
        ├── UtilityModule.js       # Helper functions
        │
        └── data/                  # Configuration data
            ├── asideBarElementsData.js   # Sidebar configuration
            └── bookFormInputsData.js     # Form field definitions
```

---

## Getting Started

### Prerequisites

- Node.js 16+
- npm 7+
- Modern browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone https://github.com/umarSiddique010/book-tracker-js
cd book-tracker-js

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

### Usage Examples

```javascript
// Example of adding a book programmatically
const library = new LibraryStore();
library.addBook({
  title: 'Clean Code',
  author: 'Robert Martin',
  category: 'Programming',
  status: 'reading',
});

// Example of filtering books
const state = new LibraryState();
state.setFilter('category', 'Programming');
```

---

## Browser Compatibility

| Browser | Version |
| ------- | ------- |
| Chrome  | 80+     |
| Firefox | 75+     |
| Safari  | 13+     |
| Edge    | 80+     |

---

## Development Learning Outcomes

| Category                 | Highlights                                                       |
| ------------------------ | ---------------------------------------------------------------- |
| **Modular Architecture** | Built fully with isolated JS classes per feature                 |
| **DOM Abstraction**      | Custom DOM utility functions for reuse and cleanliness           |
| **State Management**     | localStorage integration with reactive UI updates                |
| **Component Isolation**  | Each module handles single responsibility with clear interfaces  |
| **Testing Discipline**   | Unit/integration tests with real DOM logic via `jsdom`           |
| **Accessibility**        | Semantic HTML, keyboard navigation, and screen reader compliance |
| **Responsive Design**    | Mobile-first grid/flex with adaptive layouts                     |
| **Animation & Feedback** | Custom CSS animations for enhanced user experience               |

---

## Future Development

- [ ] Export/Import books functionality (JSON/CSV formats)
- [ ] Advanced search and sorting capabilities
- [ ] Reading statistics and progress dashboard
- [ ] Book cover image integration via external APIs
- [ ] Dark/Light theme toggle with user preference persistence
- [ ] Progressive Web App (PWA) features for offline usage
- [ ] Multi-language internationalization support

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

**Md Umar Siddique**

[![GitHub](https://img.shields.io/badge/@umarSiddique010-181717?style=flat-square&logo=github)](https://github.com/umarSiddique010)
[![LinkedIn](https://img.shields.io/badge/LinkedIn:%20Md%20Umar%20Siddique-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/md-umar-siddique-1519b12a4/)
[![npm](https://img.shields.io/badge/npm-%40umarsiddique010-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/~umarsiddique010)
[![Email](https://img.shields.io/badge/us70763@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:us70763@gmail.com)

---

<div align="center">

**Modular. Tested. Accessible. Production-Ready.**

This Book Tracker demonstrates modern frontend engineering practices and vanilla JavaScript mastery.  
Available for technical discussions, code reviews, and collaboration opportunities.

</div>
