const fs = require("fs");
const path = require("path");

class ImportValidator {
  async validate(context) {
    const issues = [];
    const srcPath = path.join(context.project.projectPath, "src");

    this.scanDirectory(srcPath, issues);

    return issues;
  }

  scanDirectory(dir, issues) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      if (fs.statSync(filePath).isDirectory()) {
        this.scanDirectory(filePath, issues);
        continue;
      }

      if (!/\.(js|jsx)$/.test(file)) continue;

      const code = fs.readFileSync(filePath, "utf8");

      const imports = code.matchAll(/import\s+.*?\s+from\s+['"](.+?)['"]/g);

      for (const match of imports) {
        const imported = match[1];

        // Ignore npm packages
        if (!imported.startsWith(".")) continue;

        const resolved = path.resolve(path.dirname(filePath), imported);

        const candidates = [
          resolved,
          `${resolved}.js`,
          `${resolved}.jsx`,
          path.join(resolved, "index.js"),
          path.join(resolved, "index.jsx"),
        ];

        const exists = candidates.some((candidate) => fs.existsSync(candidate));

        if (!exists) {
          issues.push({
            type: "IMPORT_NOT_FOUND",
            severity: "HIGH",
            file: filePath,
            import: imported,
            message: `Import "${imported}" does not exist.`,
          });
        }
      }
    }
  }
}

module.exports = new ImportValidator();
