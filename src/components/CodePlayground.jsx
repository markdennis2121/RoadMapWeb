import { useState, useEffect, useRef, useMemo } from 'react';
import { createHighlighter } from 'shiki';

let globalHighlighter = null;
const getShiki = async () => {
  if (!globalHighlighter) {
    globalHighlighter = await createHighlighter({
      themes: ['dark-plus'],
      langs: ['javascript', 'html', 'css', 'json', 'bash']
    });
  }
  return globalHighlighter;
};

export function StaticCodeBlock({ code, language = 'javascript' }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let isMounted = true;
    getShiki().then((highlighter) => {
      if (isMounted) {
        try {
          const result = highlighter.codeToHtml(code, { lang: language, theme: 'dark-plus' });
          setHtml(result);
        } catch (e) {
          setHtml(`<pre className="example-pre"><code>${code}</code></pre>`);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [code, language]);

  return (
    <div className="shiki-static-container">
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="example-pre"><code>{code}</code></pre>
      )}
    </div>
  );
}

export function CodePlayground({
  initialCode = '',
  language = 'javascript',
  type = 'js',
  title = 'Code Playground'
}) {
  const [code, setCode] = useState(
    initialCode ||
      (type === 'html'
        ? '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 24px; color: #0f172a; }\n    h1 { color: #4f46e5; font-size: 28px; }\n    p { font-size: 18px; line-height: 1.6; }\n  </style>\n</head>\n<body>\n  <h1>Welcome to HTML5!</h1>\n  <p>Edit this code live and watch your webpage update.</p>\n</body>\n</html>'
        : '// Interactive JavaScript Playground\nfunction greetUser(name) {\n  const message = "Hello, " + name + "! Welcome to coding.";\n  console.log(message);\n  return message;\n}\n\ngreetUser("Learner");')
  );

  const [highlightedCode, setHighlightedCode] = useState('');
  const [activeOutputTab, setActiveOutputTab] = useState('result'); // 'result' | 'solution'
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [iframeKey, setIframeKey] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const editorRef = useRef(null);
  const highlightRef = useRef(null);
  const gutterRef = useRef(null);

  const currentLang = useMemo(() => {
    if (type === 'html' || language === 'html') return 'html';
    if (type === 'css' || language === 'css') return 'css';
    return 'javascript';
  }, [type, language]);

  // Load Shiki Syntax Highlighting (VS Code Dark+ Theme)
  useEffect(() => {
    let isMounted = true;
    getShiki().then((highlighter) => {
      if (isMounted) {
        try {
          const result = highlighter.codeToHtml(code, {
            lang: currentLang,
            theme: 'dark-plus'
          });
          setHighlightedCode(result);
        } catch (e) {
          setHighlightedCode(`<pre><code>${code}</code></pre>`);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [code, currentLang]);

  const handleCodeChange = (newVal) => {
    setCode(newVal);
  };

  const handleReset = () => {
    setCode(
      initialCode ||
        (type === 'html'
          ? '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 24px; color: #0f172a; }\n    h1 { color: #4f46e5; font-size: 28px; }\n  </style>\n</head>\n<body>\n  <h1>Welcome to HTML5!</h1>\n</body>\n</html>'
          : '// Interactive JavaScript Playground\nfunction greetUser(name) {\n  console.log("Hello, " + name);\n}\n\ngreetUser("Learner");')
    );
    setConsoleLogs([]);
    setIframeKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Execution Engine
  const runCode = () => {
    setIsRunning(true);
    const timestamp = new Date().toLocaleTimeString();

    setTimeout(() => {
      setIsRunning(false);

      if (currentLang === 'html' || type === 'html') {
        setIframeKey((prev) => prev + 1);
        setActiveOutputTab('result');
      } else {
        const logs = [];
        const customConsole = {
          log: (...args) => {
            logs.push({
              time: timestamp,
              type: 'log',
              text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
            });
          },
          info: (...args) => {
            logs.push({
              time: timestamp,
              type: 'info',
              text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
            });
          },
          warn: (...args) => {
            logs.push({
              time: timestamp,
              type: 'warn',
              text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
            });
          },
          error: (...args) => {
            logs.push({
              time: timestamp,
              type: 'error',
              text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
            });
          }
        };

        try {
          const runFn = new Function('console', code);
          runFn(customConsole);
          if (logs.length === 0) {
            logs.push({
              time: timestamp,
              type: 'info',
              text: 'Code executed successfully with zero errors.'
            });
          }
        } catch (err) {
          logs.push({
            time: timestamp,
            type: 'error',
            text: `${err.name}: ${err.message}`
          });
        }

        setConsoleLogs(logs);
        setActiveOutputTab('result');
      }
    }, 200);
  };

  // Run initial execution on load
  useEffect(() => {
    if (initialCode) {
      runCode();
    }
  }, []);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      handleCodeChange(newCode);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Scroll Synchronization
  const handleEditorScroll = (e) => {
    const top = e.target.scrollTop;
    const left = e.target.scrollLeft;

    if (highlightRef.current) {
      highlightRef.current.scrollTop = top;
      highlightRef.current.scrollLeft = left;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = top;
    }
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 8) }, (_, i) => i + 1);

  const solutionSnippet = useMemo(() => {
    if (type === 'html') {
      return `<!DOCTYPE html>\n<html>\n<head>\n  <title>${title}</title>\n</head>\n<body>\n  <h1>${title}</h1>\n  <p>Official Reference Example Solution</p>\n</body>\n</html>`;
    }
    return `// Reference Solution for ${title}\nfunction solve() {\n  console.log("Verified solution output!");\n  return true;\n}\n\nsolve();`;
  }, [title, type]);

  return (
    <div className="pg-shell-wrapper">
      <div className="pg-beginner-card">
        {/* Friendly Action Header */}
        <div className="pg-header-bar">
          <div className="pg-header-left">
            <span className="pg-lang-badge">{currentLang.toUpperCase()}</span>
            <span className="pg-title-label">{title}</span>
          </div>

          <div className="pg-header-actions">
            <button onClick={handleReset} className="pg-btn-subtle" title="Reset code to default template">
              Reset Code
            </button>
            <button onClick={handleCopy} className="pg-btn-subtle" title="Copy code snippet">
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button
              onClick={runCode}
              className={`pg-btn-run ${isRunning ? 'running' : ''}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        {/* Contextual Guidance Banner */}
        <div className="pg-guidance-banner">
          <span>Edit the code below and press <strong>Run Code</strong> to see immediate output.</span>
        </div>

        {/* Code Editor (Primary Focus - 18.5px Font, 1.8 Line Height) */}
        <div className="pg-editor-section">
          <div className="pg-editor-canvas">
            {/* Line Number Gutter */}
            <div className="pg-line-gutter" ref={gutterRef} aria-hidden="true">
              {lineNumbers.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>

            {/* Editor Input Wrapper */}
            <div className="pg-editor-input-wrapper">
              {/* Shiki Syntax Overlay (VS Code Dark+) */}
              <div
                ref={highlightRef}
                className="pg-syntax-overlay shiki-container"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlightedCode || `<pre><code>${code}</code></pre>` }}
              />

              {/* Editable Textarea */}
              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onScroll={handleEditorScroll}
                spellCheck="false"
                className="pg-code-textarea"
                placeholder="// Type or edit code here..."
              />
            </div>
          </div>
        </div>

        {/* Stacked Output Stream (Clean, Approachable Result Area) */}
        <div className="pg-output-section">
          <div className="pg-output-header-tabs">
            <button
              onClick={() => setActiveOutputTab('result')}
              className={`pg-tab-btn ${activeOutputTab === 'result' ? 'active' : ''}`}
            >
              {type === 'html' ? 'Live Web Preview' : 'Execution Output'}
            </button>
            <button
              onClick={() => setActiveOutputTab('solution')}
              className={`pg-tab-btn ${activeOutputTab === 'solution' ? 'active' : ''}`}
            >
              Reference Solution
            </button>
          </div>

          <div className="pg-output-body">
            {activeOutputTab === 'result' ? (
              type === 'html' ? (
                <div className="pg-iframe-box">
                  <iframe
                    key={iframeKey}
                    title="Live Web Preview"
                    srcDoc={code}
                    sandbox="allow-scripts allow-modals"
                    className="pg-beginner-iframe"
                  />
                </div>
              ) : (
                <div className="pg-console-stream">
                  {consoleLogs.length === 0 ? (
                    <div className="pg-console-empty">
                      Click <strong>Run Code</strong> above to view output.
                    </div>
                  ) : (
                    consoleLogs.map((log, i) => (
                      <div key={i} className={`pg-log-row log-${log.type}`}>
                        <span className={`pg-log-badge badge-${log.type}`}>{log.type.toUpperCase()}</span>
                        <pre className="pg-log-text">{log.text}</pre>
                      </div>
                    ))
                  )}
                </div>
              )
            ) : (
              <div className="pg-solution-box">
                <div className="pg-solution-top">
                  <span className="text-sm font-bold text-slate-700">Official Reference Solution</span>
                  <button
                    onClick={() => handleCodeChange(solutionSnippet)}
                    className="pg-btn-subtle"
                  >
                    Copy to Editor
                  </button>
                </div>
                <StaticCodeBlock code={solutionSnippet} language={currentLang} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
