export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/40 bg-slate-950/40 backdrop-blur-xl">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

                <div>

                    <h1 className="text-2xl font-bold text-white">

                        DWALKAR

                    </h1>

                </div>

                <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

                    Version 1.0

                </div>

            </div>

        </header>
    );
}