import { useMemo, useState } from 'react';

const notificationItems = [
  { id: 1, title: 'Order CK-1098 delayed', detail: 'Delivery delayed by 12 mins in Bengaluru.' },
  { id: 2, title: 'New distributor onboarded', detail: 'Hyderabad East channel is now active.' },
  { id: 3, title: 'Low stock alert', detail: 'Kimchi Noodles inventory below safety stock.' },
  { id: 4, title: 'SLA milestone hit', detail: '98.4% orders delivered on time today.' },
];

export default function Topbar({ search, setSearch, darkMode, setDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [notifications, setNotifications] = useState(notificationItems);

  const unreadCount = useMemo(() => notifications.length, [notifications.length]);

  return (
    <header className="glass relative flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tables, charts, products..."
        className="min-w-60 flex-1 rounded-xl border border-slate-300/50 bg-white/70 px-4 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-rose-300 dark:border-white/20 dark:bg-black/20 dark:text-white dark:placeholder:text-slate-300"
      />

      <div className="relative">
        <button
          onClick={() => {
            setShowNotifications((prev) => !prev);
            setShowAdminMenu(false);
          }}
          className="glass rounded-xl px-3 py-2 text-sm"
        >
          🔔 {unreadCount}
        </button>
        {showNotifications && (
          <div className="absolute right-0 z-20 mt-2 w-80 rounded-2xl border border-rose-200/30 bg-white/95 p-3 shadow-2xl dark:border-white/10 dark:bg-slate-900/95">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Notifications</p>
              <button
                onClick={() => setNotifications([])}
                className="text-xs text-rose-500 hover:text-rose-400"
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
        className="glass rounded-xl px-3 py-2 text-sm"
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
          <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-r from-rose-300 to-pink-500" />
          <div>
            <p className="font-semibold leading-tight">Aditi Sharma</p>
            <p className="text-xs text-slate-400 dark:text-slate-300">Regional Admin • Enterprise Ops</p>
          </div>
        </button>

        {showAdminMenu && (
          <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-rose-200/30 bg-white/95 p-3 shadow-2xl dark:border-white/10 dark:bg-slate-900/95">
            <p className="text-sm font-semibold">Admin quick actions</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="rounded-lg bg-slate-100/70 px-3 py-2 dark:bg-white/5">👤 Profile Settings</li>
              <li className="rounded-lg bg-slate-100/70 px-3 py-2 dark:bg-white/5">📊 Account Details</li>
              <li className="rounded-lg bg-slate-100/70 px-3 py-2 dark:bg-white/5">🔐 Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
