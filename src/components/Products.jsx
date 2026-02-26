import { useState } from 'react';

const catalog = [
  { id: 1, name: 'Kimchi Noodles', price: 129 },
  { id: 2, name: 'Hot Garlic Noodles', price: 149 },
  { id: 3, name: 'Cheese Ramen Bowl', price: 199 },
];

export default function Products() {
  const [cart, setCart] = useState([]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    const razorpayAvailable = typeof window !== 'undefined' && window.Razorpay;
    if (razorpayAvailable) {
      const rzp = new window.Razorpay({
        key: 'rzp_test_1234567890',
        amount: total * 100,
        currency: 'INR',
        name: "Ching's Korean",
        description: 'Test checkout',
        handler: () => alert('Payment successful in test mode'),
      });
      rzp.open();
    } else {
      alert('Razorpay SDK not loaded. Simulating test checkout.');
    }
  };

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {catalog.map((product) => (
          <article key={product.id} className="glass rounded-2xl p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-slate-300">₹{product.price}</p>
            <button
              onClick={() => setCart((prev) => [...prev, product])}
              className="mt-3 rounded-lg bg-gradient-to-r from-rose-400 to-pink-500 px-3 py-2 text-sm"
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 glass-strong rounded-2xl p-4">
        <p className="text-sm">Cart items: {cart.length}</p>
        <p className="text-sm">Total: ₹{total}</p>
        <button
          disabled={!cart.length}
          onClick={checkout}
          className="mt-2 rounded-lg bg-gradient-to-r from-rose-400 to-pink-500 px-3 py-2 text-sm disabled:opacity-50"
        >
          Pay with Razorpay
        </button>
      </div>
    </section>
  );
}
