import { projectHooks } from "./projectHooks.js";
import { guiHooks } from "automation-framework/hooks";

const mergedHooks = {
  beforeAll: async function (...args) {
    guiHooks.beforeAll?.(...args);
    projectHooks.beforeAll?.(...args);
  },
  before: async function (...args) {
    guiHooks.before?.(...args);
    projectHooks.before?.(...args);
  },

  beforeStep: async function (...args) {
    guiHooks.beforeStep?.(...args);
    projectHooks.beforeStep?.(...args);
  },
  afterStep: async function (...args) {
    await guiHooks.afterStep?.(...args);
    projectHooks.afterStep?.(...args);
  },
  after: async function (...args) {
    guiHooks.after?.(...args);
    projectHooks.after?.(...args);
  },
  afterAll: async function (...args) {
    guiHooks.afterAll?.(...args);
    projectHooks.afterAll?.(...args);
  },
};

const hooks = {
  beforeAll: mergedHooks.beforeAll,
  beforeScenario: mergedHooks.before,
  beforeStep: mergedHooks.beforeStep,
  afterStep: mergedHooks.afterStep,
  afterScenario: mergedHooks.after,
  afterAll: mergedHooks.afterAll,
};
export default hooks;
