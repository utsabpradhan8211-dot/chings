import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const keys = [
  ['received', 'Orders Received'],
  ['delivered', 'Orders Delivered'],
];

const initial = {
  received: 1247,
  delivered: 1156,
};

const initialRows = [
  { id: 'CK-1091', city: 'Mumbai', status: 'Delivered', value: 1290 },
  { id: 'CK-1092', city: 'Delhi', status: 'Pending', value: 990 },
  { id: 'CK-1093', city: 'Bengaluru', status: 'Resolved', value: 1490 },
  { id: 'CK-1094', city: 'Pune', status: 'Delivered', value: 1190 },
];

const statusClasses = {
  Delivered: 'bg-emerald-400/20 text-emerald-700 dark:text-emerald-300',
  Pending: 'bg-amber-400/20 text-amber-700 dark:text-amber-300',
  Resolved: 'bg-sky-400/20 text-sky-700 dark:text-sky-300',
};

const availableStatuses = ['Delivered', 'Pending', 'Resolved'];
const complaintStatuses = ['Open', 'Investigating', 'Resolved', 'Escalated'];

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

export default function OrdersPanel({ search, showRecentActivity = false, isAdmin = false }) {
  const [ordersData, setOrdersData] = useState(initial);
  const [editing, setEditing] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pairedValue, setPairedValue] = useState('');
  const [overrideMessage, setOverrideMessage] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [complaints, setComplaints] = useState(complaintRows);

  const status = useMemo(() => {
    const pending = ordersData.received - ordersData.delivered;
    return { pending };
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
      setOrdersData((prev) => {
        const nextReceived = prev.received + Math.floor(Math.random() * 3);
        const nextDelivered = Math.min(
          nextReceived,
          prev.delivered + Math.floor(Math.random() * 3),
        );

        return {
          ...prev,
          received: nextReceived,
          delivered: nextDelivered,
        };
      });
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
    setOverrideMessage('');

    const nextValue = Number(inputValue);
    const nextPairedValue = Number(pairedValue);

    if (Number.isNaN(nextValue)) return;

    if (editing === 'received') {
      if (Number.isNaN(nextPairedValue)) {
        setOverrideMessage('Please provide delivered orders along with received orders.');
        return;
      }

      if (nextPairedValue > nextValue) {
        setOverrideMessage('Not valid: delivered orders cannot be more than received orders.');
        return;
      }

      setOrdersData((prev) => ({ ...prev, received: nextValue, delivered: nextPairedValue }));
    } else if (editing === 'delivered') {
      if (nextValue > ordersData.received) {
        setOverrideMessage('Not valid: delivered orders cannot be more than received orders.');
        return;
      }

      setOrdersData((prev) => ({ ...prev, delivered: nextValue }));
    } else {
      setOrdersData((prev) => ({ ...prev, [editing]: nextValue }));
    }

    setEditing('');
    setInputValue('');
    setPairedValue('');
  };

  const updateRowStatus = (id, nextStatus) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row)));
  };

  const updateComplaintStatus = (id, nextStatus) => {
    setComplaints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)),
    );
  };

  return (
    <section className="space-y-4 text-slate-800 dark:text-slate-100">
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(([key, label]) => (
          <div key={key} className="glass rounded-2xl p-4">
            <p className="text-sm text-slate-700 dark:text-slate-300">{label}</p>
            <Counter value={ordersData[key]} />
            {isAdmin ? (
              <button
                onClick={() => {
                  setEditing(key);
                  setInputValue(String(ordersData[key]));
                  setPairedValue(key === 'received' ? String(ordersData.delivered) : '');
                  setOverrideMessage('');
                }}
                className="mt-3 rounded-lg bg-brand-rose/20 px-2 py-1 text-xs hover:bg-brand-rose/30"
              >
                Manual override
              </button>
            ) : (
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                Login as admin to use manual override
              </p>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-4"
          >
            <label className="text-sm">Set {editing.replace('_', ' ')}</label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full rounded-lg border border-slate-300/60 bg-white/80 px-3 py-2 text-slate-900 placeholder:text-slate-500 dark:border-white/20 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-400 sm:w-40"
              />
              {editing === 'received' && (
                <input
                  type="number"
                  value={pairedValue}
                  onChange={(e) => setPairedValue(e.target.value)}
                  placeholder="Delivered orders"
                  className="w-full rounded-lg border border-slate-300/60 bg-white/80 px-3 py-2 text-slate-900 placeholder:text-slate-500 dark:border-white/20 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-400 sm:w-44"
                />
              )}
              <button
                onClick={updateMetric}
                className="rounded-lg bg-gradient-to-r from-brand-rose to-brand-pink px-3 py-2"
              >
                Update
              </button>
            </div>
            {overrideMessage && <p className="mt-2 text-xs text-rose-700 dark:text-rose-300">{overrideMessage}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-2xl p-4">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">Delivered / Received</p>
          <span className="w-fit rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
            {progress}% Delivered
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-brand-rose to-brand-pink"
          />
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-full bg-amber-400/20 px-2 py-1 text-amber-700 dark:text-amber-300">
            Pending: {status.pending}
          </span>
          <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-700 dark:text-emerald-300">
            Delivered
          </span>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-amber-500 dark:text-amber-300">Pending orders</h3>
        <p className="mt-2 text-3xl font-bold">{status.pending}</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
          Live difference between orders received and delivered.
        </p>
      </div>

      <div className="glass overflow-x-auto rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Real-time orders table</h3>
        <table className="min-w-[620px] w-full text-left text-sm">
          <thead className="text-slate-600 dark:text-slate-300">
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
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${statusClasses[row.status]}`}
                    >
                      {row.status}
                    </span>
                    <select
                      value={row.status}
                      onChange={(e) => updateRowStatus(row.id, e.target.value)}
                      disabled={!isAdmin}
                      className="rounded-lg border border-slate-300/60 bg-white/70 px-2 py-1 text-xs text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-300/40 dark:bg-transparent dark:text-slate-100"
                    >
                      {availableStatuses.map((item) => (
                        <option key={item} value={item} className="text-slate-900">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 codex/create-separate-complaints-tab
      <div className="glass overflow-x-auto rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Complaints tracker</h3>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-600 dark:text-slate-300">
            <tr>
              <th className="pb-2">Complaint ID</th>
              <th className="pb-2">City</th>
              <th className="pb-2">Issue</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((item) => (
              <tr key={item.id} className="border-t border-white/10">
                <td className="py-2">{item.id}</td>
                <td>{item.city}</td>
                <td>{item.issue}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-400/20 text-emerald-700 dark:text-emerald-300'
                          : item.status === 'Escalated'
                            ? 'bg-purple-400/20 text-purple-700 dark:text-purple-300'
                            : item.status === 'Investigating'
                              ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300'
                              : 'bg-red-400/20 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {item.status}
                    </span>
                    <select
                      value={item.status}
                      onChange={(e) => updateComplaintStatus(item.id, e.target.value)}
                      disabled={!isAdmin}
                      className="rounded-lg border border-slate-300/60 bg-white/70 px-2 py-1 text-xs text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-300/40 dark:bg-transparent dark:text-slate-100"
                    >
                      {complaintStatuses.map((statusItem) => (
                        <option key={statusItem} value={statusItem} className="text-slate-900">
                          {statusItem}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

main
      {showRecentActivity && (
        <div className="glass rounded-2xl p-4">
          <h3 className="mb-3 text-sm font-semibold">Recent activity</h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <li>• New order CK-1095 placed from Hyderabad.</li>
            <li>• Complaint #23 resolved in under 2 hours.</li>
            <li>• Delivery SLA improved by 4.1% this week.</li>
          </ul>
        </div>
      )}
    </section>
  );
}
