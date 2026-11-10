import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Building, Settings, ChevronRight } from 'lucide-react';
import { Card } from '../components/common/Card';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('officer');

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'officer') {
      navigate('/officer'); // Ab seedha dashboard par bhejenge
    } else if (role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:items-center bg-gradient-to-br from-primary-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 text-center max-w-lg px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">NagrikAI</h1>
          <p className="text-xl text-primary-100 mb-12">Your Voice. Smarter Governance.</p>
          
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
              <Brain className="h-6 w-6 text-primary-300 mb-2" />
              <p className="text-white font-medium">AI-Powered</p>
              <p className="text-xs text-primary-200 mt-1">Smart classification & routing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
              <Shield className="h-6 w-6 text-primary-300 mb-2" />
              <p className="text-white font-medium">Secure</p>
              <p className="text-xs text-primary-200 mt-1">End-to-end data protection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative">
        <div className="absolute top-4 left-4 lg:hidden">
           <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">NagrikAI</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm lg:w-96 animate-fade-in">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue.
            </p>
          </div>

          <div className="mt-8">
            <Card className="p-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Role</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('officer')}
                      className={`flex flex-col items-center p-3 rounded-lg border text-sm transition-all ${
                        role === 'officer' 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                          : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Building className="h-5 w-5 mb-1" />
                      Officer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex flex-col items-center p-3 rounded-lg border text-sm transition-all ${
                        role === 'admin' 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                          : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Settings className="h-5 w-5 mb-1" />
                      Admin
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    className="input-field"
                    placeholder={`demo.${role}@nagrikai.gov.in`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    className="input-field"
                    placeholder="••••••••"
                    defaultValue="demo123"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  Continue as {role.charAt(0).toUpperCase() + role.slice(1)}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}