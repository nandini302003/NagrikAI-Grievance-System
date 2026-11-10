import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, StatCard } from '../../components/common/Card';
import { getAdminAnalytics } from '../../services/api';
import { LayoutDashboard, Users, Brain, FileText, PieChart, Activity, User, ShieldCheck } from 'lucide-react';
import { PieChart as RechartsPie, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const sidebarLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'All Complaints', path: '/admin/complaints', icon: FileText },
    { name: 'Departments', path: '/admin/departments', icon: Users },
    { name: 'AI Analytics', path: '/admin/ai', icon: Brain },
    { name: 'Reports', path: '/admin/reports', icon: PieChart },
    { name: 'Profile', path: '/admin/profile', icon: User }, // UPDATED
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAdminAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !analytics) {
    return (
      <DashboardLayout sidebarLinks={sidebarLinks}>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading analytics...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8 animate-fade-in flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Administration</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor grievance activity across all departments.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Normal</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <StatCard title="Total Complaints" value={analytics.totalComplaints} icon={FileText} trend="+12%" />
        <StatCard title="Pending" value={analytics.pending} icon={Activity} />
        <StatCard title="Resolution Time" value={`${analytics.avgResolutionTime} days`} icon={PieChart} trend="-5%" />
        <StatCard title="AI Accuracy" value={`${analytics.aiAccuracy}%`} icon={Brain} trend="+0.2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Card className="p-6 lg:col-span-2 flex flex-col h-96">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Complaints Overview</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.complaintsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', borderRadius: '0.5rem' }} itemStyle={{ color: '#fff' }} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="total" name="Total Received" stroke="#818cf8" fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#34d399" fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 flex flex-col h-96">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Priority Distribution</h3>
          <div className="flex-1 w-full min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie data={analytics.priorityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {analytics.priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RechartsPie>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="text-center">
                 <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                 <p className="text-xl font-bold text-gray-900 dark:text-white">{analytics.totalComplaints}</p>
               </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {analytics.priorityData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 animate-slide-up bg-gradient-to-br from-white to-primary-50/30 dark:from-gray-800 dark:to-primary-900/10 border-primary-100 dark:border-primary-900/50" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              AI Model Performance
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time metrics from the XLM-RoBERTa classification engine.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200 dark:border-green-800 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800/80 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Category Classification</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">94.2%</p>
              <span className="text-xs text-green-500 mb-1">+0.4%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/80 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Priority Classification</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">91.8%</p>
              <span className="text-xs text-green-500 mb-1">+1.2%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/80 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Confidence</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">93.4%</p>
              <span className="text-xs text-green-500 mb-1">+0.1%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/80 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Languages Supported</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              <span className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-medium">Indic</span>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}