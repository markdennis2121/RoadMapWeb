const GUIDES = [
  {
    terms: ['variable', 'variables', 'data type', 'data types'],
    what: 'A variable is a name you give to a piece of information so the program can find and use it again.',
    why: 'Programs need to remember details such as a learner’s name, a score, or how many items are in a basket.',
    analogy: 'Think of a variable as a labeled box: the name is on the label, and the value is what you put inside. A type is a reminder of what kind of thing belongs in that box.',
    win: ['A box is labeled age and contains 20. Which word is the label, and which number is inside?', 'age is the label; 20 is the value inside the box.']
  },
  {
    terms: ['operator', 'operators', 'arithmetic', 'comparison'],
    what: 'An operator is a small symbol or word that tells the program to do something with values, such as add two numbers or compare them.',
    why: 'Programs use these actions to calculate prices, check answers, and decide whether a rule is true.',
    analogy: 'An operator works like a button on a calculator: you provide numbers, press an action such as plus, and get a result.',
    win: ['What number do you get from 3 + 2?', '5. The plus sign asks the program to add the two numbers.']
  },
  {
    terms: ['conditional', 'conditionals', 'if statement', 'decision'],
    what: 'A conditional lets a program choose what to do based on whether something is true or false.',
    why: 'Without decisions, a program would do the same thing for every person and every situation.',
    analogy: 'It is like a sign at a fork in a path: if it is raining, take the covered path; otherwise, take the sunny path.',
    win: ['A rule says “if the score is at least 60, show Pass.” What should happen for a score of 80?', 'Show Pass, because 80 is at least 60.']
  },
  {
    terms: ['loop', 'loops', 'iteration'],
    what: 'A loop tells the program to repeat a set of steps, either for each item or until a stopping rule is met.',
    why: 'Repeating one clear instruction is easier and safer than copying it many times by hand.',
    analogy: 'Imagine checking every book on a shelf. You follow the same check for one book, then move to the next until the shelf is done.',
    win: ['If a loop repeats “Hello” three times, how many greetings should you expect?', 'Three greetings: one for each repeat.']
  },
  {
    terms: ['function', 'functions', 'method', 'methods'],
    what: 'A function is a named set of steps that you can ask the program to perform. It can receive information and give a result back.',
    why: 'When the same job is needed more than once, a function lets you write its steps once and reuse them.',
    analogy: 'A function is like a small kitchen appliance: you put ingredients in, it follows its built-in steps, and it gives you a prepared result.',
    win: ['A function named Add receives 2 and 3, then returns their sum. What result comes back?', '5. The function uses its steps to add the two inputs.']
  },
  {
    terms: ['array', 'arrays', 'collection', 'collections', 'list'],
    what: 'A collection is one place to keep several related values, such as a list of names or a week of temperatures.',
    why: 'A program can work through a changing number of related items without needing a separate named box for each one.',
    analogy: 'A collection is like a numbered row of lockers: each locker holds one item, and its position helps you find it.',
    win: ['A short list contains [red, blue]. Which item comes first?', 'red. Lists keep their items in an order you can follow.']
  },
  {
    terms: ['input and output', 'input/output', 'input', 'output'],
    what: 'Input is information a program receives. Output is the information or result it gives back.',
    why: 'Input lets a program respond to people or other systems; output lets them see what happened.',
    analogy: 'Think of ordering at a café: your order is input, the kitchen processes it, and the prepared drink is output.',
    win: ['At a café, what is the input and what is the output?', 'Your order is input; the prepared drink is output.']
  },
  {
    terms: ['introduction', 'hello world', 'first program', 'getting started'],
    what: 'A program is a set of steps a computer follows. You write those steps in a programming language and ask the computer to run them.',
    why: 'Understanding how a tiny program starts and shows a result gives you a safe first step for every larger project.',
    analogy: 'A program is like a recipe: the computer follows each instruction in order, beginning at the recipe’s first step.',
    win: ['When a computer runs a simple recipe of instructions, where does it begin?', 'It begins at the program’s starting instruction and follows the steps in order.']
  },
  {
    terms: ['object-oriented', 'oop', 'class', 'object', 'constructor'],
    what: 'An object is a way to keep related information and actions together. A class describes what objects of that kind contain and can do.',
    why: 'Grouping related details makes bigger programs easier to understand, update, and reuse.',
    analogy: 'A class is like a house plan; each house built from it is an object. Houses share the plan but can have different owners and paint colors.',
    win: ['If a class is a house plan, what is one actual house built from that plan?', 'An object: one example made from the class’s plan.']
  },
  {
    terms: ['debugging', 'debug', 'error handling', 'errors'],
    what: 'Debugging means finding why a program behaved differently from what you expected, then checking that the fix works.',
    why: 'A careful investigation fixes the cause of a problem instead of hiding it and creating a new one.',
    analogy: 'It is like retracing your steps to find where you took the wrong turn: repeat the problem, check each step, and test your correction.',
    win: ['Your program gives a surprising answer. What is a helpful first step?', 'Try the same steps again so you can see exactly when the surprising result happens.']
  },
  {
    terms: ['database', 'databases', 'sql', 'query'],
    what: 'A database is an organized place for a program to keep information so it can find and update it later.',
    why: 'It lets information remain available after the program closes and helps many parts of an application use the same records.',
    analogy: 'A database is like a filing cabinet with labeled drawers: labels and rules help you put each record in the right place and find it again.',
    win: ['Where would an app keep a saved task so it is still there tomorrow?', 'In a database or other saved storage, rather than only in a temporary screen.']
  },
  {
    terms: ['api', 'rest', 'request', 'endpoint'],
    what: 'An API is a set of agreed ways for one program to ask another program for information or an action.',
    why: 'Programs can work together without needing to know each other’s internal details.',
    analogy: 'An API is like a restaurant menu and waiter: the menu shows allowed requests, the waiter carries one to the kitchen, and brings back a response.',
    win: ['In the restaurant example, who carries your request to the kitchen?', 'The waiter. An API carries a request from one program to another.']
  },
  {
    terms: ['html', 'markup', 'semantic'],
    what: 'HTML uses labeled pieces called elements to describe what is on a web page, such as a heading, paragraph, or link.',
    why: 'Browsers need structure to display a page, and people using assistive tools need meaningful labels to understand it.',
    analogy: 'HTML is the frame and room labels of a house: it says where the doors and rooms are, while other tools handle paint and behavior.',
    win: ['Which HTML element would you choose for the main title of a page?', 'A heading element such as <h1>. It tells the browser and reader this is the main heading.']
  },
  {
    terms: ['css', 'style', 'selector', 'layout', 'flexbox', 'grid'],
    what: 'CSS is a set of rules that tells a browser how page elements should look and where they should go.',
    why: 'Separating appearance from page content makes a design easier to change and keeps pages consistent.',
    analogy: 'If HTML is a house’s rooms and walls, CSS is the paint, furniture, and arrangement that make it comfortable.',
    win: ['If you want every heading to be blue, should you change the page structure or add a style rule?', 'Add a CSS style rule. CSS controls how the heading looks.']
  },
  {
    terms: ['git', 'version control', 'github', 'branch', 'commit'],
    what: 'Version control records changes to files so you can review earlier work, save useful milestones, and work on changes safely.',
    why: 'It gives you a way to understand what changed and recover when an edit causes trouble.',
    analogy: 'It is like keeping named drafts of a document: you can compare versions and return to a known-good copy.',
    win: ['You made a change that broke your page. What can saved versions help you do?', 'Review what changed and return to an earlier working version.']
  },
  {
    terms: ['react', 'component', 'jsx', 'props', 'state', 'hook'],
    what: 'React helps you build a page from small reusable pieces called components. Each piece can show information and respond to changes.',
    why: 'Breaking a page into pieces makes it easier to reuse and update one part without rewriting everything.',
    analogy: 'A component is like a reusable building block: arrange several blocks together to make a larger page.',
    win: ['A page shows the same profile card in three places. What reusable piece could you make?', 'A profile-card component, then place it wherever the card is needed.']
  }
];

function getBeginnerGuide(title, category = '') {
  const normalized = `${title || ''} ${category || ''}`.toLowerCase();
  const guide = GUIDES.find((item) => item.terms.some((term) => normalized.includes(term))) || {
    what: `${title} is the idea this lesson will help you understand. Start with the example below, then notice what changes when you adjust one small part.`,
    why: `Learning ${title} gives you another tool for describing a task to a computer and building a program one small step at a time.`,
    analogy: `Think of ${title} as a new tool in a toolbox. This lesson shows what the tool does, when it is useful, and how to try it safely.`
  };
  return {
    ...guide,
    winPrompt: guide.win?.[0] || `In your own words, what do you think ${title} helps a program do?`,
    winAnswer: guide.win?.[1] || `A good starting answer is: ${guide.what}`
  };
}

function explainCodeLine(line, language, topicTitle) {
  const text = line.trim();
  const lang = (language || '').toLowerCase();
  if (!text) return null;
  if (/^(\/\/|#|\/\*|\*|<!--)/.test(text)) return 'This is a note for people reading the code; the computer skips it.';
  if (/^(using\s|import\s|from\s.+\simport\s|#include|package\s)/.test(text)) return 'This line prepares the program to use code or tools provided by the language or project.';
  if (/^(class|struct|interface)\s/.test(text)) {
    const name = text.match(/^(?:class|struct|interface)\s+([\w]+)/)?.[1];
    return `This begins a ${text.startsWith('class') ? 'class' : 'type'} named ${name || 'here'}: a plan that groups related information and actions.`;
  }
  if (/^(public\s+)?static\s+(void|int|string|bool|double)\s+main\s*\(|^func\s+main\s*\(|^def\s+main\s*\(/i.test(text)) return 'This defines the program’s starting action. When the program runs, it begins following the instructions inside this block.';
  const goFunction = text.match(/^func\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*(?:[\w*.[\] ]+)?\s*\{/);
  if (goFunction) return `This defines a reusable action named ${goFunction[1]}. The names inside the parentheses are the information it can receive.`;
  if (/^(if|else if|elif|else|switch|case|match)\b/.test(text)) return 'This line starts or selects a decision path. The program checks the condition and follows the matching path.';
  if (/^(for|while|foreach|do)\b/.test(text)) return 'This line starts a loop, which repeats the nearby instructions. Check its stopping rule so the repetition can finish.';
  if (/^return\b/.test(text)) return 'This sends a result back to the place that called this function. The word after return is the result.';
  if (/^(break|continue)\b/.test(text)) return text.startsWith('break') ? 'This stops the current loop early.' : 'This skips the rest of this turn through the loop and moves to the next item or repeat.';
  const increment = text.match(/^(?:\+\+|--)?([\w$]+)(\+\+|--)?;?$/);
  if (increment && (increment[0].includes('++') || increment[0].includes('--'))) return `This changes ${increment[1]} by one. In a loop, that often moves the counter toward the stopping point.`;
  if (/^[{}()]+[,;]?$/.test(text)) return 'This punctuation marks where a group of instructions begins or ends; it does not print anything by itself.';
  const htmlTag = text.match(/^<\/?([a-z][\w-]*)\b[^>]*>/i);
  if (htmlTag) return text.startsWith('</')
    ? `This closing ${htmlTag[1]} tag marks the end of that page element.`
    : `This opens a ${htmlTag[1]} page element. The tag name tells the browser what kind of content this is.`;
  const cssSelector = text.match(/^([^{}]+)\s*\{$/);
  if (cssSelector) return `This CSS selector chooses which page elements receive the style rules below: ${cssSelector[1].trim()}.`;
  const cssRule = text.match(/^([\w-]+)\s*:\s*(.+);$/);
  if (cssRule) return `This sets the ${cssRule[1]} appearance rule to ${cssRule[2]}. The browser applies it to the elements selected above.`;
  if (/^(SELECT|FROM|WHERE|JOIN|LEFT JOIN|GROUP BY|ORDER BY)\b/i.test(text)) return 'This part of the database request chooses, finds, connects, or arranges the records the program needs.';

  const outputMatch = text.match(/(?:Console\.WriteLine|Console\.Write|System\.out\.print(?:ln)?|fmt\.Print(?:ln|f)?|printf|puts|print|echo|std::cout\s*<<|console\.log)\s*\(?\s*(.*)/i);
  if (outputMatch) {
    const shown = outputMatch[1].replace(/[);]+$/, '').trim();
    return shown
      ? `This sends ${shown} to the output so a person can see the result.`
      : 'This sends a value or message to the output so a person can see the result.';
  }

  const assignment = text.match(/^(?:(?:const|let|var|final|static|val)\s+)?(?:(\w[\w:<>,.?\[\]]*)\s+)?([$\w]+)\s*([+\-*/]?=)\s*(.+?);?$/);
  if (assignment) {
    const [, declaredType, rawName, operator, rawValue] = assignment;
    const name = rawName.replace(/^\$/, '');
    const value = rawValue.replace(/;$/, '').trim();
    const kind = declaredType && !['const', 'let', 'var', 'final', 'static', 'val'].includes(declaredType)
      ? ` The word ${declaredType} tells the language what kind of value this name should hold.`
      : '';
    const action = operator === '=' ? 'gives' : `updates using ${operator}`;
    return `This creates or updates ${name} and ${action} it ${value}.${kind} The name is the label; the value on the right is the information being stored.`;
  }

  const signature = text.match(/^(?:(?:public|private|protected|static|async|export|function|func|def|fn)\s+)*(?:[\w<>\[\]?]+\s+)?([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*(?:\{|=>|:)?$/);
  if (signature && !/^(if|for|while|switch|catch)$/.test(signature[1])) {
    return `This defines or calls ${signature[1]}, a named action related to ${topicTitle}. The values inside the parentheses are information it can receive.`;
  }

  return `This line is one step in the ${topicTitle} example. Read it from left to right and notice which value or action it changes.`;
}

function buildLineWalkthrough(code, language, topicTitle) {
  return String(code || '').split('\n').map((source, index) => ({
    line: index + 1,
    source,
    explanation: explainCodeLine(source, language, topicTitle)
  })).filter((item) => item.explanation);
}

export { getBeginnerGuide, buildLineWalkthrough };
