import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { LayoutDashboard, Users, Brain, FileText, PieChart, User, Building } from 'lucide-react';

export default function AdminDepartments() {
  const [departmentStats, setDepartmentStats] = useState([]);
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
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/stats");
        const data = await response.json();
        
        const statsArray = Object.keys(data.department_stats).map(key => ({
          name: key,
          count: data.department_stats[key]
        }));
        
        setDepartmentStats(statsArray);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Departments Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">View complaint distribution across various municipal departments.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading department data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentStats.map((dept, index) => (
            <Card key={index} className="p-6 flex items-center gap-4 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{dept.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{dept.count}</span> Complaints Assigned
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}