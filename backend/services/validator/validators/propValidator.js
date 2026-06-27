const fs = require("fs");
const path = require("path");

class PropValidator {
  async validate(context) {
    const issues = [];

    const srcPath = path.join(context.project.projectPath, "src");

    const components = {};

    this.collectComponents(srcPath, components);

    this.validateUsage(srcPath, components, issues);

    return issues;
  }

  collectComponents(dir, components) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const full = path.join(dir, file);

      if (fs.statSync(full).isDirectory()) {
        this.collectComponents(full, components);
        continue;
      }

      if (!file.endsWith(".jsx")) continue;

      const code = fs.readFileSync(full, "utf8");

      const match = code.match(/const\s+(\w+)\s*=\s*\(\{\s*([^}]*)\}\)/);

      if (!match) continue;

      components[match[1]] = match[2]
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }
  }

  validateUsage(dir, components, issues) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const full = path.join(dir, file);

      if (fs.statSync(full).isDirectory()) {
        this.validateUsage(full, components, issues);
        continue;
      }

      if (!file.endsWith(".jsx")) continue;

      const code = fs.readFileSync(full, "utf8");

      Object.entries(components).forEach(([name, expected]) => {
        const regex = new RegExp(`<${name}([\\s\\S]*?)\\/?>`, "g");

        let match;

        while ((match = regex.exec(code))) {
          const props = [...match[1].matchAll(/(\w+)=/g)].map((m) => m[1]);

          if (
            expected.length === 1 &&
            props.length &&
            !props.includes(expected[0])
          ) {
            issues.push({
              type: "PROP_MISMATCH",
              severity: "HIGH",
              component: name,
              file: full,
              expected,
              received: props,
              message: `${name} expects prop "${expected[0]}" but received [${props.join(", ")}].`,
            });
          }
        }
      });
    }
  }
}

module.exports = new PropValidator();
