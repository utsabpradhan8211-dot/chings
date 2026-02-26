const catalog = [
  {
    id: 1,
    name: 'Korean Fire Noodles',
    category: 'Noodles',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=640&q=70&fm=jpg',
    price: 249,
    orders: 1560,
    trend: '+8.7%',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Kimchi Fried Rice',
    category: 'Rice Bowls',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&q=70&fm=jpg',
    price: 219,
    orders: 1385,
    trend: '+6.1%',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Crispy Korean Corn',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=640&q=70&fm=jpg',
    price: 149,
    orders: 1140,
    trend: '+5.3%',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Bibimbap',
    category: 'Rice Bowls',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=640&q=70&fm=jpg',
    price: 259,
    orders: 980,
    trend: '+4.4%',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Bulgogi Bowl',
    category: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1604908176997-4316d89b7886?auto=format&fit=crop&w=640&q=70&fm=jpg',
    price: 299,
    orders: 910,
    trend: '+4.0%',
    rating: 4.7,
  },
];

export default function Products() {
  const totalOrders = catalog.reduce((sum, item) => sum + item.orders, 0);

  return (
    <section className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <h3 className="text-sm font-semibold">Product order performance</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
          Total orders across listed menu items: <span className="font-semibold">{totalOrders}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {catalog.map((product) => (
          <article key={product.id} className="glass rounded-2xl p-4">
            <img
              src={product.image}
              alt={`${product.name} menu item`}
              className="h-32 w-full rounded-xl object-cover"
              loading="lazy"
            />
            <p className="text-xs font-medium uppercase tracking-wide text-rose-300">{product.category}</p>
            <h3 className="mt-1 font-semibold">{product.name}</h3>
            <p className="text-sm text-slate-400">MRP: ₹{product.price}</p>
            <p className="mt-3 text-2xl font-bold text-rose-300">{product.orders}</p>
            <p className="text-xs text-slate-500 dark:text-slate-300">Orders this month</p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">Growth: {product.trend}</span>
              <span className="font-medium text-amber-300">★ {product.rating}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
