import { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Ticket, CheckCircle, Clock, Bot, Activity, AlertCircle, RefreshCw
} from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function HomePage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetrics = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/dashboard/metrics?t=${new Date().getTime()}`, {
      credentials: 'include',
      cache: 'no-store',
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin text-indigo-500">
          <RefreshCw size={32} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-red-500">
        <AlertCircle size={48} className="mb-4" />
        <p className="text-lg font-medium">Failed to load dashboard metrics</p>
        <p className="text-sm opacity-80">{error}</p>
        <button 
          onClick={fetchMetrics}
          className="mt-6 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Transform data for charts
  const statusData = metrics?.statusBreakdown 
    ? Object.entries(metrics.statusBreakdown).map(([name, value]) => ({ name, value }))
    : [];
    
  const categoryData = metrics?.categoryBreakdown
    ? Object.entries(metrics.categoryBreakdown).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Key metrics and support performance</p>
        </div>
        <button 
          onClick={fetchMetrics}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Tickets Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Ticket size={24} />
            </div>
            <h3 className="text-gray-500 font-medium">Total Tickets</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">{metrics.totalTicketsDaily}</span>
            <span className="text-sm text-gray-500 mb-1">Today</span>
          </div>
          <div className="mt-4 text-sm text-gray-500 border-t border-gray-50 pt-4">
            <span className="font-semibold text-gray-700">{metrics.totalTicketsWeekly}</span> this week
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-gray-500 font-medium">Resolution Rate</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {metrics.resolutionRatePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-500 border-t border-gray-50 pt-4">
            Across all time
          </div>
        </div>

        {/* Average Response Time */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Clock size={24} />
            </div>
            <h3 className="text-gray-500 font-medium">Avg Response</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {metrics.averageResponseTimeHours.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 mb-1">hours</span>
          </div>
          <div className="mt-4 text-sm text-gray-500 border-t border-gray-50 pt-4">
            Time to first response
          </div>
        </div>

        {/* AI Ratio */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <Bot size={24} />
            </div>
            <h3 className="text-gray-500 font-medium">AI Handled</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {(metrics.aiHandledRatio * 100).toFixed(0)}%
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-500 border-t border-gray-50 pt-4">
            <span className="font-semibold text-gray-700">{metrics.aiHandledTickets}</span> AI vs <span className="font-semibold text-gray-700">{metrics.humanHandledTickets}</span> Human
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Status Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-indigo-500" />
            Tickets by Status
          </h3>
          {statusData.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {statusData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-sm text-gray-600">{entry.name} ({entry.value})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No status data available
            </div>
          )}
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Tickets by Category</h3>
          {categoryData.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No category data available
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
