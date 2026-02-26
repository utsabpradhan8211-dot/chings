import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const metrics = [
  ['complaints_received', 'Complaints Received'],
  ['complaints_resolved', 'Complaints Resolved'],
];

const initialMetrics = {
  complaints_received: 23,
  complaints_resolved: 19,
};

const initialRows = [
  { id: 'CMP-201', city: 'Delhi', issue: 'Late delivery', status: 'Open' },
  { id: 'CMP-202', city: 'Mumbai', issue: 'Damaged pack', status: 'Open' },
  { id: 'CMP-203', city: 'Pune', issue: 'Wrong item', status: 'Resolved' },
  { id: 'CMP-204', city: 'Bengaluru', issue: 'Spillage in transit', status: 'Open' },
];

const complaintStatuses = ['Open', 'In Review', 'Resolved'];

const complaintStatusClasses = {
  Open: 'bg-red-400/20 text-red-700 dark:text-red-300',
  'In Review': 'bg-amber-400/20 text-amber-700 dark:text-amber-300',
  Resolved: 'bg-emerald-400/20 text-emerald-700 dark:text-emerald-300',
};

export default function ComplaintsPanel({ search, isAdmin = false }) {
  const [complaintData, setComplaintData] = useState(initialMetrics);
  const [complaintRows, setComplaintRows] = useState(initialRows);
  const [editing, setEditing] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pairedValue, setPairedValue] = useState('');
  const [overrideMessage, setOverrideMessage] = useState('');

  const openComplaints = useMemo(
    () => complaintData.complaints_received - complaintData.complaints_resolved,
    [complaintData],
  );

  const resolutionRate = Math.min(
    100,
    Math.round((complaintData.complaints_resolved / Math.max(1, complaintData.complaints_received)) * 100),
  );

  const filteredMetrics = metrics.filter(([, label]) =>
    label.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredRows = complaintRows.filter((item) =>
    `${item.id} ${item.city} ${item.issue} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setComplaintData((prev) => {
        const nextReceived = prev.complaints_received + (Math.random() > 0.75 ? 1 : 0);
        const nextResolved = Math.min(
          nextReceived,
          prev.complaints_resolved + (Math.random() > 0.8 ? 1 : 0),
        );

        return {
          complaints_received: nextReceived,
          complaints_resolved: nextResolved,
        };
      });
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const updateMetric = () => {
    const nextValue = Number(inputValue);
    const nextPairedValue = Number(pairedValue);

    if (Number.isNaN(nextValue)) return;

    if (editing === 'complaints_received') {
      if (Number.isNaN(nextPairedValue)) {
        setOverrideMessage('Please provide resolved complaints along with received complaints.');
        return;
      }

      if (nextPairedValue > nextValue) {
        setOverrideMessage('Not valid: resolved complaints cannot be more than complaints received.');
        return;
      }

      setComplaintData({ complaints_received: nextValue, complaints_resolved: nextPairedValue });
    }

    if (editing === 'complaints_resolved') {
      if (nextValue > complaintData.complaints_received) {
        setOverrideMessage('Not valid: resolved complaints cannot be more than complaints received.');
        return;
      }

      setComplaintData((prev) => ({ ...prev, complaints_resolved: nextValue }));
    }

    setEditing('');
    setInputValue('');
    setPairedValue('');
    setOverrideMessage('');
  };

  return (
    <section className="space-y-4 text-slate-800 dark:text-slate-100">
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredMetrics.map(([key, label]) => (
          <div key={key} className="glass rounded-2xl p-4">
            <p className="text-sm text-slate-700 dark:text-slate-300">{label}</p>
            <p className="text-2xl font-bold">{complaintData[key].toLocaleString()}</p>
            {isAdmin ? (
              <button
                onClick={() => {
                  setEditing(key);
                  setInputValue(String(complaintData[key]));
                  setPairedValue(
                    key === 'complaints_received' ? String(complaintData.complaints_resolved) : '',
                  );
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
                onChange={(event) => setInputValue(event.target.value)}
                className="w-full rounded-lg border border-slate-300/60 bg-white/80 px-3 py-2 text-slate-900 placeholder:text-slate-500 dark:border-white/20 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-400 sm:w-40"
              />
              {editing === 'complaints_received' && (
                <input
                  type="number"
                  value={pairedValue}
                  onChange={(event) => setPairedValue(event.target.value)}
                  placeholder="Resolved complaints"
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-brand-pink dark:text-brand-sea">Open complaints</h3>
          <p className="mt-2 text-3xl font-bold">{openComplaints}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Needs immediate follow-up.</p>
        </div>
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Resolution rate</h3>
          <p className="mt-2 text-3xl font-bold">{resolutionRate}%</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Share of complaints resolved.</p>
        </div>
        <div className="glass rounded-2xl p-4 sm:col-span-2 xl:col-span-1">
          <h3 className="mb-2 text-sm font-semibold">Progress</h3>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${resolutionRate}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-brand-rose to-brand-pink"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">{resolutionRate}% of complaints are resolved.</p>
        </div>
      </div>

      <div className="glass overflow-x-auto rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-semibold">Complaints tracker</h3>
        <table className="min-w-[700px] w-full text-left text-sm">
          <thead className="text-slate-600 dark:text-slate-300">
            <tr>
              <th className="pb-2">Complaint ID</th>
              <th className="pb-2">City</th>
              <th className="pb-2">Issue</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((item) => (
              <tr key={item.id} className="border-t border-white/10">
                <td className="py-2">{item.id}</td>
                <td>{item.city}</td>
                <td>{item.issue}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs ${complaintStatusClasses[item.status]}`}>
                      {item.status}
                    </span>
                    <select
                      value={item.status}
                      onChange={(event) => {
                        const nextStatus = event.target.value;
                        setComplaintRows((prev) =>
                          prev.map((row) => (row.id === item.id ? { ...row, status: nextStatus } : row)),
                        );
                      }}
                      disabled={!isAdmin}
                      className="rounded-lg border border-slate-300/60 bg-white/70 px-2 py-1 text-xs text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-300/40 dark:bg-transparent dark:text-slate-100"
                    >
                      {complaintStatuses.map((status) => (
                        <option key={status} value={status} className="text-slate-900">
                          {status}
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
    </section>
  );
}
