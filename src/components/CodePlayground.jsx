import { useEffect, useMemo, useRef, useState } from 'react';
import { createHighlighter } from 'shiki';

let globalHighlighter = null;
const getShiki = async () => {
  if (!globalHighlighter) {
    globalHighlighter = await createHighlighter({
      themes: ['dark-plus'],
      langs: ['javascript', 'html', 'css', 'json', 'bash', 'csharp', 'java', 'go', 'ruby', 'python', 'php', 'cpp', 'c']
    });
  }
  return globalHighlighter;
};

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function formatOutput(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'undefined') return 'undefined';
  try {
    const formatted = JSON.stringify(value, null, 2);
    return typeof formatted === 'string' ? formatted : String(value);
  } catch {
    return String(value);
  }
}

export function StaticCodeBlock({ code, language = 'javascript' }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let isMounted = true;
    getShiki().then((highlighter) => {
      if (!isMounted) return;
      try {
        setHtml(highlighter.codeToHtml(code, { lang: language, theme: 'dark-plus' }));
      } catch {
        setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
      }
    });
    return () => { isMounted = false; };
  }, [code, language]);

  return (
    <div className="shiki-static-container">
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <pre className="example-pre"><code>{code}</code></pre>}
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
    initialCode || (type === 'html'
      ? '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 24px; color: #0f172a; }\n    h1 { color: #4f46e5; font-size: 28px; }\n    p { font-size: 18px; line-height: 1.6; }\n  </style>\n</head>\n<body>\n  <h1>Welcome to HTML5!</h1>\n  <p>Edit this code and run it to see the result.</p>\n</body>\n</html>'
      : '// Write JavaScript, then click Run.\nfunction greetUser(name) {\n  const message = `Hello, ${name}!`;\n  console.log(message);\n}\n\ngreetUser("Learner");')
  );
  const [highlightedCode, setHighlightedCode] = useState('');
  const [output, setOutput] = useState(null);
  const editorRef = useRef(null);
  const highlightRef = useRef(null);

  const currentLang = useMemo(() => {
    if (type === 'html' || language === 'html') return 'html';
    if (type === 'css' || language === 'css') return 'css';
    return 'javascript';
  }, [type, language]);

  useEffect(() => {
    let isMounted = true;
    getShiki().then((highlighter) => {
      if (!isMounted) return;
      try {
        setHighlightedCode(highlighter.codeToHtml(code, { lang: currentLang, theme: 'dark-plus' }));
      } catch {
        setHighlightedCode(`<pre><code>${escapeHtml(code)}</code></pre>`);
      }
    });
    return () => { isMounted = false; };
  }, [code, currentLang]);

  const handleEditorScroll = (event) => {
    if (!highlightRef.current) return;
    highlightRef.current.scrollTop = event.currentTarget.scrollTop;
    highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
  };

  const runCode = () => {
    if (currentLang === 'html') {
      setOutput({
        kind: 'preview',
        value: code
      });
      return;
    }

    if (currentLang === 'css') {
      setOutput({
        kind: 'preview',
        value: `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{font-family:system-ui,sans-serif;padding:24px;color:#0f172a}h1{color:#4f46e5} ${code}</style></head><body><h1>CSS preview</h1><p>Your styles are applied to this page.</p><button>Example button</button></body></html>`
      });
      return;
    }

    const lines = [];
    const capture = (...args) => lines.push(args.map(formatOutput).join(' '));
    const programConsole = {
      log: capture,
      info: capture,
      warn: capture,
      error: capture,
      debug: capture,
      clear: () => {}
    };

    try {
      new Function('console', code)(programConsole);
      setOutput({ kind: 'text', value: lines.join('\n') });
    } catch (error) {
      setOutput({
        kind: 'error',
        value: [...lines, `${error.name}: ${error.message}`].join('\n')
      });
    }
  };

  return (
    <div className="pg-shell-wrapper">
      <section className="pg-beginner-card" aria-label={`${title} playground`}>
        <header className="pg-header-bar">
          <span className="pg-title-label">{title}</span>
          <button type="button" onClick={runCode} className="pg-btn-run">
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Run
          </button>
        </header>

        <div className="pg-editor-section">
          <div className="pg-editor-canvas">
            <div
              ref={highlightRef}
              className="pg-highlight-layer"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: highlightedCode || `<pre><code>${escapeHtml(code)}</code></pre>` }}
            />
            <textarea
              ref={editorRef}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onScroll={handleEditorScroll}
              onKeyDown={(event) => {
                if (event.key === 'Tab') {
                  event.preventDefault();
                  const start = event.currentTarget.selectionStart;
                  const end = event.currentTarget.selectionEnd;
                  const nextCode = `${code.slice(0, start)}  ${code.slice(end)}`;
                  setCode(nextCode);
                  requestAnimationFrame(() => {
                    if (editorRef.current) {
                      editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2;
                    }
                  });
                }
              }}
              spellCheck="false"
              autoCapitalize="off"
              autoCorrect="off"
              wrap="soft"
              aria-label={`${title} code editor`}
              className="pg-code-textarea"
            />
          </div>
        </div>

        <section className="pg-output-section" aria-label="Program output" aria-live="polite">
          <h3 className="pg-output-heading">Output</h3>
          <div className="pg-output-body">
            {!output ? (
              <span className="pg-output-empty">Run your code to see the result.</span>
            ) : output.kind === 'preview' ? (
              <iframe
                title={`${title} output`}
                className="pg-preview-frame"
                srcDoc={output.value}
                sandbox="allow-scripts"
              />
            ) : (
              <pre className={`pg-output-text${output.kind === 'error' ? ' pg-output-error' : ''}`}>
                {output.value}
              </pre>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
