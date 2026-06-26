const { exec } = require("child_process");

class TerminalService {
  execute(command, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
      exec(
        command,
        {
          cwd,
          maxBuffer: 1024 * 1024 * 10,
        },
        (error, stdout, stderr) => {
          if (error) {
            return reject(stderr || error.message);
          }

          resolve(stdout);
        },
      );
    });
  }
}

module.exports = new TerminalService();
