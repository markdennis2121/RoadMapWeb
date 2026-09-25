export const NODE_CURRICULUM = {
  'node-1': {
    id: 'node-1',
    title: 'NPM & Package.json Management',
    category: 'Node.js',
    diagramType: 'api-flow',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Node.js Package.json and Dependency Simulation
const mockPackageJson = {
  name: "roadmap-backend-api",
  version: "1.0.0",
  type: "module", // Enables native ES Modules
  scripts: {
    dev: "nodemon src/server.js",
    build: "vite build",
    test: "jest --coverage"
  },
  dependencies: {
    express: "^4.19.2",
    dotenv: "^16.4.5",
    cors: "^2.8.5"
  },
  devDependencies: {
    nodemon: "^3.1.0",
    jest: "^29.7.0"
  }
};

console.log("Project Name:", mockPackageJson.name);
console.log("Production Dependencies:", Object.keys(mockPackageJson.dependencies));
console.log("Dev Scripts Available:", Object.keys(mockPackageJson.scripts));
console.log("Express Version Constraint:", mockPackageJson.dependencies.express);`,
    overview: {
      what: 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. NPM (Node Package Manager) is the world\'s largest software registry, and `package.json` is the manifest file describing a project\'s metadata, run scripts, and installed third-party dependencies.',
      why: 'Node.js empowers JavaScript developers to build full-stack web applications, scalable backend REST APIs, CLI tools, and microservices using a single unified language. NPM enables rapid integration of thousands of battle-tested open-source libraries.',
      whereUsed: 'Universal backend runtime powering Netflix, PayPal, LinkedIn, Uber, Trello, and millions of full-stack API servers worldwide.'
    },
    coreConcepts: [
      {
        title: '`package.json` Anatomy & Scripts',
        explanation: '`package.json` serves as the blueprint for any Node.js project. It records metadata, operational terminal scripts (`npm run dev`, `npm test`), and explicit dependency version constraints.',
        terms: [
          { term: 'dependencies', definition: 'Packages strictly required for the application to run in production (e.g. `express`, `pg`, `bcrypt`).' },
          { term: 'devDependencies', definition: 'Packages needed only during local development and testing (e.g. `nodemon`, `jest`, `eslint`, `typescript`).' },
          { term: 'package-lock.json', definition: 'Automatically generated lockfile recording exact cryptographic hashes and dependency trees to ensure deterministic installs across all machines.' }
        ],
        relationship: '`package.json` lists version ranges; `package-lock.json` locks the exact installed sub-dependency versions.'
      },
      {
        title: 'Semantic Versioning (SemVer: `MAJOR.MINOR.PATCH`)',
        explanation: 'NPM dependencies follow Semantic Versioning rules: `MAJOR` (breaking changes), `MINOR` (backwards-compatible new features), `PATCH` (backwards-compatible bug fixes).',
        terms: [
          { term: 'Caret (`^1.2.3`)', definition: 'Permits automatic minor and patch updates (>= 1.2.3 and < 2.0.0).' },
          { term: 'Tilde (`~1.2.3`)', definition: 'Permits only patch bug fix updates (>= 1.2.3 and < 1.3.0).' },
          { term: 'Exact (`1.2.3`)', definition: 'Locks strictly to that exact version.' }
        ],
        relationship: 'Understanding SemVer symbols prevents unexpected breaking changes during automated deployments.'
      }
    ],
    syntaxStructure: {
      generalStructure: `# Essential NPM CLI Commands
npm init -y                    # Initialize new project with default package.json
npm install <package>          # Install production dependency (--save)
npm install -D <package>       # Install development dependency (--save-dev)
npm run <script-name>          # Execute custom script defined in package.json
npm update                     # Update dependencies according to SemVer rules`,
      breakdown: [
        { part: 'npm install express', meaning: 'Downloads Express to node_modules and adds to dependencies.' },
        { part: 'npm install -D nodemon', meaning: 'Adds nodemon to devDependencies.' }
      ],
      conventions: [
        'Always commit `package.json` and `package-lock.json` to version control.',
        'Never commit `node_modules/` to Git (always include it in `.gitignore`).',
        'Use `npm ci` (Clean Install) in CI/CD automated build pipelines for faster, deterministic builds.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Initializing a New Node.js Project',
        description: 'Scaffolding a project and installing Express and Dotenv.',
        code: `# 1. Create project folder
mkdir my-backend && cd my-backend

# 2. Generate package.json
npm init -y

# 3. Install production dependencies
npm install express dotenv cors

# 4. Install development tool (Nodemon for auto-restart on file save)
npm install -D nodemon`,
        explanation: 'Sets up a standard Node.js server project in seconds.'
      },
      {
        level: 'Intermediate',
        title: 'Configuring Custom NPM Scripts',
        description: 'Adding development, build, and test scripts to `package.json`.',
        code: `{
  "name": "api-server",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "lint": "eslint src/"
  }
}

# Run in terminal:
# npm run dev  -> Starts nodemon auto-reloading server
# npm start    -> Starts production Node runtime`,
        explanation: 'Custom scripts simplify multi-step developer commands into standard terminal shortcuts.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Securing Dependencies with `npm audit`',
        description: 'Scanning project dependencies for known security vulnerabilities.',
        code: `# Run vulnerability scan across entire dependency tree
npm audit

# Automatically upgrade vulnerable packages to secure patched versions
npm audit fix

# In production CI pipelines:
npm audit --audit-level=high`,
        explanation: 'Crucial for maintaining cybersecurity compliance in enterprise applications.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Initialize Node Project',
        instruction: 'Run `npm init -y` in your project root directory.',
        whyNecessary: 'Creates the required `package.json` manifest file.',
        codeSnippet: `npm init -y`
      },
      {
        step: 2,
        title: 'Set `"type": "module"` for ES Modules',
        instruction: 'Add `"type": "module"` to `package.json` to enable native `import`/`export` syntax.',
        whyNecessary: 'Allows modern JavaScript syntax in Node.js without Babel transpilation.',
        codeSnippet: `// In package.json:\n"type": "module"`
      },
      {
        step: 3,
        title: 'Install Required Packages',
        instruction: 'Install runtime libraries with `npm install` and tooling with `npm install -D`.',
        whyNecessary: 'Populates `node_modules` and records dependency manifests.',
        codeSnippet: `npm install express && npm install -D nodemon`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always include `node_modules/` in `.gitignore`.',
        'Commit `package-lock.json` to guarantee identical installs across team members.',
        'Use `npm ci` instead of `npm install` inside CI/CD deployment scripts.'
      ],
      structureRecommendations: [
        'Organize source files inside `src/` (e.g. `src/server.js`, `src/routes/`).'
      ],
      performanceConsiderations: [
        'Keep production dependencies minimal to reduce container Docker image sizes and cold-start latency.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Committing `node_modules` to Git repository.',
        howToAvoid: 'Add `node_modules/` to `.gitignore` before installing any packages.',
        debuggingTip: 'Check if repository clone times are unusually slow.'
      },
      {
        mistake: 'Installing dev tools (like `nodemon` or `jest`) into production `dependencies`.',
        howToAvoid: 'Use `npm install -D <package>` for development-only tools.',
        debuggingTip: 'Verify `package.json` sections.'
      }
    ],
    projectApplications: [
      {
        domain: 'Microservices & REST API Backends',
        description: 'Managing database drivers (pg, mongoose), web frameworks (Express, Fastify), and authentication (jsonwebtoken).'
      },
      {
        domain: 'Build Tooling & Automation Scripts',
        description: 'Running code linters, bundlers (Vite/Webpack), and database migration scripts.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Initialize a Node.js project, install `chalk` and `dotenv`, and create a script that prints colored text in terminal.',
        'Configure custom `"dev"` and `"start"` scripts in `package.json`.'
      ],
      codingChallenge: {
        prompt: 'Use `npm audit` on a project to inspect installed package security and run `npm list --depth=0` to view top-level packages.',
        hint: 'Execute `npm list --depth=0` in terminal.'
      },
      miniProjectIdea: {
        title: 'Custom CLI Utility Tool',
        description: 'Build an executable Node.js CLI tool with `package.json` `"bin"` configuration that prints system status and weather.'
      }
    },
    summary: {
      keyPoints: [
        'Node.js executes JavaScript on the server; NPM manages packages and dependencies.',
        '`package.json` defines metadata, scripts, and SemVer dependencies; `package-lock.json` guarantees deterministic builds.',
        '`node_modules` must never be committed to version control.'
      ],
      skillsAcquired: [
        'Proficiency with NPM CLI workflows (`init`, `install`, `run`, `audit`).',
        'Mastery of Semantic Versioning rules (`^`, `~`, exact).',
        'Ability to configure professional Node.js project manifests.'
      ]
    },
    exercise: {
      question: 'Which flag should be used when installing development-only tools (like test frameworks or linters) with NPM?',
      options: ['-D (or --save-dev)', '-P (or --production)', '-G (or --global)', '-F (or --force)'],
      answer: '-D (or --save-dev)'
    },
    exam: {
      question: 'What is the critical purpose of committing `package-lock.json` to version control?',
      options: [
        'It records the exact cryptographic version tree of all installed dependencies and sub-dependencies, ensuring identical builds across all developer machines and production servers',
        'It compiles JavaScript into C++ binary',
        'It prevents users from deleting the project',
        'It is used by web browsers to load CSS'
      ],
      answer: 'It records the exact cryptographic version tree of all installed dependencies and sub-dependencies, ensuring identical builds across all developer machines and production servers'
    },
    materialUrl: 'https://docs.npmjs.com/about-npm'
  },

  'node-2': {
    id: 'node-2',
    title: 'Node.js Core Modules & Architecture',
    category: 'Node.js',
    diagramType: 'api-flow',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Node.js Core Modules & Event Loop Simulation
// Built-in modules require no npm installation (fs, path, os, http, crypto)

console.log("--- Node.js Core Architecture Simulation ---");

// Simulating path and os modules
const mockPath = {
  join: (...segments) => segments.join("/").replace(/\\/\\/+/g, "/"),
  extname: (file) => file.slice(file.lastIndexOf("."))
};

const mockOs = {
  platform: "linux",
  cpus: 8,
  freeMemoryMB: 4096
};

const filePath = mockPath.join("var", "www", "data", "users.json");
console.log("Resolved File Path:", filePath);
console.log("File Extension:", mockPath.extname(filePath));
console.log("System Architecture:", mockOs.platform, \`(\${mockOs.cpus} CPU Cores, \${mockOs.freeMemoryMB}MB Free RAM)\`);`,
    overview: {
      what: 'Node.js is built around an asynchronous, event-driven, non-blocking I/O runtime architecture powered by Google Chrome\'s V8 engine and the Libuv event loop. It comes with built-in Core Modules (`fs`, `path`, `http`, `os`, `crypto`, `events`) that require no external NPM installation.',
      why: 'Because Node.js processes I/O operations (file reading, network calls, database queries) asynchronously off the main thread, a single Node process can handle tens of thousands of concurrent client connections with minimal memory footprint.',
      whereUsed: 'Universal across backend servers, cloud serverless functions (AWS Lambda, Google Cloud Functions), streaming media servers, and file processing workers.'
    },
    coreConcepts: [
      {
        title: 'Non-Blocking Event Loop & Single-Threaded Concurrency',
        explanation: 'Node.js runs on a single main thread for executing JavaScript, while delegating heavy I/O operations (file system, networking) to the underlying operating system kernel or Libuv worker thread pool. When the I/O finishes, its callback is placed in the event loop queue for execution.',
        terms: [
          { term: 'Event Loop', definition: 'The core coordinator in Node.js that monitors the call stack and dispatches completed asynchronous callback events.' },
          { term: 'Non-Blocking I/O', definition: 'Operations return immediately without waiting for disk or network completion, allowing the server to handle other requests concurrently.' },
          { term: 'Libuv', definition: 'C library underpinning Node.js that manages the thread pool, event loop, and cross-platform asynchronous I/O.' }
        ],
        relationship: 'Non-blocking I/O prevents server threads from sitting idle while waiting for database queries or disk reads.'
      },
      {
        title: 'Built-in Core Modules (`fs/promises`, `path`, `crypto`)',
        explanation: 'Node.js provides essential system-level utilities natively without requiring external dependencies.',
        terms: [
          { term: 'node:fs/promises', definition: 'Asynchronous file system operations (reading, writing, deleting files and directories).' },
          { term: 'node:path', definition: 'Cross-platform path resolution utilities (handles `/` on Linux/Mac vs `\\` on Windows seamlessly).' },
          { term: 'node:crypto', definition: 'Cryptographic functions for generating secure random tokens, SHA-256 hashes, and password salts.' }
        ],
        relationship: 'Always prefix core module imports with `node:` (e.g. `import fs from "node:fs/promises"`).'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Importing Node.js Core Modules (ESM)
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

// Path Resolution and Async File Reading
const filePath = path.join(process.cwd(), 'data', 'config.json');
const rawData = await fs.readFile(filePath, 'utf-8');
const config = JSON.parse(rawData);`,
      breakdown: [
        { part: 'import fs from "node:fs/promises"', meaning: 'Imports modern Promise-based file system API.' },
        { part: 'path.join(...)', meaning: 'Safely joins path segments respecting the host operating system\'s path separators.' }
      ],
      conventions: [
        'Always use `path.join()` instead of manual string concatenation (`dir + "/" + file`) to prevent Windows/Linux path crashes.',
        'Always use Promise-based `node:fs/promises` rather than blocking synchronous methods (`fs.readFileSync`).'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Cross-Platform Path Resolution with `node:path`',
        description: 'Constructing safe file paths across Linux, macOS, and Windows.',
        code: `import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve directory of current ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, 'database', 'users.sqlite');
console.log("Resolved Database Path:", databasePath);
console.log("File Extension:", path.extname(databasePath));`,
        explanation: '`path.join()` guarantees valid path separators on all platforms.'
      },
      {
        level: 'Intermediate',
        title: 'Asynchronous File Reading and Writing with `node:fs/promises`',
        description: 'Safely saving and reading JSON configuration files asynchronously.',
        code: `import fs from 'node:fs/promises';
import path from 'node:path';

async function saveLogEntry(message) {
  const logFile = path.join(process.cwd(), 'activity.log');
  const timestamp = new Date().toISOString();
  const entry = \`[\${timestamp}] \${message}\\n\`;

  // Append entry asynchronously (creates file if not present)
  await fs.appendFile(logFile, entry, 'utf-8');
  console.log("Log appended successfully.");
}

await saveLogEntry("Server started on port 3000");`,
        explanation: '`fs.appendFile` executes non-blocking disk I/O.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Generating Secure Cryptographic Tokens with `node:crypto`',
        description: 'Creating high-entropy session tokens and SHA-256 hashes.',
        code: `import crypto from 'node:crypto';

// 1. Generate 32-byte cryptographically secure random authentication token
const sessionToken = crypto.randomBytes(32).toString('hex');
console.log("Secure Session Token:", sessionToken);

// 2. Hash sensitive data with SHA-256
function hashPayload(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

console.log("Payload Fingerprint:", hashPayload({ orderId: 1042, amount: 99.50 }));`,
        explanation: 'Native crypto module powers secure authentication, password hashing, and token generation.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Import Core Modules with `node:` Prefix',
        instruction: 'Use `import fs from "node:fs/promises";` and `import path from "node:path";`.',
        whyNecessary: 'Disambiguates core modules from third-party NPM packages.',
        codeSnippet: `import fs from 'node:fs/promises';\nimport path from 'node:path';`
      },
      {
        step: 2,
        title: 'Resolve Paths Relative to Working Directory',
        instruction: 'Use `path.join(process.cwd(), "folder", "file.ext")`.',
        whyNecessary: 'Prevents broken file references when scripts are executed from different parent directories.',
        codeSnippet: `const configPath = path.join(process.cwd(), 'config.json');`
      },
      {
        step: 3,
        title: 'Perform Async I/O Operations',
        instruction: 'Always use `await` with file reading/writing methods.',
        whyNecessary: 'Keeps the main thread free to handle incoming web traffic.',
        codeSnippet: `const content = await fs.readFile(configPath, 'utf-8');`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Prefix core imports with `node:` (`node:fs`, `node:path`, `node:crypto`).',
        'Never use synchronous blocking I/O methods (`fs.readFileSync`, `fs.writeFileSync`) in production web servers.',
        'Always use `path.join()` or `path.resolve()`.'
      ],
      structureRecommendations: [
        'Encapsulate file read/write operations within dedicated storage repository service classes.'
      ],
      performanceConsiderations: [
        'For large files (>50MB), use Node Streams (`fs.createReadStream()`) to pipe data in small chunks without consuming entire server RAM.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using `fs.readFileSync` inside an Express route handler, freezing the entire server for all users while the disk is read.',
        howToAvoid: 'Always use `await fs.readFile()` from `node:fs/promises`.',
        debuggingTip: 'Check if concurrent API requests hang while large files are accessed.'
      },
      {
        mistake: 'Hardcoding forward slashes (`"data/" + fileName`) which breaks when running on Windows servers.',
        howToAvoid: 'Always use `path.join("data", fileName)`.',
        debuggingTip: 'Test path resolution across different operating systems.'
      }
    ],
    projectApplications: [
      {
        domain: 'Data Ingestion & CSV Parsers',
        description: 'Reading, transforming, and streaming millions of database records from disk.'
      },
      {
        domain: 'Authentication & Session Token Security',
        description: 'Generating cryptographically secure reset tokens, API keys, and HMAC signatures.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Write a script that reads a JSON file from disk, increments a `visitCount` number, and writes it back to disk.',
        'Use `node:os` to print your computer\'s total RAM, free RAM, and operating system hostname.'
      ],
      codingChallenge: {
        prompt: 'Build a function `safeReadJson(filePath)` that uses `fs.readFile` and `JSON.parse` with error handling, returning null if the file does not exist.',
        hint: 'Use `try { await fs.readFile(...) } catch (err) { if (err.code === "ENOENT") return null; }`.'
      },
      miniProjectIdea: {
        title: 'Markdown Static Site Generator CLI',
        description: 'Build a Node.js utility that scans a `content/` folder for `.md` files, converts them to HTML, and writes them to a `dist/` directory using `node:fs/promises` and `node:path`.'
      }
    },
    summary: {
      keyPoints: [
        'Node.js uses an event-driven, non-blocking I/O model powered by V8 and Libuv.',
        'Core modules (`fs`, `path`, `os`, `crypto`) provide native system capabilities without NPM packages.',
        'Always use asynchronous Promise-based file system APIs and `path.join()` for cross-platform stability.'
      ],
      skillsAcquired: [
        'Deep understanding of Node.js event loop architecture.',
        'Proficiency with `node:fs/promises` and `node:path`.',
        'Ability to write non-blocking, high-performance server utilities.'
      ]
    },
    exercise: {
      question: 'Which Node.js core module safely constructs cross-platform file paths respecting operating system path separators?',
      options: ['node:path', 'node:fs', 'node:url', 'node:os'],
      answer: 'node:path'
    },
    exam: {
      question: 'Why is using synchronous file methods like `fs.readFileSync()` considered a catastrophic anti-pattern inside a Node.js production web server?',
      options: [
        'Because JavaScript in Node.js runs on a single main thread; synchronous file reading completely freezes the entire server, blocking all other concurrent user requests until the disk read finishes',
        'Because synchronous methods are encrypted',
        'Because synchronous methods delete the file after reading',
        'Because synchronous methods only work in the browser'
      ],
      answer: 'Because JavaScript in Node.js runs on a single main thread; synchronous file reading completely freezes the entire server, blocking all other concurrent user requests until the disk read finishes'
    },
    materialUrl: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs'
  },

  'node-3': {
    id: 'node-3',
    title: 'Express.js Basics & Middleware',
    category: 'Node.js',
    diagramType: 'api-flow',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Express.js Request-Response and Middleware Simulation
console.log("--- Express.js Server Simulation ---");

// Simulating Express Middleware Pipeline
const middlewareStack = [];

function use(middlewareFn) {
  middlewareStack.push(middlewareFn);
}

// 1. Logger Middleware
use((req, res, next) => {
  console.log(\`[LOG] \${req.method} \${req.url} from \${req.ip}\`);
  next();
});

// 2. Auth Middleware
use((req, res, next) => {
  if (req.headers.authorization) {
    req.user = { id: 1, name: "Admin" };
    console.log("✓ Auth Middleware: User authenticated as Admin");
    next();
  } else {
    console.log("✗ Auth Middleware: Missing token!");
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Simulating an incoming HTTP Request through pipeline:
const mockReq = { method: "GET", url: "/api/topics", ip: "127.0.0.1", headers: { authorization: "Bearer secret" } };
const mockRes = { status: (code) => ({ json: (data) => console.log(\`Response \${code}:\`, data) }) };

function executePipeline(req, res) {
  let index = 0;
  function next() {
    if (index < middlewareStack.length) {
      const currentMiddleware = middlewareStack[index++];
      currentMiddleware(req, res, next);
    } else {
      console.log("Route Handler Executed: Returning 200 OK with Topic Data.");
    }
  }
  next();
}

executePipeline(mockReq, mockRes);`,
    overview: {
      what: 'Express.js is the minimal, flexible, and most popular web application framework for Node.js. It provides a robust set of features for web and mobile applications—simplifying routing, HTTP request/response handling, parameter parsing, static file serving, and middleware pipelines.',
      why: 'Raw Node.js `http.createServer` requires tedious manual URL parsing, header configuration, and stream buffer concatenation. Express provides an elegant, expressive API that accelerates backend API development.',
      whereUsed: 'Universal backend framework for RESTful APIs, microservices, webhook receivers, and Single Page Application server backends.'
    },
    coreConcepts: [
      {
        title: 'The Request-Response Lifecycle & Middleware',
        explanation: 'In Express, incoming requests travel sequentially through a pipeline of Middleware functions. Each middleware has access to the Request object (`req`), Response object (`res`), and the `next()` function.',
        terms: [
          { term: 'Middleware', definition: 'Functions that execute during the lifecycle of a request before reaching the final route handler.' },
          { term: 'next()', definition: 'Function that passes control to the next middleware in the execution stack. If omitted, the request hangs indefinitely.' },
          { term: 'req.params vs req.query vs req.body', definition: '`req.params` (URL `:id`), `req.query` (search params `?q=test`), `req.body` (JSON payload).' }
        ],
        relationship: 'Middleware can execute code, modify `req`/`res`, end the request, or call `next()` to advance down the chain.'
      },
      {
        title: 'Essential Built-In Middleware (`express.json()`, `cors`)',
        explanation: 'By default, Express does not parse JSON bodies. Applying `app.use(express.json())` automatically deserializes incoming request bodies into `req.body`.',
        terms: [
          { term: 'express.json()', definition: 'Parses incoming JSON request payloads and attaches the resulting object to `req.body`.' },
          { term: 'cors()', definition: 'Cross-Origin Resource Sharing middleware enabling frontend apps on different ports/domains to access your API.' },
          { term: 'Error Handling Middleware', definition: 'Special 4-argument middleware `(err, req, res, next)` catching unhandled errors.' }
        ],
        relationship: 'Standard middleware setup order: CORS -> JSON parser -> Auth middleware -> Route handlers -> Error handler.'
      }
    ],
    syntaxStructure: {
      generalStructure: `import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Global Middleware
app.use(cors());
app.use(express.json());

// 2. Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: Date.now() });
});

// 3. Start Server Listener
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
      breakdown: [
        { part: 'app.use(express.json())', meaning: 'Enables JSON body parsing globally for all routes.' },
        { part: 'app.get("/path", (req, res) => res.json({ status: "ok" }))', meaning: 'Registers a GET route handler that returns a JSON response.' },
        { part: 'res.status(200).json(data)', meaning: 'Sets HTTP status code and transmits JSON response.' }
      ],
      conventions: [
        'Always place `app.use(express.json())` before registering route handlers.',
        'Always place error handling middleware `(err, req, res, next)` at the very bottom of the file after all routes.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Minimal Express Server with Health Check Endpoint',
        description: 'Scaffolding a basic Express web server.',
        code: `import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Roadmap Tracker API!');
});

app.get('/api/ping', (req, res) => {
  res.json({ pong: true, time: new Date() });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});`,
        explanation: 'Demonstrates basic server initialization, routing, and JSON response delivery.'
      },
      {
        level: 'Intermediate',
        title: 'Custom Authentication & Logging Middleware',
        description: 'Creating reusable middleware guards in Express.',
        code: `// Custom Request Logger Middleware
const requestLogger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.path}\`);
  next(); // Advance to next handler!
};

// API Key Guard Middleware
const requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'secret-access-token-123') {
    next(); // Key is valid, allow request!
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }
};

app.use(requestLogger);

// Protected endpoint requiring API key
app.get('/api/admin/stats', requireApiKey, (req, res) => {
  res.json({ totalUsers: 1420, serverLoad: 'Normal' });
});`,
        explanation: 'Middleware guards validate credentials and block unauthorized traffic before reaching route logic.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Global Centralized Error Handling Middleware',
        description: 'Catching all synchronous and asynchronous errors centrally.',
        code: `// Route that throws an error
app.get('/api/broken', (req, res, next) => {
  try {
    throw new Error('Database connection timeout');
  } catch (error) {
    next(error); // Forwards error to centralized error middleware!
  }
});

// Centralized Error Middleware (Must have 4 arguments: err, req, res, next)
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});`,
        explanation: 'Ensures the server never crashes on unhandled errors and returns consistent JSON error payloads.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Install Express and CORS',
        instruction: 'Run `npm install express cors dotenv` in your project terminal.',
        whyNecessary: 'Installs the core framework and security utilities.',
        codeSnippet: `npm install express cors dotenv`
      },
      {
        step: 2,
        title: 'Configure Global Middleware',
        instruction: 'Add `app.use(cors())` and `app.use(express.json())` immediately after initializing `const app = express()`.',
        whyNecessary: 'Enables cross-origin frontend requests and JSON body deserialization.',
        codeSnippet: `app.use(cors());\napp.use(express.json());`
      },
      {
        step: 3,
        title: 'Register Routes and Start Listener',
        instruction: 'Define endpoints using `app.get()`, `app.post()` and start server with `app.listen(PORT)`.',
        whyNecessary: 'Binds the application to a local TCP network port.',
        codeSnippet: `app.listen(3000, () => console.log('Listening on 3000'));`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always use `express.json()` to parse request bodies.',
        'Always call `next()` inside custom middleware unless you are terminating the response with `res.json()`.',
        'Always implement a 4-parameter `(err, req, res, next)` error handler at the end of your middleware stack.'
      ],
      structureRecommendations: [
        'Split routes into separate controller files using `express.Router()` (e.g. `routes/auth.js`, `routes/topics.js`).'
      ],
      performanceConsiderations: [
        'Use `helmet` middleware (`npm install helmet`) to automatically configure secure HTTP response headers in production.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Forgetting `next()` inside custom middleware, causing incoming requests to hang forever until timeout.',
        howToAvoid: 'Ensure every path through your middleware calls either `next()` or `res.send()/res.json()`.',
        debuggingTip: 'Check if the browser request spinner spins indefinitely.'
      },
      {
        mistake: 'Trying to access `req.body` without `app.use(express.json())`, resulting in `req.body` being `undefined`.',
        howToAvoid: 'Always register `app.use(express.json())` before routes.',
        debuggingTip: 'Check if `req.body` is `undefined` on POST requests.'
      }
    ],
    projectApplications: [
      {
        domain: 'Microservices & REST APIs',
        description: 'Serving structured JSON data to React frontends, mobile apps, and third-party integrations.'
      },
      {
        domain: 'Webhook Ingestion Servers',
        description: 'Listening for real-time payment webhook events from Stripe, GitHub, or Shopify.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build a simple Express server with a `GET /api/time` endpoint that returns the current server ISO timestamp.',
        'Create a middleware that measures and logs the response time (in milliseconds) for every incoming request.'
      ],
      codingChallenge: {
        prompt: 'Build a POST `/api/echo` endpoint that receives a JSON body `{ message: "hello" }` and returns `{ echoed: "HELLO", length: 5 }`.',
        hint: 'Use `req.body.message` and `res.json()`.'
      },
      miniProjectIdea: {
        title: 'Express Note-Taking Backend API',
        description: 'Build an Express backend with in-memory array storage supporting GET all notes, POST create note, and DELETE note by ID.'
      }
    },
    summary: {
      keyPoints: [
        'Express simplifies Node.js routing, middleware, and request/response management.',
        'Middleware functions execute sequentially in a pipeline using `next()`.',
        '`app.use(express.json())` enables JSON body parsing for POST/PUT requests.'
      ],
      skillsAcquired: [
        'Proficiency in scaffolding Express web applications.',
        'Mastery of custom middleware authoring and error handling.',
        'Ability to structure scalable backend API servers.'
      ]
    },
    exercise: {
      question: 'What function MUST be called inside a custom Express middleware to pass control to the next middleware in the pipeline?',
      options: ['next()', 'continue()', 'forward()', 'pass()'],
      answer: 'next()'
    },
    exam: {
      question: 'What happens if a developer forgets to register `app.use(express.json())` before defining a `POST` route in Express?',
      options: [
        '`req.body` will be `undefined`, causing attempts to read submitted JSON properties to fail or throw TypeErrors',
        'Express will crash on server startup',
        'The route will automatically convert to a GET request',
        'CORS security will block the connection'
      ],
      answer: '`req.body` will be `undefined`, causing attempts to read submitted JSON properties to fail or throw TypeErrors'
    },
    materialUrl: 'https://expressjs.com/en/starter/installing.html'
  },

  'node-4': {
    id: 'node-4',
    title: 'RESTful API Design & CRUD',
    category: 'Node.js',
    diagramType: 'api-flow',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// RESTful API Design Principles & CRUD Endpoints Simulation
const database = [
  { id: 1, title: "Learn HTML5", completed: true },
  { id: 2, title: "Master React Hooks", completed: false }
];

console.log("--- RESTful API CRUD Simulation ---");

// 1. GET /api/todos - Read All
console.log("GET /api/todos (200 OK):", JSON.stringify(database));

// 2. POST /api/todos - Create New Resource
const newTodo = { id: 3, title: "Build Node REST API", completed: false };
database.push(newTodo);
console.log("POST /api/todos (201 Created):", JSON.stringify(newTodo));

// 3. PUT /api/todos/2 - Update Resource
const target = database.find(t => t.id === 2);
if (target) target.completed = true;
console.log("PUT /api/todos/2 (200 OK):", JSON.stringify(target));

// 4. DELETE /api/todos/1 - Delete Resource
const deleteIdx = database.findIndex(t => t.id === 1);
if (deleteIdx !== -1) database.splice(deleteIdx, 1);
console.log("DELETE /api/todos/1 (204 No Content) - Remaining Items:", database.length);`,
    overview: {
      what: 'REST (Representational State Transfer) is an architectural standard for designing networked applications. A RESTful API exposes resources via clean, predictable URIs (nouns) and manipulates them using standard HTTP methods (verbs): GET (Read), POST (Create), PUT/PATCH (Update), and DELETE (Delete), returning standardized HTTP status codes.',
      why: 'RESTful APIs provide a universal, stateless, decoupled interface between backend servers and diverse client applications (web browsers, iOS/Android apps, IoT devices, third-party developers).',
      whereUsed: 'The global standard for public and internal web APIs (GitHub REST API, Stripe API, Twitter API, Shopify API).'
    },
    coreConcepts: [
      {
        title: 'Resource-Oriented URI Design (Nouns vs Verbs)',
        explanation: 'REST endpoints represent plural resource nouns (`/api/users`, `/api/orders`), NOT action verbs (`/api/getUser`, `/api/deleteUser`). The HTTP method specifies the action.',
        terms: [
          { term: 'GET /api/topics', definition: 'Retrieves a list of topics (Status: 200 OK).' },
          { term: 'GET /api/topics/:id', definition: 'Retrieves a single topic by ID (Status: 200 OK or 404 Not Found).' },
          { term: 'POST /api/topics', definition: 'Creates a new topic from request body (Status: 201 Created).' },
          { term: 'PUT /api/topics/:id', definition: 'Replaces full topic resource (Status: 200 OK).' },
          { term: 'PATCH /api/topics/:id', definition: 'Partially updates specific fields (Status: 200 OK).' },
          { term: 'DELETE /api/topics/:id', definition: 'Removes topic resource (Status: 200 OK or 204 No Content).' }
        ],
        relationship: 'Standardizing on resource nouns makes API endpoints intuitive, consistent, and self-documenting.'
      },
      {
        title: 'Standard HTTP Status Code Conventions',
        explanation: 'RESTful APIs communicate operation outcomes using standardized 3-digit HTTP status codes grouped by category.',
        terms: [
          { term: '200 OK', definition: 'Standard successful response for GET, PUT, PATCH.' },
          { term: '201 Created', definition: 'Successful creation response for POST; includes newly created resource.' },
          { term: '204 No Content', definition: 'Successful request with no response body (common for DELETE).' },
          { term: '400 Bad Request', definition: 'Client sent invalid or malformed data.' },
          { term: '401 Unauthorized', definition: 'Authentication is missing or invalid.' },
          { term: '403 Forbidden', definition: 'User is authenticated but lacks required permission.' },
          { term: '404 Not Found', definition: 'Target resource does not exist.' },
          { term: '500 Internal Server Error', definition: 'Uncaught server-side exception or database failure.' }
        ],
        relationship: 'Always return the most accurate status code to assist client error handling.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Express RESTful Router Implementation
import express from 'express';
const router = express.Router();

// 1. GET /api/topics (Read All)
router.get('/', async (req, res) => {
  const topics = await getTopics();
  res.status(200).json({ success: true, data: topics });
});

// 2. GET /api/topics/:id (Read One)
router.get('/:id', async (req, res) => {
  const topic = await getTopicById(req.params.id);
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  res.status(200).json({ success: true, data: topic });
});

// 3. POST /api/topics (Create)
router.post('/', async (req, res) => {
  const created = await createTopic(req.body);
  res.status(201).json({ success: true, data: created });
});

// 4. DELETE /api/topics/:id (Delete)
router.delete('/:id', async (req, res) => {
  await deleteTopic(req.params.id);
  res.status(204).send();
});

export default router;`,
      breakdown: [
        { part: 'router.get("/:id", ...)', meaning: 'Captures dynamic route parameter in req.params.id.' },
        { part: 'res.status(201).json(...)', meaning: 'Returns 201 Created status for newly generated resources.' }
      ],
      conventions: [
        'Use plural nouns for resource paths (`/api/products`, `/api/users`).',
        'Wrap API responses in consistent envelope structures (`{ success: true, data: [...] }`).',
        'Use nested resource paths for parent-child relationships (`/api/users/:userId/orders`).'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Full In-Memory CRUD Endpoint Suite',
        description: 'Complete working CRUD operations on an array dataset.',
        code: `import express from 'express';

const app = express();
app.use(express.json());

let items = [
  { id: 1, name: "Keyboard", price: 99 },
  { id: 2, name: "Mouse", price: 49 }
];

// GET All
app.get('/api/items', (req, res) => res.json(items));

// GET by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// POST Create
app.post('/api/items', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE
app.delete('/api/items/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).send();
});`,
        explanation: 'Demonstrates all 4 CRUD operations adhering to REST principles.'
      },
      {
        level: 'Intermediate',
        title: 'Pagination and Query Parameter Filtering',
        description: 'Supporting `?page=1&limit=10&status=active` in REST endpoints.',
        code: `app.get('/api/products', (req, res) => {
  let { page = 1, limit = 10, category } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = allProducts;
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  res.json({
    page,
    limit,
    totalRecords: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
    data: paginatedData
  });
});`,
        explanation: 'Enables clients to filter and paginate large datasets cleanly.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Robust Input Validation & Error Envelope',
        description: 'Validating payload constraints and returning RFC 7807 formatted error envelopes.',
        code: `app.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;

  // Validation Checks
  if (!username || typeof username !== 'string' || username.length < 3) {
    return res.status(400).json({
      error: 'Invalid username: must be at least 3 characters',
      field: 'username'
    });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      error: 'Invalid email address format',
      field: 'email'
    });
  }

  const newUser = await database.createUser({ username, email, password });
  return res.status(201).json({ success: true, user: newUser });
});`,
        explanation: 'Guards database against bad inputs and returns clear field-specific error feedback.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Map Data Model to REST Resource Nouns',
        instruction: 'Define plural endpoints (e.g. `/api/todos`, `/api/users`).',
        whyNecessary: 'Establishes a predictable, standardized API blueprint.',
        codeSnippet: `// Endpoints: /api/todos, /api/todos/:id`
      },
      {
        step: 2,
        title: 'Implement CRUD Handlers with Correct HTTP Verbs',
        instruction: 'Use `app.get` for reads, `app.post` for creation, `app.put`/`app.patch` for updates, `app.delete` for removal.',
        whyNecessary: 'Conforms to HTTP and REST specification standards.',
        codeSnippet: `router.post('/api/todos', createTodo);`
      },
      {
        step: 3,
        title: 'Return Accurate HTTP Status Codes',
        instruction: 'Send `201` on creation, `204` on deletion, `404` when missing, `400` on invalid input.',
        whyNecessary: 'Enables client libraries (like Axios or Fetch) to react appropriately.',
        codeSnippet: `res.status(201).json(newItem);`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Use plural nouns (`/api/users`) rather than verbs (`/api/getUsers`).',
        'Always return `201 Created` for successful POST creation requests.',
        'Always return `404 Not Found` when a queried resource ID does not exist in the database.'
      ],
      structureRecommendations: [
        'Structure APIs with versioned prefixes (e.g. `/api/v1/resources`).'
      ],
      performanceConsiderations: [
        'Always implement pagination (`?page=1&limit=20`) on collection endpoints to prevent crashing the server when tables reach millions of rows.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using verbs in URLs (e.g. `POST /api/delete-user/5` or `GET /api/getUser`).',
        howToAvoid: 'Use HTTP methods with clean nouns: `DELETE /api/users/5` and `GET /api/users/5`.',
        debuggingTip: 'Check if your URL paths contain action words.'
      },
      {
        mistake: 'Returning `200 OK` with an error message inside the body (`{ status: 200, error: "Not found" }`).',
        howToAvoid: 'Set real HTTP status codes: `res.status(404).json({ error: "Not found" })`.',
        debuggingTip: 'Check if frontend `res.ok` checks pass even when operations fail.'
      }
    ],
    projectApplications: [
      {
        domain: 'Full-Stack Web Applications',
        description: 'Powering communication between React frontend clients and PostgreSQL / MongoDB databases.'
      },
      {
        domain: 'Public Developer APIs',
        description: 'Providing public SDK and REST API access for third-party integrations (like Stripe or GitHub).'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build an Express REST router for `/api/books` supporting GET all, GET by ID, POST create, and DELETE.',
        'Add query parameter filtering so `GET /api/books?author=Rowling` returns only matching books.'
      ],
      codingChallenge: {
        prompt: 'Build a PATCH `/api/tasks/:id` endpoint that updates only the `completed` field of a task and returns the updated task with status 200.',
        hint: 'Use `targetTask.completed = req.body.completed; res.json(targetTask);`.'
      },
      miniProjectIdea: {
        title: 'Full RESTful E-Commerce Product API',
        description: 'Build a production-ready Express API with full CRUD endpoints for `/api/v1/products`, complete with pagination, search query filtering, and 400 validation error responses.'
      }
    },
    summary: {
      keyPoints: [
        'RESTful APIs organize resources under plural nouns and manipulate them using HTTP verbs (GET, POST, PUT, DELETE).',
        'Accurate HTTP status codes (200, 201, 204, 400, 404, 500) convey request outcomes to clients.',
        'Query parameters (`?page=1&limit=10`) handle filtering, sorting, and pagination.'
      ],
      skillsAcquired: [
        'Proficiency in architecting production-grade RESTful APIs.',
        'Mastery of CRUD operations and HTTP status code standards.',
        'Ability to design intuitive, scalable backend interfaces.'
      ]
    },
    exercise: {
      question: 'Which HTTP method and status code combination should be returned when a new resource is successfully created on the server?',
      options: ['POST with 201 Created', 'GET with 200 OK', 'PUT with 204 No Content', 'POST with 200 OK'],
      answer: 'POST with 201 Created'
    },
    exam: {
      question: 'What is the primary architectural rule regarding URI design in RESTful API engineering?',
      options: [
        'URIs must represent plural resource nouns (e.g. `/api/articles`), while the HTTP method (GET, POST, PUT, DELETE) specifies the operation to perform',
        'URIs must always contain action verbs like `/api/get-articles`',
        'URIs must be encrypted with SHA-256',
        'URIs cannot accept numerical ID parameters'
      ],
      answer: 'URIs must represent plural resource nouns (e.g. `/api/articles`), while the HTTP method (GET, POST, PUT, DELETE) specifies the operation to perform'
    },
    materialUrl: 'https://restfulapi.net/'
  }
};
