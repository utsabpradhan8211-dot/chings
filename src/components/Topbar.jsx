export default function Topbar({ search, setSearch, darkMode, setDarkMode }) {
  return (
    <header className="glass flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tables, charts, products..."
        className="min-w-60 flex-1 rounded-xl border border-slate-300/50 bg-white/70 px-4 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-rose-300 dark:border-white/20 dark:bg-black/20 dark:text-white dark:placeholder:text-slate-300"
      />
      <button className="glass rounded-xl px-3 py-2 text-sm">🔔 4</button>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="glass rounded-xl px-3 py-2 text-sm"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <div className="glass-strong ml-auto flex items-center gap-3 rounded-xl px-3 py-2 text-sm">
        <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-r from-rose-300 to-pink-500" />
        <div>
          <p className="font-semibold leading-tight">Aditi Sharma</p>
          <p className="text-xs text-slate-400 dark:text-slate-300">Regional Admin • Enterprise Ops</p>
        </div>
      </div>
    </header>
  );
}
