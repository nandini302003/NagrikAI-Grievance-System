import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { LayoutDashboard, Users, Brain, FileText, PieChart, User, Mail, Shield, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  const sidebarLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'All Complaints', path: '/admin/complaints', icon: FileText },
    { name: 'Departments', path: '/admin/departments', icon: Users },
    { name: 'AI Analytics', path: '/admin/ai', icon: Brain },
    { name: 'Reports', path: '/admin/reports', icon: PieChart },
    { name: 'Profile', path: '/admin/profile', icon: User },
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences.</p>
      </div>

      <div className="max-w-3xl">
        <Card className="overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-primary-600 to-indigo-600"></div>
          
          <div className="px-8 pb-8">
            {/* Avatar & Basic Info */}
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="flex items-end gap-6">
                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Administrator</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Super Admin Access</p>
                </div>
              </div>
              <button className="btn-primary mb-2">Edit Profile</button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email Address</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">admin@nagrikai.gov.in</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone Number</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Location</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Municipal HQ, Bhubaneswar</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Access Level</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Full System Access</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}