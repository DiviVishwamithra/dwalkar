export default function PromptBox({
    value,
    onChange,
}) {
    return (
        <textarea
            rows={8}
            value={value}
            onChange={onChange}
            placeholder="Describe the application you want to build..."
            className="
        w-full
        rounded-3xl
        border
        border-slate-700
        bg-slate-900/70
        p-6
        text-lg
        text-white
        outline-none
        transition
        focus:border-blue-500
      "
        />
    );
}