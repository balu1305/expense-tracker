"use client";

import { useState } from "react";
import { Expense, ExpenseFormProps } from "@/types";
import { addExpenseToStorage } from "@/lib/storage";

export function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

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
        throw new Error("Amount must be greater than 0");
      }

      // Save to local storage
      addExpenseToStorage(expense);

      // Notify parent component
      if (onExpenseAdded) {
        onExpenseAdded(expense);
      }

      setSubmitStatus("success");

      // Reset form
      setFormData({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      });

      // Clear success message after 2 seconds
      setTimeout(() => setSubmitStatus("idle"), 2000);
    } catch (error) {
      console.error("Error saving expense:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="status-success text-center">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">✓</span>
            </div>
            <div>
              <p className="text-sm font-bold text-green-800">Success!</p>
              <p className="text-xs text-green-700">
                Expense has been added successfully
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="status-error text-center">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">✗</span>
            </div>
            <div>
              <p className="text-sm font-bold text-red-800">Error!</p>
              <p className="text-xs text-red-700">
                Failed to add expense. Please try again.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <label
          htmlFor="date"
          className="form-label text-lg font-semibold text-gray-800"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="input-field text-center mt-2"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="text-center mb-6">
        <label
          htmlFor="description"
          className="form-label text-lg font-semibold text-gray-800"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="input-field text-center mt-2"
          placeholder="Enter expense description..."
          required
          disabled={isSubmitting}
          maxLength={100}
        />
        <div className="flex justify-center mt-2 space-x-4">
          <p className="text-xs text-gray-500">
            {formData.description.length}/100 characters
          </p>
          {formData.description.length > 80 && (
            <p className="text-xs text-amber-600 font-medium">
              {100 - formData.description.length} remaining
            </p>
          )}
        </div>
      </div>

      <div className="text-center mb-6">
        <label
          htmlFor="amount"
          className="form-label text-lg font-semibold text-gray-800"
        >
          Amount (₹)
        </label>
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 text-lg font-semibold">₹</span>
          </div>
          <input
            type="number"
            id="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="input-field pl-10 text-center"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            required
            disabled={isSubmitting}
          />
        </div>
        {formData.amount && parseFloat(formData.amount) > 0 && (
          <p className="text-sm text-blue-600 mt-2 font-medium">
            Amount: ₹{parseFloat(formData.amount).toFixed(2)}
          </p>
        )}
      </div>

      <div className="text-center mb-6">
        <label
          htmlFor="category"
          className="form-label text-lg font-semibold text-gray-800"
        >
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="input-field text-center mt-2"
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

      <div className="text-center mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full flex items-center justify-center space-x-3 text-lg font-semibold py-4 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner w-5 h-5"></div>
              <span className="text-lg">Adding Expense...</span>
            </>
          ) : (
            <>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">+</span>
              </div>
              <span className="text-lg">Add Expense</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
