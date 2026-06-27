import { useEffect, useState } from "react";

const AGENTS = [
    "🧠 Planner Agent",
    "⚙️ Generator Agent",
    "🧪 Validator Agent",
    "🔧 Repair Agent",
    "🐙 Repository Agent",
    "🚀 Vercel Agent",
];

export default function HeroTyping() {
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState("");

    useEffect(() => {
        let current = "";
        let charIndex = 0;

        const typing = setInterval(() => {
            current += AGENTS[index][charIndex];
            setDisplay(current);
            charIndex++;

            if (charIndex >= AGENTS[index].length) {
                clearInterval(typing);

                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % AGENTS.length);
                    setDisplay("");
                }, 1800);
            }
        }, 60);

        return () => clearInterval(typing);
    }, [index]);

    return (
        <div className="mt-8 h-10 text-2xl font-semibold text-blue-400">
            {display}
            <span className="animate-pulse">|</span>
        </div>
    );
}