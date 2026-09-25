import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DEFAULT_DATA } from '../js/data.js';
import { getLearningContent } from '../js/learning.js';
import { LearningModal as InAppLearningModal } from './components/LearningModal.jsx';
import { supabase } from './lib/supabase.js';
import './index.css';

const statuses = ['Not Started', 'Currently Learning', 'Completed'];

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
  return <label className="relative flex shrink-0 cursor-pointer items-center" title={label}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" /><span className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-slate-500 transition peer-checked:border-emerald-400 peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400"><span className="hidden h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-white peer-checked:block" /></span></label>;
}

function LegalPage({ type }) {
  const privacy = type === 'privacy';
  return <main className="min-h-screen bg-[#0b1120] px-5 py-10 text-slate-100"><article className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl"><a href="/" className="text-sm text-cyan-300">Back to Roadmap Tracker</a><h1 className="mt-8 font-['Space_Grotesk'] text-3xl font-bold">{privacy ? 'Privacy Policy' : 'Terms and Conditions'}</h1><p className="mt-2 text-sm text-slate-400">Last updated: September 25, 2026</p>{privacy ? <div className="mt-8 space-y-6 text-slate-300"><section><h2 className="text-xl font-bold text-slate-100">Information we collect</h2><p className="mt-2">Roadmap Tracker collects your email and authentication details. Social sign-in may provide your name, email, and profile image.</p></section><section><h2 className="text-xl font-bold text-slate-100">How we use information</h2><p className="mt-2">We use this information to authenticate you, save your personal roadmap, provide account recovery, and improve the application.</p></section><section><h2 className="text-xl font-bold text-slate-100">Storage and security</h2><p className="mt-2">Account and roadmap data are stored with Supabase. Row-level security restricts roadmap access to its owner. Passwords are handled by Supabase Authentication.</p></section><section><h2 className="text-xl font-bold text-slate-100">Your choices</h2><p className="mt-2">You can change your password or request account and data deletion by contacting the application owner.</p></section></div> : <div className="mt-8 space-y-6 text-slate-300"><section><h2 className="text-xl font-bold text-slate-100">Using Roadmap Tracker</h2><p className="mt-2">Roadmap Tracker helps you organize personal learning goals. You are responsible for your account credentials and roadmap content.</p></section><section><h2 className="text-xl font-bold text-slate-100">Acceptable use</h2><p className="mt-2">You agree not to misuse the service, access another user’s account, interfere with the service, or use it unlawfully.</p></section><section><h2 className="text-xl font-bold text-slate-100">Availability and changes</h2><p className="mt-2">The service is provided as available. Features and these terms may change over time.</p></section></div>}</article></main>;
}

function LearningModal({ topic, progress, onClose, onSave }) {
  const content = getLearningContent(topic.id, topic.title);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [examAnswer, setExamAnswer] = useState('');
  const [result, setResult] = useState('');
  const exerciseComplete = progress?.exercise_complete || false;
  const examComplete = progress?.exam_complete || false;
  const checkExercise = () => {
    const correct = exerciseAnswer === content.exercise.answer;
    setResult(correct ? 'Exercise correct. Exam unlocked.' : 'Not quite. Review the lesson and try again.');
    if (correct) onSave({ exercise_complete: true });
  };
  const checkExam = () => {
    const correct = examAnswer === content.exam.answer;
    setResult(correct ? 'Exam passed. Topic completed.' : 'That answer is not correct yet. Try again.');
    if (correct) onSave({ exam_complete: true, exam_score: 100 });
  };
  return <div className="fixed inset-0 z-20 overflow-y-auto bg-slate-950/80 p-5"><section className="mx-auto my-8 max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Learning path</p><h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold">{topic.title}</h2></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div><div className="mt-6 space-y-5"><article className="rounded-xl bg-slate-950/70 p-4"><p className="mb-2 text-xs font-bold uppercase text-slate-400">1. Lesson</p><p className="text-slate-300">{content.lesson}</p><a href={content.materialUrl} target="_blank" rel="noreferrer" onClick={() => onSave({ lesson_complete: true })} className="mt-4 inline-block text-sm font-bold text-cyan-300 hover:text-cyan-200">Open learning material →</a></article><article className="rounded-xl bg-slate-950/70 p-4"><p className="mb-2 text-xs font-bold uppercase text-slate-400">2. Exercise {exerciseComplete && <span className="text-emerald-400">Complete</span>}</p><p className="mb-3 text-slate-300">{content.exercise.question}</p><div className="flex flex-wrap gap-2">{content.exercise.options.map((option) => <button key={option} onClick={() => setExerciseAnswer(option)} className={`rounded-lg border px-3 py-2 text-sm ${exerciseAnswer === option ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-700'}`}>{option}</button>)}</div><button disabled={!exerciseAnswer} onClick={checkExercise} className="mt-4 rounded-lg bg-cyan-500 px-3 py-2 text-sm font-bold text-slate-950 disabled:opacity-40">Check exercise</button></article><article className={`rounded-xl bg-slate-950/70 p-4 ${!exerciseComplete ? 'opacity-60' : ''}`}><p className="mb-2 text-xs font-bold uppercase text-slate-400">3. Exam {examComplete && <span className="text-emerald-400">Passed</span>}</p><p className="mb-3 text-slate-300">{content.exam.question}</p><div className="flex flex-wrap gap-2">{content.exam.options.map((option) => <button key={option} disabled={!exerciseComplete} onClick={() => setExamAnswer(option)} className={`rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed ${examAnswer === option ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-700'}`}>{option}</button>)}</div><button disabled={!exerciseComplete || !examAnswer} onClick={checkExam} className="mt-4 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-slate-950 disabled:opacity-40">Submit exam</button></article></div>{result && <p className="mt-5 rounded-xl bg-slate-950 p-3 text-sm text-cyan-300">{result}</p>}</section></div>;
}

function AuthScreen({ initialMessage = '' }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(initialMessage);
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    if (mode === 'signup' && password !== confirmPassword) { setMessage('Passwords do not match.'); return; }
    setBusy(true);
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    setBusy(false);
    if (result.error) setMessage(result.error.message);
    else setMessage(mode === 'signup' ? 'Account created. Check your email to verify your address before signing in.' : '');
  };
  const signInWithProvider = async (provider) => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}/` } });
    if (error) { setBusy(false); setMessage(error.message); }
  };
  const recover = async () => {
    if (!email) { setMessage('Enter your email first.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/` });
    setBusy(false);
    setMessage(error ? error.message : 'Password reset email sent. Check your inbox.');
  };
  return <main className="flex min-h-screen items-center justify-center bg-[#0b1120] px-5 py-10 text-slate-100"><section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl"><div className="mb-8 text-center"><img src="/logo.png" alt="" className="mx-auto mb-4 h-14 w-14 rounded-2xl" /><h1 className="font-['Space_Grotesk'] text-3xl font-bold">Roadmap Tracker</h1><p className="mt-2 text-sm text-slate-400">Your learning plan, saved privately.</p></div><div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-950 p-1"><button onClick={() => setMode('login')} className={`rounded-lg py-2 text-sm font-bold ${mode === 'login' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}>Log in</button><button onClick={() => setMode('signup')} className={`rounded-lg py-2 text-sm font-bold ${mode === 'signup' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}>Sign up</button></div><div className="mb-5 grid grid-cols-3 gap-2"><button onClick={() => signInWithProvider('google')} disabled={busy} className="rounded-xl border border-slate-700 px-2 py-3 text-sm font-bold text-slate-200 hover:border-cyan-400 disabled:opacity-60">Google</button><button onClick={() => signInWithProvider('github')} disabled={busy} className="rounded-xl border border-slate-700 px-2 py-3 text-sm font-bold text-slate-200 hover:border-cyan-400 disabled:opacity-60">GitHub</button><button onClick={() => signInWithProvider('facebook')} disabled={busy} className="rounded-xl border border-slate-700 px-2 py-3 text-sm font-bold text-slate-200 hover:border-cyan-400 disabled:opacity-60">Facebook</button></div><div className="mb-5 flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-slate-800" />or continue with email<span className="h-px flex-1 bg-slate-800" /></div><form onSubmit={submit} className="space-y-4"><label className="block text-sm">Email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400" /></label><label className="block text-sm">Password<input type="password" required minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400" /></label>{mode === 'signup' && <label className="block text-sm">Confirm password<input type="password" required minLength="6" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400" /></label>}<button disabled={busy} className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 disabled:opacity-60">{busy ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}</button></form>{mode === 'login' && <button onClick={recover} disabled={busy} className="mt-4 w-full text-sm text-cyan-300 hover:text-cyan-200">Forgot password?</button>}{message && <p className="mt-5 rounded-xl bg-slate-950 p-3 text-sm text-cyan-300">{message}</p>}</section></main>;
}

async function loadRoadmap(userId) {
  const { data, error } = await supabase.from('roadmap_items').select('item_key,item_type,category_id,category_name,title,status,completed_date').eq('user_id', userId).order('created_at');
  if (error) throw error;
  if (data.length) return toRoadmap(data);
  const rows = DEFAULT_DATA.categories.flatMap((category) => category.topics.map((topic) => ({ user_id: userId, item_key: topic.id, item_type: 'topic', category_id: category.id, category_name: category.name, title: topic.title, status: topic.status }))).concat(DEFAULT_DATA.projects.map((project) => ({ user_id: userId, item_key: project.id, item_type: 'project', title: project.title, status: project.status, completed_date: project.completedDate })));
  const { data: seeded, error: seedError } = await supabase.from('roadmap_items').insert(rows).select('item_key,item_type,category_id,category_name,title,status,completed_date');
  if (seedError) throw seedError;
  return toRoadmap(seeded);
}

function toRoadmap(rows) {
  const categories = [];
  const projects = [];
  rows.forEach((row) => { if (row.item_type === 'project') projects.push({ id: row.item_key, title: row.title, status: row.status, completedDate: row.completed_date }); else { let category = categories.find((entry) => entry.id === row.category_id); if (!category) { category = { id: row.category_id, name: row.category_name, topics: [] }; categories.push(category); } category.topics.push({ id: row.item_key, title: row.title, status: row.status }); } });
  return { categories, projects };
}

function ProfileModal({ session, onClose }) {
  const metadata = session.user.user_metadata || {};
  const avatar = metadata.avatar_url || metadata.picture;
  const displayName = metadata.full_name || metadata.name || session.user.email?.split('@')[0] || 'User';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const changePassword = async (event) => {
    event.preventDefault();
    if (password.length < 6 || password !== confirmPassword) { setMessage(password !== confirmPassword ? 'Passwords do not match.' : 'Password must be at least 6 characters.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    setMessage(error ? error.message : 'Password changed successfully.');
    if (!error) { setPassword(''); setConfirmPassword(''); }
  };
  return <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/75 p-5" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><h2 className="font-['Space_Grotesk'] text-xl font-bold">Your profile</h2><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div><div className="mb-6 flex items-center gap-4">{avatar ? <img src={avatar} alt="Profile" className="h-16 w-16 rounded-full object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-slate-950">{displayName[0].toUpperCase()}</div>}<div><p className="font-bold">{displayName}</p><p className="text-sm text-slate-400">{session.user.email}</p></div></div><form onSubmit={changePassword} className="space-y-4"><h3 className="font-bold">Change password</h3><input type="password" required minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400" /><input type="password" required minLength="6" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password" className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400" /><button disabled={busy} className="w-full rounded-xl bg-cyan-500 p-3 font-bold text-slate-950 disabled:opacity-60">{busy ? 'Saving...' : 'Change password'}</button></form>{message && <p className="mt-4 rounded-xl bg-slate-950 p-3 text-sm text-cyan-300">{message}</p>}</section></div>;
}

function App({ session }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [learningProgress, setLearningProgress] = useState({});
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [itemType, setItemType] = useState('topic');
  const [newTitle, setNewTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  useEffect(() => { let active = true; setLoading(true); Promise.all([loadRoadmap(session.user.id), supabase.from('learning_progress').select('item_key,lesson_complete,exercise_complete,exam_complete,exam_score').eq('user_id', session.user.id)]).then(([roadmap, result]) => { if (!active) return; if (result.error) throw result.error; setData(roadmap); setCategoryId(roadmap.categories[0]?.id || ''); setLearningProgress(Object.fromEntries(result.data.map((entry) => [entry.item_key, entry]))); }).catch((error) => { if (active) setMessage(error.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [session.user.id]);
  const refresh = async () => setData(await loadRoadmap(session.user.id));
  const saveLearningProgress = async (itemKey, changes) => { const { data: saved, error } = await supabase.from('learning_progress').upsert({ user_id: session.user.id, item_key: itemKey, ...learningProgress[itemKey], ...changes, updated_at: new Date().toISOString() }, { onConflict: 'user_id,item_key' }).select().single(); if (error) setMessage(error.message); else setLearningProgress((current) => ({ ...current, [itemKey]: saved })); };
  const update = async (id, status, completedDate = null) => { const { error } = await supabase.from('roadmap_items').update({ status, completed_date: completedDate }).eq('user_id', session.user.id).eq('item_key', id); if (error) setMessage(error.message); else refresh(); };
  const stats = useMemo(() => { if (!data) return { total: 0, completed: 0, learning: 0, progress: 0, learningProgress: 0 }; const items = [...data.categories.flatMap((category) => category.topics), ...data.projects]; const completed = items.filter((item) => item.status === 'Completed').length; const topics = data.categories.flatMap((category) => category.topics); const learningDone = topics.filter((topic) => learningProgress[topic.id]?.exam_complete).length; return { total: items.length, completed, learning: items.filter((item) => item.status === 'Currently Learning').length, progress: items.length ? Math.round((completed / items.length) * 100) : 0, learningProgress: topics.length ? Math.round((learningDone / topics.length) * 100) : 0 }; }, [data, learningProgress]);
  useEffect(() => {
    const logoutButton = [...document.querySelectorAll('button')].find((button) => button.textContent === 'Log out');
    if (!logoutButton || logoutButton.dataset.profileReady) return undefined;
    const profileContainer = document.createElement('span');
    const profileButton = document.createElement('button');
    profileButton.textContent = 'Profile';
    profileButton.className = 'mr-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-cyan-400';
    profileButton.onclick = () => {
      const modalContainer = document.createElement('div');
      document.body.appendChild(modalContainer);
      const modalRoot = createRoot(modalContainer);
      modalRoot.render(<ProfileModal session={session} onClose={() => { modalRoot.unmount(); modalContainer.remove(); }} />);
    };
    logoutButton.dataset.profileReady = 'true';
    logoutButton.parentElement.insertBefore(profileContainer, logoutButton);
    profileContainer.appendChild(profileButton);
    return () => profileContainer.remove();
  }, [session]);
  useEffect(() => {
    if (!data) return undefined;
    const topics = data.categories.flatMap((category) => category.topics);
    const handlers = [];
    document.querySelectorAll('span').forEach((element) => {
      const topic = topics.find((entry) => entry.title === element.textContent);
      if (!topic) return;
      const handler = () => setModal(`learning:${topic.id}`);
      element.addEventListener('click', handler);
      element.classList.add('cursor-pointer');
      handlers.push(() => element.removeEventListener('click', handler));
    });
    return () => handlers.forEach((remove) => remove());
  }, [data]);
  useEffect(() => {
    if (!modal?.startsWith('learning:') || !data) return undefined;
    const topicId = modal.slice('learning:'.length);
    const topic = data.categories.flatMap((category) => category.topics).find((entry) => entry.id === topicId);
    if (!topic) return undefined;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<InAppLearningModal topic={topic} progress={learningProgress[topic.id]} onClose={() => { root.unmount(); container.remove(); setModal(null); }} onSave={(changes) => saveLearningProgress(topic.id, changes)} />);
    return () => { root.unmount(); container.remove(); };
  }, [modal, data, learningProgress]);
  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#0b1120] px-5 text-cyan-300"><div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center"><div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" /><p>Loading your roadmap...</p><p className="mt-2 text-xs text-slate-500">Connecting to your private progress</p></div></div>;
  if (!data) return <div className="flex min-h-screen items-center justify-center bg-[#0b1120] px-5 text-center text-rose-300">{message || 'Unable to load your roadmap.'}</div>;
  const filteredCategories = data.categories.map((category) => ({ ...category, topics: category.topics.filter((topic) => matchesFilter(topic, filter, search)) })).filter((category) => category.topics.length);
  const filteredProjects = data.projects.filter((project) => matchesFilter(project, filter, search));
  const addItem = async (event) => { event.preventDefault(); if (!newTitle.trim()) return; const category = data.categories.find((entry) => entry.id === categoryId); const row = { user_id: session.user.id, item_key: `${itemType}-${crypto.randomUUID()}`, item_type: itemType, category_id: itemType === 'topic' ? categoryId : null, category_name: itemType === 'topic' ? category.name : null, title: newTitle.trim(), status: 'Not Started' }; const { error } = await supabase.from('roadmap_items').insert(row); if (error) setMessage(error.message); else { setNewTitle(''); setModal(null); refresh(); } };
  const reset = async () => { await supabase.from('roadmap_items').delete().eq('user_id', session.user.id); await refresh(); setModal(null); };
  return <div className="min-h-screen bg-[#0b1120] text-slate-100"><header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><div className="flex items-center gap-3"><img src="/logo.png" alt="" className="h-10 w-10 rounded-xl" /><div><p className="font-['Space_Grotesk'] text-lg font-bold">Roadmap Tracker</p><p className="text-xs text-slate-400">{session.user.email}</p></div></div><button onClick={() => supabase.auth.signOut()} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-cyan-400">Log out</button></div></header><main className="mx-auto max-w-6xl px-5 py-8"><section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900/75 p-5 shadow-xl"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[['Total Topics', stats.total, 'text-cyan-400'], ['In Progress', stats.learning, 'text-amber-400'], ['Completed', stats.completed, 'text-emerald-400']].map(([label, value, color]) => <div key={label}><p className="text-sm text-slate-400">{label}</p><p className={`mt-1 font-['Space_Grotesk'] text-3xl font-bold ${color}`}>{value}</p></div>)}<div><div className="flex justify-between"><p className="text-sm text-slate-400">Overall Progress</p><span className="text-sm font-bold text-cyan-400">{stats.progress}%</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${stats.progress}%` }} /></div></div></div></section><section className="mb-8 flex flex-col gap-3 lg:flex-row lg:justify-between"><div className="flex flex-1 gap-3"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search topics or projects..." className="w-full rounded-xl border border-slate-800 bg-slate-900/75 px-4 py-3 outline-none focus:border-cyan-400 sm:max-w-md" /><select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border border-slate-800 bg-slate-900/75 px-4 py-3"><option value="all">Show All</option><option value="not-started">Show Not Started</option><option value="in-progress">Show In Progress</option><option value="completed">Show Completed</option></select></div><div className="flex gap-2"><button onClick={() => setModal('add')} className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950">Add Custom Item</button><button onClick={() => setModal('reset')} className="rounded-xl bg-rose-500 px-4 py-3 text-sm font-bold text-white">Reset</button></div></section>{message && <p className="mb-5 rounded-xl bg-rose-950/50 p-3 text-sm text-rose-300">{message}</p>}<section className="grid gap-5 md:grid-cols-2">{filteredCategories.map((category) => <article key={category.id} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5"><div className="mb-4 flex justify-between border-b border-slate-800 pb-3"><h2 className="font-['Space_Grotesk'] text-lg font-bold">{category.name}</h2><span className="text-xs text-slate-400">{category.topics.length} topics</span></div><ul className="space-y-2">{category.topics.map((topic) => <li key={topic.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-950/60 p-3"><div className="flex min-w-0 items-center gap-3"><Check checked={topic.status === 'Completed'} label={topic.title} onChange={(checked) => update(topic.id, checked ? 'Completed' : 'Not Started')} /><span className={`truncate text-sm font-medium ${topic.status === 'Completed' ? 'text-slate-500 line-through' : ''}`}>{topic.title}</span></div><StatusSelect item={topic} onChange={(status) => update(topic.id, status)} /></li>)}</ul></article>)}</section><h2 className="mb-5 mt-12 border-b border-slate-800 pb-3 font-['Space_Grotesk'] text-2xl font-bold">Projects</h2><section className="grid gap-5 md:grid-cols-2">{filteredProjects.map((project) => <article key={project.id} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5"><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><Check checked={project.status === 'Completed'} label={project.title} onChange={(checked) => update(project.id, checked ? 'Completed' : 'Not Started', checked ? new Date().toISOString().slice(0, 10) : null)} /><span className={`truncate text-sm font-medium ${project.status === 'Completed' ? 'text-slate-500 line-through' : ''}`}>{project.title}</span></div><StatusSelect item={project} onChange={(status) => update(project.id, status, status === 'Completed' ? new Date().toISOString().slice(0, 10) : null)} /></div></article>)}</section></main>{modal && <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/75 p-5"><div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">{modal === 'add' ? <><h2 className="mb-5 font-['Space_Grotesk'] text-xl font-bold">Add Custom Item</h2><form onSubmit={addItem} className="space-y-4"><select value={itemType} onChange={(event) => setItemType(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"><option value="topic">Roadmap Topic</option><option value="project">Project</option></select>{itemType === 'topic' && <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3">{data.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>}<input required value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Title" className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3" /><button className="w-full rounded-xl bg-cyan-500 p-3 font-bold text-slate-950">Add Item</button></form></> : <><h2 className="font-['Space_Grotesk'] text-xl font-bold">Reset roadmap?</h2><p className="mt-3 text-slate-400">This removes your custom progress and restores the starter roadmap.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setModal(null)} className="rounded-xl border border-slate-700 px-4 py-2">Cancel</button><button onClick={reset} className="rounded-xl bg-rose-500 px-4 py-2 font-bold">Reset</button></div></>}</div></div>}</div>;
}

function Root() {
  const [session, setSession] = useState(undefined);
  const [authError, setAuthError] = useState('');
  useEffect(() => {
    const callbackError = new URLSearchParams(window.location.hash.replace(/^#/, '')).get('error_description');
    if (callbackError) { setAuthError(callbackError); window.history.replaceState({}, document.title, window.location.pathname); }
    supabase.auth.getSession().then(({ data, error }) => { if (error) setAuthError(error.message); setSession(data.session); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/privacy') return <LegalPage type="privacy" />;
  if (path === '/terms') return <LegalPage type="terms" />;
  if (session === undefined) return <div className="flex min-h-screen items-center justify-center bg-[#0b1120] text-cyan-300">Loading...</div>;
  return session ? <App session={session} /> : <AuthScreen initialMessage={authError} />;
}

createRoot(document.getElementById('root')).render(<Root />);
