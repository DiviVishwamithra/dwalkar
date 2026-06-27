export default function ResultCard() {
    return (
        <div className="mx-auto max-w-4xl px-8 py-20">
            <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-12 backdrop-blur-xl">
                <h1 className="text-5xl font-bold text-white">
                    🎉 Project Generated
                </h1>

                <p className="mt-5 text-slate-400">
                    Repository and Deployment details will appear here.
                </p>

                <div className="mt-10 flex gap-5">
                    <button className="rounded-xl bg-blue-600 px-6 py-3 text-white">
                        Open Repository
                    </button>

                    <button className="rounded-xl bg-green-600 px-6 py-3 text-white">
                        Open Website
                    </button>
                </div>
            </div>
        </div>
    );
}