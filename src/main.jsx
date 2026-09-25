import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DEFAULT_DATA } from '../js/data.js';
import { LearningModal as InAppLearningModal } from './components/LearningModal.jsx';
import { DashboardShell } from './components/DashboardShell.jsx';
import { supabase } from './lib/supabase.js';
import './index.css';

function LegalPage({ type }) {
  const privacy = type === 'privacy';
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-5 py-12 text-slate-800">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <a href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          ← Back to Roadmap Tracker
        </a>
        <h1 className="mt-6 font-['Space_Grotesk'] text-3xl font-bold text-slate-900">
          {privacy ? 'Privacy Policy' : 'Terms and Conditions'}
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: September 25, 2026</p>
        {privacy ? (
          <div className="mt-8 space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900">Information we collect</h2>
              <p className="mt-2">
                Roadmap Tracker collects your email and authentication details. Social sign-in may provide your name,
                email, and profile image.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900">How we use information</h2>
              <p className="mt-2">
                We use this information to authenticate you, save your personal roadmap, provide account recovery, and
                improve the application.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900">Storage and security</h2>
              <p className="mt-2">
                Account and roadmap data are stored with Supabase. Row-level security restricts roadmap access to its
                owner. Passwords are handled by Supabase Authentication.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900">Your choices</h2>
              <p className="mt-2">
                You can change your password or request account and data deletion by contacting the application owner.
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-8 space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900">Using Roadmap Tracker</h2>
              <p className="mt-2">
                Roadmap Tracker helps you organize personal learning goals. You are responsible for your account
                credentials and roadmap content.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900">Acceptable use</h2>
              <p className="mt-2">
                You agree not to misuse the service, access another user’s account, interfere with the service, or use it
                unlawfully.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900">Availability and changes</h2>
              <p className="mt-2">
                The service is provided as available. Features and these terms may change over time.
              </p>
            </section>
          </div>
        )}
      </article>
    </main>
  );
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
    if (mode === 'signup' && password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setBusy(true);
    const result =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    setBusy(false);
    if (result.error) setMessage(result.error.message);
    else setMessage(mode === 'signup' ? 'Account created. Check your email to verify your address before signing in.' : '');
  };

  const signInWithProvider = async (provider) => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/` }
    });
    if (error) {
      setBusy(false);
      setMessage(error.message);
    }
  };

  const recover = async () => {
    if (!email) {
      setMessage('Enter your email first.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/` });
    setBusy(false);
    setMessage(error ? error.message : 'Password reset email sent. Check your inbox.');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 py-10 text-slate-800">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50">
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-3xl font-extrabold tracking-tighter text-white shadow-[0_8px_16px_rgba(79,70,229,0.25)]">
            R
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Roadmap Workspace</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">Log in to continue your learning journey.</p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setMode('login')}
            className={`rounded-lg py-2.5 text-sm font-bold transition-all ${
              mode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`rounded-lg py-2.5 text-sm font-bold transition-all ${
              mode === 'signup' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign up
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => signInWithProvider('google')}
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button
            onClick={() => signInWithProvider('github')}
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-60"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
            GitHub
          </button>
        </div>

        <div className="mb-6 flex items-center gap-3 text-xs font-medium text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          or continue with email
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Password
            <input
              type="password"
              required
              minLength="6"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
              placeholder="••••••••"
            />
          </label>
          {mode === 'signup' && (
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Confirm password
              <input
                type="password"
                required
                minLength="6"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                placeholder="••••••••"
              />
            </label>
          )}
          <button
            disabled={busy}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {busy ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        {mode === 'login' && (
          <button onClick={recover} disabled={busy} className="mt-4 w-full text-xs font-semibold text-indigo-600 hover:text-indigo-700">
            Forgot password?
          </button>
        )}

        {message && (
          <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/80 p-3 text-xs text-indigo-700 font-medium">
            {message}
          </div>
        )}
      </section>
    </main>
  );
}

async function loadRoadmap(userId) {
  const { data, error } = await supabase
    .from('roadmap_items')
    .select('item_key,item_type,category_id,category_name,title,status,completed_date')
    .eq('user_id', userId)
    .order('created_at');

  if (error) throw error;
  if (data.length) return toRoadmap(data);

  const rows = DEFAULT_DATA.categories
    .flatMap((category) =>
      category.topics.map((topic) => ({
        user_id: userId,
        item_key: topic.id,
        item_type: 'topic',
        category_id: category.id,
        category_name: category.name,
        title: topic.title,
        status: topic.status
      }))
    )
    .concat(
      DEFAULT_DATA.projects.map((project) => ({
        user_id: userId,
        item_key: project.id,
        item_type: 'project',
        title: project.title,
        status: project.status,
        completed_date: project.completedDate
      }))
    );

  const { data: seeded, error: seedError } = await supabase
    .from('roadmap_items')
    .insert(rows)
    .select('item_key,item_type,category_id,category_name,title,status,completed_date');

  if (seedError) throw seedError;
  return toRoadmap(seeded);
}

function toRoadmap(rows) {
  const categories = [];
  const projects = [];

  rows.forEach((row) => {
    if (row.item_type === 'project') {
      projects.push({ id: row.item_key, title: row.title, status: row.status, completedDate: row.completed_date });
    } else {
      let category = categories.find((entry) => entry.id === row.category_id);
      if (!category) {
        category = { id: row.category_id, name: row.category_name, topics: [] };
        categories.push(category);
      }
      category.topics.push({ id: row.item_key, title: row.title, status: row.status });
    }
  });

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
    if (password.length < 6 || password !== confirmPassword) {
      setMessage(password !== confirmPassword ? 'Passwords do not match.' : 'Password must be at least 6 characters.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    setMessage(error ? error.message : 'Password changed successfully.');
    if (!error) {
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-container max-w-md">
        <div className="modal-header">
          <div>
            <span className="modal-kicker">Account Settings</span>
            <h2 className="modal-title">Your Profile</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-body space-y-6">
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
            {avatar ? (
              <img src={avatar} alt="Profile" className="h-14 w-14 rounded-full object-cover shadow-sm" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-xl font-bold text-white shadow-sm">
                {displayName[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-bold text-slate-800 text-base">{displayName}</p>
              <p className="text-xs text-slate-500">{session.user.email}</p>
            </div>
          </div>

          <form onSubmit={changePassword} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Change Password</h3>
            <input
              type="password"
              required
              minLength="6"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
            />
            <input
              type="password"
              required
              minLength="6"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
            />
            <button
              disabled={busy}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              {busy ? 'Saving...' : 'Update Password'}
            </button>
          </form>

          {message && (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-xs text-indigo-700 font-medium">
              {message}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  );
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

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      loadRoadmap(session.user.id),
      supabase
        .from('learning_progress')
        .select('item_key,lesson_complete,exercise_complete,exam_complete,exam_score')
        .eq('user_id', session.user.id)
    ])
      .then(([roadmap, result]) => {
        if (!active) return;
        if (result.error) throw result.error;
        setData(roadmap);
        setCategoryId(roadmap.categories[0]?.id || '');
        setLearningProgress(Object.fromEntries(result.data.map((entry) => [entry.item_key, entry])));
      })
      .catch((error) => {
        if (active) setMessage(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [session.user.id]);

  const refresh = async () => setData(await loadRoadmap(session.user.id));

  const saveLearningProgress = async (itemKey, changes) => {
    const { data: saved, error } = await supabase
      .from('learning_progress')
      .upsert(
        {
          user_id: session.user.id,
          item_key: itemKey,
          ...learningProgress[itemKey],
          ...changes,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id,item_key' }
      )
      .select()
      .single();

    if (error) setMessage(error.message);
    else setLearningProgress((current) => ({ ...current, [itemKey]: saved }));
  };

  const update = async (id, status, completedDate = null) => {
    const { error } = await supabase
      .from('roadmap_items')
      .update({ status, completed_date: completedDate })
      .eq('user_id', session.user.id)
      .eq('item_key', id);

    if (error) setMessage(error.message);
    else refresh();
  };

  const stats = useMemo(() => {
    if (!data) return { total: 0, completed: 0, learning: 0, progress: 0, learningProgress: 0 };
    const items = [...data.categories.flatMap((category) => category.topics), ...data.projects];
    const completed = items.filter((item) => item.status === 'Completed').length;
    const topics = data.categories.flatMap((category) => category.topics);
    const learningDone = topics.filter((topic) => learningProgress[topic.id]?.exam_complete).length;
    return {
      total: items.length,
      completed,
      learning: items.filter((item) => item.status === 'Currently Learning').length,
      progress: items.length ? Math.round((completed / items.length) * 100) : 0,
      learningProgress: topics.length ? Math.round((learningDone / topics.length) * 100) : 0
    };
  }, [data, learningProgress]);

  // Modal handler for Topic learning
  useEffect(() => {
    if (!modal?.startsWith('learning:') || !data) return undefined;
    const topicId = modal.slice('learning:'.length);
    const topic = data.categories.flatMap((category) => category.topics).find((entry) => entry.id === topicId);
    if (!topic) return undefined;

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
      <InAppLearningModal
        topic={topic}
        progress={learningProgress[topic.id]}
        onClose={() => {
          root.unmount();
          container.remove();
          setModal(null);
        }}
        onSave={(changes) => saveLearningProgress(topic.id, changes)}
      />
    );
    return () => {
      root.unmount();
      container.remove();
    };
  }, [modal, data, learningProgress]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 text-indigo-600">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-600" />
          <p className="font-semibold text-slate-800">Loading your roadmap...</p>
          <p className="mt-1 text-xs text-slate-500">Connecting to your learning progress</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 text-center text-rose-600 font-semibold">
        {message || 'Unable to load your roadmap.'}
      </div>
    );
  }

  const filteredCategories = data.categories
    .map((category) => ({
      ...category,
      topics: category.topics.filter((topic) => {
        const statusMatch =
          filter === 'all' ||
          (filter === 'not-started' && topic.status === 'Not Started') ||
          (filter === 'in-progress' && topic.status === 'Currently Learning') ||
          (filter === 'completed' && topic.status === 'Completed');
        return statusMatch && topic.title.toLowerCase().includes(search.toLowerCase());
      })
    }))
    .filter((category) => category.topics.length);

  const filteredProjects = data.projects.filter((project) => {
    const statusMatch =
      filter === 'all' ||
      (filter === 'not-started' && project.status === 'Not Started') ||
      (filter === 'in-progress' && project.status === 'Currently Learning') ||
      (filter === 'completed' && project.status === 'Completed');
    return statusMatch && project.title.toLowerCase().includes(search.toLowerCase());
  });

  const addItem = async (event) => {
    event.preventDefault();
    if (!newTitle.trim()) return;
    const category = data.categories.find((entry) => entry.id === categoryId);
    const row = {
      user_id: session.user.id,
      item_key: `${itemType}-${crypto.randomUUID()}`,
      item_type: itemType,
      category_id: itemType === 'topic' ? categoryId : null,
      category_name: itemType === 'topic' ? category?.name : null,
      title: newTitle.trim(),
      status: 'Not Started'
    };
    const { error } = await supabase.from('roadmap_items').insert(row);
    if (error) setMessage(error.message);
    else {
      setNewTitle('');
      setModal(null);
      refresh();
    }
  };

  const reset = async () => {
    await supabase.from('roadmap_items').delete().eq('user_id', session.user.id);
    await refresh();
    setModal(null);
  };

  const openProfile = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
      <ProfileModal
        session={session}
        onClose={() => {
          root.unmount();
          container.remove();
        }}
      />
    );
  };

  return (
    <DashboardShell
      session={session}
      data={data}
      stats={stats}
      learningProgress={learningProgress}
      saveLearningProgress={saveLearningProgress}
      filter={filter}
      search={search}
      setFilter={setFilter}
      setSearch={setSearch}
      filteredCategories={filteredCategories}
      filteredProjects={filteredProjects}
      update={update}
      setModal={setModal}
      onProfile={openProfile}
      onSignOut={() => supabase.auth.signOut()}
      itemType={itemType}
      setItemType={setItemType}
      newTitle={newTitle}
      setNewTitle={setNewTitle}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      addItem={addItem}
      reset={reset}
      modal={modal}
    />
  );
}

function Root() {
  const [session, setSession] = useState(undefined);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const callbackError = new URLSearchParams(window.location.hash.replace(/^#/, '')).get('error_description');
    if (callbackError) {
      setAuthError(callbackError);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) setAuthError(error.message);
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/privacy') return <LegalPage type="privacy" />;
  if (path === '/terms') return <LegalPage type="terms" />;
  if (session === undefined)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] text-indigo-600 font-semibold">
        Loading...
      </div>
    );
  return session ? <App session={session} /> : <AuthScreen initialMessage={authError} />;
}

createRoot(document.getElementById('root')).render(<Root />);
