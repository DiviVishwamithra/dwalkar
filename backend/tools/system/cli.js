const { execSync } = require("child_process");

class Cli {
  exists(command) {
    try {
      execSync(`${command} --version`, {
        stdio: "ignore",
      });

      return true;
    } catch {
      return false;
    }
  }

  version(command) {
    try {
      return execSync(`${command} --version`, {
        encoding: "utf8",
      }).trim();
    } catch {
      return null;
    }
  }
}

module.exports = new Cli();
