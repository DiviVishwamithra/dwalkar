const openAI = require("../../tools/openai/openai");
const themePrompt = require("../../prompts/theme.prompt");
const parser = require("../../tools/parser/jsonParser");

class ThemeGeneratorService {
  async generate(plan) {
    const prompt = `
Project:
${plan.projectName}

Framework:
${plan.framework}

Pages:
${plan.pages.join(", ")}

Components:
${plan.components.join(", ")}
`;

    const response = await openAI.generate(themePrompt, prompt);

    console.log("========== THEME RAW RESPONSE ==========");
    console.log(response);
    console.log("========================================");

    const theme = parser.parse(response);

    console.log("========== PARSED THEME ==========");
    console.dir(theme, { depth: null });
    console.log("=================================");

    return theme;
  }
}

module.exports = new ThemeGeneratorService();
