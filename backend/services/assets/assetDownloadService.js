const fs = require("fs");
const path = require("path");
const axios = require("axios");

class AssetDownloadService {
  async download(images, projectPath) {
    const assetFolder = path.join(projectPath, "src", "assets");

    fs.mkdirSync(assetFolder, {
      recursive: true,
    });

    const downloaded = [];

    for (const image of images) {
      const response = await axios.get(image.url, {
        responseType: "arraybuffer",
      });

      const fileName = `${image.name}.jpg`;

      const filePath = path.join(assetFolder, fileName);

      fs.writeFileSync(filePath, response.data);

      downloaded.push({
        name: image.name,
        file: fileName,
        path: filePath,
      });

      console.log(`Downloaded ${fileName}`);
    }

    return downloaded;
  }
}

module.exports = new AssetDownloadService();
