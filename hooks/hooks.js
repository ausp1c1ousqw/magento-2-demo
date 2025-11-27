import allure from "@wdio/allure-reporter";
import onError from "./onError.js";
import { logger } from "automation-framework/di-container";

const hooks = {
  beforeScenario: function (world) {
    logger.info(`Scenario Started: ${world.pickle.name}`);
  },

  beforeStep: function (step) {
    logger.info(`Step Started: ${step.text}`);
  },

  afterStep: async function (step, scenario, { error }) {
    logger.info(`Step Ended: ${step.text}`);

    const stepLogs = logger.getLogs();
    allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

    logger.clearLogs();
    if (error) {
      await onError(error);
      throw error;
    }
  },

  afterScenario: function (world, result) {
    logger.info(`Scenario Ended: ${world.pickle.name}`);
  },
};
export default hooks;
