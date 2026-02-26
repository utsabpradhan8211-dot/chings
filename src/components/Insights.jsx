const cards = [
  {
    title: 'Hallyu Effect',
    text: 'Leverage K-drama and K-pop fandom to accelerate demand spikes in metros.',
  },
  {
    title: 'Pricing Ladder',
    text: 'Anchor with ₹50 value seekers then upgrade to premium heat-level variants.',
  },
  {
    title: 'Retail Theatre',
    text: 'Use in-store displays + recipe cards to trigger trial and repeat lift.',
  },
];

export default function Insights() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="glass rounded-2xl p-4">
          <h3 className="font-semibold">{card.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{card.text}</p>
        </article>
      ))}
    </section>
  );
}
