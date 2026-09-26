const LANGUAGE_INFO = {
  c: { name: 'C', codeLanguage: 'c', family: 'C', typing: 'C checks declared types at compile time; arrays have a fixed element type and do not carry their own length.' },
  cpp: { name: 'C++', codeLanguage: 'cpp', family: 'C++', typing: 'C++ is statically typed and supports both direct resource control and higher-level standard-library types such as std::vector.' },
  csharp: { name: 'C#', codeLanguage: 'csharp', family: 'C#', typing: 'C# is statically typed; the compiler can infer a local type with var, while the value still has a fixed type.' },
  java: { name: 'Java', codeLanguage: 'java', family: 'Java', typing: 'Java is statically typed; local variables and collection elements have declared or inferred compile-time types.' },
  python: { name: 'Python', codeLanguage: 'python', family: 'Python', typing: 'Python is dynamically typed: names refer to objects, and a name can later refer to a value of another type.' },
  go: { name: 'Go', codeLanguage: 'go', family: 'Go', typing: 'Go is statically typed, uses short declarations inside functions, and makes error handling explicit in return values.' },
  php: { name: 'PHP', codeLanguage: 'php', family: 'PHP', typing: 'PHP is dynamically typed by default; scalar declarations and strict_types can make function boundaries more explicit.' },
  ruby: { name: 'Ruby', codeLanguage: 'ruby', family: 'Ruby', typing: 'Ruby is dynamically typed and object-oriented; blocks and Enumerable methods are central to idiomatic iteration.' },
  js: { name: 'JavaScript', codeLanguage: 'javascript', family: 'JavaScript', typing: 'JavaScript is dynamically typed; const prevents rebinding a name, while object contents can still be mutable.' },
  node: { name: 'Node.js', codeLanguage: 'javascript', family: 'Node.js', typing: 'Node.js runs JavaScript outside the browser and exposes server-side APIs such as filesystem and networking modules.' }
};

const LESSONS = {
  introduction: {
    overview: 'A program is a sequence of precise instructions that transforms input into useful output. In this first lesson, follow one statement from source code to execution, and run a small program in the language runtime.',
    why: 'Knowing how source becomes a running program makes compiler, interpreter, and error messages less mysterious. It also gives you a repeatable way to check every later example.',
    where: 'You will use this workflow whenever you create a command-line tool, web service, desktop app, or automation script.',
    detail: 'Start with the smallest observable behavior: make the runtime print one line. Notice the program entry point, the output function, and the command or environment that runs the file. For C#, the conventional entry point is Main; the .NET SDK compiles the project and the .NET runtime executes its output.',
    terms: [['Source code', 'The human-readable instructions stored in a source file.'], ['Runtime', 'The compiler, virtual machine, or interpreter that turns program instructions into behavior.'], ['Entry point', 'The first function or statement execution begins from.']],
    exercise: 'Run the sample, change the message to name one problem this language is used to solve, and run it again. Record the exact command or IDE action you used.',
    hint: 'Keep the file name, source extension, and runtime command together so you can repeat the run from a clean terminal.',
    project: 'First Run Notes', projectText: 'Create a tiny program that prints your name and one sentence about what you want to build. Add a README with the exact steps needed to run it.',
    quiz: 'What does a program entry point determine?', answer: 'Where execution begins when the program is run', wrong: ['Which variable has the largest value', 'How source files are alphabetized', 'Which output device is connected'],
    exam: 'A source file is saved but nothing runs yet. What must happen next?', examAnswer: 'Use the language toolchain or runtime to compile or execute the source from its entry point'
  },
  'variables-data-types': {
    overview: 'A variable is a name bound to a value so a program can remember, reuse, and update information. Types describe which values are valid and which operations make sense for them.',
    why: 'Choosing the right type prevents invalid states and clarifies intent. A price, a character, a true/false setting, and a person’s name are not interchangeable kinds of data.',
    where: 'Variables hold form input, counters, configuration, measurements, and domain data throughout an application.',
    detail: 'Compare declaration with initialization: a declaration introduces a name; initialization gives it its first value. In statically typed languages a local keeps its declared type. In dynamic languages the name refers to an object and can be rebound. Prefer names that reveal meaning, such as itemCount, over vague names such as x.',
    terms: [['Declaration', 'Introducing a variable name and, in many languages, its type.'], ['Initialization', 'Assigning the first value to a variable.'], ['Type safety', 'Preventing operations that do not make sense for a value’s type.']],
    exercise: 'Represent a learner profile with a name, age, course fee, first initial, and enrollment status. Print each value with a label and choose an appropriate type for each.',
    hint: 'Use whole-number, decimal, text, single-character, and Boolean values for different fields; avoid storing everything as text.',
    project: 'Learner Profile Card', projectText: 'Collect or define a learner’s name, age, chosen track, and active status, then print a neatly labeled profile.',
    quiz: 'Why should a course fee use a numeric type instead of a string?', answer: 'A numeric type supports arithmetic and comparisons while rejecting text that is not a valid amount', wrong: ['Strings cannot be printed', 'Numeric variables cannot be changed', 'A string always uses less memory'],
    exam: 'A counter must be incremented and compared with a limit. Which representation is most suitable?', examAnswer: 'An integer variable initialized to zero, then incremented and compared numerically'
  },
  operators: {
    overview: 'Operators combine values into new results. Arithmetic operators calculate, comparison operators produce true/false decisions, and logical operators combine those decisions.',
    why: 'Programs use operators to calculate totals, validate ranges, compare state, and decide whether an action is allowed.',
    where: 'You will see operators in pricing, input validation, search filters, game rules, and conditional expressions.',
    detail: 'Precedence controls which operation runs first: multiplication generally happens before addition, while parentheses make intent explicit. Integer division and remainder can behave differently from decimal division, so choose operand types deliberately. Use &&/and and ||/or to combine conditions in the syntax of your language.',
    terms: [['Operand', 'A value that an operator reads.'], ['Precedence', 'The rule that determines which operator is evaluated first.'], ['Remainder', 'The leftover amount after integer division, often written with %.']],
    exercise: 'Calculate the remaining seats after groups of a given size are assigned. Use division to find full groups and remainder to find seats left over.',
    hint: 'Try a capacity of 53 and group size of 8; the remainder should be 5.',
    project: 'Event Seat Calculator', projectText: 'Given a room capacity and group size, report full groups, leftover seats, and whether a requested group fits.',
    quiz: 'What is the value of 17 % 5 in the common remainder operator?', answer: '2', wrong: ['3', '3.4', '0'],
    exam: 'Why add parentheses around a mixed arithmetic expression?', examAnswer: 'To make the intended evaluation order explicit and prevent precedence from changing the calculation'
  },
  'input-output': {
    overview: 'Input brings data into a program; output communicates a result. A useful program validates input before using it and labels output so a person can understand it.',
    why: 'Without input, programs cannot respond to users or external data. Without clear output, users cannot tell what the program did.',
    where: 'Command-line tools read from a terminal, web programs read requests, and applications write results to screens, files, or services.',
    detail: 'Input often arrives as text even when the program needs a number. Parse it deliberately and handle invalid input instead of assuming conversion always succeeds. Keep prompts, parsing, and calculations separate so each can be changed or tested independently.',
    terms: [['Input source', 'The place a program receives data from, such as a terminal or request.'], ['Parsing', 'Converting raw text into a typed value.'], ['Output', 'Information the program sends to a user or another system.']],
    exercise: 'Ask for a quantity and a unit price, parse both values, then display the subtotal with a descriptive label. Decide what should happen if the quantity is not numeric.',
    hint: 'Keep raw input in a text variable first, then convert it and handle conversion failure.',
    project: 'Simple Checkout Prompt', projectText: 'Read an item name, quantity, and price; print a receipt line and a calculated subtotal.',
    quiz: 'Why should a program validate text before converting it to a number?', answer: 'The input may not represent a valid number, and conversion can fail or produce an unusable value', wrong: ['Numbers cannot be printed', 'Text input is always encrypted', 'Validation makes input impossible to change'],
    exam: 'A user enters “ten” where an integer is expected. What is a robust response?', examAnswer: 'Detect the failed parse, explain the expected format, and ask for valid input again'
  },
  'conditional-statements': {
    overview: 'A conditional chooses which code path runs by evaluating a Boolean expression. An if/else chain is useful for a few exclusive cases; a switch or match is often clearer for many fixed alternatives.',
    why: 'Decision logic lets a program respond differently to different data instead of executing the same instructions for every case.',
    where: 'Conditionals control access, validate forms, classify scores, select prices, and handle application states.',
    detail: 'Write conditions around meaningful boundaries and order overlapping cases carefully. If score >= 90 appears after score >= 70, the first branch may capture values meant for the second. Include a default or final else when unexpected values need a deliberate outcome.',
    terms: [['Condition', 'An expression evaluated as true or false.'], ['Branch', 'One possible block of code chosen by a conditional.'], ['Boundary case', 'A value at or near the edge of a rule, such as exactly 70 points.']],
    exercise: 'Classify a numeric score as pass or retry using 60 as the threshold. Then add an “excellent” result at 90 without making the ranges overlap incorrectly.',
    hint: 'Check the highest threshold first, then the pass threshold, then the remaining case.',
    project: 'Score Classifier', projectText: 'Accept a score from 0 to 100, reject values outside the range, and print a meaningful achievement label.',
    quiz: 'When should the most restrictive score condition be checked first?', answer: 'When conditions overlap, checking the higher threshold first prevents a broad branch from catching it early', wrong: ['Only when scores are strings', 'Never; branch order has no effect', 'Only to make output alphabetical'],
    exam: 'How should a score of exactly 60 be classified when passing requires at least 60?', examAnswer: 'As a pass, using an inclusive comparison such as score >= 60'
  },
  loops: {
    overview: 'A loop repeats a block while work remains. A for loop suits a known count, a while loop suits a condition-controlled repetition, do-while runs its body at least once, and foreach visits each item in a collection.',
    why: 'Loops replace copy-pasted instructions with one rule that handles many values, from processing list entries to retrying user input.',
    where: 'Loops power collection processing, game updates, retries, batch jobs, and repeated calculations.',
    detail: 'A counted loop has initialization, a continuation test, and an update. If the update never moves toward the stopping condition, the loop may never end. break exits the nearest loop; continue skips to the next iteration. Prefer foreach when the task is simply to visit every item.',
    terms: [['Iteration', 'One pass through a loop body.'], ['Termination condition', 'The condition that eventually becomes false and ends a loop.'], ['Infinite loop', 'A loop whose stopping condition is never reached.']],
    exercise: 'Print the even numbers from 2 through 20. Then calculate their sum and explain which part of the loop advances to the next even number.',
    hint: 'Initialize at 2, continue while the value is at most 20, and add 2 after each pass.',
    project: 'Practice Session Timer', projectText: 'Print numbered study intervals and a short break message after each interval; allow the interval count to be changed.',
    quiz: 'Which loop construct is designed to visit each item in a collection?', answer: 'foreach (or the language’s equivalent collection iteration)', wrong: ['A conditional branch', 'A constructor', 'A return statement'],
    exam: 'A loop starts at 0, continues while i < 10, but never updates i. What happens?', examAnswer: 'The condition remains true and the loop runs indefinitely unless interrupted'
  },
  functions: {
    overview: 'A function or method gives a named operation a clear input and output. Parameters receive caller-provided values; a return value sends a result back. A void procedure performs an action without returning a value.',
    why: 'Small functions reduce duplication and let a program describe intent at a higher level. Their boundaries also make behavior easier to test.',
    where: 'Functions organize calculations, validation, data conversion, event handling, and reusable application behavior.',
    detail: 'Choose a name that describes the result or action. Keep parameters focused, return calculated values instead of hiding them in global state, and distinguish a function that returns a result from a procedure that performs an effect. Method overloading uses the same name with different parameter signatures in languages that support it.',
    terms: [['Parameter', 'A named input declared by a function.'], ['Argument', 'A value supplied to a parameter when calling a function.'], ['Return value', 'The result sent back to the caller.']],
    exercise: 'Write Add(a, b) to return the sum, then write IsEven(number) to return whether the remainder after division by two is zero.',
    hint: 'Keep each function responsible for one calculation and call it with both ordinary and boundary values.',
    project: 'Reusable Tip Calculator', projectText: 'Create separate functions to calculate a tip, split a bill among people, and format the final amount.',
    quiz: 'What does a return value allow a caller to do?', answer: 'Store, display, compare, or pass the function’s computed result to another operation', wrong: ['Restart the program automatically', 'Change the function’s parameter names', 'Skip the function body'],
    exam: 'Why return a calculation instead of printing it inside the function?', examAnswer: 'Returning keeps calculation separate from output, so callers can reuse the result in different ways'
  },
  'arrays-collections': {
    overview: 'Collections store multiple related values. Arrays commonly provide indexed, fixed-size storage; lists and other collections can grow or offer specialized lookup behavior.',
    why: 'A collection lets one algorithm process a changing number of records without creating a separate variable for every item.',
    where: 'Collections represent search results, shopping baskets, sensor readings, game inventories, and rows returned from a database.',
    detail: 'Indexes often begin at zero, so the final valid index is count minus one. Keep count separate from the final index, and choose a collection based on the operations you need: ordered traversal, fast membership checks, or key-based lookup.',
    terms: [['Element', 'One value stored in a collection.'], ['Index', 'A numeric position used to access an element in an indexed collection.'], ['Length/count', 'The number of elements currently stored.']],
    exercise: 'Store five daily temperatures, calculate the average, and report how many readings are above that average.',
    hint: 'Use one pass to total the values and a second pass to count values above the computed average.',
    project: 'Weekly Temperature Summary', projectText: 'Record seven daily temperatures and report the minimum, maximum, average, and days warmer than the average.',
    quiz: 'For a zero-based array containing 5 items, what is the last valid index?', answer: '4', wrong: ['5', '6', '0'],
    exam: 'You need quick lookup by a unique username. Which collection idea is more suitable than scanning a list?', examAnswer: 'A key-to-value map or dictionary indexed by username'
  },
  'problem-solving': {
    overview: 'Problem solving begins by turning an unclear request into inputs, outputs, rules, and edge cases. An algorithm is the ordered procedure that transforms those inputs into the expected output.',
    why: 'Planning an algorithm before coding exposes missing cases and keeps implementation details from obscuring the actual problem.',
    where: 'This approach is useful in every feature: from calculating a bill to routing a request or searching a dataset.',
    detail: 'Trace a small example by hand, state an invariant that should remain true, and estimate how work grows as input gets larger. A linear scan is often the clearest first solution; optimize only when measurements or constraints justify it.',
    terms: [['Input', 'The data an algorithm receives.'], ['Invariant', 'A fact that should remain true during each step of an algorithm.'], ['Edge case', 'An unusual but valid input such as an empty list or a single item.']],
    exercise: 'Design an algorithm that finds the largest value in a non-empty list. Trace it for [7, 2, 11, 4], including the current maximum after each comparison.',
    hint: 'Start by treating the first element as the current maximum; compare each remaining value once.',
    project: 'Best Offer Finder', projectText: 'Given a set of product prices, identify the lowest valid price and report how many offers tie for it.',
    quiz: 'Why initialize a maximum search with the first list value instead of zero?', answer: 'The list may contain only negative values, so zero might not be an element or the true maximum', wrong: ['Zero cannot be compared', 'The first value is always the largest', 'It reduces the list length'],
    exam: 'A search should return no result for an empty list. What should the algorithm do before reading element zero?', examAnswer: 'Check whether the collection is empty and return an explicit no-result outcome'
  },
  debugging: {
    overview: 'Debugging is a repeatable investigation: reproduce the failure, observe the actual state, form a cause-and-effect hypothesis, make one change, and verify both the fix and nearby behavior.',
    why: 'A disciplined process finds the cause rather than hiding a symptom with an unrelated edit.',
    where: 'Debugging applies to compiler errors, incorrect calculations, failed requests, unexpected UI state, and production incidents.',
    detail: 'Read the first useful error location, inspect values at the point they diverge from expectations, and reduce a failing case to the smallest input that still demonstrates the bug. A regression test preserves the discovery so the same defect is caught later.',
    terms: [['Reproduction', 'A reliable set of steps or input that causes the defect.'], ['Hypothesis', 'A testable explanation for the observed behavior.'], ['Regression test', 'A check that prevents a fixed defect from returning.']],
    exercise: 'A loop intended to total five values skips the last one. Trace its starting value, comparison, and update; fix the boundary and test lists of length zero, one, and five.',
    hint: 'Compare the loop condition to the collection count, not to the final index as if it were a count.',
    project: 'Bug Report and Reproduction', projectText: 'Create a small program with one intentional off-by-one bug, write minimal reproduction steps, fix it, and add a boundary check.',
    quiz: 'What is the best first step when a bug is intermittent?', answer: 'Gather and record the conditions that reproduce it, including inputs and environment', wrong: ['Rewrite the whole program immediately', 'Remove all error handling', 'Assume the latest line of code is always responsible'],
    exam: 'A fix passes the original example but fails on an empty collection. What should happen next?', examAnswer: 'Add the empty input to the reproduction and tests, then correct the algorithm’s boundary handling'
  },
  'oop-introduction': {
    overview: 'Object-oriented programming models a domain as objects that combine state with behavior. A class or equivalent type describes a kind of object; an instance is one concrete object with its own values.',
    why: 'The model helps keep data and the operations that protect or use it together when a domain has several interacting entities.',
    where: 'Objects are common in user interfaces, simulations, business domains, game entities, and framework APIs.',
    detail: 'Begin from the domain, not from a desire to make every value a class. For a library, a Book may have a title and availability state while a Library coordinates a collection of books. Avoid giving an object responsibilities unrelated to its role.',
    terms: [['Class/type', 'A description of the state and behavior instances can have.'], ['Object/instance', 'A concrete value created from a class or type.'], ['State', 'The data that describes an object at a moment in time.']],
    exercise: 'Model a library Book with a title and checked-out state. Add a method that checks the book out only when it is available.',
    hint: 'The availability rule belongs close to the state it protects; do not let callers set impossible combinations freely.',
    project: 'Library Book Model', projectText: 'Create a Book type that can be checked out and returned, then demonstrate two books with different states.',
    quiz: 'What is the difference between a class and an object?', answer: 'A class describes a type; an object is one instance with its own state', wrong: ['A class is always a variable; an object is always a function', 'They are synonyms in every language', 'An object is a source file'],
    exam: 'Why model a checked-out book as an object instead of unrelated global variables?', examAnswer: 'The object groups a book’s data with the operations and rules that keep that data valid'
  },
  'oop-core-concepts': {
    overview: 'Core object-oriented building blocks include fields or properties for state, methods for behavior, constructors for valid initialization, and interfaces or base types for shared contracts.',
    why: 'Clear type boundaries make object creation predictable and help other code depend on behavior instead of implementation details.',
    where: 'These concepts are used in domain models, UI components, service layers, libraries, and test doubles.',
    detail: 'Initialize required state in a constructor, expose behavior through methods, and use an interface when multiple unrelated types need to promise the same operation. Prefer composition when one object needs another capability without forming a strict “is-a” relationship.',
    terms: [['Field/property', 'A named piece of state belonging to an object.'], ['Constructor', 'Initialization logic that prepares a valid instance.'], ['Interface', 'A contract describing operations a type promises to provide.']],
    exercise: 'Design a Wallet with a balance, a constructor that rejects a negative starting balance, and a Deposit method that rejects non-positive amounts.',
    hint: 'Test invalid values at the boundary where they enter the object, then verify the balance remains unchanged.',
    project: 'Wallet with Safe Deposits', projectText: 'Implement a wallet type with deposit and withdrawal behavior, preserving a non-negative balance invariant.',
    quiz: 'What is a constructor’s most important responsibility?', answer: 'Create an instance in a valid initial state', wrong: ['Print every field to the console', 'Replace all methods in the class', 'Run once for every property read'],
    exam: 'Two unrelated payment providers need a ProcessPayment operation. What lets a checkout depend on the shared capability?', examAnswer: 'A shared interface or contract implemented by each provider'
  },
  'oop-principles': {
    overview: 'Encapsulation protects invariants, abstraction exposes only useful operations, inheritance reuses and specializes an “is-a” relationship, and polymorphism lets callers use different implementations through one contract.',
    why: 'These principles help control change in larger programs, but applying them without a real design need can add indirection instead of clarity.',
    where: 'They are useful in systems with interchangeable strategies, domain rules, plugin APIs, and related but specialized types.',
    detail: 'For example, a checkout can accept a PaymentMethod contract; CardPayment and GiftCardPayment can implement it differently. The checkout need not inspect every concrete class. Keep inherited types substitutable: a subtype should preserve the promises callers rely on.',
    terms: [['Encapsulation', 'Controlling access to state so an object can enforce its rules.'], ['Abstraction', 'Showing essential operations while hiding implementation detail.'], ['Polymorphism', 'Using one contract with multiple behavior implementations.']],
    exercise: 'Define a Shape contract with an area operation and implement Circle and Rectangle without making the caller inspect their concrete types.',
    hint: 'Ask each object to calculate its own area through the shared contract.',
    project: 'Interchangeable Discount Rules', projectText: 'Create fixed-amount and percentage discount strategies that a checkout can apply through one common operation.',
    quiz: 'Which principle allows checkout code to use several payment implementations through one contract?', answer: 'Polymorphism', wrong: ['Loop termination', 'Variable shadowing', 'Static initialization'],
    exam: 'A subclass changes a method so callers can no longer rely on the base type’s promise. What design rule has it broken?', examAnswer: 'Substitutability: an instance of the subtype should honor the behavior promised by the base contract'
  },
  'language-specific-features': {
    overview: 'Every language has idioms that make common work safer or clearer. Learning a feature means understanding its behavior and trade-offs, not merely memorizing its syntax.',
    why: 'Idiomatic constructs make code easier for other developers in that language to read and help avoid accidental complexity.',
    where: 'Language features appear in everyday collection processing, error handling, resource management, and asynchronous work.',
    detail: 'Focus this lesson on the selected language’s signature strengths and limits. For example, Go makes errors ordinary return values; Python offers comprehensions; C# has LINQ and nullable reference analysis; modern C++ offers RAII and move semantics; JavaScript has promises and async/await. Choose the feature that solves a real readability or correctness problem.',
    terms: [['Idiom', 'A conventional, recognizable way to express an operation in a language.'], ['Trade-off', 'A benefit gained at the cost of another property such as simplicity or control.'], ['Standard library', 'The reusable APIs distributed with the language runtime or toolchain.']],
    exercise: 'Find one feature idiomatic to this language in the example. Rewrite the same behavior with a more explicit alternative and compare which version makes control flow clearer.',
    hint: 'Explain what the feature does, what it hides, and when the explicit form would be easier to debug.',
    project: 'Two Ways to Solve It', projectText: 'Implement a small collection transformation once with a language idiom and once with explicit control flow; document the trade-offs.',
    quiz: 'What makes a language feature idiomatic?', answer: 'It is a conventional expression that fits the language’s established semantics and practices', wrong: ['It uses the most punctuation', 'It is always the newest syntax', 'It avoids the standard library'],
    exam: 'When should a concise language feature be replaced with explicit code?', examAnswer: 'When the concise form obscures important behavior or makes the code harder to verify and maintain'
  },
  'small-projects': {
    overview: 'A small project turns individual syntax into a working tool. Define the user need, choose the minimum data model, build one behavior at a time, and test a normal case plus an edge case.',
    why: 'Finishing a bounded project builds confidence and reveals where separate concepts meet in actual code.',
    where: 'Small projects become command-line utilities, portfolio demos, prototypes, and building blocks for larger systems.',
    detail: 'Keep the scope small enough to finish: a text-based task list can add, display, and complete tasks without accounts or networking. Separate storage, decisions, and output enough that a bug can be traced to one responsibility.',
    terms: [['Scope', 'The specific behavior included in the project.'], ['Acceptance criterion', 'A concrete condition that proves a feature works.'], ['Edge case', 'A boundary or unusual input the implementation must handle.']],
    exercise: 'Write three acceptance criteria for a command-line task list, including one invalid-input case, before adding features.',
    hint: 'Use observable outcomes such as “an empty list prints a helpful message,” not vague goals such as “works well.”',
    project: 'Command-line Task List', projectText: 'Add a task, list tasks with numbered positions, complete one by number, and handle an empty list or invalid number safely.',
    quiz: 'Why should a small project define acceptance criteria before implementation?', answer: 'They make the expected behavior testable and keep the scope from expanding without a clear reason', wrong: ['They automatically write all code', 'They eliminate the need to handle errors', 'They determine which editor must be used'],
    exam: 'The task list works for one item but crashes when empty. Which acceptance criterion was missing?', examAnswer: 'A criterion describing the behavior and message for an empty task list'
  },
  'final-projects': {
    overview: 'A capstone combines the language fundamentals into a coherent application. Plan a small domain, separate responsibilities, validate input, handle failure, and test observable behavior.',
    why: 'A complete project demonstrates that you can select and connect concepts instead of only completing isolated exercises.',
    where: 'Capstones become portfolio evidence, interview discussion material, and a base for future features.',
    detail: 'Build in vertical slices: one user-visible behavior from input through logic to output. Keep data valid at boundaries, document how to run the project, and use version control so experiments are reversible. Avoid adding a database or framework until the core behavior is complete.',
    terms: [['Vertical slice', 'A small feature that works through all necessary layers.'], ['Validation boundary', 'The point where untrusted input is checked before entering core logic.'], ['Acceptance test', 'A test that verifies a user-visible behavior.']],
    exercise: 'Write a one-page plan for a personal expense tracker: list its records, three user actions, validation rules, and tests for an empty report and a malformed amount.',
    hint: 'Start with an in-memory list and a readable summary; persistence can be a later enhancement.',
    project: 'Personal Expense Tracker', projectText: 'Record dated expenses by category, reject invalid amounts, and produce totals by category and overall. Include sample data and a run guide.',
    quiz: 'What is a good first milestone for a capstone?', answer: 'One complete vertical slice that demonstrates a core user action from input to visible result', wrong: ['A complex interface with no working behavior', 'Every planned feature at once', 'A performance optimization before measuring anything'],
    exam: 'Why should malformed expense amounts be tested at the input boundary?', examAnswer: 'That is where invalid external data enters, so rejecting it there protects the rest of the program’s assumptions'
  }
};

const EXAMPLES = {
  c: {
    introduction: '#include <stdio.h>\n\nint main(void) {\n    puts("C starts in main");\n    return 0;\n}',
    'variables-data-types': '#include <stdio.h>\n\nint main(void) {\n    char name[] = "Mark";\n    int age = 20;\n    double salary = 1500.50;\n    printf("%s: %d, $%.2f\\n", name, age, salary);\n}',
    loops: '#include <stdio.h>\n\nint main(void) {\n    for (int i = 0; i < 10; i++) {\n        printf("%d\\n", i);\n    }\n}',
    functions: 'int add(int a, int b) {\n    return a + b;\n}\n\n/* Call with: int total = add(4, 7); */',
    operators: 'int seats = 53;\nint groupSize = 8;\nint groups = seats / groupSize;\nint remaining = seats % groupSize;',
    'input-output': 'int quantity;\nif (scanf("%d", &quantity) == 1) {\n    printf("Quantity: %d\\n", quantity);\n}',
    'conditional-statements': 'if (score >= 90) { puts("Excellent"); }\nelse if (score >= 60) { puts("Pass"); }\nelse { puts("Retry"); }',
    'arrays-collections': 'int temperatures[] = {18, 21, 16, 24};\nint count = sizeof temperatures / sizeof temperatures[0];\nint total = 0;\nfor (int i = 0; i < count; i++) total += temperatures[i];',
    'problem-solving': 'int max = values[0];\nfor (int i = 1; i < count; i++) {\n    if (values[i] > max) max = values[i];\n}',
    debugging: '/* Bug: i <= count reads one past the array. */\nfor (int i = 0; i < count; i++) {\n    printf("%d\\n", values[i]);\n}',
    'oop-introduction': 'struct Book {\n    char title[80];\n    int checked_out;\n};',
    'oop-core-concepts': 'struct Wallet { double balance; };\nvoid deposit(struct Wallet *w, double amount) {\n    if (amount > 0) w->balance += amount;\n}',
    'oop-principles': '/* C uses explicit function tables or opaque structs\n   to provide interface-like behavior and hide state. */',
    'language-specific-features': 'size_t bytes = sizeof(int);\nint values[] = {2, 4, 6};\nsize_t count = sizeof values / sizeof values[0];',
    'small-projects': '/* Task-list record: */\nstruct Task { char title[80]; int done; };\n/* Add, list, and mark tasks by array index. */',
    'final-projects': 'struct Expense {\n    char category[32];\n    double amount;\n};\n/* Validate amount > 0 before adding to the ledger. */'
  },
  cpp: {
    introduction: '#include <iostream>\n\nint main() {\n    std::cout << "C++ starts in main\\n";\n}',
    'variables-data-types': '#include <string>\nstd::string name = "Mark";\nint age = 20;\ndouble salary = 1500.50;',
    loops: '#include <iostream>\nint main() {\n    for (int i = 0; i < 10; ++i) {\n        std::cout << i << \'\\n\';\n    }\n}',
    functions: 'int add(int a, int b) {\n    return a + b;\n}\n// Call: const int total = add(4, 7);',
    operators: 'int seats = 53, groupSize = 8;\nint groups = seats / groupSize;\nint remaining = seats % groupSize;',
    'input-output': '#include <iostream>\nint quantity;\nif (std::cin >> quantity) {\n    std::cout << "Quantity: " << quantity;\n}',
    'conditional-statements': 'if (score >= 90) std::cout << "Excellent";\nelse if (score >= 60) std::cout << "Pass";\nelse std::cout << "Retry";',
    'arrays-collections': '#include <vector>\nstd::vector<int> temperatures{18, 21, 16, 24};\nint total = 0;\nfor (int value : temperatures) total += value;',
    'problem-solving': 'int max = values.front();\nfor (int value : values) {\n    if (value > max) max = value;\n}',
    debugging: '/* Bug: iterator is used after erase invalidates it. */\nfor (auto it = items.begin(); it != items.end(); ) {\n    if (remove(*it)) it = items.erase(it);\n    else ++it;\n}',
    'oop-introduction': 'struct Book {\n    std::string title;\n    bool checkedOut = false;\n};',
    'oop-core-concepts': 'class Wallet {\n    double balance = 0;\npublic:\n    void deposit(double amount) { if (amount > 0) balance += amount; }\n};',
    'oop-principles': 'struct PaymentMethod {\n    virtual void pay(double amount) = 0;\n    virtual ~PaymentMethod() = default;\n};',
    'language-specific-features': '#include <memory>\nauto values = std::make_unique<int[]>(3);\n// RAII ties resource lifetime to object lifetime.',
    'small-projects': 'struct Task { std::string title; bool done = false; };\nstd::vector<Task> tasks;\ntasks.push_back({"Practice loops", false});',
    'final-projects': 'struct Expense { std::string category; double amount; };\nstd::vector<Expense> ledger;\n// Reject amount <= 0 before insertion.'
  },
  csharp: {
    introduction: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello World");\n    }\n}',
    'variables-data-types': 'string name = "Mark";\nint age = 20;\ndouble salary = 1500.50;\nfloat height = 1.75f;\nchar grade = \'A\';\nbool isEnrolled = true;\nConsole.WriteLine(name);',
    loops: 'for (int i = 0; i < 10; i++)\n{\n    Console.WriteLine(i);\n}',
    functions: 'static int Add(int a, int b)\n{\n    return a + b;\n}',
    operators: 'int seats = 53, groupSize = 8;\nint groups = seats / groupSize;\nint remaining = seats % groupSize;',
    'input-output': 'Console.Write("Quantity: ");\nstring? raw = Console.ReadLine();\nif (int.TryParse(raw, out int quantity))\n    Console.WriteLine($"Quantity: {quantity}");',
    'conditional-statements': 'if (score >= 90) Console.WriteLine("Excellent");\nelse if (score >= 60) Console.WriteLine("Pass");\nelse Console.WriteLine("Retry");',
    'arrays-collections': 'int[] temperatures = { 18, 21, 16, 24 };\nint total = 0;\nforeach (int value in temperatures) total += value;',
    'problem-solving': 'int max = values[0];\nforeach (int value in values)\n    if (value > max) max = value;',
    debugging: '// Bug: parses unchecked text and throws for "abc".\nif (int.TryParse(input, out int quantity))\n    Console.WriteLine(quantity);\nelse\n    Console.WriteLine("Enter a whole number.");',
    'oop-introduction': 'class Book\n{\n    public string Title { get; set; } = "";\n    public bool IsCheckedOut { get; private set; }\n}',
    'oop-core-concepts': 'class Wallet\n{\n    public decimal Balance { get; private set; }\n    public void Deposit(decimal amount) { if (amount > 0) Balance += amount; }\n}',
    'oop-principles': 'interface IPaymentMethod { void Pay(decimal amount); }\nclass CardPayment : IPaymentMethod {\n    public void Pay(decimal amount) { /* charge card */ }\n}',
    'language-specific-features': 'int? selectedAge = null;\nstring label = selectedAge is >= 18 ? "Adult" : "未成年 or unknown";\n// Nullable types make absence explicit.',
    'small-projects': 'record TaskItem(string Title, bool Done);\nvar tasks = new List<TaskItem>();\ntasks.Add(new TaskItem("Practice loops", false));',
    'final-projects': 'record Expense(string Category, decimal Amount);\nvar ledger = new List<Expense>();\n// Validate Amount > 0 before adding.'
  },
  java: {
    introduction: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Java starts in main");\n    }\n}',
    'variables-data-types': 'String name = "Mark";\nint age = 20;\ndouble salary = 1500.50;\nSystem.out.println(name);',
    loops: 'for (int i = 0; i < 10; i++) {\n    System.out.println(i);\n}',
    functions: 'static int add(int a, int b) {\n    return a + b;\n}',
    operators: 'int seats = 53, groupSize = 8;\nint groups = seats / groupSize;\nint remaining = seats % groupSize;',
    'input-output': 'Scanner scanner = new Scanner(System.in);\nSystem.out.print("Quantity: ");\nif (scanner.hasNextInt()) {\n    int quantity = scanner.nextInt();\n    System.out.println(quantity);\n}',
    'conditional-statements': 'if (score >= 90) System.out.println("Excellent");\nelse if (score >= 60) System.out.println("Pass");\nelse System.out.println("Retry");',
    'arrays-collections': 'List<Integer> temps = List.of(18, 21, 16, 24);\nint total = 0;\nfor (int value : temps) total += value;',
    'problem-solving': 'int max = values[0];\nfor (int value : values) {\n    if (value > max) max = value;\n}',
    debugging: '// Guard the list before accessing index zero.\nif (values.isEmpty()) {\n    System.out.println("No values to compare");\n} else {\n    int max = values.get(0);\n}',
    'oop-introduction': 'class Book {\n    String title;\n    boolean checkedOut;\n}',
    'oop-core-concepts': 'class Wallet {\n    private BigDecimal balance = BigDecimal.ZERO;\n    void deposit(BigDecimal amount) { if (amount.signum() > 0) balance = balance.add(amount); }\n}',
    'oop-principles': 'interface PaymentMethod { void pay(BigDecimal amount); }\nclass CardPayment implements PaymentMethod {\n    public void pay(BigDecimal amount) { /* charge card */ }\n}',
    'language-specific-features': 'List<String> names = List.of("Ada", "Grace", "Linus");\nList<String> longNames = names.stream()\n    .filter(name -> name.length() > 4).toList();',
    'small-projects': 'record TaskItem(String title, boolean done) {}\nList<TaskItem> tasks = new ArrayList<>();\ntasks.add(new TaskItem("Practice loops", false));',
    'final-projects': 'record Expense(String category, BigDecimal amount) {}\nList<Expense> ledger = new ArrayList<>();\n// Reject non-positive amounts before insertion.'
  },
  python: {
    introduction: 'print("Python starts at the first statement")\nprint("Run with: python main.py")',
    'variables-data-types': 'name = "Mark"\nage = 20\nsalary = 1500.50\nprint(name, age, salary)',
    loops: 'for i in range(10):\n    print(i)',
    functions: 'def add(a, b):\n    return a + b',
    operators: 'seats, group_size = 53, 8\ngroups = seats // group_size\nremaining = seats % group_size',
    'input-output': 'raw = input("Quantity: ")\ntry:\n    quantity = int(raw)\n    print(f"Quantity: {quantity}")\nexcept ValueError:\n    print("Enter a whole number")',
    'conditional-statements': 'if score >= 90:\n    print("Excellent")\nelif score >= 60:\n    print("Pass")\nelse:\n    print("Retry")',
    'arrays-collections': 'temperatures = [18, 21, 16, 24]\naverage = sum(temperatures) / len(temperatures)\nwarmer = [t for t in temperatures if t > average]',
    'problem-solving': 'largest = values[0]\nfor value in values[1:]:\n    if value > largest:\n        largest = value',
    debugging: '# Bug: this fails for an empty list.\nif not values:\n    print("No values to compare")\nelse:\n    largest = max(values)',
    'oop-introduction': 'class Book:\n    def __init__(self, title):\n        self.title = title\n        self.checked_out = False',
    'oop-core-concepts': 'class Wallet:\n    def __init__(self):\n        self._balance = 0\n    def deposit(self, amount):\n        if amount > 0: self._balance += amount',
    'oop-principles': 'class PaymentMethod:\n    def pay(self, amount):\n        raise NotImplementedError\n\n# CardPayment and GiftCard provide their own pay behavior.',
    'language-specific-features': 'names = ["Ada", "Grace", "Linus"]\nlong_names = [name.upper() for name in names if len(name) > 4]',
    'small-projects': 'tasks = []\ntasks.append({"title": "Practice loops", "done": False})\nfor index, task in enumerate(tasks, start=1):\n    print(index, task["title"])',
    'final-projects': 'from dataclasses import dataclass\n\n@dataclass\nclass Expense:\n    category: str\n    amount: float\n# Validate amount > 0 before adding it to the ledger.'
  },
  go: {
    introduction: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Go starts in main")\n}',
    'variables-data-types': 'name := "Mark"\nage := 20\nsalary := 1500.50\nfmt.Println(name, age, salary)',
    loops: 'for i := 0; i < 10; i++ {\n    fmt.Println(i)\n}',
    functions: 'func add(a int, b int) int {\n    return a + b\n}',
    operators: 'seats, groupSize := 53, 8\ngroups := seats / groupSize\nremaining := seats % groupSize',
    'input-output': 'var quantity int\nfmt.Print("Quantity: ")\nif _, err := fmt.Scan(&quantity); err != nil {\n    fmt.Println("Enter a whole number")\n}',
    'conditional-statements': 'if score >= 90 { fmt.Println("Excellent")\n} else if score >= 60 { fmt.Println("Pass")\n} else { fmt.Println("Retry") }',
    'arrays-collections': 'temperatures := []int{18, 21, 16, 24}\ntotal := 0\nfor _, value := range temperatures { total += value }',
    'problem-solving': 'largest := values[0]\nfor _, value := range values[1:] {\n    if value > largest { largest = value }\n}',
    debugging: '// Check length before indexing; Go panics on an invalid index.\nif len(values) == 0 {\n    return 0, errors.New("no values")\n}',
    'oop-introduction': 'type Book struct {\n    Title string\n    CheckedOut bool\n}',
    'oop-core-concepts': 'type Wallet struct { balance int }\nfunc (w *Wallet) Deposit(amount int) error {\n    if amount <= 0 { return errors.New("amount must be positive") }; w.balance += amount; return nil\n}',
    'oop-principles': 'type PaymentMethod interface { Pay(amount int) error }\n// CardPayment and GiftCard can implement Pay without sharing a base class.',
    'language-specific-features': 'value, err := loadConfig()\nif err != nil {\n    return fmt.Errorf("load config: %w", err)\n}',
    'small-projects': 'type Task struct { Title string; Done bool }\ntasks := []Task{}\ntasks = append(tasks, Task{Title: "Practice loops"})',
    'final-projects': 'type Expense struct { Category string; Cents int64 }\nvar ledger []Expense\n// Validate Cents > 0 before appending.'
  },
  php: {
    introduction: '<?php\necho "PHP starts with executable statements", PHP_EOL;\n// Run this file with: php main.php',
    'variables-data-types': '$name = "Mark";\n$age = 20;\n$salary = 1500.50;\necho "$name, $age, $salary";',
    loops: 'for ($i = 0; $i < 10; $i++) {\n    echo $i, PHP_EOL;\n}',
    functions: 'function add(int $a, int $b): int {\n    return $a + $b;\n}',
    operators: '$seats = 53; $groupSize = 8;\n$groups = intdiv($seats, $groupSize);\n$remaining = $seats % $groupSize;',
    'input-output': '$raw = readline("Quantity: ");\n$quantity = filter_var($raw, FILTER_VALIDATE_INT);\nif ($quantity === false) echo "Enter a whole number";',
    'conditional-statements': 'if ($score >= 90) { echo "Excellent"; }\nelseif ($score >= 60) { echo "Pass"; }\nelse { echo "Retry"; }',
    'arrays-collections': '$temperatures = [18, 21, 16, 24];\n$average = array_sum($temperatures) / count($temperatures);\n$warmer = array_filter($temperatures, fn($t) => $t > $average);',
    'problem-solving': '$largest = $values[0];\nforeach ($values as $value) {\n    if ($value > $largest) $largest = $value;\n}',
    debugging: '// Avoid an undefined offset when the array is empty.\nif ($values === []) {\n    echo "No values to compare";\n} else {\n    $largest = max($values);\n}',
    'oop-introduction': 'class Book {\n    public function __construct(\n        public string $title,\n        public bool $checkedOut = false\n    ) {}\n}',
    'oop-core-concepts': 'class Wallet {\n    private int $cents = 0;\n    public function deposit(int $cents): void {\n        if ($cents > 0) $this->cents += $cents;\n    }\n}',
    'oop-principles': 'interface PaymentMethod { public function pay(int $cents): void; }\nclass CardPayment implements PaymentMethod {\n    public function pay(int $cents): void { /* charge card */ }\n}',
    'language-specific-features': '$names = ["Ada", "Grace", "Linus"];\n$longNames = array_filter($names, fn($name) => strlen($name) > 4);',
    'small-projects': '$tasks = [];\n$tasks[] = ["title" => "Practice loops", "done" => false];\nforeach ($tasks as $task) echo $task["title"], PHP_EOL;',
    'final-projects': 'final class Expense {\n    public function __construct(\n        public string $category, public int $cents\n    ) {}\n}\n// Reject cents <= 0 before storing.'
  },
  ruby: {
    introduction: 'puts "Ruby starts by evaluating the file top to bottom"\n# Run this file with: ruby main.rb',
    'variables-data-types': 'name = "Mark"\nage = 20\nsalary = 1500.50\nputs "#{name}, #{age}, #{salary}"',
    loops: '10.times do |i|\n  puts i\nend',
    functions: 'def add(a, b)\n  a + b\nend',
    operators: 'seats = 53\ngroup_size = 8\ngroups, remaining = seats.divmod(group_size)',
    'input-output': 'print "Quantity: "\nraw = gets&.chomp\nbegin\n  puts Integer(raw)\nrescue ArgumentError\n  puts "Enter a whole number"\nend',
    'conditional-statements': 'if score >= 90\n  puts "Excellent"\nelsif score >= 60\n  puts "Pass"\nelse\n  puts "Retry"\nend',
    'arrays-collections': 'temperatures = [18, 21, 16, 24]\naverage = temperatures.sum.to_f / temperatures.length\nwarmer = temperatures.select { |t| t > average }',
    'problem-solving': 'largest = values.first\nvalues.drop(1).each do |value|\n  largest = value if value > largest\nend',
    debugging: '# Handle the empty case before calling max.\nif values.empty?\n  puts "No values to compare"\nelse\n  puts values.max\nend',
    'oop-introduction': 'class Book\n  attr_reader :title\n  def initialize(title)\n    @title = title\n    @checked_out = false\n  end\nend',
    'oop-core-concepts': 'class Wallet\n  attr_reader :cents\n  def initialize; @cents = 0; end\n  def deposit(amount); @cents += amount if amount.positive?; end\nend',
    'oop-principles': 'class PaymentMethod\n  def pay(cents) = raise NotImplementedError\nend\nclass CardPayment < PaymentMethod\n  def pay(cents) = charge_card(cents)\nend',
    'language-specific-features': 'names = ["Ada", "Grace", "Linus"]\nlong_names = names.select { |name| name.length > 4 }.map(&:upcase)',
    'small-projects': 'tasks = []\ntasks << { title: "Practice loops", done: false }\ntasks.each_with_index { |task, i| puts "#{i + 1}. #{task[:title]}" }',
    'final-projects': 'Expense = Data.define(:category, :cents)\nledger = []\n# Validate expense.cents > 0 before adding it.'
  },
  js: {
    introduction: 'const message = "JavaScript runs in browsers and on servers";\nconsole.log(message);',
    'variables-data-types': 'const name = "Mark";\nlet age = 20;\nconst salary = 1500.50;\nconsole.log(name, age, salary);',
    loops: 'for (let i = 0; i < 10; i++) {\n  console.log(i);\n}',
    functions: 'function add(a, b) {\n  return a + b;\n}',
    operators: 'const seats = 53, groupSize = 8;\nconst groups = Math.floor(seats / groupSize);\nconst remaining = seats % groupSize;',
    'input-output': 'const answer = prompt("How many seats?");\nconst seats = Number(answer);\nif (Number.isInteger(seats)) console.log(`Seats: ${seats}`);\nelse console.log("Enter a whole number");',
    'conditional-statements': 'if (score >= 90) console.log("Excellent");\nelse if (score >= 60) console.log("Pass");\nelse console.log("Retry");',
    'arrays-collections': 'const temperatures = [18, 21, 16, 24];\nconst average = temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length;\nconst warmer = temperatures.filter((t) => t > average);',
    'problem-solving': 'let largest = values[0];\nfor (const value of values.slice(1)) {\n  if (value > largest) largest = value;\n}',
    debugging: '// Guard before reading index zero.\nif (values.length === 0) {\n  console.log("No values to compare");\n} else {\n  console.log(Math.max(...values));\n}',
    'oop-introduction': 'class Book {\n  constructor(title) {\n    this.title = title;\n    this.checkedOut = false;\n  }\n}',
    'oop-core-concepts': 'class Wallet {\n  #cents = 0;\n  deposit(cents) { if (cents > 0) this.#cents += cents; }\n  get balance() { return this.#cents; }\n}',
    'oop-principles': 'class PaymentMethod { pay(cents) { throw new Error("Implement pay"); } }\nclass CardPayment extends PaymentMethod {\n  pay(cents) { return chargeCard(cents); }\n}',
    'language-specific-features': 'const user = { name: "Ada", role: null };\nconst label = user.role ?? "learner";\nconst { name } = user;',
    'small-projects': 'const tasks = [];\ntasks.push({ title: "Practice loops", done: false });\nfor (const [index, task] of tasks.entries()) console.log(index + 1, task.title);',
    'final-projects': 'const ledger = [];\nfunction addExpense(category, cents) {\n  if (!Number.isInteger(cents) || cents <= 0) throw new Error("Invalid amount");\n  ledger.push({ category, cents });\n}'
  },
  node: {
    introduction: 'const { readFile } = require("node:fs/promises");\n\nasync function main() {\n  console.log("Node.js runs JavaScript on the server");\n}\nmain();'
  }
};

const TOPIC_SLUGS = new Set(Object.keys(LESSONS));

const TOPIC_EXTRAS = {
  introduction: {
    objectives: ['Explain how this language runs a source file.', 'Locate the program entry point.', 'Run and edit a minimal output program.'],
    practices: ['Keep the SDK/compiler version and run command with the project instructions.', 'Change one statement and run again to verify the edit is in the executed file.'],
    mistake: 'Editing one file while running a stale build or a different project copy.', fix: 'Run from the project directory and confirm the output changes after a deliberate edit.'
  },
  'variables-data-types': {
    objectives: ['Declare and initialize values with meaningful names.', 'Select numeric, text, character, and Boolean types appropriately.', 'Describe how this language checks or resolves types.'],
    practices: ['Use decimal types for money when the language provides them.', 'Keep a value in its natural type until formatting output.'],
    mistake: 'Treating numeric text as a number without parsing or validating it.', fix: 'Parse at the input boundary, then keep the typed value through calculations.'
  },
  operators: {
    objectives: ['Distinguish arithmetic, comparison, and logical operators.', 'Predict precedence and use parentheses to show intent.', 'Use remainder or integer division for a real calculation.'],
    practices: ['Use parentheses when a formula has mixed arithmetic and comparison.', 'Check whether division is integer or floating-point for the operand types.'],
    mistake: 'Expecting integer division to retain its fractional part.', fix: 'Use a floating-point operand when a fractional result is required.'
  },
  'input-output': {
    objectives: ['Read a value from the language’s input mechanism.', 'Parse and validate raw input before calculation.', 'Present a labeled result.'],
    practices: ['Handle parse failure as an ordinary user path.', 'Keep prompting, parsing, and business calculation separate.'],
    mistake: 'Assuming console input has the expected format.', fix: 'Check the parse result and show a corrective prompt when conversion fails.'
  },
  'conditional-statements': {
    objectives: ['Write Boolean conditions for a decision.', 'Order overlapping ranges correctly.', 'Handle boundary and fallback cases.'],
    practices: ['Test values immediately below, at, and above each threshold.', 'Use switch or match for many fixed alternatives when clearer.'],
    mistake: 'Putting a broad range condition before a narrower one.', fix: 'Order exclusive ranges from most restrictive to least restrictive.'
  },
  loops: {
    objectives: ['Choose a loop form based on whether count or condition controls repetition.', 'Trace initialization, condition, and update.', 'Use break and continue without obscuring termination.'],
    practices: ['Write down the loop invariant and the value that moves toward termination.', 'Prefer collection iteration when an index is not needed.'],
    mistake: 'Using <= count for a zero-based collection index.', fix: 'Use index < count; the last valid index is count - 1.'
  },
  functions: {
    objectives: ['Declare a method/function with parameters and a return type.', 'Return a computed value instead of printing it inside the calculation.', 'Recognize void procedures and overload signatures.'],
    practices: ['Give each function one clear responsibility.', 'Test pure calculations with ordinary and boundary arguments.'],
    mistake: 'Writing a function that changes unrelated global state and returns no useful result.', fix: 'Pass required inputs as parameters and return the calculation to the caller.'
  },
  'arrays-collections': {
    objectives: ['Create and traverse a collection.', 'Respect index bounds and collection length.', 'Choose a list, set, or map for the required access pattern.'],
    practices: ['Check emptiness before reading the first element.', 'Use a map for repeated lookup by a stable key rather than rescanning a list.'],
    mistake: 'Using the number of elements as the final zero-based index.', fix: 'Use count - 1 for the last index, and count as the exclusive loop bound.'
  },
  'problem-solving': {
    objectives: ['Translate a request into inputs, outputs, and constraints.', 'Trace an algorithm against a small example.', 'Account for empty and boundary inputs.'],
    practices: ['Write a worked trace before optimizing.', 'State the invariant that should hold after each iteration.'],
    mistake: 'Initializing a maximum to zero when all valid values might be negative.', fix: 'Initialize from the first element after checking that the collection is non-empty.'
  },
  debugging: {
    objectives: ['Reproduce a defect with specific input.', 'Inspect state where actual behavior diverges from expected behavior.', 'Verify the fix with regression and boundary checks.'],
    practices: ['Change one suspected cause at a time.', 'Keep a failing input as a repeatable automated test.'],
    mistake: 'Changing several lines before confirming which one caused the failure.', fix: 'Reduce to the smallest failing case, form a testable hypothesis, and verify one change.'
  },
  'oop-introduction': {
    objectives: ['Distinguish a type description from an instance.', 'Identify an object’s state and behavior.', 'Choose a class only when it models a meaningful domain concept.'],
    practices: ['Keep behavior near the state whose rules it protects.', 'Model only the responsibilities the domain actually requires.'],
    mistake: 'Turning every small value or helper into a class.', fix: 'Use a simple value or function unless the concept needs identity, state, or coordinated behavior.'
  },
  'oop-core-concepts': {
    objectives: ['Initialize valid state in a constructor.', 'Use fields/properties and methods intentionally.', 'Define an interface for a shared capability.'],
    practices: ['Reject invalid state at object construction or mutation boundaries.', 'Depend on a small contract when implementations need to be interchangeable.'],
    mistake: 'Leaving required fields unset and relying on every caller to remember initialization.', fix: 'Require essential values at construction and protect invariants in methods.'
  },
  'oop-principles': {
    objectives: ['Explain encapsulation and abstraction.', 'Choose composition or inheritance based on the real relationship.', 'Use polymorphism through a shared contract.'],
    practices: ['Use inheritance only for a substitutable “is-a” relationship.', 'Prefer composition when one object merely needs another capability.'],
    mistake: 'Using inheritance only to reuse a few lines of code.', fix: 'Extract a small collaborator or shared function when the types are not truly substitutable.'
  },
  'language-specific-features': {
    objectives: ['Identify an idiom specific to this language.', 'Explain the behavior the syntax hides or automates.', 'Compare the idiom with an explicit alternative.'],
    practices: ['Learn the standard library behavior before introducing a dependency.', 'Choose concise syntax only when its control flow remains clear.'],
    mistake: 'Using a feature without understanding its evaluation or error behavior.', fix: 'Trace the feature on a small input and compare it with an explicit implementation.'
  },
  'small-projects': {
    objectives: ['Turn a small need into observable acceptance criteria.', 'Build one complete behavior at a time.', 'Handle invalid and empty states.'],
    practices: ['Keep the first version in memory and finish the core flow before adding persistence.', 'Test the empty-state behavior as well as successful use.'],
    mistake: 'Adding menus, storage, and extra features before add/list/complete works.', fix: 'Complete and test one acceptance criterion at a time.'
  },
  'final-projects': {
    objectives: ['Plan a small domain model and validation boundary.', 'Connect input, logic, and output in vertical slices.', 'Demonstrate the project with tests and run instructions.'],
    practices: ['Store money in integer minor units or a decimal type, not binary floating point.', 'Include a run guide, sample data, and tests for malformed input.'],
    mistake: 'Building a large interface before the core data rules work.', fix: 'Finish a command-line vertical slice and validate its behavior before extending it.'
  }
};

const LANGUAGE_INTRO_DETAILS = {
  csharp: 'C# was introduced by Microsoft in the early 2000s and is now developed openly. It runs on .NET, whose SDK provides the dotnet command for creating, building, and running projects. Install the .NET SDK, run dotnet new console, then dotnet run. Execution enters Main (or modern top-level statements), the compiler produces intermediate language, and the .NET runtime executes it. C# is used for web services, desktop apps, cloud systems, and Unity games.',
  java: 'Java source is compiled to bytecode and run by the Java Virtual Machine, which supports the “write once, run anywhere” model. Install a JDK, compile with javac, and launch the class with java. Java is common in enterprise services, Android, and large cross-platform systems.',
  python: 'Python is an interpreted, high-level language known for readable indentation. Install Python 3 and run a file with python main.py. It is widely used in automation, web services, data science, and machine learning.',
  go: 'Go was designed at Google for simple, fast compilation and practical concurrency. Install the Go toolchain and run a package with go run. It is especially common in network services, command-line tools, and cloud infrastructure.',
  php: 'PHP began as a web scripting language and remains deeply integrated with server-rendered sites and web hosting. Install PHP CLI and run a file with php main.php; PHP code can also be embedded in web responses.',
  ruby: 'Ruby emphasizes readable, expressive object-oriented code. Install Ruby and run a source file with ruby main.rb. Ruby is used for scripting and is closely associated with the Rails web framework.',
  cpp: 'C++ evolved from C to add abstractions while retaining low-level control. A compiler such as g++ translates source to a native executable. C++ is used in game engines, browsers, scientific computing, and performance-sensitive systems.',
  c: 'C was created at Bell Labs in the early 1970s and became foundational to Unix and systems software. A compiler such as gcc translates source into a native executable. C remains common in operating systems, embedded devices, and low-level libraries.',
  js: 'JavaScript was created for interactive web pages and now runs in browsers and server environments such as Node.js. In a browser, use the developer console or an HTML script; with Node.js, run node main.js. The event loop makes asynchronous I/O central to JavaScript applications.',
  node: 'Node.js is a JavaScript runtime built on the V8 engine. The Node executable runs a file such as node main.js and exposes APIs for files, processes, and network servers. Node.js is widely used for APIs, command-line tools, and real-time services.'
};

const LANGUAGE_TOPIC_NOTES = {
  csharp: { functions: 'In C#, functions declared on a type are called methods. Main is the conventional application entry method. A void method performs an action without returning a value; overloads share a name but have different parameter lists.', 'variables-data-types': 'C# includes int, double, float (use an f suffix), string, char, and bool. The compiler checks assignments; decimal is usually preferable for exact financial amounts.' },
  c: { 'variables-data-types': 'C uses int, float, double, char, and arrays of char for text. A char array needs space for the terminating null character; scanf format specifiers must match the destination type.', functions: 'C calls these functions rather than methods. A declaration needs a return type, parameter types, and a prototype when the definition appears later.' },
  cpp: { 'variables-data-types': 'C++ provides int, float, double, char, bool, and std::string. Prefer std::string for text and standard containers such as std::vector for resizable sequences.', functions: 'Free functions and class methods are both available. A function signature includes its parameter types, which are also used for overload resolution.' },
  java: { 'variables-data-types': 'Java has primitive types such as int, double, float, char, and boolean; String is an object type. A float literal needs an f suffix.', functions: 'Methods belong to a class. A method signature combines its name and parameter types, which enables overloads.' },
  python: { 'variables-data-types': 'Python names refer to objects rather than declared storage types. int, float, str, and bool are built-in types; type hints document expectations but ordinary execution does not enforce them.', functions: 'A def statement creates a function object; methods are functions accessed through an object or class. Python does not overload by parameter signature in the C# or Java sense.' },
  go: { 'variables-data-types': 'Go provides int, float64, string, rune, and bool. A rune represents a Unicode code point; short declaration with := infers a static type inside a function.', functions: 'Go functions may return multiple values, commonly a result and an error. Methods are functions with an explicit receiver.' },
  php: { 'variables-data-types': 'PHP variables begin with $, and values have runtime types including int, float, string, and bool. Type declarations can enforce function boundaries; strict_types changes scalar argument coercion.', functions: 'PHP functions can declare parameter and return types. Methods are functions declared inside classes, and overloads by signature are not supported.' },
  ruby: { 'variables-data-types': 'Ruby variables refer to objects; integer, Float, String, and true/false values are objects. Local variable names use snake_case by convention.', functions: 'Ruby methods are declared with def and return the last evaluated expression unless return is used. Ruby does not overload methods by parameter type.' },
  js: { 'variables-data-types': 'JavaScript has number (for ordinary integers and decimals), string, boolean, bigint, symbol, undefined, and object values. Use const by default and let when rebinding is required.', functions: 'JavaScript functions are values and can be passed to other functions. Function declarations do not overload by parameter signature; use defaults or explicit branching for optional behavior.' }
};

const SUPPLEMENTARY_LESSONS = {
  'backend-rest-api-design': {
    title: 'Design a Resource-Oriented REST API', language: 'javascript',
    what: 'A REST-style API exposes resources through URLs and uses HTTP methods to describe operations. A collection such as /api/tasks can be listed with GET and created with POST; one task can be read, updated, or removed at /api/tasks/42.',
    why: 'Consistent resource contracts make clients predictable and let HTTP status codes communicate whether a request succeeded, failed validation, or referred to a missing resource.',
    detail: 'Use nouns for resources, keep collection and item routes consistent, and validate request bodies at the boundary. GET should be safe to repeat; PUT generally replaces a representation, while PATCH changes selected fields. Return 201 with a Location for creation, 404 for a missing item, and 400 or 422 for invalid data.',
    terms: [['Resource', 'A domain entity addressed by a URL.'], ['HTTP method', 'The operation semantics requested by a client, such as GET or POST.'], ['Status code', 'A numeric result category returned with the response.']],
    code: 'app.get("/api/tasks/:id", async (req, res) => {\n  const task = await tasks.find(req.params.id);\n  if (!task) return res.sendStatus(404);\n  res.json(task);\n});',
    exercise: 'Design routes and status codes for listing tasks, creating one task, reading task 42, and marking task 42 complete.',
    hint: 'Use a collection URL for the task set and an item URL for one task; completion is a state update, not a verb in the URL.',
    project: 'Task API Contract', projectText: 'Write and implement list, create, read, and update endpoints for tasks; validate input and return suitable status codes.',
    question: 'Which route shape identifies one task resource?', answer: 'GET /api/tasks/42', wrong: ['GET /api/getTask?id=42', 'POST /api/listTasks', 'GET /api/tasks/create'], exam: 'What should an API return when a requested task ID does not exist?', examAnswer: 'A 404 Not Found response'
  },
  'backend-databases': {
    title: 'Model and Query Relational Data', language: 'sql',
    what: 'A relational database stores records in tables and connects related rows with keys. A task table can hold each task once, while a user_id foreign key links tasks to their owner.',
    why: 'A well-shaped schema protects data consistency and lets an application retrieve related records without duplicating entire objects.',
    detail: 'Choose a primary key for each row, use foreign keys for relationships, and add constraints for required values. Normalize repeated facts into related tables; use JOIN to combine them for a query. Parameterize values instead of assembling SQL by concatenating user input.',
    terms: [['Primary key', 'A unique identifier for a table row.'], ['Foreign key', 'A column constrained to reference a row in another table.'], ['JOIN', 'An operation that combines rows using a relationship condition.']],
    code: 'SELECT users.name, COUNT(tasks.id) AS open_tasks\nFROM users\nLEFT JOIN tasks ON tasks.user_id = users.id AND tasks.done = FALSE\nGROUP BY users.id, users.name;',
    exercise: 'Sketch users and tasks tables with a one-to-many relationship. Write a query that lists each user and the number of their unfinished tasks, including users with none.',
    hint: 'Use a LEFT JOIN so a user without matching tasks still appears in the result.',
    project: 'Task Storage Schema', projectText: 'Design users and tasks tables, add key constraints, and query each user’s open-task count.',
    question: 'What does a foreign key enforce?', answer: 'That a relationship value refers to an existing row in the referenced table', wrong: ['That every query returns one row', 'That a column is automatically encrypted', 'That two tables have identical columns'], exam: 'Why use a LEFT JOIN for users who may have no tasks?', examAnswer: 'It preserves users without a matching task row and returns an empty-side result for the task columns'
  },
  'backend-authentication': {
    title: 'Authenticate Requests Safely', language: 'javascript',
    what: 'Authentication establishes who is making a request. Authorization is the separate decision about what that authenticated identity may do.',
    why: 'A server must verify identity and permission on every protected operation; hiding a button in the browser does not protect the underlying data.',
    detail: 'Store passwords only as salted, slow password hashes, issue short-lived sessions or signed tokens after successful login, and validate the credential on protected requests. Check resource ownership before returning or mutating user data. Never trust a user ID supplied only by the client.',
    terms: [['Authentication', 'Verifying an identity.'], ['Authorization', 'Checking whether an identity may perform an action.'], ['Password hash', 'A one-way, salted result produced by a password-hashing algorithm.']],
    code: 'app.get("/api/profile", requireSession, async (req, res) => {\n  const profile = await profiles.findByUserId(req.user.id);\n  res.json(profile);\n});',
    exercise: 'For a request to edit task 42, identify what the server must verify before updating the database.',
    hint: 'Verify the session, then compare the authenticated user ID with the task owner on the server.',
    project: 'Protected Profile Endpoint', projectText: 'Add a login-protected profile route and a test proving an unauthenticated request is rejected.',
    question: 'Why is checking authentication only in the front end insufficient?', answer: 'A client can call the server endpoint directly, so the server itself must verify the session', wrong: ['Browsers cannot store buttons', 'HTTP requests cannot carry credentials', 'The front end controls database permissions'], exam: 'A signed-in user requests another person’s task. Which check prevents disclosure?', examAnswer: 'Authorize the request against the task’s owner or an explicit permission on the server'
  },
  'software-design-patterns': {
    title: 'Choose a Design Pattern for a Real Change', language: 'javascript',
    what: 'A design pattern is a named arrangement of collaborating objects or functions that solves a recurring design problem. It is a vocabulary and a trade-off, not a rule to add classes everywhere.',
    why: 'Recognizing a pattern can make a design easier to extend when the same pressure appears again, such as needing interchangeable pricing rules.',
    detail: 'The Strategy pattern places interchangeable algorithms behind one contract. A checkout can accept a percentage discount or fixed discount without knowing their internal calculations. Prefer the simplest direct function until variation is real; patterns add indirection and should pay for themselves.',
    terms: [['Strategy', 'An interchangeable implementation of one behavior.'], ['Composition', 'Building behavior by passing or containing collaborators.'], ['Indirection', 'An extra layer between a caller and the behavior it needs.']],
    code: 'const discounts = {\n  student: (total) => total * 0.9,\n  member: (total) => total - 5\n};\nconst finalTotal = discounts[discountType](subtotal);',
    exercise: 'Add a fixed-dollar discount and a percentage discount without adding conditionals to the checkout total calculation.',
    hint: 'Represent each rule as a function with the same input/output contract, then choose the function at the boundary.',
    project: 'Composable Discount Rules', projectText: 'Implement two interchangeable discount strategies and test that checkout applies each to the same subtotal.',
    question: 'When is Strategy useful?', answer: 'When one operation needs several interchangeable algorithms behind a stable contract', wrong: ['Whenever a program has one calculation', 'To replace every conditional, even a simple one', 'When two classes have unrelated responsibilities'], exam: 'Why might a direct conditional be better than a pattern for one stable rule?', examAnswer: 'The pattern adds abstraction and indirection without providing a needed variation point'
  },
  'software-testing': {
    title: 'Test Behavior at Clear Boundaries', language: 'javascript',
    what: 'A test supplies known inputs, exercises behavior, and checks observable results. Unit tests isolate a small unit; integration tests check that collaborating pieces work together.',
    why: 'Tests make expected behavior repeatable and catch regressions when implementation changes.',
    detail: 'Use Arrange, Act, Assert: create the input and dependencies, invoke one behavior, then assert the result. Test boundaries and failure paths, not just the happy path. Keep tests independent so one failure does not make later results unreliable.',
    terms: [['Arrange', 'Prepare values and dependencies for the test.'], ['Act', 'Run the behavior under test.'], ['Assert', 'Compare actual behavior with the expected result.']],
    code: 'test("rejects a negative deposit", () => {\n  const wallet = new Wallet();\n  expect(() => wallet.deposit(-1)).toThrow("Amount must be positive");\n  expect(wallet.balance).toBe(0);\n});',
    exercise: 'Write tests for a function that divides two numbers: a normal result, a zero divisor, and a negative numerator.',
    hint: 'State whether zero division throws, returns an error, or has a defined result; make the test match that contract.',
    project: 'Test a Wallet Contract', projectText: 'Add tests for valid deposit, invalid deposit, exact-balance withdrawal, and an overdraw attempt.',
    question: 'Which step in Arrange-Act-Assert invokes the behavior being tested?', answer: 'Act', wrong: ['Arrange', 'Assert', 'Teardown'], exam: 'Why include boundary cases in a test suite?', examAnswer: 'Boundary inputs are where assumptions often fail, so tests preserve the intended behavior there'
  },
  'software-architecture': {
    title: 'Separate Responsibilities Across Boundaries', language: 'javascript',
    what: 'Software architecture describes major components, their responsibilities, and the rules for how they depend on one another.',
    why: 'Clear boundaries let a change stay local and make components easier to test, replace, and understand.',
    detail: 'A small service can separate HTTP handling, application rules, and data access. The route translates a request; a service enforces a use case; a repository persists records. Dependencies should point toward stable policy, and the system should not gain layers without a reason.',
    terms: [['Component', 'A unit with a clear responsibility and interface.'], ['Boundary', 'A defined point where data or control passes between components.'], ['Dependency direction', 'The rule determining which components may rely on which others.']],
    code: 'async function completeTask(taskId, taskRepository) {\n  const task = await taskRepository.find(taskId);\n  if (!task) throw new Error("Task not found");\n  task.complete();\n  return taskRepository.save(task);\n}',
    exercise: 'Separate an HTTP handler that completes a task from the rule that decides whether completion is allowed.',
    hint: 'Keep request parsing at the route boundary and move the use-case decision into a callable service function.',
    project: 'Layered Task Completion', projectText: 'Build a route, a task-completion service, and a repository interface; test the service without starting a web server.',
    question: 'Where should a core rule such as “a deleted task cannot be completed” live?', answer: 'In the application/domain behavior that enforces the rule, not only in the HTTP handler', wrong: ['Only in a button’s disabled state', 'Inside a database column name', 'In a stylesheet'], exam: 'Why depend on a repository interface in an application service?', examAnswer: 'It keeps the use case independent of a specific storage implementation and makes the rule easier to test'
  },
  'data-science-numpy': {
    title: 'Compute with NumPy Arrays', language: 'python',
    what: 'NumPy arrays store homogeneous numeric data in compact multidimensional blocks. Vectorized operations apply a calculation across the array without writing a Python loop for each element.',
    why: 'Array operations simplify numerical work and can use optimized native code for large datasets.',
    detail: 'Shape describes each dimension and dtype describes the element representation. Broadcasting allows compatible shapes to participate in one operation; it does not mean arbitrary shapes can be combined. A boolean mask selects values meeting a condition.',
    terms: [['ndarray', 'A fixed-dtype, multidimensional NumPy array.'], ['Shape', 'The length of each dimension in an array.'], ['Broadcasting', 'Rules that expand compatible dimensions for element-wise operations.']],
    code: 'import numpy as np\n\ntemperatures = np.array([18, 21, 16, 24])\naverage = temperatures.mean()\nwarmer_days = temperatures[temperatures > average]\nprint(warmer_days)',
    exercise: 'Create an array of five measurements, calculate its mean, and use a Boolean mask to select readings above the mean.',
    hint: 'Compare the array to the scalar mean; NumPy produces a Boolean array suitable for indexing.',
    project: 'Sensor Reading Summary', projectText: 'Analyze a vector of sensor readings and report mean, minimum, maximum, and out-of-range values.',
    question: 'What does temperatures > average produce in NumPy?', answer: 'A Boolean array with one comparison result for each temperature', wrong: ['A single sorted temperature', 'A new Python function', 'The shape of the array'], exam: 'Why is a NumPy vectorized expression often preferable to a Python loop for numeric arrays?', examAnswer: 'It expresses element-wise computation directly and uses optimized array operations'
  },
  'data-science-pandas': {
    title: 'Inspect and Transform Tabular Data with pandas', language: 'python',
    what: 'A pandas DataFrame is a labeled two-dimensional table. Columns can have different dtypes, and labels let analysis refer to meaningful fields instead of unexplained positions.',
    why: 'Most data analysis begins by inspecting, cleaning, filtering, grouping, and summarizing imperfect tables.',
    detail: 'Read a dataset, inspect head(), dtypes, and missing values before assuming its shape. Select columns by label, filter with a Boolean condition, and use groupby followed by an aggregation to summarize categories. Avoid chained assignment when modifying a filtered view.',
    terms: [['DataFrame', 'A labeled table with rows and named columns.'], ['Series', 'A one-dimensional labeled column.'], ['GroupBy', 'A split-apply-combine operation over categories.']],
    code: 'import pandas as pd\n\nsales = pd.read_csv("sales.csv")\nprint(sales.dtypes)\ncompleted = sales.loc[sales["status"] == "complete"]\nby_store = completed.groupby("store")["amount"].sum()',
    exercise: 'Load a CSV of orders, inspect missing values in the amount column, filter completed orders, and sum their amounts by store.',
    hint: 'Inspect dtypes and null counts before aggregation; missing amounts should not silently become zero unless that is the data rule.',
    project: 'Store Sales Report', projectText: 'Clean an orders CSV and produce total completed sales by store, documenting how missing or invalid rows are handled.',
    question: 'What does groupby("store")["amount"].sum() calculate?', answer: 'The sum of amount separately for each store value', wrong: ['The number of columns in the file', 'The average of every column', 'A sorted copy of each row'], exam: 'Why inspect dtypes and missing values before aggregating a CSV?', examAnswer: 'Unexpected text types or missing values can invalidate or distort a numeric summary'
  },
  'data-science-machine-learning': {
    title: 'Train and Evaluate a Machine Learning Model', language: 'python',
    what: 'A supervised model learns a mapping from labeled examples. Features are input measurements; the target is the value or class the model should predict.',
    why: 'Separating training from evaluation estimates how well a model generalizes to examples it has not seen.',
    detail: 'Split data before fitting transformations or models to prevent leakage. Fit on training data, then evaluate once on a held-out test set using a metric appropriate to the task. For imbalanced classification, accuracy alone can hide poor minority-class recall.',
    terms: [['Feature', 'An input variable used to make a prediction.'], ['Target', 'The known outcome the model learns to predict.'], ['Data leakage', 'Information from evaluation data accidentally influencing training.']],
    code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=7)\nmodel = DecisionTreeClassifier(max_depth=3, random_state=7)\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))',
    exercise: 'Split a labeled dataset, train a shallow decision tree on the training portion, and compare test accuracy with a majority-class baseline.',
    hint: 'The test labels must not be used by fit(); keep the split fixed while comparing models.',
    project: 'Baseline Classifier Report', projectText: 'Train a small classifier, compare it to a baseline, report a confusion matrix, and explain one limitation of the metric.',
    question: 'Why keep a held-out test set?', answer: 'It estimates performance on data that was not used to fit the model', wrong: ['It increases the number of training examples', 'It guarantees every prediction is correct', 'It removes the need to choose features'], exam: 'What is data leakage?', examAnswer: 'Evaluation information influences training, making the reported model performance unrealistically optimistic'
  }
};

export function getSupplementaryLesson(topicId) {
  const lesson = SUPPLEMENTARY_LESSONS[topicId];
  if (!lesson) return null;
  return {
    id: topicId,
    title: lesson.title,
    category: lesson.language,
    codeLanguage: lesson.language,
    codeType: lesson.language,
    codeSnippet: lesson.code,
    hasPlayground: ['javascript', 'python'].includes(lesson.language),
    overview: { what: lesson.what, why: lesson.why, whereUsed: lesson.detail },
    learningObjectives: [lesson.what, lesson.detail, lesson.exercise],
    coreConcepts: [{ title: lesson.terms[0].term, explanation: lesson.detail, terms: lesson.terms, relationship: lesson.why }],
    syntaxStructure: { generalStructure: lesson.code, breakdown: lesson.terms.map((term) => ({ part: term.term, meaning: term.definition })), conventions: [lesson.hint] },
    practicalExamples: [{ level: 'Guided', title: lesson.title, description: lesson.detail, code: lesson.code, explanation: lesson.why }],
    implementationSteps: [{ step: 1, title: lesson.terms[0].term, instruction: lesson.exercise, whyNecessary: lesson.why, codeSnippet: lesson.code }],
    bestPractices: { industryStandards: [lesson.hint], structureRecommendations: [lesson.detail], performanceConsiderations: [lesson.why] },
    commonMistakes: [{ mistake: lesson.exam, howToAvoid: lesson.hint, debuggingTip: lesson.detail }],
    projectApplications: [{ domain: lesson.project, description: lesson.projectText }],
    handsOnExercises: { practiceTasks: [lesson.exercise, lesson.hint], codingChallenge: { prompt: lesson.exercise, hint: lesson.hint }, miniProjectIdea: { title: lesson.project, description: lesson.projectText } },
    summary: { keyPoints: [lesson.what, lesson.detail], skillsAcquired: [lesson.exercise] },
    exercise: { question: lesson.question, options: [lesson.answer, ...lesson.wrong], answer: lesson.answer },
    exam: { question: lesson.exam, options: [lesson.examAnswer, ...lesson.wrong], answer: lesson.examAnswer }
  };
}

export function getLanguageTrackLesson(topicId, title) {
  const pathTracks = {
    'javascript-path': 'js',
    'python-path': 'python',
    'python-data-science-path': 'python',
    'java-path': 'java',
    'csharp-path': 'csharp',
    'cpp-path': 'cpp',
    'go-path': 'go',
    'php-backend-path': 'php',
    'node-web-path': 'node',
    'node-backend-path': 'node'
  };
  const pathLanguage = pathTracks[topicId];
  const match = /^(csharp|python|java|cpp|ruby|php|go|c|js)-(.+)$/.exec(topicId || '');
  const languageId = pathLanguage || match?.[1];
  const slug = pathLanguage ? 'introduction' : match?.[2];
  if (!languageId || !TOPIC_SLUGS.has(slug)) return null;

  const language = LANGUAGE_INFO[languageId];
  const lesson = LESSONS[slug];
  const code = EXAMPLES[languageId][slug];
  const nuance = slug === 'variables-data-types' || slug === 'arrays-collections'
    ? ` ${language.typing}`
    : '';
  const codeLanguage = language.codeLanguage;
  const shortTitle = title || slug.replaceAll('-', ' ');
  const objectives = TOPIC_EXTRAS[slug].objectives;
  const languageNote = LANGUAGE_TOPIC_NOTES[languageId]?.[slug] || language.typing;
  const introDetail = slug === 'introduction' ? LANGUAGE_INTRO_DETAILS[languageId] : null;

  return {
    id: topicId,
    title: shortTitle,
    category: language.name,
    codeLanguage,
    codeType: codeLanguage,
    hasPlayground: true,
    codeSnippet: code,
    diagramType: ['loops', 'arrays-collections'].includes(slug) ? 'api-flow' : 'generic-roadmap',
    lesson: `${lesson.overview} ${lesson.detail}${nuance}`,
    overview: {
      what: introDetail || `${lesson.overview}${nuance}`,
      why: lesson.why,
      whereUsed: lesson.where
    },
    learningObjectives: objectives,
    coreConcepts: [
      { title: lesson.terms[0]?.term || shortTitle, explanation: lesson.detail, terms: lesson.terms, relationship: lesson.why },
      { title: `${language.name} detail`, explanation: languageNote, terms: [], relationship: lesson.where }
    ],
    syntaxStructure: {
      generalStructure: code,
      breakdown: [
        { part: 'Inputs and state', meaning: `Identify the values the ${language.name} example reads or stores.` },
        { part: 'Operation', meaning: lesson.detail },
        { part: 'Observable result', meaning: 'Run the example and compare its output with your prediction.' }
      ],
      conventions: [lesson.hint, languageNote]
    },
    practicalExamples: [{ level: 'Guided', title: `${shortTitle} in ${language.name}`, description: lesson.detail, code, explanation: `${lesson.overview} ${lesson.why}` }],
    implementationSteps: [
      { step: 1, title: lesson.terms[0]?.term || shortTitle, instruction: lesson.detail, whyNecessary: lesson.why, codeSnippet: code },
      { step: 2, title: lesson.project, instruction: lesson.exercise, whyNecessary: lesson.projectText, codeSnippet: lesson.hint }
    ],
    bestPractices: {
      industryStandards: TOPIC_EXTRAS[slug].practices,
      structureRecommendations: [lesson.hint],
      performanceConsiderations: [lesson.where]
    },
    commonMistakes: [{ mistake: TOPIC_EXTRAS[slug].mistake, howToAvoid: TOPIC_EXTRAS[slug].fix, debuggingTip: lesson.hint }],
    projectApplications: [{ domain: lesson.project, description: lesson.projectText }],
    handsOnExercises: {
      practiceTasks: [lesson.exercise, lesson.hint],
      codingChallenge: { prompt: lesson.exercise, hint: lesson.hint },
      miniProjectIdea: { title: lesson.project, description: lesson.projectText }
    },
    summary: { keyPoints: [lesson.overview, lesson.detail, lesson.why], skillsAcquired: [lesson.exercise] },
    exercise: {
      question: `${language.name}: ${lesson.quiz}`,
      options: [lesson.answer, ...lesson.wrong],
      answer: lesson.answer
    },
    exam: {
      question: `${language.name}: ${lesson.exam}`,
      options: [lesson.examAnswer, lesson.wrong[0], lesson.wrong[1], lesson.wrong[2]],
      answer: lesson.examAnswer
    },
    materialUrl: `https://www.google.com/search?q=${encodeURIComponent(`${language.name} ${shortTitle} official documentation tutorial`)}`
  };
}
