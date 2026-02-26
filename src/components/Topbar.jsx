import { useMemo, useState } from 'react';

const notificationItems = [
  { id: 1, title: 'Order CK-1098 delayed', detail: 'Delivery delayed by 12 mins in Bengaluru.' },
  { id: 2, title: 'New distributor onboarded', detail: 'Hyderabad East channel is now active.' },
  { id: 3, title: 'Low stock alert', detail: 'Kimchi Noodles inventory below safety stock.' },
  { id: 4, title: 'SLA milestone hit', detail: '98.4% orders delivered on time today.' },
];

export default function Topbar({
  search,
  setSearch,
  darkMode,
  setDarkMode,
  isAdmin,
  onAdminLogin,
  onLogout,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [notifications, setNotifications] = useState(notificationItems);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const unreadCount = useMemo(() => notifications.length, [notifications.length]);

  const handleAdminLogin = () => {
    if (username === 'admin' && password === 'admin') {
      onAdminLogin();
      setAuthMessage('✅ Logged in as Admin. Manual override controls are enabled.');
      setUsername('');
      setPassword('');
      return;
    }

    setAuthMessage('❌ Invalid credentials. Use admin / admin to access admin overrides.');
  };

  const handleAction = (action) => {
    if (action === 'logout') {
      onLogout();
      setShowAdminMenu(false);
      setAuthMessage('You have been logged out. Manual override controls are disabled.');
      return;
    }

    setAuthMessage(`${action} clicked.`);
    setShowAdminMenu(false);
  };

  return (
    <header className="glass relative z-40 flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tables, charts, products..."
        className="min-w-60 flex-1 rounded-xl border border-slate-300/50 bg-white/70 px-4 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-brand-rose dark:border-white/20 dark:bg-black/20 dark:text-white dark:placeholder:text-slate-300"
      />

      <div className="relative">
        <button
          onClick={() => {
            setShowNotifications((prev) => !prev);
            setShowAdminMenu(false);
          }}
          className="glass rounded-xl px-3 py-2 text-sm transition hover:shadow-glow"
        >
          🔔 {unreadCount}
        </button>
        {showNotifications && (
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-brand-rose/30 bg-white/95 p-3 shadow-2xl dark:border-white/10 dark:bg-slate-900/95">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Notifications</p>
              <button
                onClick={() => setNotifications([])}
                className="text-xs text-brand-pink hover:text-brand-rose"
              >
                Mark all read
              </button>
            </div>
            {notifications.length ? (
              <ul className="space-y-2">
                {notifications.map((item) => (
                  <li key={item.id} className="rounded-xl bg-slate-100/80 p-2 dark:bg-white/5">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{item.detail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl bg-emerald-400/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-300">
                You are all caught up.
              </p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="glass rounded-xl px-3 py-2 text-sm transition hover:shadow-glow"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      <div className="relative ml-auto">
        <button
          onClick={() => {
            setShowAdminMenu((prev) => !prev);
            setShowNotifications(false);
          }}
          className="glass-strong flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm"
        >
          <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-r from-brand-rose to-brand-plum" />
          <div>
            <p className="font-semibold leading-tight">{isAdmin ? 'Aditi Sharma' : 'Dashboard Viewer'}</p>
            <p className="text-xs text-slate-400 dark:text-slate-300">
              {isAdmin ? 'Regional Admin • Enterprise Ops' : 'Read-only mode'}
            </p>
          </div>
        </button>
      </div>

      {showAdminMenu && (
        <div className="fixed right-4 top-4 z-[100] w-80 rounded-2xl border border-brand-rose/30 bg-white/95 p-3 shadow-2xl dark:border-white/10 dark:bg-slate-900/95 md:right-6 md:top-6">
          <p className="text-sm font-semibold">Admin quick actions</p>
          <div className="mt-2 space-y-2 text-sm">
            {!isAdmin && (
              <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-white/5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Admin Login</p>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Username"
                  className="mb-2 w-full rounded-lg border border-slate-300/50 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-brand-rose dark:border-white/20 dark:bg-black/20 dark:text-white"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="mb-2 w-full rounded-lg border border-slate-300/50 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-brand-rose dark:border-white/20 dark:bg-black/20 dark:text-white"
                />
                <button
                  onClick={handleAdminLogin}
                  className="w-full rounded-lg bg-gradient-to-r from-brand-rose to-brand-pink px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Login to Admin Dashboard
                </button>
              </div>
            )}

            <button
              onClick={() => handleAction('Profile Settings')}
              className="w-full rounded-lg bg-slate-100/70 px-3 py-2 text-left transition hover:bg-slate-200/70 dark:bg-white/5 dark:hover:bg-white/10"
            >
              👤 Profile Settings
            </button>
            <button
              onClick={() => handleAction('Account Details')}
              className="w-full rounded-lg bg-slate-100/70 px-3 py-2 text-left transition hover:bg-slate-200/70 dark:bg-white/5 dark:hover:bg-white/10"
            >
              📊 Account Details
            </button>
            <button
              onClick={() => handleAction('logout')}
              className="w-full rounded-lg bg-brand-rose/20 px-3 py-2 text-left text-brand-pink transition hover:bg-brand-rose/30"
            >
              🔐 Logout
            </button>
          </div>
        </div>
      )}

      {authMessage && (
        <p className="w-full rounded-xl bg-brand-rose/15 px-3 py-2 text-xs text-brand-pink dark:text-brand-rose">
          {authMessage}
        </p>
      )}
    </header>
  );
}
