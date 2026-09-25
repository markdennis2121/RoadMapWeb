export const JS_CURRICULUM_PART2 = {
  'js-9': {
    id: 'js-9',
    title: 'DOM Manipulation',
    category: 'JavaScript',
    diagramType: 'dom-tree',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- Interactive DOM Manipulation Playground -->
<div id="app-container" style="font-family: sans-serif; padding: 16px; background: #f8fafc; border-radius: 8px;">
  <h3 id="main-heading" style="color: #334155; margin-top: 0;">Task List (DOM Live)</h3>
  <ul id="task-list" style="padding-left: 20px; color: #475569;">
    <li>Master HTML5 Structure</li>
  </ul>
  <button id="add-btn" style="background: #4f46e5; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer;">
    + Add Task Item
  </button>
</div>

<script>
  // DOM Selection
  const btn = document.querySelector("#add-btn");
  const taskList = document.querySelector("#task-list");
  const heading = document.querySelector("#main-heading");

  let taskCount = 1;

  // DOM Event & Manipulation
  btn.addEventListener("click", () => {
    taskCount++;
    
    // 1. Create Element
    const newLi = document.createElement("li");
    newLi.textContent = "New Milestone #" + taskCount;
    newLi.style.color = "#059669";
    newLi.style.fontWeight = "600";
    
    // 2. Append to Parent
    taskList.appendChild(newLi);

    // 3. Update Text Content
    heading.textContent = \`Task List (\${taskCount} items)\`;
  });
</script>`,
    overview: {
      what: 'DOM (Document Object Model) Manipulation is the programmatic process by which JavaScript queries, inspects, creates, modifies, and removes HTML elements, attributes, and styles on an active web page in real time.',
      why: 'DOM manipulation transforms static HTML documents into dynamic, responsive user experiences—powering live search filters, dynamic modals, theme switchers, shopping carts, and interactive dashboards.',
      whereUsed: 'Universal across web development: vanilla JavaScript apps, component renderers in React/Vue under the hood, browser extensions, and web widgets.'
    },
    coreConcepts: [
      {
        title: 'DOM Querying: querySelector vs getElementById',
        explanation: 'document.querySelector() accepts any standard CSS selector (.class, #id, div > span, [data-attr]) and returns the first matching element. querySelectorAll() returns a NodeList of all matches.',
        terms: [
          { term: 'querySelector', definition: 'document.querySelector(".btn-active") Returns first match or null.' },
          { term: 'querySelectorAll', definition: 'document.querySelectorAll(".card") Returns a NodeList of all matches.' },
          { term: 'textContent vs innerHTML', definition: 'textContent inserts safe plain text; innerHTML parses raw HTML strings (use cautiously to avoid XSS vulnerabilities).' }
        ],
        relationship: 'Always prefer textContent over innerHTML when inserting user-supplied content to prevent Cross-Site Scripting (XSS).'
      },
      {
        title: 'Creating and Modifying Elements',
        explanation: 'Elements are created in memory using document.createElement(), configured with attributes, classes, and text, and then inserted into the DOM tree with appendChild() or append().',
        terms: [
          { term: 'createElement', definition: 'const div = document.createElement("div"); Allocates element node.' },
          { term: 'classList API', definition: 'element.classList.add(), .remove(), .toggle("active").' },
          { term: 'DocumentFragment', definition: 'Lightweight off-DOM container used to batch append multiple elements with a single reflow.' }
        ],
        relationship: 'Batching DOM insertions with a DocumentFragment prevents browser UI layout thrashing.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// 1. Query
const element = document.querySelector('.my-class');

// 2. Modify Text & Classes
element.textContent = "Updated Content";
element.classList.toggle("is-active");

// 3. Create & Append
const item = document.createElement("li");
item.textContent = "New Item";
parentContainer.appendChild(item);`,
      breakdown: [
        { part: 'document.querySelector(selector)', meaning: 'Searches the DOM tree using standard CSS selector syntax.' },
        { part: 'element.classList.toggle(className)', meaning: 'Adds class if missing, removes class if present.' }
      ],
      conventions: [
        'Cache DOM selections in const variables instead of querying the DOM repeatedly inside loops.',
        'Use classList.add() / .remove() instead of mutating element.className strings directly.',
        'Use dataset for custom data attributes (data-user-id="123" -> element.dataset.userId).'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Dynamic Theme Color Switcher',
        description: 'Toggling dark mode classes on the document body.',
        code: `const toggleBtn = document.querySelector("#theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  toggleBtn.textContent = isDark ? "☀️ Switch to Light" : "🌙 Switch to Dark";
});`,
        explanation: 'Uses classList.toggle() and classList.contains() to manage UI theme states cleanly.'
      },
      {
        level: 'Intermediate',
        title: 'Batch DOM Insertion with DocumentFragment',
        description: 'Rendering 100 items with only 1 single browser layout reflow.',
        code: `const userList = document.querySelector("#users");
const users = ["Alice", "Bob", "Charlie", "David", "Emma"];

const fragment = document.createDocumentFragment(); // Off-screen container

users.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  li.className = "user-item";
  fragment.appendChild(li); // Appends in memory (0 reflows!)
});

userList.appendChild(fragment); // Single reflow in live DOM!`,
        explanation: 'DocumentFragment drastically improves performance by avoiding multiple layout recalculations.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Dynamic Toast Notification Generator',
        description: 'Creating, styling, and auto-dismissing toast alerts in the DOM.',
        code: `function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = \`toast-msg toast-\${type}\`;
  toast.textContent = message;
  toast.style.cssText = "position: fixed; bottom: 20px; right: 20px; padding: 12px 20px; background: #10b981; color: white; border-radius: 8px; transition: opacity 0.3s;";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300); // Clean DOM removal
  }, 2500);
}

showToast("Profile settings saved!", "success");`,
        explanation: 'Demonstrates complete element lifecycle: creation, styling, timer dismissal, and memory cleanup.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Locate Target Parent Container',
        instruction: 'Use document.querySelector() to store a reference to the container where elements will live.',
        whyNecessary: 'Provides the anchor node for insertion.',
        codeSnippet: `const container = document.querySelector('#feed-container');`
      },
      {
        step: 2,
        title: 'Instantiate New Element Node',
        instruction: 'Call document.createElement("tagname") and configure text, classes, and attributes.',
        whyNecessary: 'Prepares the node in memory before attaching to the active DOM.',
        codeSnippet: `const card = document.createElement('div');\ncard.className = 'card';`
      },
      {
        step: 3,
        title: 'Mount Element into Live Document',
        instruction: 'Call parent.appendChild(node) or parent.prepend(node).',
        whyNecessary: 'Renders the element visibly on screen for the user.',
        codeSnippet: `container.appendChild(card);`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always sanitize user input or use .textContent to prevent Cross-Site Scripting (XSS) attacks.',
        'Use classList methods (add, remove, toggle, contains) for styling changes.',
        'Cache DOM queries; avoid calling document.querySelector inside rapid loops or scroll listeners.'
      ],
      structureRecommendations: [
        'Separate DOM manipulation functions from pure business calculations.'
      ],
      performanceConsiderations: [
        'Use document.createDocumentFragment() when inserting multiple elements in batch.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using element.innerHTML = userInput (Opens severe XSS vulnerability!).',
        howToAvoid: 'Use element.textContent = userInput for plain text.',
        debuggingTip: 'Test if typing <script>alert(1)</script> executes in your form.'
      },
      {
        mistake: 'Querying the DOM inside a for loop (for (...) { document.querySelector(\'#list\').append(...) }).',
        howToAvoid: 'Query #list once outside the loop.',
        debuggingTip: 'Extract query to a constant outside the loop.'
      }
    ],
    projectApplications: [
      {
        domain: 'Single Page Application (SPA) Rendering',
        description: 'Mounting dynamic view views and managing modal popups.'
      },
      {
        domain: 'Live Search and Filtering UIs',
        description: 'Instantly showing/hiding list items as users type into search fields.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Select a paragraph element and change its text content to "Updated via JavaScript" and background to light blue.',
        'Create an ordered list with 3 programming languages dynamically using document.createElement().'
      ],
      codingChallenge: {
        prompt: 'Build a dynamic counter app where clicking "+" increments a count heading and changes text color to green when count > 0.',
        hint: 'Use btn.addEventListener("click", () => { ... }) and countElem.textContent.'
      },
      miniProjectIdea: {
        title: 'Interactive To-Do List Application',
        description: 'Build a complete vanilla JS to-do list with item addition, strike-through completion toggle, and delete removal.'
      }
    },
    summary: {
      keyPoints: [
        'DOM Manipulation enables dynamic updates of text, attributes, classes, and elements.',
        'Always use textContent for safe plain text insertion to prevent XSS vulnerabilities.',
        'DocumentFragment batches DOM updates for top rendering performance.'
      ],
      skillsAcquired: [
        'Proficiency in querying DOM nodes with querySelector.',
        'Mastery of dynamic element creation, class toggling, and removal.',
        'Understanding of DOM security (XSS prevention) and performance reflows.'
      ]
    },
    exercise: {
      question: 'Which property is the safest and recommended way to insert plain user text into a DOM node without XSS vulnerabilities?',
      options: ['textContent', 'innerHTML', 'outerHTML', 'document.write'],
      answer: 'textContent'
    },
    exam: {
      question: 'Why is document.createDocumentFragment() used when appending multiple dynamic elements to the DOM?',
      options: [
        'It batches all insertions in memory off-screen, triggering only one single browser layout reflow',
        'It encrypts the DOM elements for security',
        'It converts HTML into WebAssembly automatically',
        'It bypasses JavaScript garbage collection'
      ],
      answer: 'It batches all insertions in memory off-screen, triggering only one single browser layout reflow'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting'
  },

  'js-10': {
    id: 'js-10',
    title: 'Events & Event Delegation',
    category: 'JavaScript',
    diagramType: 'event-flow',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- Event Delegation Interactive Demonstration -->
<div style="font-family: sans-serif; max-width: 400px; padding: 16px; background: #f1f5f9; border-radius: 8px;">
  <h4 style="margin-top: 0;">Event Delegation List</h4>
  <p style="font-size: 13px; color: #64748b;">Click any item (including newly added ones) with a single parent listener:</p>
  
  <ul id="items-parent" style="list-style: none; padding: 0; display: grid; gap: 6px;">
    <li data-id="1" style="background: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; border: 1px solid #cbd5e1;">Item 1 (Click me)</li>
    <li data-id="2" style="background: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; border: 1px solid #cbd5e1;">Item 2 (Click me)</li>
  </ul>

  <button id="add-more-btn" style="background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; margin-top: 8px;">
    + Add New Item
  </button>
  <p id="event-log" style="font-weight: bold; color: #4338ca; font-size: 13px; margin-top: 10px;"></p>
</div>

<script>
  const parentList = document.querySelector("#items-parent");
  const log = document.querySelector("#event-log");
  const addBtn = document.querySelector("#add-more-btn");
  let nextId = 3;

  // Single event listener on parent delegates clicks for all present and future children!
  parentList.addEventListener("click", (e) => {
    const targetLi = e.target.closest("li");
    if (!targetLi) return; // Ignore clicks outside LI elements

    log.textContent = \`Delegated Click detected on ID: \${targetLi.dataset.id} - "\${targetLi.textContent}"\`;
    targetLi.style.background = "#e0e7ff";
  });

  addBtn.addEventListener("click", () => {
    const li = document.createElement("li");
    li.dataset.id = nextId;
    li.textContent = \`Item \${nextId} (Dynamically Added)\`;
    li.style.cssText = "background: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; border: 1px solid #cbd5e1;";
    parentList.appendChild(li);
    nextId++;
  });
</script>`,
    overview: {
      what: 'DOM Events are signal notifications triggered by user interactions (clicks, keyboard input, mouse movements, scrolling, form submissions) or browser lifecycle milestones. Event Delegation is a performance pattern where a single event listener is attached to a parent container to manage events for all current and future child elements via Event Bubbling.',
      why: 'Attaching separate event listeners to thousands of table rows or list items consumes substantial browser memory and breaks when new elements are appended dynamically. Event Delegation solves both problems with a single listener.',
      whereUsed: 'Universal: data tables, infinite scroll feeds (Twitter/Instagram), drag-and-drop interfaces, dropdown menus, and modal management.'
    },
    coreConcepts: [
      {
        title: 'Event Bubbling & Capturing Phase',
        explanation: 'When an event occurs, it travels down the DOM tree in the Capturing phase, triggers the target element, and then "bubbles" upward through all ancestor parent elements up to `document`.',
        terms: [
          { term: 'Event Bubbling', definition: 'The event travels upward from child -> parent -> ancestor -> document.' },
          { term: 'e.target vs e.currentTarget', definition: '`e.target` is the actual innermost element clicked; `e.currentTarget` is the element to which the event handler is attached.' },
          { term: 'e.stopPropagation()', definition: 'Halts event propagation up the DOM tree hierarchy.' },
          { term: 'e.preventDefault()', definition: 'Cancels the browser\'s default native behavior (e.g. form submit page refresh or link navigation).' }
        ],
        relationship: 'Event delegation relies entirely on Event Bubbling to catch child clicks on the parent container.'
      },
      {
        title: 'The Event Delegation Pattern with `e.target.closest()`',
        explanation: 'By attaching a listener to a common ancestor, `e.target.closest(".target-class")` identifies if the click originated inside a desired child component.',
        terms: [
          { term: 'closest(selector)', definition: 'Traverses the element and its parents upward until it finds a node matching the CSS selector.' }
        ],
        relationship: '`closest()` ensures clicks on child icons or `<span>` tags inside a button still correctly identify the `<button>` element.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Event Listener Syntax
element.addEventListener(eventType, callbackFunction, options);

// Event Delegation Pattern
parentContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button.delete-btn");
  if (button) {
    handleDelete(button.dataset.id);
  }
});`,
      breakdown: [
        { part: 'addEventListener("click", (e) => ...)', meaning: 'Subscribes callback to click event dispatch.' },
        { part: 'e.preventDefault()', meaning: 'Prevents default browser action (e.g. page reload on form submit).' },
        { part: 'e.target.closest(selector)', meaning: 'Finds the nearest matching ancestor matching the target.' }
      ],
      conventions: [
        'Always clean up event listeners with `removeEventListener` in single-page apps to avoid memory leaks.',
        'Always use `e.target.closest()` in event delegation to handle nested child tags safely.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Keyboard Event Listener with Key Detection',
        description: 'Listening for Escape key press to close active modal windows.',
        code: `document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    console.log("Escape key pressed! Closing active modals.");
    closeAllModals();
  }
});

function closeAllModals() {
  console.log("Modals dismissed.");
}`,
        explanation: 'Global keyboard listener inspecting `e.key`.'
      },
      {
        level: 'Intermediate',
        title: 'Interactive Accordion with Event Delegation',
        description: 'Managing 10 accordion panels using only 1 parent listener.',
        code: `const accordionParent = document.querySelector("#accordion");

accordionParent.addEventListener("click", (e) => {
  const header = e.target.closest(".accordion-header");
  if (!header) return;

  const panel = header.nextElementSibling;
  panel.classList.toggle("open");
});`,
        explanation: 'Single listener manages clicks across all present and future accordion headers.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Dynamic Data Table Row Action Delegation',
        description: 'Handling Edit and Delete buttons across dynamic table rows.',
        code: `const table = document.querySelector("#user-table");

table.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".btn-delete");
  const editBtn = e.target.closest(".btn-edit");

  if (deleteBtn) {
    const rowId = deleteBtn.dataset.userId;
    console.log("Deleting user row ID:", rowId);
    deleteBtn.closest("tr").remove(); // Remove row from DOM
  } else if (editBtn) {
    const rowId = editBtn.dataset.userId;
    console.log("Opening edit dialog for user ID:", rowId);
  }
});`,
        explanation: 'Handles multiple action types across dynamic table rows with zero memory overhead.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Select the Common Parent Container',
        instruction: 'Identify the static wrapper element enclosing the dynamic interactive child items.',
        whyNecessary: 'The parent remains in the DOM even when child items are added or removed.',
        codeSnippet: `const listContainer = document.querySelector('#item-list');`
      },
      {
        step: 2,
        title: 'Attach Listener and Match Target',
        instruction: 'Add the `click` listener on the parent and use `e.target.closest(".target-class")` to filter.',
        whyNecessary: 'Ensures the handler only executes when the intended element or its children are clicked.',
        codeSnippet: `listContainer.addEventListener('click', (e) => {\n  const item = e.target.closest('.list-item');\n  if (item) handleClick(item);\n});`
      },
      {
        step: 3,
        title: 'Prevent Default or Stop Propagation When Necessary',
        instruction: 'Call `e.preventDefault()` if handling anchor tags or form submits.',
        whyNecessary: 'Stops unwanted browser navigation or page refreshes.',
        codeSnippet: `e.preventDefault();`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use event delegation on lists, tables, and dynamic feeds.',
        'Use `e.key` (e.g. `"Enter"`, `"Escape"`) instead of deprecated `e.keyCode`.',
        'Use `{ passive: true }` on touch and scroll event listeners for smooth 60fps scrolling.'
      ],
      structureRecommendations: [
        'Extract event listener callback functions into named handlers rather than massive anonymous inline functions.'
      ],
      performanceConsiderations: [
        'Event delegation saves megabytes of browser RAM by reducing thousands of listener instances to just one.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using `e.target.tagName === "BUTTON"` without `closest()`, causing clicks on nested `<span>` or `<i>` icons to fail.',
        howToAvoid: 'Always use `e.target.closest("button")`.',
        debuggingTip: 'Test clicking directly on the icon inside the button.'
      },
      {
        mistake: 'Forgetting `e.preventDefault()` on form submit, causing the entire page to reload and clear application state.',
        howToAvoid: 'Call `e.preventDefault()` at the top of your submit handler.',
        debuggingTip: 'Check if the browser URL appends `?` and page refreshes on click.'
      }
    ],
    projectApplications: [
      {
        domain: 'Data Grid & Table Interfaces',
        description: 'Managing row selection, inline editing, sorting arrows, and deletion modals.'
      },
      {
        domain: 'E-Commerce Shopping Carts',
        description: 'Incrementing, decrementing, and removing cart line items dynamically.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Attach a keyboard listener that logs the coordinates and key pressed for every keystroke.',
        'Build a dynamic shopping list that uses event delegation to delete items when their remove button is clicked.'
      ],
      codingChallenge: {
        prompt: 'Implement a star rating component where hovering over any star highlights all previous stars using event delegation.',
        hint: 'Use `parent.addEventListener("mouseover", (e) => ...)` and check `dataset.starIndex`.'
      },
      miniProjectIdea: {
        title: 'Kanban Task Board with Drag & Click Delegation',
        description: 'Build a multi-column Kanban board that handles card movements, deletions, and title edits using delegated events.'
      }
    },
    summary: {
      keyPoints: [
        'Events bubble upward through the DOM hierarchy from child to parent.',
        'Event Delegation attaches 1 listener on a parent to manage all current and future child elements.',
        '`e.target.closest()` reliably targets elements even with nested icon tags.'
      ],
      skillsAcquired: [
        'Mastery of event bubbling, capturing, and delegation mechanics.',
        'Proficiency with `e.preventDefault()` and `e.stopPropagation()`.',
        'Ability to write high-performance, memory-efficient UI event systems.'
      ]
    },
    exercise: {
      question: 'What method allows an event listener to identify if a click originated inside a target element or any of its nested children?',
      options: ['e.target.closest(selector)', 'e.target.find()', 'e.target.parent()', 'document.match()'],
      answer: 'e.target.closest(selector)'
    },
    exam: {
      question: 'Why is Event Delegation vastly superior to attaching separate event listeners to every single list item?',
      options: [
        'It uses significantly less memory and automatically works for newly added dynamic child elements without reattaching listeners',
        'It makes JavaScript compile to C++',
        'It bypasses CORS security restrictions',
        'It prevents CSS styles from being overridden'
      ],
      answer: 'It uses significantly less memory and automatically works for newly added dynamic child elements without reattaching listeners'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events'
  },

  'js-11': {
    id: 'js-11',
    title: 'Forms & FormData in JavaScript',
    category: 'JavaScript',
    diagramType: 'form-js',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- JavaScript FormData and Form Submission -->
<form id="profile-form" style="font-family: sans-serif; max-width: 360px; display: grid; gap: 10px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
  <label style="font-size: 13px; font-weight: 600;">
    Username:
    <input type="text" name="username" required value="developer_alex" style="width: 100%; padding: 8px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;" />
  </label>

  <label style="font-size: 13px; font-weight: 600;">
    Experience Level:
    <select name="level" style="width: 100%; padding: 8px; margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px;">
      <option value="junior">Junior Developer</option>
      <option value="mid" selected>Mid-Level Developer</option>
      <option value="senior">Senior Architect</option>
    </select>
  </label>

  <button type="submit" style="background: #4f46e5; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;">
    Save Profile via FormData
  </button>
  <pre id="form-output" style="background: #1e293b; color: #a5f3fc; padding: 10px; border-radius: 6px; font-size: 12px; margin: 0;"></pre>
</form>

<script>
  const form = document.querySelector("#profile-form");
  const output = document.querySelector("#form-output");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop default browser page reload!

    // Modern FormData API extracts all named inputs instantly:
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData.entries());

    output.textContent = "Extracted JSON Payload:\\n" + JSON.stringify(dataObject, null, 2);
  });
</script>`,
    overview: {
      what: 'Handling forms in JavaScript involves capturing submit events, preventing disruptive full-page browser refreshes via `e.preventDefault()`, validating complex input constraints, extracting input data via the `FormData` API, and transmitting JSON payloads asynchronously via `fetch()`.',
      why: 'Modern Single Page Applications (SPAs) cannot afford full-page refreshes during form submissions. Extracting form data cleanly using `FormData` and `Object.fromEntries()` eliminates dozens of manual `document.querySelector("#input").value` boilerplate lines.',
      whereUsed: 'Universal: user authentication (login/signup), profile settings, multi-step checkout wizards, search bars, and file upload forms.'
    },
    coreConcepts: [
      {
        title: 'The `FormData` API & `Object.fromEntries()`',
        explanation: '`const data = new FormData(formElement);` automatically harvests values from every input, textarea, and select element possessing a `name` attribute in the form.',
        terms: [
          { term: 'FormData', definition: 'Browser API that parses all named input values from an HTML `<form>`.' },
          { term: 'Object.fromEntries(formData.entries())', definition: 'Converts FormData key-value pairs into a clean JavaScript Object ready for JSON serialization.' },
          { term: 'form.reset()', definition: 'Natively resets all fields back to their initial default values.' }
        ],
        relationship: '`FormData` grabs the raw inputs; `Object.fromEntries()` transforms it into a JSON-ready object.'
      },
      {
        title: 'Custom Client Validation with `checkValidity()`',
        explanation: 'JavaScript can trigger HTML5 validation programmatically using `form.checkValidity()` and customize error tooltips using `input.setCustomValidity()`.',
        terms: [
          { term: 'checkValidity()', definition: 'Returns boolean true if all input constraints in the form are satisfied.' },
          { term: 'reportValidity()', definition: 'Evaluates constraints and displays native browser error callouts if invalid.' }
        ],
        relationship: 'Combine native browser validation APIs with custom regex tests for seamless user feedback.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Form Submit Handling Pattern
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  await sendToServer(payload);
});`,
      breakdown: [
        { part: 'e.preventDefault()', meaning: 'Crucial: stops browser from triggering a page reload.' },
        { part: 'new FormData(form)', meaning: 'Extracts all input values mapped by their name attributes.' }
      ],
      conventions: [
        'Always assign `name` attributes to all form controls.',
        'Always disable the submit button during active asynchronous network submission to prevent duplicate orders/requests.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Basic Input Capture with `e.preventDefault()`',
        description: 'Reading text input without reloading the page.',
        code: `const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchForm.querySelector('input[name="q"]').value.trim();
  if (query) {
    console.log("Searching for:", query);
  }
});`,
        explanation: 'Standard vanilla pattern for interactive search bars.'
      },
      {
        level: 'Intermediate',
        title: 'Multipart File Upload with FormData',
        description: 'Packaging binary file inputs and text fields for multipart HTTP upload.',
        code: `async function uploadAvatar(formElement) {
  const formData = new FormData(formElement);
  // formData natively handles binary files from <input type="file">!

  try {
    const response = await fetch("/api/upload-avatar", {
      method: "POST",
      body: formData // Browser automatically sets 'multipart/form-data' header with boundary!
    });
    const result = await response.json();
    console.log("Upload Success:", result);
  } catch (err) {
    console.error("Upload failed:", err);
  }
}`,
        explanation: '`FormData` packages binary files seamlessly without manual base64 conversions.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Production Async JSON Form Handler with UI Lock',
        description: 'Complete registration form handler with loading states and error toast presentation.',
        code: `const regForm = document.querySelector("#reg-form");
const submitBtn = regForm.querySelector('button[type="submit"]');

regForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Disable button to prevent double-submissions
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating Account...";

  const formData = new FormData(regForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Registration failed: " + res.statusText);

    const user = await res.json();
    console.log("User created:", user);
    regForm.reset();
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Register";
  }
});`,
        explanation: 'Production pattern including UI loading states, JSON serialization, and try/catch/finally cleanup.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Verify Input `name` Attributes',
        instruction: 'Ensure every `<input>`, `<select>`, and `<textarea>` has a unique `name` attribute.',
        whyNecessary: '`FormData` ignores inputs that lack a `name` attribute.',
        codeSnippet: `<input type="text" name="email" required>`
      },
      {
        step: 2,
        title: 'Intercept Form Submit Event',
        instruction: 'Attach `form.addEventListener("submit", handler)` and immediately call `e.preventDefault()`.',
        whyNecessary: 'Prevents page reload and enables asynchronous handling.',
        codeSnippet: `form.addEventListener('submit', (e) => { e.preventDefault(); ... });`
      },
      {
        step: 3,
        title: 'Convert FormData to JSON Object',
        instruction: 'Call `Object.fromEntries(new FormData(form).entries())`.',
        whyNecessary: 'Produces a clean JavaScript object ready for JSON stringification.',
        codeSnippet: `const payload = Object.fromEntries(new FormData(form).entries());`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always call `e.preventDefault()` on submit events.',
        'Disable submit buttons during in-flight network requests.',
        'Use `Object.fromEntries(new FormData(form))` for rapid serialization.'
      ],
      structureRecommendations: [
        'Clear input error highlights dynamically as the user types using `input` event listeners.'
      ],
      performanceConsiderations: [
        'Do not set `Content-Type` headers manually when uploading binary `FormData` files; let the browser compute the multipart boundary.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Forgetting the `name` attribute on input fields.',
        howToAvoid: 'Always declare `name="..."`. `FormData` will return `{}` if names are missing.',
        debuggingTip: 'Check if `Object.fromEntries(new FormData(form))` is empty.'
      },
      {
        mistake: 'Manually specifying `headers: { "Content-Type": "multipart/form-data" }` when sending raw `FormData`.',
        howToAvoid: 'Leave the header blank; fetch will automatically calculate the multipart boundary string.',
        debuggingTip: 'Check network tab for missing boundary errors.'
      }
    ],
    projectApplications: [
      {
        domain: 'Authentication & Profile Portals',
        description: 'Asynchronously logging in users and saving profile pictures without page refreshes.'
      },
      {
        domain: 'Checkout & Payment Flows',
        description: 'Validating credit card inputs and transmitting encrypted payment tokens to Stripe or PayPal.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a feedback form with name, rating select, and comments; print the extracted JSON object on submit.',
        'Build a password confirmation validator that calls `setCustomValidity("Passwords must match")` if passwords differ.'
      ],
      codingChallenge: {
        prompt: 'Build a form submit handler that disables the submit button, simulates a 2-second API delay with `setTimeout`, resets the form, and re-enables the button.',
        hint: 'Use `try/finally` to guarantee button re-enabling.'
      },
      miniProjectIdea: {
        title: 'Interactive Multi-Step Wizard Form',
        description: 'Build a 3-step registration wizard that validates each step with JavaScript before revealing the next pane.'
      }
    },
    summary: {
      keyPoints: [
        '`e.preventDefault()` stops disruptive browser page refreshes.',
        '`FormData` and `Object.fromEntries()` convert HTML forms into JSON objects in one line.',
        'Always disable submit buttons during active network requests.'
      ],
      skillsAcquired: [
        'Proficiency in modern asynchronous form handling.',
        'Mastery of the `FormData` API and object conversion.',
        'Skill in building interactive validation feedback loops.'
      ]
    },
    exercise: {
      question: 'Which method converts a `FormData` instance into a standard JavaScript Object?',
      options: [
        'Object.fromEntries(formData.entries())',
        'JSON.toObject(formData)',
        'formData.toObject()',
        'Array.from(formData)'
      ],
      answer: 'Object.fromEntries(formData.entries())'
    },
    exam: {
      question: 'What is the critical reason for calling `e.preventDefault()` inside a form submit event handler in modern web applications?',
      options: [
        'To prevent the browser from executing its default full-page HTTP refresh, enabling seamless asynchronous JavaScript updates',
        'To force the form to submit over HTTPS',
        'To clear all input fields automatically',
        'To validate email syntax automatically'
      ],
      answer: 'To prevent the browser from executing its default full-page HTTP refresh, enabling seamless asynchronous JavaScript updates'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/FormData'
  },

  'js-12': {
    id: 'js-12',
    title: 'ES6+ Features & Modules',
    category: 'JavaScript',
    diagramType: 'js-es6',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Modern ES6+ Features Showcase
// 1. Template Literals & Multi-line Strings
const userName = "Elena";
const unreadMessages = 4;
const greeting = \`Hello \${userName}! You have \${unreadMessages} unread \${unreadMessages === 1 ? "message" : "messages"}.\`;
console.log(greeting);

// 2. Rest Parameter (Condenses multiple arguments into an array)
function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log("Sum All (1, 2, 3, 4, 5):", sumAll(1, 2, 3, 4, 5));

// 3. Array and Object Spread
const defaultSettings = { theme: "light", notifications: true };
const userSettings = { theme: "dark" };
const finalConfig = { ...defaultSettings, ...userSettings, version: "2.0" };
console.log("Merged Config:", finalConfig);

// 4. Array Destructuring & Swapping Variables
let a = 1, b = 2;
[a, b] = [b, a]; // Clean variable swap without temp variable!
console.log("Swapped: a =", a, ", b =", b);`,
    overview: {
      what: 'ECMAScript 6 (ES6 / ES2015) and subsequent modern JavaScript specifications introduced transformative language enhancements: Template Literals, Destructuring, Rest/Spread operators (`...`), Default parameters, Arrow functions, ES Modules (`import`/`export`), Promises, Classes, and Optional Chaining.',
      why: 'ES6+ transformed JavaScript from a basic browser scripting language into a world-class, expressive, modular programming language. Modern syntax reduces boilerplate, improves readability, and powers modern build tools (Vite, Webpack).',
      whereUsed: 'Standard across all modern web development: React, Node.js, Next.js, Vue, Angular, and TypeScript.'
    },
    coreConcepts: [
      {
        title: 'Rest (`...args`) vs Spread (`...arr`) Operators',
        explanation: 'While both use the three-dot syntax `...`, their purpose is opposite: Rest GATHERS multiple elements into a single array; Spread EXPANDS an array or object into individual elements.',
        terms: [
          { term: 'Rest Parameter (`...args`)', definition: 'Collects remaining function arguments into a true Array.' },
          { term: 'Spread Operator (`[...arr]`, `{...obj}`)', definition: 'Expands iterable elements or object properties into a new container.' }
        ],
        relationship: 'Rest in function parameters gathers; Spread in array/object literals spreads out.'
      },
      {
        title: 'ES Modules: Named vs Default Exports',
        explanation: 'ES Modules (`import`/`export`) provide standard modular file separation, enabling tree-shaking and static dependency analysis.',
        terms: [
          { term: 'Default Export (`export default fn`)', definition: 'One per file; imported without curly braces: `import fn from "./fn.js"`.' },
          { term: 'Named Export (`export const x = 1`)', definition: 'Multiple per file; imported with curly braces: `import { x } from "./x.js"`.' }
        ],
        relationship: 'Use named exports for utility collections; use default exports for primary component files.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// ES Module Export
export const helper = () => { ... };
export default class App { ... }

// ES Module Import
import App, { helper } from './app.js';

// Template Literal
const msg = \`Total: \$\${(price * 1.1).toFixed(2)}\`;

// Rest & Spread
const [first, ...rest] = [10, 20, 30, 40];`,
      breakdown: [
        { part: '`Hello ${name}`', meaning: 'Interpolates expressions directly inside backticks.' },
        { part: '...rest', meaning: 'Captures remaining arguments or array items.' }
      ],
      conventions: [
        'Always use template literals instead of string concatenation (`"Hello " + name`).',
        'Prefer named exports for utility libraries to improve IDE auto-import suggestions and tree-shaking.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Variable Swapping with Destructuring',
        description: 'Swapping two variable values in one clean line without temporary variables.',
        code: `let primaryColor = "red";
let secondaryColor = "blue";

// One-line swap:
[primaryColor, secondaryColor] = [secondaryColor, primaryColor];

console.log("Primary:", primaryColor);     // "blue"
console.log("Secondary:", secondaryColor); // "red"`,
        explanation: 'Array destructuring makes value swapping elegant and atomic.'
      },
      {
        level: 'Intermediate',
        title: 'Rest Parameters in Variadic Functions',
        description: 'Creating functions that accept an arbitrary number of arguments.',
        code: `function logEvents(category, ...eventNames) {
  console.log(\`[\${category.toUpperCase()}] Logged \${eventNames.length} events:\`);
  eventNames.forEach((evt, idx) => {
    console.log(\`  \${idx + 1}. \${evt}\`);
  });
}

logEvents("Security", "User Login", "Password Changed", "2FA Verified");`,
        explanation: '`...eventNames` collects all arguments after `category` into an iterable array.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Modular API Client Architecture',
        description: 'Structuring clean ES modules with named and default exports.',
        code: `// File: utils/apiClient.js
export const API_BASE_URL = "https://api.example.com/v1";

export async function get(endpoint) {
  const res = await fetch(\`\${API_BASE_URL}\${endpoint}\`);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

export async function post(endpoint, data) {
  const res = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export default { get, post };`,
        explanation: 'Enables consumers to import specific methods (`import { get }`) or the full client (`import client`).'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Adopt Template Literals',
        instruction: 'Replace all string concatenations (`"a" + "b"`) with backtick template literals (`` `a${b}` ``).',
        whyNecessary: 'Improves readability and eliminates quote escaping bugs.',
        codeSnippet: `const url = \`https://api.com/users/\${userId}\`;`
      },
      {
        step: 2,
        title: 'Organize Code into ES Modules',
        instruction: 'Use `export` and `import` across separate JavaScript files.',
        whyNecessary: 'Enables modular architecture and allows bundlers to tree-shake unused code.',
        codeSnippet: `import { calculateTax } from './tax.js';`
      },
      {
        step: 3,
        title: 'Use Spread for Shallow Copies',
        instruction: 'Use `{ ...state }` and `[ ...items ]` for state updates.',
        whyNecessary: 'Ensures immutability across data transformations.',
        codeSnippet: `const nextList = [...currentList, newItem];`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use ES Modules (`import`/`export`) exclusively in modern projects.',
        'Use destructuring in function parameter signatures.',
        'Use rest parameters (`...args`) instead of the deprecated `arguments` object.'
      ],
      structureRecommendations: [
        'Create barrel files (`index.js`) to re-export multiple utilities from a directory.'
      ],
      performanceConsiderations: [
        'Named exports enable build tools (Vite, Rollup) to tree-shake (remove) unused functions from production bundles.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Confusing Rest parameters with Spread operators.',
        howToAvoid: 'Rest gathers into an array in declarations; Spread unpacks from an array in expressions.',
        debuggingTip: 'Check if you are defining a parameter (Rest) or calling a function/array (Spread).'
      },
      {
        mistake: 'Mixing CommonJS (`require`/`module.exports`) with ES Modules (`import`/`export`) in browser code.',
        howToAvoid: 'Use ES Module `import`/`export` syntax consistently.',
        debuggingTip: 'Check console for `Uncaught ReferenceError: require is not defined`.'
      }
    ],
    projectApplications: [
      {
        domain: 'Modern Component Architectures',
        description: 'Importing React components, custom hooks, and shared CSS modules.'
      },
      {
        domain: 'Microservices & Full-Stack Tooling',
        description: 'Structuring Node.js / Express microservices using native ES modules.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Refactor a string concatenation greeting function to use template literals and default parameters.',
        'Write a function `combineArrays(...arrays)` that takes any number of arrays and returns a single merged array using spread.'
      ],
      codingChallenge: {
        prompt: 'Use array destructuring with rest syntax to extract the first two items of an array into `x` and `y`, and all remaining items into `others`.',
        hint: 'Use `const [x, y, ...others] = array;`.'
      },
      miniProjectIdea: {
        title: 'Modular Utility Library',
        description: 'Build a modular math & string utility package featuring separate files for math, string, and date formatters unified with an `index.js` barrel export.'
      }
    },
    summary: {
      keyPoints: [
        'ES6+ modernized JavaScript with template literals, destructuring, and modules.',
        'Rest parameters collect arguments; Spread operators expand collections.',
        'ES Modules enable clean separation of concerns and production tree-shaking.'
      ],
      skillsAcquired: [
        'Mastery of modern ES6+ language features.',
        'Proficiency in modular code architecture with `import` and `export`.',
        'Ability to write concise, expressive JavaScript.'
      ]
    },
    exercise: {
      question: 'Which syntax creates a new array combining elements of `arr1` and `arr2` using ES6 Spread?',
      options: ['const combined = [...arr1, ...arr2];', 'const combined = arr1 + arr2;', 'const combined = [arr1, arr2];', 'const combined = spread(arr1, arr2);'],
      answer: 'const combined = [...arr1, ...arr2];'
    },
    exam: {
      question: 'What is the primary architectural advantage of using ES Named Exports (`export const myFn`) over legacy CommonJS `module.exports`?',
      options: [
        'Named exports enable modern bundlers to perform tree-shaking, removing unused functions from production bundles to minimize file size',
        'Named exports run on the GPU',
        'Named exports automatically bypass CORS',
        'Named exports convert JavaScript into CSS'
      ],
      answer: 'Named exports enable modern bundlers to perform tree-shaking, removing unused functions from production bundles to minimize file size'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules'
  },

  'js-13': {
    id: 'js-13',
    title: 'Fetch API & HTTP Requests',
    category: 'JavaScript',
    diagramType: 'api-flow',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Modern Fetch API: GET and POST Requests
async function loadUserData() {
  try {
    console.log("Fetching live user from JSONPlaceholder API...");
    
    // 1. GET Request
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    
    // Check HTTP Status OK (200-299)
    if (!response.ok) {
      throw new Error(\`HTTP Error! Status: \${response.status}\`);
    }

    // Parse JSON stream
    const user = await response.json();
    console.log("✓ User Loaded:", user.name, \`(\${user.email})\`);
    console.log("Company:", user.company?.name);

  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}

loadUserData();`,
    overview: {
      what: 'The Fetch API is the modern browser interface for executing asynchronous HTTP network requests (GET, POST, PUT, DELETE, PATCH) to communicate with web servers, external REST APIs, and GraphQL endpoints.',
      why: 'Fetch is essential for modern dynamic web applications—allowing web pages to load data, submit forms, authenticate users, and update UI content seamlessly in the background without requiring full page reloads.',
      whereUsed: 'Universal across every single web application: fetching products, loading user feeds, executing search autocomplete, and syncing database changes.'
    },
    coreConcepts: [
      {
        title: 'The Fetch Lifecycle & Response Stream',
        explanation: '`fetch()` returns a Promise that resolves to a `Response` object representing the HTTP headers and stream. A second asynchronous step (`response.json()` or `response.text()`) is required to read and parse the payload body.',
        terms: [
          { term: 'fetch(url, options)', definition: 'Initiates HTTP network request.' },
          { term: 'response.ok', definition: 'Boolean true if HTTP status code is in the 200-299 success range.' },
          { term: 'response.status', definition: 'Numerical HTTP status code (200, 404, 500).' },
          { term: 'response.json()', definition: 'Asynchronously reads the body stream and parses it as JSON.' }
        ],
        relationship: '`fetch()` only rejects on catastrophic network failures (offline/DNS errors), NOT on HTTP 404 or 500 errors! You must check `if (!response.ok)` manually.'
      },
      {
        title: 'HTTP Methods & Request Configuration',
        explanation: 'The second argument to `fetch()` configures the HTTP method, headers, and request body payload.',
        terms: [
          { term: 'GET', definition: 'Retrieves data without modifying server state.' },
          { term: 'POST', definition: 'Transmits a new data payload (e.g. creating a record).' },
          { term: 'PUT / PATCH', definition: 'Replaces (PUT) or partially updates (PATCH) an existing record.' },
          { term: 'DELETE', definition: 'Removes a resource from the server.' }
        ],
        relationship: 'POST/PUT requests require `headers: { "Content-Type": "application/json" }` and `body: JSON.stringify(data)`.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Asynchronous Fetch Template
async function requestApi(url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer TOKEN"
    },
    body: JSON.stringify({ key: "value" })
  });

  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`);
  }

  return await response.json();
}`,
      breakdown: [
        { part: 'fetch(url, { method: "POST" })', meaning: 'Configures HTTP verb.' },
        { part: '"Content-Type": "application/json"', meaning: 'Informs server that payload is JSON formatted.' },
        { part: 'body: JSON.stringify(data)', meaning: 'Serializes JavaScript object into JSON text stream.' }
      ],
      conventions: [
        'Always check `if (!response.ok)` after fetching.',
        'Always wrap `fetch()` calls in `try/catch` blocks to handle offline network disconnects.',
        'Use `AbortController` to cancel pending fetch requests when components unmount.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Simple GET Request with Error Handling',
        description: 'Fetching a random advice slip from a public REST API.',
        code: `async function getAdvice() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    if (!res.ok) throw new Error("Server error: " + res.status);
    
    const data = await res.json();
    console.log("Daily Advice:", data.slip.advice);
  } catch (err) {
    console.error("Failed to load advice:", err.message);
  }
}

getAdvice();`,
        explanation: 'Clean, modern async/await GET request structure.'
      },
      {
        level: 'Intermediate',
        title: 'POST Request with JSON Payload',
        description: 'Creating a new post record on an API endpoint.',
        code: `async function createPost(newPostData) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPostData)
    });

    if (!res.ok) throw new Error(\`Failed to create post: \${res.status}\`);

    const createdRecord = await res.json();
    console.log("Created Record ID:", createdRecord.id);
    return createdRecord;
  } catch (error) {
    console.error("POST Error:", error);
  }
}

createPost({ title: "Mastering Fetch API", body: "Learn modern HTTP in JS.", userId: 1 });`,
        explanation: 'Sends a stringified JSON payload with proper headers.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Request Timeout and Cancellation with `AbortController`',
        description: 'Canceling a slow fetch request if it exceeds a 5-second timeout.',
        code: `async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(\`Request timed out after \${timeoutMs}ms\`);
    }
    throw error;
  }
}

fetchWithTimeout("https://jsonplaceholder.typicode.com/users/1", 3000)
  .then(user => console.log("Fetched with timeout safety:", user.name))
  .catch(err => console.error(err.message));`,
        explanation: 'Prevents hung network requests from freezing user interfaces.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Initiate the Fetch Call',
        instruction: 'Call `const response = await fetch(url, options);`.',
        whyNecessary: 'Starts the asynchronous network transport.',
        codeSnippet: `const res = await fetch('/api/data');`
      },
      {
        step: 2,
        title: 'Verify HTTP Status Code',
        instruction: 'Check `if (!response.ok) throw new Error(response.statusText);`.',
        whyNecessary: 'Fetch does NOT reject on 404 or 500 errors; manual validation is mandatory.',
        codeSnippet: `if (!res.ok) throw new Error('API Error: ' + res.status);`
      },
      {
        step: 3,
        title: 'Parse the Response Stream',
        instruction: 'Call `const data = await response.json();`.',
        whyNecessary: 'Reads the binary stream and deserializes JSON into JavaScript objects.',
        codeSnippet: `const data = await res.json();`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always check `response.ok` before attempting `response.json()`.',
        'Always serialize POST bodies with `JSON.stringify()` and set `"Content-Type": "application/json"`.',
        'Wrap all network calls in `try/catch`.'
      ],
      structureRecommendations: [
        'Centralize API calls into a dedicated `services/api.js` module rather than scattering raw `fetch` calls across UI components.'
      ],
      performanceConsiderations: [
        'Use caching strategies (`cache: "default"`, `cache: "no-store"`) and abort stale requests on search inputs.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Assuming `fetch()` rejects on HTTP 404 or 500 errors.',
        howToAvoid: 'Always check `if (!response.ok)` explicitly.',
        debuggingTip: 'Test fetching a non-existent URL (`/api/notfound`) and see if the catch block was skipped.'
      },
      {
        mistake: 'Passing a raw JavaScript object to `body` without `JSON.stringify(data)`.',
        howToAvoid: 'Always wrap objects in `JSON.stringify()`.',
        debuggingTip: 'Check if the backend receives `"[object Object]"` instead of JSON.'
      }
    ],
    projectApplications: [
      {
        domain: 'Data Hydration & API Integration',
        description: 'Loading user profiles, dashboard metrics, and products from backend microservices.'
      },
      {
        domain: 'Real-Time Search Autocomplete',
        description: 'Fetching matching keyword suggestions as the user types into search inputs.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Fetch a list of todos from `https://jsonplaceholder.typicode.com/todos` and log how many are completed.',
        'Write a function that sends a DELETE request to `/api/posts/1` and logs the status code.'
      ],
      codingChallenge: {
        prompt: 'Build a function `fetchUserPosts(userId)` that fetches a user and their posts in parallel using `Promise.all` and `fetch`.',
        hint: 'Use `await Promise.all([fetch(.../users/1), fetch(.../posts?userId=1)])`.'
      },
      miniProjectIdea: {
        title: 'Live Weather Dashboard',
        description: 'Build an application that queries the Open-Meteo API for coordinates and displays real-time weather forecasts.'
      }
    },
    summary: {
      keyPoints: [
        '`fetch()` performs asynchronous HTTP requests and returns a Response Promise.',
        'Must check `response.ok` manually because 404/500 errors do not reject the Promise.',
        'POST requests require `Content-Type: application/json` and `JSON.stringify(body)`.'
      ],
      skillsAcquired: [
        'Proficiency with the Fetch API for GET and POST requests.',
        'Mastery of HTTP status validation and error handling.',
        'Ability to cancel in-flight requests with `AbortController`.'
      ]
    },
    exercise: {
      question: 'What boolean property on a Fetch `Response` object indicates if the HTTP status code is in the successful 200–299 range?',
      options: ['response.ok', 'response.success', 'response.is200', 'response.valid'],
      answer: 'response.ok'
    },
    exam: {
      question: 'Why does `fetch()` NOT reject its Promise when a server returns a `404 Not Found` or `500 Internal Server Error`?',
      options: [
        '`fetch()` only rejects on catastrophic network-level failures (e.g. no internet, DNS lookup failed), treating any valid HTTP response as a resolved Promise',
        'It is a bug in modern browser engines',
        'Because 404 and 500 are considered successful statuses',
        'Because fetch runs synchronously'
      ],
      answer: '`fetch()` only rejects on catastrophic network-level failures (e.g. no internet, DNS lookup failed), treating any valid HTTP response as a resolved Promise'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'
  },

  'js-14': {
    id: 'js-14',
    title: 'Async/Await & Promises',
    category: 'JavaScript',
    diagramType: 'async-await',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Promises and Async/Await Mechanics
// 1. Simulating an asynchronous database query with a Promise
function fetchDatabaseRecord(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Alice Developer", role: "Architect" });
      } else {
        reject(new Error("Invalid record ID: ID must be positive"));
      }
    }, 150);
  });
}

// 2. Modern Async/Await Consumption with Try/Catch
async function displayUser(userId) {
  try {
    console.log("Querying record:", userId, "...");
    const user = await fetchDatabaseRecord(userId); // Pauses async function until resolved!
    console.log("✓ Record found:", user.name, "-", user.role);
    return user;
  } catch (error) {
    console.error("✗ Failed:", error.message);
  } finally {
    console.log("Operation finished.");
  }
}

// Testing success and failure
displayUser(42);
// displayUser(-1); // Uncomment to test error catch`,
    overview: {
      what: 'Promises are objects representing the eventual completion (or failure) of an asynchronous operation and its resulting value. `async/await` is modern syntactic sugar built on top of Promises that allows asynchronous code to be written in a clean, synchronous-looking style.',
      why: 'JavaScript is single-threaded. Async operations (network requests, database calls, file reading) must execute without blocking the main browser thread. Async/await completely eliminates "Callback Hell" and deeply nested `.then()` chains.',
      whereUsed: 'Universal: backend API services, database queries (MongoDB/PostgreSQL), client data fetching, file systems, and authentication flows.'
    },
    coreConcepts: [
      {
        title: 'Promise States & Lifecycle',
        explanation: 'A Promise exists in one of three mutually exclusive states: Pending, Fulfilled (resolved), or Rejected.',
        terms: [
          { term: 'Pending', definition: 'Initial state; asynchronous operation is currently in progress.' },
          { term: 'Fulfilled', definition: 'Operation completed successfully; `resolve(value)` was called.' },
          { term: 'Rejected', definition: 'Operation failed; `reject(error)` was called.' },
          { term: 'Settled', definition: 'The promise has either fulfilled or rejected (no longer pending).' }
        ],
        relationship: 'Once a Promise is settled, its state and value are permanently locked and cannot change.'
      },
      {
        title: '`async` and `await` Mechanics',
        explanation: 'Declaring a function `async` automatically wraps its return value in a Promise. The `await` keyword pauses execution of the `async` function until the Promise settles, unwrapping the resolved value directly.',
        terms: [
          { term: 'async keyword', definition: 'Guarantees the function returns a Promise.' },
          { term: 'await keyword', definition: 'Pauses async execution until the Promise resolves or rejects.' },
          { term: 'Promise.all([p1, p2])', definition: 'Executes multiple promises in parallel, resolving when all succeed or rejecting if any fail.' }
        ],
        relationship: '`await` can only be used inside `async` functions or at the top level of ES modules.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Async Function with Try / Catch / Finally
async function loadWorkflow() {
  try {
    const step1 = await asyncTaskOne();
    const step2 = await asyncTaskTwo(step1);
    return step2;
  } catch (error) {
    console.error("Workflow error:", error);
  } finally {
    console.log("Cleanup executed.");
  }
}`,
      breakdown: [
        { part: 'async function', meaning: 'Enables await within the function and wraps return value in a Promise.' },
        { part: 'await asyncTask()', meaning: 'Unwraps the resolved promise value synchronously in place.' }
      ],
      conventions: [
        'Always wrap `await` calls in `try/catch` blocks.',
        'Use `Promise.all()` for independent asynchronous tasks to run them concurrently in parallel.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Creating and Consuming a Delay Helper',
        description: 'Building a modern `sleep(ms)` delay function with Promises and `await`.',
        code: `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runCountdown() {
  console.log("Starting in 3...");
  await sleep(500);
  console.log("2...");
  await sleep(500);
  console.log("1...");
  await sleep(500);
  console.log("🚀 Launch!");
}

runCountdown();`,
        explanation: 'Replaces messy nested `setTimeout` callbacks with linear `await sleep()`.'
      },
      {
        level: 'Intermediate',
        title: 'Parallel Execution with `Promise.all`',
        description: 'Fetching users and products simultaneously to cut total load time in half.',
        code: `async function loadDashboardData() {
  console.time("ParallelFetch");

  // Run both requests concurrently in parallel!
  const [usersRes, postsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts")
  ]);

  const users = await usersRes.json();
  const posts = await postsRes.json();

  console.timeEnd("ParallelFetch");
  console.log(\`Loaded \${users.length} users and \${posts.length} posts concurrently!\`);
}

loadDashboardData();`,
        explanation: '`Promise.all` runs requests simultaneously instead of waiting sequentially.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Retry Mechanism with Exponential Backoff',
        description: 'Retrying a failed network request up to 3 times with increasing delays.',
        code: `async function fetchWithRetry(fn, retries = 3, delay = 300) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 1) throw error;
    console.log(\`Retrying in \${delay}ms... (\${retries - 1} attempts left)\`);
    await new Promise(r => setTimeout(r, delay));
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
}

// Test resilient fetch
fetchWithRetry(() => fetch("https://jsonplaceholder.typicode.com/todos/1").then(r => r.json()))
  .then(data => console.log("Resilient fetch completed:", data.title));`,
        explanation: 'Production resilience pattern for unstable network environments.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Add `async` to the Enclosing Function',
        instruction: 'Prefix your function with `async`.',
        whyNecessary: 'Allows the use of `await` inside the function body.',
        codeSnippet: `async function fetchData() { ... }`
      },
      {
        step: 2,
        title: 'Wrap in `try/catch/finally`',
        instruction: 'Place asynchronous `await` calls inside a `try` block.',
        whyNecessary: 'Intercepts rejected promises and network errors without crashing the script.',
        codeSnippet: `try {\n  const result = await apiCall();\n} catch (err) {\n  handleError(err);\n}`
      },
      {
        step: 3,
        title: 'Use `Promise.all` for Independent Parallel Tasks',
        instruction: 'If task B does not depend on task A, execute them together with `Promise.all([a(), b()])`.',
        whyNecessary: 'Drastically improves page load times by avoiding sequential request waterfalls.',
        codeSnippet: `const [a, b] = await Promise.all([getA(), getB()]);`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always handle errors with `try/catch` or `.catch()`.',
        'Use `Promise.all()` for concurrent operations.',
        'Use `Promise.allSettled()` if you want all promises to finish even if some fail.'
      ],
      structureRecommendations: [
        'Keep async functions focused on data orchestration and delegate rendering to pure functions.'
      ],
      performanceConsiderations: [
        'Avoid sequential `await` inside loops when items can be processed concurrently; use `await Promise.all(items.map(...))`.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using `await` sequentially inside a `for` loop when tasks are independent, creating slow request waterfalls.',
        howToAvoid: 'Use `await Promise.all(items.map(async item => ...))` for parallel processing.',
        debuggingTip: 'Check the Network tab waterfall to see if requests are running in parallel or serial.'
      },
      {
        mistake: 'Forgetting `await`, resulting in a variable holding a `Promise { <pending> }` instead of the actual data value.',
        howToAvoid: 'Ensure `await` prefixes the promise-returning function call.',
        debuggingTip: 'If your variable prints `[object Promise]`, you forgot `await`.'
      }
    ],
    projectApplications: [
      {
        domain: 'Database ORM Queries (Prisma, Mongoose)',
        description: 'Executing asynchronous CRUD operations against SQL and NoSQL databases.'
      },
      {
        domain: 'Authentication Handshakes (OAuth / JWT)',
        description: 'Sequentially verifying tokens, checking user permissions, and creating sessions.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Write an async function that queries an API and logs the result after waiting 1 second using a custom sleep helper.',
        'Compare the execution time of 3 sequential `await` requests vs running them with `Promise.all`.'
      ],
      codingChallenge: {
        prompt: 'Create a function `loadFastest(url1, url2)` that uses `Promise.race()` to return the data from whichever endpoint responds first.',
        hint: 'Use `await Promise.race([fetch(url1), fetch(url2)])`.'
      },
      miniProjectIdea: {
        title: 'Parallel Crypto Price Tracker',
        description: 'Build a dashboard that fetches prices for Bitcoin, Ethereum, and Solana simultaneously using `Promise.all` and updates a live table.'
      }
    },
    summary: {
      keyPoints: [
        'Promises represent eventual async completion in Pending, Fulfilled, or Rejected states.',
        '`async/await` enables clean, readable synchronous-style asynchronous programming.',
        '`Promise.all()` runs independent asynchronous operations concurrently in parallel.'
      ],
      skillsAcquired: [
        'Mastery of Promises and `async/await` syntax.',
        'Proficiency in asynchronous error handling with `try/catch`.',
        'Ability to optimize performance with `Promise.all` and `Promise.allSettled`.'
      ]
    },
    exercise: {
      question: 'What does an `async` function always return in JavaScript?',
      options: ['A Promise', 'An Array', 'A Callback', 'Undefined'],
      answer: 'A Promise'
    },
    exam: {
      question: 'What is the performance advantage of using `Promise.all([fetchA(), fetchB()])` over `await fetchA(); await fetchB();`?',
      options: [
        '`Promise.all` executes both network requests concurrently in parallel, cutting total waiting time in half compared to sequential execution',
        '`Promise.all` encrypts the requests',
        '`Promise.all` disables browser cache',
        'There is no performance difference'
      ],
      answer: '`Promise.all` executes both network requests concurrently in parallel, cutting total waiting time in half compared to sequential execution'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises'
  },

  'js-15': {
    id: 'js-15',
    title: 'JSON & Data Serialization',
    category: 'JavaScript',
    diagramType: 'json-flow',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// JSON Serialization & Deserialization Playground
const userObject = {
  id: 101,
  username: "marcus_dev",
  skills: ["JavaScript", "Node.js", "React"],
  isActive: true,
  createdAt: new Date().toISOString()
};

console.log("1. Original JavaScript Object:", userObject);

// 2. JSON.stringify: Convert JS Object -> JSON String
const jsonString = JSON.stringify(userObject, null, 2); // 2 spaces indentation
console.log("2. Serialized JSON String (Text):\\n" + jsonString);

// 3. JSON.parse: Convert JSON String -> JS Object
const parsedObject = JSON.parse(jsonString);
console.log("3. Deserialized Object:", parsedObject.username);
console.log("Skills Count:", parsedObject.skills.length);

// 4. Storing in localStorage
try {
  localStorage.setItem("session_user", jsonString);
  const cachedUser = JSON.parse(localStorage.getItem("session_user"));
  console.log("✓ Stored and retrieved from localStorage:", cachedUser.username);
} catch (e) {
  console.log("localStorage demo complete.");
}`,
    overview: {
      what: 'JSON (JavaScript Object Notation) is a lightweight, language-independent, text-based data interchange format used to structure and transmit data between web clients, servers, and databases.',
      why: 'Computers cannot transmit raw memory pointers or JavaScript object instances across networks. JSON serializes objects into standardized text streams that any programming language (Python, Java, Go, C#, PHP) can parse and understand.',
      whereUsed: 'Universal standard for web APIs (REST/GraphQL), configuration files (`package.json`, `tsconfig.json`), browser storage (`localStorage`), and NoSQL document databases (MongoDB).'
    },
    coreConcepts: [
      {
        title: '`JSON.stringify()` vs `JSON.parse()`',
        explanation: '`JSON.stringify()` serializes a JavaScript value into a JSON text string. `JSON.parse()` deserializes a JSON text string into a native JavaScript object or array.',
        terms: [
          { term: 'JSON.stringify(value, replacer, space)', definition: 'Serializes JS Object -> JSON String.' },
          { term: 'JSON.parse(text, reviver)', definition: 'Deserializes JSON String -> JS Object.' },
          { term: 'Serialization', definition: 'Translating in-memory data structures into a storable/transmittable format.' },
          { term: 'Deserialization', definition: 'Reconstructing in-memory data structures from a text format.' }
        ],
        relationship: '`stringify` turns data into text to send over HTTP or save to storage; `parse` turns text back into live objects.'
      },
      {
        title: 'JSON Syntax Rules vs JavaScript Object Literals',
        explanation: 'JSON is strictly formatted text, whereas JavaScript object literals are flexible source code.',
        terms: [
          { term: 'Double Quotes Required', definition: 'In JSON, all keys and string values MUST be wrapped in double quotes (`"key": "val"`).' },
          { term: 'No Trailing Commas', definition: 'Trailing commas after the last item are illegal in valid JSON.' },
          { term: 'Unsupported Types', definition: 'Functions, `undefined`, and Symbols are omitted during serialization; Dates are converted to ISO strings.' }
        ],
        relationship: 'Valid JSON is valid JavaScript syntax, but NOT all JavaScript objects can be converted directly into JSON.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Valid JSON String Format (Strict double quotes, no trailing commas):
{
  "name": "Alex",
  "age": 28,
  "isVerified": true,
  "roles": ["admin", "editor"]
}

// Serialization
const jsonText = JSON.stringify(object);

// Deserialization with Safety
try {
  const obj = JSON.parse(jsonText);
} catch (err) {
  console.error("Malformed JSON:", err.message);
}`,
      breakdown: [
        { part: 'JSON.stringify(obj, null, 2)', meaning: 'Formats JSON with 2-space indentation for human readability.' },
        { part: 'JSON.parse(string)', meaning: 'Constructs JavaScript object from JSON text string.' }
      ],
      conventions: [
        'Always wrap `JSON.parse()` in a `try/catch` block to guard against malformed JSON syntax errors.',
        'Use double quotes exclusively in JSON files.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Formatting JSON for Readable Logs',
        description: 'Pretty-printing objects with indentations.',
        code: `const config = { host: "localhost", port: 8080, debug: true };
const prettyJson = JSON.stringify(config, null, 2);
console.log(prettyJson);`,
        explanation: 'The third argument `2` formats the output with 2-space indentation.'
      },
      {
        level: 'Intermediate',
        title: 'Persisting State in `localStorage`',
        description: 'Saving and retrieving complex objects from browser persistent storage.',
        code: `function saveSettings(settings) {
  localStorage.setItem("user_theme_settings", JSON.stringify(settings));
}

function loadSettings() {
  const raw = localStorage.getItem("user_theme_settings");
  if (!raw) return { theme: "light", fontSize: 14 }; // Default fallback
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Corrupted localStorage data, returning defaults.");
    return { theme: "light", fontSize: 14 };
  }
}

saveSettings({ theme: "dark", fontSize: 16 });
console.log("Loaded:", loadSettings());`,
        explanation: '`localStorage` only stores strings; JSON serialization allows saving rich objects.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Deep Cloning with `structuredClone` vs JSON',
        description: 'Understanding deep cloning options in modern JavaScript.',
        code: `const original = {
  user: "Maria",
  stats: { views: 100, likes: 25 }
};

// Modern Standard: structuredClone (Preserves Dates, Maps, Sets, RegExps)
const modernClone = structuredClone(original);
modernClone.stats.views = 200;

console.log("Original views:", original.stats.views); // 100 (Unmutated!)
console.log("Clone views:", modernClone.stats.views);   // 200`,
        explanation: '`structuredClone()` is the modern native replacement for the old `JSON.parse(JSON.stringify(obj))` hack.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Serialize Data for Transport',
        instruction: 'Use `JSON.stringify(payload)` before saving to storage or sending in request bodies.',
        whyNecessary: 'Converts object references into transferable text strings.',
        codeSnippet: `const body = JSON.stringify(payload);`
      },
      {
        step: 2,
        title: 'Parse Received Data with `try/catch`',
        instruction: 'Always enclose `JSON.parse(text)` in a `try/catch` block.',
        whyNecessary: 'Malformed JSON throws a fatal `SyntaxError` if not caught.',
        codeSnippet: `try { const data = JSON.parse(text); } catch (e) { ... }`
      },
      {
        step: 3,
        title: 'Inspect Supported Types',
        instruction: 'Ensure your objects do not rely on functions or undefined values during serialization.',
        whyNecessary: '`JSON.stringify` drops `undefined` properties and function definitions silently.',
        codeSnippet: `const clean = { name: 'Item', price: 20 };`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always wrap `JSON.parse()` in a `try/catch` block.',
        'Use `structuredClone()` instead of `JSON.parse(JSON.stringify())` for deep cloning.',
        'Use double quotes for keys and strings in JSON files.'
      ],
      structureRecommendations: [
        'Keep JSON schemas versioned in API architectures (`"version": 1`).'
      ],
      performanceConsiderations: [
        'V8’s `JSON.parse()` parser is faster than standard JS object parsing for large static configuration files.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using single quotes in JSON (`{\'name\': \'Alex\'}`).',
        howToAvoid: 'JSON strictly requires double quotes (`{"name": "Alex"}`).',
        debuggingTip: 'Check for `SyntaxError: Unexpected token \' in JSON`.'
      },
      {
        mistake: 'Passing a function or `undefined` to `JSON.stringify` expecting it to serialize.',
        howToAvoid: 'Functions and `undefined` are omitted from JSON objects and converted to `null` in arrays.',
        debuggingTip: 'Verify if object properties vanished after stringification.'
      }
    ],
    projectApplications: [
      {
        domain: 'RESTful Web APIs',
        description: 'Serializing JSON response payloads between backend servers and frontend clients.'
      },
      {
        domain: 'Application Configuration',
        description: 'Defining build dependencies in `package.json` and compiler settings in `tsconfig.json`.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Convert a complex nested JavaScript object with arrays into pretty-printed JSON with 2-space indentation.',
        'Write a safe `safeJsonParse(str, fallback)` helper function that returns `fallback` if parsing fails.'
      ],
      codingChallenge: {
        prompt: 'Build a validator function `isValidJson(str)` that returns true if a string is valid JSON and false otherwise without throwing errors.',
        hint: 'Use `try { JSON.parse(str); return true; } catch { return false; }`.'
      },
      miniProjectIdea: {
        title: 'JSON Formatter & Validator Tool',
        description: 'Build an interactive web tool where users paste raw JSON text, see syntax validation errors highlighted, and format it with 2 or 4 space indentation.'
      }
    },
    summary: {
      keyPoints: [
        'JSON is the universal text format for cross-platform data interchange.',
        '`JSON.stringify()` serializes objects to text; `JSON.parse()` deserializes text to objects.',
        'Always wrap `JSON.parse()` in `try/catch` to handle malformed data gracefully.'
      ],
      skillsAcquired: [
        'Proficiency in JSON serialization and deserialization.',
        'Mastery of error-resilient data parsing.',
        'Understanding of JSON syntax rules and data interchange protocols.'
      ]
    },
    exercise: {
      question: 'Which method converts a JSON-formatted string into a live JavaScript object?',
      options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'Object.fromJSON()'],
      answer: 'JSON.parse()'
    },
    exam: {
      question: 'Why does calling `JSON.parse()` on an invalid or malformed JSON string require a `try/catch` block?',
      options: [
        '`JSON.parse()` throws a fatal `SyntaxError` exception when given invalid JSON, which would crash the application if unhandled',
        '`JSON.parse()` is an asynchronous function requiring a Promise catch',
        '`JSON.parse()` automatically deletes the database',
        'It is not required; JSON.parse returns false on errors'
      ],
      answer: '`JSON.parse()` throws a fatal `SyntaxError` exception when given invalid JSON, which would crash the application if unhandled'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON'
  }
};
