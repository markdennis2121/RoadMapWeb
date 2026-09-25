import { useState, useMemo, useEffect } from 'react';
import { TopicTree } from './TopicTree.jsx';
import { TopicStudyView } from './TopicStudyView.jsx';
import { getLearningContent } from '../../js/learning.js';
import { getCategoryDeviconMeta, getTopicDeviconMeta } from '../lib/devicons.js';

function ProgressRing({ value }) {
  return (
    <div className="progress-ring" style={{ background: `conic-gradient(#6366f1 ${value * 3.6}deg, #e8ebf2 0deg)` }}>
      <div>{value}%</div>
    </div>
  );
}

function StatusSelect({ item, onChange }) {
  const tone = item.status === 'Completed' ? 'status-complete' : item.status === 'Currently Learning' ? 'status-learning' : 'status-idle';
  return (
    <label className={`status-control ${tone}`}>
      <span className="status-dot" aria-hidden="true" />
      <select value={item.status} onChange={(event) => onChange(event.target.value)} aria-label={`Status for ${item.title}`}>
        <option value="Not Started">Not started</option>
        <option value="Currently Learning">In progress</option>
        <option value="Completed">Completed</option>
      </select>
    </label>
  );
}

function Check({ checked, onChange, label }) {
  return (
    <label className="check-control" title={label}>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span aria-hidden="true">{checked ? '✓' : ''}</span>
    </label>
  );
}

export function DashboardShell({
  session,
  data,
  stats,
  learningProgress,
  saveLearningProgress,
  filter,
  search,
  setFilter,
  setSearch,
  filteredCategories,
  filteredProjects,
  update,
  setModal,
  onProfile,
  onSignOut,
  itemType,
  setItemType,
  newTitle,
  setNewTitle,
  categoryId,
  setCategoryId,
  addItem,
  reset,
  modal
}) {
  const [section, setSection] = useState('overview'); // 'overview', 'roadmap', 'projects', 'learning', 'study'
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sidebar Resizing State
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('roadmap_sidebar_width');
    return saved ? parseInt(saved, 10) : 310;
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newWidth = Math.max(240, Math.min(e.clientX, 600)); // Min 240px, Max 600px
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      localStorage.setItem('roadmap_sidebar_width', sidebarWidth);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, sidebarWidth]);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSelectedIndex, setSearchSelectedIndex] = useState(0);

  const metadata = session.user.user_metadata || {};
  const displayName = metadata.full_name || metadata.name || session.user.email?.split('@')[0] || 'Learner';
  const avatar = metadata.avatar_url || metadata.picture;

  // Flatten all topics for sequential navigation
  const allTopics = useMemo(() => {
    return data.categories.flatMap((cat) =>
      cat.topics.map((t) => ({
        ...t,
        categoryName: cat.name,
        categoryId: cat.id
      }))
    );
  }, [data.categories]);

  const activeTopic = useMemo(() => {
    if (!activeTopicId) return null;
    return allTopics.find((t) => t.id === activeTopicId) || null;
  }, [allTopics, activeTopicId]);

  const activeCategory = useMemo(() => {
    if (!activeTopic) return null;
    return data.categories.find((c) => c.id === activeTopic.categoryId) || null;
  }, [data.categories, activeTopic]);

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    
    return allTopics.map(t => {
       const content = getLearningContent(t.id, t.title);
       const textToSearch = JSON.stringify(content).toLowerCase();
       if (textToSearch.includes(query)) {
          return t;
       }
       return null;
    }).filter(Boolean).slice(0, 6);
  }, [searchQuery, allTopics]);

  useEffect(() => {
    setSearchSelectedIndex(0);
  }, [searchQuery]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSearchSelectedIndex(prev => Math.min(prev + 1, Math.max(searchResults.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSearchSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[searchSelectedIndex]) {
        handleSelectTopic(searchResults[searchSelectedIndex]);
        setSearchQuery('');
        setIsSearchFocused(false);
      }
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
    }
  };

  const continueTopic = allTopics.find((topic) => topic.status !== 'Completed') || allTopics[0];

  const topicProgress = (topic) =>
    learningProgress[topic.id]?.exam_complete
      ? 100
      : learningProgress[topic.id]?.exercise_complete
        ? 66
        : learningProgress[topic.id]?.lesson_complete
          ? 33
          : 0;

  // Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = { current: null };

  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleSelectTopic = (topic) => {
    setActiveTopicId(topic.id);
    setSection('study');
    setMobileSidebarOpen(false);
  };

  const handleBackToOverview = () => {
    setActiveTopicId(null);
    setSection('overview');
  };

  const handleAddTopicToCategory = (catId) => {
    setItemType('topic');
    setCategoryId(catId);
    setModal('add');
    setMobileSidebarOpen(false);
  };

  const handleAddProject = () => {
    setItemType('project');
    setModal('add');
    setMobileSidebarOpen(false);
  };

  const TopicCard = ({ category }) => {
    const categoryIcon = getCategoryDeviconMeta(category.id);
    return (
    <article className="category-panel">
      <div className="category-title">
        <div className="category-title-content">
          <img src={categoryIcon.iconUrl} alt="" className="category-devicon" />
          <div>
          <h3>{category.name}</h3>
          <span>{category.topics.length} learning units</span>
          </div>
        </div>
        <span className="category-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="topic-stack">
        {category.topics.map((topic) => {
          const topicIcon = getTopicDeviconMeta(topic.id);
          return (
          <div className="topic-row" key={topic.id}>
            <button
              onClick={() => handleSelectTopic(topic)}
              className="topic-link"
              title={`Study ${topic.title} in main view`}
            >
              <Check
                checked={topic.status === 'Completed'}
                label={`Mark ${topic.title} complete`}
                onChange={(checked) => update(topic.id, checked ? 'Completed' : 'Not Started')}
              />
              {topicIcon && <img src={topicIcon.iconUrl} alt="" className="topic-devicon" />}
              <span>
                <strong>{topic.title}</strong>
                <small>{topicProgress(topic)}% learning path</small>
              </span>
            </button>
            <StatusSelect item={topic} onChange={(status) => update(topic.id, status)} />
          </div>
          );
        })}
      </div>
    </article>
    );
  };

  return (
    <div className="workspace-shell">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar with Topic Tree */}
      <aside 
        className={`workspace-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}
        style={!mobileSidebarOpen ? { width: sidebarWidth, flex: `0 0 ${sidebarWidth}px` } : {}}
      >
        <div className="sidebar-top">
          <div className="brand-lockup">
            <div className="brand-mark">R</div>
            <div>
              <strong>Roadmap</strong>
              <span>Learning workspace</span>
            </div>
          </div>
          {mobileSidebarOpen && (
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="mobile-close-btn"
              aria-label="Close sidebar"
            >
              ×
            </button>
          )}
        </div>

        {/* Tree File Explorer Component */}
        <div className="sidebar-tree-wrapper">
          <TopicTree
            categories={data.categories}
            projects={data.projects}
            learningProgress={learningProgress}
            activeTopicId={activeTopicId}
            onSelectTopic={handleSelectTopic}
            onUpdateStatus={(id, status, completedDate) => update(id, status, completedDate)}
            onAddTopicToCategory={handleAddTopicToCategory}
            onAddProject={handleAddProject}
          />
        </div>

        {/* Bottom Momentum Note & Footer */}
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="eyebrow">Your momentum</span>
            <strong>{stats.progress}% complete</strong>
            <div className="mini-progress">
              <span style={{ width: `${stats.progress}%` }} />
            </div>
            <p>Small steps compound into real skills.</p>
          </div>
          <div className="sidebar-footer">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </aside>

      {/* Resize Handle */}
      {!mobileSidebarOpen && (
        <div
          className={`sidebar-resizer ${isDragging ? 'is-dragging' : ''}`}
          onMouseDown={() => setIsDragging(true)}
          aria-hidden="true"
        />
      )}

      {/* Main Workspace View */}
      <div className="workspace-main">
        <header className="workspace-header">
          {/* Mobile Sidebar Hamburger Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation tree"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="mobile-brand">
            <div className="brand-mark">R</div>
            <strong>Roadmap</strong>
          </div>

          <div className="header-search" style={{ position: 'relative' }}>
            <span aria-hidden="true">⌕</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search lessons, quizzes, examples..."
              aria-label="Search roadmap"
            />
            {isSearchFocused && searchQuery.length >= 2 && (
              <div className="search-dropdown" style={{
                position: 'absolute', top: '100%', left: 0, right: 0,
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: '8px', zIndex: 50,
                maxHeight: '300px', overflowY: 'auto'
              }}>
                {searchResults.length > 0 ? (
                  searchResults.map((t, idx) => (
                    <div
                      key={t.id}
                      onClick={() => { handleSelectTopic(t); setSearchQuery(''); }}
                      onMouseEnter={() => setSearchSelectedIndex(idx)}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        background: idx === searchSelectedIndex ? '#f1f5f9' : '#fff',
                        borderBottom: idx < searchResults.length - 1 ? '1px solid #f1f5f9' : 'none',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <strong style={{ color: '#0f172a', fontSize: '14px' }}>{t.title}</strong>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>{t.categoryName}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '16px', color: '#64748b', fontSize: '14px', textAlign: 'center' }}>
                    No matching lessons or content found.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="header-actions">
            {/* Profile Dropdown */}
            <div className="profile-dropdown-wrapper" ref={el => profileRef.current = el}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="profile-trigger"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <span className="avatar">
                  {avatar ? <img src={avatar} alt="" /> : displayName[0].toUpperCase()}
                </span>
                <span className="profile-name">{displayName}</span>
                <svg
                  className="profile-chevron"
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {profileOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-dropdown-header">
                    <span className="avatar" style={{ width: 36, height: 36, fontSize: 15 }}>
                      {avatar ? <img src={avatar} alt="" /> : displayName[0].toUpperCase()}
                    </span>
                    <div>
                      <strong>{displayName}</strong>
                      <span>{session.user.email}</span>
                    </div>
                  </div>
                  <div className="profile-dropdown-divider" />
                  <button className="profile-dropdown-item" onClick={() => { onProfile(); setProfileOpen(false); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Profile
                  </button>
                  <button className="profile-dropdown-item" onClick={() => setProfileOpen(false)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                    Settings
                  </button>
                  <div className="profile-dropdown-divider" />
                  <button className="profile-dropdown-item danger" onClick={() => { onSignOut(); setProfileOpen(false); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="workspace-content">
          {/* When a topic is active, render TopicStudyView directly in the main dashboard! */}
          {activeTopic ? (
            <TopicStudyView
              topic={activeTopic}
              category={activeCategory}
              progress={learningProgress[activeTopic.id]}
              allTopics={allTopics}
              onSaveProgress={saveLearningProgress}
              onUpdateStatus={(id, status) => update(id, status)}
              onBackToOverview={handleBackToOverview}
              onSelectTopic={handleSelectTopic}
            />
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">{section === 'learning' ? 'Study plan' : 'Personal dashboard'}</p>
                  <h1>
                    {section === 'projects'
                      ? 'Project studio'
                      : section === 'roadmap'
                        ? 'Your roadmap'
                        : section === 'learning'
                          ? 'Learning center'
                          : `Good to see you, ${displayName.split(' ')[0]}`}
                  </h1>
                  <p className="page-subtitle">
                    {section === 'overview'
                      ? 'Select any topic in the sidebar tree or click Continue Learning below.'
                      : 'A focused space for building practical skills at your pace.'}
                  </p>
                </div>
                <div className="header-date">
                  Updated today <span className="live-dot" />
                </div>
              </div>

              {/* Quick Filter Bar */}
              <div className="view-filter-bar">
                <div className="filter-group">
                  <label htmlFor="roadmap-filter" className="filter-label">
                    Filter:
                  </label>
                  <select
                    id="roadmap-filter"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All items</option>
                    <option value="not-started">Not started</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {section === 'overview' && (
                <section className="hero-card">
                  <div>
                    <span className="hero-kicker">NEXT UP</span>
                    <h2>{continueTopic ? continueTopic.title : 'Your roadmap is ready'}</h2>
                    <p>Continue your learning path with a focused lesson, interactive quiz, and mastery exam.</p>
                    {continueTopic && (
                      <button
                        onClick={() => handleSelectTopic(continueTopic)}
                        className="hero-button"
                      >
                        Start Learning Lesson <span>→</span>
                      </button>
                    )}
                  </div>
                  <ProgressRing value={stats.learningProgress} />
                </section>
              )}

              <section className="metric-grid">
                <article className="metric-card">
                  <span className="metric-icon indigo">◎</span>
                  <div>
                    <span className="metric-label">Roadmap items</span>
                    <strong>{stats.total}</strong>
                    <small>{stats.completed} completed</small>
                  </div>
                </article>
                <article className="metric-card">
                  <span className="metric-icon cyan">↗</span>
                  <div>
                    <span className="metric-label">In progress</span>
                    <strong>{stats.learning}</strong>
                    <small>Keep the momentum</small>
                  </div>
                </article>
                <article className="metric-card">
                  <span className="metric-icon emerald">✓</span>
                  <div>
                    <span className="metric-label">Learning progress</span>
                    <strong>{stats.learningProgress}%</strong>
                    <small>Lessons & exams</small>
                  </div>
                </article>
              </section>

              <section className="toolbar">
                <div>
                  <h2>
                    {section === 'projects'
                      ? 'Projects'
                      : section === 'learning'
                        ? 'Lessons to explore'
                        : 'Roadmap topics'}
                  </h2>
                  <p>
                    {section === 'overview'
                      ? 'Select any topic to open its study guide in the dashboard'
                      : 'Choose an item to study'}
                  </p>
                </div>
                <button onClick={() => setModal('add')} className="icon-action" title="Add custom item">
                  +
                </button>
              </section>

              {section !== 'projects' && (
                <section className="category-grid">
                  {filteredCategories.map((category) => (
                    <TopicCard category={category} key={category.id} />
                  ))}
                </section>
              )}

              {(section === 'projects' || section === 'overview') && (
                <>
                  <section className="toolbar projects-heading">
                    <div>
                      <h2>Build projects</h2>
                      <p>Turn concepts into something real.</p>
                    </div>
                  </section>
                  <section className="project-grid">
                    {filteredProjects.map((project) => (
                      <article className="project-card" key={project.id}>
                        <div className="project-card-top">
                          <span className="project-symbol" aria-hidden="true">
                            ↗
                          </span>
                          <StatusSelect
                            item={project}
                            onChange={(status) =>
                              update(
                                project.id,
                                status,
                                status === 'Completed' ? new Date().toISOString().slice(0, 10) : null
                              )
                            }
                          />
                        </div>
                        <h3>{project.title}</h3>
                        <div className="project-card-bottom">
                          <Check
                            checked={project.status === 'Completed'}
                            label={`Mark ${project.title} complete`}
                            onChange={(checked) =>
                              update(
                                project.id,
                                checked ? 'Completed' : 'Not Started',
                                checked ? new Date().toISOString().slice(0, 10) : null
                              )
                            }
                          />
                          <span>{project.status === 'Completed' ? 'Completed' : 'Ready to build'}</span>
                        </div>
                      </article>
                    ))}
                  </section>
                </>
              )}
            </>
          )}
        </main>

        {/* Modals for Add Item & Reset (Clean & Consistent Theme) */}
        {modal === 'add' && (
          <div
            className="modal-backdrop"
            onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-container max-w-md">
              <div className="modal-header">
                <div>
                  <span className="modal-kicker">New Roadmap Item</span>
                  <h2 className="modal-title">Add to Roadmap</h2>
                </div>
                <button onClick={() => setModal(null)} className="modal-close-btn" aria-label="Close">
                  ×
                </button>
              </div>
              <form onSubmit={addItem} className="modal-body space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Item Type
                  <select
                    value={itemType}
                    onChange={(event) => setItemType(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                  >
                    <option value="topic">Roadmap topic</option>
                    <option value="project">Project</option>
                  </select>
                </label>
                {itemType === 'topic' && (
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Category Folder
                    <select
                      value={categoryId}
                      onChange={(event) => setCategoryId(event.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                    >
                      {data.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Title
                  <input
                    required
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                    placeholder="e.g. Accessibility basics"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </label>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setModal(null)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {modal === 'reset' && (
          <div
            className="modal-backdrop"
            onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-container max-w-md">
              <div className="modal-header">
                <div>
                  <span className="modal-kicker text-rose-600">Danger Zone</span>
                  <h2 className="modal-title">Reset Your Roadmap?</h2>
                </div>
                <button onClick={() => setModal(null)} className="modal-close-btn" aria-label="Close">
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your current custom items and learning progress will be cleared and the original starter roadmap will
                  be restored.
                </p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setModal(null)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={reset} className="btn-danger">
                  Reset Roadmap
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
