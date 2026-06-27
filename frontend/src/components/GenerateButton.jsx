export default function GenerateButton({
    loading,
    onClick,
}) {
    return (
        <button
            disabled={loading}
            onClick={onClick}
            className="
        rounded-2xl
        bg-blue-600
        px-8
        py-4
        font-semibold
        text-white
        transition
        hover:scale-105
        hover:bg-blue-700
        disabled:opacity-50
      "
        >
            {loading ? "Generating..." : "🚀 Generate Project"}
        </button>
    );
}