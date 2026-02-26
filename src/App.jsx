import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import KPISection from './components/KPISection';
import OrdersPanel from './components/OrdersPanel';
import AnalyticsCharts from './components/AnalyticsCharts';
import Insights from './components/Insights';
import Products from './components/Products';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="glass flex h-64 items-center justify-center rounded-2xl">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-300/30 border-t-rose-400" />
        </div>
      );
    }

    if (activeTab === 'Dashboard') {
      return (
        <div className="space-y-4">
          <KPISection />
          <OrdersPanel search={search} showRecentActivity />
        </div>
      );
    }
    if (activeTab === 'Analytics') return <AnalyticsCharts />;
    if (activeTab === 'Insights') return <Insights />;
    if (activeTab === 'Orders') return <OrdersPanel search={search} />;
    if (activeTab === 'Products') return <Products />;

    return null;
  }, [activeTab, loading, search]);

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen p-4 transition-colors duration-300 md:p-6 ${
          darkMode
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100'
            : 'bg-gradient-to-br from-slate-100 via-white to-rose-50 text-slate-900'
        }`}
      >
        <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_1fr]">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="space-y-4">
            <Topbar
              search={search}
              setSearch={setSearch}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {content}
            </motion.div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
