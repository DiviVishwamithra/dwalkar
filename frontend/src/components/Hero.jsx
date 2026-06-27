import HeroTyping from "./HeroTyping";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-20">

            <div className="absolute left-1/2 top-16
    h-[650px]
    w-[650px]
    -translate-x-1/2
    rounded-full
    bg-blue-500/15
    blur-[180px]"
            />

            <div className="relative text-center">

                <h1 className="text-7xl font-black tracking-tight text-white">

                    DWALKAR AI

                </h1>

                <p className="mt-5 text-2xl text-slate-300">

                    Your AI Software Engineer

                </p>

                <h2 className="mx-auto mt-10 max-w-5xl text-5xl font-bold leading-tight text-white">

                    Build Production Ready Applications

                </h2>

                <p className="mt-6 text-xl text-slate-400">

                    Powered by Multiple AI Agents

                </p>

                <HeroTyping />

            </div>

        </section>
    );
}