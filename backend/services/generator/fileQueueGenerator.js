class FileQueueGenerator {
  generate(plan) {
    return plan.files;
  }
}

module.exports = new FileQueueGenerator();
