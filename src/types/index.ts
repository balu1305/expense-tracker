export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface ExpenseFormProps {
  onExpenseAdded?: (expense: Expense) => void;
}

export interface ExpenseTrackerData {
  expenses: Expense[];
  lastUpdated: string;
  version: string;
}

export interface AppSettings {
  currency: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'auto';
  autoSave: boolean;
  exportFormat: 'csv' | 'json' | 'excel';
  defaultCategory: string;
  csvExportPath: string;
}
