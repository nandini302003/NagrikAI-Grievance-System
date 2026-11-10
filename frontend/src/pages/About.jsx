import React from 'react';
import Layout from '../components/layout/Layout';
import { Brain, Shield, Zap, Globe, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Technology for Smarter Governance.</h1>
          <p className="text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
            NagrikAI uses multilingual NLP and AI-assisted classification to simplify public grievance management, ensuring every citizen's voice is heard and acted upon.
          </p>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400">The architecture behind intelligent routing.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-blue-200 dark:border-blue-800">
                <Globe className="h-8 w-8" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Citizen</span>
              <span className="text-xs text-gray-500 text-center">Submits<br/>Complaint</span>
            </div>
            
            <div className="hidden md:block w-8 border-b-2 border-dashed border-gray-300 dark:border-gray-700"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-purple-200 dark:border-purple-800">
                <Brain className="h-8 w-8" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">AI Engine</span>
              <span className="text-xs text-gray-500 text-center">Understands<br/>& Classifies</span>
            </div>

            <div className="hidden md:block w-8 border-b-2 border-dashed border-gray-300 dark:border-gray-700"></div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-red-200 dark:border-red-800">
                <Shield className="h-8 w-8" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Priority</span>
              <span className="text-xs text-gray-500 text-center">Determines<br/>Urgency</span>
            </div>

            <div className="hidden md:block w-8 border-b-2 border-dashed border-gray-300 dark:border-gray-700"></div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-green-200 dark:border-green-800">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Department</span>
              <span className="text-xs text-gray-500 text-center">Routes for<br/>Resolution</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}