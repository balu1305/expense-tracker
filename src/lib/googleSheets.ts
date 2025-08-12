import { Expense } from '@/types';

// Google Sheets API configuration
// You'll need to set these in your environment variables or config
const GOOGLE_SHEETS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || '',
  spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID || '',
  range: 'Expenses!A:E', // Adjust based on your sheet structure
};

export interface GoogleSheetsRow {
  values: (string | number)[];
}

/**
 * Convert expense to Google Sheets row format
 */
export function expenseToSheetsRow(expense: Expense): GoogleSheetsRow {
  return {
    values: [
      expense.date,
      expense.description,
      expense.amount,
      expense.category,
      expense.id,
    ],
  };
}

/**
 * Convert Google Sheets row to expense format
 */
export function sheetsRowToExpense(row: (string | number)[]): Expense | null {
  if (row.length < 5) return null;
  
  return {
    date: String(row[0]),
    description: String(row[1]),
    amount: Number(row[2]) || 0,
    category: String(row[3]),
    id: String(row[4]),
  };
}

/**
 * Append expenses to Google Sheets
 * Note: This requires proper Google Sheets API setup and authentication
 */
export async function appendExpensesToSheets(expenses: Expense[]): Promise<boolean> {
  try {
    if (!GOOGLE_SHEETS_CONFIG.apiKey || !GOOGLE_SHEETS_CONFIG.spreadsheetId) {
      console.warn('Google Sheets API not configured');
      return false;
    }

    const rows = expenses.map(expense => expenseToSheetsRow(expense).values);
    
    // This is a simplified example. In a real implementation, you'd need:
    // 1. Proper OAuth2 authentication
    // 2. Google Sheets API client setup
    // 3. Error handling and retry logic
    
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.range}:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: rows,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Failed to append expenses to Google Sheets:', error);
    return false;
  }
}

/**
 * Read expenses from Google Sheets
 */
export async function readExpensesFromSheets(): Promise<Expense[]> {
  try {
    if (!GOOGLE_SHEETS_CONFIG.apiKey || !GOOGLE_SHEETS_CONFIG.spreadsheetId) {
      console.warn('Google Sheets API not configured');
      return [];
    }

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${GOOGLE_SHEETS_CONFIG.range}?key=${GOOGLE_SHEETS_CONFIG.apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const data = await response.json();
    const rows = data.values || [];
    
    // Skip header row and convert to expenses
    const expenses: Expense[] = [];
    for (let i = 1; i < rows.length; i++) {
      const expense = sheetsRowToExpense(rows[i]);
      if (expense) {
        expenses.push(expense);
      }
    }

    return expenses;
  } catch (error) {
    console.error('Failed to read expenses from Google Sheets:', error);
    return [];
  }
}

/**
 * Sync local expenses with Google Sheets
 */
export async function syncWithGoogleSheets(localExpenses: Expense[]): Promise<{
  success: boolean;
  synced: number;
  errors: string[];
}> {
  const result = {
    success: false,
    synced: 0,
    errors: [] as string[],
  };

  try {
    // Read existing expenses from sheets
    const sheetExpenses = await readExpensesFromSheets();
    const sheetExpenseIds = new Set(sheetExpenses.map(e => e.id));
    
    // Find new expenses to sync
    const newExpenses = localExpenses.filter(expense => !sheetExpenseIds.has(expense.id));
    
    if (newExpenses.length === 0) {
      result.success = true;
      return result;
    }

    // Append new expenses
    const appendSuccess = await appendExpensesToSheets(newExpenses);
    
    if (appendSuccess) {
      result.success = true;
      result.synced = newExpenses.length;
    } else {
      result.errors.push('Failed to append expenses to Google Sheets');
    }

    return result;
  } catch (error) {
    result.errors.push(`Sync error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return result;
  }
}

/**
 * Create a Google Sheets setup guide
 */
export function getGoogleSheetsSetupGuide(): {
  steps: string[];
  requirements: string[];
  exampleEnv: string;
} {
  return {
    steps: [
      '1. Go to Google Cloud Console (console.cloud.google.com)',
      '2. Create a new project or select existing project',
      '3. Enable Google Sheets API for your project',
      '4. Create credentials (API Key) for the Sheets API',
      '5. Create a Google Sheets document',
      '6. Add headers: Date, Description, Amount, Category, ID',
      '7. Share the sheet with "Anyone with the link can edit"',
      '8. Copy the spreadsheet ID from the URL',
      '9. Add environment variables to your .env.local file',
    ],
    requirements: [
      'Google Cloud Platform account',
      'Google Sheets API enabled',
      'API Key with Sheets API access',
      'Google Sheets document with proper headers',
    ],
    exampleEnv: `# .env.local
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here`,
  };
}

/**
 * Validate Google Sheets configuration
 */
export function validateGoogleSheetsConfig(): {
  isValid: boolean;
  missingConfig: string[];
} {
  const missing: string[] = [];
  
  if (!GOOGLE_SHEETS_CONFIG.apiKey) {
    missing.push('NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY');
  }
  
  if (!GOOGLE_SHEETS_CONFIG.spreadsheetId) {
    missing.push('NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID');
  }
  
  return {
    isValid: missing.length === 0,
    missingConfig: missing,
  };
}
