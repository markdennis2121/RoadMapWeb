import { HTML_CURRICULUM } from './curriculum/htmlCurriculum.js';
import { CSS_CURRICULUM } from './curriculum/cssCurriculum.js';
import { JS_CURRICULUM } from './curriculum/jsCurriculum.js';
import { GIT_CURRICULUM } from './curriculum/gitCurriculum.js';
import { REACT_CURRICULUM } from './curriculum/reactCurriculum.js';
import { NODE_CURRICULUM } from './curriculum/nodeCurriculum.js';
import { getLanguageTrackLesson, getSupplementaryLesson } from './curriculum/languageTrackLessons.js';

// Unified Comprehensive Curriculum Master Dictionary (All 36 Roadmap Topics)
export const LEARNING_CONTENT = {
  ...HTML_CURRICULUM,
  ...CSS_CURRICULUM,
  ...JS_CURRICULUM,
  ...GIT_CURRICULUM,
  ...REACT_CURRICULUM,
  ...NODE_CURRICULUM
};

const PROGRAMMING_LANGUAGE_INTROS = {
  js: {
    name: 'JavaScript',
    codeLanguage: 'javascript',
    example: 'const message = "Hello, world!";\nconsole.log(message);',
    what: 'JavaScript is a dynamic programming language used to build interactive websites, server applications, and tools.',
    why: 'It runs in every major browser and can also run on servers through runtimes such as Node.js.'
  },
  csharp: {
    name: 'C#',
    codeLanguage: 'csharp',
    example: 'using System;\n\nConsole.WriteLine("Hello, world!");',
    what: 'C# is a strongly typed, object-oriented language in the .NET ecosystem. It supports desktop, web, cloud, and game development.',
    why: 'C# combines expressive syntax with runtime safety, a large standard library, and mature development tools.'
  },
  java: {
    name: 'Java',
    codeLanguage: 'java',
    example: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}',
    what: 'Java is a statically typed, object-oriented language that runs on the Java Virtual Machine (JVM).',
    why: 'Java is widely used for backend services, business software, Android development, and large cross-platform systems.'
  },
  go: {
    name: 'Go',
    codeLanguage: 'go',
    example: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, world!")\n}',
    what: 'Go is a compiled, statically typed language designed for clear, efficient software and built-in concurrency.',
    why: 'Go is a practical choice for network services, command-line tools, cloud infrastructure, and distributed systems.'
  },
  ruby: {
    name: 'Ruby',
    codeLanguage: 'ruby',
    example: 'message = "Hello, world!"\nputs message',
    what: 'Ruby is a dynamic, object-oriented language designed for readable and expressive programming.',
    why: 'Ruby supports rapid application development and is well known for web development with Ruby on Rails.'
  },
  python: {
    name: 'Python',
    codeLanguage: 'python',
    example: 'message = "Hello, world!"\nprint(message)',
    what: 'Python is a readable, high-level language used in web services, automation, data analysis, and machine learning.',
    why: 'Python lets beginners and experienced developers express ideas with concise syntax and a broad ecosystem of libraries.'
  },
  php: {
    name: 'PHP',
    codeLanguage: 'php',
    example: '<?php\n$message = "Hello, world!";\necho $message;\n',
    what: 'PHP is a server-side scripting language commonly used to build dynamic websites and web APIs.',
    why: 'PHP integrates naturally with web servers and databases and powers many content management systems and web applications.'
  },
  cpp: {
    name: 'C++',
    codeLanguage: 'cpp',
    example: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!\\n";\n    return 0;\n}',
    what: 'C++ is a compiled, general-purpose language that provides object-oriented and low-level programming features.',
    why: 'C++ is used when software needs fine-grained control over performance, memory, or hardware resources.'
  },
  c: {
    name: 'C',
    codeLanguage: 'c',
    example: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, world!\\n");\n    return 0;\n}',
    what: 'C is a compiled procedural language that gives programmers direct control over memory and system resources.',
    why: 'C is foundational in operating systems, embedded software, device drivers, and performance-sensitive libraries.'
  }
};

const LANGUAGE_TOPIC_GUIDANCE = {
  introduction: 'Start by learning what a program is, how this language runs, and how to execute a small first example.',
  'variables-data-types': 'Learn how to name values, choose appropriate data types, and understand how the language represents data.',
  operators: 'Use arithmetic, comparison, and logical operators to calculate values and build conditions.',
  'input-output': 'Practice reading input from a user or source and presenting useful output.',
  'conditional-statements': 'Use if/else and the language’s selection constructs to choose behavior from a condition.',
  loops: 'Repeat work safely with loops, understand when each loop form is useful, and avoid accidental infinite loops.',
  functions: 'Group reusable work into functions, pass values with parameters, return results, and keep responsibilities focused.',
  'arrays-collections': 'Store and process groups of values, select a suitable collection, and iterate over its contents.',
  'problem-solving': 'Break a problem into smaller steps, write an algorithm, and trace it with a small example before coding.',
  debugging: 'Reproduce a problem, inspect program state, isolate the cause, and confirm the fix with a repeatable check.',
  'oop-introduction': 'Understand why object-oriented programming groups related state and behavior into objects.',
  'oop-core-concepts': 'Connect classes, objects, fields or attributes, methods, and constructors in a small model.',
  'oop-principles': 'Apply encapsulation, inheritance, polymorphism, and abstraction where they make a design clearer.',
  'language-specific-features': 'Explore the features and idioms that distinguish this language, and learn when they are useful.',
  'small-projects': 'Combine the concepts from earlier lessons in short projects with a clear goal and manageable scope.',
  'final-projects': 'Plan and build a complete project that demonstrates the language fundamentals and includes tested edge cases.'
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

  const languageTrackLesson = getLanguageTrackLesson(topicId, title);
  if (languageTrackLesson) return normalizeContent(languageTrackLesson, title);

  const supplementaryLesson = getSupplementaryLesson(topicId);
  if (supplementaryLesson) return normalizeContent(supplementaryLesson, title);

  // Fallback dynamic generator for user-added custom topics
  const area = topicId.split('-')[0];
  const languageIntro = PROGRAMMING_LANGUAGE_INTROS[area];
  const isCodeJs = ['js', 'react', 'node'].includes(area);
  const isCss = area === 'css';
  const isHtml = area === 'html';
  const topicSlug = topicId.slice(area.length + 1);
  const topicGuidance = languageIntro ? LANGUAGE_TOPIC_GUIDANCE[topicSlug] : null;

  const defaultCode = languageIntro?.example || (isCodeJs
    ? `// Interactive JavaScript Playground: ${title}\nconsole.log("Exploring: ${title}");\nconst isReady = true;\nif (isReady) {\n  console.log("Practice code execution live!");\n}`
    : isCss || isHtml
    ? `<div class="custom-card">\n  <h2>${title}</h2>\n  <p>Live interactive preview for ${title}.</p>\n</div>\n\n<style>\n  .custom-card {\n    font-family: sans-serif;\n    padding: 20px;\n    background: #eef2ff;\n    border-radius: 10px;\n    border: 1px solid #c7d2fe;\n    color: #3730a3;\n  }\n</style>`
    : null);
  const supportsPlayground = isCodeJs || isCss || isHtml;
  const defaultLanguage = languageIntro?.codeLanguage || (isCodeJs ? 'javascript' : isCss || isHtml ? 'html' : 'javascript');
  const commentPrefix = ['python', 'ruby'].includes(defaultLanguage) ? '#' : '//';

  return normalizeContent({
    id: topicId,
    title,
    category: area.toUpperCase(),
    diagramType: isCodeJs ? 'api-flow' : isCss ? 'box-model' : 'generic-roadmap',
    hasPlayground: supportsPlayground,
    codeLanguage: defaultLanguage,
    codeType: isCodeJs ? 'js' : 'html',
    codeSnippet: defaultCode,
    overview: {
      what: languageIntro
        ? `${topicGuidance || `${title} is an important part of learning ${languageIntro.name}.`} ${languageIntro.what}`
        : `${title} is a core programming concept used to describe how software is planned, structured, and executed.`,
      why: topicGuidance
        ? `This step builds on earlier lessons and prepares you for later topics in the ${languageIntro.name} path.`
        : languageIntro?.why || `Understanding ${title} helps you reason about programs and build reliable software in any programming language.`,
      whereUsed: languageIntro
        ? `Used in production software built with ${languageIntro.name}.`
        : 'These fundamentals are used across software development, from small scripts to large applications.'
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
      generalStructure: languageIntro?.example || defaultCode || `// ${title} Implementation Pattern\nfunction run() {\n  console.log("Mastering ${title}");\n}`,
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
      codeSnippet: `${commentPrefix} Step 1: Planning`
      },
      {
        step: 2,
        title: 'Implement and Test Locally',
        instruction: languageIntro
          ? `Run the example with a ${languageIntro.name} compiler or interpreter, then inspect its output.`
          : 'Write the implementation and verify its behavior in the code playground or terminal.',
        whyNecessary: 'Validates that the code behaves as expected without edge case bugs.',
        codeSnippet: `${commentPrefix} Step 2: Testing`
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
