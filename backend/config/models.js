module.exports = {
  planner: process.env.PLANNER_MODEL || "gpt-4.1-mini",
  theme: process.env.THEME_MODEL || "gpt-4.1-mini",
  generator: process.env.GENERATOR_MODEL || "gpt-5.5",
  repair: process.env.REPAIR_MODEL || "gpt-5.5",
};
