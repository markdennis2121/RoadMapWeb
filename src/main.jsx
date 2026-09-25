import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Storage } from '../js/storage.js';
import './index.css';

const statuses = ['Not Started', 'Currently Learning', 'Completed'];
const filterLabels = { all: 'Show All', 'not-started': 'Show Not Started', 'in-progress': 'Show In Progress', completed: 'Show Completed' };

function matchesFilter(item, filter, search) {
  const statusMatch = filter === 'all' || (filter === 'not-started' && item.status === 'Not Started') || (filter === 'in-progress' && item.status === 'Currently Learning') || (filter === 'completed' && item.status === 'Completed');
  return statusMatch && item.title.toLowerCase().includes(search.toLowerCase());
}

function StatusSelect({ item, onChange }) {
  const color = item.status === 'Completed' ? 'bg-emerald-500' : item.status === 'Currently Learning' ? 'bg-amber-500' : 'bg-slate-600';
  return <select value={item.status} onChange={(event) => onChange(event.target.value)} className={`rounded-full ${color} px-3 py-1.5 text-xs font-bold text-white outline-none`} aria-label={`Status for ${item.title}`}>
    {statuses.map((status) => <option value={status} key={status}>{status === 'Currently Learning' ? 'Learning' : status}</option>)}
  </select>;
}

function Check({ checked, onChange, label }) {
  return <label className="relative flex shrink-0 cursor-pointer items-center" title={label}>
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" />
    <span className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-slate-500 transition peer-checked:border-emerald-400 peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400">
      <span className="hidden h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-white peer-checked:block" />
    </span>
  </label>;
}

function App() {
  const [data, setData] = useState(() => Storage.getData());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [modal, setModal] = useState(null);
  const [itemType, setItemType] = useState('topic');
  const [newTitle, setNewTitle] = useState('');
  const [categoryId, setCategoryId] = useState(() => Storage.getData().categories[0]?.id || '');

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const refresh = () => setData(Storage.getData());
  const updateTopic = (category, topic, status) => { Storage.updateTopicStatus(category, topic, status); refresh(); };
  const updateProject = (project, status) => { Storage.updateProjectStatus(project, status); refresh(); };
  const toggleTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); localStorage.setItem('theme', next); };
  const exportData = () => { const link = document.createElement('a'); link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`; link.download = 'roadmap_tracker_backup.json'; link.click(); };

  const stats = useMemo(() => {
    const items = [...data.categories.flatMap((category) => category.topics), ...data.projects];
    const completed = items.filter((item) => item.status === 'Completed').length;
    return { total: items.length, completed, learning: items.filter((item) => item.status === 'Currently Learning').length, progress: items.length ? Math.round((completed / items.length) * 100) : 0 };
  }, [data]);

  const addItem = (event) => {
    event.preventDefault();
    if (!newTitle.trim()) return;
    itemType === 'topic' ? Storage.addTopic(categoryId, newTitle.trim()) : Storage.addProject(newTitle.trim());
    setNewTitle(''); setModal(null); refresh();
  };

  const panel = theme === 'dark' ? 'bg-slate-900/75 border-slate-800' : 'bg-white/85 border-slate-200';
  const muted = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const text = theme === 'dark' ? 'text-slate-100' : 'text-slate-900';
  const itemBg = theme === 'dark' ? 'bg-slate-950/60' : 'bg-slate-50';
  const filteredCategories = data.categories.map((category) => ({ ...category, topics: category.topics.filter((topic) => matchesFilter(topic, filter, search)) })).filter((category) => category.topics.length);
  const filteredProjects = data.projects.filter((project) => matchesFilter(project, filter, search));

  return <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0b1120]' : 'bg-slate-100'} ${text}`}>
    <header className={`border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'} sticky top-0 z-10 backdrop-blur`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3"><img src="/logo.png" alt="" className="h-10 w-10 rounded-xl object-cover" /><div><p className="font-['Space_Grotesk'] text-lg font-bold tracking-tight">Roadmap Tracker</p><p className={`text-xs ${muted}`}>Build your next chapter</p></div></div>
        <button onClick={toggleTheme} aria-label="Toggle theme" className={`rounded-lg border px-3 py-2 text-sm ${panel} ${muted} hover:text-cyan-400`}>{theme === 'dark' ? 'Light' : 'Dark'} mode</button>
      </div>
    </header>

    <main className="mx-auto max-w-6xl px-5 py-8">
      <section className={`animate-rise-in mb-7 rounded-2xl border p-5 shadow-xl ${panel}`}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[['Total Topics', stats.total, 'text-cyan-400'], ['In Progress', stats.learning, 'text-amber-400'], ['Completed', stats.completed, 'text-emerald-400']].map(([label, value, color]) => <div key={label}><p className={`text-sm ${muted}`}>{label}</p><p className={`mt-1 font-['Space_Grotesk'] text-3xl font-bold ${color}`}>{value}</p></div>)}
          <div><div className="flex justify-between"><p className={`text-sm ${muted}`}>Overall Progress</p><span className="text-sm font-bold text-cyan-400">{stats.progress}%</span></div><div className={`mt-4 h-2 overflow-hidden rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${stats.progress}%` }} /></div></div>
        </div>
      </section>

      <section className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search topics or projects..." className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-400 sm:max-w-md ${panel}`} /><select value={filter} onChange={(event) => setFilter(event.target.value)} className={`rounded-xl border px-4 py-3 outline-none focus:border-cyan-400 ${panel}`}>{Object.entries(filterLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
        <div className="flex flex-wrap gap-2"><button onClick={() => setModal('add')} className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300">Add Custom Item</button><button onClick={exportData} className={`rounded-xl border px-4 py-3 text-sm font-bold ${panel} hover:border-cyan-400`}>Export JSON</button><button onClick={() => setModal('reset')} className="rounded-xl bg-rose-500 px-4 py-3 text-sm font-bold text-white hover:bg-rose-400">Reset</button></div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {filteredCategories.map((category, index) => <article key={category.id} className={`animate-rise-in rounded-2xl border p-5 shadow-lg ${panel}`} style={{ animationDelay: `${index * 45}ms` }}><div className={`mb-4 flex items-center justify-between border-b pb-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}><h2 className="font-['Space_Grotesk'] text-lg font-bold">{category.name}</h2><span className={`text-xs ${muted}`}>{category.topics.length} topics</span></div><ul className="space-y-2">{category.topics.map((topic) => <li key={topic.id} className={`flex items-center justify-between gap-3 rounded-xl p-3 ${itemBg}`}><div className="flex min-w-0 items-center gap-3"><Check checked={topic.status === 'Completed'} label={`Mark ${topic.title} complete`} onChange={(checked) => updateTopic(category.id, topic.id, checked ? 'Completed' : 'Not Started')} /><span className={`truncate text-sm font-medium ${topic.status === 'Completed' ? `text-decoration-line: line-through ${muted}` : ''}`}>{topic.title}</span></div><StatusSelect item={topic} onChange={(status) => updateTopic(category.id, topic.id, status)} /></li>)}</ul></article>)}
      </section>

      <div className={`mb-5 mt-12 border-b pb-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-300'}`}><h2 className="font-['Space_Grotesk'] text-2xl font-bold">Projects</h2></div>
      <section className="grid gap-5 md:grid-cols-2">{filteredProjects.map((project) => <article key={project.id} className={`rounded-2xl border p-5 shadow-lg ${panel}`}><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><Check checked={project.status === 'Completed'} label={`Mark ${project.title} complete`} onChange={(checked) => updateProject(project.id, checked ? 'Completed' : 'Not Started')} /><div className="min-w-0"><p className={`truncate text-sm font-medium ${project.status === 'Completed' ? `text-decoration-line: line-through ${muted}` : ''}`}>{project.title}</p>{project.completedDate && <p className={`mt-1 text-xs ${muted}`}>Completed: {project.completedDate}</p>}</div></div><StatusSelect item={project} onChange={(status) => updateProject(project.id, status)} /></div></article>)}</section>
    </main>

    {modal && <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/75 p-5" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}><div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${panel}`}>{modal === 'add' ? <><div className="mb-5 flex items-center justify-between"><h2 className="font-['Space_Grotesk'] text-xl font-bold">Add Custom Item</h2><button onClick={() => setModal(null)} className={`text-2xl ${muted}`} aria-label="Close">×</button></div><form onSubmit={addItem} className="space-y-4"><label className="block text-sm">Type<select value={itemType} onChange={(event) => setItemType(event.target.value)} className={`mt-2 w-full rounded-xl border px-3 py-3 ${panel}`}><option value="topic">Roadmap Topic</option><option value="project">Project</option></select></label>{itemType === 'topic' && <label className="block text-sm">Category<select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className={`mt-2 w-full rounded-xl border px-3 py-3 ${panel}`}>{data.categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label>}<label className="block text-sm">Title<input autoFocus required value={newTitle} onChange={(event) => setNewTitle(event.target.value)} className={`mt-2 w-full rounded-xl border px-3 py-3 ${panel}`} /></label><button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950">Add Item</button></form></> : <><h2 className="font-['Space_Grotesk'] text-xl font-bold">Confirm Reset</h2><p className={`mt-3 ${muted}`}>Are you sure you want to reset all your progress? This action cannot be undone.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setModal(null)} className={`rounded-xl border px-4 py-2 ${panel}`}>Cancel</button><button onClick={() => { Storage.resetData(); refresh(); setModal(null); }} className="rounded-xl bg-rose-500 px-4 py-2 font-bold text-white">Yes, Reset</button></div></>}</div></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
