import { useState } from "react";

export default function useSpeechRecognition() {
  const [listening, setListening] = useState(false);

  const startListening = (onResult) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      onResult(event.results[0][0].transcript);
    };

    recognition.start();
  };

  return {
    listening,
    startListening,
  };
}
