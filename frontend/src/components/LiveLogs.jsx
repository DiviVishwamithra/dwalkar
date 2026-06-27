export default function LiveLogs({ logs }) {
    return (
        <div className="rounded-2xl border border-slate-700 bg-black/50 p-5">

            <h2 className="mb-5 text-xl font-semibold text-white">
                Live Logs
            </h2>

            <div className="h-[600px] overflow-y-auto space-y-3">

                {logs.map((log, index) => (
                    <div
                        key={index}
                        className="border-b border-slate-800 pb-3"
                    >
                        <div className="text-blue-400">
                            [{log.agent}]
                        </div>

                        <div className="text-slate-300">
                            {log.message}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}