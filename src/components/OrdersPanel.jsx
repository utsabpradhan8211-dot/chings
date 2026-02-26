import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const keys = [
  ['received', 'Orders Received'],
  ['delivered', 'Orders Delivered'],
  ['complaints_received', 'Complaints Received'],
  ['complaints_resolved', 'Complaints Resolved'],
];

const initial = {
  received: 1247,
  delivered: 1156,
  complaints_received: 23,
  complaints_resolved: 19,
};

const initialRows = [
  { id: 'CK-1091', city: 'Mumbai', status: 'Delivered', value: 1290 },
  { id: 'CK-1092', city: 'Delhi', status: 'Pending', value: 990 },
  { id: 'CK-1093', city: 'Bengaluru', status: 'Resolved', value: 1490 },
  { id: 'CK-1094', city: 'Pune', status: 'Delivered', value: 1190 },
];

const statusClasses = {
  Delivered: 'bg-emerald-400/20 text-emerald-300',
  Pending: 'bg-amber-400/20 text-amber-300',
  Resolved: 'bg-sky-400/20 text-sky-300',
};

function Counter({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.6, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-2xl font-bold"
    >
      {value.toLocaleString()}
    </motion.span>
  );
}

export default function OrdersPanel({ search, showRecentActivity = false }) {
  const [ordersData, setOrdersData] = useState(initial);
  const [editing, setEditing] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState(initialRows);

  const status = useMemo(() => {
    const pending = ordersData.received - ordersData.delivered;
    const openComplaints =
      ordersData.complaints_received - ordersData.complaints_resolved;
    return { pending, openComplaints };
  }, [ordersData]);

  const progress = Math.min(
    100,
    Math.round((ordersData.delivered / Math.max(1, ordersData.received)) * 100),
  );

  const filtered = keys.filter(([, label]) =>
    label.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredRows = rows.filter((row) =>
    `${row.id} ${row.city} ${row.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setOrdersData((prev) => ({
        ...prev,
        received: prev.received + Math.floor(Math.random() * 3),
        delivered: prev.delivered + Math.floor(Math.random() * 3),
        complaints_received:
          prev.complaints_received + (Math.random() > 0.75 ? 1 : 0),
        complaints_resolved:
          prev.complaints_resolved + (Math.random() > 0.8 ? 1 : 0),
      }));
      setRows((prev) =>
        prev.map((row, i) =>
          i === 1 && Math.random() > 0.5
            ? { ...row, status: row.status === 'Pending' ? 'Delivered' : 'Pending' }
            : row,
        ),
      );
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const updateMetric = () => {
    if (!editing) return;
    if (!Number.isNaN(Number(inputValue))) {
      setOrdersData((prev) => ({ ...prev, [editing]: Number(inputValue) }));
      setEditing('');
      setInputValue('');
    }
  };

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map(([key, label]) => (
          <div key={key} className="glass rounded-2xl p-4">
            <p className="text-sm text-slate-300">{label}</p>
            <Counter value={ordersData[key]} />
            <button
              onClick={() => {
                setEditing(key);
                setInputValue(String(ordersData[key]));
              }}
              className="mt-3 rounded-lg bg-rose-400/20 px-2 py-1 text-xs hover:bg-rose-400/30"
            >
              Manual override
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-4"
          >
            <label className="text-sm">Set {editing.replace('_', ' ')}</label>
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-40 rounded-lg border border-white/20 bg-black/30 px-3 py-2"
              />
              <button
                onClick={updateMetric}
                className="rounded-lg bg-gradient-to-r from-rose-400 to-pink-500 px-3 py-2"
              >
                Update
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-2xl p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm">Delivered / Received</p>
          <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-300">
            {progress}% Delivered
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
          />
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-full bg-amber-400/20 px-2 py-1 text-amber-300">
            Pending: {status.pending}
          </span>
          <span className="rounded-full bg-rose-400/20 px-2 py-1 text-rose-200">
            Open Complaints: {status.openComplaints}
          </span>
          <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-300">
            Resolved
          </span>
        </div>
      </div>

      <div className="glass overflow-x-auto rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Real-time orders table</h3>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-300">
            <tr>
              <th className="pb-2">Order ID</th>
              <th className="pb-2">City</th>
              <th className="pb-2">Value</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="py-2">{row.id}</td>
                <td>{row.city}</td>
                <td>₹{row.value}</td>
                <td>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${statusClasses[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showRecentActivity && (
        <div className="glass rounded-2xl p-4">
          <h3 className="mb-3 text-sm font-semibold">Recent activity</h3>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• New order CK-1095 placed from Hyderabad.</li>
            <li>• Complaint #23 resolved in under 2 hours.</li>
            <li>• Delivery SLA improved by 4.1% this week.</li>
          </ul>
        </div>
      )}
    </section>
  );
}
