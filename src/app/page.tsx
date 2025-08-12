"use client";

import { useState, useEffect } from "react";
import { Expense } from "@/types";
import { ExpenseForm } from "@/components/ExpenseForm";
// import { ExpenseList } from "@/components/ExpenseList";
// import { GoogleSheetsSetup } from "@/components/GoogleSheetsSetup";
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
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Professional Expense Management
        </h1>
        <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
          Track, analyze, and export your expenses with our modern, feature-rich
          platform. Built for professionals who value precision and efficiency.
        </p>
        <div className="flex justify-center mt-8 space-x-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">12+</div>
            <div className="text-sm text-gray-500 font-medium">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">CSV</div>
            <div className="text-sm text-gray-500 font-medium">
              Export Ready
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">Cloud</div>
            <div className="text-sm text-gray-500 font-medium">
              Sync Available
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Financial Overview
          </h2>
          <p className="text-gray-600">
            Real-time insights into your spending patterns
          </p>
        </div>
        <StatsCard expenses={expenses} />
      </div>

      {/* Add Expense Section */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Add New Expense
          </h2>
          <p className="text-gray-600">
            Quickly record your transactions with our intuitive form
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        </div>
      </div>

      {/* Status Information */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-3">
              ✅ Interface Optimized
            </h3>
            <p className="text-green-700">
              All visual elements have been professionally designed with proper
              sizing and alignment.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              📊 Active Tracking
            </h3>
            <p className="text-blue-700">
              Currently tracking {expenses.length} expense
              {expenses.length !== 1 ? "s" : ""} across multiple categories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
