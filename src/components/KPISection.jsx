import { motion } from 'framer-motion';
import { useState } from 'react';

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

const details = {
  Awareness:
    'Search share indicates brand recall against key spicy-noodle competitors.\nFocus media bursts around K-content moments to increase top-of-funnel intent.\nTarget top 20 metro pincodes for accelerated share gains.\nTrack weekly movement to optimize paid and influencer investments.',
  Trial:
    'Sell-through in modern trade reflects first-purchase momentum.\nSampling-led onboarding helps convert curiosity into basket addition.\nBundle offers with Korean meal accompaniments to increase conversion.\nPrioritize stores with high repeat walk-ins for higher efficiency.',
  Repeat:
    'Repurchase and heat-level upgrades signal long-term category stickiness.\nUse loyalty nudges and recipe content to deepen product adoption.\nIntroduce tiered variants to move users from entry to premium packs.\nMonitor cohort-wise behavior by city and channel for precise actions.',
  Distribution:
    'Penetration in MT stores defines how discoverable the portfolio is.\nExpand facings in high-performing outlets to reduce stock-out risk.\nImprove shelf signage and secondary displays for better conversion.\nAlign distributor incentives with depth and visibility KPIs monthly.',
  Impact:
    'Small premium conversion from value seekers creates outsized margin uplift.\nThis strategy improves revenue quality without sacrificing scale.\nSequential upgrades can lift both ASP and contribution profitability.\nFocus on high-intent cohorts where taste acceptance is already proven.',
};

export default function KPISection() {
  const [selectedKpi, setSelectedKpi] = useState(null);

  return (
    <>
      <section className="glass overflow-hidden rounded-2xl border border-white/20">
        <div className="grid gap-4 p-4 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-300">K-Wave Campaign Board</p>
            <h2 className="mt-1 text-lg font-semibold">Korean-inspired dashboard experience</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Seoul visuals and food-first storytelling are now pinned into your dashboard for a stronger Korean feel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img
              src="https://images.unsplash.com/photo-1538485399081-7c8971301af8?auto=format&fit=crop&w=600&q=80"
              alt="Seoul skyline"
              className="h-24 w-full rounded-xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=600&q=80"
              alt="Korean dish"
              className="h-24 w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi, index) => (
          <motion.article
            key={kpi.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="glass rounded-2xl p-4"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-300">{kpi.title}</p>
            <button
              onClick={() => setSelectedKpi(kpi.title)}
              className="mt-2 text-left text-sm font-semibold underline decoration-dotted underline-offset-4"
            >
              {kpi.value}
            </button>
          </motion.article>
        ))}
      </section>

      {selectedKpi && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelectedKpi(null)}>
          <div className="glass-strong max-w-lg rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">{selectedKpi} KPI breakdown</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-200">
              {details[selectedKpi]}
            </p>
            <button onClick={() => setSelectedKpi(null)} className="mt-4 rounded-lg bg-gradient-to-r from-rose-400 to-pink-500 px-3 py-2 text-sm text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
