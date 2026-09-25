const topic = (id, title) => ({ id, title, status: 'Not Started' });

const LEGACY_CATEGORIES = {
  html: {
    id: 'html', name: 'HTML', topics: [
      topic('html-1', 'Basics & Emmet'), topic('html-2', 'Forms & Validations'),
      topic('html-3', 'Semantic HTML'), topic('html-4', 'SEO Basics')
    ]
  },
  css: {
    id: 'css', name: 'CSS', topics: [
      topic('css-1', 'Selectors & Specificity'), topic('css-2', 'Box Model'),
      topic('css-3', 'Flexbox'), topic('css-4', 'Grid'),
      topic('css-5', 'Responsive Design'), topic('css-6', 'Animations')
    ]
  },
  js: {
    id: 'javascript', name: 'JavaScript', topics: [
      topic('js-introduction', 'Introduction'), topic('js-1', 'Variables'),
      topic('js-2', 'Data Types'),
      topic('js-3', 'Operators'), topic('js-input-output', 'Input & Output'),
      topic('js-4', 'Conditional Statements'), topic('js-5', 'Loops'),
      topic('js-6', 'Functions'), topic('js-7', 'Arrays & Collections'),
      topic('js-problem-solving', 'Problem Solving'), topic('js-debugging', 'Debugging'),
      topic('js-oop-introduction', 'OOP Introduction'), topic('js-oop-core-concepts', 'Core OOP Concepts'),
      topic('js-oop-principles', 'OOP Principles'), topic('js-12', 'Language-Specific Features: ES6'),
      topic('js-8', 'Objects'), topic('js-9', 'DOM Manipulation'), topic('js-10', 'Events'),
      topic('js-11', 'Forms'), topic('js-13', 'Fetch API'), topic('js-14', 'Async/Await'),
      topic('js-15', 'JSON'), topic('js-small-projects', 'Small Projects'),
      topic('js-final-projects', 'Final Projects')
    ]
  },
  git: {
    id: 'version-control', name: 'Version Control', topics: [
      topic('git-1', 'Git Basics'), topic('github-foundations', 'GitHub'),
      topic('git-2', 'Branches & Merging'), topic('git-3', 'Pull Requests')
    ]
  },
  react: {
    id: 'react', name: 'React', topics: [
      topic('react-1', 'Components & JSX'), topic('react-2', 'State & Props'),
      topic('react-3', 'Hooks (useState, useEffect)'), topic('react-4', 'Routing')
    ]
  },
  node: {
    id: 'node', name: 'Node.js', topics: [
      topic('node-1', 'NPM & Package.json'), topic('node-2', 'Modules'),
      topic('node-3', 'Express Basics'), topic('node-4', 'RESTful APIs')
    ]
  }
};

const LANGUAGE_PATHS = [
  ['csharp', 'C#'], ['java', 'Java'], ['go', 'Go'], ['ruby', 'Ruby'],
  ['python', 'Python'], ['php', 'PHP'], ['cpp', 'C++'], ['c', 'C']
];

const LANGUAGE_SEQUENCE = [
  ['introduction', 'Introduction'],
  ['variables-data-types', 'Variables & Data Types'],
  ['operators', 'Operators'],
  ['input-output', 'Input & Output'],
  ['conditional-statements', 'Conditional Statements'],
  ['loops', 'Loops'],
  ['functions', 'Functions'],
  ['arrays-collections', 'Arrays & Collections'],
  ['problem-solving', 'Problem Solving'],
  ['debugging', 'Debugging'],
  ['oop-introduction', 'OOP Introduction'],
  ['oop-core-concepts', 'Core OOP Concepts'],
  ['oop-principles', 'OOP Principles'],
  ['language-specific-features', 'Language-Specific Features'],
  ['small-projects', 'Small Projects'],
  ['final-projects', 'Final Projects']
];

const languageCategory = ([id, name]) => ({
  id,
  name,
  topics: LANGUAGE_SEQUENCE.map(([slug, title]) => topic(`${id}-${slug}`, title))
});

export const DEFAULT_DATA = {
  categories: [
    LEGACY_CATEGORIES.js,
    ...LANGUAGE_PATHS.map(languageCategory),
    {
      id: 'web-development-path', name: 'Web Development Path',
      topics: [
        ...LEGACY_CATEGORIES.html.topics,
        ...LEGACY_CATEGORIES.css.topics,
        topic('javascript-path', 'JavaScript'),
        ...LEGACY_CATEGORIES.react.topics,
        topic('node-web-path', 'Node.js')
      ]
    },
    LEGACY_CATEGORIES.git,
    {
      id: 'backend-path', name: 'Backend Path',
      topics: [
        topic('node-backend-path', 'Node.js'), topic('php-backend-path', 'PHP'),
        topic('python-path', 'Python'), topic('go-path', 'Go'),
        ...LEGACY_CATEGORIES.node.topics,
        topic('backend-rest-api-design', 'REST API Design'),
        topic('backend-databases', 'Databases'),
        topic('backend-authentication', 'Authentication')
      ]
    },
    {
      id: 'software-development-path', name: 'Software Development Path',
      topics: [
        topic('csharp-path', 'C#'), topic('java-path', 'Java'), topic('cpp-path', 'C++'),
        topic('software-design-patterns', 'Design Patterns'),
        topic('software-testing', 'Testing & Quality'),
        topic('software-architecture', 'Software Architecture')
      ]
    },
    {
      id: 'data-science-path', name: 'Data Science Path',
      topics: [
        topic('python-data-science-path', 'Python'),
        topic('data-science-numpy', 'NumPy'), topic('data-science-pandas', 'Pandas'),
        topic('data-science-machine-learning', 'Machine Learning')
      ]
    }
  ],
  projects: [
    ['proj-1', 'Light Bulb App'], ['proj-2', 'Calculator'], ['proj-3', 'Counter App'],
    ['proj-4', 'Digital Clock'], ['proj-5', 'To-Do List'], ['proj-6', 'Image Slider'],
    ['proj-7', 'Quiz App'], ['proj-8', 'Weather App']
  ].map(([id, title]) => ({ ...topic(id, title), completedDate: null }))
};
