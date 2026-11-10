import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, StatCard } from '../../components/common/Card';
import { PriorityBadge, StatusBadge } from '../../components/common/Badge';
import { LayoutDashboard, FileText, AlertTriangle, CheckCircle2, User, Filter, X, Building } from 'lucide-react';

export default function OfficerDashboard() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [department, setDepartment] = useState('Public Works Department');
  
  const departments = [
    "Public Works Department",
    "Sanitation Department",
    "Electricity Department",
    "Health Department",
    "Water Supply Department",
    "Public Safety / Emergency Services",
    "Municipal Enforcement Department",
    "General Municipal Department"
  ];

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [response, setResponse] = useState('');

  const sidebarLinks = [
    { name: 'Dashboard', path: '/officer', icon: LayoutDashboard },
    { name: 'Complaints', path: '/officer/complaints', icon: FileText },
    { name: 'High Priority', path: '/officer/priority', icon: AlertTriangle },
    { name: 'Resolved', path: '/officer/resolved', icon: CheckCircle2 },
    { name: 'Profile', path: '/officer/profile', icon: User },
  ];

  useEffect(() => {
    // LocalStorage mein department save karna (Profile page ke liye)
    localStorage.setItem('officerDepartment', department);

    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/complaints/department/${department}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        const formattedData = data.map(item => ({
          id: item._id,
          complaint: item.complaint_text,
          category: item.predicted_category,
          department: item.assigned_department,
          priority: item.priority,
          language: item.language || "English",
          status: item.status || "Pending",
          confidence: 95,
          aiInsight: `Classified as ${item.predicted_category} with ${item.priority} priority.`,
          location: "Location Data (N/A)",
        }));

        setComplaints(formattedData);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [department]);

  const stats = {
    total: complaints.length,
    critical: complaints.filter(c => c.priority === 'URGENT').length,
    high: complaints.filter(c => c.priority === 'NORMAL').length,
    medium: complaints.filter(c => c.priority === 'ROUTINE').length,
    low: 0,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  let filteredComplaints = complaints;
  
  if (currentPath === '/officer/priority') {
    filteredComplaints = complaints.filter(c => c.priority === 'URGENT' || c.priority === 'NORMAL');
  } else if (currentPath === '/officer/resolved') {
    filteredComplaints = complaints.filter(c => c.status === 'Resolved');
  } else if (currentPath === '/officer/complaints') {
    filteredComplaints = complaints;
  } else {
    filteredComplaints = filter === 'All' 
      ? complaints 
      : complaints.filter(c => c.priority === filter.toUpperCase() || c.status === filter);
  }

  const handleStatusUpdate = async (newStatus) => {
    if(!selectedComplaint) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/complaints/${selectedComplaint.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setComplaints(complaints.map(c => c.id === selectedComplaint.id ? {...c, status: newStatus} : c));
        setSelectedComplaint(null);
        setResponse('');
        alert(`Status successfully updated to: ${newStatus}`);
      } else {
        alert("Failed to update status");
      }
    } catch(err) {
      console.error(err);
    }
  };

  const getPageTitle = () => {
    if (currentPath === '/officer/priority') return 'High Priority Complaints';
    if (currentPath === '/officer/resolved') return 'Resolved Complaints';
    if (currentPath === '/officer/complaints') return 'All Department Complaints';
    return 'Officer Dashboard';
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getPageTitle()}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and resolve assigned public grievances.</p>
        </div>

        {/* Department Dropdown */}
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <Building className="h-5 w-5 text-indigo-500" />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-transparent border-none text-sm font-semibold text-gray-900 dark:text-white focus:outline-none cursor-pointer"
          >
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <StatCard title="Total" value={stats.total} icon={FileText} />
        <StatCard title="Critical" value={stats.critical} icon={AlertTriangle} />
        <StatCard title="High" value={stats.high} icon={AlertTriangle} />
        <StatCard title="Medium" value={stats.medium} icon={Filter} />
        <StatCard title="Low" value={stats.low} icon={Filter} />
        <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle2} />
      </div>

      <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full overflow-x-auto pb-2 sm:pb-0">
            {['All', 'URGENT', 'NORMAL', 'ROUTINE', 'Resolved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === f 
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        {/* Table with fixed widths to prevent scrollbar */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              <tr>
                <th className="px-4 py-4 font-medium">ID</th>
                <th className="px-4 py-4 font-medium">Summary</th>
                <th className="px-4 py-4 font-medium">Priority</th>
                <th className="px-4 py-4 font-medium">Confidence</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredComplaints.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No complaints match this filter.</td></tr>
              ) : (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {complaint.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 truncate max-w-[100px] sm:max-w-[150px]">
                      {complaint.complaint}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {complaint.confidence}%
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      <button 
                        onClick={() => setSelectedComplaint(complaint)}
                        className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal for Reviewing Complaint */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setSelectedComplaint(null)}></div>
          <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in z-10 shadow-2xl bg-white dark:bg-gray-800">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Complaint {selectedComplaint.id.slice(-6).toUpperCase()}</h2>
              <button onClick={() => setSelectedComplaint(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Original Complaint</p>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  "{selectedComplaint.complaint}"
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-4">
                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> AI Analysis
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Language</p>
                    <p className="font-semibold text-blue-900 dark:text-blue-200">{selectedComplaint.language}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Category</p>
                    <p className="font-semibold text-blue-900 dark:text-blue-200">{selectedComplaint.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Priority</p>
                    <p className="font-semibold text-red-600 dark:text-red-400 uppercase">{selectedComplaint.priority}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 dark:text-blue-400">Confidence</p>
                    <p className="font-semibold text-blue-900 dark:text-blue-200">{selectedComplaint.confidence}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-blue-700 dark:text-blue-400">AI Insight</p>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{selectedComplaint.aiInsight}</p>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add Official Response</label>
                <textarea
                  className="input-field w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows="3"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter response for the citizen..."
                ></textarea>
              </div>
            </div>

            {/* Update Status & Close */}
            <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-b-xl">
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Status:</label>
                <select 
                  value={selectedComplaint.status} 
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setSelectedComplaint(null)} className="btn-secondary px-4 py-2 rounded-lg">
                  Close
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}