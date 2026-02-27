const menuItems = [
  { label: 'Dashboard', icon: '🏠' },
  { label: 'Analytics', icon: '📈' },
  { label: 'Insights', icon: '🧠' },
  { label: 'Orders', icon: '📦' },
  { label: 'Complaints', icon: '🛎️' },
  { label: 'Products', icon: '🍜' },
  { label: 'Assets', icon: '🖼️' },
];

const koreanVisuals = [
  {
    title: 'Seoul Street Style',
    image:
      'https://images.unsplash.com/photo-1538485399081-7c8971301af8?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'K-Food Mood',
    image:
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="glass h-full w-full rounded-3xl p-4 sm:p-5 lg:w-72">
      <div className="rounded-2xl bg-gradient-to-r from-brand-rose via-brand-pink to-brand-plum p-[1px] shadow-glow">
        <div className="rounded-2xl bg-white/90 px-4 py-3 dark:bg-slate-950/80">
          <p className="text-sm text-slate-500 dark:text-slate-300">Brand</p>
          <h1 className="bg-gradient-to-r from-brand-rose to-brand-pink bg-clip-text text-xl font-bold text-transparent">
            Ching&apos;s Korean
          </h1>
        </div>
      </div>
      <nav className="mt-7 space-y-2">
        {menuItems.map((item) => {
          const active = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ease-in-out ${
                active
                  ? 'bg-gradient-to-r from-brand-rose/30 to-brand-pink/30 text-slate-900 shadow-glow ring-1 ring-brand-rose/40 dark:text-white'
                  : 'text-slate-600 hover:bg-black/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-6 space-y-3">
        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">Korean vibe</p>
        {koreanVisuals.map((visual) => (
          <article key={visual.title} className="overflow-hidden rounded-xl border border-white/20">
            <img src={visual.image} alt={visual.title} className="h-20 w-full object-cover" />
            <p className="bg-black/20 px-3 py-2 text-xs">{visual.title}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}
