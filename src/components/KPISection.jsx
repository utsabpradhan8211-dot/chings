import { motion } from 'framer-motion';

const kpis = [
  { title: 'Awareness', value: '15–20% share of search' },
  { title: 'Trial', value: '60–70% MT sell-through' },
  { title: 'Repeat', value: '25–30% repurchase + 15–20% heat-level upgrade' },
  { title: 'Distribution', value: '35–40% MT penetration' },
  {
    title: 'Impact',
    value: 'Even 5% conversion from ₹50 consumers unlocks scalable premium growth',
  },
];

export default function KPISection() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {kpis.map((kpi, index) => (
        <motion.article
          key={kpi.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          className="glass rounded-2xl p-4"
        >
          <p className="text-xs uppercase tracking-widest text-slate-300">{kpi.title}</p>
          <p className="mt-2 text-sm font-semibold text-white">{kpi.value}</p>
        </motion.article>
      ))}
    </section>
  );
}
