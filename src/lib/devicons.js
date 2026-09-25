const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const makeIcon = (directory, label, color, background) => ({
  label,
  iconUrl: `${DEVICON_CDN}/${directory}/${directory}-original.svg`,
  color,
  bgColor: background
});

export const DEVICON_META = {
  html: makeIcon('html5', 'HTML5', '#e34f26', 'rgba(227, 79, 38, 0.08)'),
  css: makeIcon('css3', 'CSS3', '#1572b6', 'rgba(21, 114, 182, 0.08)'),
  js: makeIcon('javascript', 'JavaScript', '#b59b00', 'rgba(247, 223, 30, 0.14)'),
  javascript: makeIcon('javascript', 'JavaScript', '#b59b00', 'rgba(247, 223, 30, 0.14)'),
  react: makeIcon('react', 'React', '#149eca', 'rgba(97, 218, 251, 0.12)'),
  node: makeIcon('nodejs', 'Node.js', '#539e43', 'rgba(83, 158, 67, 0.08)'),
  git: makeIcon('git', 'Git', '#f05032', 'rgba(240, 80, 50, 0.08)'),
  csharp: makeIcon('csharp', 'C#', '#68217a', 'rgba(104, 33, 122, 0.10)'),
  java: makeIcon('java', 'Java', '#e76f00', 'rgba(231, 111, 0, 0.10)'),
  go: makeIcon('go', 'Go', '#00add8', 'rgba(0, 173, 216, 0.10)'),
  ruby: makeIcon('ruby', 'Ruby', '#cc342d', 'rgba(204, 52, 45, 0.08)'),
  python: makeIcon('python', 'Python', '#3776ab', 'rgba(55, 118, 171, 0.10)'),
  php: makeIcon('php', 'PHP', '#777bb4', 'rgba(119, 123, 180, 0.10)'),
  cpp: makeIcon('cplusplus', 'C++', '#00599c', 'rgba(0, 89, 156, 0.10)'),
  c: makeIcon('c', 'C', '#5c6bc0', 'rgba(92, 107, 192, 0.10)'),
  github: makeIcon('github', 'GitHub', '#24292f', 'rgba(36, 41, 47, 0.08)'),
  projects: makeIcon('vscode', 'Practical Projects', '#8b5cf6', 'rgba(139, 92, 246, 0.08)'),
  default: makeIcon('javascript', 'Curriculum', '#4f46e5', 'rgba(79, 70, 229, 0.08)')
};

const CATEGORY_ICON = {
  'version-control': 'git',
  'web-development-path': 'html',
  'software-development-path': 'csharp',
  'backend-path': 'node',
  'data-science-path': 'python'
};

const TOPIC_ICON_PREFIXES = new Set([
  'html', 'css', 'javascript', 'js', 'react', 'node', 'csharp', 'java', 'go',
  'ruby', 'python', 'php', 'cpp', 'c', 'github'
]);

export function getCategoryDeviconMeta(categoryId) {
  const id = (categoryId || '').toLowerCase();
  const iconKey = CATEGORY_ICON[id] || (DEVICON_META[id] ? id : null);
  return DEVICON_META[iconKey] || DEVICON_META.default;
}

export function getTopicDeviconMeta(topicId) {
  const id = (topicId || '').toLowerCase();
  if (!id.endsWith('-path')) return null;
  const [prefix, ...rest] = id.split('-');
  if (!rest.length || !TOPIC_ICON_PREFIXES.has(prefix)) return null;
  return DEVICON_META[prefix] || null;
}
