import { useMemo, useState } from 'react';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
);

export default function AnalyticsCharts() {
  const [selectedMonth, setSelectedMonth] = useState('Jun');
  const [selectedRegion, setSelectedRegion] = useState('Metro');

  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Market Growth %',
        data: [11, 14, 17, 16, 19, 24],
        borderColor: '#fb7185',
        backgroundColor: 'rgba(251,113,133,0.2)',
        tension: 0.35,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const regionData = {
    labels: ['Metro', 'Tier 1', 'Tier 2', 'Quick Commerce'],
    datasets: [
      {
        data: [37, 26, 18, 19],
        backgroundColor: ['#fb7185', '#ec4899', '#a855f7', '#f9a8d4'],
      },
    ],
  };

  const monthValue = useMemo(() => {
    const index = growthData.labels.indexOf(selectedMonth);
    return growthData.datasets[0].data[index] ?? 0;
  }, [growthData.datasets, growthData.labels, selectedMonth]);

  const previousMonthValue = useMemo(() => {
    const index = growthData.labels.indexOf(selectedMonth);
    return growthData.datasets[0].data[Math.max(0, index - 1)] ?? 0;
  }, [growthData.datasets, growthData.labels, selectedMonth]);

  const growthDelta = monthValue - previousMonthValue;

  const regionShare = useMemo(() => {
    const index = regionData.labels.indexOf(selectedRegion);
    return regionData.datasets[0].data[index] ?? 0;
  }, [regionData.datasets, regionData.labels, selectedRegion]);

  const topRegion = useMemo(() => {
    const maxShare = Math.max(...regionData.datasets[0].data);
    const index = regionData.datasets[0].data.indexOf(maxShare);
    return `${regionData.labels[index]} (${maxShare}%)`;
  }, [regionData.datasets, regionData.labels]);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    onClick: (_, elements) => {
      if (!elements.length) return;
      const pointIndex = elements[0].index;
      setSelectedMonth(growthData.labels[pointIndex]);
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
    onClick: (_, elements) => {
      if (!elements.length) return;
      const regionIndex = elements[0].index;
      setSelectedRegion(regionData.labels[regionIndex]);
    },
  };

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Selected month growth</p>
          <p className="mt-1 text-2xl font-bold text-rose-300">{monthValue}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">Month: {selectedMonth}</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Growth delta</p>
          <p className="mt-1 text-2xl font-bold text-pink-300">{growthDelta >= 0 ? '+' : ''}{growthDelta}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">vs previous month</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Top performing region</p>
          <p className="mt-1 text-2xl font-bold text-purple-300">{topRegion}</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">Selected share: {regionShare}%</p>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="glass rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold">Market growth trend</h3>
            <div className="flex gap-2">
              {growthData.labels.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`rounded-full px-2 py-1 text-xs ${
                    selectedMonth === month ? 'bg-rose-400/30 text-rose-200' : 'bg-white/10'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
          <Line data={growthData} options={lineOptions} />
          <p className="mt-3 rounded-lg bg-rose-400/10 px-3 py-2 text-sm">
            Selected month: <span className="font-semibold">{selectedMonth}</span> • Growth:{' '}
            <span className="font-semibold">{monthValue}%</span>
          </p>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold">Regional share</h3>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="rounded-lg border border-white/20 bg-transparent px-2 py-1 text-xs"
            >
              {regionData.labels.map((region) => (
                <option key={region} value={region} className="text-slate-900">
                  {region}
                </option>
              ))}
            </select>
          </div>
          <Doughnut data={regionData} options={doughnutOptions} />
          <p className="mt-3 rounded-lg bg-purple-400/10 px-3 py-2 text-sm">
            Selected region: <span className="font-semibold">{selectedRegion}</span> • Share:{' '}
            <span className="font-semibold">{regionShare}%</span>
          </p>
        </div>
      </div>
    </section>
  );
}
