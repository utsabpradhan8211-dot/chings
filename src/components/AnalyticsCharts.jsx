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

  const regionShare = useMemo(() => {
    const index = regionData.labels.indexOf(selectedRegion);
    return regionData.datasets[0].data[index] ?? 0;
  }, [regionData.datasets, regionData.labels, selectedRegion]);

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
    <section className="grid gap-4 xl:grid-cols-2">
      <div className="glass rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Market growth trend</h3>
        <Line data={growthData} options={lineOptions} />
        <p className="mt-3 rounded-lg bg-rose-400/10 px-3 py-2 text-sm">
          Selected month: <span className="font-semibold">{selectedMonth}</span> • Growth:{' '}
          <span className="font-semibold">{monthValue}%</span>
        </p>
      </div>
      <div className="glass rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Regional share</h3>
        <Doughnut data={regionData} options={doughnutOptions} />
        <p className="mt-3 rounded-lg bg-purple-400/10 px-3 py-2 text-sm">
          Selected region: <span className="font-semibold">{selectedRegion}</span> • Share:{' '}
          <span className="font-semibold">{regionShare}%</span>
        </p>
      </div>
    </section>
  );
}
