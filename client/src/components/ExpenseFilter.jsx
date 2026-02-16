/**
 * ExpenseFilter – Category filter dropdown and sort toggle.
 *
 * Allows filtering the expense list by category and toggling
 * between newest-first and oldest-first sort orders.
 */
export default function ExpenseFilter({
    categories,
    filters,
    onFilterChange,
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Category filter */}
            <div className="flex items-center gap-2">
                <label
                    htmlFor="filter-category"
                    className="text-sm text-gray-400 whitespace-nowrap"
                >
                    Filter by:
                </label>
                <select
                    id="filter-category"
                    value={filters.category}
                    onChange={(e) => onFilterChange({ category: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none"
                >
                    <option value="" className="bg-slate-900">
                        All Categories
                    </option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-900">
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort toggle */}
            <button
                onClick={() =>
                    onFilterChange({
                        sort: filters.sort === "date_desc" ? "date_asc" : "date_desc",
                    })
                }
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10 transition cursor-pointer"
            >
                <span>{filters.sort === "date_desc" ? "↓" : "↑"}</span>
                <span>
                    {filters.sort === "date_desc" ? "Newest First" : "Oldest First"}
                </span>
            </button>
        </div>
    );
}
