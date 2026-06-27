const AGENTS = [
    "Planner",
    "Project",
    "Package",
    "Theme",
    "Assets",
    "Generator",
    "Validator",
    "Repair",
    "Build",
    "Repository",
    "Vercel",
];

export default function Pipeline() {
    return (
        <div className="mx-auto max-w-5xl px-8 py-12">
            <h1 className="mb-10 text-4xl font-bold text-white">
                AI Pipeline
            </h1>

            <div className="space-y-5">
                {AGENTS.map((agent) => (
                    <div
                        key={agent}
                        className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-semibold text-white">
                                {agent}
                            </span>

                            <span className="text-slate-400">
                                Waiting...
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}