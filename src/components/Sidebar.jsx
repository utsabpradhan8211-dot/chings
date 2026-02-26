const tabs = ['Dashboard', 'Analytics', 'Insights', 'Orders', 'Products'];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="glass h-full w-full rounded-3xl p-5 lg:w-72">
      <div className="rounded-2xl bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 p-[1px] shadow-glow">
        <div className="rounded-2xl bg-slate-950/80 px-4 py-3">
          <p className="text-sm text-slate-300">Brand</p>
          <h1 className="bg-gradient-to-r from-rose-300 to-pink-400 bg-clip-text text-xl font-bold text-transparent">
            Ching&apos;s Korean
          </h1>
        </div>
      </div>
      <nav className="mt-7 space-y-2">
        {tabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ease-in-out ${
                active
                  ? 'bg-gradient-to-r from-rose-400/30 to-pink-500/30 text-white shadow-glow ring-1 ring-rose-300/40'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
