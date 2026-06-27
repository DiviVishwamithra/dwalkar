const generationService = require("../services/generation/generationService");

class GenerateController {
  async generate(req, res) {
    try {
      const { prompt } = req.body;

      if (!prompt || !prompt.trim()) {
        return res.status(400).json({
          success: false,
          message: "Prompt is required.",
        });
      }

      const result = await generationService.generate(prompt);

      return res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new GenerateController();
