import { initLogger, initConfig } from "automation-framework/init";
import { projectConfig } from "../projectConfig.js";
import { loggerConfig } from "../loggerConfig.js";
initConfig(projectConfig);
initLogger(loggerConfig);
import hooks from "../../hooks/hooks.js";

export const config = {
  ...hooks,

  runner: "local",

  maxInstances: 1,
  logLevel: "silent",
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  capabilities: [
    {
      browserName: "chrome",
      maxInstances: 1,
      "goog:chromeOptions": {
        args: [],
      },
    },
  ],

  framework: "cucumber",
  specs: ["../../features/**/*.feature"],

  reporters: [
    [
      "allure",
      {
        outputDir: "./artifacts/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true,
      },
    ],
  ],

  cucumberOpts: {
    require: ["./features/**/*.js"],
    tagExpression: "not @skip",
    timeout: 60000,
  },
};
