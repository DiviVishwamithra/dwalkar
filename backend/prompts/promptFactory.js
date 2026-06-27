const prompts = require("./index");

class PromptFactory {
  get(type) {
    if (!prompts[type]) {
      throw new Error(`Prompt not found for type: ${type}`);
    }

    return prompts[type];
  }
}

module.exports = new PromptFactory();
