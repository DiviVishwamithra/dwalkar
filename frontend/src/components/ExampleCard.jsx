export default function ExampleCard({
    title,
    onClick,
}) {
    return (
        <button
            onClick={() => onClick(title)}
            className="
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-5
        py-4
        text-left
        transition
        hover:border-blue-500
        hover:bg-slate-800
      "
        >
            💡 {title}
        </button>
    );
}