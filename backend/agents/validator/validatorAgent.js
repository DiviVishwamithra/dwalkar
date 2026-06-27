const BaseAgent = require("../base/BaseAgent");
const validatorService = require("../../services/validator/validatorService");

class ValidatorAgent extends BaseAgent {
  constructor() {
    super("Validator");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Validating generated project...");

      const report = await validatorService.validate(context);

      return this.success("Validation completed.", report);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new ValidatorAgent();
