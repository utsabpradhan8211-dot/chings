export default function Topbar({ search, setSearch, darkMode, setDarkMode }) {
  return (
    <header className="glass flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tables, charts, products..."
        className="min-w-60 flex-1 rounded-xl border border-white/20 bg-black/20 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-300 focus:border-rose-300"
      />
      <button className="glass rounded-xl px-3 py-2 text-sm">🔔 4</button>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="glass rounded-xl px-3 py-2 text-sm"
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
      <div className="glass-strong flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
        <span className="inline-block h-7 w-7 rounded-full bg-gradient-to-r from-rose-300 to-pink-500" />
        Admin
      </div>
    </header>
  );
}
