const packageValidator = require("./validators/packageValidator");
const fileValidator = require("./validators/fileValidator");
const routeValidator = require("./validators/routeValidator");
const importValidator = require("./validators/importValidator");
const propValidator = require("./validators/propValidator");
const assetValidator = require("./validators/assetValidator");

class ValidatorService {
  async validate(context) {
    const issues = [];

    issues.push(...(await packageValidator.validate(context)));
    issues.push(...(await importValidator.validate(context)));
    issues.push(...(await fileValidator.validate(context)));
    issues.push(...(await routeValidator.validate(context)));
    issues.push(...(await propValidator.validate(context)));
    issues.push(...(await assetValidator.validate(context)));

    issues.forEach((issue) => {
      console.log(`[Validator] ${issue.type}: ${issue.message}`);
    });

    return {
      passed: issues.length === 0,
      totalIssues: issues.length,
      issues,
    };
  }
}

module.exports = new ValidatorService();
