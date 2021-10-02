import http from "k6/http";
import { check, group, sleep } from "k6";
import tagForTest from "./module1.js";

const ciOptions = {
  scenarios: {
    ci: {
      executor: 'shared-iterations',
      exec: "ci",
    },
  },
};
const regressionOptions = {
  scenarios: {
    regression: {
      executor: 'shared-iterations',
      exec: "regression",
    },
  },
};

export const options = eval(__ENV.mode || "regressionOptions");
export function ci() {
  eval(`${__ENV.exec}()`);
}
export function regression() {
  //all really - iterate
}
