import AgentCard from "./AgentCard";
import LiveLogs from "./LiveLogs";

const AGENTS = [
    "Planner",
    "Project",
    "Package",
    "Theme",
    "Asset",
    "Generator",
    "Validator",
    "Repair",
    "Build",
    "Git",
    "Repository",
    "Vercel",
];

export default function Pipeline({ logs, status }) {
    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            <h1 className="mb-2 text-4xl font-bold text-white">
                AI Execution Pipeline
            </h1>

            <p className="mb-10 text-slate-400">
                Status: {status}
            </p>

            <div className="grid gap-8 lg:grid-cols-2">

                <div className="space-y-4">
                    {AGENTS.map((agent) => (
                        <AgentCard
                            key={agent}
                            name={agent}
                            logs={logs}
                        />
                    ))}
                </div>

                <LiveLogs logs={logs} />

            </div>

        </div>
    );
}