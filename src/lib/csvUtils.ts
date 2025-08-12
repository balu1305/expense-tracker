import { format } from 'date-fns';
import { Expense } from '@/components/ExpenseForm';

export interface ExpenseCSVRow {
  Date: string;
  Description: string;
  Amount: number;
  Category: string;
  ID: string;
}

/**
 * Convert expenses to CSV format
 */
export function convertToCSV(expenses: Expense[]): string {
  if (expenses.length === 0) {
    return 'Date,Description,Amount,Category,ID\n';
  }

  const headers = ['Date', 'Description', 'Amount', 'Category', 'ID'];
  const csvContent = [
    headers.join(','),
    ...expenses.map(expense => [
      expense.date,
      `"${expense.description.replace(/"/g, '""')}"`, // Escape quotes
      expense.amount.toString(),
      expense.category,
      expense.id
    ].join(','))
  ].join('\n');

  return csvContent;
}

/**
 * Download CSV file
 */
export function downloadCSV(expenses: Expense[], filename?: string): void {
  const csvContent = convertToCSV(expenses);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Generate filename based on date range
 */
export function generateFilename(startDate?: string, endDate?: string, category?: string): string {
  const today = format(new Date(), 'yyyy-MM-dd');
  let filename = `expenses_${today}`;
  
  if (startDate && endDate) {
    filename = `expenses_${startDate}_to_${endDate}`;
  } else if (startDate) {
    filename = `expenses_from_${startDate}`;
  }
  
  if (category && category !== '') {
    filename += `_${category.toLowerCase().replace(/\s+/g, '_')}`;
  }
  
  return `${filename}.csv`;
}

/**
 * Parse CSV content back to expenses
 */
export function parseCSVContent(csvContent: string): Expense[] {
  const lines = csvContent.trim().split('\n');
  if (lines.length <= 1) return []; // No data or only headers
  
  const expenses: Expense[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length >= 5) {
      expenses.push({
        date: values[0],
        description: values[1].replace(/^"|"$/g, '').replace(/""/g, '"'), // Unescape quotes
        amount: parseFloat(values[2]) || 0,
        category: values[3],
        id: values[4]
      });
    }
  }
  
  return expenses;
}

/**
 * Parse a single CSV line, handling quotes and commas
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

/**
 * Group expenses by month for organized file structure
 */
export function groupExpensesByMonth(expenses: Expense[]): Record<string, Expense[]> {
  return expenses.reduce((groups, expense) => {
    const monthKey = format(new Date(expense.date), 'yyyy-MM');
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(expense);
    return groups;
  }, {} as Record<string, Expense[]>);
}

/**
 * Calculate monthly totals
 */
export function calculateMonthlyTotals(expenses: Expense[]): Record<string, number> {
  const groups = groupExpensesByMonth(expenses);
  return Object.keys(groups).reduce((totals, month) => {
    totals[month] = groups[month].reduce((sum, expense) => sum + expense.amount, 0);
    return totals;
  }, {} as Record<string, number>);
}

/**
 * Get expenses for a specific date range
 */
export function getExpensesInDateRange(
  expenses: Expense[],
  startDate?: string,
  endDate?: string
): Expense[] {
  return expenses.filter(expense => {
    const expenseDate = expense.date;
    const matchesStart = !startDate || expenseDate >= startDate;
    const matchesEnd = !endDate || expenseDate <= endDate;
    return matchesStart && matchesEnd;
  });
}

/**
 * Get expenses by category
 */
export function getExpensesByCategory(expenses: Expense[]): Record<string, Expense[]> {
  return expenses.reduce((groups, expense) => {
    if (!groups[expense.category]) {
      groups[expense.category] = [];
    }
    groups[expense.category].push(expense);
    return groups;
  }, {} as Record<string, Expense[]>);
}
