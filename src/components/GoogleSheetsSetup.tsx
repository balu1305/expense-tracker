"use client";

import { useState } from "react";
import {
  getGoogleSheetsSetupGuide,
  validateGoogleSheetsConfig,
} from "@/lib/googleSheets";

export function GoogleSheetsSetup() {
  const [showGuide, setShowGuide] = useState(false);
  const setupGuide = getGoogleSheetsSetupGuide();
  const validation = validateGoogleSheetsConfig();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Google Sheets Integration
        </h3>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            validation.isValid
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {validation.isValid ? "Configured" : "Setup Required"}
        </div>
      </div>

      {!validation.isValid && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>Missing Configuration:</strong>
          </p>
          <ul className="text-sm text-yellow-700 list-disc list-inside">
            {validation.missingConfig.map((config) => (
              <li key={config}>{config}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          Connect your expense tracker to Google Sheets for automatic data
          backup and advanced analysis.
        </p>

        <button
          onClick={() => setShowGuide(!showGuide)}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            // viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>{showGuide ? "Hide" : "Show"} Setup Guide</span>
        </button>

        {showGuide && (
          <div className="space-y-6">
            {/* Requirements */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Requirements:
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {setupGuide.requirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="h-4 w-4 text-blue-500 mr-2"
                      fill="currentColor"
                      // viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Setup Steps:</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                {setupGuide.steps.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step.replace(/^\d+\.\s*/, "")}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Environment Variables */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Environment Variables:
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {setupGuide.exampleEnv}
                </pre>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Create a{" "}
                <code className="bg-gray-100 px-1 rounded">.env.local</code>{" "}
                file in your project root and add these variables.
              </p>
            </div>

            {/* Sample Sheet Structure */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Google Sheets Structure:
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                        Category
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                        ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 text-sm text-gray-600">
                        2024-01-15
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        Grocery Shopping
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        2500.00
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">Food</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        abc123def456
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your Google Sheet should have these exact column headers in the
                first row.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
