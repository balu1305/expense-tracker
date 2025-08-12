import { ExpenseForm } from '@/components/ExpenseForm'
import { ExpenseList } from '@/components/ExpenseList'

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="section-title">Add Expense</h2>
            <ExpenseForm />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Expense Overview</h2>
            <ExpenseList />
          </div>
        </div>
      </div>
    </div>
  )
}
