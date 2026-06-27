const fs = require("fs");
const path = require("path");

const INVALID_CLASSES = [
  /focus:ring-opacity-\d+/g,
  /ring-opacity-\d+/g,
  /bg-opacity-\d+/g,
  /text-opacity-\d+/g,
  /border-opacity-\d+/g,
  /divide-opacity-\d+/g,
  /placeholder-opacity-\d+/g,
  /backdrop-opacity-\d+/g,
];

class TailwindValidator {
  validate(projectPath) {
    const issues = [];

    this.walk(projectPath, (file) => {
      if (!file.endsWith(".jsx") && !file.endsWith(".css")) {
        return;
      }

      const code = fs.readFileSync(file, "utf8");

      INVALID_CLASSES.forEach((pattern) => {
        const matches = code.match(pattern);

        if (matches) {
          matches.forEach((match) => {
            issues.push({
              severity: "HIGH",
              type: "INVALID_TAILWIND_CLASS",
              file: path.relative(projectPath, file),
              message: `Invalid Tailwind CSS v4 utility "${match}"`,
            });
          });
        }
      });
    });

    return issues;
  }

  walk(dir, callback) {
    const entries = fs.readdirSync(dir);

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry);

      if (fs.statSync(fullPath).isDirectory()) {
        this.walk(fullPath, callback);
      } else {
        callback(fullPath);
      }
    });
  }
}

module.exports = new TailwindValidator();
