/**
 * TopicDiagram — renders an interactive SVG visual concept diagram
 * based on the topic's diagramType.
 *
 * Supported diagram types:
 *   box-model        — CSS Box Model visualization
 *   dom-tree         — DOM Tree hierarchy
 *   api-flow         — Client → API → Database request/response flow
 *   component-tree   — React component hierarchy
 *   git-flow         — Git branching workflow
 *   event-loop       — JS Event Loop architecture
 *   html-structure   — HTML document structure
 *   generic-roadmap  — Default learning roadmap flow
 */

export function TopicDiagram({ diagramType, title }) {
  const diagrams = {
    'box-model': BoxModelDiagram,
    'dom-tree': DomTreeDiagram,
    'api-flow': ApiFlowDiagram,
    'component-tree': ComponentTreeDiagram,
    'git-flow': GitFlowDiagram,
    'event-loop': EventLoopDiagram,
    'html-structure': HtmlStructureDiagram,
    'generic-roadmap': GenericRoadmapDiagram,
  };

  const DiagramComponent = diagrams[diagramType] || GenericRoadmapDiagram;

  return (
    <div className="topic-diagram-container">
      <DiagramComponent title={title} />
    </div>
  );
}

/* ====================================================================
   DIAGRAM COMPONENTS
   ==================================================================== */

function BoxModelDiagram() {
  return (
    <svg viewBox="0 0 440 320" className="topic-diagram-svg" role="img" aria-label="CSS Box Model diagram">
      {/* Margin */}
      <rect x="10" y="10" width="420" height="300" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="220" y="28" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="600">MARGIN</text>

      {/* Border */}
      <rect x="40" y="40" width="360" height="240" rx="6" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
      <text x="220" y="58" textAnchor="middle" fontSize="11" fill="#991b1b" fontWeight="600">BORDER</text>

      {/* Padding */}
      <rect x="70" y="70" width="300" height="180" rx="4" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
      <text x="220" y="88" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="600">PADDING</text>

      {/* Content */}
      <rect x="100" y="100" width="240" height="120" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="220" y="150" textAnchor="middle" fontSize="14" fill="#1e3a5f" fontWeight="700">CONTENT</text>
      <text x="220" y="170" textAnchor="middle" fontSize="10" fill="#64748b">width × height</text>

      {/* Dimension arrows */}
      <line x1="45" y1="295" x2="395" y2="295" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold)" />
      <text x="220" y="310" textAnchor="middle" fontSize="9" fill="#92400e">Total Width = margin + border + padding + content</text>

      <defs>
        <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

function DomTreeDiagram() {
  return (
    <svg viewBox="0 0 440 300" className="topic-diagram-svg" role="img" aria-label="DOM Tree diagram">
      {/* document node */}
      <rect x="170" y="10" width="100" height="36" rx="18" fill="#6366f1" />
      <text x="220" y="33" textAnchor="middle" fontSize="12" fill="white" fontWeight="700">document</text>

      {/* html */}
      <line x1="220" y1="46" x2="220" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="170" y="70" width="100" height="32" rx="6" fill="#818cf8" />
      <text x="220" y="91" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">&lt;html&gt;</text>

      {/* head & body branches */}
      <line x1="220" y1="102" x2="120" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="220" y1="102" x2="320" y2="140" stroke="#94a3b8" strokeWidth="1.5" />

      <rect x="70" y="140" width="100" height="30" rx="6" fill="#a5b4fc" />
      <text x="120" y="160" textAnchor="middle" fontSize="11" fill="#312e81" fontWeight="600">&lt;head&gt;</text>

      <rect x="270" y="140" width="100" height="30" rx="6" fill="#a5b4fc" />
      <text x="320" y="160" textAnchor="middle" fontSize="11" fill="#312e81" fontWeight="600">&lt;body&gt;</text>

      {/* head children */}
      <line x1="120" y1="170" x2="70" y2="205" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="120" y1="170" x2="170" y2="205" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="30" y="205" width="80" height="26" rx="4" fill="#e0e7ff" />
      <text x="70" y="223" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;title&gt;</text>
      <rect x="130" y="205" width="80" height="26" rx="4" fill="#e0e7ff" />
      <text x="170" y="223" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;meta&gt;</text>

      {/* body children */}
      <line x1="320" y1="170" x2="260" y2="205" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="320" y1="170" x2="320" y2="205" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="320" y1="170" x2="380" y2="205" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="220" y="205" width="80" height="26" rx="4" fill="#e0e7ff" />
      <text x="260" y="223" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;h1&gt;</text>
      <rect x="280" y="205" width="80" height="26" rx="4" fill="#e0e7ff" />
      <text x="320" y="223" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;div&gt;</text>
      <rect x="340" y="205" width="80" height="26" rx="4" fill="#e0e7ff" />
      <text x="380" y="223" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;p&gt;</text>

      {/* div children */}
      <line x1="320" y1="231" x2="300" y2="260" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="320" y1="231" x2="345" y2="260" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="270" y="260" width="60" height="22" rx="3" fill="#f1f5f9" stroke="#c7d2fe" strokeWidth="1" />
      <text x="300" y="275" textAnchor="middle" fontSize="8" fill="#6366f1">&lt;span&gt;</text>
      <rect x="315" y="260" width="60" height="22" rx="3" fill="#f1f5f9" stroke="#c7d2fe" strokeWidth="1" />
      <text x="345" y="275" textAnchor="middle" fontSize="8" fill="#6366f1">&lt;a&gt;</text>
    </svg>
  );
}

function ApiFlowDiagram() {
  return (
    <svg viewBox="0 0 520 200" className="topic-diagram-svg" role="img" aria-label="API request/response flow">
      {/* Client */}
      <rect x="10" y="60" width="110" height="70" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="65" y="88" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="700">Client</text>
      <text x="65" y="105" textAnchor="middle" fontSize="9" fill="#64748b">Browser / App</text>

      {/* Arrow right — request */}
      <line x1="120" y1="82" x2="195" y2="82" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowIndigo)" />
      <text x="158" y="74" textAnchor="middle" fontSize="8" fill="#6366f1" fontWeight="600">HTTP Request</text>

      {/* API Server */}
      <rect x="195" y="50" width="130" height="90" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
      <text x="260" y="82" textAnchor="middle" fontSize="11" fill="#5b21b6" fontWeight="700">API Server</text>
      <text x="260" y="100" textAnchor="middle" fontSize="9" fill="#64748b">Express / Node.js</text>
      <text x="260" y="115" textAnchor="middle" fontSize="8" fill="#a78bfa">Routes → Controllers</text>

      {/* Arrow right — query */}
      <line x1="325" y1="82" x2="395" y2="82" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />
      <text x="360" y="74" textAnchor="middle" fontSize="8" fill="#7c3aed" fontWeight="600">SQL / Query</text>

      {/* Database */}
      <ellipse cx="450" cy="95" rx="55" ry="35" fill="#fef9c3" stroke="#eab308" strokeWidth="2" />
      <text x="450" y="92" textAnchor="middle" fontSize="11" fill="#854d0e" fontWeight="700">Database</text>
      <text x="450" y="108" textAnchor="middle" fontSize="8" fill="#a16207">PostgreSQL</text>

      {/* Arrow left — response */}
      <line x1="395" y1="112" x2="325" y2="112" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowPurple)" />
      <text x="360" y="128" textAnchor="middle" fontSize="8" fill="#7c3aed">Result Set</text>

      <line x1="195" y1="112" x2="120" y2="112" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowIndigo)" />
      <text x="158" y="128" textAnchor="middle" fontSize="8" fill="#6366f1">JSON Response</text>

      <defs>
        <marker id="arrowIndigo" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#6366f1" />
        </marker>
        <marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#8b5cf6" />
        </marker>
      </defs>
    </svg>
  );
}

function ComponentTreeDiagram() {
  return (
    <svg viewBox="0 0 440 280" className="topic-diagram-svg" role="img" aria-label="React component tree">
      {/* App root */}
      <rect x="170" y="10" width="100" height="36" rx="8" fill="#6366f1" />
      <text x="220" y="33" textAnchor="middle" fontSize="12" fill="white" fontWeight="700">&lt;App /&gt;</text>

      {/* lines */}
      <line x1="220" y1="46" x2="110" y2="80" stroke="#a5b4fc" strokeWidth="1.5" />
      <line x1="220" y1="46" x2="330" y2="80" stroke="#a5b4fc" strokeWidth="1.5" />

      {/* Header & Main */}
      <rect x="55" y="80" width="110" height="32" rx="6" fill="#818cf8" />
      <text x="110" y="101" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">&lt;Header /&gt;</text>

      <rect x="275" y="80" width="110" height="32" rx="6" fill="#818cf8" />
      <text x="330" y="101" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">&lt;Main /&gt;</text>

      {/* Header children */}
      <line x1="110" y1="112" x2="60" y2="148" stroke="#c7d2fe" strokeWidth="1" />
      <line x1="110" y1="112" x2="160" y2="148" stroke="#c7d2fe" strokeWidth="1" />
      <rect x="15" y="148" width="90" height="28" rx="4" fill="#e0e7ff" />
      <text x="60" y="167" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;Logo /&gt;</text>
      <rect x="115" y="148" width="90" height="28" rx="4" fill="#e0e7ff" />
      <text x="160" y="167" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;Nav /&gt;</text>

      {/* Main children */}
      <line x1="330" y1="112" x2="270" y2="148" stroke="#c7d2fe" strokeWidth="1" />
      <line x1="330" y1="112" x2="390" y2="148" stroke="#c7d2fe" strokeWidth="1" />
      <rect x="225" y="148" width="90" height="28" rx="4" fill="#e0e7ff" />
      <text x="270" y="167" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;Sidebar /&gt;</text>
      <rect x="345" y="148" width="90" height="28" rx="4" fill="#e0e7ff" />
      <text x="390" y="167" textAnchor="middle" fontSize="9" fill="#4338ca">&lt;Content /&gt;</text>

      {/* Content children */}
      <line x1="390" y1="176" x2="350" y2="210" stroke="#e0e7ff" strokeWidth="1" />
      <line x1="390" y1="176" x2="420" y2="210" stroke="#e0e7ff" strokeWidth="1" />
      <rect x="310" y="210" width="80" height="24" rx="3" fill="#f1f5f9" stroke="#c7d2fe" strokeWidth="1" />
      <text x="350" y="226" textAnchor="middle" fontSize="8" fill="#6366f1">&lt;Card /&gt;</text>
      <rect x="385" y="210" width="55" height="24" rx="3" fill="#f1f5f9" stroke="#c7d2fe" strokeWidth="1" />
      <text x="412" y="226" textAnchor="middle" fontSize="8" fill="#6366f1">&lt;Card /&gt;</text>

      {/* Props/State label */}
      <text x="220" y="268" textAnchor="middle" fontSize="9" fill="#94a3b8">Props flow ↓ downward · State lifts ↑ upward via callbacks</text>
    </svg>
  );
}

function GitFlowDiagram() {
  const y = { main: 50, feature: 120, hotfix: 170 };

  return (
    <svg viewBox="0 0 520 220" className="topic-diagram-svg" role="img" aria-label="Git branching workflow">
      {/* Main branch */}
      <line x1="40" y1={y.main} x2="480" y2={y.main} stroke="#22c55e" strokeWidth="3" />
      <text x="15" y={y.main + 5} fontSize="10" fill="#166534" fontWeight="700">main</text>

      {/* Commits on main */}
      {[80, 180, 340, 460].map((cx, i) => (
        <g key={`m${i}`}>
          <circle cx={cx} cy={y.main} r="8" fill="#22c55e" stroke="white" strokeWidth="2" />
          <text x={cx} y={y.main - 14} textAnchor="middle" fontSize="7" fill="#166534">C{i + 1}</text>
        </g>
      ))}

      {/* Feature branch */}
      <line x1="180" y1={y.main} x2="200" y2={y.feature} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="200" y1={y.feature} x2="380" y2={y.feature} stroke="#6366f1" strokeWidth="2.5" />
      <line x1="380" y1={y.feature} x2="340" y2={y.main} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="155" y={y.feature + 5} fontSize="9" fill="#4338ca" fontWeight="600">feature</text>

      {[240, 310, 380].map((cx, i) => (
        <g key={`f${i}`}>
          <circle cx={cx} cy={y.feature} r="6" fill="#6366f1" stroke="white" strokeWidth="1.5" />
          <text x={cx} y={y.feature + 18} textAnchor="middle" fontSize="7" fill="#6366f1">F{i + 1}</text>
        </g>
      ))}

      {/* Merge label */}
      <text x="360" y={y.main - 18} textAnchor="middle" fontSize="8" fill="#059669" fontWeight="600">merge</text>

      {/* Legend */}
      <rect x="30" y="190" width="460" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="60" cy="202" r="5" fill="#22c55e" />
      <text x="72" y="206" fontSize="8" fill="#64748b">main commits</text>
      <circle cx="160" cy="202" r="5" fill="#6366f1" />
      <text x="172" y="206" fontSize="8" fill="#64748b">feature commits</text>
      <text x="280" y="206" fontSize="8" fill="#94a3b8">branch → commit → merge → push</text>
    </svg>
  );
}

function EventLoopDiagram() {
  return (
    <svg viewBox="0 0 460 260" className="topic-diagram-svg" role="img" aria-label="JavaScript Event Loop">
      {/* Call Stack */}
      <rect x="20" y="20" width="120" height="140" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="80" y="42" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="700">Call Stack</text>
      {['main()', 'fetchData()', 'render()'].map((fn, i) => (
        <g key={fn}>
          <rect x="30" y={55 + i * 32} width="100" height="24" rx="3" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
          <text x="80" y={71 + i * 32} textAnchor="middle" fontSize="9" fill="#2563eb">{fn}</text>
        </g>
      ))}

      {/* Web APIs */}
      <rect x="170" y="20" width="130" height="90" rx="6" fill="#fef9c3" stroke="#eab308" strokeWidth="2" />
      <text x="235" y="42" textAnchor="middle" fontSize="11" fill="#854d0e" fontWeight="700">Web APIs</text>
      <text x="235" y="62" textAnchor="middle" fontSize="9" fill="#a16207">setTimeout</text>
      <text x="235" y="78" textAnchor="middle" fontSize="9" fill="#a16207">fetch / XHR</text>
      <text x="235" y="94" textAnchor="middle" fontSize="9" fill="#a16207">DOM Events</text>

      {/* Callback Queue */}
      <rect x="170" y="130" width="130" height="50" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
      <text x="235" y="152" textAnchor="middle" fontSize="10" fill="#9d174d" fontWeight="700">Callback Queue</text>
      <text x="235" y="168" textAnchor="middle" fontSize="8" fill="#be185d">FIFO → waiting callbacks</text>

      {/* Event Loop circle */}
      <circle cx="370" cy="115" r="45" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
      <text x="370" y="110" textAnchor="middle" fontSize="10" fill="#6d28d9" fontWeight="700">Event</text>
      <text x="370" y="125" textAnchor="middle" fontSize="10" fill="#6d28d9" fontWeight="700">Loop</text>

      {/* Arrows */}
      <line x1="140" y1="60" x2="170" y2="60" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      <line x1="235" y1="110" x2="235" y2="130" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      <line x1="300" y1="155" x2="325" y2="135" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      <path d="M370 160 Q370 200 80 200 Q30 200 30 170" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowViolet)" />

      <text x="200" y="215" textAnchor="middle" fontSize="8" fill="#7c3aed">pushes callback to call stack when stack is empty</text>

      <defs>
        <marker id="arrowGray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
        <marker id="arrowViolet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8b5cf6" />
        </marker>
      </defs>
    </svg>
  );
}

function HtmlStructureDiagram() {
  return (
    <svg viewBox="0 0 400 260" className="topic-diagram-svg" role="img" aria-label="HTML document structure">
      {/* DOCTYPE */}
      <rect x="50" y="10" width="300" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="27" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="600">&lt;!DOCTYPE html&gt;</text>

      {/* html */}
      <rect x="50" y="42" width="300" height="210" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="70" y="58" fontSize="10" fill="#166534" fontWeight="700">&lt;html&gt;</text>

      {/* head */}
      <rect x="70" y="66" width="260" height="60" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
      <text x="86" y="82" fontSize="10" fill="#1e40af" fontWeight="600">&lt;head&gt;</text>
      <text x="100" y="100" fontSize="9" fill="#64748b">&lt;meta charset="UTF-8"&gt;</text>
      <text x="100" y="115" fontSize="9" fill="#64748b">&lt;title&gt;My Page&lt;/title&gt;</text>

      {/* body */}
      <rect x="70" y="134" width="260" height="108" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <text x="86" y="150" fontSize="10" fill="#5b21b6" fontWeight="600">&lt;body&gt;</text>

      {/* header, main, footer */}
      <rect x="90" y="158" width="100" height="22" rx="3" fill="#e0e7ff" />
      <text x="140" y="173" textAnchor="middle" fontSize="8" fill="#4338ca">&lt;header&gt;</text>

      <rect x="90" y="186" width="220" height="22" rx="3" fill="#fce7f3" />
      <text x="200" y="201" textAnchor="middle" fontSize="8" fill="#9d174d">&lt;main&gt; — Primary Content</text>

      <rect x="90" y="214" width="100" height="22" rx="3" fill="#e0e7ff" />
      <text x="140" y="229" textAnchor="middle" fontSize="8" fill="#4338ca">&lt;footer&gt;</text>
    </svg>
  );
}

function GenericRoadmapDiagram({ title }) {
  const steps = ['Learn Basics', 'Build Projects', 'Master Patterns', 'Ship Code'];

  return (
    <svg viewBox="0 0 500 100" className="topic-diagram-svg" role="img" aria-label={`${title} learning roadmap`}>
      {steps.map((step, i) => {
        const x = 30 + i * 120;
        const colors = ['#dbeafe', '#e0e7ff', '#ede9fe', '#d1fae5'];
        const strokes = ['#3b82f6', '#6366f1', '#8b5cf6', '#10b981'];
        const textColors = ['#1e40af', '#4338ca', '#5b21b6', '#065f46'];

        return (
          <g key={step}>
            <rect x={x} y="20" width="100" height="50" rx="10" fill={colors[i]} stroke={strokes[i]} strokeWidth="2" />
            <text x={x + 50} y="42" textAnchor="middle" fontSize="10" fill={textColors[i]} fontWeight="700">{step}</text>
            <text x={x + 50} y="58" textAnchor="middle" fontSize="8" fill="#94a3b8">Step {i + 1}</text>
            {i < steps.length - 1 && (
              <line x1={x + 100} y1="45" x2={x + 120} y2="45" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowFlow)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowFlow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#cbd5e1" />
        </marker>
      </defs>
    </svg>
  );
}
