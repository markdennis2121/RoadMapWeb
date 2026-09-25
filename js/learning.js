export const LEARNING_CONTENT = {
  'html-1': {
    lesson: 'HTML gives a page structure through elements such as headings, paragraphs, links, and lists.',
    points: ['Use semantic elements to describe the purpose of content.', 'A document normally starts with a doctype and an html element.', 'Headings should follow a meaningful hierarchy from h1 to h6.'],
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content',
    exercise: { question: 'Which element represents the main heading?', options: ['<h1>', '<p>', '<main>'], answer: '<h1>' },
    exam: { question: 'Which element is intended for the primary content of a page?', options: ['<main>', '<section>', '<div>'], answer: '<main>' }
  },
  'css-1': {
    lesson: 'CSS selectors target elements so you can apply styles. Specificity determines which matching rule wins.',
    points: ['Element selectors target tags such as p.', 'Class selectors can be reused across many elements.', 'ID selectors are more specific and should be used sparingly for styling.'],
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors',
    exercise: { question: 'Which selector targets every paragraph?', options: ['p', '.p', '#p'], answer: 'p' },
    exam: { question: 'Which selector has the highest specificity?', options: ['An element selector', 'A class selector', 'An ID selector'], answer: 'An ID selector' }
  },
  'js-1': {
    lesson: 'Variables give names to values. Use const when a binding does not need reassignment and let when it does.',
    points: ['const prevents reassignment of the binding.', 'let is useful when a value must change.', 'Prefer clear names that describe the value being stored.'],
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables',
    exercise: { question: 'Which keyword declares a reassignment-safe binding?', options: ['const', 'let', 'static'], answer: 'const' },
    exam: { question: 'Which keyword should you normally prefer for a value that will not be reassigned?', options: ['var', 'let', 'const'], answer: 'const' }
  },
  'react-1': {
    lesson: 'React components are reusable UI functions. JSX lets a component describe the UI it should render.',
    points: ['A component should have one clear responsibility.', 'Component names start with an uppercase letter.', 'JSX combines JavaScript expressions with HTML-like markup.'],
    materialUrl: 'https://react.dev/learn/your-first-component',
    exercise: { question: 'What does a React component return?', options: ['UI', 'A database row', 'A CSS file'], answer: 'UI' },
    exam: { question: 'Which syntax is commonly used to describe React UI?', options: ['JSX', 'SQL', 'YAML'], answer: 'JSX' }
  }
};

export function getLearningContent(topicId, title) {
  if (LEARNING_CONTENT[topicId]) return LEARNING_CONTENT[topicId];

  const [area] = topicId.split('-');
  const curriculum = {
    html: {
      lesson: `${title} helps you build accessible, meaningful page structure with HTML.`,
      points: ['Choose elements for their meaning, not only their visual appearance.', 'Keep related content grouped and use valid nesting.', 'Check the result with the browser inspector and an accessibility mindset.'],
      reference: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content'
    },
    css: {
      lesson: `${title} is part of the styling system that controls how a page looks and responds to different screens.`,
      points: ['Start with a predictable box model and clear layout rules.', 'Prefer reusable classes and responsive constraints.', 'Inspect computed styles when a rule does not behave as expected.'],
      reference: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics'
    },
    js: {
      lesson: `${title} is a JavaScript skill used to make browser applications interactive and reliable.`,
      points: ['Break the problem into small named operations.', 'Use clear data flow and handle invalid or missing input.', 'Test the behavior in the console with small examples before combining it.'],
      reference: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting'
    },
    git: {
      lesson: `${title} helps you record, share, and safely evolve a project with version control.`,
      points: ['Make focused commits that explain one change.', 'Inspect the current state before changing history.', 'Use branches and pull requests to review work safely.'],
      reference: 'https://git-scm.com/docs'
    },
    react: {
      lesson: `${title} is a React concept that helps you compose maintainable user interfaces from predictable components.`,
      points: ['Keep components focused on one responsibility.', 'Make data flow explicit through props and state.', 'Use the browser and React tools to inspect the rendered result.'],
      reference: 'https://react.dev/learn'
    },
    node: {
      lesson: `${title} is a Node.js skill used to build dependable JavaScript tools and web services.`,
      points: ['Keep input, business logic, and output responsibilities separate.', 'Handle asynchronous work and failures explicitly.', 'Use package scripts and environment configuration consistently.'],
      reference: 'https://nodejs.org/en/learn'
    }
  }[area] || {
    lesson: `${title} is an important step in your roadmap.`,
    points: [`Understand the core ideas behind ${title}.`, `Practice ${title} with a small example.`, `Apply ${title} in one of your projects.`],
    reference: `https://www.google.com/search?q=${encodeURIComponent(`${title} web development tutorial`)}`
  };

  return {
    lesson: curriculum.lesson,
    points: curriculum.points,
    materialUrl: curriculum.reference,
    exercise: { question: `Which approach best supports learning ${title}?`, options: ['Practice with a small example', 'Skip practice', 'Change unrelated code'], answer: 'Practice with a small example' },
    exam: { question: `What should you do after learning ${title}?`, options: ['Apply it in a project', 'Never test it', 'Delete the example'], answer: 'Apply it in a project' }
  };
}
