import { useState, useMemo } from 'react';

// Official Devicon Tech Badge Metadata with Brand Colors
const DEVICON_META = {
  html: {
    label: 'HTML5 Fundamentals',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    lessons: '12 Topics',
    color: '#e34f26',
    bgColor: 'rgba(227, 79, 38, 0.08)'
  },
  css: {
    label: 'CSS3 & Layouts',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    lessons: '18 Topics',
    color: '#1572b6',
    bgColor: 'rgba(21, 114, 182, 0.08)'
  },
  js: {
    label: 'JavaScript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    lessons: '32 Topics',
    color: '#f7df1e',
    bgColor: 'rgba(247, 223, 30, 0.12)'
  },
  javascript: {
    label: 'JavaScript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    lessons: '32 Topics',
    color: '#f7df1e',
    bgColor: 'rgba(247, 223, 30, 0.12)'
  },
  git: {
    label: 'Git & GitHub',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    lessons: '10 Topics',
    color: '#f05032',
    bgColor: 'rgba(240, 80, 50, 0.08)'
  },
  node: {
    label: 'Node.js & Backend',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    lessons: '25 Topics',
    color: '#539e43',
    bgColor: 'rgba(83, 158, 67, 0.08)'
  },
  react: {
    label: 'React Framework',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    lessons: '40 Topics',
    color: '#61dafb',
    bgColor: 'rgba(97, 218, 251, 0.12)'
  },
  projects: {
    label: 'Practical Projects',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    lessons: '6 Apps',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.08)'
  },
  default: {
    label: 'Curriculum',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    lessons: 'Topics',
    color: '#4f46e5',
    bgColor: 'rgba(79, 70, 229, 0.08)'
  }
};

function getDeviconMeta(id) {
  const key = (id || '').toLowerCase();
  for (const prefix of Object.keys(DEVICON_META)) {
    if (key.includes(prefix)) return DEVICON_META[prefix];
  }
  return DEVICON_META.default;
}

export function TopicTree({
  categories = [],
  projects = [],
  learningProgress = {},
  activeTopicId = null,
  onSelectTopic
}) {
  const [treeSearch, setTreeSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Expanded folders state
  const [expandedFolders, setExpandedFolders] = useState(() => {
    const initial = {};
    categories.forEach((cat) => {
      initial[cat.id] = true;
    });
    initial['projects'] = true;
    return initial;
  });

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all = { projects: true };
    categories.forEach((cat) => {
      all[cat.id] = true;
    });
    setExpandedFolders(all);
  };

  const collapseAll = () => {
    setExpandedFolders({});
  };

  // Process categories and projects
  const processedCategories = useMemo(() => {
    const query = treeSearch.trim().toLowerCase();

    return categories.map((cat) => {
      const meta = getDeviconMeta(cat.id);
      const filteredTopics = cat.topics.filter((topic) => {
        const matchesQuery =
          !query || topic.title.toLowerCase().includes(query) || cat.name.toLowerCase().includes(query);
        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'completed' && topic.status === 'Completed') ||
          (statusFilter === 'learning' && topic.status === 'Currently Learning') ||
          (statusFilter === 'not-started' && topic.status === 'Not Started');
        return matchesQuery && matchesStatus;
      });

      const totalInCat = cat.topics.length;
      const completedInCat = cat.topics.filter((t) => t.status === 'Completed').length;

      return {
        ...cat,
        meta,
        topics: filteredTopics,
        totalInCat,
        completedInCat
      };
    });
  }, [categories, treeSearch, statusFilter]);

  const filteredProjects = useMemo(() => {
    const query = treeSearch.trim().toLowerCase();
    return projects.filter((proj) => {
      const matchesQuery = !query || proj.title.toLowerCase().includes(query) || 'projects'.includes(query);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && proj.status === 'Completed') ||
        (statusFilter === 'learning' && proj.status === 'Currently Learning') ||
        (statusFilter === 'not-started' && proj.status === 'Not Started');
      return matchesQuery && matchesStatus;
    });
  }, [projects, treeSearch, statusFilter]);

  const totalTopics = categories.reduce((acc, cat) => acc + cat.topics.length, 0);
  const totalCompletedTopics = categories.reduce(
    (acc, cat) => acc + cat.topics.filter((t) => t.status === 'Completed').length,
    0
  );

  return (
    <div className="nav-tree-container">
      {/* Header & Search Bar */}
      <div className="nav-tree-toolbar">
        <div className="nav-tree-title-row">
          <div className="flex items-center gap-2">
            <span className="nav-tree-heading">LEARNING ROADMAP</span>
            <span className="nav-tree-pill-counter">
              {totalCompletedTopics}/{totalTopics} Mastered
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={expandAll} className="tree-icon-btn" title="Expand All">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button onClick={collapseAll} className="tree-icon-btn" title="Collapse All">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="tree-search-bar">
          <svg className="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            value={treeSearch}
            onChange={(e) => setTreeSearch(e.target.value)}
            placeholder="Search topics..."
            className="tree-search-field"
          />
          {treeSearch && (
            <button onClick={() => setTreeSearch('')} className="tree-clear-btn">
              ×
            </button>
          )}
        </div>

        {/* Status Chips */}
        <div className="tree-chip-group">
          <button
            onClick={() => setStatusFilter('all')}
            className={`tree-chip ${statusFilter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('learning')}
            className={`tree-chip ${statusFilter === 'learning' ? 'active' : ''}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`tree-chip ${statusFilter === 'completed' ? 'active' : ''}`}
          >
            Mastered
          </button>
        </div>
      </div>

      {/* Clean Category Group Navigation (No Locks, Free Jump) */}
      <div className="nav-tree-scroll">
        <div className="sidebar-category-list">
          {processedCategories.map((category) => {
            const isExpanded = treeSearch.trim() ? true : !!expandedFolders[category.id];
            const meta = category.meta;
            const percent =
              category.totalInCat > 0
                ? Math.round((category.completedInCat / category.totalInCat) * 100)
                : 0;

            return (
              <div key={category.id} className="sidebar-cat-group">
                {/* Category Header Row with 28px Devicon */}
                <button
                  className="sidebar-cat-header"
                  onClick={() => toggleFolder(category.id)}
                >
                  <div className="sidebar-cat-left">
                    <div className="sidebar-devicon-box" style={{ backgroundColor: meta.bgColor }}>
                      <img
                        src={meta.iconUrl}
                        alt={`${category.name} icon`}
                        className="sidebar-devicon-img"
                      />
                    </div>
                    <div className="sidebar-cat-text">
                      <span className="sidebar-cat-name">{category.name}</span>
                      <span className="sidebar-cat-count" style={{ color: meta.color }}>
                        {category.completedInCat}/{category.totalInCat} completed
                      </span>
                    </div>
                  </div>

                  <svg
                    className={`sidebar-cat-arrow ${isExpanded ? 'open' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Topic Items List (ALWAYS UNLOCKED - Free Navigation) */}
                {isExpanded && (
                  <div className="sidebar-topic-items">
                    {category.topics.length === 0 ? (
                      <div className="sidebar-empty-note">No topics matching filter</div>
                    ) : (
                      category.topics.map((topic) => {
                        const isActive = activeTopicId === topic.id;
                        const isCompleted = topic.status === 'Completed';
                        const isLearning = topic.status === 'Currently Learning';

                        return (
                          <button
                            key={topic.id}
                            onClick={() => onSelectTopic(topic)}
                            className={`sidebar-topic-item ${isActive ? 'active' : ''} ${
                              isCompleted ? 'completed' : isLearning ? 'learning' : ''
                            }`}
                          >
                            <span className="sidebar-topic-indicator">
                              {isCompleted ? (
                                <span className="topic-check-mark">✓</span>
                              ) : isLearning ? (
                                <span className="topic-learning-dot" />
                              ) : (
                                <span className="topic-neutral-dot" />
                              )}
                            </span>
                            <span className="sidebar-topic-label">{topic.title}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Practical Projects Group */}
          {filteredProjects.length > 0 && (
            <div className="sidebar-cat-group">
              <button
                className="sidebar-cat-header"
                onClick={() => toggleFolder('projects')}
              >
                <div className="sidebar-cat-left">
                  <div className="sidebar-devicon-box" style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)' }}>
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
                      alt="Projects Studio"
                      className="sidebar-devicon-img"
                    />
                  </div>
                  <div className="sidebar-cat-text">
                    <span className="sidebar-cat-name">Practical Projects</span>
                    <span className="sidebar-cat-count" style={{ color: '#8b5cf6' }}>
                      {filteredProjects.length} Apps
                    </span>
                  </div>
                </div>

                <svg
                  className={`sidebar-cat-arrow ${expandedFolders['projects'] ? 'open' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {expandedFolders['projects'] && (
                <div className="sidebar-topic-items">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`sidebar-topic-item ${project.status === 'Completed' ? 'completed' : ''}`}
                    >
                      <span className="sidebar-topic-indicator">
                        {project.status === 'Completed' ? (
                          <span className="topic-check-mark">✓</span>
                        ) : (
                          <span className="topic-neutral-dot" />
                        )}
                      </span>
                      <span className="sidebar-topic-label">{project.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
