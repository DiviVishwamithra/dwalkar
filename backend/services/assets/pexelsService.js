const axios = require("axios");

class PexelsService {
  async search(query) {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 5,
      },
    });

    return response.data.photos;
  }
}

module.exports = new PexelsService();
