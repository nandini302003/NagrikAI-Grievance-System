import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { LayoutDashboard, FileText, AlertTriangle, CheckCircle2, User, Shield, Building } from 'lucide-react';

export default function OfficerProfile() {
  const [department, setDepartment] = useState('Public Works Department');

  useEffect(() => {
    const savedDept = localStorage.getItem('officerDepartment');
    if (savedDept) {
      setDepartment(savedDept);
    }
  }, []);

  const sidebarLinks = [
    { name: 'Dashboard', path: '/officer', icon: LayoutDashboard },
    { name: 'Complaints', path: '/officer/complaints', icon: FileText },
    { name: 'High Priority', path: '/officer/priority', icon: AlertTriangle },
    { name: 'Resolved', path: '/officer/resolved', icon: CheckCircle2 },
    { name: 'Profile', path: '/officer/profile', icon: User }, 
  ];

  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Officer Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Your account details.</p>
      </div>

      <div className="max-w-3xl">
        <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="flex items-end gap-6">
                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Department Officer</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{department}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Department</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{department}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Access Level</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Department Access</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}