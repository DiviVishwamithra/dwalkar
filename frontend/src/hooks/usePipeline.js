import { useEffect, useState } from "react";
import socket from "../services/socketService";

export default function usePipeline(jobId) {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("RUNNING");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    socket.connect();

    const onConnect = () => {
      console.log("✅ Connected:", socket.id);

      socket.emit("join-job", jobId);
    };

    const onLog = (log) => {
      setLogs((previous) => [...previous, log]);
    };

    const onCompleted = (job) => {
      setStatus("COMPLETED");
      setResult(job);
    };

    const onFailed = () => {
      setStatus("FAILED");
    };

    const onAny = (event, payload) => {
      console.log("📡", event, payload);
    };

    socket.on("connect", onConnect);
    socket.on("agent-log", onLog);
    socket.on("job-completed", onCompleted);
    socket.on("job-failed", onFailed);

    socket.onAny(onAny);

    return () => {
      socket.off("connect", onConnect);
      socket.off("agent-log", onLog);
      socket.off("job-completed", onCompleted);
      socket.off("job-failed", onFailed);

      socket.offAny(onAny);

      socket.disconnect();
    };
  }, [jobId]);

  return {
    logs,
    status,
    result,
  };
}
