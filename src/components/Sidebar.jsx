const tabs = ['Dashboard', 'Analytics', 'Insights', 'Orders', 'Products'];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="glass h-full w-full rounded-3xl p-5 lg:w-72">
      <div className="rounded-2xl bg-gradient-to-r from-brand-rose via-brand-pink to-brand-plum p-[1px] shadow-glow">
        <div className="rounded-2xl bg-white/90 px-4 py-3 dark:bg-slate-950/80">
          <p className="text-sm text-slate-500 dark:text-slate-300">Brand</p>
          <h1 className="bg-gradient-to-r from-brand-rose to-brand-pink bg-clip-text text-xl font-bold text-transparent">
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
                  ? 'bg-gradient-to-r from-brand-rose/30 to-brand-pink/30 text-slate-900 shadow-glow ring-1 ring-brand-rose/40 dark:text-white'
                  : 'text-slate-600 hover:bg-black/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
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
