import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackComplaint from './pages/TrackComplaint';
import Login from './pages/Login';
import About from './pages/About';
import OfficerDashboard from './pages/officer/OfficerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllComplaints from './pages/admin/AllComplaints';
import AdminDepartments from './pages/admin/AdminDepartments'; 
import Layout from './components/layout/Layout';
import { ThemeContext, useThemeState } from './hooks/useTheme';
import AdminReports from './pages/admin/AdminReports'; 
import AdminProfile from './pages/admin/AdminProfile';
import OfficerProfile from './pages/officer/OfficerProfile';

// Placeholder pages for minor routes
const PlaceholderPage = ({ title }) => (
  <Layout>
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">This page is part of the application structure but is not fully implemented in this demo.</p>
    </div>
  </Layout>
);

function App() {
  const theme = useThemeState();

  return (
    <ThemeContext.Provider value={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitComplaint />} />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/login" element={<Login />} />
          
          
          {/* Officer Routes */}
          <Route path="/officer" element={<OfficerDashboard />} />
          <Route path="/officer/complaints" element={<OfficerDashboard />} />
          <Route path="/officer/priority" element={<OfficerDashboard />} />
          <Route path="/officer/resolved" element={<OfficerDashboard />} />
          <Route path="/officer/profile" element={<OfficerProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AllComplaints />} />
          <Route path="/admin/departments" element={<AdminDepartments />} />
          <Route path="/admin/ai" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* Common Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/notifications" element={<PlaceholderPage title="Notifications Center" />} />
          {/* 404 Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;