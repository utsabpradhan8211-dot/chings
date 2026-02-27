const catalog = [
  {
    id: 1,
    tier: 'Entry',
    name: 'K-Start',
    heat: 'Mild 🌶️🌶️🌶️',
    description: 'Mild Korean garlicky goodness.',
    packSize: '70g',
    price: 55,
    image: '/assets/ai-uploads/k-bold-x2.png',
  },
  {
    id: 2,
    tier: 'Core Engine',
    name: 'K-Bold',
    heat: 'Medium 🌶️🌶️🌶️',
    description: 'Moderately spicy Korean punch.',
    packSize: '75g',
    price: 75,
    image: '/assets/ai-uploads/k-fire-cup.png',
  },
  {
    id: 3,
    tier: 'Core Engine',
    name: 'K-Fire',
    heat: 'Hot 🌶️🌶️🌶️🌶️',
    description: 'Fiery heat with Korea kick!',
    packSize: '80g',
    price: 89,
    image: '/assets/ai-uploads/k-fire.png',
  },
  {
    id: 4,
    tier: 'Combo',
    name: 'K-Bold x2',
    heat: 'Medium 🌶️🌶️🌶️',
    description: 'Twin packs of our moderately spicy K-Bold!',
    packSize: '150g',
    price: 99,
    image: '/assets/ai-uploads/k-start.png',
  },
  {
    id: 5,
    tier: 'Premium Bowl',
    name: 'K-Fire Cup',
    heat: 'Hot 🌶️🌶️🌶️🌶️',
    description: 'Late-night indulgence! Fiery Korean noodles.',
    packSize: '90g',
    price: 99,
    image: '/assets/ai-uploads/k-bold.png',
  },
];

export default function Products() {
  return (
    <section className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <h3 className="text-sm font-semibold">Korean menu catalog</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
          Updated 5-item product list mapped to assets in <span className="font-semibold">/public/assets/ai-uploads</span>.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {catalog.map((product) => (
          <article key={product.id} className="glass rounded-2xl p-4">
            <img
              src={product.image}
              alt={`${product.name} menu item`}
              className="h-40 w-full rounded-xl object-cover"
              loading="lazy"
            />
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-rose-300">{product.tier}</p>
            <div className="mt-1 flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-2xl font-bold text-rose-300">₹{product.price}</p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-300">{product.heat}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{product.description}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Pack size: {product.packSize}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
