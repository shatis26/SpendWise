/**
 * ExpenseSummary – Displays the total amount of currently visible expenses.
 *
 * The total is computed from the filtered expense list (in cents),
 * converted to dollars for display.
 */
export default function ExpenseSummary({ total, count }) {
    return (
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-400/20 rounded-2xl p-5 flex items-center justify-between">
            <div>
                <p className="text-sm text-indigo-300 font-medium">Total Expenses</p>
                <p className="text-3xl font-bold text-white mt-1">
                    ${total.toFixed(2)}
                </p>
            </div>
            <div className="text-right">
                <p className="text-sm text-indigo-300 font-medium">Entries</p>
                <p className="text-3xl font-bold text-white mt-1">{count}</p>
            </div>
        </div>
    );
}
