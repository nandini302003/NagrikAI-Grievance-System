import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, StatCard } from '../../components/common/Card';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { getCitizenComplaints } from '../../services/api';
import { Home, FileText, PlusCircle, Bell, User, LayoutDashboard, Search, Filter } from 'lucide-react';

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const sidebarLinks = [
    { name: 'Dashboard', path: '/citizen', icon: LayoutDashboard },
    { name: 'My Complaints', path: '/citizen/complaints', icon: FileText },
    { name: 'Submit New', path: '/submit', icon: PlusCircle },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Back to Home', path: '/', icon: Home },
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getCitizenComplaints();
        setComplaints(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  const filteredComplaints = complaints.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Good morning, Citizen</h1>
        <p className="text-gray-500 dark:text-gray-400">Track and manage your grievances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <StatCard title="Total Complaints" value={stats.total} icon={FileText} />
        <StatCard title="Pending" value={stats.pending} icon={Bell} />
        <StatCard title="In Progress" value={stats.inProgress} icon={Filter} />
        <StatCard title="Resolved" value={stats.resolved} icon={User} />
      </div>

      <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Complaints</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ID or Category..."
              className="input-field pl-9 py-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Complaint ID</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredComplaints.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No complaints found.</td></tr>
              ) : (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {complaint.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {complaint.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {new Date(complaint.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link to={`/track`} className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
