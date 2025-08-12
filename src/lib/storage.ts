import { Expense, ExpenseTrackerData, AppSettings } from '@/types';

const STORAGE_KEY = 'expense-tracker-data';
const SETTINGS_KEY = 'expense-tracker-settings';

const defaultSettings: AppSettings = {
  defaultCategory: '',
  autoSave: true,
  csvExportPath: '',
  theme: 'light',
  currency: '₹',
  dateFormat: 'dd/MM/yyyy',
  exportFormat: 'csv',
};

/**
 * Save expenses to localStorage
 */
export function saveExpensesToStorage(expenses: Expense[]): void {
  try {
    const data: ExpenseTrackerData = {
      expenses,
      lastUpdated: new Date().toISOString(),
      version: '1.0.0',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save expenses to localStorage:', error);
  }
}

/**
 * Load expenses from localStorage
 */
export function loadExpensesFromStorage(): Expense[] {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return [];
    
    const data: ExpenseTrackerData = JSON.parse(storedData);
    return data.expenses || [];
  } catch (error) {
    console.error('Failed to load expenses from localStorage:', error);
    return [];
  }
}

/**
 * Add a new expense and save to storage
 */
export function addExpenseToStorage(expense: Expense): Expense[] {
  const expenses = loadExpensesFromStorage();
  const updatedExpenses = [...expenses, expense];
  saveExpensesToStorage(updatedExpenses);
  return updatedExpenses;
}

/**
 * Update an existing expense
 */
export function updateExpenseInStorage(expenseId: string, updatedExpense: Partial<Expense>): Expense[] {
  const expenses = loadExpensesFromStorage();
  const updatedExpenses = expenses.map(expense =>
    expense.id === expenseId ? { ...expense, ...updatedExpense } : expense
  );
  saveExpensesToStorage(updatedExpenses);
  return updatedExpenses;
}

/**
 * Delete an expense
 */
export function deleteExpenseFromStorage(expenseId: string): Expense[] {
  const expenses = loadExpensesFromStorage();
  const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
  saveExpensesToStorage(updatedExpenses);
  return updatedExpenses;
}

/**
 * Clear all expenses from storage
 */
export function clearExpensesFromStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get storage statistics
 */
export function getStorageStats(): {
  totalExpenses: number;
  totalAmount: number;
  lastUpdated: string | null;
  storageSize: number;
} {
  const expenses = loadExpensesFromStorage();
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const storedData = localStorage.getItem(STORAGE_KEY);
  const storageSize = storedData ? new Blob([storedData]).size : 0;
  
  const data = storedData ? JSON.parse(storedData) : null;
  const lastUpdated = data?.lastUpdated || null;
  
  return {
    totalExpenses: expenses.length,
    totalAmount,
    lastUpdated,
    storageSize,
  };
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: Partial<AppSettings>): void {
  try {
    const currentSettings = loadSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
  } catch (error) {
    console.error('Failed to save settings to localStorage:', error);
  }
}

/**
 * Load settings from localStorage
 */
export function loadSettings(): AppSettings {
  try {
    const storedSettings = localStorage.getItem(SETTINGS_KEY);
    if (!storedSettings) return defaultSettings;
    
    return { ...defaultSettings, ...JSON.parse(storedSettings) };
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error);
    return defaultSettings;
  }
}

/**
 * Export all data for backup
 */
export function exportAllData(): {
  expenses: Expense[];
  settings: AppSettings;
  exportDate: string;
} {
  return {
    expenses: loadExpensesFromStorage(),
    settings: loadSettings(),
    exportDate: new Date().toISOString(),
  };
}

/**
 * Import data from backup
 */
export function importAllData(data: {
  expenses: Expense[];
  settings?: AppSettings;
}): void {
  if (data.expenses) {
    saveExpensesToStorage(data.expenses);
  }
  if (data.settings) {
    saveSettings(data.settings);
  }
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}
