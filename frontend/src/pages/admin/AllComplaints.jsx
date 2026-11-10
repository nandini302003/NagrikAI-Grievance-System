import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { LayoutDashboard, Users, Brain, FileText, PieChart, User, Search } from 'lucide-react';

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const sidebarLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'All Complaints', path: '/admin/complaints', icon: FileText },
    { name: 'Departments', path: '/admin/departments', icon: Users },
    { name: 'AI Analytics', path: '/admin/ai', icon: Brain },
    { name: 'Reports', path: '/admin/reports', icon: PieChart },
    { name: 'Profile', path: '/admin/profile', icon: User }, // UPDATED
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(c => 
    c.complaint_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.predicted_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.assigned_department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Complaints</h1>
        <p className="text-gray-500 dark:text-gray-400">View and manage all grievances filed by citizens.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Complaint History</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints..."
              className="input-field pl-9 py-2 text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Complaint Text</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading complaints...</td></tr>
              ) : filteredComplaints.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No complaints found.</td></tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {c.complaint_text}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {c.predicted_category}
                    </td>
                    <td className="px-6 py-4 text-sm text-indigo-600 dark:text-indigo-400">
                      {c.assigned_department}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        c.priority === 'URGENT' ? 'bg-red-100 text-red-700' : 
                        c.priority === 'NORMAL' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {c.status}
                      </span>
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