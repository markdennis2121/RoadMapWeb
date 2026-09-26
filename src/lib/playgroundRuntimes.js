const LANGUAGE_MATCHERS = {
  c: { matches: (name) => /^C \(/.test(name), preferred: ['GCC 14.1.0', 'GCC 9.2.0'] },
  cpp: { matches: (name) => /^C\+\+ \(/.test(name), preferred: ['GCC 14.1.0', 'GCC 9.2.0'] },
  csharp: { matches: (name) => /^C# \(/.test(name), preferred: ['Mono 6.6.0.161'] },
  java: { matches: (name) => /^Java \(/.test(name), preferred: ['JDK 17.0.6'] },
  javascript: { matches: (name) => /^JavaScript \(/.test(name), preferred: ['Node.js 22.08.0', 'Node.js 20.17.0'] },
  python: { matches: (name) => /^Python \(3\./.test(name), preferred: ['3.13.2', '3.12.5', '3.11.2'] },
  php: { matches: (name) => /^PHP \(/.test(name), preferred: ['8.3.11'] },
  go: { matches: (name) => /^Go \(/.test(name), preferred: ['1.23.5', '1.22.0'] },
  ruby: { matches: (name) => /^Ruby \(/.test(name), preferred: ['2.7.0'] }
};

const API_BASE = (import.meta.env.VITE_JUDGE0_API_URL || 'https://ce.judge0.com').replace(/\/$/, '');
const REQUEST_TIMEOUT_MS = 60000;
let languageListPromise;

export function getRuntimeDefinition(language) {
  return LANGUAGE_MATCHERS[language] || null;
}

function abortAfter(ms) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ms);
  return { controller, clear: () => window.clearTimeout(timeoutId) };
}

async function fetchJson(url, options = {}) {
  const timeout = abortAfter(REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: timeout.controller.signal });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(`Judge0 request failed (${response.status})${detail ? `: ${detail.slice(0, 300)}` : '.'}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Code execution timed out. Please try a shorter program.');
    if (error instanceof TypeError) throw new Error('Could not connect to the code execution service. Please try again.');
    throw error;
  } finally {
    timeout.clear();
  }
}

async function getLanguageId(language) {
  languageListPromise ||= fetchJson(`${API_BASE}/languages/`)
    .catch((error) => { languageListPromise = null; throw error; });
  const languages = await languageListPromise;
  const definition = getRuntimeDefinition(language);
  const matches = languages.filter((item) => definition.matches(item.name));
  const preferred = matches.find((item) => definition.preferred.some((version) => item.name.includes(version)));
  const selected = preferred || matches[0];
  if (!selected) throw new Error('Execution for this language is not currently supported.');
  return selected.id;
}

function normalizeResult(result) {
  const statusId = result.status?.id;
  const stdout = result.stdout || '';
  const stderr = result.stderr || '';
  const compileOutput = result.compile_output || '';
  const statusDescription = result.status?.description || '';

  if (statusId === 6 || compileOutput) {
    return { stdout, stderr, compileError: compileOutput || stderr || statusDescription, runtimeError: '' };
  }
  if (statusId && statusId !== 3) {
    return {
      stdout,
      stderr: '',
      compileError: '',
      runtimeError: stderr || result.message || statusDescription || 'The program could not be executed.'
    };
  }
  return { stdout, stderr, compileError: '', runtimeError: '' };
}

export async function executeRemoteCode(language, source) {
  const runtime = getRuntimeDefinition(language);
  if (!runtime) throw new Error('Execution for this language is not currently supported.');

  const languageId = await getLanguageId(language);
  const result = await fetchJson(`${API_BASE}/submissions/?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language_id: languageId,
      source_code: source,
      cpu_time_limit: 5,
      cpu_extra_time: 1,
      wall_time_limit: 10,
      memory_limit: 128000,
      stack_limit: 64000,
      max_processes_and_or_threads: 30,
      enable_per_process_and_thread_time_limit: false,
      enable_per_process_and_thread_memory_limit: false
    })
  });
  return normalizeResult(result);
}
