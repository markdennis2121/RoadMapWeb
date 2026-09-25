export const JS_CURRICULUM_PART1 = {
  'js-1': {
    id: 'js-1',
    title: 'Variables (let, const, var)',
    category: 'JavaScript',
    diagramType: 'js-scope',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Modern Variable Declarations and Scope
const appName = "Roadmap Tracker";
let currentScore = 85;

console.log("Application:", appName);
console.log("Current Score:", currentScore);

// Reassigning a 'let' variable
currentScore += 10;
console.log("Updated Score:", currentScore);

// Block Scoping Demonstration
if (true) {
  let blockVariable = "Accessible only inside this IF block";
  const blockConstant = 42;
  console.log("Inside block:", blockVariable, blockConstant);
}

// Attempting to reassign const throws a TypeError:
try {
  // appName = "New App"; // Uncomment to test error
  console.log("const cannot be reassigned!");
} catch (err) {
  console.error(err.message);
}`,
    overview: {
      what: 'Variables are named storage containers in computer memory used to store, manipulate, and retrieve data values throughout a program. JavaScript provides three declaration keywords: const (block-scoped immutable binding), let (block-scoped reassignable variable), and legacy var (function-scoped hoisted variable).',
      why: 'Proper variable declaration prevents variable leakage, accidental mutations, and scoping bugs. Following the modern "const by default, let when reassignment is needed, never var" standard is fundamental to writing stable, bug-free JavaScript.',
      whereUsed: 'Used on every line of JavaScript across web apps, backend microservices, mobile apps, and algorithmic pipelines to hold state, references, and computational results.'
    },
    coreConcepts: [
      {
        title: 'Block Scope vs Function Scope',
        explanation: 'Block scope means a variable is accessible only within the pair of curly braces {} where it is defined. Function scope means a variable is accessible throughout the entire enclosing function regardless of internal blocks.',
        terms: [
          { term: 'const', definition: 'Block-scoped. Must be initialized immediately; binding cannot be reassigned.' },
          { term: 'let', definition: 'Block-scoped. Can be declared without value and reassigned over time.' },
          { term: 'var (Legacy)', definition: 'Function-scoped or globally-scoped. Ignores curly brace blocks (if, for), leading to accidental leakage.' },
          { term: 'Temporal Dead Zone (TDZ)', definition: 'The phase between entering a scope and variable initialization where accessing let or const throws a ReferenceError.' }
        ],
        relationship: 'const and let were introduced in ES6 to replace var and prevent scoping bugs.'
      },
      {
        title: 'Immutability vs Object Mutation with const',
        explanation: 'Declaring an object or array with const prevents reassigning the variable identifier itself, but the internal properties of that object or elements of that array can still be modified.',
        terms: [
          { term: 'Identifier Reassignment', definition: 'Assigning a new memory address to the variable name (blocked by const).' },
          { term: 'Object Mutation', definition: 'Changing the values inside a referenced object or array (allowed with const).' }
        ],
        relationship: 'To make an object fully immutable, use Object.freeze(obj) in conjunction with const.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Variable Declaration Syntax
const CONSTANT_NAME = initialValue;
let variableName = initialValue;

// Modification
variableName = updatedValue;`,
      breakdown: [
        { part: 'const', meaning: 'Declares an unchangeable reference binding.' },
        { part: 'let', meaning: 'Declares a mutable block-scoped variable.' },
        { part: 'variableName', meaning: 'CamelCase identifier naming the memory location.' }
      ],
      conventions: [
        'Default to const for all variable declarations.',
        'Use let only when you explicitly know the value will be reassigned (e.g. counters, accumulators).',
        'Never use var in modern JavaScript projects.',
        'Use camelCase for standard variables (userAge) and UPPER_SNAKE_CASE for global constants (MAX_ATTEMPTS).'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Declaring and Reassigning Values',
        description: 'Using let and const for calculation.',
        code: `const taxRate = 0.08;
let subtotal = 100;

let total = subtotal + (subtotal * taxRate);
console.log("Total Amount: $" + total);

// Update subtotal for next calculation
subtotal = 150;
total = subtotal + (subtotal * taxRate);
console.log("Updated Total: $" + total);`,
        explanation: 'Demonstrates const for immutable tax rate and let for fluctuating totals.'
      },
      {
        level: 'Intermediate',
        title: 'Block Scope Isolation in Loops',
        description: 'How let preserves separate variable bindings in asynchronous loops.',
        code: `for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log("Iteration (let):", i);
  }, 100);
}
// Outputs: 1, 2, 3 independently because 'let' creates a new binding for each loop iteration!`,
        explanation: 'If var were used, all timeouts would print 4 because var shares a single global/function variable.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Managing State in a Shopping Cart',
        description: 'Mutating array contents inside a const shopping cart declaration.',
        code: `const cart = []; // Binding is constant

// Adding items is valid mutation
cart.push({ id: 1, item: "Mechanical Keyboard", price: 99 });
cart.push({ id: 2, item: "Wireless Mouse", price: 49 });

console.log("Cart contents:", cart);
console.log("Item count:", cart.length);`,
        explanation: 'const cart guarantees cart always refers to the same array without risking accidental overwriting.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Choose the Right Declaration Keyword',
        instruction: 'Ask: "Will this variable be reassigned?" If No -> use const. If Yes -> use let.',
        whyNecessary: 'Prevents unintentional state overwrites and signals developer intent.',
        codeSnippet: `const maxRetries = 3;\nlet attempts = 0;`
      },
      {
        step: 2,
        title: 'Use Meaningful, Descriptive Identifiers',
        instruction: 'Avoid single-letter variable names (like x, temp); use descriptive names like isUserAuthenticated.',
        whyNecessary: 'Improves code readability for teams and future maintenance.',
        codeSnippet: `const isUserLoggedIn = true;`
      },
      {
        step: 3,
        title: 'Keep Variable Scope as Narrow as Possible',
        instruction: 'Declare variables inside the smallest block {} where they are required rather than polluting global scope.',
        whyNecessary: 'Frees up memory during garbage collection and prevents naming collisions.',
        codeSnippet: `function calculate() {\n  const factor = 2;\n  return factor * 10;\n}`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Default to const everywhere; only switch to let when reassignment is strictly necessary.',
        'Never use var. Enable ESLint rule no-var: "error".',
        'Declare variables close to where they are first used.'
      ],
      structureRecommendations: [
        'Group related constants at the top of the file or module.'
      ],
      performanceConsiderations: [
        'V8 and modern JS engines optimize const variables more aggressively as their memory references never change.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Trying to reassign a const variable (const count = 1; count = 2;).',
        howToAvoid: 'If the value needs to change, declare it with let.',
        debuggingTip: 'Check console for TypeError: Assignment to constant variable.'
      },
      {
        mistake: 'Assuming const freezes object properties.',
        howToAvoid: 'Remember const protects the variable binding, not the object properties. Use Object.freeze() for deep immutability.',
        debuggingTip: 'Verify if properties are modified downstream.'
      }
    ],
    projectApplications: [
      {
        domain: 'Frontend UI State',
        description: 'Storing form values, user preferences, and theme state variables.'
      },
      {
        domain: 'Backend Server Configurations',
        description: 'Managing environment ports, database connection strings, and security secret tokens.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Declare user profile constants (name, birthYear) and calculate their age in a let variable.',
        'Create a const array of your favorite books and practice pushing and removing items.'
      ],
      codingChallenge: {
        prompt: 'Refactor a legacy script using var to use modern const and let with proper block scoping.',
        hint: 'Replace loop counters with let and unchanging references with const.'
      },
      miniProjectIdea: {
        title: 'Scoreboard Tracker',
        description: 'Build a lightweight scoreboard simulator that increments home/away scores using let variables and displays updates.'
      }
    },
    summary: {
      keyPoints: [
        'const creates block-scoped immutable bindings; let creates block-scoped reassignable variables.',
        'var is obsolete due to function scoping and hoisting hazards.',
        'const on objects and arrays permits internal mutation while locking the reference.'
      ],
      skillsAcquired: [
        'Ability to select the appropriate variable declaration keyword.',
        'Mastery of block scoping and the Temporal Dead Zone.',
        'Understanding of reference mutability vs primitive assignment.'
      ]
    },
    exercise: {
      question: 'Which keyword should you use by default in modern JavaScript for any variable that will NOT be reassigned?',
      options: ['const', 'let', 'var', 'def'],
      answer: 'const'
    },
    exam: {
      question: 'What error is thrown when trying to reassign a variable declared with const?',
      options: ['TypeError: Assignment to constant variable', 'SyntaxError: Unexpected token', 'ReferenceError: Variable not defined', 'RangeError: Out of bounds'],
      answer: 'TypeError: Assignment to constant variable'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declaring_variables'
  },

  'js-2': {
    id: 'js-2',
    title: 'Data Types & Typeof',
    category: 'JavaScript',
    diagramType: 'js-types',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// JavaScript Data Types and typeof Inspector
const str = "Hello World";        // String
const num = 42;                   // Number
const isAlive = true;             // Boolean
const notDefined = undefined;     // Undefined
const emptyValue = null;          // Null
const bigIntVal = 9007199254740991n; // BigInt
const uniqueId = Symbol("id");    // Symbol

console.log("str type:", typeof str);
console.log("num type:", typeof num);
console.log("isAlive type:", typeof isAlive);
console.log("notDefined type:", typeof notDefined);
console.log("emptyValue type:", typeof emptyValue); // Note: returns "object" (historic JS quirk!)
console.log("bigInt type:", typeof bigIntVal);
console.log("uniqueId type:", typeof uniqueId);

// Reference Types
const user = { name: "Sarah", role: "Developer" };
const skills = ["JavaScript", "React", "CSS"];

console.log("user type:", typeof user);
console.log("skills is Array:", Array.isArray(skills));`,
    overview: {
      what: 'JavaScript is a dynamically-typed language where variables hold values belonging to 8 fundamental data types: 7 Primitives (String, Number, BigInt, Boolean, Undefined, Null, Symbol) and 1 Reference type (Object, which includes Arrays, Functions, and Dates).',
      why: 'Understanding data types is vital because JavaScript performs automatic type coercion during operations. Misunderstanding primitive copying vs reference mutation is the #1 source of data corruption bugs.',
      whereUsed: 'Essential across every JavaScript computation: validating API payloads, parsing database records, serializing JSON, and managing UI state.'
    },
    coreConcepts: [
      {
        title: 'Primitive Types (Passed by Value)',
        explanation: 'Primitives are immutable data stored directly on the execution stack. When you assign a primitive to another variable, JavaScript copies the literal value.',
        terms: [
          { term: 'String', definition: 'Textual sequences enclosed in quotes ("...", \'...\', `...`).' },
          { term: 'Number', definition: 'Double-precision 64-bit binary format IEEE 754 floats (e.g. 42, 3.14, NaN, Infinity).' },
          { term: 'Boolean', definition: 'Logical entities: true or false.' },
          { term: 'Undefined vs Null', definition: 'undefined means a variable was declared but never assigned a value; null is an intentional assignment representing "no value".' }
        ],
        relationship: 'Primitives are immutable; modifying a string creates an entirely new string in memory.'
      },
      {
        title: 'Reference Types (Passed by Reference)',
        explanation: 'Objects, Arrays, and Functions are reference types stored in memory heap. Variables store a pointer (reference memory address) to the object, NOT the object itself.',
        terms: [
          { term: 'Object', definition: 'Collection of key-value pairs ({ name: "Alex" }).' },
          { term: 'Array', definition: 'Ordered list of items ([1, 2, 3]). Subtype of Object.' },
          { term: 'Pass by Reference', definition: 'Assigning an object b = a copies the pointer; mutating b.name also mutates a.name!' }
        ],
        relationship: 'Copying reference types requires shallow cloning ({ ...obj }) or deep cloning (structuredClone(obj)).'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Type Checking
typeof value === "string"
typeof value === "number"
typeof value === "boolean"
typeof value === "undefined"
Array.isArray(value) // Best way to check for Arrays
value === null       // Explicit check for null`,
      breakdown: [
        { part: 'typeof value', meaning: 'Operator returning a string representation of the data type.' },
        { part: 'Array.isArray()', meaning: 'Reliably checks if a reference object is an Array.' }
      ],
      conventions: [
        'Use typeof to check primitives.',
        'Use Array.isArray() to check arrays (because typeof [] returns "object").',
        'Use strict equality (=== null) to check for null (because typeof null returns "object").'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Primitive Value Copying',
        description: 'Demonstrating that primitives copy independent values.',
        code: `let x = 10;
let y = x; // Copy of value 10
y = 20;

console.log("x is:", x); // 10 (remains unchanged)
console.log("y is:", y); // 20`,
        explanation: 'Primitives are passed by value; changing y has zero effect on x.'
      },
      {
        level: 'Intermediate',
        title: 'Reference Mutation Trap',
        description: 'Demonstrating how shared memory pointers cause unintended side-effects.',
        code: `const userA = { name: "Alice", age: 25 };
const userB = userA; // COPIES THE POINTER, NOT THE OBJECT!

userB.age = 30; // Mutates the underlying shared memory

console.log("userA age:", userA.age); // 30! (Accidentally mutated)

// Safe cloning using Spread Operator:
const userC = { ...userA, age: 35 };
console.log("userA age:", userA.age); // Still 30
console.log("userC age:", userC.age); // 35`,
        explanation: 'Always shallow clone ({ ...obj }) or use structuredClone() to create independent object copies.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Safe API Payload Type Validator',
        description: 'Validating types before processing incoming data.',
        code: `function validateUserPayload(payload) {
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Invalid payload: must be an object");
  }
  if (typeof payload.username !== "string" || payload.username.trim() === "") {
    throw new Error("Invalid username: must be a non-empty string");
  }
  if (typeof payload.age !== "number" || isNaN(payload.age) || payload.age < 18) {
    throw new Error("User must be at least 18 years old");
  }
  return true;
}

console.log("Valid:", validateUserPayload({ username: "alex", age: 24 }));`,
        explanation: 'Guards against malformed inputs and prevents runtime exceptions.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Identify Primitive vs Reference Data',
        instruction: 'Categorize variables into simple values (string, number, boolean) vs complex data structures (arrays, objects).',
        whyNecessary: 'Dictates whether data can be assigned directly or requires cloning.',
        codeSnippet: `const primitive = 42;\nconst reference = { key: "val" };`
      },
      {
        step: 2,
        title: 'Use typeof and Type Guards',
        instruction: 'Verify data types before invoking methods (e.g. ensure a value is a string before calling .toLowerCase()).',
        whyNecessary: 'Prevents TypeError: value.toLowerCase is not a function.',
        codeSnippet: `if (typeof input === 'string') { input.toLowerCase(); }`
      },
      {
        step: 3,
        title: 'Use structuredClone() for Deep Objects',
        instruction: 'When duplicating nested objects or arrays, use native structuredClone().',
        whyNecessary: 'Prevents deep nested reference mutations.',
        codeSnippet: `const clone = structuredClone(originalNestedObject);`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use strict equality (===) instead of loose equality (==) to prevent automatic type coercion bugs.',
        'Use Number.isNaN() instead of global isNaN().',
        'Use Array.isArray() for array type checks.'
      ],
      structureRecommendations: [
        'Normalize incoming data types at the API boundary before passing them down to components.'
      ],
      performanceConsiderations: [
        'Primitives are allocated on the fast call stack; avoid creating unnecessary object wrappers.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Checking typeof value === "null" (returns false, because typeof null is "object").',
        howToAvoid: 'Check value === null directly.',
        debuggingTip: 'Test null === null.'
      },
      {
        mistake: 'Using typeof [] to check if a value is an array (returns "object").',
        howToAvoid: 'Use Array.isArray(value).',
        debuggingTip: 'Test Array.isArray([]) === true.'
      }
    ],
    projectApplications: [
      {
        domain: 'Form Input Sanitization',
        description: 'Converting raw HTML string inputs ("25") into validated numbers (25).'
      },
      {
        domain: 'State Management (Redux, Zustand)',
        description: 'Ensuring immutable state updates without direct object mutation.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a variable for each of the 7 primitive types and log their typeof results.',
        'Demonstrate object reference mutation vs shallow cloning with the spread operator.'
      ],
      codingChallenge: {
        prompt: 'Write a function deepType(val) that accurately returns "array", "null", "object", "number", "string", "boolean", or "undefined".',
        hint: 'Use Array.isArray(), val === null, and typeof.'
      },
      miniProjectIdea: {
        title: 'Dynamic Type Inspector Widget',
        description: 'Build an interactive console where users type any JavaScript expression and see its computed value, primitive vs reference category, and type breakdown.'
      }
    },
    summary: {
      keyPoints: [
        'JavaScript has 7 Primitives (passed by value) and 1 Reference type (passed by pointer).',
        'typeof null returning "object" is a historic quirk; check val === null explicitly.',
        'Cloning reference objects prevents accidental side-effect mutations.'
      ],
      skillsAcquired: [
        'Mastery of JavaScript data types and memory allocation models.',
        'Proficiency with type checking operators and guards.',
        'Ability to prevent object mutation bugs in stateful applications.'
      ]
    },
    exercise: {
      question: 'What does the expression typeof null return in JavaScript?',
      options: ['"object"', '"null"', '"undefined"', '"primitive"'],
      answer: '"object"'
    },
    exam: {
      question: 'Which is the correct and reliable way to check if a variable items is an Array?',
      options: ['Array.isArray(items)', 'typeof items === "array"', 'items.type === "array"', 'items instanceof ArrayType'],
      answer: 'Array.isArray(items)'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures'
  },

  'js-3': {
    id: 'js-3',
    title: 'Operators & Expressions',
    category: 'JavaScript',
    diagramType: 'js-operators',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Arithmetic, Comparison, Logical & Modern Operators
let a = 10;
let b = 3;

console.log("Addition:", a + b);       // 13
console.log("Remainder (%):", a % b);  // 1
console.log("Exponent (**):", a ** b); // 1000

// Strict (===) vs Loose (==) Equality
console.log("Loose equality (5 == '5'):", 5 == "5");     // true (type coercion!)
console.log("Strict equality (5 === '5'):", 5 === "5");   // false (safe standard)

// Logical Nullish Coalescing (??) vs OR (||)
let count = 0;
let fallbackOr = count || 10;          // 10 (0 is falsy, triggers fallback)
let fallbackNullish = count ?? 10;     // 0 (0 is defined, preserves 0!)
console.log("|| with 0:", fallbackOr);
console.log("?? with 0:", fallbackNullish);

// Optional Chaining (?.)
const user = { profile: { name: "Maria" } };
console.log("Safe Deep Access:", user?.profile?.name);
console.log("Safe Missing Prop:", user?.settings?.theme ?? "light");`,
    overview: {
      what: 'Operators are special symbols used to perform operations on operands (values and variables). JavaScript includes Arithmetic, Assignment, Comparison (Strict === vs Loose ==), Logical (&&, ||, !), Ternary (condition ? a : b), Nullish Coalescing (??), and Optional Chaining (?.).',
      why: 'Operators power all decision-making, conditional rendering, mathematical algorithms, and data access logic in applications. Mastering modern operators like ?? and ?. eliminates endless undefined crashes and keeps code clean.',
      whereUsed: 'Universal across frontend UI rendering, business logic calculations, authentication checks, and database query filters.'
    },
    coreConcepts: [
      {
        title: 'Strict Equality (===) vs Loose Equality (==)',
        explanation: 'Loose equality (==) forces implicit type coercion (converting types before comparison), leading to bizarre bugs like "" == 0 (true) or null == undefined (true). Strict equality (===) checks both value AND type without coercion.',
        terms: [
          { term: 'Strict Equality (===)', definition: 'Evaluates to true only if operands have the exact same type and identical value.' },
          { term: 'Strict Inequality (!==)', definition: 'Evaluates to true if operands differ in type OR value.' },
          { term: 'Type Coercion', definition: 'Automatic conversion of values from one data type to another during comparison.' }
        ],
        relationship: 'Always use === and !== in production code to avoid accidental type conversion.'
      },
      {
        title: 'Short-Circuit Evaluation, ??, and ?.',
        explanation: 'Logical operators evaluate from left to right and stop as soon as the result is determined. Nullish Coalescing (??) provides fallbacks only for null or undefined, unlike || which triggers on 0, "", or false.',
        terms: [
          { term: 'Logical AND (&&)', definition: 'Returns first falsy value, or last value if all truthy. Used for conditional execution.' },
          { term: 'Nullish Coalescing (??)', definition: 'Returns right-hand operand ONLY if left-hand is null or undefined.' },
          { term: 'Optional Chaining (?.)', definition: 'Safely reads deep nested properties without throwing Cannot read properties of undefined.' }
        ],
        relationship: 'Combine ?. with ?? for safe nested property access with default fallbacks.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Ternary Operator
const status = age >= 18 ? "Adult" : "Minor";

// Safe Deep Lookup with Nullish Fallback
const userCity = user?.address?.city ?? "Unknown City";

// Logical Assignment Shorthands
counter += 1;
options.theme ??= "dark";`,
      breakdown: [
        { part: 'age >= 18 ? "Adult" : "Minor"', meaning: 'Inline conditional: condition ? valueIfTrue : valueIfFalse.' },
        { part: 'user?.address?.city', meaning: 'Optional chaining safely short-circuits to undefined if address is missing.' },
        { part: '?? "Unknown City"', meaning: 'Nullish coalescing supplies fallback string only if preceding expression is null/undefined.' }
      ],
      conventions: [
        'Always use strict equality (=== / !==).',
        'Use ?? instead of || when zero (0) or empty string ("") are valid desired values.',
        'Use ?. before accessing deep nested API response properties.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Ternary Operator for Inline UI States',
        description: 'Clean inline conditional assignment replacing verbose if/else blocks.',
        code: `const isLoggedIn = true;
const greeting = isLoggedIn ? "Welcome back!" : "Please sign in";
console.log(greeting);`,
        explanation: 'Concise, readable syntax for binary branching.'
      },
      {
        level: 'Intermediate',
        title: 'Nullish Coalescing vs Logical OR',
        description: 'Demonstrating why ?? is essential when dealing with numeric zeros or boolean flags.',
        code: `const userSettings = {
  notifications: false,
  volume: 0,
  maxItems: null
};

// Logical OR (||) incorrectly overwrites 0 and false!
const volumeOr = userSettings.volume || 50; // Returns 50 (Bug!)
const notifsOr = userSettings.notifications || true; // Returns true (Bug!)

// Nullish Coalescing (??) preserves 0 and false correctly:
const volumeCorrect = userSettings.volume ?? 50; // Returns 0
const notifsCorrect = userSettings.notifications ?? true; // Returns false
const maxItemsCorrect = userSettings.maxItems ?? 25; // Returns 25

console.log("Correct volume:", volumeCorrect);
console.log("Correct notifications:", notifsCorrect);
console.log("Correct maxItems:", maxItemsCorrect);`,
        explanation: '?? only falls back for null/undefined, making it safe for numbers and booleans.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Resilient Deep API Object Access',
        description: 'Safely extracting deeply nested user address properties from a backend API response.',
        code: `function renderUserLocation(apiResponse) {
  // Safe deep chaining prevents runtime crash if company or geo is missing:
  const lat = apiResponse?.data?.company?.location?.geo?.lat ?? 0.0;
  const lng = apiResponse?.data?.company?.location?.geo?.lng ?? 0.0;
  const city = apiResponse?.data?.company?.location?.city ?? "Remote";

  return \`Coordinates: (\${lat}, \${lng}) in \${city}\`;
}

console.log(renderUserLocation({ data: { company: null } })); // Coordinates: (0, 0) in Remote`,
        explanation: 'Optional chaining returns undefined without throwing errors, and nullish coalescing injects sensible defaults.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Replace Loose Equality with Strict Equality',
        instruction: 'Search your codebase for == and replace with ===.',
        whyNecessary: 'Eliminates unexpected type coercion security vulnerabilities and logic bugs.',
        codeSnippet: `if (inputStatus === 'completed') { ... }`
      },
      {
        step: 2,
        title: 'Use Optional Chaining on External Payloads',
        instruction: 'When reading data from third-party APIs or user inputs, prefix property dots with ?..',
        whyNecessary: 'Prevents Uncaught TypeError: Cannot read properties of undefined from crashing the application.',
        codeSnippet: `const avatar = user?.profile?.avatarUrl;`
      },
      {
        step: 3,
        title: 'Supply Default Values with ??',
        instruction: 'Append ?? defaultValue after optional chaining chains.',
        whyNecessary: 'Ensures variables always hold a defined fallback value.',
        codeSnippet: `const theme = settings?.theme ?? 'dark';`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Strict equality (===) is an absolute industry requirement.',
        'Use ?. whenever reading properties on objects that could potentially be null or undefined.',
        'Use ?? for default values instead of || when numeric 0 or boolean false are valid states.'
      ],
      structureRecommendations: [
        'Avoid deeply nested ternary operators (a ? b : c ? d : e); use switch or if/else for multi-condition readability.'
      ],
      performanceConsiderations: [
        'Short-circuit operators (&&, ||) exit immediately, saving CPU cycles on expensive function calls.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using || to provide a fallback for a count variable that can be 0.',
        howToAvoid: 'Use count ?? defaultVal instead of count || defaultVal.',
        debuggingTip: 'Test what happens when the variable is explicitly set to 0 or false.'
      },
      {
        mistake: 'Accidentally using assignment (=) inside an if condition instead of comparison (===).',
        howToAvoid: 'Always use three equals signs (===) for comparisons.',
        debuggingTip: 'Enable linter rule no-cond-assign.'
      }
    ],
    projectApplications: [
      {
        domain: 'Frontend Conditional Rendering',
        description: 'Showing UI components conditionally using isLoaded && <UserProfile />.'
      },
      {
        domain: 'E-Commerce Cart Calculations',
        description: 'Computing subtotal, discounts, tax rates, and final shipping totals.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Write an expression using ?? and ?. to safely retrieve a user\'s zip code with a fallback of "00000".',
        'Compare 0 == false, 0 === false, "" == 0, and "" === 0 in the console.'
      ],
      codingChallenge: {
        prompt: 'Create a function formatPrice(price, currency) that uses ternary and nullish coalescing to return "$0.00" when price is 0.',
        hint: 'Use (price ?? 0).toFixed(2).'
      },
      miniProjectIdea: {
        title: 'Interactive Expression Evaluator',
        description: 'Build a calculator that compares loose vs strict equality and displays truthy/falsy evaluation breakdown.'
      }
    },
    summary: {
      keyPoints: [
        'Always use strict equality (===) to prevent type coercion bugs.',
        '?? provides fallbacks strictly for null and undefined, preserving 0 and false.',
        '?. prevents fatal runtime crashes when navigating nested objects.'
      ],
      skillsAcquired: [
        'Mastery of arithmetic, comparison, and logical operators.',
        'Proficiency in writing modern null-safe code with ?. and ??.',
        'Ability to implement clean ternary conditional expressions.'
      ]
    },
    exercise: {
      question: 'Which operator returns the right-hand value ONLY if the left-hand operand is null or undefined?',
      options: ['?? (Nullish Coalescing)', '|| (Logical OR)', '&& (Logical AND)', '?: (Ternary)'],
      answer: '?? (Nullish Coalescing)'
    },
    exam: {
      question: 'Why does 0 || 10 evaluate to 10, whereas 0 ?? 10 evaluates to 0?',
      options: [
        '|| checks for any falsy value (and 0 is falsy), while ?? checks strictly for null or undefined',
        '?? is an arithmetic operator that prioritizes lower numbers',
        '|| converts 0 to undefined automatically',
        'There is no difference; it is an engine bug'
      ],
      answer: '|| checks for any falsy value (and 0 is falsy), while ?? checks strictly for null or undefined'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators'
  },

  'js-4': {
    id: 'js-4',
    title: 'Conditional Statements',
    category: 'JavaScript',
    diagramType: 'js-conditions',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// JavaScript Conditionals and Truthy/Falsy Rules
const userRole = "admin";
const subscriptionStatus = "active";

// If / Else If / Else
if (userRole === "admin" && subscriptionStatus === "active") {
  console.log("Access Granted: Full Administrator Dashboard");
} else if (userRole === "editor") {
  console.log("Access Granted: Content Editor Panel");
} else {
  console.log("Access Denied: Standard User View");
}

// Switch Statement with Exhaustive Matching
const httpStatusCode = 404;
switch (httpStatusCode) {
  case 200:
    console.log("Status: OK (Success)");
    break;
  case 401:
    console.log("Status: Unauthorized (Login Required)");
    break;
  case 404:
    console.log("Status: Not Found (Resource missing)");
    break;
  default:
    console.log("Status: Unhandled HTTP Code");
}

// Truthy vs Falsy Verification
const falsyList = [false, 0, -0, 0n, "", null, undefined, NaN];
console.log("All Falsy values evaluate to false in boolean contexts.");
const emptyArray = []; // Truthy!
console.log("Is [] truthy?", Boolean(emptyArray)); // true`,
    overview: {
      what: 'Conditional statements (if/else, switch, ternary) control the flow of program execution based on whether expressions evaluate to true or false. JavaScript coerces values in conditional checks into Boolean truthy or falsy states.',
      why: 'Branching logic is essential for authentication checks, error handling, permission routing, game logic, and dynamic UI state rendering. Understanding exact truthy/falsy rules prevents critical security authorization bypasses.',
      whereUsed: 'Everywhere in code: protecting private routes, displaying error messages, handling API status codes, and validating user inputs.'
    },
    coreConcepts: [
      {
        title: 'The 8 Falsy Values in JavaScript',
        explanation: 'In JavaScript, exactly 8 values coerce to false in boolean contexts. Every other value in the entire language is TRUTHY (including empty arrays [] and empty objects {}).',
        terms: [
          { term: 'The 8 Falsy Values', definition: 'false, 0, -0, 0n (BigInt zero), "" (empty string), null, undefined, NaN.' },
          { term: 'Truthy Values', definition: 'Everything else: "0", "false", [] (empty array), {} (empty object), function(){}.' }
        ],
        relationship: 'Checking if (items.length) works because 0 is falsy; checking if (items) is always truthy even if the array is empty!'
      },
      {
        title: 'switch Statement & break Mechanics',
        explanation: 'A switch statement evaluates an expression against multiple case clauses using strict equality (===). Omitting break causes execution to fall through to subsequent cases.',
        terms: [
          { term: 'case', definition: 'A matching clause compared with ===.' },
          { term: 'break', definition: 'Terminates the switch block; without it, execution falls through into subsequent cases.' },
          { term: 'default', definition: 'Fallback clause executed if no cases match.' }
        ],
        relationship: 'Use switch for multiple discrete values of a single variable; use if/else for ranges and complex compound conditions.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// If / Else If / Else
if (conditionA) {
  // Executed if conditionA is truthy
} else if (conditionB) {
  // Executed if conditionB is truthy
} else {
  // Fallback
}

// Switch Case
switch (expression) {
  case value1:
    // Code
    break;
  default:
    // Fallback
}`,
      breakdown: [
        { part: 'if (condition)', meaning: 'Coerces condition to boolean; executes block if true.' },
        { part: 'break;', meaning: 'Exits the switch statement immediately.' }
      ],
      conventions: [
        'Always include a default case in switch statements.',
        'Always check array length (arr.length > 0) rather than checking the array itself (if (arr)).',
        'Keep if conditions simple with guard clauses (early returns).'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Age Eligibility Checker',
        description: 'Standard branching logic with multiple age thresholds.',
        code: `function getTicketPrice(age) {
  if (age < 5) {
    return "Free";
  } else if (age < 18) {
    return "$10 (Youth Discount)";
  } else if (age >= 65) {
    return "$12 (Senior Discount)";
  } else {
    return "$20 (Standard Adult)";
  }
}

console.log("Age 4:", getTicketPrice(4));
console.log("Age 25:", getTicketPrice(25));
console.log("Age 70:", getTicketPrice(70));`,
        explanation: 'Tests conditions sequentially from top to bottom, returning early.'
      },
      {
        level: 'Intermediate',
        title: 'Guard Clauses Pattern (Clean Code)',
        description: 'Using early returns to eliminate deeply nested if/else pyramids.',
        code: `// Bad: Nested Pyramid of Doom
// Good: Guard Clauses
function processPayment(user, cart) {
  if (!user) return { success: false, error: "User required" };
  if (!user.isVerified) return { success: false, error: "Account not verified" };
  if (!cart || cart.length === 0) return { success: false, error: "Cart is empty" };

  // Main Happy Path Logic (Clean and unnested!)
  return { success: true, message: "Payment processed successfully!" };
}

console.log(processPayment({ isVerified: true }, ["Item 1"]));`,
        explanation: 'Guard clauses handle edge cases upfront and keep core logic flat and readable.'
      },
      {
        level: 'Real-World Use Case',
        title: 'HTTP Status Code Handler with Switch',
        description: 'Routing API response states to descriptive user toast notifications.',
        code: `function handleApiResponse(status) {
  switch (status) {
    case 200:
    case 201:
      return { type: "success", msg: "Data synchronized successfully." };
    case 400:
      return { type: "warning", msg: "Invalid request payload." };
    case 401:
      return { type: "error", msg: "Session expired. Please log in again." };
    case 403:
      return { type: "error", msg: "You do not have permission for this resource." };
    case 500:
      return { type: "fatal", msg: "Internal server error. Engineers notified." };
    default:
      return { type: "info", msg: "Request completed." };
  }
}

console.log(handleApiResponse(401));`,
        explanation: 'Grouped case clauses (200, 201) share identical handler actions.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Identify Boundary Conditions',
        instruction: 'Define the edge cases (null inputs, empty arrays, unauthorized states) first.',
        whyNecessary: 'Prevents runtime errors before core logic runs.',
        codeSnippet: `if (!data || data.length === 0) return;`
      },
      {
        step: 2,
        title: 'Apply Guard Clauses with Early Returns',
        instruction: 'Return or throw immediately if validation fails, keeping the happy path unnested.',
        whyNecessary: 'Greatly reduces cognitive load and cyclomatic complexity.',
        codeSnippet: `if (user.isBlocked) return false;`
      },
      {
        step: 3,
        title: 'Use switch for Enum/Constant Matching',
        instruction: 'When branching on a single known variable with 4+ discrete values, use switch.',
        whyNecessary: 'More readable and maintainable than long chains of else if.',
        codeSnippet: `switch (action.type) { case 'ADD': ... }`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Prefer guard clauses (early returns) over nested if/else blocks.',
        'Never rely on truthiness to check if an array has items (if (arr) is always true; use if (arr.length > 0)).',
        'Always end switch blocks with a default case.'
      ],
      structureRecommendations: [
        'Avoid nesting conditionals more than 2 levels deep.'
      ],
      performanceConsiderations: [
        'Modern JS engines compile switch statements into jump tables when matching integer/string keys, making them fast.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Checking if (emptyArray) expecting it to be false.',
        howToAvoid: '[] is an Object, and all objects in JS are truthy! Check if (emptyArray.length === 0).',
        debuggingTip: 'Test Boolean([]) in console (returns true).'
      },
      {
        mistake: 'Forgetting break in a switch statement.',
        howToAvoid: 'Always include break; or return; at the end of each case.',
        debuggingTip: 'Check if multiple subsequent cases execute unexpectedly.'
      }
    ],
    projectApplications: [
      {
        domain: 'Authentication & Role-Based Access (RBAC)',
        description: 'Directing users to Admin, Manager, or Customer dashboards based on permission roles.'
      },
      {
        domain: 'Form Validation Engines',
        description: 'Validating password lengths, required fields, and email formatting with immediate error feedback.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Write an isFalsy(val) function that returns true for all 8 JavaScript falsy values and false for everything else.',
        'Refactor a 3-level nested if/else function into flat guard clauses with early returns.'
      ],
      codingChallenge: {
        prompt: 'Create a traffic light controller function getNextLight(currentLight) using a switch statement that cycles Red -> Green -> Yellow -> Red.',
        hint: 'Use switch(currentLight.toLowerCase()).'
      },
      miniProjectIdea: {
        title: 'RPG Battle Action Resolver',
        description: 'Build a game action engine that evaluates character health, mana points, and status effects to decide available actions.'
      }
    },
    summary: {
      keyPoints: [
        'JavaScript has exactly 8 falsy values; everything else is truthy (including [] and {}).',
        'Guard clauses with early returns keep code flat, clean, and maintainable.',
        'switch statements evaluate using strict equality (===) and require break or return.'
      ],
      skillsAcquired: [
        'Proficiency in control flow and conditional branching.',
        'Mastery of JavaScript truthy/falsy coercion rules.',
        'Ability to write clean, unnested code using guard clauses.'
      ]
    },
    exercise: {
      question: 'Which of the following values is TRUTHY in JavaScript?',
      options: ['[] (Empty array)', '"" (Empty string)', '0 (Number zero)', 'null'],
      answer: '[] (Empty array)'
    },
    exam: {
      question: 'Why is the guard clause pattern (early return) preferred over deep if/else nesting?',
      options: [
        'It handles edge cases upfront, removes unnecessary indentations, and keeps core logic flat and readable',
        'It converts JavaScript code to WebAssembly',
        'It automatically disables type checking',
        'It prevents variables from using memory'
      ],
      answer: 'It handles edge cases upfront, removes unnecessary indentations, and keeps core logic flat and readable'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling'
  },

  'js-5': {
    id: 'js-5',
    title: 'Loops & Iteration',
    category: 'JavaScript',
    diagramType: 'js-loops',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// JavaScript Loops: for, while, for...of, and for...in
const technologies = ["HTML", "CSS", "JavaScript", "React", "Node"];

// 1. Modern for...of Loop (Best for iterating Array values)
console.log("--- for...of (Array Values) ---");
for (const tech of technologies) {
  console.log("Tech:", tech);
}

// 2. Classic for Loop with break and continue
console.log("--- Classic for Loop with Break/Continue ---");
for (let i = 0; i < 6; i++) {
  if (i === 2) {
    console.log("Skipping 2 (continue)");
    continue; // Skips current iteration
  }
  if (i === 4) {
    console.log("Breaking at 4 (break)");
    break; // Exits loop entirely
  }
  console.log("Count:", i);
}

// 3. for...in Loop (Best for Object Keys)
console.log("--- for...in (Object Keys) ---");
const user = { name: "David", role: "Engineer", exp: 5 };
for (const key in user) {
  console.log(\`\${key}: \${user[key]}\`);
}`,
    overview: {
      what: 'Loops are control structures used to repeat a block of code multiple times until a specified termination condition is met. JavaScript provides classic for, while, do...while, modern for...of (for iterable values like arrays, strings, maps), and for...in (for object enumerable keys).',
      why: 'Iteration is fundamental for data processing: transforming database rows, filtering search results, rendering lists of DOM components, computing analytics, and polling network status.',
      whereUsed: 'Ubiquitous in algorithms, batch data processing, chart rendering, game animation loops, and backend stream parsing.'
    },
    coreConcepts: [
      {
        title: 'for...of (Values) vs for...in (Keys)',
        explanation: 'for...of iterates over the VALUES of an iterable collection (Arrays, Strings, Sets, Maps). for...in iterates over the enumerable PROPERTY KEYS of an Object.',
        terms: [
          { term: 'for...of', definition: 'Retrieves element values directly: for (const item of items). Does not work on plain objects.' },
          { term: 'for...in', definition: 'Retrieves string property names: for (const key in object). Avoid using on arrays due to order inconsistency.' }
        ],
        relationship: 'Use for...of for Arrays; use for...in or Object.entries() for Objects.'
      },
      {
        title: 'Loop Control: break vs continue',
        explanation: 'break immediately terminates the entire loop execution and jumps to the code following the loop. continue skips the remainder of the current iteration and advances to the next cycle.',
        terms: [
          { term: 'break', definition: 'Exits the loop permanently.' },
          { term: 'continue', definition: 'Skips current step and proceeds to the next iteration.' }
        ],
        relationship: 'Both keywords provide precise control over loop termination and filtering.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// 1. Classic For
for (let i = 0; i < array.length; i++) { ... }

// 2. Modern for...of (Preferred for Arrays)
for (const value of array) { ... }

// 3. While Loop
while (condition) { ... }`,
      breakdown: [
        { part: 'for (let i = 0; i < len; i++)', meaning: 'Initialization; Condition; Increment expression.' },
        { part: 'for (const item of list)', meaning: 'Iterates each item value directly without index management.' }
      ],
      conventions: [
        'Prefer for...of or functional array methods (.map(), .filter(), .forEach()) over manual index counting.',
        'Always ensure while loop conditions have guaranteed progress towards termination to prevent infinite loops.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Summing an Array of Numbers',
        description: 'Using for...of to accumulate values.',
        code: `const prices = [19.99, 4.50, 25.00, 8.20];
let total = 0;

for (const price of prices) {
  total += price;
}

console.log("Total Cart Price: $" + total.toFixed(2));`,
        explanation: 'Iterates directly over array values cleanly.'
      },
      {
        level: 'Intermediate',
        title: 'Early Exit Search Algorithm with break',
        description: 'Finding the first matching target in a large dataset and stopping immediately.',
        code: `const databaseUsers = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Charlie" },
  { id: 104, name: "Dana" }
];

let targetUser = null;
const searchId = 103;

for (const u of databaseUsers) {
  console.log("Checking ID:", u.id);
  if (u.id === searchId) {
    targetUser = u;
    console.log("Found user! Stopping search.");
    break; // Stops searching remaining users, saving CPU!
  }
}

console.log("Result:", targetUser);`,
        explanation: 'break saves computing time by stopping iteration as soon as the target is located.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Asynchronous Sequential Queue Processing',
        description: 'Processing API tasks sequentially one after another using for...of with await.',
        code: `async function processBatchUploads(fileNames) {
  const results = [];
  for (const file of fileNames) {
    console.log(\`Uploading \${file}...\`);
    // Simulating async network delay
    await new Promise(res => setTimeout(res, 50));
    results.push({ file, status: "Uploaded" });
  }
  return results;
}

processBatchUploads(["doc1.pdf", "image.png", "data.csv"]).then(res => {
  console.log("Batch complete:", res);
});`,
        explanation: 'for...of supports async/await sequence handling properly, whereas array.forEach() cannot pause.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Choose the Right Iteration Method',
        instruction: 'For Arrays -> use for...of or .forEach(). For Object keys -> use for...in or Object.entries(). For counters -> use for (let i = 0; ...).',
        whyNecessary: 'Ensures readable, bug-free traversal.',
        codeSnippet: `for (const item of items) { ... }`
      },
      {
        step: 2,
        title: 'Guard Against Infinite Loops',
        instruction: 'When using while loops, ensure the loop condition is modified within the loop body.',
        whyNecessary: 'An infinite loop locks the browser main thread and crashes the page.',
        codeSnippet: `while (count > 0) { count--; }`
      },
      {
        step: 3,
        title: 'Optimize Loop Boundaries',
        instruction: 'In classic for loops, cache array length (const len = arr.length) if the array is massive.',
        whyNecessary: 'Prevents property recalculation on every step.',
        codeSnippet: `for (let i = 0, len = arr.length; i < len; i++)`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use for...of for general array iteration; use for...in only for object keys.',
        'Use break to exit loops as early as possible.',
        'Avoid for...in on arrays (indices are iterated as strings and order is not guaranteed).'
      ],
      structureRecommendations: [
        'Keep loop bodies short. Extract complex inner logic into standalone helper functions.'
      ],
      performanceConsiderations: [
        'Classic for loops and for...of loops have minimal overhead in the V8 engine.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using for...in to iterate array elements, expecting values instead of string index keys.',
        howToAvoid: 'Use for...of for array values.',
        debuggingTip: 'If typeof item === "string" and values are "0", "1", you used for...in on an array.'
      },
      {
        mistake: 'Infinite while loop caused by forgetting to increment/decrement the counter.',
        howToAvoid: 'Double-check loop termination variables.',
        debuggingTip: 'Check if the browser tab freezes with 100% CPU usage.'
      }
    ],
    projectApplications: [
      {
        domain: 'Data Analytics & Reporting',
        description: 'Calculating moving averages, monthly revenue aggregations, and top-selling products.'
      },
      {
        domain: 'Search & Filtering Pipelines',
        description: 'Scanning data arrays for user query terms and generating highlighted result lists.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Write a loop that prints the multiplication table for number 7 (from 7x1 to 7x10).',
        'Use a for...of loop to count how many vowels (a, e, i, o, u) exist in a given string.'
      ],
      codingChallenge: {
        prompt: 'Write a function findFirstEven(numbers) that loops through an array and uses break to return the first even number.',
        hint: 'Use if (num % 2 === 0) { return num; }.'
      },
      miniProjectIdea: {
        title: 'Lottery Number Generator & Matcher',
        description: 'Build a tool that generates 6 random unique lottery numbers using a while loop and compares them with a user ticket.'
      }
    },
    summary: {
      keyPoints: [
        'for...of is the standard loop for Array values; for...in is for Object keys.',
        'break halts loop execution; continue skips to the next iteration.',
        'Loops are fundamental for data aggregation, search algorithms, and queue processing.'
      ],
      skillsAcquired: [
        'Mastery of all JavaScript loop variations (for, while, for...of, for...in).',
        'Proficiency in optimizing loop execution with early exits.',
        'Ability to process async queues sequentially.'
      ]
    },
    exercise: {
      question: 'Which loop construct is the modern standard for iterating directly over the VALUES of an Array?',
      options: ['for...of', 'for...in', 'while...in', 'switch...case'],
      answer: 'for...of'
    },
    exam: {
      question: 'What is the primary difference between the break and continue keywords inside a loop?',
      options: [
        'break terminates the loop completely, while continue only skips the rest of the current iteration',
        'continue terminates the loop, while break pauses it',
        'break only works in switch statements',
        'continue restarts the loop from index 0'
      ],
      answer: 'break terminates the loop completely, while continue only skips the rest of the current iteration'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration'
  },

  'js-6': {
    id: 'js-6',
    title: 'Functions, Arrow Functions & Closures',
    category: 'JavaScript',
    diagramType: 'js-functions',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// 1. Function Declaration (Hoisted)
function calculateTotal(price, taxRate = 0.08) {
  return price + (price * taxRate);
}
console.log("Total with default tax:", calculateTotal(100));

// 2. Modern Arrow Function (Concise syntax, lexical 'this')
const multiply = (a, b) => a * b;
console.log("Multiply 6 * 7:", multiply(6, 7));

// 3. Closure Demonstration (Function retaining access to outer scope)
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable encapsulated in closure!
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const myCounter = createCounter(10);
console.log("Increment:", myCounter.increment()); // 11
console.log("Increment:", myCounter.increment()); // 12
console.log("Private count:", myCounter.getCount()); // 12`,
    overview: {
      what: 'Functions are reusable blocks of code that take inputs (parameters), perform operations, and return output values. JavaScript supports Function Declarations, Function Expressions, Arrow Functions (=>), Callbacks, and Closures (functions bundled together with their lexical environment).',
      why: 'Functions are the fundamental building blocks of JavaScript applications—enabling modular code reuse, data encapsulation, functional pipelines, event handling, and asynchronous orchestration.',
      whereUsed: 'Universal: React components, Express API route handlers, event listeners, utility calculation libraries, and state managers.'
    },
    coreConcepts: [
      {
        title: 'Arrow Functions (=>) vs Standard Functions',
        explanation: 'Arrow functions provide a concise syntax with implicit returns for single expressions. Crucially, arrow functions do NOT bind their own this, arguments, or super—they lexically inherit this from the enclosing outer scope.',
        terms: [
          { term: 'Arrow Function', definition: 'const fn = (x) => x * 2; Concise syntax with lexical this.' },
          { term: 'Implicit Return', definition: 'Omitting {} curly braces automatically returns the single expression value.' },
          { term: 'Lexical this', definition: 'this refers to whatever this was in the parent scope where the arrow function was defined.' }
        ],
        relationship: 'Use arrow functions for callbacks, array methods, and short utilities; use standard functions for methods requiring dynamic this.'
      },
      {
        title: 'Closures & Lexical Scope',
        explanation: 'A closure is the combination of a function and the lexical environment within which that function was declared. Closures give an inner function access to an outer enclosing function\'s scope even after the outer function has finished executing.',
        terms: [
          { term: 'Closure', definition: 'Preserves private variables in memory across subsequent invocations.' },
          { term: 'Data Encapsulation', definition: 'Hiding internal state from direct external modification (OOP private variables).' }
        ],
        relationship: 'React Hooks (like useState) and private module factories rely directly on JavaScript closures.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Standard Declaration
function add(a, b) {
  return a + b;
}

// Arrow Function with Implicit Return
const addArrow = (a, b) => a + b;

// Closure Factory Pattern
function makeGreeter(greeting) {
  return (name) => \`\${greeting}, \${name}!\`;
}`,
      breakdown: [
        { part: '(a, b = 0)', meaning: 'Parameters with optional default value assignments.' },
        { part: '=> a + b', meaning: 'Arrow token followed by concise implicit return value.' }
      ],
      conventions: [
        'Use default parameters (taxRate = 0.08) instead of manual taxRate = taxRate || 0.08 checks.',
        'Keep functions pure: given the same inputs, always return the same output without modifying global state.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Pure Utility Function with Default Parameters',
        description: 'Calculating discounted prices with default discount rates.',
        code: `const applyDiscount = (price, discountPercent = 10) => {
  return price - (price * (discountPercent / 100));
};

console.log("Default 10% on $50:", applyDiscount(50));
console.log("Custom 25% on $100:", applyDiscount(100, 25));`,
        explanation: 'Concise arrow function with default parameter fallback.'
      },
      {
        level: 'Intermediate',
        title: 'Debounce Function using Closures',
        description: 'Limiting how often an expensive function (like search input autocomplete) can fire.',
        code: `function debounce(func, delay = 300) {
  let timerId; // Enclosed in closure!
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const performSearch = debounce((query) => {
  console.log("Searching API for:", query);
}, 200);

performSearch("Re");
performSearch("Rea");
performSearch("React"); // Only this final call fires after 200ms!`,
        explanation: 'The closure keeps timerId private and resets the countdown on each keystroke.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Memoization Cache Factory',
        description: 'Caching expensive computation results using a closure map.',
        code: `function memoize(fn) {
  const cache = new Map(); // Private cache in closure
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("[Cache Hit] Returning cached result for:", key);
      return cache.get(key);
    }
    console.log("[Computing] Calculating expensive result for:", key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFactorial = memoize((n) => (n <= 1 ? 1 : n * expensiveFactorial(n - 1)));
console.log(expensiveFactorial(5)); // Computed
console.log(expensiveFactorial(5)); // Instant Cache Hit!`,
        explanation: 'Encapsulates a persistent lookup cache without polluting the global namespace.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Define Function Scope and Purpose',
        instruction: 'Write small, single-responsibility functions that perform one specific task.',
        whyNecessary: 'Makes testing and debugging straightforward.',
        codeSnippet: `const sanitizeInput = (text) => text.trim().toLowerCase();`
      },
      {
        step: 2,
        title: 'Assign Default Parameters',
        instruction: 'Add default parameter values for optional arguments.',
        whyNecessary: 'Prevents NaN or undefined runtime errors.',
        codeSnippet: `const formatGreeting = (name = "Guest") => \`Hello \${name}\`;`
      },
      {
        step: 3,
        title: 'Leverage Closures for Encapsulation',
        instruction: 'Return inner functions when you need to maintain private internal state across invocations.',
        whyNecessary: 'Protects state from being tampered with by external scripts.',
        codeSnippet: `function makeStore() { let state = 0; return () => ++state; }`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Prefer arrow functions for callbacks and inline expressions.',
        'Avoid modifying parameter objects directly; return newly computed values.',
        'Use default parameter assignments.'
      ],
      structureRecommendations: [
        'Limit functions to under 25 lines of code whenever possible.'
      ],
      performanceConsiderations: [
        'Be mindful of memory in closures: variables referenced by a long-lived closure cannot be garbage collected.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using an arrow function as an object method and expecting this to refer to that object.',
        howToAvoid: 'Use standard method syntax (method() { return this.name; }) when dynamic this is required.',
        debuggingTip: 'If this.property returns undefined, check if an arrow function was used.'
      },
      {
        mistake: 'Forgetting to return a value when using curly braces in an arrow function ((a, b) => { a + b }).',
        howToAvoid: 'Either remove {} for implicit return or add an explicit return keyword.',
        debuggingTip: 'Check if the function returns undefined.'
      }
    ],
    projectApplications: [
      {
        domain: 'React Custom Hooks & State Stores',
        description: 'Building custom hooks that encapsulate state management logic through closures.'
      },
      {
        domain: 'API Middleware & Pipelines',
        description: 'Chaining authentication, logging, and data validation functions in Express or Fastify.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Write an arrow function that converts temperatures from Celsius to Fahrenheit ((c * 9/5) + 32).',
        'Create a closure-based createBankAccount(initialBalance) that exposes deposit(), withdraw(), and getBalance().'
      ],
      codingChallenge: {
        prompt: 'Create a function createMultiplier(factor) that returns a new function multiplying any number by that factor.',
        hint: 'Return (number) => number * factor.'
      },
      miniProjectIdea: {
        title: 'Interactive Event Rate Limiter',
        description: 'Build a button click throttle simulator that only allows 1 action per second using closures and setTimeout.'
      }
    },
    summary: {
      keyPoints: [
        'Functions promote modular code reuse and testability.',
        'Arrow functions provide concise syntax and inherit this lexically.',
        'Closures enable private state encapsulation and power modern state libraries.'
      ],
      skillsAcquired: [
        'Proficiency in standard and arrow function declarations.',
        'Mastery of lexical scope, closures, and variable encapsulation.',
        'Ability to implement advanced functional patterns (debounce, memoization).'
      ]
    },
    exercise: {
      question: 'What is a JavaScript Closure?',
      options: [
        'A function bundled together with references to its surrounding lexical state',
        'A syntax error that prevents code from running',
        'A loop that cannot be exited',
        'An HTML tag that closes a script block'
      ],
      answer: 'A function bundled together with references to its surrounding lexical state'
    },
    exam: {
      question: 'Why do arrow functions (() => {}) behave differently than standard function declarations regarding this?',
      options: [
        'Arrow functions do not bind their own this; they inherit this lexically from the enclosing scope',
        'Arrow functions can only be executed once',
        'Arrow functions cannot accept parameters',
        'Arrow functions are synchronous only'
      ],
      answer: 'Arrow functions do not bind their own this; they inherit this lexically from the enclosing scope'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'
  },

  'js-7': {
    id: 'js-7',
    title: 'Array Methods (map, filter, reduce)',
    category: 'JavaScript',
    diagramType: 'js-arrays',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Modern Array Methods: map, filter, reduce, find
const products = [
  { id: 1, name: "Mechanical Keyboard", price: 120, inStock: true },
  { id: 2, name: "Wireless Mouse", price: 50, inStock: false },
  { id: 3, name: "Ultra-Wide Monitor", price: 450, inStock: true },
  { id: 4, name: "USB-C Hub", price: 30, inStock: true }
];

// 1. FILTER: Get only products in stock
const availableProducts = products.filter(p => p.inStock);
console.log("In-Stock count:", availableProducts.length);

// 2. MAP: Transform products into array of names and formatted prices
const productTitles = availableProducts.map(p => \`\${p.name} ($ \${p.price})\`);
console.log("Titles:", productTitles);

// 3. REDUCE: Compute total inventory value of available products
const totalValue = availableProducts.reduce((sum, p) => sum + p.price, 0);
console.log("Total Available Inventory Value: $" + totalValue);

// 4. FIND: Locate specific item by ID
const monitor = products.find(p => p.id === 3);
console.log("Found Product:", monitor?.name);`,
    overview: {
      what: 'Arrays are ordered list collections of data values. Modern JavaScript provides powerful higher-order functional methods (.map(), .filter(), .reduce(), .find(), .some(), .every(), .slice()) that process and transform data immutably without manual index loops.',
      why: 'Functional array methods eliminate index tracking bugs, keep data transformations declarative and chainable, and are the primary way UI frameworks like React render dynamic lists from state data.',
      whereUsed: 'Essential in full-stack engineering: transforming API payloads, calculating totals, filtering e-commerce catalogs, and mapping database rows to UI components.'
    },
    coreConcepts: [
      {
        title: 'The Big Three: map, filter, reduce',
        explanation: 'Each method serves a distinct mathematical data transformation purpose.',
        terms: [
          { term: '.map(fn)', definition: 'Transforms every item in an array into a new item of equal length array without mutating original.' },
          { term: '.filter(fn)', definition: 'Evaluates each item with a boolean test; returns a new array containing ONLY matching items.' },
          { term: '.reduce(fn, initialVal)', definition: 'Reduces an entire array into a single accumulated output value (number, object, or aggregated map).' }
        ],
        relationship: 'Chain them together: products.filter(...).map(...).reduce(...).'
      },
      {
        title: 'Mutating vs Non-Mutating Methods',
        explanation: 'Some legacy methods modify the original array in place (Mutating), while modern functional methods return a brand new array (Immutable/Non-Mutating).',
        terms: [
          { term: 'Immutable Methods (Safe)', definition: '.map(), .filter(), .slice(), .concat(), .toSorted(), .toReversed().' },
          { term: 'Mutating Methods (Caution)', definition: '.push(), .pop(), .splice(), .sort(), .reverse().' }
        ],
        relationship: 'In React and Redux state management, always use non-mutating methods to preserve state integrity.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// 1. Map: Transformed array of same length
const doubled = numbers.map(num => num * 2);

// 2. Filter: Subset matching condition
const evens = numbers.filter(num => num % 2 === 0);

// 3. Reduce: Single accumulated result
const sum = numbers.reduce((acc, current) => acc + current, 0);`,
      breakdown: [
        { part: '.map((item, index, array) => ...)', meaning: 'Callback receives current element, index, and source array.' },
        { part: '.reduce((acc, item) => ..., 0)', meaning: 'Initial accumulator value is 0; returned value becomes next accumulator.' }
      ],
      conventions: [
        'Always supply an explicit initial accumulator value to .reduce() (e.g. 0 or {}).',
        'Prefer .find() over .filter()[0] when locating a single item.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Transforming String Formats with .map()',
        description: 'Capitalizing an array of user names.',
        code: `const rawNames = ["alex", "jordan", "taylor"];
const formatted = rawNames.map(name => name.charAt(0).toUpperCase() + name.slice(1));

console.log("Formatted names:", formatted);`,
        explanation: 'Generates a new array with transformed capitalized strings.'
      },
      {
        level: 'Intermediate',
        title: 'Method Chaining for E-Commerce Data Pipeline',
        description: 'Filtering affordable items, applying a discount, and summing total cost in one fluent chain.',
        code: `const cartItems = [
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Mouse", price: 40, category: "Electronics" },
  { name: "Coffee", price: 15, category: "Groceries" },
  { name: "Headphones", price: 150, category: "Electronics" }
];

const totalElectronicsWithDiscount = cartItems
  .filter(item => item.category === "Electronics")
  .map(item => item.price * 0.9) // 10% off
  .reduce((sum, discountedPrice) => sum + discountedPrice, 0);

console.log("Electronics Total: $" + totalElectronicsWithDiscount);`,
        explanation: 'Chaining .filter().map().reduce() creates a readable, declarative data pipeline.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Grouping Array of Objects by Category with .reduce()',
        description: 'Transforming flat database rows into a grouped category dictionary.',
        code: `const tasks = [
  { id: 1, title: "Design UI", status: "Done" },
  { id: 2, title: "Implement API", status: "In Progress" },
  { id: 3, title: "Write Tests", status: "In Progress" },
  { id: 4, title: "Deploy to Prod", status: "Todo" }
];

const groupedTasks = tasks.reduce((groups, task) => {
  const status = task.status;
  if (!groups[status]) groups[status] = [];
  groups[status].push(task.title);
  return groups;
}, {});

console.log("Grouped Kanban Board:", JSON.stringify(groupedTasks, null, 2));`,
        explanation: 'Demonstrates building a complex dictionary map from an array in a single reduce pass.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Select the Appropriate Method',
        instruction: 'If modifying every item -> .map(). If removing items -> .filter(). If calculating a single sum or map -> .reduce(). If finding 1 item -> .find().',
        whyNecessary: 'Communicates code intent clearly.',
        codeSnippet: `const ids = users.map(u => u.id);`
      },
      {
        step: 2,
        title: 'Keep Callbacks Pure',
        instruction: 'Do not mutate outside variables inside a .map() callback; return new values.',
        whyNecessary: 'Prevents side-effects and concurrency issues.',
        codeSnippet: `const updated = users.map(u => ({ ...u, active: true }));`
      },
      {
        step: 3,
        title: 'Provide Explicit Initial Value in Reduce',
        instruction: 'Always pass the second argument (0, [], or {}) to .reduce().',
        whyNecessary: 'Prevents TypeError: Reduce of empty array with no initial value on empty datasets.',
        codeSnippet: `items.reduce((acc, curr) => acc + curr.qty, 0);`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use non-mutating array methods in modern UI frameworks.',
        'Use .some() or .every() for clean boolean array checks.',
        'Use .find() when looking for a single element instead of .filter()[0].'
      ],
      structureRecommendations: [
        'Break long chained methods onto separate indented lines for readability.'
      ],
      performanceConsiderations: [
        'Chaining 10 methods on arrays with 1,000,000+ items creates intermediate allocations; use a single .reduce() or for loop for massive datasets.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using .map() like .forEach() without returning any value.',
        howToAvoid: 'If you do not intend to use the returned transformed array, use .forEach() instead.',
        debuggingTip: 'Check if .map() returns an array of [undefined, undefined].'
      },
      {
        mistake: 'Using .sort() directly on state arrays (mutates original array in place!).',
        howToAvoid: 'Use array.toSorted() or [...array].sort() to clone before sorting.',
        debuggingTip: 'Verify if the original array order was modified unintentionally.'
      }
    ],
    projectApplications: [
      {
        domain: 'React List Rendering',
        description: 'Mapping state arrays to JSX elements (users.map(u => <UserCard key={u.id} user={u} />)).'
      },
      {
        domain: 'Financial & Analytics Dashboards',
        description: 'Calculating revenues, average transaction sizes, and filtering date ranges.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Given an array of student test scores ([85, 92, 78, 64, 99]), use .filter() to get passing scores (>=75) and .reduce() to compute the average.',
        'Use .find() to locate a user with email "jane@example.com" from an array of user objects.'
      ],
      codingChallenge: {
        prompt: 'Write a function tallyWordCounts(words) using .reduce() that takes an array of words and returns an object with the count of each word.',
        hint: 'Use acc[word] = (acc[word] || 0) + 1; return acc;.'
      },
      miniProjectIdea: {
        title: 'Live Product Catalog Filter & Sorter',
        description: 'Build an interactive product directory that filters by category and price range and calculates the cart subtotal in real time.'
      }
    },
    summary: {
      keyPoints: [
        '.map() transforms all elements; .filter() extracts matching elements; .reduce() accumulates into a single value.',
        'Functional methods return new arrays without mutating the source dataset.',
        'Always provide an initial value to .reduce().'
      ],
      skillsAcquired: [
        'Mastery of modern JavaScript functional array processing.',
        'Proficiency in method chaining for data transformation pipelines.',
        'Deep understanding of mutable vs immutable array operations.'
      ]
    },
    exercise: {
      question: 'Which array method returns a BRAND NEW array containing only elements that pass a given boolean condition?',
      options: ['.filter()', '.map()', '.reduce()', '.splice()'],
      answer: '.filter()'
    },
    exam: {
      question: 'Why should you always supply an initial value (such as 0 or {}) as the second argument to .reduce()?',
      options: [
        'To prevent runtime errors if the array is empty and guarantee a predictable return data type',
        'To force the reduction to execute asynchronously',
        'To sort the array before reduction',
        'Because JavaScript requires it as a syntax rule'
      ],
      answer: 'To prevent runtime errors if the array is empty and guarantee a predictable return data type'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'
  },

  'js-8': {
    id: 'js-8',
    title: 'Objects, Destructuring & This',
    category: 'JavaScript',
    diagramType: 'js-objects',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Objects, Object Destructuring, Spread, and 'this'
const userProfile = {
  id: "USR-101",
  username: "alex_dev",
  email: "alex@example.com",
  details: {
    city: "Seattle",
    country: "USA"
  },
  // Object Method
  getBio() {
    return \`User \${this.username} from \${this.details.city}\`;
  }
};

console.log("Bio:", userProfile.getBio());

// Object Destructuring with Aliasing and Default Values
const { username: handle, email, role = "Subscriber" } = userProfile;
console.log("Handle:", handle);
console.log("Role (default):", role);

// Nested Destructuring
const { details: { city } } = userProfile;
console.log("City:", city);

// Object Spread for Immutable Updates
const updatedProfile = {
  ...userProfile,
  role: "Lead Developer",
  lastLogin: new Date().toLocaleDateString()
};
console.log("Updated Profile:", updatedProfile.role, updatedProfile.lastLogin);`,
    overview: {
      what: 'Objects are collections of key-value pairs used to model real-world entities, structured configurations, and application state. Modern JavaScript features include Object Destructuring, Property Shorthand, Spread syntax (...), Computed property keys, and the this contextual execution keyword.',
      why: 'Objects are the primary data structure for JavaScript APIs, state stores, database models, and library configurations. Destructuring and spread syntax dramatically reduce boilerplate code and ensure safe immutable updates.',
      whereUsed: 'Ubiquitous in React props, JSON payloads, configuration objects (Webpack/Vite/Express), MongoDB documents, and state management.'
    },
    coreConcepts: [
      {
        title: 'Object Destructuring & Spread Syntax',
        explanation: 'Destructuring unpacks properties from objects into distinct variables with concise syntax. Spread syntax (...) clones and merges object properties without mutating original objects.',
        terms: [
          { term: 'Destructuring', definition: 'const { name, age } = user; Extracts properties directly.' },
          { term: 'Renaming / Aliasing', definition: 'const { username: userHandle } = user; Renames the unpacked variable.' },
          { term: 'Object Spread (...)', definition: 'const updated = { ...user, active: true }; Shallow clones properties and overrides specified keys.' }
        ],
        relationship: 'Destructuring pulls data apart; Spread puts data together.'
      },
      {
        title: 'The this Keyword Execution Context',
        explanation: 'In JavaScript, this refers to the object that is executing the current function. Its value is determined at RUNTIME based on HOW the function is called.',
        terms: [
          { term: 'Method Invocation', definition: 'When called as obj.method(), this points to obj.' },
          { term: 'Global / Standalone Invocation', definition: 'Standalone function calls bind this to window (or undefined in strict mode).' },
          { term: 'Arrow Function this', definition: 'Arrow functions do not bind this; they retain this from outer enclosing lexical scope.' }
        ],
        relationship: 'Use standard methods (method() {}) for object methods; use arrow functions inside callbacks to retain outer this.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Destructuring with Defaults & Aliasing
const { key: newName = defaultValue } = object;

// Immutable Object Clone & Override
const newObject = {
  ...originalObject,
  modifiedKey: newValue
};

// Object Methods
const service = {
  name: "AuthService",
  start() {
    console.log(this.name + " running");
  }
};`,
      breakdown: [
        { part: 'const { a, b } = obj', meaning: 'Creates variables a and b containing matching property values.' },
        { part: '{ ...obj, extra: 1 }', meaning: 'Creates new object containing all properties of obj plus extra.' }
      ],
      conventions: [
        'Always destructure function parameters (function renderCard({ title, price })).',
        'Use spread syntax for state updates to avoid mutating original objects.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Parameter Destructuring in Functions',
        description: 'Unpacking configuration options cleanly in function signatures.',
        code: `function createAlert({ message, type = "info", autoClose = true }) {
  console.log(\`[\${type.toUpperCase()}] \${message} (AutoClose: \${autoClose})\`);
}

createAlert({ message: "File uploaded successfully", type: "success" });`,
        explanation: 'Provides clear named parameters and default fallback values.'
      },
      {
        level: 'Intermediate',
        title: 'Object Methods and this Context',
        description: 'Using this to access sibling properties inside object methods.',
        code: `const bankAccount = {
  owner: "Sophia",
  balance: 500,
  deposit(amount) {
    this.balance += amount;
    return \`\${this.owner} new balance: $\${this.balance}\`;
  },
  getBalance() {
    return \`Balance: $\${this.balance}\`;
  }
};

console.log(bankAccount.deposit(150));
console.log(bankAccount.getBalance());`,
        explanation: 'this.balance accesses the instance property inside the method.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Immutable State Reducer Pattern',
        description: 'Updating nested user settings immutably using spread operators.',
        code: `const initialState = {
  user: { id: 1, name: "Lucas" },
  theme: "light",
  notifications: { email: true, push: false }
};

// Update only theme and enable push notifications:
const nextState = {
  ...initialState,
  theme: "dark",
  notifications: {
    ...initialState.notifications,
    push: true
  }
};

console.log("Initial theme:", initialState.theme); // light
console.log("Next theme:", nextState.theme);       // dark
console.log("Next push:", nextState.notifications.push); // true`,
        explanation: 'Shallow spread at every nested level preserves immutable state integrity.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Destructure Properties Early',
        instruction: 'Extract properties at the top of functions or component declarations.',
        whyNecessary: 'Eliminates repetitive props.user.name references throughout your code.',
        codeSnippet: `const { id, title, completed } = todoItem;`
      },
      {
        step: 2,
        title: 'Use Spread for Cloning and Merging',
        instruction: 'When modifying state objects, create a new object with { ...oldObj, key: newVal }.',
        whyNecessary: 'Prevents side-effect reference mutations in other parts of the application.',
        codeSnippet: `const updatedUser = { ...user, role: 'admin' };`
      },
      {
        step: 3,
        title: 'Use Object.keys(), values(), and entries()',
        instruction: 'Traverse objects using modern static reflection methods.',
        whyNecessary: 'Provides clean array interfaces for iterating and converting objects.',
        codeSnippet: `Object.entries(settings).forEach(([key, val]) => ...);`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use object destructuring in function parameter lists.',
        'Never mutate state objects directly; use the spread operator (...).',
        'Use Object.freeze() when defining fixed configuration constants.'
      ],
      structureRecommendations: [
        'Keep object structures shallow when possible to simplify destructuring and updates.'
      ],
      performanceConsiderations: [
        'V8 engines optimize objects with consistent "hidden classes" (same property order across instances).'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using an arrow function for an object method that needs this (const obj = { name: "A", get: () => this.name }).',
        howToAvoid: 'Use standard method syntax (get() { return this.name; }).',
        debuggingTip: 'Check if this is window or undefined.'
      },
      {
        mistake: 'Forgetting that object spread (...) is shallow (nested objects are still copied by reference).',
        howToAvoid: 'Spread nested objects explicitly or use structuredClone() for deep trees.',
        debuggingTip: 'Check if changing nextState.nested.val altered initialState.nested.val.'
      }
    ],
    projectApplications: [
      {
        domain: 'React Component Props',
        description: 'Unpacking props directly in functional components (const Card = ({ title, img, price }) => ...).'
      },
      {
        domain: 'API Query Parameter Builders',
        description: 'Constructing dynamic URL search params from filter objects.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a book object with title, author, and rating. Destructure title and alias rating to userScore.',
        'Use Object.entries() to iterate over a user object and log all key-value pairs.'
      ],
      codingChallenge: {
        prompt: 'Write a function mergeConfigs(defaultConfig, userConfig) that returns a merged object where userConfig overrides matching defaultConfig properties.',
        hint: 'Use { ...defaultConfig, ...userConfig }.'
      },
      miniProjectIdea: {
        title: 'Interactive User Profile Editor',
        description: 'Build an editor widget that updates profile fields immutably using spread operators and displays live JSON state output.'
      }
    },
    summary: {
      keyPoints: [
        'Objects store structured key-value entities and state.',
        'Destructuring unpacks properties concisely with optional renaming and default values.',
        'The spread operator (...) allows safe immutable cloning and updates.'
      ],
      skillsAcquired: [
        'Proficiency in object destructuring and parameter unpacking.',
        'Mastery of immutable object updates using the spread operator.',
        'Deep understanding of this execution context and method binding.'
      ]
    },
    exercise: {
      question: 'Which syntax correctly unpacks the username property from a user object and renames the variable to handle?',
      options: [
        'const { username: handle } = user;',
        'const { username as handle } = user;',
        'const { handle = username } = user;',
        'const [ username -> handle ] = user;'
      ],
      answer: 'const { username: handle } = user;'
    },
    exam: {
      question: 'What happens to this when an arrow function (() => {}) is used as an object method?',
      options: [
        'this does not bind to the object; it retains the this value of the enclosing lexical scope (often window or undefined)',
        'this automatically freezes the object',
        'this points to the object prototype',
        'this throws a compilation error'
      ],
      answer: 'this does not bind to the object; it retains the this value of the enclosing lexical scope (often window or undefined)'
    },
    materialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects'
  }
};
