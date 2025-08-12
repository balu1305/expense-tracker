'use client';

import { useState } from 'react';
import { ExpenseForm, Expense } from '@/components/ExpenseForm'
import { ExpenseList } from '@/components/ExpenseList'
import { GoogleSheetsSetup } from '@/components/GoogleSheetsSetup'

export default function Home() {
  // Use this to trigger refresh in ExpenseList when new expense is added
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleExpenseAdded = (expense: Expense) => {
    // Trigger refresh in ExpenseList
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="page-title">
          Professional Expense Management
        </h1>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          Track, analyze, and export your expenses with our modern, feature-rich platform. 
          Built for professionals who value precision and efficiency.
        </p>
        <div className="flex justify-center mt-6 space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">12+</div>
            <div className="text-sm text-gray-500">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">CSV</div>
            <div className="text-sm text-gray-500">Export Ready</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">Cloud</div>
            <div className="text-sm text-gray-500">Sync Available</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Expense Form */}
        <div className="xl:col-span-4">
          <div className="card slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="section-title">Add New Expense</h2>
            </div>
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </div>
        </div>

        {/* Expense Overview */}
        <div className="xl:col-span-8">
          <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="section-title">Expense Analytics</h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Live Data
                </span>
              </div>
            </div>
            <ExpenseList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats Card */}
        <div className="card-compact slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">System Status</h3>
          </div>
          <div className="space-y-3">
            <div className="stat-item">
              <span className="stat-label">Local Storage:</span>
              <span className="stat-value text-green-600">✓ Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Data Format:</span>
              <span className="stat-value text-blue-600">CSV Ready</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Export Status:</span>
              <span className="stat-value text-purple-600">Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Performance:</span>
              <span className="stat-value text-green-600">Optimal</span>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="card-compact slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Core Features</h3>
          </div>
          <ul className="space-y-3">
            <li className="feature-item">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Real-time expense tracking</span>
            </li>
            <li className="feature-item">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Advanced CSV export</span>
            </li>
            <li className="feature-item">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Smart date filtering</span>
            </li>
            <li className="feature-item">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Category management</span>
            </li>
            <li className="feature-item">
              <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Google Sheets sync (setup required)</span>
            </li>
          </ul>
        </div>

        {/* Analytics Preview */}
        <div className="card-compact slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Analytics Preview</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-blue-600 font-medium mb-1">Monthly Spending</div>
              <div className="text-2xl font-bold text-blue-800">Start tracking to see data</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-600 font-medium mb-1">Top Category</div>
              <div className="text-lg font-semibold text-green-800">Add expenses to analyze</div>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-amber-600 font-medium mb-1">Average per Day</div>
              <div className="text-lg font-semibold text-amber-800">Begin your journey</div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sheets Integration */}
      <div className="slide-up" style={{ animationDelay: '0.5s' }}>
        <GoogleSheetsSetup />
      </div>
    </div>
  )
}
