const fs = require("fs");
const path = require("path");

class ProjectConfigurator {
  async configure(projectPath) {
    this.configureVite(projectPath);
    this.configureTailwind(projectPath);
    this.cleanup(projectPath);
  }

  configureVite(projectPath) {
    const content = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
`;

    fs.writeFileSync(path.join(projectPath, "vite.config.js"), content);
  }

  configureTailwind(projectPath) {
    const content = `@import "tailwindcss";
`;

    fs.writeFileSync(path.join(projectPath, "src", "index.css"), content);
  }

  cleanup(projectPath) {
    const files = ["src/App.css", "src/assets/react.svg"];

    files.forEach((file) => {
      const fullPath = path.join(projectPath, file);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });
  }
}

module.exports = new ProjectConfigurator();
