export const HTML_CURRICULUM = {
  'html-1': {
    id: 'html-1',
    title: 'HTML Basics & Emmet',
    category: 'HTML',
    diagramType: 'html-tree',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- Complete HTML5 Starter Template -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
</head>
<body style="font-family: system-ui, sans-serif; padding: 20px; line-height: 1.6; color: #1e293b;">
  <header>
    <h1 style="color: #4338ca; margin-bottom: 8px;">Mastering HTML5 & Emmet</h1>
    <p style="color: #64748b;">The foundational building blocks of the modern web.</p>
  </header>

  <main style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
    <h2>Why Structure Matters</h2>
    <p>HTML provides the <strong>skeleton</strong> that browsers convert into visual DOM nodes.</p>
    <button onclick="alert('HTML event triggered!')" style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
      Click Me
    </button>
  </main>
</body>
</html>`,
    overview: {
      what: 'HTML (HyperText Markup Language) is the standard markup language used to structure content on the World Wide Web. Emmet is a developer productivity toolkit built into modern code editors that allows developers to generate repetitive HTML boilerplate rapidly using CSS-like shorthand abbreviations.',
      why: 'HTML is the foundational layer of every single web application. Without HTML, browsers cannot interpret text hierarchy, embed multimedia, render forms, or provide accessibility landmarks for screen readers. Emmet drastically accelerates authoring speed, reducing development time by up to 70%.',
      whereUsed: 'Used across all web platforms—from simple static landing pages to complex Single Page Applications (SPAs) built with React, Vue, or Angular, where JSX/templates compile into valid HTML elements in the browser DOM.'
    },
    coreConcepts: [
      {
        title: 'DOM Tree Hierarchy & Nesting',
        explanation: 'Web browsers parse HTML documents sequentially from top to bottom, transforming tags into a hierarchical tree of nodes known as the Document Object Model (DOM). Every HTML document consists of ancestor (parent) elements that contain descendant (child) elements.',
        terms: [
          { term: '<!DOCTYPE html>', definition: 'Document type declaration instructing the browser engine to render the document in modern HTML5 standards mode.' },
          { term: '<html>', definition: 'The root element wrapping all content and metadata on the entire page.' },
          { term: '<head>', definition: 'Container for document metadata (charset, title, viewport, linked stylesheets, and scripts) that are invisible to the user.' },
          { term: '<body>', definition: 'The container for all visible elements rendered in the browser viewport (headers, paragraphs, images, buttons).' }
        ],
        relationship: 'The <!DOCTYPE> tells the browser how to parse; <html> acts as the root container; <head> supplies configuration/metadata; and <body> delivers the interactive, visual interface to users.'
      },
      {
        title: 'Elements vs. Tags vs. Attributes',
        explanation: 'An HTML element is the complete unit composed of an opening tag, optional attributes (key-value pairs configuring behavior or styling), the enclosed inner content, and a closing tag.',
        terms: [
          { term: 'Tag', definition: 'The markup syntax enclosed in angle brackets, such as <p> (opening) and </p> (closing).' },
          { term: 'Self-Closing Tags', definition: 'Void elements that do not wrap content and do not have closing tags, such as <img />, <input />, <br>, and <meta>.' },
          { term: 'Attributes', definition: 'Modifiers placed inside opening tags (e.g. href="...", class="...", id="...") that provide extra instructions or identification.' }
        ],
        relationship: 'Attributes live inside opening tags; opening and closing tags define the boundary of an element; elements nest within each other to form the page structure.'
      }
    ],
    syntaxStructure: {
      generalStructure: `<!-- Tag Anatomy: <tagname attribute="value">Content</tagname> -->
<element class="example-class" id="unique-id">
  Enclosed textual content or child elements
</element>`,
      breakdown: [
        { part: '<element', meaning: 'The opening tag specifying the semantic type of HTML element to create.' },
        { part: 'class="example-class"', meaning: 'Reusable identifier for grouping and styling multiple elements via CSS.' },
        { part: 'id="unique-id"', meaning: 'Unique identifier per document, used for anchor links, JavaScript targeting, and accessibility.' },
        { part: '>Content</element>', meaning: 'The inner payload followed by the closing tag with a forward slash.' }
      ],
      conventions: [
        'Always write tag names and attribute names in lowercase (e.g. <section>, not <SECTION>).',
        'Always wrap attribute values in double quotes.',
        'Always declare the utf-8 character set and responsive viewport meta tags inside <head>.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Basic Document Boilerplate',
        description: 'The minimal valid HTML5 skeleton required for standard browser rendering.',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic Starter</title>
</head>
<body>
  <h1>Welcome to Web Development</h1>
  <p>HTML elements provide the structure for web content.</p>
</body>
</html>`,
        explanation: 'The lang="en" attribute enables accessibility screen readers to use English pronunciation, while viewport ensures proper scaling on mobile phones.'
      },
      {
        level: 'Intermediate',
        title: 'Emmet Shorthand Expansion',
        description: 'Generating a complex navigation bar and card list in one single keystroke.',
        code: `<!-- Type this Emmet expression in VS Code and press Tab: -->
<!-- nav.navbar>div.logo+ul.nav-links>li.item*3>a[href="#"]{Link $} -->

<!-- Expands automatically to: -->
<nav class="navbar">
  <div class="logo"></div>
  <ul class="nav-links">
    <li class="item"><a href="#">Link 1</a></li>
    <li class="item"><a href="#">Link 2</a></li>
    <li class="item"><a href="#">Link 3</a></li>
  </ul>
</nav>`,
        explanation: '> indicates child nesting, + indicates sibling elements, *3 repeats elements 3 times, and $ increments number variables (1, 2, 3).'
      },
      {
        level: 'Real-World Use Case',
        title: 'Hero Banner Component',
        description: 'A responsive marketing hero section combining headings, paragraphs, and call-to-action buttons.',
        code: `<section class="hero-banner">
  <div class="hero-content">
    <span class="badge">New Release v2.0</span>
    <h1 class="hero-title">Build Fast, Modern Web Apps</h1>
    <p class="hero-desc">
      Accelerate your coding journey with interactive roadmaps, live code playgrounds, and structured quizzes.
    </p>
    <div class="hero-actions">
      <a href="#get-started" class="btn btn-primary">Get Started Free</a>
      <a href="#learn-more" class="btn btn-secondary">Documentation</a>
    </div>
  </div>
</section>`,
        explanation: 'Combines structural wrapper containers with descriptive classes ready for modular CSS styling.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Create Your HTML File',
        instruction: 'Create a new file named `index.html` in your project folder. The name `index.html` is the default root document served by web servers.',
        whyNecessary: 'Web servers look for `index.html` automatically when someone visits your domain or local directory.',
        codeSnippet: `touch index.html`
      },
      {
        step: 2,
        title: 'Expand the HTML5 Boilerplate',
        instruction: 'In your code editor (like VS Code), type `!` or `html:5` and press `Tab` or `Enter`.',
        whyNecessary: 'Emmet immediately creates the required DOCTYPE, html, head, viewport meta, and body tags without manual typing.',
        codeSnippet: `! [Press Tab]`
      },
      {
        step: 3,
        title: 'Add Headings and Text Content',
        instruction: 'Place one single `<h1>` tag inside the `<body>` for your primary page title, followed by `<h2>` tags for sub-sections and `<p>` tags for content paragraphs.',
        whyNecessary: 'Screen readers and search engine crawlers rely on proper heading hierarchy (h1 -> h2 -> h3) to understand the document topic.',
        codeSnippet: `<h1>Roadmap Tracker</h1>\n<h2>Module 1: HTML Fundamentals</h2>\n<p>HTML provides semantic structure.</p>`
      },
      {
        step: 4,
        title: 'Preview in Your Web Browser',
        instruction: 'Open `index.html` in your web browser (Chrome, Edge, Firefox, or Safari) by double clicking the file or using the VS Code Live Server extension.',
        whyNecessary: 'Validates that the browser parses all tags correctly without unclosed tag rendering bugs.',
        codeSnippet: `# Using Live Server or double clicking index.html`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always include an accurate `<title>` and `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.',
        'Use only one `<h1>` per page representing the principal page topic.',
        'Always specify the `alt` attribute for all `<img>` elements for accessibility and screen readers.'
      ],
      structureRecommendations: [
        'Organize content hierarchically: `<header>`, `<main>`, and `<footer>`.',
        'Indent nested child elements by 2 or 4 spaces consistently.',
        'Group stylesheets inside `<head>` and defer non-critical scripts before `</body>`.'
      ],
      performanceConsiderations: [
        'Keep the DOM tree shallow; avoid unnecessary nested `<div>` wrappers (often called "div soup").',
        'Add `loading="lazy"` to offscreen images to speed up initial page load time.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Skipping heading levels (e.g., using `<h1>` followed immediately by `<h4>`).',
        howToAvoid: 'Always step down headings sequentially (h1 -> h2 -> h3). Do not choose heading tags for their visual font size; use CSS for sizing.',
        debuggingTip: 'Inspect the document outline or run an accessibility audit via Chrome DevTools Lighthouse.'
      },
      {
        mistake: 'Leaving paired tags unclosed (e.g. `<p>Hello without closing tag`).',
        howToAvoid: 'Use editor linters or Emmet auto-closing tags to ensure every opening tag has its matching closing counterpart.',
        debuggingTip: 'Check the browser Elements inspector; browsers will attempt to guess missing closing tags, often causing unexpected layout shifts.'
      },
      {
        mistake: 'Using inline styling (`style="..."`) across all elements instead of external stylesheets.',
        howToAvoid: 'Keep structure (HTML) and presentation (CSS) separated into external stylesheets.',
        debuggingTip: 'Extract inline styles into dedicated class names in a `.css` file.'
      }
    ],
    projectApplications: [
      {
        domain: 'Landing Pages & Marketing Sites',
        description: 'Structuring high-converting hero sections, feature grids, pricing tables, and customer testimonials.'
      },
      {
        domain: 'Full-Stack Web Applications (React, Next.js, Node)',
        description: 'Providing the underlying semantic elements rendered by modern frontend component libraries and SSR templates.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a personal profile card containing your name in an `<h1>`, a subtitle in `<h2>`, a paragraph bio, and a link to your GitHub.',
        'Use Emmet shorthand to generate a 5-item ordered list with links inside a `<nav>` container in under 5 seconds.'
      ],
      codingChallenge: {
        prompt: 'Construct a recipe card with an article container, header with recipe title, an unordered list for ingredients, and an ordered list for preparation steps.',
        hint: 'Use `<article>`, `<header>`, `<ul>` with `<li>` for ingredients, and `<ol>` with `<li>` for ordered instructions.'
      },
      miniProjectIdea: {
        title: 'Developer Portfolio Boilerplate',
        description: 'Build a multi-section HTML skeleton featuring Header/Nav, About Me, Skills, Projects Showcase, and Footer with social media links.'
      }
    },
    summary: {
      keyPoints: [
        'HTML provides the structural skeleton of the web through elements, tags, and attributes.',
        'The DOM is a hierarchical tree of nodes rendered sequentially by the browser engine.',
        'Emmet shorthand enables rapid writing of clean, consistent HTML structures.'
      ],
      skillsAcquired: [
        'Ability to scaffold standard HTML5 document templates from scratch.',
        'Proficiency in Emmet syntax shortcuts for rapid UI authoring.',
        'Understanding of DOM tree nesting, element anatomy, and semantic hierarchy.'
      ]
    },
    exercise: {
      question: 'Which element represents the top-level main heading of a web page document?',
      options: ['<h1>', '<p>', '<main>', '<title>'],
      answer: '<h1>'
    },
    exam: {
      question: 'Where should document metadata such as character set, viewport config, and linked stylesheets be placed?',
      options: ['<head>', '<body>', '<meta-box>', '<footer>'],
      answer: '<head>'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content'
  },

  'html-2': {
    id: 'html-2',
    title: 'Forms & Validations',
    category: 'HTML',
    diagramType: 'form-flow',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<form onsubmit="event.preventDefault(); document.getElementById('status').innerText = '✓ Validated and submitted: ' + userEmail.value;" style="max-width: 360px; font-family: system-ui, sans-serif; display: grid; gap: 12px;">
  <label style="display: grid; gap: 4px; font-size: 13px; font-weight: 600; color: #334155;">
    Full Name (Required):
    <input id="userName" type="text" required minlength="2" placeholder="Alex Rivera" style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px;" />
  </label>

  <label style="display: grid; gap: 4px; font-size: 13px; font-weight: 600; color: #334155;">
    Email Address:
    <input id="userEmail" type="email" required placeholder="alex@example.com" style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px;" />
  </label>

  <label style="display: grid; gap: 4px; font-size: 13px; font-weight: 600; color: #334155;">
    Password (Min 8 characters):
    <input id="userPass" type="password" required minlength="8" placeholder="••••••••" style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px;" />
  </label>

  <button type="submit" style="background: #10b981; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer;">
    Create Account
  </button>
  <p id="status" style="color: #059669; font-weight: 600; font-size: 13px; margin: 0;"></p>
</form>`,
    overview: {
      what: 'HTML Forms are interactive document regions containing controls (inputs, textareas, checkboxes, radio buttons, select dropdowns) designed to capture user data, validate input constraints natively, and submit the payload to servers.',
      why: 'Forms are the primary interactive communication channel between users and web applications—powering authentication, search bars, checkout systems, account settings, and contact workflows. Built-in HTML5 validation ensures invalid inputs are intercepted immediately on the client side before triggering network requests.',
      whereUsed: 'Ubiquitous across all web applications: e-commerce checkouts (Amazon, Shopify), login and signup flows (GitHub, Google), search bars, customer feedback forms, and data collection dashboards.'
    },
    coreConcepts: [
      {
        title: 'Form Submission Lifecycle',
        explanation: 'When a user submits a form, the browser packages input values into key-value pairs matching each input\'s `name` attribute, then issues an HTTP request (GET or POST) to the URL defined in the form\'s `action` attribute.',
        terms: [
          { term: '<form action="..." method="...">', definition: 'The wrapper element defining where and how (GET/POST) input data is transmitted.' },
          { term: 'name attribute', definition: 'The unique key identifier required on every input for its value to be included in the submission payload.' },
          { term: '<label for="id">', definition: 'Associates descriptive text with an input field, expanding clickable hit areas and enabling screen readers.' }
        ],
        relationship: 'The `<form>` provides submission parameters; `<label>` links human-readable titles to fields; and `name` attributes define payload keys for server consumption.'
      },
      {
        title: 'Native HTML5 Validation Constraints',
        explanation: 'Browsers evaluate built-in validation attributes automatically during form submission, blocking invalid payloads and presenting native error tooltips without requiring external JavaScript.',
        terms: [
          { term: 'required', definition: 'Specifies that an input field must not be submitted empty.' },
          { term: 'type="email" / type="url"', definition: 'Enforces proper string formatting according to standard email/URL regex patterns.' },
          { term: 'minlength / maxlength', definition: 'Constrains string character count boundaries.' },
          { term: 'pattern="[0-9]{5}"', definition: 'Evaluates the input value against a custom Regular Expression pattern before submission.' }
        ],
        relationship: 'Validation attributes define constraints; the browser checks constraint validity on submit; if any field is invalid, submission is halted and feedback is shown.'
      }
    ],
    syntaxStructure: {
      generalStructure: `<form action="/api/submit" method="POST">
  <div class="form-group">
    <label for="email-field">Email Address</label>
    <input type="email" id="email-field" name="user_email" required placeholder="user@domain.com">
  </div>
  <button type="submit">Submit</button>
</form>`,
      breakdown: [
        { part: '<form action="/api/submit" method="POST">', meaning: 'Defines the HTTP POST target endpoint for the form submission.' },
        { part: '<label for="email-field">', meaning: 'Binds this label to the input with matching id="email-field".' },
        { part: 'name="user_email"', meaning: 'The key name that the backend server will receive in req.body.user_email.' },
        { part: 'required', meaning: 'Prevents form submission if this input is left empty.' }
      ],
      conventions: [
        'Always pair `<label for="id">` with `<input id="...">` for full accessibility compliance.',
        'Use appropriate `type` attributes (e.g. `type="tel"`, `type="number"`, `type="email"`) to trigger tailored mobile software keyboards.',
        'Always provide a `<button type="submit">` inside the form rather than relying solely on Enter key presses.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Contact Form with Basic Validation',
        description: 'A clean contact form capturing name, email, and multiline message with required field enforcement.',
        code: `<form action="/contact" method="POST">
  <div>
    <label for="fullName">Name:</label>
    <input type="text" id="fullName" name="fullName" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
  </div>
  <button type="submit">Send Message</button>
</form>`,
        explanation: 'Simple, accessible form structure with HTML5 required checks on all inputs.'
      },
      {
        level: 'Intermediate',
        title: 'Custom Regex Pattern & Range Inputs',
        description: 'Validating US Zip Codes using regex pattern matching and numerical sliders.',
        code: `<form>
  <label for="zip">US Zip Code (5 digits):</label>
  <input type="text" id="zip" name="zip" pattern="[0-9]{5}" title="Five digit ZIP code" required>

  <label for="budget">Project Budget ($1,000 - $10,000):</label>
  <input type="range" id="budget" name="budget" min="1000" max="10000" step="500" value="5000">

  <button type="submit">Validate</button>
</form>`,
        explanation: 'The pattern attribute checks against regex `^[0-9]{5}$` and displays the `title` message if validation fails.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Secure User Registration Form',
        description: 'Complete registration form with password strength rules, terms checkbox, and autocomplete hints.',
        code: `<form action="/api/register" method="POST" autocomplete="on">
  <h2>Create Your Account</h2>
  
  <label for="reg-email">Work Email</label>
  <input type="email" id="reg-email" name="email" autocomplete="email" required>

  <label for="reg-pass">Password (Min 8 chars, 1 number)</label>
  <input type="password" id="reg-pass" name="password" autocomplete="new-password" minlength="8" pattern="(?=.*\\d).{8,}" required>

  <div class="checkbox-row">
    <input type="checkbox" id="terms" name="agree_terms" required>
    <label for="terms">I accept the Terms and Conditions</label>
  </div>

  <button type="submit">Register Account</button>
</form>`,
        explanation: 'Uses autocomplete attributes for password manager integration and regex lookahead for password complexity.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Define the Form Wrapper',
        instruction: 'Create a `<form>` element and specify the `method` (GET for searches, POST for mutations) and destination `action`.',
        whyNecessary: 'Groups child input elements and defines the HTTP transport protocol.',
        codeSnippet: `<form action="/submit" method="POST">`
      },
      {
        step: 2,
        title: 'Add Labeled Input Fields',
        instruction: 'Wrap or pair every input with a `<label>`. Specify the matching `id` and assign a unique `name` attribute.',
        whyNecessary: 'Without `name`, input data will not be transmitted in the HTTP request payload.',
        codeSnippet: `<label for="email">Email</label>\n<input type="email" id="email" name="email" required>`
      },
      {
        step: 3,
        title: 'Configure Validation Constraints',
        instruction: 'Add `required`, `minlength`, `maxlength`, or `pattern` attributes according to your business requirements.',
        whyNecessary: 'Intercepts erroneous input immediately on the client before network transmission.',
        codeSnippet: `<input type="text" name="username" minlength="3" maxlength="20" required>`
      },
      {
        step: 4,
        title: 'Include Submit Trigger',
        instruction: 'Add a `<button type="submit">Submit</button>` inside the form.',
        whyNecessary: 'Allows users to trigger validation and submission via both mouse clicks and keyboard Enter.',
        codeSnippet: `<button type="submit">Submit</button>`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always implement dual validation: HTML5 client-side checks for user feedback + strict server-side validation for security.',
        'Always assign `name` attributes to every input; never rely solely on `id`.',
        'Add `autocomplete` attributes (`name`, `email`, `current-password`, `new-password`) to assist browser auto-fill.'
      ],
      structureRecommendations: [
        'Group related fields logically using `<fieldset>` and `<legend>` for complex forms (e.g. Billing vs Shipping address).',
        'Provide clear, visible error messages next to the offending input fields.'
      ],
      performanceConsiderations: [
        'Use native HTML validation before downloading heavy third-party JavaScript validation libraries.',
        'Disable submit buttons upon submission to prevent duplicate concurrent API calls.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Omitting the `name` attribute on input fields.',
        howToAvoid: 'Always specify `name="fieldName"`. Without it, browsers silently drop the field value during submission.',
        debuggingTip: 'Check the Network tab in DevTools; verify form payload payload keys in the Request Headers.'
      },
      {
        mistake: 'Relying exclusively on client-side HTML validation for security.',
        howToAvoid: 'Always re-validate and sanitize all inputs on the backend server; client validation can easily be bypassed with curl or DevTools.',
        debuggingTip: 'Test API endpoints directly using Postman or curl to ensure backend rejection of malformed data.'
      },
      {
        mistake: 'Using a `<div>` with an onclick handler instead of a `<button type="submit">`.',
        howToAvoid: 'Always use semantic `<button type="submit">` so the form responds natively to keyboard submission (Enter key).',
        debuggingTip: 'Try navigating and submitting the form using only the Tab and Enter keys.'
      }
    ],
    projectApplications: [
      {
        domain: 'Authentication & Security Systems',
        description: 'Login, registration, password reset, and multi-factor authentication (MFA) input screens.'
      },
      {
        domain: 'E-Commerce & SaaS Checkouts',
        description: 'Multi-step checkout wizards, credit card billing fields, and address verification forms.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build a newsletter subscription form containing an email input that requires valid email formatting and a submit button.',
        'Create a reservation form with `type="date"`, `type="time"`, `type="number"` (guests between 1 and 8), and a table preference dropdown.'
      ],
      codingChallenge: {
        prompt: 'Create a password setup form with two password fields (password and confirm password) that enforces a minimum of 8 characters.',
        hint: 'Use `<input type="password" minlength="8" required>` and a submit handler that checks for field matching.'
      },
      miniProjectIdea: {
        title: 'Interactive Survey Builder',
        description: 'Develop a comprehensive multi-question feedback form utilizing text inputs, radios, checkboxes, range sliders, and dropdown selects.'
      }
    },
    summary: {
      keyPoints: [
        'HTML forms capture user data and submit structured key-value payloads to servers.',
        'Native HTML5 attributes (required, pattern, minlength) provide instant client validation.',
        'Labels, names, and submit buttons are essential for accessibility, backend parsing, and UX.'
      ],
      skillsAcquired: [
        'Ability to create robust, accessible HTML form interfaces.',
        'Skill in configuring native HTML5 validation constraints and regex patterns.',
        'Deep understanding of form submission lifecycles and HTTP methods.'
      ]
    },
    exercise: {
      question: 'Which attribute is required on an input so that its value is submitted in the HTTP form payload?',
      options: ['name', 'id', 'class', 'placeholder'],
      answer: 'name'
    },
    exam: {
      question: 'Which HTML element connects descriptive text to an input field for screen reader accessibility?',
      options: ['<label>', '<span>', '<legend>', '<p>'],
      answer: '<label>'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Forms'
  },

  'html-3': {
    id: 'html-3',
    title: 'Semantic HTML',
    category: 'HTML',
    diagramType: 'semantic-layout',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<article style="max-width: 480px; font-family: system-ui, sans-serif; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; background: white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
  <header style="border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px;">
    <span style="font-size: 12px; font-weight: bold; color: #6366f1; text-transform: uppercase;">Web Architecture</span>
    <h2 style="margin: 6px 0 0 0; color: #0f172a; font-size: 20px;">The Power of Semantic Markup</h2>
    <p style="font-size: 13px; color: #64748b; margin: 4px 0 0 0;">Published by <address style="display: inline; font-style: normal; font-weight: 600;">Dev Team</address> on <time datetime="2026-09-25">Sept 25, 2026</time></p>
  </header>

  <main>
    <p style="color: #334155; line-height: 1.6; font-size: 14px;">
      Semantic elements convey meaning to both search engine crawlers and assistive screen readers, making websites accessible to all users.
    </p>
  </main>

  <footer style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; font-size: 13px; color: #94a3b8;">
    <span>Tags: #HTML5 #Accessibility</span>
    <a href="#" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Read More →</a>
  </footer>
</article>`,
    overview: {
      what: 'Semantic HTML refers to the practice of using HTML tags that explicitly describe the meaning, purpose, and structure of content (e.g. `<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`) rather than generic presentation containers (`<div>`, `<span>`).',
      why: 'Semantic tags provide critical accessibility landmarks for screen reader navigation, dramatically boost Search Engine Optimization (SEO) rankings by exposing content hierarchy to search bots, and make codebases vastly easier for developer teams to read and maintain.',
      whereUsed: 'Essential in production web applications, news portals (NYTimes, BBC), documentation hubs (MDN, React docs), e-commerce platforms, and government web systems where WCAG accessibility compliance is legally mandated.'
    },
    coreConcepts: [
      {
        title: 'Semantic Landmarks vs Generic Containers',
        explanation: 'While `<div>` and `<span>` convey zero information about their contents, semantic landmarks define the structural roles of major page sections, allowing assistive technologies to jump directly between landmarks.',
        terms: [
          { term: '<header>', definition: 'Introductory content, site branding, navigation links, or search bars.' },
          { term: '<nav>', definition: 'A major section containing navigational hyperlinks.' },
          { term: '<main>', definition: 'The dominant, unique content of the document body; must appear only once per page.' },
          { term: '<article>', definition: 'A self-contained composition (e.g. blog post, product card, forum thread) that makes sense independently.' },
          { term: '<section>', definition: 'A thematic grouping of content, typically accompanied by a heading.' },
          { term: '<aside>', definition: 'Content tangentially related to the main content (e.g. sidebars, related links, callout boxes).' },
          { term: '<footer>', definition: 'Footer containing author info, copyright notices, legal links, or back-to-top buttons.' }
        ],
        relationship: '`<header>`, `<main>`, `<aside>`, and `<footer>` construct the global page layout; `<section>` and `<article>` divide the `<main>` content into logical topics.'
      },
      {
        title: 'Accessibility (A11y) & Screen Readers',
        explanation: 'Visually impaired users rely on screen readers (like NVDA, JAWS, VoiceOver) that parse semantic landmarks to let users navigate directly to headers, main articles, or nav menus using keyboard shortcuts.',
        terms: [
          { term: 'ARIA Roles', definition: 'Accessible Rich Internet Applications attributes that supplement semantic tags when native HTML elements are insufficient.' },
          { term: '<time datetime="...">', definition: 'Translates human-readable dates into machine-readable ISO 8601 timestamps for calendar bots and search engines.' },
          { term: '<figure> & <figcaption>', definition: 'Pairs visual media (charts, photos, code blocks) with an explicit caption.' }
        ],
        relationship: 'Semantic tags establish built-in accessibility without requiring manual ARIA configuration; ARIA attributes enhance complex dynamic custom widgets.'
      }
    ],
    syntaxStructure: {
      generalStructure: `<!DOCTYPE html>
<html lang="en">
<body>
  <header>
    <nav><!-- Nav links --></nav>
  </header>
  <main>
    <article>
      <header><h1>Article Title</h1></header>
      <section><p>Content paragraph...</p></section>
    </article>
    <aside><!-- Related sidebar --></aside>
  </main>
  <footer><!-- Copyright info --></footer>
</body>
</html>`,
      breakdown: [
        { part: '<header>', meaning: 'Top landmark containing brand identity and navigation menu.' },
        { part: '<main>', meaning: 'Central unique content area of the webpage.' },
        { part: '<article>', meaning: 'Independent, reusable content entity.' },
        { part: '<footer>', meaning: 'Closing landmark containing site metadata and legal links.' }
      ],
      conventions: [
        'Never have more than one visible `<main>` tag per document.',
        'Always include an appropriate heading (`<h2>`, `<h3>`) inside each `<section>` or `<article>`.',
        'Do not replace `<a>` or `<button>` with styled `<div onclick="...">`; use real semantic interactives.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Semantic Blog Post Card',
        description: 'Structuring an independent article card with header, body content, and footer metadata.',
        code: `<article class="post-preview">
  <header>
    <h2>Understanding Modern CSS Flexbox</h2>
    <p>By Jane Doe on <time datetime="2026-08-15">August 15, 2026</time></p>
  </header>
  <p>Flexbox simplifies one-dimensional element alignment across main and cross axes...</p>
  <footer>
    <a href="/posts/css-flexbox">Read Full Article</a>
  </footer>
</article>`,
        explanation: 'Enclosing the post in `<article>` communicates that this item is a complete, distributable unit of content.'
      },
      {
        level: 'Intermediate',
        title: 'Figure with Caption for Technical Diagrams',
        description: 'Pairing an architecture diagram or code block with an explicit caption for screen readers.',
        code: `<figure>
  <img src="architecture.png" alt="Serverless API architecture diagram showing client, edge router, and database">
  <figcaption>Figure 1: High-level overview of our edge-rendered API pipeline.</figcaption>
</figure>`,
        explanation: '`<figure>` encapsulates the image while `<figcaption>` creates a programmatic relationship between image and caption.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Complete SaaS Landing Page Layout',
        description: 'Full page layout using semantic header, hero section, feature list, testimonial aside, and footer.',
        code: `<body>
  <header>
    <a href="/" class="brand-logo">CloudFlow</a>
    <nav aria-label="Main Navigation">
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="hero">
      <h1>Automate Your Workflow</h1>
      <p>Continuous integration made simple.</p>
    </section>

    <section id="features">
      <h2>Why Developers Choose CloudFlow</h2>
      <!-- Feature cards -->
    </section>

    <aside aria-label="Customer testimonial">
      <blockquote>"CloudFlow cut our deployment times in half."</blockquote>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 CloudFlow Inc. All rights reserved.</p>
  </footer>
</body>`,
        explanation: 'Provides clear landmark boundaries, enabling screen readers and Google search bots to parse layout instantly.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Map the Page Architecture',
        instruction: 'Before writing code, sketch the page into Header, Main, Nav, Article/Section, Aside, and Footer landmarks.',
        whyNecessary: 'Prevents "div soup" and establishes an accessible hierarchy from the beginning.',
        codeSnippet: `<!-- Layout Plan: header -> nav | main -> section*3 + aside | footer -->`
      },
      {
        step: 2,
        title: 'Wrap the Central Content in `<main>`',
        instruction: 'Enclose the core payload of the page inside a single `<main>` tag.',
        whyNecessary: 'Allows screen reader users to press a hotkey (e.g., "D" in JAWS) to skip repeating nav bars and jump straight to the content.',
        codeSnippet: `<main id="main-content">\n  <!-- Primary content goes here -->\n</main>`
      },
      {
        step: 3,
        title: 'Group Content Thematically with `<section>` and `<article>`',
        instruction: 'Use `<article>` for standalone items (cards, posts) and `<section>` for distinct page segments accompanied by headings.',
        whyNecessary: 'Establishes clear document outline nodes for search engine crawlers.',
        codeSnippet: `<section aria-labelledby="sec-title">\n  <h2 id="sec-title">Our Services</h2>\n</section>`
      },
      {
        step: 4,
        title: 'Audit Accessibility with Lighthouse',
        instruction: 'Open Chrome DevTools, click the "Lighthouse" tab, select "Accessibility", and run an audit.',
        whyNecessary: 'Validates that all landmarks, heading levels, and image alt tags conform to WCAG 2.1 AA standards.',
        codeSnippet: `# Run Chrome DevTools Lighthouse audit`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use semantic elements instead of `<div>` whenever a native semantic element exists.',
        'Use `<button>` for actions that alter state or trigger scripts; use `<a>` for navigation between URLs.',
        'Provide `<time datetime="YYYY-MM-DD">` for machine-readable dates.'
      ],
      structureRecommendations: [
        'Do not wrap every single element in `<section>`; use `<section>` only when content has a distinct theme and heading.',
        'Keep `<nav>` elements focused on primary navigation clusters; do not wrap solitary links in `<nav>`.'
      ],
      performanceConsiderations: [
        'Semantic HTML reduces the need for heavy JavaScript accessibility polyfills and ARIA workarounds.',
        'Clean semantic markup improves Google Core Web Vitals and SEO crawl efficiency.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using clickable `<div onclick="...">` instead of `<button>` or `<a>`.',
        howToAvoid: 'Always use `<button>` for interactive triggers and `<a>` for links. `<div>` lacks keyboard focus and enter key activation by default.',
        debuggingTip: 'Test if you can tab to the button with your keyboard and activate it using the Space or Enter key.'
      },
      {
        mistake: 'Using multiple `<main>` tags on a single page.',
        howToAvoid: 'A web document must have exactly one visible `<main>` element representing the primary page topic.',
        debuggingTip: 'Search your markup for `<main>` to ensure no duplicates exist.'
      },
      {
        mistake: 'Using `<section>` without any child heading tag (`<h2>`-`<h6>`).',
        howToAvoid: 'Every `<section>` should have a descriptive heading summarizing that subsection.',
        debuggingTip: 'Add an `<h2>` or `<h3>` at the top of each `<section>` block.'
      }
    ],
    projectApplications: [
      {
        domain: 'News & Media Publishing Platforms',
        description: 'Structuring news articles, publication dates, author metadata, and related story sidebars.'
      },
      {
        domain: 'Enterprise E-Commerce Platforms',
        description: 'Building accessible product listings, customer review feeds, and checkout steps.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Refactor a "div soup" webpage containing only `<div>` tags into semantic `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>` tags.',
        'Build a semantic product card featuring `<figure>`, `<figcaption>`, `<article>`, `<header>`, and `<button>`.'
      ],
      codingChallenge: {
        prompt: 'Build a semantic FAQ accordion section with `<section>`, `<h2>`, `<details>`, and `<summary>` elements.',
        hint: 'HTML5 `<details>` and `<summary>` create native expandable accordions without writing any JavaScript!'
      },
      miniProjectIdea: {
        title: 'Accessible Tech News Portal',
        description: 'Create a semantic tech news homepage with top navigation, featured article header, 3-column article grid, and author aside.'
      }
    },
    summary: {
      keyPoints: [
        'Semantic HTML gives explicit meaning to document structure for search bots and screen readers.',
        'Landmarks like `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>` enable swift keyboard navigation.',
        'Semantic markup is the bedrock of web accessibility and high search engine rankings.'
      ],
      skillsAcquired: [
        'Ability to architect clean, accessible HTML layouts without excess container divs.',
        'Mastery of landmark elements (`<main>`, `<nav>`, `<article>`, `<aside>`).',
        'Proficiency in passing WCAG AA accessibility audits and optimizing SEO structure.'
      ]
    },
    exercise: {
      question: 'Which semantic element should be used for a self-contained blog post or product card that makes sense independently?',
      options: ['<article>', '<section>', '<div>', '<aside>'],
      answer: '<article>'
    },
    exam: {
      question: 'How many visible <main> elements are permitted per HTML document according to HTML5 standards?',
      options: ['Exactly 1', 'Unlimited', 'Up to 3', 'None; main is deprecated'],
      answer: 'Exactly 1'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html'
  },

  'html-4': {
    id: 'html-4',
    title: 'SEO Basics & Metadata',
    category: 'HTML',
    diagramType: 'seo-preview',
    hasPlayground: false,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- Production-Ready SEO & Social Sharing Meta Tags -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO Metadata -->
  <title>Full-Stack Web Development Roadmap 2026 | Master Modern Tech</title>
  <meta name="description" content="Step-by-step full-stack roadmap with interactive code playgrounds, quizzes, and real-world project tutorials for modern developers.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://example.com/roadmap">

  <!-- Open Graph (Facebook, LinkedIn, Discord, Slack) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/roadmap">
  <meta property="og:title" content="Full-Stack Web Development Roadmap 2026">
  <meta property="og:description" content="Learn HTML, CSS, JS, React, and Node.js with live coding and verified quizzes.">
  <meta property="og:image" content="https://example.com/assets/og-preview.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Full-Stack Web Development Roadmap 2026">
  <meta name="twitter:description" content="Master modern web development step-by-step.">
  <meta name="twitter:image" content="https://example.com/assets/twitter-card.png">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>`,
    overview: {
      what: 'Search Engine Optimization (SEO) basics in HTML involve configuring `<head>` metadata, Open Graph social share tags, structured schema markup, and semantic document hierarchies so search engines (Google, Bing) and social platforms (Twitter, LinkedIn, Slack) can accurately index, rank, and preview your web pages.',
      why: 'Even the most beautifully designed web application will fail to attract users if search engines cannot index its content or if shared links appear as broken, blank cards on social media. Proper HTML metadata drives organic traffic, increases click-through rates (CTR), and ensures brand authority.',
      whereUsed: 'Essential across all public websites, blogs, SaaS landing pages, documentation portals, and e-commerce stores seeking organic search ranking and rich social media link previews.'
    },
    coreConcepts: [
      {
        title: 'Search Engine Indexing & Crawling',
        explanation: 'Search engine bots (like Googlebot) crawl HTML documents, parse `<title>`, `<meta name="description">`, canonical URLs, and heading structures to determine the page topic and search ranking position.',
        terms: [
          { term: '<title>', definition: 'The most important on-page SEO tag; defines the title shown in browser tabs, bookmarks, and Google search result blue links.' },
          { term: '<meta name="description">', definition: 'A 150-160 character summary snippet displayed beneath the title in search engine result pages (SERPs).' },
          { term: '<link rel="canonical">', definition: 'Specifies the master authoritative URL to prevent search engines from penalizing duplicate content across multiple URLs.' }
        ],
        relationship: 'The `<title>` attracts user clicks; the `meta description` explains page value in SERP snippets; canonical links prevent duplicate content penalties.'
      },
      {
        title: 'Open Graph & Twitter Card Protocols',
        explanation: 'Open Graph (OG) tags are standardized meta attributes created by Facebook that transform plain URLs into rich social media cards with thumbnails, headlines, and descriptions when shared on social apps.',
        terms: [
          { term: 'og:title & og:description', definition: 'The headline and description displayed on social media cards (Facebook, LinkedIn, Discord).' },
          { term: 'og:image', definition: 'The high-resolution thumbnail image preview (recommended size: 1200x630px).' },
          { term: 'twitter:card', definition: 'Defines the Twitter display format (e.g. summary_large_image).' }
        ],
        relationship: 'OG tags control link appearance on social media platforms; standard meta tags control appearance on search engines.'
      }
    ],
    syntaxStructure: {
      generalStructure: `<head>
  <title>Descriptive Title (50-60 characters)</title>
  <meta name="description" content="Engaging summary (150-160 characters)">
  <link rel="canonical" href="https://mysite.com/page">
  <meta property="og:title" content="Social Card Title">
  <meta property="og:image" content="https://mysite.com/social-image.jpg">
</head>`,
      breakdown: [
        { part: '<title>...', meaning: 'Specifies the primary headline indexed by search engines and displayed on the browser tab.' },
        { part: 'name="description"', meaning: 'Provides the search engine snippet summarizing the page content.' },
        { part: 'property="og:image"', meaning: 'Direct URL to a 1200x630px graphic used when sharing the link on Slack, Discord, or LinkedIn.' }
      ],
      conventions: [
        'Keep `<title>` length between 50 and 60 characters to prevent truncation in Google search results.',
        'Keep `meta description` between 140 and 160 characters.',
        'Always supply absolute URLs (e.g. https://example.com/image.jpg) for `og:image` tags.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Essential HTML Metadata Block',
        description: 'The minimal standard meta block every public web page must include.',
        code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Learn JavaScript: The Complete Beginner Guide 2026</title>
  <meta name="description" content="Master JavaScript fundamentals with hands-on exercises, variables, functions, and modern ES6 features. Start coding today!">
</head>`,
        explanation: 'Ensures proper UTF-8 decoding, responsive mobile scaling, and delivers concise title and description snippets to Google.'
      },
      {
        level: 'Intermediate',
        title: 'Open Graph Social Card Integration',
        description: 'Configuring rich media previews for LinkedIn, Discord, Facebook, and Twitter.',
        code: `<!-- Open Graph for Rich Social Sharing -->
<meta property="og:site_name" content="Roadmap Tracker">
<meta property="og:title" content="Interactive Full-Stack Web Development Roadmap">
<meta property="og:description" content="Track your learning milestones from HTML to React and Node.js with live code testing.">
<meta property="og:image" content="https://roadmaptracker.dev/og-cover.png">
<meta property="og:url" content="https://roadmaptracker.dev">
<meta property="og:type" content="website">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@RoadmapTracker">`,
        explanation: 'When someone pastes your link in Discord or Twitter, a rich card with preview thumbnail will be generated automatically.'
      },
      {
        level: 'Real-World Use Case',
        title: 'JSON-LD Structured Data Schema',
        description: 'Embedding Schema.org structured data to enable rich Google search result badges (star ratings, prices, author info).',
        code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Full-Stack Web Development Roadmap",
  "description": "Comprehensive tutorial roadmap for full-stack engineering.",
  "provider": {
    "@type": "Organization",
    "name": "Roadmap Tracker",
    "sameAs": "https://example.com"
  }
}
</script>`,
        explanation: 'JSON-LD helps Google understand specific entities (Courses, Products, Recipes, FAQs) and display rich badges in search results.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Draft a Targeted Page Title',
        instruction: 'Write a concise, keyword-rich title between 50-60 characters incorporating your primary keyword and brand name.',
        whyNecessary: 'The `<title>` tag is one of the strongest on-page ranking signals for search algorithms.',
        codeSnippet: `<title>React Tutorial: Learn Components & Hooks | Roadmap Tracker</title>`
      },
      {
        step: 2,
        title: 'Craft a Compelling Meta Description',
        instruction: 'Write a 150-160 character description summarizing the page value and including a call-to-action.',
        whyNecessary: 'A well-written description boosts organic click-through rates from search engine users.',
        codeSnippet: `<meta name="description" content="Master React components, state, props, and hooks with hands-on examples and live code playgrounds. Start learning for free!">`
      },
      {
        step: 3,
        title: 'Add Open Graph & Canonical Tags',
        instruction: 'Set the canonical URL and specify `og:title`, `og:description`, and `og:image` with absolute URLs.',
        whyNecessary: 'Ensures rich social card generation and prevents duplicate content penalties.',
        codeSnippet: `<link rel="canonical" href="https://example.com/react">\n<meta property="og:image" content="https://example.com/images/react-cover.png">`
      },
      {
        step: 4,
        title: 'Validate Using Social Debuggers',
        instruction: 'Test your URLs using tools like the Facebook Sharing Debugger, Twitter Card Validator, or opengraph.xyz.',
        whyNecessary: 'Verifies that image aspect ratios, titles, and descriptions render properly on social feeds.',
        codeSnippet: `# Test at https://www.opengraph.xyz`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Ensure every single page on your website has a unique `<title>` and `<meta name="description">`.',
        'Use an aspect ratio of 1.91:1 (e.g. 1200x630px) for `og:image` to prevent unwanted cropping on social platforms.',
        'Use descriptive, semantic `alt` attributes on all images.'
      ],
      structureRecommendations: [
        'Structure internal URLs cleanly with lowercase words separated by hyphens (e.g. `/courses/javascript-basics`).',
        'Include a `robots.txt` and an XML sitemap (`sitemap.xml`) at the root of your domain.'
      ],
      performanceConsiderations: [
        'Fast page load times and optimal Core Web Vitals (LCP, CLS, INP) are direct Google search ranking factors.',
        'Optimize and compress images (WebP / AVIF formats) to ensure top search indexing speeds.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using relative URLs for `og:image` (e.g. `<meta property="og:image" content="/images/preview.png">`).',
        howToAvoid: 'Social platforms cannot resolve relative paths; always use full absolute URLs (`https://mysite.com/images/preview.png`).',
        debuggingTip: 'Check the URL protocol in your og:image tags; it must start with https://.'
      },
      {
        mistake: 'Keyword stuffing (cramming 50 repeated keywords into title and meta tags).',
        howToAvoid: 'Write natural, human-readable titles and descriptions. Search engines penalize artificial keyword stuffing.',
        debuggingTip: 'Read your title out loud; it should sound like a natural, compelling headline.'
      },
      {
        mistake: 'Duplicate title tags across multiple sub-pages.',
        howToAvoid: 'Make every page title distinct (e.g. "Pricing | AppName", "Documentation | AppName").',
        debuggingTip: 'Run a site crawl using Google Search Console to detect duplicate title warnings.'
      }
    ],
    projectApplications: [
      {
        domain: 'E-Commerce Stores & Marketplaces',
        description: 'Configuring dynamic product schemas, prices, stock availability, and image previews for search snippets.'
      },
      {
        domain: 'Blogs, Documentation & Content Hubs',
        description: 'Optimizing organic search discoverability and high-impact social media sharing for articles.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Write a complete `<head>` block for a portfolio website including viewport, title, description, canonical link, and Open Graph tags.',
        'Use https://www.opengraph.xyz to test how a webpage\'s social meta tags preview across Discord, Facebook, and Twitter.'
      ],
      codingChallenge: {
        prompt: 'Create a JSON-LD structured data block for an article featuring headline, author name, datePublished, and publisher logo.',
        hint: 'Use `<script type="application/ld+json">` with `@type: "Article"` schema attributes.'
      },
      miniProjectIdea: {
        title: 'SEO Audit & Meta Tag Generator',
        description: 'Build a lightweight tool that takes a page title, description, and image URL and outputs ready-to-copy HTML meta tags.'
      }
    },
    summary: {
      keyPoints: [
        'HTML metadata in the `<head>` controls how pages appear in search engine rankings and social media feeds.',
        'The `<title>` and `meta description` directly drive organic search discovery and click-through rates.',
        'Open Graph tags ensure links unfurl with high-quality media cards when shared on messaging and social apps.'
      ],
      skillsAcquired: [
        'Proficiency in crafting SEO-optimized title and description tags.',
        'Ability to implement complete Open Graph and Twitter Card sharing protocols.',
        'Understanding of canonical links, structured data (JSON-LD), and web crawler indexing.'
      ]
    },
    exercise: {
      question: 'Which tag is primarily displayed as the clickable headline link in Google search engine result pages (SERPs)?',
      options: ['<title>', '<meta name="description">', '<h1>', '<header>'],
      answer: '<title>'
    },
    exam: {
      question: 'Why must Open Graph image URLs (og:image) always be absolute URLs starting with https://?',
      options: [
        'Social crawlers (Facebook, Discord, Twitter) cannot resolve relative paths from external servers',
        'HTML does not support relative paths in meta tags',
        'Absolute URLs load faster than relative URLs',
        'Relative URLs are blocked by browser security sandboxes'
      ],
      answer: 'Social crawlers (Facebook, Discord, Twitter) cannot resolve relative paths from external servers'
    },
    materialUrl: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'
  }
};
