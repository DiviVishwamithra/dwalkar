export default function AgentCard({ name, logs }) {
    const latestLog = [...logs]
        .reverse()
        .find((log) => log.agent === name);

    const status = latestLog
        ? "Running"
        : "Waiting";

    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 backdrop-blur-xl">

            <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold text-white">
                    {name}
                </h2>

                <span
                    className={
                        latestLog
                            ? "text-green-400"
                            : "text-slate-500"
                    }
                >
                    {status}
                </span>

            </div>

            {latestLog && (
                <p className="mt-3 text-sm text-slate-400">
                    {latestLog.message}
                </p>
            )}

        </div>
    );
}