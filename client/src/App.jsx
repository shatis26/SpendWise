import { useExpenses } from "./hooks/useExpenses";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import ErrorAlert from "./components/ErrorAlert";

/**
 * App – Root component for SpendWise.
 *
 * Composes the expense form, filters, summary, and list.
 * All state management is handled by the useExpenses custom hook,
 * keeping this component focused on layout and composition.
 */
export default function App() {
  const {
    expenses,
    categories,
    loading,
    submitting,
    error,
    filters,
    totalAmount,
    addExpense,
    updateFilters,
    clearError,
  } = useExpenses();

  return (
    <div className="min-h-screen py-8 px-4">
      {/* App header */}
      <header className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          💰 SpendWise
        </h1>
        <p className="text-gray-400 mt-2">
          Track your expenses, stay in control
        </p>
      </header>

      <main className="max-w-3xl mx-auto space-y-6">
        {/* Error banner */}
        <ErrorAlert message={error} onDismiss={clearError} />

        {/* Add expense form */}
        <ExpenseForm
          categories={categories}
          onSubmit={addExpense}
          submitting={submitting}
        />

        {/* Summary card */}
        <ExpenseSummary total={totalAmount} count={expenses.length} />

        {/* Filter controls */}
        <ExpenseFilter
          categories={categories}
          filters={filters}
          onFilterChange={updateFilters}
        />

        {/* Expense list table */}
        <ExpenseList expenses={expenses} loading={loading} />
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto mt-12 text-center text-gray-600 text-sm">
        <p>SpendWise &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
