import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PipelinePage from "./pages/PipelinePage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/pipeline/:jobId"
          element={<PipelinePage />}
        />

        <Route
          path="/result/:jobId"
          element={<ResultPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}