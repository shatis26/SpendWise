import { useState } from "react";

/**
 * ExpenseForm – Controlled form for creating a new expense.
 *
 * Key decisions:
 * - Generates a UUID `idempotencyKey` per submission to prevent duplicate
 *   expenses from network retries, browser refresh, or double-clicks.
 * - The submit button is disabled while `submitting` is true.
 * - Amount is entered in dollars (e.g. "12.50") — the hook converts to cents.
 */
export default function ExpenseForm({ categories, onSubmit, submitting }) {
    const [form, setForm] = useState({
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate a unique idempotency key for this submission
        const idempotencyKey = crypto.randomUUID();

        const success = await onSubmit({
            ...form,
            amount: parseFloat(form.amount),
            idempotencyKey,
        });

        if (success) {
            // Reset form on successful creation
            setForm({
                amount: "",
                category: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
            });
        }
    };

    const isValid =
        form.amount > 0 && form.category && form.description.trim() && form.date;

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl"
        >
            <h2 className="text-xl font-semibold text-indigo-300 mb-2">
                ➕ Add Expense
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Amount input */}
                <div>
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-400 mb-1"
                    >
                        Amount ($)
                    </label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        value={form.amount}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>

                {/* Category select */}
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-400 mb-1"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat} className="bg-slate-900">
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Description input */}
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-400 mb-1"
                >
                    Description
                </label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    maxLength={200}
                    placeholder="What was this expense for?"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
            </div>

            {/* Date input */}
            <div>
                <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-400 mb-1"
                >
                    Date
                </label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
            </div>

            {/* Submit button — disabled while submitting to prevent duplicates */}
            <button
                type="submit"
                disabled={!isValid || submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
            >
                {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        Adding...
                    </span>
                ) : (
                    "Add Expense"
                )}
            </button>
        </form>
    );
}
