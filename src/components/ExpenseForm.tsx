'use client';

import { useState } from 'react';
import { addExpenseToStorage } from '@/lib/storage';

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface ExpenseFormProps {
  onExpenseAdded?: (expense: Expense) => void;
}

export function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const expense: Expense = {
        id: generateId(),
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
      };

      // Validate the expense data
      if (expense.amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      // Save to local storage
      addExpenseToStorage(expense);
      
      // Notify parent component
      if (onExpenseAdded) {
        onExpenseAdded(expense);
      }
      
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });

      // Clear success message after 2 seconds
      setTimeout(() => setSubmitStatus('idle'), 2000);
      
    } catch (error) {
      console.error('Error saving expense:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="status-success">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-green-800">Success!</p>
              <p className="text-xs text-green-700">Expense has been added successfully</p>
            </div>
          </div>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="status-error">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-red-800">Error!</p>
              <p className="text-xs text-red-700">Failed to add expense. Please try again.</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="input-field"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field"
          placeholder="Enter expense description..."
          required
          disabled={isSubmitting}
          maxLength={100}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">
            {formData.description.length}/100 characters
          </p>
          {formData.description.length > 80 && (
            <p className="text-xs text-amber-600">
              {100 - formData.description.length} remaining
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="amount" className="form-label">
          Amount (₹)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 text-lg font-semibold">₹</span>
          </div>
          <input
            type="number"
            id="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="input-field pl-10"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            required
            disabled={isSubmitting}
          />
        </div>
        {formData.amount && parseFloat(formData.amount) > 0 && (
          <p className="text-xs text-blue-600 mt-1">
            Amount: ₹{parseFloat(formData.amount).toFixed(2)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="input-field"
          required
          disabled={isSubmitting}
        >
          <option value="">Choose a category...</option>
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

      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn-primary w-full flex items-center justify-center space-x-3 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="loading-spinner w-5 h-5"></div>
            <span>Adding Expense...</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Add Expense</span>
          </>
        )}
      </button>
    </form>
  );
}
