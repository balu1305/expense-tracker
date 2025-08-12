'use client';

import { useState, useEffect } from 'react';
import { Expense } from './ExpenseForm';
import { loadExpensesFromStorage, deleteExpenseFromStorage } from '@/lib/storage';
import { downloadCSV, generateFilename, getExpensesInDateRange } from '@/lib/csvUtils';

interface ExpenseListProps {
  refreshTrigger?: number;
}

export function ExpenseList({ refreshTrigger }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const categoryEmojis: { [key: string]: string } = {
    'Food': '🍽️',
    'Transportation': '🚗',
    'Housing': '🏠',
    'Utilities': '⚡',
    'Entertainment': '🎬',
    'Shopping': '🛍️',
    'Healthcare': '🏥',
    'Education': '📚',
    'Travel': '✈️',
    'Insurance': '🛡️',
    'Savings': '💰',
    'Other': '📋'
  };

  // Load expenses from storage
  useEffect(() => {
    loadExpenses();
  }, [refreshTrigger]);

  const loadExpenses = () => {
    setIsLoading(true);
    try {
      const loadedExpenses = loadExpensesFromStorage();
      setExpenses(loadedExpenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      const updatedExpenses = deleteExpenseFromStorage(expenseId);
      setExpenses(updatedExpenses);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const expensesToExport = getExpensesInDateRange(
        filteredExpenses,
        filter.startDate,
        filter.endDate
      );
      
      const filename = generateFilename(
        filter.startDate,
        filter.endDate,
        filter.category
      );
      
      downloadCSV(expensesToExport, filename);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = !filter.category || expense.category === filter.category;
    const matchesDateRange =
      (!filter.startDate || expense.date >= filter.startDate) &&
      (!filter.endDate || expense.date <= filter.endDate);
    const matchesSearch = !searchTerm || 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDateRange && matchesSearch;
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expenseCount = filteredExpenses.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div className="card">
          <div className="flex items-center justify-center py-8">
            <div className="loading-spinner w-8 h-8"></div>
            <span className="ml-3 text-gray-600 font-medium">Loading expenses...</span>
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          {/* Stats Overview */}
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Expense Overview</h2>
                <p className="text-sm text-gray-600">
                  {expenseCount} expense{expenseCount !== 1 ? 's' : ''} found
                  {filter.category && ` in ${filter.category}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {formatCurrency(totalAmount)}
                </p>
                {expenseCount > 0 && (
                  <p className="text-xs text-gray-500">
                    Avg: {formatCurrency(totalAmount / expenseCount)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card space-y-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="form-label">
                Search Expenses
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search by description or category..."
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="startDate" className="form-label">
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
                <label htmlFor="endDate" className="form-label">
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
                <label htmlFor="categoryFilter" className="form-label">
                  Category
                </label>
                <select
                  id="categoryFilter"
                  value={filter.category}
                  onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">📊 All Categories</option>
                  <option value="Food">🍽️ Food & Dining</option>
                  <option value="Transportation">🚗 Transportation</option>
                  <option value="Housing">🏠 Housing & Rent</option>
                  <option value="Utilities">⚡ Utilities</option>
                  <option value="Entertainment">🎬 Entertainment</option>
                  <option value="Shopping">🛍️ Shopping</option>
                  <option value="Healthcare">🏥 Healthcare</option>
                  <option value="Education">📚 Education</option>
                  <option value="Travel">✈️ Travel</option>
                  <option value="Insurance">🛡️ Insurance</option>
                  <option value="Savings">💰 Savings & Investment</option>
                  <option value="Other">📋 Other</option>
                </select>
              </div>

              <div className="flex items-end space-x-2">
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting || filteredExpenses.length === 0}
                  className={`btn-secondary flex items-center space-x-2 flex-1 ${
                    isExporting || filteredExpenses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isExporting ? (
                    <>
                      <div className="loading-spinner w-4 h-4"></div>
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Export</span>
                    </>
                  )}
                </button>
                <button
                  onClick={loadExpenses}
                  className="btn-primary flex items-center space-x-2 px-4"
                  title="Refresh"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Expense List */}
          {filteredExpenses.length === 0 ? (
            <div className="card text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
              <p className="text-gray-600">
                {expenses.length === 0 
                  ? 'Start by adding your first expense above.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="card hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl">{categoryEmojis[expense.category] || '📋'}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {expense.description}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(expense.date)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span>{expense.category}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          {formatCurrency(expense.amount)}
                        </p>
                      </div>
                      
                      {deleteConfirmId === expense.id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(expense.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete expense"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading expenses...</span>
        </div>
      )}

      {!isLoading && (
        <>
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
                <option value="Travel">Travel</option>
                <option value="Insurance">Insurance</option>
                <option value="Savings">Savings & Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-gradient-to-r from-blue-50 to-brown-50 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-3xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-600">Count</p>
                  <p className="text-2xl font-semibold text-gray-800">{expenseCount}</p>
                </div>
                {filteredExpenses.length > 0 && (
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-600">Average</p>
                    <p className="text-2xl font-semibold text-gray-800">
                      ₹{(totalAmount / expenseCount).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting || filteredExpenses.length === 0}
                  className={`btn-secondary flex items-center space-x-2 ${
                    isExporting || filteredExpenses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isExporting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Export CSV</span>
                    </>
                  )}
                </button>
                <button
                  onClick={loadExpenses}
                  className="btn-primary flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Expense Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="table-header">Date</th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Category</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="table-cell">{expense.date}</td>
                    <td className="table-cell font-medium text-gray-900">{expense.description}</td>
                    <td className="table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {expense.category}
                      </span>
                    </td>
                    <td className="table-cell font-medium text-blue-600">₹{expense.amount.toFixed(2)}</td>
                    <td className="table-cell">
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-150"
                        title="Delete expense"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      {expenses.length === 0 
                        ? 'No expenses found. Add your first expense to get started!'
                        : 'No expenses found for the selected filters.'
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
