import http from "k6/http";
import { check, group, sleep } from "k6";
import tagForTest from "./module1.js"; //use default function
import tagForTest2 from "./module1.js"; //use default function
import myNewTest from './newmodule.js';

const regressionTests = ['tagForTest','tagForTest2','myNewTest'];

const testToRun = __ENV.exec || 'tagForTest';
const optionsToUse = __ENV.mode || "regression" ; // regression|ci

const ci = {
  scenarios: {
    ci: {
      executor: 'shared-iterations',
      exec: "ciRunner",
    },
  },
};
const regression = {
  scenarios: {
    regression: {
      executor: 'shared-iterations',
      exec: "regressionRunner",
    },
  },
};

export const options = eval(optionsToUse);
export function ciRunner() {
  group(`${testToRun}`, function() {
    eval(`${__ENV.exec}()`);
  });
}
export function regressionRunner() {
  regressionTests.forEach((test)=>{
    group(`${test}`, function() {
      console.log(`Running ${test}`);
      Function.call(test);
    });
  })
}
