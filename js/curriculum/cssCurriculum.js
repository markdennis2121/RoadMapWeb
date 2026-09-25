export const CSS_CURRICULUM = {
  'css-1': {
    id: 'css-1',
    title: 'Selectors & Specificity',
    category: 'CSS',
    diagramType: 'specificity-chart',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- CSS Specificity Battle -->
<div class="card" id="featured-card">
  <p class="highlight text-lead">Specificity determines which style wins!</p>
</div>

<style>
  /* Element Selector (Specificity: 0,0,1) */
  p {
    color: #64748b;
    font-family: sans-serif;
  }

  /* Class Selector (Specificity: 0,1,0) - Overrides element */
  .highlight {
    color: #4f46e5;
    font-weight: 500;
  }

  /* Chained Class Selector (Specificity: 0,2,0) - Overrides single class */
  .card .highlight.text-lead {
    color: #059669;
    font-size: 16px;
    font-weight: 700;
  }

  /* ID Selector (Specificity: 1,0,0) - Wins over classes! */
  #featured-card p {
    background: #ecfdf5;
    padding: 16px;
    border-radius: 8px;
    border: 2px solid #a7f3d0;
  }
</style>`,
    overview: {
      what: 'CSS Selectors are pattern rules that tell the browser which HTML elements to style. Specificity is the mathematical weighting algorithm browsers use to resolve style conflicts when multiple CSS rules target the exact same element.',
      why: 'Without understanding specificity, styling large web applications becomes frustrating, resulting in overuse of `!important`, CSS file bloat, and unpredictable UI bugs where styles fail to apply or override each other unpredictably.',
      whereUsed: 'Used across all web styling architectures: CSS Modules, Tailwind CSS, Sass/SCSS stylesheets, and CSS-in-JS libraries (Styled Components, Emotion).'
    },
    coreConcepts: [
      {
        title: 'The Specificity Hierarchy (Inline > ID > Class > Element)',
        explanation: 'Specificity is calculated using a 4-tuple hierarchy score: (Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element). A selector with a higher score in a higher category will always win, regardless of how many lower-category selectors are combined.',
        terms: [
          { term: 'Inline Styles (1,0,0,0)', definition: 'Styles written directly on the element via style="...".' },
          { term: 'ID Selectors (0,1,0,0)', definition: 'Targeting elements with `#id-name`. Extremely strong weight.' },
          { term: 'Class / Attribute / Pseudo-class (0,0,1,0)', definition: 'Classes (`.btn`), attributes (`[type="text"]`), and pseudo-classes (`:hover`, `:focus`).' },
          { term: 'Element / Pseudo-element (0,0,0,1)', definition: 'HTML tags (`div`, `p`, `h1`) and pseudo-elements (`::before`, `::after`).' }
        ],
        relationship: '1 ID (0,1,0,0) will override 1,000 stacked class selectors (0,0,1000,0); Inline styles override IDs; `!important` bypasses standard specificity altogether.'
      },
      {
        title: 'The Cascade & Source Order',
        explanation: 'When two conflicting CSS rules have the exact same specificity score, the browser\'s cascade rule dictates that the rule declared lowest (most recent) in the stylesheet wins.',
        terms: [
          { term: 'Cascade', definition: 'The process of collecting, filtering, and ordering rules by importance, origin, specificity, and source order.' },
          { term: 'Inheritance', definition: 'Some CSS properties (like color, font-family, line-height) automatically cascade down from parent containers to their children.' }
        ],
        relationship: 'Specificity is checked first; if specificity is tied, source order breaks the tie.'
      }
    ],
    syntaxStructure: {
      generalStructure: `/* Specificity Calculator: (Inline, ID, Class, Element) */
selector {
  property: value;
}

#header .nav-item:hover a {
  /* Specificity: 1 ID, 1 Class, 1 Pseudo-class, 1 Element = (0, 1, 2, 1) */
  color: #3b82f6;
}`,
      breakdown: [
        { part: '#header', meaning: 'ID selector adding 1 to the ID column (0,1,0,0).' },
        { part: '.nav-item', meaning: 'Class selector adding 1 to the Class column (0,0,1,0).' },
        { part: ':hover', meaning: 'Pseudo-class adding 1 to the Class column (0,0,1,0).' },
        { part: 'a', meaning: 'Element selector adding 1 to the Element column (0,0,0,1).' }
      ],
      conventions: [
        'Prefer single class selectors (`.card`, `.btn-primary`) to keep specificity low and maintainable.',
        'Avoid using ID selectors (`#my-id`) for styling purposes.',
        'Avoid using `!important` except for utility overrides in emergency edge cases.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Element vs Class Selector',
        description: 'Demonstrating how a class selector overrides a generic element rule.',
        code: `<p class="alert-text">Warning: Check your connection.</p>

<style>
  p { color: #334155; } /* (0,0,0,1) */
  .alert-text { color: #ef4444; font-weight: bold; } /* (0,0,1,0) - WINS */
</style>`,
        explanation: 'The class selector `.alert-text` has specificity (0,0,1,0), which overrides the element selector `p` (0,0,0,1).'
      },
      {
        level: 'Intermediate',
        title: 'Combinators & Pseudo-classes',
        description: 'Using child combinators, sibling selectors, and dynamic hover states.',
        code: `<style>
  /* Direct child combinator (>) */
  ul.menu > li {
    list-style: none;
  }

  /* Adjacent sibling combinator (+) */
  h2 + p {
    margin-top: 4px;
    color: #64748b;
  }

  /* State pseudo-class (:focus-visible) */
  button:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
</style>`,
        explanation: 'Combinators allow precise relationship targeting without adding excess markup classes.'
      },
      {
        level: 'Real-World Use Case',
        title: 'BEM (Block Element Modifier) Methodology',
        description: 'Industry-standard naming methodology that keeps specificity flat at (0,0,1,0).',
        code: `<div class="card card--featured">
  <h2 class="card__title">Pro Subscription</h2>
  <p class="card__desc">Unlimited access to all courses.</p>
  <button class="card__button card__button--primary">Upgrade Now</button>
</div>

<style>
  .card { padding: 24px; border-radius: 12px; }
  .card--featured { border: 2px solid #6366f1; }
  .card__title { font-size: 20px; font-weight: bold; }
  .card__button--primary { background: #6366f1; color: white; }
</style>`,
        explanation: 'BEM guarantees all rules have equal specificity (0,0,1,0), preventing specificity wars in large codebases.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Adopt Flat Class-Based Architecture',
        instruction: 'Write styles targeted primarily at reusable class names rather than deep tag nesting (`div div ul li a`).',
        whyNecessary: 'Flat specificity makes components easy to override and compose.',
        codeSnippet: `/* Good: */ .nav-link { color: #333; }\n/* Bad: */ header nav div ul li a { color: #333; }`
      },
      {
        step: 2,
        title: 'Calculate Specificity During Conflicts',
        instruction: 'If a style does not apply, calculate the (Inline, ID, Class, Element) score of both conflicting rules.',
        whyNecessary: 'Identifies which existing rule is blocking your new declaration without resorting to `!important`.',
        codeSnippet: `/* Target Rule: (0,1,0) vs Competing Rule: (0,1,1) */`
      },
      {
        step: 3,
        title: 'Use CSS Cascade Layers (`@layer`) for Architecture',
        instruction: 'Organize styles into `@layer reset, base, components, utilities;`.',
        whyNecessary: 'Cascade layers allow utilities to always override components without high specificity hacks.',
        codeSnippet: `@layer components {\n  .btn { padding: 8px 16px; }\n}`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Keep selector specificity as low and uniform as possible throughout your stylesheet.',
        'Never use `!important` to fix standard specificity issues.',
        'Use BEM naming conventions (`block__element--modifier`) in raw CSS projects.'
      ],
      structureRecommendations: [
        'Place base element styles (resets) at the top of the stylesheet and component classes below.',
        'Avoid nesting selectors deeper than 3 levels.'
      ],
      performanceConsiderations: [
        'Browsers match CSS selectors from right to left (key selector); simpler rightmost selectors match faster.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using `!important` as a quick fix for style overrides.',
        howToAvoid: 'Check the competing rule specificity and adjust class targeting instead.',
        debuggingTip: 'Open DevTools Styles tab; look for crossed-out properties to see which rule won the cascade.'
      },
      {
        mistake: 'Using ID selectors (`#main-header`) for general layout styling.',
        howToAvoid: 'Use classes instead. IDs create artificially high specificity that is difficult to override in themes or responsive variants.',
        debuggingTip: 'Refactor `#header` to `.header`.'
      }
    ],
    projectApplications: [
      {
        domain: 'Design Systems & Component Libraries',
        description: 'Building customizable UI kits (buttons, modals, tooltips) that consumers can easily restyle.'
      },
      {
        domain: 'Large Enterprise Web Applications',
        description: 'Preventing style collisions between different development teams working on the same portal.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Calculate the specificity score for: `nav.navbar ul > li.active a:hover`. (Answer: 0, 0, 3, 3).',
        'Refactor a stylesheet with 5 nested selectors into flat BEM class names.'
      ],
      codingChallenge: {
        prompt: 'Create a notification badge that defaults to gray, but changes to red when having class `.badge--error` and green with `.badge--success` using equal-specificity class selectors.',
        hint: 'Use `.badge`, `.badge--error`, and `.badge--success`.'
      },
      miniProjectIdea: {
        title: 'Theme Switcher Component',
        description: 'Build a component that changes between dark and light modes using CSS custom properties and flat class selectors.'
      }
    },
    summary: {
      keyPoints: [
        'Specificity is the mathematical score determining which CSS rule applies during style conflicts.',
        'Inline > ID > Class/Pseudo-class > Element.',
        'Maintaining low, uniform specificity prevents brittle codebases and reduces reliance on `!important`.'
      ],
      skillsAcquired: [
        'Ability to calculate precise 4-part specificity scores.',
        'Skill in structuring maintainable CSS using BEM and flat class hierarchies.',
        'Proficiency in debugging cascade conflicts with browser DevTools.'
      ]
    },
    exercise: {
      question: 'Which of the following selectors has the highest specificity score?',
      options: ['#main-card', '.card .card-body .title', 'div.card p', 'p:first-child'],
      answer: '#main-card'
    },
    exam: {
      question: 'When two CSS rules targeting the same element have the EXACT same specificity score, which rule is applied?',
      options: [
        'The rule declared lowest (last) in the stylesheet',
        'The rule declared highest (first) in the stylesheet',
        'Neither; browser defaults to user agent styles',
        'The rule with more property declarations'
      ],
      answer: 'The rule declared lowest (last) in the stylesheet'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity'
  },

  'css-2': {
    id: 'css-2',
    title: 'The CSS Box Model',
    category: 'CSS',
    diagramType: 'box-model',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- CSS Box Model Visual Demonstration -->
<div class="box-container">
  <div class="demo-box content-box">
    <strong>content-box</strong> (Width: 200px + padding + border = 260px total)
  </div>

  <div class="demo-box border-box">
    <strong>border-box</strong> (Width: 200px TOTAL including padding & border)
  </div>
</div>

<style>
  .box-container {
    font-family: sans-serif;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .demo-box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 10px solid #6366f1;
    margin: 10px;
    font-size: 13px;
    line-height: 1.4;
  }

  .content-box {
    box-sizing: content-box;
    background: #e0e7ff;
  }

  .border-box {
    box-sizing: border-box;
    background: #ecfdf5;
    border-color: #10b981;
  }
</style>`,
    overview: {
      what: 'The CSS Box Model is the foundational layout engine of the browser that wraps every HTML element inside a rectangular box composed of four concentric layers: Content, Padding, Border, and Margin.',
      why: 'Understanding the box model is crucial for calculating element dimensions, spacing components accurately, and avoiding unwanted overflow or broken multi-column layouts.',
      whereUsed: 'Universal in web development—applied to every single visible HTML element on every web page across all browsers.'
    },
    coreConcepts: [
      {
        title: 'The 4 Concentric Layers',
        explanation: 'Every element box is structured from the inside out: Content -> Padding -> Border -> Margin.',
        terms: [
          { term: 'Content', definition: 'The core area where text, images, or child elements reside.' },
          { term: 'Padding', definition: 'The transparent space clearing an area between the content and the border (inside the element).' },
          { term: 'Border', definition: 'A stroke outline that surrounds the padding and content.' },
          { term: 'Margin', definition: 'The transparent space clearing an area outside the border, separating the element from adjacent elements.' }
        ],
        relationship: 'Margin pushes outside elements away; Border surrounds the element perimeter; Padding creates breathing room inside the border around content.'
      },
      {
        title: '`box-sizing`: `content-box` vs `border-box`',
        explanation: 'By default, browsers use `content-box`, where width and height apply ONLY to the content area, causing padding and borders to expand the total rendered size. With `box-sizing: border-box`, width and height encompass Content + Padding + Border together.',
        terms: [
          { term: 'content-box (Default)', definition: 'Total Width = width + padding-left + padding-right + border-left + border-right.' },
          { term: 'border-box (Industry Standard)', definition: 'Total Width = width (padding and border are absorbed inside the defined width).' }
        ],
        relationship: '`border-box` simplifies responsive calculations and prevents columns from breaking when padding is added.'
      }
    ],
    syntaxStructure: {
      generalStructure: `/* Global Box-Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;        /* Fixed or fluid width */
  padding: 16px 24px;  /* Top/Bottom: 16px, Left/Right: 24px */
  border: 1px solid #e2e8f0;
  margin: 0 auto;      /* Centering horizontally */
}`,
      breakdown: [
        { part: 'box-sizing: border-box', meaning: 'Locks element calculations so padding and borders never expand defined width.' },
        { part: 'padding: 16px 24px', meaning: 'Shorthand: 16px vertical padding, 24px horizontal padding.' },
        { part: 'margin: 0 auto', meaning: '0 margin on top/bottom, automatic equal margin on left/right to center the block.' }
      ],
      conventions: [
        'Always apply the universal `*, *::before, *::after { box-sizing: border-box; }` reset at the root of every project.',
        'Use directional margin/padding shorthand clockwise: `margin: top right bottom left;` (TRBL).'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Card Spacing with Padding and Margin',
        description: 'Applying inner breathing room (padding) and external element separation (margin).',
        code: `<div class="card">
  <h2>Box Model Card</h2>
  <p>Padding creates interior space, while margin separates this card from other elements.</p>
</div>

<style>
  .card {
    box-sizing: border-box;
    width: 320px;
    padding: 20px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    margin-bottom: 24px;
    background: #ffffff;
  }
</style>`,
        explanation: 'Padding prevents the text from touching the card borders, and margin-bottom keeps space before the next card.'
      },
      {
        level: 'Intermediate',
        title: 'Margin Collapse Demonstration',
        description: 'Understanding why adjacent vertical margins collapse into a single margin.',
        code: `<div class="box-top">Top Box (margin-bottom: 30px)</div>
<div class="box-bottom">Bottom Box (margin-top: 20px)</div>

<style>
  .box-top { margin-bottom: 30px; background: #e0e7ff; padding: 10px; }
  .box-bottom { margin-top: 20px; background: #fef3c7; padding: 10px; }
  /* The total rendered space between them will be 30px (the larger margin), NOT 50px! */
</style>`,
        explanation: 'Vertical margins collapse to the value of the largest margin, preventing excessive spacing between consecutive blocks.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Universal CSS Reset for Production',
        description: 'The standard modern box model reset used in modern web frameworks.',
        code: `/* Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}`,
        explanation: 'Removes inconsistent browser default margins and locks all element sizing to `border-box`.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Apply Global `box-sizing: border-box`',
        instruction: 'Add the universal box-sizing rule at the very top of your primary CSS file.',
        whyNecessary: 'Ensures element widths remain predictable across all components without manual math.',
        codeSnippet: `*, *::before, *::after {\n  box-sizing: border-box;\n}`
      },
      {
        step: 2,
        title: 'Inspect Elements in Browser DevTools',
        instruction: 'Right-click any element, select "Inspect", and scroll to the bottom of the "Styles" tab to view the live Box Model diagram.',
        whyNecessary: 'Allows visual verification of exact pixel values for margin (orange), border (yellow), padding (green), and content (blue).',
        codeSnippet: `# Open DevTools -> Elements -> Computed / Styles -> Box Model Diagram`
      },
      {
        step: 3,
        title: 'Configure Component Spacing System',
        instruction: 'Define standardized spacing scales (e.g. 4px, 8px, 16px, 24px, 32px) for padding and margins.',
        whyNecessary: 'Maintains visual harmony and vertical rhythm across the entire UI.',
        codeSnippet: `:root {\n  --space-sm: 8px;\n  --space-md: 16px;\n  --space-lg: 24px;\n}`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always use `box-sizing: border-box` across the whole project.',
        'Use margins primarily for external separation between sibling components.',
        'Use padding for internal container spacing.'
      ],
      structureRecommendations: [
        'Prefer unidirectional margin flow (e.g. only use `margin-bottom` or `margin-block-end`) to avoid accidental margin collapse confusion.'
      ],
      performanceConsiderations: [
        'Animating `margin` or `padding` triggers browser layout reflow; prefer animating `transform: translate()` for smooth 60fps animations.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Forgetting `box-sizing: border-box`, causing columns set to `width: 50%` with padding to wrap and break onto two lines.',
        howToAvoid: 'Apply the universal `*, *::before, *::after { box-sizing: border-box; }` reset.',
        debuggingTip: 'Check if the total computed width exceeds 100% in DevTools.'
      },
      {
        mistake: 'Confusing padding with margin.',
        howToAvoid: 'Remember: Padding has the background color of the element (inside); Margin is outside and transparent.',
        debuggingTip: 'Change the element background color to see where padding ends.'
      }
    ],
    projectApplications: [
      {
        domain: 'UI Layout Grids & Cards',
        description: 'Ensuring multi-column cards fit precisely side-by-side without horizontal scrollbar overflows.'
      },
      {
        domain: 'Responsive Web Forms',
        description: 'Creating full-width `100%` input fields with custom padding that do not spill outside their parent containers.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build two identical buttons: one with `box-sizing: content-box` and one with `border-box`, inspect their computed sizes in DevTools.',
        'Create a responsive card container with 16px padding, a 2px border, and 24px margin.'
      ],
      codingChallenge: {
        prompt: 'Create a 3-column row where each column takes exactly 33.33% width with 12px internal padding without breaking onto a new line.',
        hint: 'Use `box-sizing: border-box` and `display: flex` or `float: left`.'
      },
      miniProjectIdea: {
        title: 'Interactive Box Model Playground',
        description: 'Build an interactive web tool where sliders adjust margin, border, and padding in real time with live color highlighting.'
      }
    },
    summary: {
      keyPoints: [
        'The CSS Box Model consists of Content, Padding, Border, and Margin.',
        '`box-sizing: border-box` makes width include content, padding, and border for predictable layouts.',
        'Vertical margins can collapse between adjacent block elements.'
      ],
      skillsAcquired: [
        'Mastery of CSS box model layout calculations.',
        'Proficiency in configuring universal CSS resets.',
        'Expertise in inspecting element box layers via browser DevTools.'
      ]
    },
    exercise: {
      question: 'With `box-sizing: border-box`, if an element has `width: 200px`, `padding: 20px`, and `border: 5px`, what is its total rendered width?',
      options: ['200px', '250px', '225px', '210px'],
      answer: '200px'
    },
    exam: {
      question: 'Which box model layer sits immediately between the element padding and margin?',
      options: ['Border', 'Content', 'Outline', 'Shadow'],
      answer: 'Border'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model'
  },

  'css-3': {
    id: 'css-3',
    title: 'Flexbox Layout',
    category: 'CSS',
    diagramType: 'flexbox-axes',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- CSS Flexbox Interactive Alignment Demo -->
<div class="flex-toolbar">
  <div class="brand">🚀 Acme Inc</div>
  <div class="nav-items">
    <span>Features</span>
    <span>Pricing</span>
    <span>Docs</span>
  </div>
  <button class="cta-btn">Sign In</button>
</div>

<style>
  .flex-toolbar {
    font-family: sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: #1e1b4b;
    color: #ffffff;
    border-radius: 10px;
  }

  .brand {
    font-weight: bold;
    font-size: 16px;
    color: #818cf8;
  }

  .nav-items {
    display: flex;
    gap: 20px;
    font-size: 14px;
  }

  .nav-items span {
    cursor: pointer;
    opacity: 0.85;
  }
  .nav-items span:hover { opacity: 1; }

  .cta-btn {
    background: #6366f1;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
</style>`,
    overview: {
      what: 'CSS Flexible Box Layout (Flexbox) is a one-dimensional layout model designed for distributing space along either a row (horizontal) or a column (vertical) and aligning items dynamically within a container.',
      why: 'Before Flexbox, vertical centering, equal-height columns, and responsive toolbar alignment required complex CSS float hacks and absolute positioning. Flexbox solves element distribution, alignment, and ordering with clean, declarative properties.',
      whereUsed: 'Essential in every modern frontend application for navigation headers, button clusters, form fields, card groups, sidebar layouts, and mobile-friendly toolbars.'
    },
    coreConcepts: [
      {
        title: 'Flex Container vs Flex Items',
        explanation: 'Applying `display: flex` transforms the parent element into a Flex Container and its immediate direct children into Flex Items.',
        terms: [
          { term: 'Main Axis', definition: 'The primary direction along which flex items are placed (defined by `flex-direction: row` or `column`).' },
          { term: 'Cross Axis', definition: 'The perpendicular axis running across the main axis.' },
          { term: 'justify-content', definition: 'Distributes items along the Main Axis (e.g. flex-start, center, space-between, space-around).' },
          { term: 'align-items', definition: 'Aligns items along the Cross Axis (e.g. stretch, center, flex-start, flex-end).' }
        ],
        relationship: '`flex-direction` dictates which way the main axis runs; `justify-content` controls spacing along that main axis; `align-items` controls alignment across the perpendicular axis.'
      },
      {
        title: 'Flex Item Sizing: `flex-grow`, `flex-shrink`, `flex-basis`',
        explanation: 'Individual items can dynamically expand to fill remaining space, shrink to prevent overflow, or define initial starting sizes.',
        terms: [
          { term: 'flex-grow', definition: 'Proportion of available positive free space this item should absorb (default 0).' },
          { term: 'flex-shrink', definition: 'Ability of an item to shrink when space is constrained (default 1).' },
          { term: 'flex-basis', definition: 'Initial default size before free space is distributed (e.g. 200px or auto).' },
          { term: 'gap', definition: 'Defines clean gutter spacing between flex items without needing margin hacks.' }
        ],
        relationship: 'Shorthand: `flex: 1` expands items equally; `flex: 0 0 250px` creates a fixed-width non-shrinking sidebar.'
      }
    ],
    syntaxStructure: {
      generalStructure: `/* Flex Container Properties */
.container {
  display: flex;
  flex-direction: row;        /* row | column | row-reverse | column-reverse */
  justify-content: space-between; /* flex-start | center | flex-end | space-between | space-evenly */
  align-items: center;        /* stretch | center | flex-start | flex-end | baseline */
  flex-wrap: wrap;            /* nowrap | wrap */
  gap: 16px;                  /* gutter between items */
}

/* Flex Item Properties */
.item {
  flex: 1 1 auto;             /* grow | shrink | basis */
  align-self: flex-start;     /* overrides align-items for this specific item */
}`,
      breakdown: [
        { part: 'display: flex', meaning: 'Activates flexbox context for all direct children.' },
        { part: 'justify-content: space-between', meaning: 'Pushes first item to far left, last item to far right, and evenly spaces middle items.' },
        { part: 'align-items: center', meaning: 'Centers all items vertically along the cross axis.' },
        { part: 'gap: 16px', meaning: 'Adds 16px space between all adjacent items without edge margins.' }
      ],
      conventions: [
        'Always use the `gap` property instead of manual `margin-right` on child items.',
        'Use `flex: 1` to create equal-width responsive columns.',
        'Use `display: flex; justify-content: center; align-items: center;` for perfect element centering.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Perfect Element Centering',
        description: 'Centering any element both horizontally and vertically inside a parent container.',
        code: `<div class="hero-center">
  <h1>Centered Headline</h1>
</div>

<style>
  .hero-center {
    display: flex;
    justify-content: center; /* Horizontally */
    align-items: center;     /* Vertically */
    min-height: 200px;
    background: #f1f5f9;
  }
</style>`,
        explanation: 'Three lines of CSS achieve what used to require complex positioning hacks.'
      },
      {
        level: 'Intermediate',
        title: 'Responsive Card Grid with `flex-wrap`',
        description: 'Cards wrap naturally onto new lines as the screen shrinks.',
        code: `<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<style>
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .card {
    flex: 1 1 240px; /* Grow, shrink, min-basis 240px */
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
  }
</style>`,
        explanation: 'Each card takes at least 240px and grows to fill the row; wraps automatically on mobile screens.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Application Navbar with Responsive Push',
        description: 'Left-aligned brand and links with right-aligned profile icon using `margin-left: auto`.',
        code: `<nav class="app-nav">
  <div class="brand">AppLogo</div>
  <a href="#dashboard">Dashboard</a>
  <a href="#projects">Projects</a>
  <div class="user-profile">Jane (Admin)</div>
</nav>

<style>
  .app-nav {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 12px 24px;
    background: #0f172a;
    color: white;
  }
  .user-profile {
    margin-left: auto; /* Flex auto-margin pushes profile to the far right! */
    font-weight: 600;
  }
</style>`,
        explanation: 'In Flexbox, `margin-left: auto` absorbs all remaining free space, pushing that item to the far end of the container.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Set Container Display to Flex',
        instruction: 'Apply `display: flex;` to the parent wrapper containing the items you wish to align.',
        whyNecessary: 'Activates the flex formatting context on all direct child elements.',
        codeSnippet: `.navbar { display: flex; }`
      },
      {
        step: 2,
        title: 'Define Main Axis Direction and Alignment',
        instruction: 'Choose `flex-direction: row` (horizontal) or `column` (vertical), then set `justify-content` and `gap`.',
        whyNecessary: 'Controls how items flow and space out along the primary direction.',
        codeSnippet: `.navbar { justify-content: space-between; gap: 16px; }`
      },
      {
        step: 3,
        title: 'Set Cross Axis Alignment',
        instruction: 'Apply `align-items: center;` to align items evenly across heights.',
        whyNecessary: 'Prevents misaligned buttons or uneven icon baselines.',
        codeSnippet: `.navbar { align-items: center; }`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use Flexbox for 1-dimensional layouts (rows OR columns). Use CSS Grid for 2-dimensional layouts (rows AND columns).',
        'Use `gap` instead of child margin hacks.',
        'Use `flex-wrap: wrap` when designing responsive card rows.'
      ],
      structureRecommendations: [
        'Combine `display: flex` on outer layout wrappers with nested flex rows for fine-grained toolbar controls.'
      ],
      performanceConsiderations: [
        'Flexbox layout calculations are heavily optimized by modern browser rendering engines.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Trying to apply `justify-content` directly to child flex items instead of the parent container.',
        howToAvoid: '`justify-content`, `align-items`, and `gap` belong on the parent container; `flex-grow` and `align-self` belong on child items.',
        debuggingTip: 'Check which element has `display: flex` applied in DevTools.'
      },
      {
        mistake: 'Confusing the axes when `flex-direction: column` is used.',
        howToAvoid: 'When direction is column, the main axis becomes vertical (`justify-content` controls vertical spacing) and the cross axis becomes horizontal (`align-items` controls horizontal alignment).',
        debuggingTip: 'Test changing `align-items` vs `justify-content` in DevTools.'
      }
    ],
    projectApplications: [
      {
        domain: 'Header & Navigation Bars',
        description: 'Evenly spacing logos, menu links, search inputs, and profile avatars.'
      },
      {
        domain: 'Card Decks & Feature Rows',
        description: 'Creating equal-height cards where footer buttons align at the bottom across all cards.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build a navigation header with a logo on the left and 3 links on the right using `justify-content: space-between`.',
        'Center a login box perfectly in the center of the viewport using `display: flex; min-height: 100vh;`.'
      ],
      codingChallenge: {
        prompt: 'Create a 3-item pricing table using flexbox where the middle "Pro" card is highlighted and scaled larger.',
        hint: 'Use `display: flex; gap: 20px; align-items: center;`.'
      },
      miniProjectIdea: {
        title: 'Social Media Feed Card',
        description: 'Build a tweet/post card component with avatar on the left, author metadata on top, content in middle, and action buttons on bottom using nested flexbox.'
      }
    },
    summary: {
      keyPoints: [
        'Flexbox is a 1D layout model for distributing space and aligning items.',
        '`justify-content` aligns along the main axis; `align-items` aligns along the cross axis.',
        'The `gap` property provides clean spacing between flex items.'
      ],
      skillsAcquired: [
        'Ability to align and center any web element instantly.',
        'Mastery of flex axes, grow/shrink sizing, and responsive item wrapping.',
        'Proficiency in architecting responsive navbars and component toolbars.'
      ]
    },
    exercise: {
      question: 'Which property aligns flex items along the Main Axis of a flex container?',
      options: ['justify-content', 'align-items', 'align-content', 'flex-direction'],
      answer: 'justify-content'
    },
    exam: {
      question: 'When `flex-direction: column` is set, what does `justify-content: center` do?',
      options: [
        'Centers flex items vertically along the column axis',
        'Centers flex items horizontally',
        'Expands items to 100% width',
        'Reverses the item order'
      ],
      answer: 'Centers flex items vertically along the column axis'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox'
  },

  'css-4': {
    id: 'css-4',
    title: 'CSS Grid Layout',
    category: 'CSS',
    diagramType: 'grid-layout',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- CSS Grid 2-Dimensional Layout Demo -->
<div class="dashboard-grid">
  <header class="grid-header">Header (Full Width)</header>
  <aside class="grid-sidebar">Sidebar (220px)</aside>
  <main class="grid-main">
    <h2>Main Dashboard Area</h2>
    <div class="sub-grid">
      <div class="stat-card">Active Users: 1,420</div>
      <div class="stat-card">Revenue: $18,920</div>
      <div class="stat-card">Server Load: 12%</div>
    </div>
  </main>
  <footer class="grid-footer">Footer (Full Width)</footer>
</div>

<style>
  .dashboard-grid {
    font-family: sans-serif;
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    gap: 12px;
    min-height: 240px;
    background: #f8fafc;
    padding: 12px;
    border-radius: 8px;
  }

  .grid-header { grid-area: header; background: #4f46e5; color: white; padding: 12px; border-radius: 6px; font-weight: bold; }
  .grid-sidebar { grid-area: sidebar; background: #e0e7ff; color: #3730a3; padding: 12px; border-radius: 6px; font-weight: 600; }
  .grid-main { grid-area: main; background: white; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; }
  .grid-footer { grid-area: footer; background: #334155; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center; }

  .sub-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; margin-top: 10px; }
  .stat-card { background: #f1f5f9; padding: 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-align: center; }
</style>`,
    overview: {
      what: 'CSS Grid Layout is a two-dimensional layout system designed to manage both columns and rows simultaneously, allowing developers to construct complex page layouts, dashboards, and photo galleries without nested container hacks.',
      why: 'While Flexbox handles 1D rows or columns, CSS Grid orchestrates full 2D page architectures. It introduces the flexible fraction unit (`fr`), named template areas, and automatic responsive column generation (`repeat(auto-fit, minmax(...))`) without media queries.',
      whereUsed: 'Standard in dashboard interfaces, responsive photo galleries, news portal page skeletons, e-commerce catalog grids, and multi-pane SaaS applications.'
    },
    coreConcepts: [
      {
        title: 'Columns, Rows, and the `fr` Fractional Unit',
        explanation: '`grid-template-columns` and `grid-template-rows` establish the tracks of the grid. The `fr` unit represents a fraction of the available free space in the grid container.',
        terms: [
          { term: '1fr', definition: 'One fraction of available container space. `1fr 2fr` divides space into 1/3 and 2/3.' },
          { term: 'repeat(3, 1fr)', definition: 'Shorthand defining 3 columns of equal 1fr width.' },
          { term: 'minmax(200px, 1fr)', definition: 'Defines a track that never shrinks below 200px but can expand up to 1fr.' },
          { term: 'auto-fit / auto-fill', definition: 'Automatically inserts as many columns as will fit into the current container width.' }
        ],
        relationship: 'Tracks define the grid blueprint; items snap into intersecting grid cells.'
      },
      {
        title: 'Named Grid Areas (`grid-template-areas`)',
        explanation: 'Allows visual ASCII-art style mapping of layout components to named grid cells, making complex responsive layouts easy to understand and maintain.',
        terms: [
          { term: 'grid-template-areas', definition: 'Defines named rectangular areas across rows and columns.' },
          { term: 'grid-area: header', definition: 'Assigns a child element to occupy the designated named area.' }
        ],
        relationship: 'Named areas create a semantic map that can be completely rearranged on mobile screens using a single media query.'
      }
    ],
    syntaxStructure: {
      generalStructure: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

/* 2D Page Skeleton */
.app-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "nav header"
    "nav main"
    "nav footer";
}`,
      breakdown: [
        { part: 'display: grid', meaning: 'Enables 2D grid formatting context.' },
        { part: 'repeat(auto-fit, minmax(280px, 1fr))', meaning: 'Magical responsive grid: columns fit automatically without media queries.' },
        { part: 'gap: 20px', meaning: 'Creates 20px gutters between rows and columns.' }
      ],
      conventions: [
        'Use `repeat(auto-fit, minmax(min, 1fr))` for fluid responsive card grids.',
        'Use `grid-template-areas` for full-page application architectures.',
        'Always combine Grid for page layout with Flexbox for internal component alignment.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Simple 3-Column Equal Width Grid',
        description: 'Creating a 3-column layout with consistent gutters.',
        code: `<div class="features-grid">
  <div class="feat">Fast</div>
  <div class="feat">Secure</div>
  <div class="feat">Reliable</div>
</div>

<style>
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .feat { background: #f1f5f9; padding: 24px; border-radius: 8px; text-align: center; }
</style>`,
        explanation: '`repeat(3, 1fr)` automatically divides the container into 3 equal columns.'
      },
      {
        level: 'Intermediate',
        title: 'Magic Responsive Card Grid (No Media Queries!)',
        description: 'Columns automatically wrap from 4 columns to 3, 2, and 1 as viewport shrinks.',
        code: `<div class="auto-cards">
  <div class="card">Product A</div>
  <div class="card">Product B</div>
  <div class="card">Product C</div>
  <div class="card">Product D</div>
</div>

<style>
  .auto-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }
  .card { padding: 20px; background: white; border: 1px solid #cbd5e1; border-radius: 8px; }
</style>`,
        explanation: '`auto-fit` + `minmax(220px, 1fr)` dynamically calculates how many 220px columns fit on screen.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Responsive Dashboard Shell with Named Areas',
        description: 'Multi-pane dashboard layout that switches to single-column on mobile.',
        code: `<div class="dashboard">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main Content</main>
</div>

<style>
  .dashboard {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-areas: "side head" "side main";
    min-height: 100vh;
  }
  @media (max-width: 768px) {
    .dashboard {
      grid-template-columns: 1fr;
      grid-template-areas: "head" "main" "side";
    }
  }
  header { grid-area: head; }
  aside { grid-area: side; }
  main { grid-area: main; }
</style>`,
        explanation: 'Rearranging the layout on mobile is as simple as re-defining the `grid-template-areas` string inside a media query.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Define Grid Container',
        instruction: 'Apply `display: grid;` to the parent element.',
        whyNecessary: 'Establishes the grid container context.',
        codeSnippet: `.gallery { display: grid; }`
      },
      {
        step: 2,
        title: 'Set Columns and Row Tracks',
        instruction: 'Define track sizes using `grid-template-columns` and `gap`.',
        whyNecessary: 'Establishes the column widths and spacing gutters.',
        codeSnippet: `.gallery { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }`
      },
      {
        step: 3,
        title: 'Assign Child Placements (Optional)',
        instruction: 'Use `grid-column: span 2` or `grid-area` on specific featured items.',
        whyNecessary: 'Allows featured cards or banner items to stretch across multiple grid cells.',
        codeSnippet: `.featured-item { grid-column: span 2; }`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use CSS Grid for page skeletons and 2D arrays; use Flexbox for 1D inline button groups or menus.',
        'Leverage `repeat(auto-fit, minmax(...))` to minimize unnecessary media query boilerplate.',
        'Use `gap` for gutter spacing.'
      ],
      structureRecommendations: [
        'Name grid lines or grid areas when building multi-column dashboards.'
      ],
      performanceConsiderations: [
        'Grid rendering is hardware-accelerated in modern browsers; avoid creating thousands of unvirtualized grid items.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using Flexbox with complex percentage calculations (`width: calc(33.333% - 16px)`) instead of CSS Grid.',
        howToAvoid: 'Use `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;` for cleaner, robust code.',
        debuggingTip: 'Replace float/flex percentage math with grid columns.'
      },
      {
        mistake: 'Confusing `auto-fit` with `auto-fill`.',
        howToAvoid: '`auto-fit` collapses empty tracks and stretches existing items to fill the row; `auto-fill` preserves empty track columns.',
        debuggingTip: 'Use `auto-fit` for responsive card grids.'
      }
    ],
    projectApplications: [
      {
        domain: 'Analytics Dashboards',
        description: 'Arranging widgets, KPI stats, charts, and data tables in structured 2D tiles.'
      },
      {
        domain: 'Photo Galleries & Portfolios',
        description: 'Building Pinterest-style or masonry photo grids with varied column and row spans.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build a responsive photo gallery that shows 4 columns on desktop, 2 on tablet, and 1 on mobile using `auto-fit`.',
        'Create a full-screen dashboard layout with header, sidebar, main area, and footer using `grid-template-areas`.'
      ],
      codingChallenge: {
        prompt: 'Create a 4-column grid where the first card spans 2 columns and 2 rows (featured card).',
        hint: 'Use `grid-column: span 2; grid-row: span 2;` on the featured item.'
      },
      miniProjectIdea: {
        title: 'Interactive Bento Grid Showcase',
        description: 'Build a modern Bento Grid featuring interactive tiles of varying spans (1x1, 2x1, 2x2) with hover effects.'
      }
    },
    summary: {
      keyPoints: [
        'CSS Grid is a 2D layout engine managing columns and rows simultaneously.',
        'The `fr` unit and `minmax()` allow fluid, responsive column generation without media queries.',
        '`grid-template-areas` enables clear ASCII layout definitions.'
      ],
      skillsAcquired: [
        'Proficiency in building responsive multi-column layouts.',
        'Mastery of 2D page architecture with named grid areas.',
        'Ability to select appropriately between CSS Grid and Flexbox.'
      ]
    },
    exercise: {
      question: 'Which CSS Grid expression creates responsive columns that never shrink below 250px and automatically fit the screen?',
      options: [
        'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
        'grid-template-columns: 250px 1fr 1fr;',
        'grid-template-columns: repeat(3, 250px);',
        'grid-template-columns: fit-content(250px);'
      ],
      answer: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));'
    },
    exam: {
      question: 'What is the primary architectural difference between CSS Flexbox and CSS Grid?',
      options: [
        'Flexbox is 1-dimensional (row OR column), while Grid is 2-dimensional (rows AND columns simultaneously)',
        'Flexbox works only on desktop, while Grid is mobile only',
        'Grid does not support gap spacing',
        'Flexbox requires JavaScript polyfills'
      ],
      answer: 'Flexbox is 1-dimensional (row OR column), while Grid is 2-dimensional (rows AND columns simultaneously)'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids'
  },

  'css-5': {
    id: 'css-5',
    title: 'Responsive Design & Media Queries',
    category: 'CSS',
    diagramType: 'responsive-breakpoints',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- Responsive Design Demonstration -->
<div class="responsive-wrapper">
  <div class="responsive-box">
    <h3 class="device-label">Desktop View</h3>
    <p>Resize your browser window or preview to see styles adapt dynamically across breakpoints!</p>
  </div>
</div>

<style>
  .responsive-wrapper {
    font-family: sans-serif;
    padding: 16px;
  }

  .responsive-box {
    padding: 24px;
    border-radius: 12px;
    background: #e0e7ff;
    color: #3730a3;
    border: 2px solid #818cf8;
    text-align: center;
    transition: all 0.3s ease;
  }

  .device-label::before {
    content: "🖥️ ";
  }

  /* Tablet Breakpoint (Under 768px) */
  @media (max-width: 768px) {
    .responsive-box {
      background: #fef3c7;
      color: #92400e;
      border-color: #f59e0b;
    }
    .device-label { content: "📱 Tablet View"; }
    .device-label::before { content: "📱 "; }
  }

  /* Mobile Breakpoint (Under 480px) */
  @media (max-width: 480px) {
    .responsive-box {
      background: #ecfdf5;
      color: #065f46;
      border-color: #10b981;
      padding: 16px;
    }
    .device-label::before { content: "📲 "; }
  }
</style>`,
    overview: {
      what: 'Responsive Web Design (RWD) is the design methodology and technical implementation ensuring websites adapt fluidly to provide optimal viewing, readability, and interaction across all screen sizes—from small smartphones to large 4K desktop monitors.',
      why: 'Over 58% of global web traffic originates from mobile devices. If a web application is not responsive, mobile users experience broken layouts, unreadable micro-text, and horizontal scrolling, resulting in high bounce rates and search rank penalties by Google\'s mobile-first index.',
      whereUsed: 'Universal across all modern web development: SaaS dashboards, e-commerce stores, news portals, and marketing sites.'
    },
    coreConcepts: [
      {
        title: 'Mobile-First vs Desktop-First Approach',
        explanation: 'Mobile-First design writes base CSS styles optimized for mobile phones first, then uses `min-width` media queries to progressively enhance the layout as screens get wider. Desktop-First writes desktop styles and uses `max-width` queries to downscale.',
        terms: [
          { term: 'Mobile-First (`min-width`)', definition: 'Industry standard. Base styles are mobile; `@media (min-width: 768px)` adds desktop enhancements.' },
          { term: 'Desktop-First (`max-width`)', definition: 'Base styles are desktop; `@media (max-width: 768px)` overrides styles for smaller viewports.' },
          { term: 'Viewport Meta Tag', definition: '`<meta name="viewport" content="width=device-width, initial-scale=1.0">` tells mobile browsers not to zoom out.' }
        ],
        relationship: 'Mobile-first produces leaner CSS, faster mobile load times, and fewer overriding style declarations.'
      },
      {
        title: 'Fluid Typography & Viewport Units',
        explanation: 'Modern CSS uses relative units (`rem`, `em`, `%`, `vw`, `vh`, `clamp()`) to ensure text and container padding scale proportionally without brittle hardcoded pixel steps.',
        terms: [
          { term: 'rem (Root EM)', definition: 'Relative to the root `<html>` font size (default 16px). 1.5rem = 24px.' },
          { term: 'clamp(min, preferred, max)', definition: 'Calculates fluid sizing between minimum and maximum constraints (e.g. `font-size: clamp(1rem, 2.5vw, 2rem)`).' },
          { term: 'Container Queries (`@container`)', definition: 'Applies styles based on the width of the parent container rather than the global viewport.' }
        ],
        relationship: '`clamp()` delivers smooth fluid text scaling; `@container` queries allow modular responsive widgets regardless of where they are placed.'
      }
    ],
    syntaxStructure: {
      generalStructure: `/* Mobile-First CSS Architecture */

/* Base Styles (Mobile Default) */
.container {
  padding: 16px;
  font-size: 1rem;
}

/* Tablet Breakpoint (768px and up) */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    font-size: 1.125rem;
  }
}

/* Desktop Breakpoint (1024px and up) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}`,
      breakdown: [
        { part: '@media (min-width: 768px)', meaning: 'Conditional block that activates ONLY when screen width is 768px or wider.' },
        { part: 'clamp(1.2rem, 3vw, 2.5rem)', meaning: 'Fluid scaling: minimum 1.2rem, scales with viewport width, caps at 2.5rem.' }
      ],
      conventions: [
        'Standard breakpoint scale: sm (640px), md (768px), lg (1024px), xl (1280px).',
        'Always include `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.',
        'Use `rem` for typography and spacing to respect user browser font preferences.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Mobile-First Navigation Toggle',
        description: 'Stacked vertical menu on mobile that transforms into a horizontal navbar on desktop.',
        code: `<nav class="site-nav">
  <a href="#home">Home</a>
  <a href="#services">Services</a>
  <a href="#contact">Contact</a>
</nav>

<style>
  /* Mobile: Stacked column */
  .site-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Desktop (768px+): Horizontal row */
  @media (min-width: 768px) {
    .site-nav {
      flex-direction: row;
      gap: 24px;
    }
  }
</style>`,
        explanation: 'Base styles stack links vertically; media query changes direction to row on tablets and desktops.'
      },
      {
        level: 'Intermediate',
        title: 'Fluid Typography with `clamp()`',
        description: 'Scales heading font smoothly from mobile to desktop without abrupt breakpoint jumps.',
        code: `<h1 class="fluid-title">Fluid Scaled Headline</h1>

<style>
  .fluid-title {
    font-family: sans-serif;
    /* Minimum: 24px (1.5rem), Fluid: 4vw, Maximum: 48px (3rem) */
    font-size: clamp(1.5rem, 4vw, 3rem);
    color: #1e293b;
    line-height: 1.2;
  }
</style>`,
        explanation: '`clamp()` dynamically resizes the font based on viewport width while protecting minimum and maximum limits.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Responsive Card Grid with Mobile Stacking',
        description: 'Production-ready 3-column layout that gracefully collapses to 1 column on smartphones.',
        code: `<div class="pricing-deck">
  <div class="tier">Basic - $9</div>
  <div class="tier featured">Pro - $29</div>
  <div class="tier">Enterprise - $99</div>
</div>

<style>
  .pricing-deck {
    display: grid;
    grid-template-columns: 1fr; /* 1 column on mobile */
    gap: 20px;
  }
  @media (min-width: 768px) {
    .pricing-deck {
      grid-template-columns: repeat(3, 1fr); /* 3 columns on tablet/desktop */
    }
  }
  .tier { padding: 24px; border: 1px solid #cbd5e1; border-radius: 8px; }
  .featured { border-color: #6366f1; background: #eef2ff; }
</style>`,
        explanation: 'Clean mobile-first grid structure ensuring readability across all form factors.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Add the Viewport Meta Tag',
        instruction: 'Ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is inside `<head>`.',
        whyNecessary: 'Without this tag, mobile phones render desktop pages zoomed out at 980px width.',
        codeSnippet: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
      },
      {
        step: 2,
        title: 'Author Base Mobile Styles',
        instruction: 'Write your CSS assuming a 375px mobile screen: 1-column layouts, touch-friendly 44px tap targets, readable font sizes.',
        whyNecessary: 'Establishes a solid, high-performance baseline for all mobile devices.',
        codeSnippet: `.btn { min-height: 44px; padding: 12px 20px; }`
      },
      {
        step: 3,
        title: 'Add Progressive `min-width` Media Queries',
        instruction: 'Introduce media queries at key standard breakpoints (`768px`, `1024px`, `1280px`) to expand columns and increase spacing.',
        whyNecessary: 'Progressively enhances layout as screen real estate increases.',
        codeSnippet: `@media (min-width: 768px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always adopt a Mobile-First methodology (`min-width` media queries).',
        'Ensure interactive touch targets (buttons, links) are at least 44x44px on mobile screens.',
        'Use `rem` for typography and spacing rather than fixed pixels (`px`).'
      ],
      structureRecommendations: [
        'Organize media queries alongside their component styles rather than in a separate massive stylesheet at the bottom.'
      ],
      performanceConsiderations: [
        'Serve responsive images using `<picture>` or `srcset` to avoid sending 4MB desktop hero images to mobile phones on 3G networks.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Forgetting the `<meta name="viewport">` tag in HTML.',
        howToAvoid: 'Always verify `<meta name="viewport">` exists in your document `<head>`.',
        debuggingTip: 'Test in Chrome DevTools Device Mode (Ctrl+Shift+M).'
      },
      {
        mistake: 'Using fixed pixel widths (`width: 1200px;`) on container elements.',
        howToAvoid: 'Use `max-width: 1200px; width: 100%;` so containers shrink smoothly on smaller screens without horizontal scrollbars.',
        debuggingTip: 'Look for horizontal scrollbars appearing at narrow viewport widths.'
      }
    ],
    projectApplications: [
      {
        domain: 'Responsive Web Portals & E-Commerce',
        description: 'Delivering seamless mobile shopping experiences with sticky bottom purchase bars and sliding drawer menus.'
      },
      {
        domain: 'Cross-Device Web Apps',
        description: 'Adapting data tables and sidebar panels into mobile bottom navigation bars.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a responsive hero section that changes background color and typography across 3 different screen sizes.',
        'Convert a fixed 4-column layout into a mobile-first responsive layout using `min-width: 768px` and `min-width: 1024px`.'
      ],
      codingChallenge: {
        prompt: 'Build a responsive header that displays a hamburger icon on mobile (<768px) and a horizontal link menu on desktop (>=768px).',
        hint: 'Use `@media (min-width: 768px)` with `display: none` / `display: flex` toggles.'
      },
      miniProjectIdea: {
        title: 'Multi-Device Portfolio Showcase',
        description: 'Build a developer portfolio featuring a mobile drawer navigation, fluid hero text, and responsive 3-column project showcase.'
      }
    },
    summary: {
      keyPoints: [
        'Responsive Web Design ensures seamless user experiences across mobile, tablet, and desktop screens.',
        'Mobile-First design uses `min-width` queries to progressively enhance layouts.',
        '`clamp()` and relative units (`rem`, `%`) enable fluid scaling without abrupt layout jumps.'
      ],
      skillsAcquired: [
        'Proficiency with media query syntax and standard breakpoint scales.',
        'Mastery of Mobile-First CSS architecture.',
        'Ability to implement fluid typography and eliminate horizontal viewport overflow.'
      ]
    },
    exercise: {
      question: 'Which media query condition is used in a Mobile-First approach to apply styles when the screen is 768px or wider?',
      options: ['@media (min-width: 768px)', '@media (max-width: 768px)', '@media (screen: 768px)', '@media (device-width: 768px)'],
      answer: '@media (min-width: 768px)'
    },
    exam: {
      question: 'Why is the `<meta name="viewport" content="width=device-width, initial-scale=1.0">` tag required for responsive design?',
      options: [
        'It prevents mobile browsers from rendering the page at a default zoomed-out desktop width (e.g. 980px)',
        'It speeds up JavaScript execution on mobile devices',
        'It automatically converts CSS Grid into Flexbox on mobile',
        'It downloads smaller images automatically'
      ],
      answer: 'It prevents mobile browsers from rendering the page at a default zoomed-out desktop width (e.g. 980px)'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design'
  },

  'css-6': {
    id: 'css-6',
    title: 'CSS Transitions & Animations',
    category: 'CSS',
    diagramType: 'css-animation',
    hasPlayground: true,
    codeLanguage: 'html',
    codeType: 'html',
    codeSnippet: `<!-- CSS Transitions & Keyframe Animations -->
<div class="anim-container">
  <button class="pulse-btn">Hover & Pulse Me</button>
  <div class="spinner"></div>
</div>

<style>
  .anim-container {
    font-family: sans-serif;
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 20px;
  }

  /* Transition Property */
  .pulse-btn {
    background: #6366f1;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    /* transition: property duration timing-function delay */
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .pulse-btn:hover {
    background: #4f46e5;
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
  }

  .pulse-btn:active {
    transform: translateY(0) scale(0.98);
  }

  /* Keyframe Continuous Animation */
  .spinner {
    width: 36px;
    height: 36px;
    border: 4px solid #e0e7ff;
    border-top: 4px solid #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>`,
    overview: {
      what: 'CSS Transitions and Keyframe Animations allow developers to smoothly animate changes in CSS properties over time, bringing user interfaces to life with interactive micro-animations, loading spinners, and modal dialog transitions without relying on heavy JavaScript animation libraries.',
      why: 'Smooth micro-interactions provide crucial visual feedback, increase perceived application performance, guide user attention during state changes (e.g. alerts, modals, deletions), and create a polished, modern product experience.',
      whereUsed: 'Essential across all modern web apps: button hover effects, toast notifications, loading skeletons, modal entrance/exit transitions, and page route animations.'
    },
    coreConcepts: [
      {
        title: 'Transitions vs Keyframe Animations',
        explanation: 'Transitions animate between two distinct states (e.g. default state to `:hover` state). Keyframe animations (`@keyframes`) allow multi-step, repeating, or automatic animations between multiple percentage waypoints.',
        terms: [
          { term: 'transition', definition: 'Smooth interpolation between two states triggered by an event (e.g. `:hover`, `:focus`, class toggle).' },
          { term: '@keyframes', definition: 'Defines animation milestones from 0% (start) to 100% (finish) with intermediate steps.' },
          { term: 'timing-function', definition: 'Mathematical easing curve (linear, ease, ease-in-out, cubic-bezier) controlling acceleration.' }
        ],
        relationship: 'Transitions require a trigger state change; `@keyframes` can play continuously or cycle automatically.'
      },
      {
        title: 'Hardware Acceleration & 60fps Performance',
        explanation: 'Browsers animate certain properties on the GPU compositor thread without triggering expensive CPU layout recalculations or paint reflows.',
        terms: [
          { term: 'Cheap Properties (GPU)', definition: '`transform` (translate, scale, rotate) and `opacity`. These run at 60fps / 120fps smoothly.' },
          { term: 'Expensive Properties (CPU)', definition: '`width`, `height`, `margin`, `padding`, `top`, `left`. Modifying these forces browser layout reflows.' },
          { term: 'prefers-reduced-motion', definition: 'CSS media query respecting accessibility settings for users who experience vestibular motion sensitivity.' }
        ],
        relationship: 'Always animate `transform` and `opacity` for butter-smooth UI performance.'
      }
    ],
    syntaxStructure: {
      generalStructure: `/* Transition Syntax */
.element {
  /* property | duration | timing-function | delay */
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.element:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* Keyframe Animation Syntax */
@keyframes slideInFade {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-dialog {
  animation: slideInFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}`,
      breakdown: [
        { part: 'transition: transform 0.3s ease-out', meaning: 'Interpolates transform changes over 300 milliseconds with an ease-out deceleration.' },
        { part: '@keyframes slideInFade', meaning: 'Declares custom animation name with 0% and 100% style waypoints.' },
        { part: 'forwards', meaning: 'Retains the final 100% frame styles after the animation finishes playing.' }
      ],
      conventions: [
        'Always animate `transform` and `opacity` rather than `top`, `left`, `width`, or `height`.',
        'Keep micro-interaction durations under 300ms so the interface feels snappy and responsive.',
        'Always provide a `@media (prefers-reduced-motion: reduce)` fallback for accessibility.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Interactive Button Hover Lift',
        description: 'Smooth hover transition that lifts the button slightly and adds a shadow.',
        code: `<button class="btn-lift">Click Me</button>

<style>
  .btn-lift {
    background: #4f46e5;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .btn-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }
</style>`,
        explanation: 'Uses GPU-accelerated `transform: translateY()` for instant, stutter-free user feedback.'
      },
      {
        level: 'Intermediate',
        title: 'Infinite Circular Loading Spinner',
        description: 'Pure CSS loading spinner running on an infinite rotation loop.',
        code: `<div class="loader-ring"></div>

<style>
  .loader-ring {
    width: 32px;
    height: 32px;
    border: 3px solid #e2e8f0;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: rotateLoop 0.75s linear infinite;
  }
  @keyframes rotateLoop {
    to { transform: rotate(360deg); }
  }
</style>`,
        explanation: 'Linear timing function ensures continuous rotation speed without pauses.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Toast Notification Entrance Animation with Reduced-Motion Support',
        description: 'Slide-in toast alert with accessibility compliance.',
        code: `<div class="toast-alert">✓ Changes saved successfully!</div>

<style>
  .toast-alert {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 12px 20px;
    background: #10b981;
    color: white;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    animation: toastSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes toastSlide {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Accessibility: Disable motion for sensitive users */
  @media (prefers-reduced-motion: reduce) {
    .toast-alert {
      animation: none;
      opacity: 1;
    }
  }
</style>`,
        explanation: 'Combines elegant cubic-bezier easing with an accessible reduced-motion safeguard.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Identify Target Property to Animate',
        instruction: 'Choose properties that run on the GPU (`transform` and `opacity`).',
        whyNecessary: 'Prevents frame drops and sluggish animation performance on mobile devices.',
        codeSnippet: `/* Use transform instead of top/left */`
      },
      {
        step: 2,
        title: 'Configure Transition Duration & Easing',
        instruction: 'Apply `transition: transform 0.2s ease-out;` on the base selector (NOT inside the `:hover` pseudo-class).',
        whyNecessary: 'Placing the transition on the base selector ensures the reverse animation plays smoothly when the cursor leaves.',
        codeSnippet: `.card { transition: transform 0.2s ease; }\n.card:hover { transform: scale(1.02); }`
      },
      {
        step: 3,
        title: 'Add `@media (prefers-reduced-motion)` Fallback',
        instruction: 'Wrap intensive animations with a reduced-motion check.',
        whyNecessary: 'Ensures compliance with accessibility guidelines (WCAG 2.1).',
        codeSnippet: `@media (prefers-reduced-motion: reduce) {\n  * { animation-duration: 0.01ms !important; }\n}`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Keep micro-interaction durations between 150ms and 300ms.',
        'Always animate `transform` and `opacity` to avoid triggering layout reflows.',
        'Respect user accessibility preferences with `@media (prefers-reduced-motion)`.'
      ],
      structureRecommendations: [
        'Store standard transition durations and easing curves in CSS custom properties (`--transition-fast: 150ms ease`).'
      ],
      performanceConsiderations: [
        'Use `will-change: transform` sparingly on complex elements only when performance issues arise.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Animating `height: 0` to `height: auto` using transitions (CSS transitions cannot interpolate to `auto`).',
        howToAvoid: 'Use `grid-template-rows: 0fr` to `1fr` with CSS Grid to animate accordion heights smoothly.',
        debuggingTip: 'Test accordion height animations using CSS Grid tracks.'
      },
      {
        mistake: 'Placing the `transition` declaration inside the `:hover` block instead of the base element.',
        howToAvoid: 'Always declare `transition` on the default component class so the exit animation works.',
        debuggingTip: 'Move `transition: ...` up to `.button` instead of `.button:hover`.'
      }
    ],
    projectApplications: [
      {
        domain: 'Mobile App Bottom Sheets & Modals',
        description: 'Smoothly sliding dialog windows up from the bottom of the screen.'
      },
      {
        domain: 'Data Loading Skeletons & Spinners',
        description: 'Displaying shimmering placeholder cards while API data is being fetched.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build a card that lifts up and adds a glow shadow when hovered over.',
        'Create a pulsating badge (scale from 1 to 1.08) that loops indefinitely.'
      ],
      codingChallenge: {
        prompt: 'Build a slide-out drawer menu that animates from `transform: translateX(-100%)` to `translateX(0)` when a class `.open` is added.',
        hint: 'Use `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);`.'
      },
      miniProjectIdea: {
        title: 'Interactive Toast Notification System',
        description: 'Build a notification component with enter slide-in, countdown progress bar, and exit fade animations.'
      }
    },
    summary: {
      keyPoints: [
        'Transitions animate state changes; Keyframes handle multi-step and continuous animations.',
        'GPU-accelerated properties (`transform`, `opacity`) run smoothly at 60fps without layout lag.',
        'Accessibility requires respecting `@media (prefers-reduced-motion)`.'
      ],
      skillsAcquired: [
        'Proficiency in building high-performance CSS transitions.',
        'Mastery of `@keyframes` animation syntax and easing functions.',
        'Understanding of GPU compositor optimization and accessibility standards.'
      ]
    },
    exercise: {
      question: 'Which CSS properties are hardware-accelerated by the GPU and best suited for smooth 60fps animations?',
      options: ['transform and opacity', 'width and height', 'margin and padding', 'top and left'],
      answer: 'transform and opacity'
    },
    exam: {
      question: 'What happens if a `transition` property is placed ONLY inside a `:hover` rule instead of the base element class?',
      options: [
        'The hover enter will animate, but the exit will snap abruptly without any smooth transition',
        'The animation will fail to play entirely',
        'The browser throws a CSS parse warning',
        'The animation runs in reverse'
      ],
      answer: 'The hover enter will animate, but the exit will snap abruptly without any smooth transition'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/CSS_transitions'
  }
};
