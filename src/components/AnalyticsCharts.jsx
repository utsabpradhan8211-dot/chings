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

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <div className="glass rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Market growth trend</h3>
        <Line data={growthData} />
      </div>
      <div className="glass rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Regional share</h3>
        <Doughnut data={regionData} />
      </div>
    </section>
  );
}
