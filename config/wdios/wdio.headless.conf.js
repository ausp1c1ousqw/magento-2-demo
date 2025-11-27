import { initLogger, initConfig } from "automation-framework/init";
import { projectConfig } from "../projectConfig.js";
import { loggerConfig } from "../loggerConfig.js";
initConfig(projectConfig);
initLogger(loggerConfig);
import hooks from "../../hooks/hooks.js";

export const config = {
  ...hooks,

  runner: "local",

  maxInstances: 2,
  logLevel: "silent",
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  capabilities: [
    {
      browserName: "chrome",
      maxInstances: 2,
      "goog:chromeOptions": {
        args: ["--headless=new", "--disable-gpu", "--no-sandbox"],
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
    [
      "junit",
      {
        outputDir: "./artifacts/junit",
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.xml`;
        },
        useAutomationIds: true,
      },
    ],
  ],

  cucumberOpts: {
    require: ["./features/**/*.js"],
    tagExpression: "not @skip",
    timeout: 60000,
  },
};
