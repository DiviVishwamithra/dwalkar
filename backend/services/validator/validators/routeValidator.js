const fs = require("fs");
const path = require("path");

class RouteValidator {
  async validate(context) {
    const issues = [];

    const appFile = path.join(context.project.projectPath, "src", "App.jsx");

    if (!fs.existsSync(appFile)) {
      return issues;
    }

    const code = fs.readFileSync(appFile, "utf8");

    const matches = code.matchAll(/element={<([A-Za-z0-9_]+)\s*\/?>}/g);

    for (const match of matches) {
      const component = match[1];

      const pageFile = path.join(
        context.project.projectPath,
        "src",
        "pages",
        `${component}.jsx`,
      );

      if (!fs.existsSync(pageFile)) {
        issues.push({
          type: "ROUTE_COMPONENT_NOT_FOUND",
          severity: "HIGH",
          file: "src/App.jsx",
          component,
          message: `Page "${component}.jsx" does not exist.`,
        });
      }
    }

    return issues;
  }
}

module.exports = new RouteValidator();
