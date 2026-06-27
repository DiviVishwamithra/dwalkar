import { useLocation } from "react-router-dom";
import ResultCard from "../components/ResultCard";

export default function ResultPage() {
    const { state } = useLocation();

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

            <ResultCard result={state} />

        </main>
    );
}