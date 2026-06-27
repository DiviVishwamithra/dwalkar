import api from "../api/api";

export const generateProject = async (prompt) => {
  const response = await api.post("/generate", {
    prompt,
  });

  return response.data;
};
