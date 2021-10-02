import http from "k6/http";
import { check, fail, group, sleep } from "k6";
import tagForTest from "./module1.js"; //import default function
import tagForTest2 from "./module2.js"; //import default function
import myNewTest from "./newmodule.js"; //import default function

//functions to run as regression check
const regressionTests = [
  { module: "module1", test: tagForTest, name: "tagForTest" },
  { module: "module2", test: tagForTest2, name: "tagForTest2" },
  { module: "newmodule", test: myNewTest, name: "myNewTest" },
];

let testToRun = __ENV.exec || "myNewTest";
const optionsToUse = __ENV.mode || "ci"; // regression|ci
let testToRunFound = regressionTests.find((test) => test.name === testToRun);
let groupName;

if (testToRunFound !== undefined) {
  groupName = `${testToRunFound.test.name || 'default' }:${testToRunFound.module}`
} else {
  fail(
    `Exec() function ${testToRun}() for your branch not found. Are you sure you defined your branch for Test CI well?`
  );
}


const thresholds = {
  http_req_failed: ["rate===0.0"], // http errors should be 0%
};
const ci = {
  scenarios: {
    ci: {
      executor: "shared-iterations",
      exec: "ciRunner",
    },
  },
};
const regression = {
  scenarios: {
    regression: {
      executor: "shared-iterations",
      exec: "regressionRunner",
    },
  },
};

export let options = eval(optionsToUse);
options.thresholds = thresholds;

if (optionsToUse === "regression") {
  //insert individual checks for each group
  regressionTests.forEach((t) => {
    const testDisplayedName = t.test.name || "default";
    const moduleDisplayedName = t.module;
    const groupName = `${testDisplayedName}:${moduleDisplayedName}`;
    options.thresholds[`http_req_failed{group:::${groupName}}`] = [
      "rate===0.0",
    ];
  });
}

export function ciRunner() {
  group(`${groupName}`, function () {
    testToRunFound.test.call();
  });
}

export function regressionRunner() {
  regressionTests.forEach((t) => {
    const testDisplayedName = t.test.name || "default";
    const moduleDisplayedName = t.module;
    const groupName = `${testDisplayedName}:${moduleDisplayedName}`;
    group(`${groupName}`, function () {
      console.log(
        `Calling ${testDisplayedName}() function from ${moduleDisplayedName} module`
      );
      t.test.call();
    });
  });
}
