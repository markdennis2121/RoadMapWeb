import { useState, useMemo } from 'react';
import { getCategoryDeviconMeta, getTopicDeviconMeta } from '../lib/devicons.js';

export function TopicTree({
  categories = [],
  learningProgress = {},
  activeTopicId = null,
  onSelectTopic
}) {
  const [treeSearch, setTreeSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Expanded folders state
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Process categories and projects
  const processedCategories = useMemo(() => {
    const query = treeSearch.trim().toLowerCase();

    return categories.map((cat) => {
      const meta = getCategoryDeviconMeta(cat.id);
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

  return (
    <div className="nav-tree-container">
      {/* Header & Search Bar */}
      <div className="nav-tree-toolbar">
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
                        const topicMeta = getTopicDeviconMeta(topic.id);

                        return (
                          <button
                            key={topic.id}
                            onClick={() => onSelectTopic(topic)}
                            className={`sidebar-topic-item ${isActive ? 'active' : ''}`}
                          >
                            {topicMeta && (
                              <img
                                src={topicMeta.iconUrl}
                                alt=""
                                className="sidebar-topic-devicon"
                              />
                            )}
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
        </div>
      </div>
    </div>
  );
}
