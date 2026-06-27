const BaseAgent = require("../base/BaseAgent");
const assetManager = require("../../services/assets/assetManager");

class AssetAgent extends BaseAgent {
  constructor() {
    super("Asset");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Downloading project assets...");

      const assets = await assetManager.download(context);

      return this.success("Assets downloaded.", assets);
    } catch (error) {
      this.log(context, "ERROR", error.message);
      return this.failure(error);
    }
  }
}

module.exports = new AssetAgent();
