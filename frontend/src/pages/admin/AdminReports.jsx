import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { LayoutDashboard, Users, Brain, FileText, PieChart, User, Download, TrendingUp } from 'lucide-react';

export default function AdminReports() {
  const [stats, setStats] = useState({ total: 0, urgent: 0, resolved: 0 });
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
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/complaints");
        const data = await response.json();
        
        const total = data.length;
        const urgent = data.filter(c => c.priority === 'URGENT').length;
        const resolved = data.filter(c => c.status === 'Resolved').length;
        
        setStats({ total, urgent, resolved });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">Generate and view summary reports of the grievance system.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Total Activity</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-sm text-gray-500 mt-2">Total complaints received this period</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Urgent Issues</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.urgent}</p>
          <p className="text-sm text-gray-500 mt-2">High priority complaints requiring attention</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <PieChart className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Resolution Rate</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
          </p>
          <p className="text-sm text-gray-500 mt-2">Percentage of complaints resolved</p>
        </Card>
      </div>

      <Card className="p-12 text-center border-dashed border-2 border-gray-300 dark:border-gray-700">
        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Detailed PDF Reports Coming Soon</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          This section will allow you to generate and download detailed PDF reports of monthly performance, department efficiency, and AI accuracy.
        </p>
      </Card>
    </DashboardLayout>
  );
}