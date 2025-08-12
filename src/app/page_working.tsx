"use client";

import { useState, useEffect } from "react";
import { Expense } from "@/types";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { StatsCard } from "@/components/StatsCard";
import { loadExpensesFromStorage } from "@/lib/storage";

export default function Home() {
  // Use this to trigger refresh in ExpenseList when new expense is added
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses for stats
  useEffect(() => {
    const loadedExpenses = loadExpensesFromStorage();
    setExpenses(loadedExpenses);
  }, [refreshTrigger]);

  const handleExpenseAdded = (expense: Expense) => {
    // Trigger refresh in ExpenseList and reload stats
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="page-title">Professional Expense Management</h1>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          Track, analyze, and export your expenses with our modern, feature-rich
          platform. Built for professionals who value precision and efficiency.
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

      {/* Statistics Dashboard */}
      <div className="slide-up" style={{ animationDelay: "0.3s" }}>
        <StatsCard expenses={expenses} />
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expense Form */}
        <div className="slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="section-title">Add New Expense</h2>
            </div>
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </div>
        </div>

        {/* Expense List */}
        <div className="slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="dashboard-card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 className="section-title">Expense History</h2>
                <span className="flex items-center text-green-600 text-sm font-medium">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Add Buttons */}
        <div className="slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="dashboard-card hover:shadow-lg transition-shadow duration-300">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Actions
              </h3>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>🚗</span>
                <span>Add Transport</span>
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>🍽️</span>
                <span>Add Food</span>
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>🛍️</span>
                <span>Add Shopping</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="slide-up" style={{ animationDelay: "0.7s" }}>
          <div className="dashboard-card hover:shadow-lg transition-shadow duration-300">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                  📊
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Statistics updated</p>
                  <p className="text-xs text-gray-500">Live tracking active</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">
                  💾
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Data synchronized</p>
                  <p className="text-xs text-gray-500">Auto-save enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Export */}
        <div className="slide-up" style={{ animationDelay: "0.8s" }}>
          <div className="dashboard-card hover:shadow-lg transition-shadow duration-300">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">
                Tools & Export
              </h3>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>📊</span>
                <span>Generate Report</span>
              </button>
              <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>📁</span>
                <span>Export CSV</span>
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>☁️</span>
                <span>Cloud Setup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
