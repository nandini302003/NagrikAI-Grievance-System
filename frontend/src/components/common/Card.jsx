import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}>
    {children}
  </div>
);

export const StatCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="p-6 transition-transform hover:-translate-y-1 duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
      </div>
      <div className="p-3 bg-primary-50 dark:bg-primary-900/50 rounded-lg">
        <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span className="text-green-500 font-medium">{trend}</span>
        <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
      </div>
    )}
  </Card>
);
