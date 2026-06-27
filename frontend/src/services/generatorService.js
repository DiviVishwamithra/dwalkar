import api from "../api/api";

export async function generateProject(prompt) {
  const response = await api.post("generate", {
    prompt,
  });

  return response.data;
}
