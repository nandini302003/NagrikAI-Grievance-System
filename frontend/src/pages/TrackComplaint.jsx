import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Search, Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { trackComplaintById } from '../services/api';

export default function TrackComplaint() {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!complaintId) return;

    setLoading(true);
    setError('');
    setComplaint(null);

    try {
      const data = await trackComplaintById(complaintId);
      setComplaint(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Status ke hisaab se color aur icon
  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'text-green-600 bg-green-100 border-green-200';
    if (status === 'In Progress') return 'text-blue-600 bg-blue-100 border-blue-200';
    return 'text-yellow-600 bg-yellow-100 border-yellow-200';
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Track Your Complaint</h1>
          <p className="text-gray-600 dark:text-gray-400">Enter your Complaint ID to check the current status.</p>
        </div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                placeholder="Enter Complaint ID (e.g., 64a1f2...)"
                className="input-field pl-10 py-3 w-full"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary px-6 py-3 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Track"}
            </button>
          </form>

          {error && (
            <div className="mt-6 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {complaint && (
            <div className="mt-8 border-t border-gray-100 dark:border-gray-700 pt-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Complaint Details</h3>
                  <p className="text-sm text-gray-500 font-mono mt-1">{complaint._id}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-1">Complaint</p>
                <p className="text-gray-900 dark:text-white font-medium">"{complaint.complaint_text}"</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{complaint.predicted_category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Department</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{complaint.assigned_department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Priority</p>
                  <p className="font-semibold text-red-600 uppercase">{complaint.priority}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(complaint.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}