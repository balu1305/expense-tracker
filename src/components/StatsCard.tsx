"use client";

import { useMemo } from "react";
import { Expense } from "@/types";

interface StatsCardProps {
  expenses: Expense[];
}

export function StatsCard({ expenses }: StatsCardProps) {
  const stats = useMemo(() => {
    if (!expenses.length) {
      return {
        total: 0,
        count: 0,
        average: 0,
        thisMonth: 0,
        lastMonth: 0,
        topCategory: "None",
        topCategoryAmount: 0,
        dailyAverage: 0,
      };
    }

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const count = expenses.length;
    const average = total / count;

    // Current month expenses
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const thisMonth = expenses
      .filter((exp) => {
        const expDate = new Date(exp.date);
        return (
          expDate.getMonth() === currentMonth &&
          expDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Last month expenses
    const lastMonth = expenses
      .filter((exp) => {
        const expDate = new Date(exp.date);
        const lastMonthDate = new Date(currentYear, currentMonth - 1);
        return (
          expDate.getMonth() === lastMonthDate.getMonth() &&
          expDate.getFullYear() === lastMonthDate.getFullYear()
        );
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Category analysis
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategoryEntry = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const topCategory = topCategoryEntry ? topCategoryEntry[0] : "None";
    const topCategoryAmount = topCategoryEntry ? topCategoryEntry[1] : 0;

    // Daily average calculation
    const dates = expenses.map((exp) => new Date(exp.date));
    const oldestDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const newestDate = new Date(Math.max(...dates.map((d) => d.getTime())));
    const daysDiff = Math.max(
      1,
      Math.ceil(
        (newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
    const dailyAverage = total / daysDiff;

    return {
      total,
      count,
      average,
      thisMonth,
      lastMonth,
      topCategory,
      topCategoryAmount,
      dailyAverage,
    };
  }, [expenses]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getChangeIndicator = (current: number, previous: number) => {
    if (previous === 0) return { percent: 0, isPositive: false };
    const percent = ((current - previous) / previous) * 100;
    return { percent: Math.abs(percent), isPositive: current >= previous };
  };

  const monthChange = getChangeIndicator(stats.thisMonth, stats.lastMonth);

  const categoryEmojis: { [key: string]: string } = {
    Food: "🍽️",
    Transportation: "🚗",
    Housing: "🏠",
    Utilities: "⚡",
    Entertainment: "🎬",
    Shopping: "🛍️",
    Healthcare: "🏥",
    Education: "📚",
    Travel: "✈️",
    Insurance: "🛡️",
    Savings: "💰",
    Other: "📋",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Total Expenses */}
      <div className="stats-card card-stats-blue bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-center p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white text-3xl font-bold">₹</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-blue-700 mb-2">
              Total Expenses
            </p>
            <p className="text-3xl font-bold text-blue-900 mb-2">
              {formatCurrency(stats.total)}
            </p>
            <p className="text-sm text-blue-600 font-medium">
              {stats.count} transactions
            </p>
          </div>
        </div>
      </div>

      {/* This Month */}
      <div className="stats-card card-stats-green bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 text-center p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white text-3xl font-bold">📅</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-green-700 mb-2">
              This Month
            </p>
            <p className="text-3xl font-bold text-green-900 mb-2">
              {formatCurrency(stats.thisMonth)}
            </p>
            {stats.lastMonth > 0 && (
              <div className="flex items-center justify-center mt-2">
                <div
                  className={`flex items-center text-sm font-medium ${
                    monthChange.isPositive ? "text-red-600" : "text-green-600"
                  }`}
                >
                  <span
                    className={`mr-2 text-lg ${
                      monthChange.isPositive ? "" : ""
                    }`}
                  >
                    {monthChange.isPositive ? "📈" : "📉"}
                  </span>
                  {monthChange.percent.toFixed(1)}%
                </div>
                <span className="text-sm text-gray-500 ml-2 font-medium">
                  vs last month
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Average Expense */}
      <div className="stats-card card-stats-purple bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-center p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white text-3xl font-bold">📊</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-purple-700 mb-2">
              Average Expense
            </p>
            <p className="text-3xl font-bold text-purple-900 mb-2">
              {formatCurrency(stats.average)}
            </p>
            <p className="text-sm text-purple-600 font-medium">
              per transaction
            </p>
          </div>
        </div>
      </div>

      {/* Top Category */}
      <div className="stats-card card-stats-orange bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 text-center p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-3xl">
              {categoryEmojis[stats.topCategory] || "📊"}
            </span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-amber-700 mb-2">
              Top Category
            </p>
            <p className="text-2xl font-bold text-amber-900 mb-2">
              {stats.topCategory}
            </p>
            <p className="text-sm text-amber-600 font-medium">
              {formatCurrency(stats.topCategoryAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
