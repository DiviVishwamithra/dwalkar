const fs = require("fs");
const path = require("path");

class PackageValidator {
  async validate(context) {
    const issues = [];

    const projectPath = context.project.projectPath;
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(projectPath, "package.json"), "utf8"),
    );

    const installedPackages = [
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.devDependencies || {}),
    ];

    const srcPath = path.join(projectPath, "src");

    this.scanDirectory(srcPath, installedPackages, issues);

    return issues;
  }

  normalizePackage(importName) {
    if (importName.startsWith(".") || importName.startsWith("/")) {
      return null;
    }

    if (importName.startsWith("@")) {
      const parts = importName.split("/");
      return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importName;
    }

    return importName.split("/")[0];
  }

  scanDirectory(dir, installedPackages, issues) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        this.scanDirectory(filePath, installedPackages, issues);
        continue;
      }

      if (!/\.(jsx|js)$/.test(file)) continue;

      const code = fs.readFileSync(filePath, "utf8");

      const matches = code.matchAll(/import\s+.*?\s+from\s+['"](.+?)['"]/g);

      for (const match of matches) {
        const imported = this.normalizePackage(match[1]);

        if (!imported) {
          continue;
        }

        if (imported === "react") {
          continue;
        }

        if (!installedPackages.includes(imported)) {
          issues.push({
            type: "MISSING_PACKAGE",
            severity: "HIGH",
            file: filePath,
            package: imported,
            message: `Package "${imported}" is imported but not installed.`,
          });
        }
      }
    }
  }
}

module.exports = new PackageValidator();
