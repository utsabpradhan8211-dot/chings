const catalog = [
  { id: 1, name: 'Kimchi Noodles', price: 129, orders: 1420, trend: '+8.2%' },
  { id: 2, name: 'Hot Garlic Noodles', price: 149, orders: 1195, trend: '+5.4%' },
  { id: 3, name: 'Cheese Ramen Bowl', price: 199, orders: 860, trend: '+3.1%' },
];

export default function Products() {
  const totalOrders = catalog.reduce((sum, item) => sum + item.orders, 0);

  return (
    <section className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <h3 className="text-sm font-semibold">Product order performance</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
          Total orders across listed products: <span className="font-semibold">{totalOrders}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {catalog.map((product) => (
          <article key={product.id} className="glass rounded-2xl p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-slate-400">MRP: ₹{product.price}</p>
            <p className="mt-3 text-2xl font-bold text-rose-300">{product.orders}</p>
            <p className="text-xs text-slate-500 dark:text-slate-300">Orders this month</p>
            <span className="mt-3 inline-block rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-300">
              Growth: {product.trend}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
