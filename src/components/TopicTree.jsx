import { useState, useMemo } from 'react';
import { getCategoryDeviconMeta, getTopicDeviconMeta } from '../lib/devicons.js';

const category = (id, name, topics = [], iconId = id) => ({ id, name, topics, iconId });

function buildCatalogGroups(categories) {
  const byId = new Map(categories.map((entry) => [entry.id, entry]));
  const included = new Set();
  const take = (source, predicate) => (source?.topics || []).filter((topic) => {
    if (included.has(topic.id) || !predicate(topic)) return false;
    included.add(topic.id);
    return true;
  });
  const legacyWeb = byId.get('web-development-path');
  const javascript = byId.get('javascript');
  const backend = byId.get('backend-path');

  const webTopics = [
    category('html', 'HTML', take(legacyWeb, (topic) => topic.id.startsWith('html-')), 'html'),
    category('css', 'CSS', take(legacyWeb, (topic) => topic.id.startsWith('css-')), 'css'),
    category('javascript', 'JavaScript', [
      ...(javascript?.topics || []).filter((topic) => {
        if (included.has(topic.id)) return false;
        included.add(topic.id);
        return true;
      }),
      ...take(legacyWeb, (topic) => topic.id === 'javascript-path')
    ], 'javascript')
  ].filter((entry) => entry.topics.length);

  const reactTopics = take(legacyWeb, (topic) => topic.id.startsWith('react-'));
  const nodeTopics = take(legacyWeb, (topic) => topic.id.startsWith('node-'));
  const backendNodeTopics = take(backend, (topic) => topic.id.startsWith('node-'));
  const programmingTopics = ['c', 'cpp', 'csharp', 'java', 'python', 'go', 'php', 'ruby']
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((entry) => category(entry.id, entry.name, take(entry, () => true), entry.id))
    .filter((entry) => entry.topics.length);

  const databaseTopics = take(backend, (topic) => topic.id === 'backend-databases');
  const backendTopics = take(backend, () => true);
  const versionTopics = take(byId.get('version-control'), () => true);
  const softwareTopics = take(byId.get('software-development-path'), () => true);
  const dataScienceTopics = take(byId.get('data-science-path'), () => true);

  const groups = [
    { id: 'web-development', name: 'Web Development', technologies: webTopics },
    { id: 'programming-languages', name: 'Programming Languages', technologies: programmingTopics },
    {
      id: 'backend-development', name: 'Backend Development',
      technologies: [
        ...(nodeTopics.length || backendNodeTopics.length
          ? [category('node', 'Node.js', [...nodeTopics, ...backendNodeTopics], 'node')]
          : []),
        ...(backendTopics.length ? [category('backend-path', 'Backend Path', backendTopics, 'backend-path')] : [])
      ]
    },
    ...(databaseTopics.length
      ? [{ id: 'databases', name: 'Databases', technologies: [category('databases', 'Databases', databaseTopics, 'backend-path')] }]
      : []),
    ...(reactTopics.length
      ? [{ id: 'frameworks', name: 'Frameworks', technologies: [category('react', 'React', reactTopics, 'react')] }]
      : []),
    ...(versionTopics.length
      ? [{ id: 'version-control', name: 'Version Control', technologies: [category('version-control', 'Git & GitHub', versionTopics, 'version-control')] }]
      : []),
    ...(softwareTopics.length
      ? [{ id: 'software-development', name: 'Software Development', technologies: [category('software-development-path', 'Software Development Path', softwareTopics)] }]
      : []),
    ...(dataScienceTopics.length
      ? [{ id: 'data-science', name: 'Data Science', technologies: [category('data-science-path', 'Data Science Path', dataScienceTopics)] }]
      : [])
  ];

  const remaining = categories.flatMap((entry) => take(entry, () => true));
  if (remaining.length) groups.push({
    id: 'other-technologies',
    name: 'Other Technologies',
    technologies: [category('other-technologies', 'Other', remaining)]
  });
  return groups.filter((group) => group.technologies.length);
}

export function TopicTree({ categories = [], activeTopicId = null, onSelectTopic }) {
  const [treeSearch, setTreeSearch] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({});
  const [expandedTechnologies, setExpandedTechnologies] = useState({});
  const catalogGroups = useMemo(() => buildCatalogGroups(categories), [categories]);
  const query = treeSearch.trim().toLowerCase();
  const visibleGroups = catalogGroups.map((group) => ({
    ...group,
    technologies: group.technologies.map((technology) => ({
      ...technology,
      topics: technology.topics.filter((topic) =>
        !query || group.name.toLowerCase().includes(query) || technology.name.toLowerCase().includes(query) || topic.title.toLowerCase().includes(query)
      )
    })).filter((technology) => technology.topics.length)
  })).filter((group) => group.technologies.length && (!query || group.name.toLowerCase().includes(query) || group.technologies.length));

  const toggleGroup = (id) => setExpandedGroups((current) => ({ ...current, [id]: !current[id] }));
  const toggleTechnology = (id) => setExpandedTechnologies((current) => ({ ...current, [id]: !current[id] }));
  const areAllExpanded = catalogGroups.length > 0 && catalogGroups.every((group) =>
    expandedGroups[group.id] && group.technologies.every((technology) => expandedTechnologies[technology.id])
  );
  const toggleAll = () => {
    const next = !areAllExpanded;
    setExpandedGroups(Object.fromEntries(catalogGroups.map((group) => [group.id, next])));
    setExpandedTechnologies(Object.fromEntries(catalogGroups.flatMap((group) =>
      group.technologies.map((technology) => [technology.id, next])
    )));
  };

  return (
    <div className="nav-tree-container">
      <div className="nav-tree-toolbar">
        <div className="tree-search-bar">
          <svg className="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            value={treeSearch}
            onChange={(event) => setTreeSearch(event.target.value)}
            placeholder="Search technologies..."
            className="tree-search-field"
            aria-label="Search technologies and lessons"
          />
          {treeSearch && <button onClick={() => setTreeSearch('')} className="tree-clear-btn" aria-label="Clear search">×</button>}
        </div>
        <div className="sidebar-catalog-heading">
          <span>Categories</span>
          <button type="button" onClick={toggleAll} aria-expanded={areAllExpanded}>
            All Technologies
          </button>
        </div>
      </div>

      <div className="nav-tree-scroll">
        <div className="sidebar-category-list">
          {visibleGroups.map((group) => {
            const isGroupExpanded = query ? true : !!expandedGroups[group.id];
            return (
              <section key={group.id} className="sidebar-cat-group">
                <button
                  type="button"
                  className="sidebar-cat-header"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isGroupExpanded}
                >
                  <span className="sidebar-cat-text"><span className="sidebar-cat-name">{group.name}</span></span>
                  <svg className={`sidebar-cat-arrow ${isGroupExpanded ? 'open' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isGroupExpanded && <div className="sidebar-topic-items sidebar-technology-list">
                  {group.technologies.map((technology) => {
                    const isTechnologyExpanded = query ? true : !!expandedTechnologies[technology.id];
                    const meta = getCategoryDeviconMeta(technology.iconId || technology.id);
                    return (
                      <div className="sidebar-technology" key={technology.id}>
                        <button
                          type="button"
                          className="sidebar-technology-header"
                          onClick={() => toggleTechnology(technology.id)}
                          aria-expanded={isTechnologyExpanded}
                        >
                          <span className="sidebar-cat-left">
                            <span className="sidebar-devicon-box" style={{ backgroundColor: meta.bgColor }}>
                              <img src={meta.iconUrl} alt="" className="sidebar-devicon-img" />
                            </span>
                            <span className="sidebar-cat-name">{technology.name}</span>
                          </span>
                          <svg className={`sidebar-cat-arrow ${isTechnologyExpanded ? 'open' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {isTechnologyExpanded && <div className="sidebar-lesson-list">
                          {technology.topics.map((topic) => {
                            const topicMeta = getTopicDeviconMeta(topic.id);
                            return (
                              <button
                                type="button"
                                key={topic.id}
                                onClick={() => onSelectTopic(topic)}
                                className={`sidebar-topic-item ${activeTopicId === topic.id ? 'active' : ''}`}
                              >
                                {topicMeta && <img src={topicMeta.iconUrl} alt="" className="sidebar-topic-devicon" />}
                                <span className="sidebar-topic-label">{topic.title}</span>
                              </button>
                            );
                          })}
                        </div>}
                      </div>
                    );
                  })}
                </div>}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
