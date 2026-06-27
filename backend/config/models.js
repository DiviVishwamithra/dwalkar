const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  planner: process.env.PLANNER_MODEL || "gpt-4.1-mini",
  theme: process.env.THEME_MODEL || "gpt-4.1-mini",
  generator:
    process.env.GENERATOR_MODEL || (isProduction ? "gpt-5.5" : "gpt-4.1-mini"),
  repair:
    process.env.REPAIR_MODEL || (isProduction ? "gpt-5.5" : "gpt-4.1-mini"),
};
