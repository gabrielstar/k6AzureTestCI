import http from "k6/http";
import { check, group, sleep } from "k6";
import tagForTest from "./module1.js";

const ci = {
  scenarios: {
    ci: {
      executor: 'shared-iterations',
      exec: "ci",
    },
  },
};
const regression = {
  scenarios: {
    regression: {
      executor: 'shared-iterations',
      exec: "regression",
    },
  },
};

export const options = eval(__ENV.mode || "regression");
export function ciRunner() {
  eval(`${__ENV.exec}()`);
}
export function regressionRunner() {
  //all really - iterate
}
