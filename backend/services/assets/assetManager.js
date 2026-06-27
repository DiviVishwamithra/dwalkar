const assetSearch = require("./assetSearchService");
const assetDownload = require("./assetDownloadService");

class AssetManager {
  async download(context) {
    const images = await assetSearch.search(context.plan.projectName);

    const downloaded = await assetDownload.download(
      images,
      context.project.projectPath,
    );

    return downloaded;
  }
}

module.exports = new AssetManager();
