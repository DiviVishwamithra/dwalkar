const fs = require("fs");
const path = require("path");

class AssetValidator {
  async validate(context) {
    const issues = [];

    const srcPath = path.join(context.project.projectPath, "src");

    this.scan(srcPath, issues);

    return issues;
  }

  scan(dir, issues) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      if (fs.statSync(filePath).isDirectory()) {
        this.scan(filePath, issues);
        continue;
      }

      if (!/\.(jsx|js)$/.test(file)) continue;

      const code = fs.readFileSync(filePath, "utf8");

      const imports = code.matchAll(
        /import\s+.*?\s+from\s+['"](.+\.(jpg|jpeg|png|svg|webp))['"]/g,
      );

      for (const match of imports) {
        const asset = match[1];

        const absolute = path.resolve(path.dirname(filePath), asset);

        if (!fs.existsSync(absolute)) {
          issues.push({
            type: "ASSET_NOT_FOUND",
            severity: "HIGH",
            file: filePath,
            asset,
            message: `Asset "${asset}" not found.`,
          });
        }
      }
    }
  }
}

module.exports = new AssetValidator();
