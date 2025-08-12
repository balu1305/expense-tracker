import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Track your daily expenses and save them to CSV',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-custom">
        <div className="max-w-7xl mx-auto">
          <header className="py-6 px-4">
            <nav className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-blue-600">
                ExpenseTracker
              </h1>
              <div className="flex items-center space-x-4">
                <button className="btn-primary">Export CSV</button>
                <button className="btn-secondary">Settings</button>
              </div>
            </nav>
          </header>
          <main className="px-4 py-8">
            {children}
          </main>
          <footer className="px-4 py-6 text-center text-gray-600 border-t border-gray-200">
            <p>© 2025 ExpenseTracker. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
