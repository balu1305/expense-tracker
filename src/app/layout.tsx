import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExpenseTracker Pro",
  description:
    "Professional expense tracking with CSV export and Google Sheets integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {/* Professional Header */}
          <header className="nav-header">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <nav className="center-nav">
                <div className="center-brand">
                  <div className="center-logo">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl center-content shadow-xl">
                      <span className="text-white text-2xl font-bold">₹</span>
                    </div>
                    <div>
                      <h1 className="text-5xl font-bold gradient-text tracking-tight">
                        ExpenseTracker Pro
                      </h1>
                      <p className="text-lg text-gray-600 font-medium mt-1">
                        Professional Finance Management
                      </p>
                    </div>
                  </div>
                </div>

                <div className="center-buttons">
                  <button className="btn-outline text-base py-3 px-6 center-content font-semibold">
                    <span className="text-xl">📁</span>
                    <span>Export All</span>
                  </button>

                  <button className="btn-secondary text-base py-3 px-6 center-content font-semibold">
                    <span className="text-xl">⚙️</span>
                    <span>Settings</span>
                  </button>
                </div>
              </nav>
            </div>
          </header>
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 py-8 text-center">
            <div className="fade-in text-center">{children}</div>
          </main>
          {/* Professional Footer */}
          <footer className="bg-white/60 backdrop-blur-md border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    ExpenseTracker Pro
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Professional expense management with advanced analytics, CSV
                    export, and cloud integration.
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Features
                  </h4>
                  <ul className="space-y-3 text-base text-gray-600">
                    <li className="flex items-center justify-center space-x-3">
                      <span className="text-green-500 text-lg font-bold">
                        ✓
                      </span>
                      <span>Real-time tracking</span>
                    </li>
                    <li className="flex items-center justify-center space-x-3">
                      <span className="text-green-500 text-lg font-bold">
                        ✓
                      </span>
                      <span>CSV export</span>
                    </li>
                    <li className="flex items-center justify-center space-x-3">
                      <span className="text-green-500 text-lg font-bold">
                        ✓
                      </span>
                      <span>Cloud sync</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Support
                  </h4>
                  <div className="space-y-3">
                    <p className="text-base text-gray-600">
                      Built with modern web technologies for optimal
                      performance.
                    </p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                        Next.js
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800">
                        TypeScript
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                        Tailwind
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-8 pt-6">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 text-center">
                  <p className="text-base text-gray-500 font-medium text-center">
                    © 2025 ExpenseTracker Pro. Built for professional expense
                    management.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-base text-gray-500">
                    <span className="font-medium">Version 1.0.0</span>
                    <span>•</span>
                    <span>Made with ❤️</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
