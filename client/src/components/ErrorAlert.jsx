/**
 * ErrorAlert – Dismissible error notification banner.
 * Displays API or validation errors to the user.
 */
export default function ErrorAlert({ message, onDismiss }) {
    if (!message) return null;

    return (
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
                <span className="text-red-400 text-lg">⚠️</span>
                <p className="text-sm text-red-300">{message}</p>
            </div>
            <button
                onClick={onDismiss}
                className="text-red-400 hover:text-red-300 transition text-lg leading-none cursor-pointer"
                aria-label="Dismiss error"
            >
                ✕
            </button>
        </div>
    );
}
