export default function ResultCard({ result }) {
    return (
        <div className="mx-auto max-w-5xl px-6 py-20">

            <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-10">

                <h1 className="text-4xl font-bold text-white">
                    🎉 Application Generated
                </h1>

                <p className="mt-6 text-slate-400">
                    Your application has been successfully generated.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">

                    {result?.repository?.repositoryUrl && (
                        <a
                            href={result.repository.repositoryUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl bg-blue-600 px-6 py-3 text-white"
                        >
                            Open GitHub
                        </a>
                    )}

                    {result?.deployment?.url && (
                        <a
                            href={result.deployment.url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl bg-green-600 px-6 py-3 text-white"
                        >
                            Open Website
                        </a>
                    )}

                </div>

            </div>

        </div>
    );
}