const fs = require("fs");
const path = require("path");

class FileSystem {
  read(filePath) {
    return fs.readFileSync(path.resolve(filePath), "utf8");
  }
}

module.exports = new FileSystem();
