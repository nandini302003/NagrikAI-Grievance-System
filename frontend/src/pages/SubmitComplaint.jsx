import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Mic, Paperclip, Send, CheckCircle2, ChevronRight, RefreshCw, AlertCircle, Brain, Languages, MessageSquare, Bell } from 'lucide-react';
import { submitComplaint } from '../services/api';

export default function SubmitComplaint() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    complaint: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysisStep, setAiAnalysisStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analysisSteps = [
    "Reading complaint...",
    "Detecting language...",
    "Understanding context...",
    "Determining priority...",
    "Finding appropriate department..."
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.name && formData.mobile && formData.location && formData.complaint;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setError('');

    const interval = setInterval(() => {
      setAiAnalysisStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    try {
      const response = await submitComplaint(formData);
      clearInterval(interval);
      
      // Short ID generate karna (last 6 chars)
      const shortId = response.id.slice(-6).toUpperCase();
      
      setResult({ ...response, shortId });
    } catch (err) {
      clearInterval(interval);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Card className="p-8 text-center animate-fade-in relative overflow-hidden bg-white dark:bg-gray-800">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-primary-500"></div>
            
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complaint Registered!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Your grievance has been successfully routed to the concerned department.</p>
            
            {/* Notification Alert */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4 rounded-lg mb-8 flex items-center justify-center gap-3 text-blue-800 dark:text-blue-300">
              <Bell className="h-5 w-5" />
              <p className="text-sm font-medium">A confirmation SMS has been sent to {formData.mobile}.</p>
            </div>

            {/* Short ID for Tracking */}
            <div className="inline-block bg-gray-50 dark:bg-gray-700/50 rounded-lg px-6 py-3 mb-8 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Your Tracking ID</p>
              <p className="text-3xl font-mono font-bold text-primary-600 dark:text-primary-400 tracking-widest">{result.shortId}</p>
              <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                <MessageSquare className="h-3 w-3" /> Save this ID to track your complaint status.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-left">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{result.category}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Priority</p>
                <p className="font-semibold text-red-600 dark:text-red-400 uppercase text-sm">{result.priority}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Department</p>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm">{result.department}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">Pending</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/track')} className="btn-primary flex items-center justify-center gap-2">
                Track Complaint
                <ChevronRight className="h-4 w-4" />
              </button>
              <button onClick={() => { setResult(null); setFormData({name:'', mobile:'', email:'', location:'', complaint:''}); setAiAnalysisStep(0); }} className="btn-secondary flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Submit Another
              </button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Submit Your Complaint</h1>
          <p className="text-gray-600 dark:text-gray-400">Tell us what happened. You can write in your preferred language.</p>
        </div>

        <Card className="p-6 md:p-8 relative overflow-hidden bg-white dark:bg-gray-800">
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-fade-in">
              <div className="w-16 h-16 relative mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary-600 dark:border-primary-400 border-t-transparent animate-spin"></div>
                <Brain className="absolute inset-0 m-auto h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Analyzing your complaint...</h3>
              <div className="space-y-3 w-64 text-left">
                {analysisSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    {idx < aiAnalysisStep ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : idx === aiAnalysisStep ? (
                      <div className="w-4 h-4 rounded-full bg-primary-500 animate-pulse"></div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                    )}
                    <span className={`${idx <= aiAnalysisStep ? 'text-gray-900 dark:text-gray-200 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Sector 4, Bhubaneswar"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex justify-between">
                <span>Complaint Description *</span>
                <span className="text-xs text-gray-500 font-normal">{formData.complaint.length}/500</span>
              </label>
              <div className="relative">
                <textarea
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleChange}
                  rows="5"
                  maxLength="500"
                  className="input-field resize-none pb-12"
                  placeholder="Example: Mere area mein 3 din se pani nahi aa raha..."
                  required
                ></textarea>
                
                {formData.complaint.length > 10 && (
                   <div className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                     <Languages className="h-3 w-3" />
                     Detecting Language...
                   </div>
                )}
                
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-b-lg px-2 py-1 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex gap-2">
                    <button type="button" className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors" title="Voice Input">
                      <Mic className="h-4 w-4" />
                    </button>
                    <button type="button" className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors" title="Attach Image">
                      <Paperclip className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                type="submit" 
                disabled={!isFormValid || isSubmitting}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Submit Complaint
              </button>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
                <Brain className="h-3 w-3" /> AI will automatically categorize and route this complaint.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}