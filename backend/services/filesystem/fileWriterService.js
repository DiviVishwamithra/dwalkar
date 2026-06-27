const fs = require("fs");
const path = require("path");

class FileWriterService {
  write(projectPath, file, content) {
    console.log("=================================");
    console.log(file);
    console.log(content.substring(0, 100));
    console.log("=================================");

    const fullPath = path.join(projectPath, file);

    fs.mkdirSync(path.dirname(fullPath), {
      recursive: true,
    });

    fs.writeFileSync(fullPath, content);

    return fullPath;
  }
}

module.exports = new FileWriterService();
