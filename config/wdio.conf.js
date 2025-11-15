import { initLogger, initConfig } from "automation-framework/initFramework";
import projectConfig from "./config.js";
import loggerSettings from "./loggerConfig.js";
initConfig(projectConfig);
initLogger(loggerSettings);
import hooks from "../hooks/mergedHooks.js";

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
        args: [
          "--disable-notifications",
          "--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessPermissionPrompt",
          "--ignore-certificate-errors",
          "--allow-insecure-localhost",
        ],
      },
    },
  ],

  framework: "cucumber",
  specs: ["../features/**/*.feature"],

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
        outputDir: "./artifacts/reports",
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.xml`;
        },
      },
    ],
  ],

  cucumberOpts: {
    require: ["./features/**/*.js"],
    backtrace: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "not @skip",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
