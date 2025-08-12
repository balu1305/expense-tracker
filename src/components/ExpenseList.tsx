'use client';

import { useState } from 'react';
import { Expense } from './ExpenseForm';

export function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = !filter.category || expense.category === filter.category;
    const matchesDateRange =
      (!filter.startDate || expense.date >= filter.startDate) &&
      (!filter.endDate || expense.date <= filter.endDate);
    return matchesCategory && matchesDateRange;
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={filter.startDate}
            onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
            className="input-field"
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={filter.endDate}
            onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
            className="input-field"
          />
        </div>
        
        <div>
          <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="categoryFilter"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="input-field"
          >
            <option value="">All Categories</option>
            <option value="Food">Food & Dining</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing & Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-gradient-to-r from-blue-50 to-brown-50 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-3xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</p>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="table-header">
                Date
              </th>
              <th className="table-header">
                Description
              </th>
              <th className="table-header">
                Category
              </th>
              <th className="table-header">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="table-cell">
                  {expense.date}
                </td>
                <td className="table-cell font-medium text-gray-900">
                  {expense.description}
                </td>
                <td className="table-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {expense.category}
                  </span>
                </td>
                <td className="table-cell font-medium text-blue-600">
                  ₹{expense.amount.toFixed(2)}
                </td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  No expenses found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
