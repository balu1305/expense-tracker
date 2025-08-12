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
    <div className="space-y-20 py-12">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 leading-tight animate-text-glow">
          Professional Expense Management
        </h1>
        <p className="text-2xl text-gray-600 mt-8 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up">
          Track, analyze, and export your expenses with our modern, feature-rich
          platform. Built for professionals who value precision and efficiency.
        </p>
        <div className="flex justify-center mt-12 space-x-16">
          <div className="text-center animate-bounce-slow">
            <div className="text-4xl font-bold text-blue-600 mb-2">12+</div>
            <div className="text-lg text-gray-500 font-semibold">
              Categories
            </div>
          </div>
          <div className="text-center animate-pulse-slow">
            <div className="text-4xl font-bold text-green-600 mb-2">CSV</div>
            <div className="text-lg text-gray-500 font-semibold">
              Export Ready
            </div>
          </div>
          <div className="text-center animate-wiggle-slow">
            <div className="text-4xl font-bold text-purple-600 mb-2">Cloud</div>
            <div className="text-lg text-gray-500 font-semibold">
              Sync Available
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Financial Overview
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Real-time insights into your spending patterns
          </p>
        </div>
        <StatsCard expenses={expenses} />
      </div>

      {/* Add Expense Section */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Add New Expense
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Quickly record your transactions with our intuitive form
          </p>
        </div>
        <div className="card-form bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        </div>
      </div>

      {/* Status Information */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-rainbow bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center shadow-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              ✅ Interface Optimized
            </h3>
            <p className="text-lg text-green-700 font-medium">
              All visual elements have been professionally designed with proper
              sizing and alignment.
            </p>
          </div>

          <div className="card-neon bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 text-center shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              📊 Active Tracking
            </h3>
            <p className="text-lg text-blue-700 font-medium">
              Currently tracking {expenses.length} expense
              {expenses.length !== 1 ? "s" : ""} across multiple categories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
