/**
 * ExpenseList – Renders expenses in a responsive table.
 *
 * Shows a loading skeleton while fetching, an empty state when
 * no expenses exist, and a clean table for the data.
 * Amounts are stored in cents and converted to dollars for display.
 */

/** Category → emoji mapping for visual flair */
const categoryEmoji = {
    Food: "🍔",
    Transport: "🚗",
    Entertainment: "🎬",
    Shopping: "🛍️",
    Utilities: "⚡",
    Health: "💊",
    Education: "📚",
    Other: "📦",
};

/** Loading skeleton rows */
function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            <td className="px-4 py-3">
                <div className="h-4 bg-white/10 rounded w-20" />
            </td>
            <td className="px-4 py-3">
                <div className="h-4 bg-white/10 rounded w-24" />
            </td>
            <td className="px-4 py-3">
                <div className="h-4 bg-white/10 rounded w-32" />
            </td>
            <td className="px-4 py-3">
                <div className="h-4 bg-white/10 rounded w-16" />
            </td>
            <td className="px-4 py-3">
                <div className="h-4 bg-white/10 rounded w-16" />
            </td>
        </tr>
    );
}

export default function ExpenseList({ expenses, loading }) {
    if (loading) {
        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">
                                Date
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">
                                Category
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">
                                Description
                            </th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(4)].map((_, i) => (
                            <SkeletonRow key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (expenses.length === 0) {
        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center shadow-2xl">
                <p className="text-4xl mb-3">💸</p>
                <p className="text-gray-400 text-lg">No expenses yet</p>
                <p className="text-gray-500 text-sm mt-1">
                    Add your first expense above to get started
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">
                                Date
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">
                                Category
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">
                                Description
                            </th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr
                                key={expense._id}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                                    {new Date(expense.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {categoryEmoji[expense.category] || "📦"}{" "}
                                        {expense.category}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-200 max-w-xs truncate">
                                    {expense.description}
                                </td>
                                <td className="px-4 py-3 text-sm font-semibold text-emerald-400 text-right whitespace-nowrap">
                                    ${(expense.amount / 100).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
