export const REACT_CURRICULUM = {
  'react-1': {
    id: 'react-1',
    title: 'React Components & JSX',
    category: 'React',
    diagramType: 'react-component-tree',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// React Functional Component and JSX Simulation
// JSX is syntax sugar that compiles to React.createElement()

function UserBadge({ username, role, isOnline }) {
  return {
    type: "div",
    props: {
      className: "user-badge",
      children: [
        { type: "strong", props: { children: username } },
        { type: "span", props: { children: \` (\${role})\` } },
        {
          type: "span",
          props: {
            style: { color: isOnline ? "#10b981" : "#94a3b8", marginLeft: "8px" },
            children: isOnline ? "● Online" : "○ Offline"
          }
        }
      ]
    }
  };
}

// Rendering Component Hierarchy
const badge1 = UserBadge({ username: "Sarah Connor", role: "Lead Engineer", isOnline: true });
const badge2 = UserBadge({ username: "John Doe", role: "UI Designer", isOnline: false });

console.log("Rendered Badge 1 Virtual Node:", badge1.props.children[0].props.children, badge1.props.children[2].props.children);
console.log("Rendered Badge 2 Virtual Node:", badge2.props.children[0].props.children, badge2.props.children[2].props.children);`,
    overview: {
      what: 'React is a declarative, component-based JavaScript library for building user interfaces. Components are independent, reusable pieces of UI that accept inputs (props) and return JSX (JavaScript XML), an HTML-like syntax extension that describes what the UI should look like.',
      why: 'Traditional DOM scripting requires manual, imperative updates that become brittle and error-prone as apps grow. React\'s component architecture and Virtual DOM enable developers to write declarative UI that automatically re-renders efficiently whenever underlying data changes.',
      whereUsed: 'The dominant frontend UI technology used by Meta, Netflix, Airbnb, Uber, Discord, and thousands of tech enterprises worldwide.'
    },
    coreConcepts: [
      {
        title: 'Component-Driven Architecture & Virtual DOM',
        explanation: 'React applications are structured as a hierarchical tree of nested components. Instead of mutating the browser DOM directly, React maintains a lightweight Virtual DOM in memory, calculates the minimal diff, and patches the real DOM efficiently (Reconciliation).',
        terms: [
          { term: 'Functional Component', definition: 'A JavaScript function that accepts `props` and returns JSX elements.' },
          { term: 'JSX (JavaScript XML)', definition: 'Syntax extension allowing HTML-like markup to be written directly inside JavaScript files.' },
          { term: 'Virtual DOM', definition: 'Lightweight in-memory representation of the real DOM used for fast diffing and batch updates.' },
          { term: 'Reconciliation', definition: 'The algorithm React uses to diff the Virtual DOM and update only changed real DOM nodes.' }
        ],
        relationship: 'Components return JSX -> JSX compiles to Virtual DOM objects -> React reconciles differences and updates the real browser DOM.'
      },
      {
        title: 'JSX Rules & Expressions',
        explanation: 'JSX requires specific syntactic rules: all tags must be closed, adjacent elements must be wrapped in a single parent tag or React Fragment (`<>...</>`), and dynamic JavaScript expressions are embedded inside single curly braces `{}`.',
        terms: [
          { term: 'React Fragment (`<>...</>`)', definition: 'Invisible container that groups multiple JSX sibling elements without adding extra `<div>` nodes to the real DOM.' },
          { term: 'className vs class', definition: 'JSX uses `className` because `class` is a reserved keyword in JavaScript.' },
          { term: 'Embedding JS (`{expr}`)', definition: 'Any valid JavaScript expression (variables, ternaries, function calls) can be embedded inside `{}`.' }
        ],
        relationship: 'JSX seamlessly blends HTML markup with full JavaScript programming capability.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Standard Functional Component in React
import React from 'react';

export function UserCard({ name, avatarUrl, bio }) {
  return (
    <div className="user-card">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h2 className="title">{name}</h2>
      <p className="bio">{bio}</p>
    </div>
  );
}`,
      breakdown: [
        { part: 'export function UserCard(props)', meaning: 'Declares a reusable functional component receiving props.' },
        { part: 'return ( <div className="...">...</div> )', meaning: 'Returns JSX describing the component UI structure.' },
        { part: '{name}', meaning: 'Embeds dynamic JavaScript variable into JSX text.' }
      ],
      conventions: [
        'Always capitalize component names (`UserCard`, not `userCard`) so React distinguishes them from native HTML tags.',
        'Use React Fragments (`<>...</>`) to group sibling elements without adding DOM wrapper bloat.',
        'Always close self-closing tags explicitly (e.g. `<img />`, `<input />`, `<br />`).'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Basic Functional Greeting Component',
        description: 'Creating a component that embeds dynamic props inside JSX.',
        code: `function WelcomeBanner({ title, subtitle }) {
  return (
    <header className="banner">
      <h1>{title}</h1>
      <p>{subtitle || "Default subtitle"}</p>
    </header>
  );
}`,
        explanation: 'Clean, reusable component accepting structured title and subtitle props.'
      },
      {
        level: 'Intermediate',
        title: 'Conditional Rendering & List Mapping in JSX',
        description: 'Rendering lists of data and conditionally showing badges.',
        code: `function ProjectList({ projects, isLoading }) {
  if (isLoading) {
    return <div className="spinner">Loading projects...</div>;
  }

  return (
    <div className="project-grid">
      {projects.map((proj) => (
        <article key={proj.id} className="project-card">
          <h3>{proj.title}</h3>
          {proj.isCompleted && <span className="badge badge-done">Completed ✓</span>}
        </article>
      ))}
    </div>
  );
}`,
        explanation: 'Demonstrates early loading return, `.map()` list iteration, unique `key` props, and short-circuit `&&` rendering.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Composed Application Layout with Children',
        description: 'Building a master shell component that wraps child views with header and footer.',
        code: `function AppShell({ user, children }) {
  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="logo">RoadmapTracker</span>
        <span className="user-label">{user?.name}</span>
      </nav>
      <main className="content-container">
        {children} {/* Injects whatever nested components are passed inside! */}
      </main>
      <footer>© 2026 RoadmapTracker Inc.</footer>
    </div>
  );
}`,
        explanation: '`children` prop enables powerful component composition and reusable layout shells.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Create Component File',
        instruction: 'Create a new file named with PascalCase (e.g. `src/components/UserProfile.jsx`).',
        whyNecessary: 'Follows React file organization and component naming conventions.',
        codeSnippet: `touch src/components/UserProfile.jsx`
      },
      {
        step: 2,
        title: 'Author the Functional Component',
        instruction: 'Define a function with a capitalized name and return valid JSX markup.',
        whyNecessary: 'Lowercase tags are parsed as standard HTML elements by the JSX compiler.',
        codeSnippet: `export function UserProfile({ user }) {\n  return <div className="profile"><h2>{user.name}</h2></div>;\n}`
      },
      {
        step: 3,
        title: 'Import and Render in Parent',
        instruction: 'Import your component into `App.jsx` or a parent view and render it as `<UserProfile user={currentUser} />`.',
        whyNecessary: 'Attaches the component into the active React component tree.',
        codeSnippet: `import { UserProfile } from './components/UserProfile.jsx';`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always capitalize component function names (`UserProfile`).',
        'Always supply a stable, unique `key` prop (like database IDs) when mapping over arrays in JSX; never use array index if items can be reordered or deleted.',
        'Keep components small, focused, and single-responsibility.'
      ],
      structureRecommendations: [
        'Place reusable components inside a `src/components/` directory.'
      ],
      performanceConsiderations: [
        'React\'s Virtual DOM diffing operates in $O(n)$ time when unique `key` props are provided on list items.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using `class="..."` instead of `className="..."` in JSX.',
        howToAvoid: 'Always write `className`. `class` is a reserved JavaScript keyword.',
        debuggingTip: 'Check console for React warning: `Invalid DOM property "class". Did you mean "className"?`'
      },
      {
        mistake: 'Returning multiple adjacent JSX sibling elements without a wrapping `<>` Fragment or parent `<div>`.',
        howToAvoid: 'Wrap siblings in a React Fragment (`<> <h1>Title</h1> <p>Text</p> </>`).',
        debuggingTip: 'Check for compiler error: `Adjacent JSX elements must be wrapped in an enclosing tag`.'
      }
    ],
    projectApplications: [
      {
        domain: 'Design Systems & Component Libraries (MUI, Shadcn/UI)',
        description: 'Building modular buttons, modals, dropdowns, and data grids used across large SaaS apps.'
      },
      {
        domain: 'Single Page Applications & Dashboards',
        description: 'Constructing reactive user workspaces, kanban boards, and analytics portals.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build a `ProductCard` component that takes `title`, `price`, and `inStock` boolean props and formats the price.',
        'Map over an array of 5 skills and render each inside a `<span className="badge">` with a unique `key`.'
      ],
      codingChallenge: {
        prompt: 'Create an `AlertBox` component that accepts `type` ("success", "warning", "error") and `message` and renders appropriate icon and background color.',
        hint: 'Use template literal classes: `className={\`alert alert-\${type}\`}`.'
      },
      miniProjectIdea: {
        title: 'Interactive Component Library Showcase',
        description: 'Build a component catalog displaying custom Buttons, Badges, Cards, and Avatars with live interactive prop toggles.'
      }
    },
    summary: {
      keyPoints: [
        'React components are declarative, reusable functions that return JSX.',
        'JSX blends HTML markup with full JavaScript power through `{}` expressions.',
        'The Virtual DOM diffs changes efficiently to update the browser DOM with minimal reflows.'
      ],
      skillsAcquired: [
        'Proficiency in authoring React functional components and JSX.',
        'Mastery of component composition and the `children` prop.',
        'Understanding of Virtual DOM reconciliation and list `key` mechanics.'
      ]
    },
    exercise: {
      question: 'Which attribute must be used in JSX to assign CSS classes to an element?',
      options: ['className', 'class', 'styleClass', 'cssName'],
      answer: 'className'
    },
    exam: {
      question: 'Why does React require a unique `key` prop when rendering lists of elements via `.map()`?',
      options: [
        'To uniquely identify which items in the list have changed, been added, or been removed, enabling high-performance Virtual DOM diffing',
        'To sort the array in alphabetical order automatically',
        'To apply CSS styles to each list item',
        'Because JavaScript objects require keys to be iterable'
      ],
      answer: 'To uniquely identify which items in the list have changed, been added, or been removed, enabling high-performance Virtual DOM diffing'
    },
    materialUrl: 'https://react.dev/learn/describing-the-ui'
  },

  'react-2': {
    id: 'react-2',
    title: 'State & Props in React',
    category: 'React',
    diagramType: 'react-state-props',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// React State and Props Mental Model
// Props: Read-only inputs passed from parent down to child
// State: Internal mutable memory managed within the component

function Counter({ initialCount = 0, label = "Score" }) {
  // Simulating React state behavior
  let count = initialCount;
  
  return {
    getUI: () => \`[\${label}] Current Count: \${count}\`,
    increment: () => {
      count++;
      return \`State updated: \${count}\`;
    },
    decrement: () => {
      count--;
      return \`State updated: \${count}\`;
    }
  };
}

const scoreboard = Counter({ initialCount: 10, label: "Points" });
console.log(scoreboard.getUI());
console.log(scoreboard.increment());
console.log(scoreboard.increment());
console.log(scoreboard.getUI());`,
    overview: {
      what: 'Props (short for Properties) and State are the two core mechanisms for managing data flow in React applications. Props are read-only inputs passed from parent components down to child components. State is a component\'s private, internal memory that can change over time and trigger automatic UI re-renders.',
      why: 'Understanding the distinction between immutable Props (unidirectional top-down data flow) and reactive State (local interactivity) is the single most important mental model for architecting scalable React applications.',
      whereUsed: 'Universal across every single React component: form inputs, counter buttons, toggle switches, cart items, modal visibility, and fetched data lists.'
    },
    coreConcepts: [
      {
        title: 'Props: Unidirectional Top-Down Flow (Read-Only)',
        explanation: 'Data in React flows strictly in one direction: from parent components down to child components via props. A child component must never mutate the props it receives.',
        terms: [
          { term: 'Props', definition: 'Immutable configuration passed into a component, similar to function arguments.' },
          { term: 'Unidirectional Data Flow', definition: 'Data flows strictly downwards; parents pass state down as props and callbacks up for events.' },
          { term: 'Prop Drilling', definition: 'Passing props through several intermediate layers of components to reach a deeply nested child.' }
        ],
        relationship: 'Props cannot be changed by the child component; to communicate changes upward, the parent passes a callback function via props.'
      },
      {
        title: 'State: Local Reactive Memory',
        explanation: 'State is data held inside a component that changes over time (e.g. user typing into an input, clicking a toggle). Whenever state changes via its setter function, React automatically re-renders the component and its children.',
        terms: [
          { term: 'State', definition: 'Component memory that triggers UI re-renders upon mutation.' },
          { term: 'Lifting State Up', definition: 'Moving shared state up to the closest common parent component when multiple sibling components need access to the same data.' },
          { term: 'Controlled Component', definition: 'A form input whose value is bound directly to React state (`value={text}` and `onChange={e => setText(e.target.value)}`).' }
        ],
        relationship: 'State lives where it is needed; if siblings need it, lift state up to their parent and pass it down as props.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// Passing Props from Parent to Child
function Parent() {
  const [userName, setUserName] = useState("Alex");
  return <Child name={userName} onUpdate={setUserName} />;
}

// Consuming Props in Child
function Child({ name, onUpdate }) {
  return (
    <div>
      <p>Hello, {name}!</p>
      <button onClick={() => onUpdate("Jordan")}>Change Name</button>
    </div>
  );
}`,
      breakdown: [
        { part: '<Child name={userName} />', meaning: 'Passes state variable down to Child component under prop key "name".' },
        { part: 'onUpdate={setUserName}', meaning: 'Passes updater callback function down so child can request state changes.' }
      ],
      conventions: [
        'Name event callback props with `onEventName` (e.g. `onClick`, `onDelete`, `onStatusChange`).',
        'Always treat state and props as immutable: never do `props.user = "new"` or `state.count = 5`.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Passing and Destructuring Props',
        description: 'Passing data objects down into a reusable card component.',
        code: `function ProductItem({ title, price, discount = 0 }) {
  const finalPrice = price - (price * (discount / 100));
  return (
    <div className="product-item">
      <h3>{title}</h3>
      <p>Price: \${finalPrice.toFixed(2)} {discount > 0 && <span>({discount}% Off)</span>}</p>
    </div>
  );
}`,
        explanation: 'Consumes read-only props with clean parameter destructuring and default values.'
      },
      {
        level: 'Intermediate',
        title: 'Lifting State Up Between Sibling Components',
        description: 'Synchronizing a search input with a filtered list via their common parent.',
        code: `function SearchableList() {
  const [query, setQuery] = useState("");
  const items = ["JavaScript", "React", "Node.js", "CSS", "HTML"];

  const filteredItems = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="search-widget">
      {/* Sibling 1: Input controls search query state */}
      <SearchInput value={query} onChange={setQuery} />
      {/* Sibling 2: Displays filtered results based on parent state */}
      <ItemList items={filteredItems} />
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder="Search..." />;
}

function ItemList({ items }) {
  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
}`,
        explanation: 'State lives in `SearchableList` and is passed down to `SearchInput` and `ItemList` as props.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Controlled Form Component with Live Preview',
        description: 'Real-time synchronization between input fields and live card preview.',
        code: `function ProfileEditor() {
  const [profile, setProfile] = useState({ name: "", title: "", bio: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Immutable state update using object spread!
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="editor-layout">
      <form>
        <input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" />
        <input name="title" value={profile.title} onChange={handleChange} placeholder="Job Title" />
      </form>

      {/* Live Preview Card updates instantaneously */}
      <div className="preview-card">
        <h3>{profile.name || "Your Name"}</h3>
        <p>{profile.title || "Your Title"}</p>
      </div>
    </div>
  );
}`,
        explanation: 'Controlled inputs guarantee React state is the single source of truth for all form values.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Decide Where State Should Live',
        instruction: 'Ask: "Which components need to read or modify this data?" Place state in their lowest common ancestor parent.',
        whyNecessary: 'Prevents duplicate conflicting state across sibling components.',
        codeSnippet: `// In Parent component:\nconst [activeTab, setActiveTab] = useState('home');`
      },
      {
        step: 2,
        title: 'Pass State as Props to Children',
        instruction: 'Pass values down to child components that need to display the data.',
        whyNecessary: 'Enables child components to render dynamic state values.',
        codeSnippet: `<TabBar activeTab={activeTab} onSelect={setActiveTab} />`
      },
      {
        step: 3,
        title: 'Pass Callback Handlers for State Mutations',
        instruction: 'Pass state updater functions as callback props (e.g. `onSelect={setActiveTab}`).',
        whyNecessary: 'Allows children to trigger state changes in the parent cleanly without mutating props.',
        codeSnippet: `function TabBar({ activeTab, onSelect }) {
  const tabs = ['Overview', 'Details', 'Reviews'];
  return (
    <div className="tab-bar">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={activeTab === tab ? 'active' : ''}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Never mutate props directly; props are strictly read-only.',
        'Lift state up to the nearest common ancestor when siblings share data.',
        'Keep state normalized and avoid redundant state that can be computed from existing props or state.'
      ],
      structureRecommendations: [
        'Pass updater callbacks rather than passing massive global state setters everywhere.'
      ],
      performanceConsiderations: [
        'Derive values during render (e.g. `const fullName = firstName + " " + lastName`) instead of storing `fullName` in a separate state variable.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Trying to mutate props inside a child component (`props.title = "New Title"`).',
        howToAvoid: 'Props are read-only. Pass an `onUpdate` callback to request the parent to change state.',
        debuggingTip: 'Check for `TypeError: Cannot assign to read only property`.'
      },
      {
        mistake: 'Storing redundant state that could easily be calculated on the fly.',
        howToAvoid: 'If a value can be computed from existing state/props (like `filteredItems.length`), do not create a separate `const [count, setCount] = useState()`.',
        debuggingTip: 'Check if you have `useEffect` hooks that only sync one state to another.'
      }
    ],
    projectApplications: [
      {
        domain: 'Shopping Cart & Checkout Flows',
        description: 'Managing cart items state in a header layout while passing item counts to badge icons and checkout tables.'
      },
      {
        domain: 'Filter & Search UIs',
        description: 'Synchronizing multi-faceted search filters (price slider, categories, sort order) with product result grids.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Create a parent `CounterApp` component that renders a `Display` child (showing count) and a `ButtonPanel` child (containing Increment/Decrement buttons).',
        'Build a controlled color picker input that updates the background color of a preview box in real time.'
      ],
      codingChallenge: {
        prompt: 'Build a `ToggleSwitch` component with `isOn` boolean prop and `onToggle` callback that flips state when clicked.',
        hint: 'Use `<button onClick={() => onToggle(!isOn)}>`.'
      },
      miniProjectIdea: {
        title: 'Interactive Accordion Deck',
        description: 'Build an accordion list where clicking one panel expands it and automatically closes all other panels by managing `activeId` in parent state.'
      }
    },
    summary: {
      keyPoints: [
        'Props are read-only inputs passed downwards from parent to child.',
        'State is local component memory that triggers re-renders when updated.',
        'Lifting state up allows sibling components to share data through their common parent.'
      ],
      skillsAcquired: [
        'Mastery of unidirectional top-down data flow.',
        'Proficiency in lifting state up and passing callback props.',
        'Ability to build controlled form inputs and live synchronized UIs.'
      ]
    },
    exercise: {
      question: 'What happens when a component\'s local state is updated via its state setter function?',
      options: [
        'React automatically re-renders the component and its child components with the new state data',
        'The browser reloads the entire HTML page',
        'The props are permanently deleted',
        'The JavaScript thread pauses for 5 seconds'
      ],
      answer: 'React automatically re-renders the component and its child components with the new state data'
    },
    exam: {
      question: 'What is the recommended React pattern when two sibling components need to access and modify the same shared state data?',
      options: [
        'Lift the state up to their closest common parent component and pass the state and updater callbacks down as props',
        'Directly mutate the sibling\'s DOM element using document.querySelector',
        'Store the state in a global window variable',
        'Duplicate the state in both components and synchronize them with setTimeout'
      ],
      answer: 'Lift the state up to their closest common parent component and pass the state and updater callbacks down as props'
    },
    materialUrl: 'https://react.dev/learn/state-a-components-memory'
  },

  'react-3': {
    id: 'react-3',
    title: 'React Hooks (useState, useEffect)',
    category: 'React',
    diagramType: 'react-hooks-lifecycle',
    hasPlayground: true,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// React Hooks Lifecycle & Mental Model Simulation
// 1. useState: Persistent state variable across renders
// 2. useEffect: Side effects (API calls, timers, subscriptions) synchronized with state

function simulateReactComponent() {
  console.log("--- Initial Render ---");
  let state = { count: 0, theme: "light" };

  function render() {
    console.log(\`UI Rendered: Count is \${state.count} [Theme: \${state.theme}]\`);
  }

  // Effect runs after render
  function triggerEffect() {
    console.log(\`⚡ Effect Triggered: Syncing document title -> "Count: \${state.count}"\`);
  }

  render();
  triggerEffect();

  console.log("\\n--- User Clicks +1 Button ---");
  state.count += 1;
  render();
  triggerEffect();
}

simulateReactComponent();`,
    overview: {
      what: 'React Hooks are special functions (prefixed with `use`, e.g. `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`) that let functional components tap into React state, lifecycle features, and side-effects without writing legacy ES6 classes.',
      why: 'Hooks revolutionized React by enabling clean state encapsulation, reusable custom logic, eliminated verbose class lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`), and keeping components functional and composable.',
      whereUsed: 'Universal standard across all modern React applications, Next.js apps, React Native mobile apps, and third-party libraries (TanStack Query, React Hook Form).'
    },
    coreConcepts: [
      {
        title: 'The Rules of Hooks',
        explanation: 'React relies on the call order of hooks to maintain state across renders. Therefore, hooks have two fundamental, non-negotiable rules.',
        terms: [
          { term: 'Rule 1: Only Call Hooks at the Top Level', definition: 'Never call hooks inside loops, conditions (`if`), or nested functions.' },
          { term: 'Rule 2: Only Call Hooks from React Functions', definition: 'Call hooks only from React functional components or Custom Hooks (`useMyHook`).' }
        ],
        relationship: 'Following the Rules of Hooks guarantees that React preserves state associations across re-renders.'
      },
      {
        title: '`useState` and `useEffect` Dependency Array',
        explanation: '`useState` declares state variables. `useEffect` performs side effects (fetching data, subscribing to WebSockets, interacting with browser APIs) and accepts a Dependency Array controlling WHEN the effect re-runs.',
        terms: [
          { term: 'No Dependency Array (`useEffect(fn)`)', definition: 'Runs after EVERY single render (rarely desired).' },
          { term: 'Empty Dependency Array (`useEffect(fn, [])`)', definition: 'Runs ONCE on initial mount (equivalent to `componentDidMount`).' },
          { term: 'With Dependencies (`useEffect(fn, [id, query])`)', definition: 'Runs on mount AND whenever any value in the dependency array changes.' },
          { term: 'Cleanup Function (`return () => clearInterval(timer)`)', definition: 'Runs before the effect re-executes and when the component unmounts to prevent memory leaks (for example, by clearing an interval).' }
        ],
        relationship: 'Always list every variable, prop, or state used inside `useEffect` in its dependency array.'
      }
    ],
    syntaxStructure: {
      generalStructure: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  // 1. Declare State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Declare Side Effect
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      });

    // 3. Cleanup function on unmount or userId change
    return () => { isMounted = false; };
  }, [userId]); // Re-runs ONLY when userId changes!

  if (loading) return <p>Loading...</p>;
  return <h1>{user?.name}</h1>;
}`,
      breakdown: [
        { part: 'const [state, setState] = useState(initial)', meaning: 'Array destructuring returning current value and setter function.' },
        { part: 'useEffect(effectFn, [dependencies])', meaning: 'Schedules side effect to run when dependencies change.' },
        { part: 'return () => { cleanup(); }', meaning: 'Cleanup function executed on unmount or prior to re-execution.' }
      ],
      conventions: [
        'Use functional state updates when next state depends on previous state: `setCount(prev => prev + 1)`.',
        'Always clean up timers, intervals, and event listeners in the `useEffect` return callback.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Toggle Switch with `useState`',
        description: 'Managing a simple boolean visibility toggle.',
        code: `function ModalToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? "Close Modal" : "Open Modal"}
      </button>
      {isOpen && <div className="modal-box">Modal Content Active!</div>}
    </div>
  );
}`,
        explanation: '`setIsOpen(prev => !prev)` flips the boolean state cleanly.'
      },
      {
        level: 'Intermediate',
        title: 'Window Resize Listener with `useEffect` Cleanup',
        description: 'Listening to browser window resize events and cleaning up on unmount.',
        code: `function WindowWidthIndicator() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount to prevent memory leaks!
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array = mount/unmount only

  return <p>Current Window Width: {width}px</p>;
}`,
        explanation: 'The return callback cleans up the window event listener when the component unmounts.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Custom Hook: `useDebounce` for Search Inputs',
        description: 'Extracting reusable debounce logic into a custom React hook.',
        code: `// Custom Hook: useDebounce.js
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Cancel timer if value changes before delay!
  }, [value, delay]);

  return debouncedValue;
}

// Consuming Component:
function LiveSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    if (debouncedSearch) {
      console.log("Triggering API search for:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Type to search..." />;
}`,
        explanation: 'Custom hooks allow complex effect/state logic to be reused across dozens of components.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Declare Component State with `useState`',
        instruction: 'Call `const [value, setValue] = useState(initialValue);` at the top level of the component.',
        whyNecessary: 'Initializes the state variable and provides its reactive setter function.',
        codeSnippet: `const [todos, setTodos] = useState([]);`
      },
      {
        step: 2,
        title: 'Synchronize Side Effects with `useEffect`',
        instruction: 'Place API calls, subscriptions, or DOM mutations inside `useEffect(fn, [dependencies])`.',
        whyNecessary: 'Prevents side effects from running continuously on every render.',
        codeSnippet: `useEffect(() => { loadTodos(); }, []);`
      },
      {
        step: 3,
        title: 'Provide Cleanup Handler',
        instruction: 'Return a cleanup function from your effect if you create timers, intervals, or subscriptions.',
        whyNecessary: 'Eliminates memory leaks and ghost event callbacks.',
        codeSnippet: `return () => clearInterval(intervalId);`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always include all referenced variables in the `useEffect` dependency array.',
        'Use functional state updates (`setCount(c => c + 1)`) when next state depends on current state to avoid stale closures.',
        'Extract complex, repeated effect logic into Custom Hooks (`useWindowSize`, `useFetch`).'
      ],
      structureRecommendations: [
        'Keep `useEffect` focused on a single responsibility; use multiple separate `useEffect` calls rather than one monolithic effect.'
      ],
      performanceConsiderations: [
        'Be careful with object or array dependencies in `useEffect`; use primitives or `useMemo` to prevent infinite render loops.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Omitting dependencies from the `useEffect` array, causing stale closures (reading outdated state values).',
        howToAvoid: 'Enable the ESLint plugin `react-hooks/exhaustive-deps`.',
        debuggingTip: 'Check if your effect uses a state variable that isn\'t listed in the `[]` array.'
      },
      {
        mistake: 'Mutating state directly (`todos.push(newTodo); setTodos(todos);`).',
        howToAvoid: 'Always pass a new reference: `setTodos(prev => [...prev, newTodo])`.',
        debuggingTip: 'React will skip re-rendering if the object memory reference is identical.'
      }
    ],
    projectApplications: [
      {
        domain: 'Data Fetching & Server Sync',
        description: 'Loading API datasets on page load and re-fetching whenever filters or page numbers change.'
      },
      {
        domain: 'Real-Time WebSocket Subscriptions',
        description: 'Connecting to live chat channels on mount and disconnecting cleanly on unmount.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Build a digital clock component using `useState` and `useEffect` with `setInterval` that updates every second.',
        'Create an input field that synchronizes its value to `document.title` in real time using `useEffect`.'
      ],
      codingChallenge: {
        prompt: 'Build a custom hook `useLocalStorage(key, initialValue)` that synchronizes state with browser `localStorage`.',
        hint: 'Read initial value from `localStorage.getItem(key)` and update storage inside `useEffect`.'
      },
      miniProjectIdea: {
        title: 'Live Github User Search Explorer',
        description: 'Build an app that fetches Github users via the GitHub Public API as you type, using `useState`, `useEffect`, and debouncing.'
      }
    },
    summary: {
      keyPoints: [
        '`useState` provides reactive component memory; `useEffect` manages side effects.',
        'The Dependency Array controls when `useEffect` executes.',
        'Cleanup functions prevent memory leaks on component unmount.'
      ],
      skillsAcquired: [
        'Proficiency with `useState` and functional state updates.',
        'Mastery of `useEffect` lifecycle synchronization and cleanup.',
        'Ability to author custom reusable React hooks.'
      ]
    },
    exercise: {
      question: 'When does a `useEffect` hook with an empty dependency array `[]` execute its callback function?',
      options: [
        'Exactly once after the initial component mount',
        'After every single state update',
        'Before the component renders',
        'Only when the browser window closes'
      ],
      answer: 'Exactly once after the initial component mount'
    },
    exam: {
      question: 'Why must you return a cleanup function from a `useEffect` that registers a `setInterval` or `addEventListener`?',
      options: [
        'To clear the interval or event listener when the component unmounts, preventing severe memory leaks and zombie background execution',
        'To force React to re-render immediately',
        'To convert the component to TypeScript',
        'It is optional and provides no performance benefit'
      ],
      answer: 'To clear the interval or event listener when the component unmounts, preventing severe memory leaks and zombie background execution'
    },
    materialUrl: 'https://react.dev/reference/react/useState'
  },

  'react-4': {
    id: 'react-4',
    title: 'React Router & SPA Navigation',
    category: 'React',
    diagramType: 'react-router-flow',
    hasPlayground: false,
    codeLanguage: 'javascript',
    codeType: 'js',
    codeSnippet: `// Modern React Router v6 Architecture
import { createBrowserRouter, RouterProvider, Outlet, Link, useParams } from 'react-router-dom';

// 1. Root Layout with Navigation and Outlet
function RootLayout() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/courses">Courses</Link>
      </nav>
      <main>
        <Outlet /> {/* Child routes render here dynamically without page refresh! */}
      </main>
    </div>
  );
}

// 2. Dynamic Route Component with URL Parameters
function CourseDetail() {
  const { courseId } = useParams(); // Extracts :courseId from URL
  return <h2>Studying Course ID: {courseId}</h2>;
}

// 3. Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "courses", element: <p>Course Directory</p> },
      { path: "courses/:courseId", element: <CourseDetail /> }
    ]
  }
]);`,
    overview: {
      what: 'React Router is the standard client-side routing library for React applications. It enables Single Page Applications (SPAs) to update the browser URL, navigate between multiple pages, and render nested views without triggering disruptive full-page browser reloads.',
      why: 'Traditional multi-page websites request a brand new HTML document from the server on every link click, resulting in white flashes and loss of client state. React Router intercepts URL changes in JavaScript, updating only the necessary view components instantly.',
      whereUsed: 'Standard across all enterprise React applications: admin dashboards, multi-page SaaS platforms, user profile portals, and e-commerce stores.'
    },
    coreConcepts: [
      {
        title: 'Client-Side Routing & `<Link>` vs `<a>`',
        explanation: 'Standard `<a href="...">` tags force the browser to request a fresh page from the web server. React Router\'s `<Link to="...">` intercepts click events, updates the browser History API (`history.pushState`), and swaps view components without reloading.',
        terms: [
          { term: '<Link to="...">', definition: 'Client-side navigation link that prevents browser reloads.' },
          { term: '<NavLink>', definition: 'Special `<Link>` that automatically knows if it is active (`isActive`) for styling navbar tabs.' },
          { term: 'History API', definition: 'Browser API allowing JavaScript to manipulate the URL and back/forward navigation history.' }
        ],
        relationship: 'Always use `<Link>` or `<NavLink>` instead of raw `<a>` tags in React applications.'
      },
      {
        title: 'Nested Routes, `<Outlet>`, and Dynamic Parameters (`:id`)',
        explanation: 'React Router supports nested route hierarchies where child views render inside parent layouts via the `<Outlet />` placeholder. Dynamic URL segments (like `/users/:id`) are read via `useParams()`.',
        terms: [
          { term: '<Outlet />', definition: 'Placeholder component in parent layouts where matching child route components render.' },
          { term: 'useParams()', definition: 'Hook returning an object of dynamic URL parameters (e.g. `{ topicId: "react-1" }`).' },
          { term: 'useNavigate()', definition: 'Hook enabling programmatic navigation (e.g. redirecting to dashboard after login).' }
        ],
        relationship: 'Layout routes render persistent navbars and footers; `<Outlet />` swaps the inner content based on the active URL path.'
      }
    ],
    syntaxStructure: {
      generalStructure: `// React Router Route Definitions
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "topics/:topicId", element: <TopicStudyView /> },
      { path: "settings", element: <SettingsView /> }
    ]
  }
]);`,
      breakdown: [
        { part: 'path: "topics/:topicId"', meaning: 'Defines dynamic route segment accessible via useParams().' },
        { part: 'element: <AppLayout />', meaning: 'Master layout wrapper containing persistent navigation and <Outlet />.' }
      ],
      conventions: [
        'Use `createBrowserRouter` and `<RouterProvider>` in React Router v6.4+.',
        'Use `<NavLink className={({ isActive }) => isActive ? "active" : ""}>` for navigation menus.'
      ]
    },
    practicalExamples: [
      {
        level: 'Beginner',
        title: 'Active Navigation Bar with `<NavLink>`',
        description: 'Highlighting the current active route tab automatically.',
        code: `import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-bar">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Home
      </NavLink>
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}`,
        explanation: '`<NavLink>` injects `isActive` boolean for dynamic CSS styling.'
      },
      {
        level: 'Intermediate',
        title: 'Dynamic Route Parameter Extraction with `useParams`',
        description: 'Reading course or topic IDs from the browser URL.',
        code: `import { useParams, useNavigate } from 'react-router-dom';

function TopicLessonView() {
  const { topicId } = useParams(); // Reads /topics/:topicId
  const navigate = useNavigate();

  return (
    <div className="lesson">
      <h1>Active Topic: {topicId}</h1>
      <button onClick={() => navigate("/dashboard")}>
        ← Return to Dashboard Programmatically
      </button>
    </div>
  );
}`,
        explanation: '`useParams` extracts route parameters; `useNavigate` allows programmatic redirects.'
      },
      {
        level: 'Real-World Use Case',
        title: 'Protected Route Wrapper for Authentication',
        description: 'Redirecting unauthenticated users to the `/login` screen automatically.',
        code: `import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    // Redirect to login page and preserve history
    return <Navigate to="/login" replace />;
  }

  // User is authenticated -> Render protected child routes
  return <Outlet />;
}

// Router Configuration:
const routes = [
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute isAuthenticated={userLoggedIn} />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/settings", element: <Settings /> }
    ]
  }
];`,
        explanation: 'Standard industry pattern for guarding private dashboard routes from unauthorized access.'
      }
    ],
    implementationSteps: [
      {
        step: 1,
        title: 'Install React Router DOM',
        instruction: 'Run `npm install react-router-dom` in your terminal.',
        whyNecessary: 'Adds client-side routing packages to your project dependencies.',
        codeSnippet: `npm install react-router-dom`
      },
      {
        step: 2,
        title: 'Define Route Hierarchy',
        instruction: 'Configure routes using `createBrowserRouter` with layout wrappers and `<Outlet />`.',
        whyNecessary: 'Establishes URL paths and associated component trees.',
        codeSnippet: `const router = createBrowserRouter([{ path: '/', element: <Layout /> }]);`
      },
      {
        step: 3,
        title: 'Mount `<RouterProvider>`',
        instruction: 'Pass the configured `router` into `<RouterProvider router={router} />` in `main.jsx`.',
        whyNecessary: 'Connects the React app to the browser URL and history stack.',
        codeSnippet: `<RouterProvider router={router} />`
      }
    ],
    bestPractices: {
      industryStandards: [
        'Always use `<Link>` or `<NavLink>` instead of `<a href="...">` to prevent full-page refreshes.',
        'Provide an `errorElement` on root routes to display a clean 404 Not Found page.',
        'Use protected route layout wrappers to manage authentication guards.'
      ],
      structureRecommendations: [
        'Centralize all route definitions in a `src/routes.jsx` or `src/router.jsx` file.'
      ],
      performanceConsiderations: [
        'Use dynamic `React.lazy()` imports with route definitions to code-split pages into separate on-demand bundles.'
      ]
    },
    commonMistakes: [
      {
        mistake: 'Using standard `<a href="/about">` tags instead of `<Link to="/about">`.',
        howToAvoid: 'Always use `<Link>` from `react-router-dom`.',
        debuggingTip: 'If the browser tab reloads and state resets on link click, you used `<a>` instead of `<Link>`.'
      },
      {
        mistake: 'Forgetting to include `<Outlet />` in parent layout components, causing child routes to never render.',
        howToAvoid: 'Always include `<Outlet />` where child route content should appear.',
        debuggingTip: 'Check if parent layout renders but the inner page area remains blank.'
      }
    ],
    projectApplications: [
      {
        domain: 'Multi-Page Web Applications (SPAs)',
        description: 'Architecting e-commerce stores with product catalogs, shopping carts, and checkout routes.'
      },
      {
        domain: 'Admin Management Portals',
        description: 'Building multi-tab dashboards with deep links to specific user profiles and analytics reports.'
      }
    ],
    handsOnExercises: {
      practiceTasks: [
        'Configure a 3-page React app (Home, About, Contact) using `createBrowserRouter` and `<Link>`.',
        'Create a dynamic route `/user/:username` that reads and displays the username using `useParams()`.'
      ],
      codingChallenge: {
        prompt: 'Build a login form that uses `useNavigate()` to redirect to `/dashboard` immediately after successful authentication.',
        hint: 'Call `const navigate = useNavigate();` and `navigate("/dashboard")` on submit.'
      },
      miniProjectIdea: {
        title: 'Full-Stack Course Portal Router',
        description: 'Build a complete multi-route learning portal with home landing, course directory, dynamic lesson view (`/courses/:id/lessons/:lessonId`), and 404 fallback.'
      }
    },
    summary: {
      keyPoints: [
        'React Router enables seamless client-side SPA navigation without page reloads.',
        '`<Link>` updates URLs via the History API; `<Outlet />` renders matching child views.',
        '`useParams` reads dynamic route parameters; `useNavigate` enables programmatic navigation.'
      ],
      skillsAcquired: [
        'Proficiency with React Router v6 route configuration.',
        'Mastery of nested layouts, outlets, and dynamic URL params.',
        'Ability to implement protected authentication route guards.'
      ]
    },
    exercise: {
      question: 'Which React Router component acts as the placeholder in a parent layout where child route views are rendered?',
      options: ['<Outlet />', '<RouterView />', '<ChildContainer />', '<Slot />'],
      answer: '<Outlet />'
    },
    exam: {
      question: 'Why must developers use `<Link to="...">` instead of standard HTML `<a href="...">` tags in React applications?',
      options: [
        '`<Link>` intercepts navigation in JavaScript, updating the browser URL and swapping view components without triggering a disruptive full-page browser refresh or resetting React state',
        '`<Link>` runs on the GPU',
        '`<a>` tags are deprecated in HTML5',
        '`<Link>` automatically downloads the backend database'
      ],
      answer: '`<Link>` intercepts navigation in JavaScript, updating the browser URL and swapping view components without triggering a disruptive full-page browser refresh or resetting React state'
    },
    materialUrl: 'https://reactrouter.com/en/main'
  }
};
