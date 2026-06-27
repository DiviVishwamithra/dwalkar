const BaseAgent = require("../base/BaseAgent");
const repairService = require("../../services/repair/repairService");

class RepairAgent extends BaseAgent {
  constructor() {
    super("Repair");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Repairing validation issues...");

      const issues =
        context.validation?.issues?.filter(
          (issue) => issue.severity === "HIGH",
        ) || [];

      if (!issues.length) {
        this.log(context, "INFO", "No repair required.");

        return this.success("No repair required.", {
          repaired: 0,
        });
      }

      for (const issue of issues) {
        await repairService.repair(issue);
      }

      return this.success("Repair completed.", {
        repaired: issues.length,
      });
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new RepairAgent();
