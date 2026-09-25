import { HTML_CURRICULUM } from './curriculum/htmlCurriculum.js';
import { CSS_CURRICULUM } from './curriculum/cssCurriculum.js';
import { JS_CURRICULUM } from './curriculum/jsCurriculum.js';
import { GIT_CURRICULUM } from './curriculum/gitCurriculum.js';
import { REACT_CURRICULUM } from './curriculum/reactCurriculum.js';
import { NODE_CURRICULUM } from './curriculum/nodeCurriculum.js';

// Unified Comprehensive Curriculum Master Dictionary (All 36 Roadmap Topics)
export const LEARNING_CONTENT = {
  ...HTML_CURRICULUM,
  ...CSS_CURRICULUM,
  ...JS_CURRICULUM,
  ...GIT_CURRICULUM,
  ...REACT_CURRICULUM,
  ...NODE_CURRICULUM
};

/**
 * Fisher-Yates shuffle algorithm to randomize quiz option positions.
 * Ensures the correct answer is evenly distributed across positions A, B, C, D
 * while preserving exact answer string validation.
 */
export function shuffleQuizOptions(quiz) {
  if (!quiz || !quiz.options || !Array.isArray(quiz.options)) return quiz;
  
  const options = [...quiz.options];
  const answer = quiz.answer;

  // Guarantee correct answer is present in options list
  if (answer && !options.includes(answer)) {
    options.push(answer);
  }

  // Fisher-Yates Shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    ...quiz,
    options,
    answer
  };
}

/**
 * Retrieves comprehensive curriculum data for a given topic.
 * If the topic is custom or newly created, generates a structured 10-section tutorial dynamically.
 */
export function getLearningContent(topicId, title = 'Topic') {
  if (LEARNING_CONTENT[topicId]) {
    return normalizeContent(LEARNING_CONTENT[topicId], title);
  }

  // Fallback dynamic generator for user-added custom topics
  const area = topicId.split('-')[0];
  const isCodeJs = ['js', 'react', 'node'].includes(area);
  const isCss = area === 'css';
  const isHtml = area === 'html';

  const defaultCode = isCodeJs
    ? `// Interactive JavaScript Playground: ${title}\nconsole.log("Exploring: ${title}");\nconst isReady = true;\nif (isReady) {\n  console.log("Practice code execution live!");\n}`
    : isCss || isHtml
    ? `<div class="custom-card">\n  <h2>${title}</h2>\n  <p>Live interactive preview for ${title}.</p>\n</div>\n\n<style>\n  .custom-card {\n    font-family: sans-serif;\n    padding: 20px;\n    background: #eef2ff;\n    border-radius: 10px;\n    border: 1px solid #c7d2fe;\n    color: #3730a3;\n  }\n</style>`
    : null;

  return normalizeContent({
    id: topicId,
    title,
    category: area.toUpperCase(),
    diagramType: isCodeJs ? 'api-flow' : isCss ? 'box-model' : 'generic-roadmap',
    hasPlayground: Boolean(defaultCode),
    codeLanguage: isCodeJs ? 'javascript' : 'html',
    codeType: isCodeJs ? 'js' : 'html',
    codeSnippet: defaultCode,
    overview: {
      what: `${title} is an essential milestone in the modern full-stack web development curriculum.`,
      why: `Understanding ${title} provides foundational knowledge necessary for writing clean, efficient, and maintainable software applications.`,
      whereUsed: `Used in production software systems, web applications, and developer workflows.`
    },
    coreConcepts: [
      {
        title: `Core Fundamentals of ${title}`,
        explanation: `Mastering the underlying mechanics and principles behind ${title} enables developers to solve complex real-world engineering challenges.`,
        terms: [
          { term: 'Primary Concept', definition: `The central principle governing how ${title} works.` },
          { term: 'Key Rule', definition: `Best practice convention to follow when implementing ${title}.` }
        ],
        relationship: `Connects foundational knowledge with real-world application.`
      }
    ],
    syntaxStructure: {
      generalStructure: `// ${title} Implementation Pattern\nfunction run() {\n  console.log("Mastering ${title}");\n}`,
      breakdown: [
        { part: 'Implementation', meaning: `Standard approach to applying ${title}.` }
      ],
      conventions: [
        `Follow modern industry standard practices when implementing ${title}.`,
        `Write clean, self-documenting code with clear variable and function names.`
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: `Introductory ${title} Example`,
        description: `Basic implementation demonstrating core concepts.`,
        code: defaultCode || `// Study and apply ${title}`,
        explanation: `Demonstrates initial setup and basic usage.`
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Understand the Core Requirement',
        instruction: `Review why ${title} is required in the application architecture.`,
        whyNecessary: 'Ensures clear mental model before writing code.',
        codeSnippet: `// Step 1: Planning`
      },
      {
        step: 2,
        title: 'Implement and Test Locally',
        instruction: `Write the implementation and verify behavior in the live code playground or terminal.`,
        whyNecessary: 'Validates that the code behaves as expected without edge case bugs.',
        codeSnippet: `// Step 2: Testing`
      }
    ],
    bestPractices: {
      industryStandards: [
        `Follow standardized naming conventions and modular organization.`,
        `Write comprehensive unit tests for all critical logic paths.`
      ],
      structureRecommendations: [
        `Keep components and utilities small, focused, and single-purpose.`
      ],
      performanceConsiderations: [
        `Optimize execution pathways and avoid redundant computations.`
      ]
    },
    commonMistakes: [
      {
        mistake: `Skipping foundational verification before applying ${title} in production.`,
        howToAvoid: `Always test edge cases and error handling.`,
        debuggingTip: `Inspect console output and error logs.`
      }
    ],
    projectApplications: [
      {
        domain: 'Web Application Development',
        description: `Applying ${title} to build scalable, responsive user interfaces and backend services.`
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        `Experiment with ${title} in the interactive playground above.`,
        `Apply ${title} directly in a personal portfolio or side project.`
      ],
      codingChallenge: {
        prompt: `Create a working implementation demonstrating ${title}.`,
        hint: `Review the code examples and core concepts above.`
      },
      miniProjectIdea: {
        title: `${title} Project Integration`,
        description: `Build a mini application showcasing ${title}.`
      }
    },
    summary: {
      keyPoints: [
        `Acquired fundamental knowledge and syntax mechanics of ${title}.`,
        `Understood best practices, common pitfalls, and real-world project applications.`
      ],
      skillsAcquired: [
        `Ability to implement and debug ${title} in production codebases.`
      ]
    },
    exercise: {
      question: `Which approach best supports learning and applying ${title}?`,
      options: [
        'Understand the core concepts, review practical examples, and test in projects',
        'Memorize syntax without understanding concepts',
        'Skip to advanced topics without practicing',
        'Copy code from internet forums without reading explanations'
      ],
      answer: 'Understand the core concepts, review practical examples, and test in projects'
    },
    exam: {
      question: `What should you do after learning the fundamentals of ${title}?`,
      options: [
        'Apply it in a hands-on project, review edge cases, and test thoroughly',
        'Never verify or test the implementation',
        'Delete the code and avoid version control',
        'Ignore syntax errors and deploy broken code to production'
      ],
      answer: 'Apply it in a hands-on project, review edge cases, and test thoroughly'
    },
    materialUrl: `https://www.google.com/search?q=${encodeURIComponent(`${title} web development tutorial`)}`
  }, title);
}

/**
 * Normalizes content to ensure backward compatibility with both legacy simple properties
 * and the rich 10-section comprehensive schema.
 */
function normalizeContent(raw, title) {
  const what = raw.overview?.what || (typeof raw.overview === 'string' ? raw.overview : `${title} is a core web development concept.`);
  const why = raw.overview?.why || 'Essential for building reliable modern web applications.';
  const whereUsed = raw.overview?.whereUsed || 'Used across modern full-stack web software.';

  // Backward compatibility fields for legacy views
  const points = raw.points || (raw.summary?.keyPoints) || [what, why, whereUsed];
  const proTips = raw.proTips || (raw.bestPractices?.industryStandards) || ['Practice regularly to build permanent muscle memory.'];
  const lesson = typeof raw.lesson === 'string' ? raw.lesson : `${what} ${why}`;

  const rawExercise = raw.exercise || {
    question: `What is the primary purpose of ${title}?`,
    options: [
      'To provide structural, styling, or functional capabilities in web applications',
      'To organize project files and system architecture',
      'To handle user interactions and interface state',
      'To manage network routing and data serialization'
    ],
    answer: 'To provide structural, styling, or functional capabilities in web applications'
  };

  const rawExam = raw.exam || {
    question: `How should you apply ${title} in production projects?`,
    options: [
      'Follow industry standard best practices and test thoroughly',
      'Configure build tools and optimize production bundles',
      'Refactor components into modular, single-responsibility units',
      'Benchmark performance metrics across target devices'
    ],
    answer: 'Follow industry standard best practices and test thoroughly'
  };

  return {
    ...raw,
    lesson,
    points,
    proTips,
    overview: typeof raw.overview === 'object' ? raw.overview : { what, why, whereUsed },
    coreConcepts: raw.coreConcepts || [],
    syntaxStructure: raw.syntaxStructure || { generalStructure: raw.codeSnippet || '', breakdown: [], conventions: [] },
    practicalExamples: raw.practicalExamples || [],
    implementationSteps: raw.implementationSteps || [],
    bestPractices: raw.bestPractices || { industryStandards: proTips, structureRecommendations: [], performanceConsiderations: [] },
    commonMistakes: raw.commonMistakes || [],
    projectApplications: raw.projectApplications || [],
    handsOnExercises: raw.handsOnExercises || { practiceTasks: [], codingChallenge: { prompt: '', hint: '' }, miniProjectIdea: { title: '', description: '' } },
    summary: raw.summary || { keyPoints: points, skillsAcquired: [] },
    exercise: shuffleQuizOptions(rawExercise),
    exam: shuffleQuizOptions(rawExam)
  };
}
