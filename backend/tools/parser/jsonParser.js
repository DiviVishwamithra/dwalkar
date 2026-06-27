class JsonParser {
  parse(text) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON object found in AI response.");
    }

    const json = text.substring(start, end + 1);

    return JSON.parse(json);
  }
}

module.exports = new JsonParser();
