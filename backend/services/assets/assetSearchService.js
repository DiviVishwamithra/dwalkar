const pexels = require("./pexelsService");

class AssetSearchService {
  async search(projectName) {
    const photos = await pexels.search(projectName);

    return photos.map((photo, index) => ({
      name: `image-${index + 1}`,
      url: photo.src.large,
    }));
  }
}

module.exports = new AssetSearchService();
