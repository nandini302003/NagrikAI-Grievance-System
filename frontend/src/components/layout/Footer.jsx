import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                NagrikAI
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your Voice. Smarter Governance. AI-powered multilingual public grievance management platform.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/submit" className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">Submit Complaint</Link></li>
              <li><Link to="/track" className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">Track Complaint</Link></li>
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Tech Stack
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-500 dark:text-gray-400">React & Tailwind</li>
              <li className="text-sm text-gray-500 dark:text-gray-400">FastAPI (Future)</li>
              <li className="text-sm text-gray-500 dark:text-gray-400">XLM-RoBERTa (Future)</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex items-center justify-between">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © 2026 NagrikAI. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            BTech CSE-AIML Project
          </p>
        </div>
      </div>
    </footer>
  );
}
