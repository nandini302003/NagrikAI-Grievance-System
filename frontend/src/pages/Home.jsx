import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function Home() {
  const features = [
    {
      title: 'Multilingual AI',
      desc: 'Submit complaints in Hindi, English, Hinglish and supported Indian languages.'
    },
    {
      title: 'Smart Classification',
      desc: 'AI understands complaint context and identifies the correct category.'
    },
    {
      title: 'Priority Detection',
      desc: 'Urgent complaints are automatically identified and prioritized.'
    },
    {
      title: 'Automatic Routing',
      desc: 'Complaints are intelligently routed to the appropriate department.'
    }
  ];

  const categories = [
    { name: 'Water Supply' },
    { name: 'Roads' },
    { name: 'Electricity' },
    { name: 'Sanitation' },
    { name: 'Healthcare' },
    { name: 'Education' },
    { name: 'Transport' },
    { name: 'Public Safety' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl opacity-50 dark:opacity-20 animate-pulse-slow"></div>
          <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl opacity-50 dark:opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-fade-in">
                AI-Powered Public Grievance Platform
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6 animate-slide-up">
                Turn Your Complaint <br className="hidden lg:block"/> Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">Action.</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Submit a public grievance in your own language. NagrikAI understands your complaint, identifies its priority, and routes it to the right department.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/submit" className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2 group">
                  Submit a Complaint
                </Link>
                <Link to="/track" className="btn-secondary text-lg px-8 py-3 flex items-center justify-center">
                  Track Complaint
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">12k+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Processed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">94.2%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">AI Accuracy</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">18</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Departments</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Languages</p>
                </div>
              </div>
            </div>

            {/* AI Visualization Card */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="glass-card rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-indigo-500"></div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">AI Analysis</h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    Verified
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Complaint</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      "Road ka condition bahut kharab hai, gadi chalana muskil ho raha hai."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Language</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Hinglish</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Roads</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Priority</p>
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400">HIGH</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Confidence</p>
                      <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">94.2%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Routed Department</p>
                    <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                      <span className="text-sm font-semibold">Road Department</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Intelligent Grievance Management</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From complaint submission to resolution, AI makes every step smarter.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400">Four simple steps to faster resolution.</p>
          </div>
          
          <div className="relative">
            {/* Connecting line desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-gray-200 via-primary-300 to-gray-200 dark:from-gray-700 dark:via-primary-700 dark:to-gray-700 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {[
                { step: '01', title: 'SUBMIT', desc: 'Describe your complaint in your preferred language.' },
                { step: '02', title: 'UNDERSTAND', desc: 'AI analyzes the complaint and understands its context.' },
                { step: '03', title: 'PRIORITIZE', desc: 'AI determines the urgency and category.' },
                { step: '04', title: 'ROUTE', desc: 'The complaint is assigned to the appropriate department.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center relative group">
                  <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 dark:text-primary-400 shadow-md border-4 border-gray-50 dark:border-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white dark:bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Supported Categories</h2>
            <p className="text-gray-600 dark:text-gray-400">Our AI model is trained to recognize issues across major civic domains.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
                <div key={i} className="flex items-center p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-md transition-shadow dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-gray-200">{cat.name}</span>
                </div>
              )
            )}
          </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Have a complaint? Let NagrikAI handle the routing.</h2>
          <p className="text-primary-100 text-lg mb-10">Experience the future of public grievance management today.</p>
          <Link to="/submit" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-primary-900 bg-white hover:bg-gray-50 transition-colors shadow-xl hover:shadow-2xl">
            Submit Your Complaint
          </Link>
        </div>
      </section>
    </Layout>
  );
}