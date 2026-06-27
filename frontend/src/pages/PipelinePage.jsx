import { useParams, Navigate } from "react-router-dom";

import Pipeline from "../components/Pipeline";
import usePipeline from "../hooks/usePipeline";

export default function PipelinePage() {
    const { jobId } = useParams();

    const {
        logs,
        status,
        result,
    } = usePipeline(jobId);

    if (status === "COMPLETED") {
        return (
            <Navigate
                to={`/result/${jobId}`}
                state={result}
                replace
            />
        );
    }

    return (
        <Pipeline
            logs={logs}
            status={status}
        />
    );
}