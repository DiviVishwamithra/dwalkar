import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateProject } from "../services/generatorService";

import Header from "../components/Header";
import Hero from "../components/Hero";
import PromptBox from "../components/PromptBox";
import VoiceButton from "../components/VoiceButton";
import GenerateButton from "../components/GenerateButton";
import Examples from "../components/Examples";

import useSpeechRecognition from "../hooks/useSpeechRecognition";

export default function Home() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        listening,
        startListening,
    } = useSpeechRecognition();

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const response = await generateProject(prompt);

            navigate(`/pipeline/${response.jobId}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
            <Header />

            <div className="mx-auto max-w-6xl px-6 py-10">
                <Hero />

                <PromptBox
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />

                <div className="mt-8 flex flex-wrap gap-4">
                    <VoiceButton
                        listening={listening}
                        onClick={() => startListening(setPrompt)}
                    />

                    <GenerateButton
                        loading={loading}
                        onClick={handleGenerate}
                    />
                </div>

                <Examples onSelect={setPrompt} />
            </div>
        </main>
    );
}