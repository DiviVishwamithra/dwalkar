export default function VoiceButton({
    listening,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className="
        rounded-2xl
        border
        border-slate-700
        bg-slate-800
        px-6
        py-4
        transition
        hover:scale-105
        hover:bg-slate-700
      "
        >
            {listening ? "🎙 Listening..." : "🎤 Speak Prompt"}
        </button>
    );
}