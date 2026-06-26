class JsonValidator {
  parse(text) {
    try {
      // Remove markdown if present
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);
    } catch (error) {
      throw new Error("Planner returned invalid JSON.");
    }
  }
}

module.exports = new JsonValidator();
