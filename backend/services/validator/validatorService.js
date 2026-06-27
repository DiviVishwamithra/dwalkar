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

    console.log("\n========================================");
    console.log("🧪 VALIDATION REPORT");
    console.log("========================================");

    if (!issues.length) {
      console.log("✅ No validation issues found.");
    } else {
      issues.forEach((issue, index) => {
        console.log(
          `${index + 1}. ${issue.type}\n   📄 ${issue.file || issue.component || "-"}\n   💬 ${issue.message}\n`,
        );
      });
    }

    console.log("========================================\n");

    return {
      passed: issues.length === 0,
      totalIssues: issues.length,
      issues,
    };
  }
}

module.exports = new ValidatorService();
