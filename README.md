# Professional Expense Tracker

A modern, professional expense tracking application built with Next.js, TypeScript, and Tailwind CSS. Features local data storage, CSV export functionality, and optional Google Sheets integration for cloud backup.

## ✨ Features

### Core Functionality
- **Professional UI/UX**: Clean, modern interface with blue/brown gradient theme
- **Real-time Data Entry**: Add expenses with categories, descriptions, and amounts
- **Local Storage**: Automatic data persistence in browser local storage
- **Advanced Filtering**: Filter by date range and category
- **CSV Export**: Download expenses as CSV files with smart naming
- **Data Validation**: Form validation with error handling and success feedback

### Categories Supported
- Food & Dining
- Transportation
- Housing & Rent
- Utilities
- Entertainment
- Shopping
- Healthcare
- Education
- Travel
- Insurance
- Savings & Investment
- Other

### Data Management
- **Local Storage**: Automatic saving and loading of expense data
- **CSV Export**: Generate CSV files with date-based naming
- **Date Organization**: Group and filter expenses by date ranges
- **Data Statistics**: Real-time calculation of totals and averages

### Optional Google Sheets Integration
- **Cloud Backup**: Sync data to Google Sheets for backup
- **Advanced Analysis**: Use Google Sheets for complex analysis
- **Easy Setup**: Step-by-step integration guide included

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Usage

### Adding Expenses
1. Fill out the expense form with:
   - **Date**: When the expense occurred
   - **Description**: What the expense was for
   - **Amount**: How much was spent (in ₹)
   - **Category**: Select from predefined categories

2. Click "Add Expense" to save

### Viewing & Filtering Expenses
- **Filter by Date**: Set start and end dates to view expenses in a specific range
- **Filter by Category**: Select a category to view only those expenses
- **Real-time Statistics**: View total amount, count, and average expense

### Exporting Data
- Click "Export CSV" to download your filtered expenses
- Files are automatically named with date ranges and categories
- CSV format compatible with Excel, Google Sheets, and other tools

## 🔧 Configuration

### Environment Variables (Optional)

For Google Sheets integration, create a `.env.local` file:

```env
# Google Sheets API Configuration
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
```

### Google Sheets Setup

1. **Google Cloud Console Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create API Key credentials

2. **Google Sheets Preparation**
   - Create a new Google Sheet
   - Add headers: `Date`, `Description`, `Amount`, `Category`, `ID`
   - Share with "Anyone with the link can edit"
   - Copy the spreadsheet ID from the URL

3. **Environment Configuration**
   - Add your API key and spreadsheet ID to `.env.local`
   - Restart the development server

## 🏗️ Project Structure

```
expense-tracker/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind utilities
│   │   ├── layout.tsx           # Root layout with navigation
│   │   └── page.tsx             # Main application page
│   ├── components/
│   │   ├── ExpenseForm.tsx      # Form for adding new expenses
│   │   ├── ExpenseList.tsx      # Display and filter expenses
│   │   └── GoogleSheetsSetup.tsx # Google Sheets integration guide
│   └── lib/
│       ├── csvUtils.ts          # CSV generation and parsing utilities
│       ├── storage.ts           # Local storage management
│       └── googleSheets.ts      # Google Sheets API integration
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── .env.example                # Environment variables template
```

## 🎨 Customization

### Styling
- **Theme Colors**: Modify colors in `tailwind.config.js`
- **Components**: Update styles in `src/app/globals.css`
- **Layout**: Customize layout in `src/app/layout.tsx`

### Categories
- **Add Categories**: Update category options in both `ExpenseForm.tsx` and `ExpenseList.tsx`
- **Category Colors**: Modify category badge colors in the table display

### CSV Export
- **Filename Format**: Customize in `src/lib/csvUtils.ts`
- **CSV Structure**: Modify headers and data format as needed

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full feature access with optimized layout
- **Tablet**: Responsive grid layout with touch-friendly interface
- **Mobile**: Stacked layout with mobile-optimized navigation

## 🔒 Data Privacy

- **Local Storage**: All data stored locally in your browser
- **No Server**: No data sent to external servers (except optional Google Sheets)
- **Google Sheets**: Only shared if you configure and enable the integration
- **CSV Export**: Files are generated and downloaded locally

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- **Netlify**: Works with standard Next.js build
- **Self-hosted**: Use `npm run build` and `npm start`

## 🛠️ Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build production version
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Data**: Local Storage, CSV export, Google Sheets API
- **Build**: Next.js with TypeScript compilation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the Google Sheets setup guide for integration help
- Review the code structure for customization guidance

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
