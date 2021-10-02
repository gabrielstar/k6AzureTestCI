import http from "k6/http";
import { check, group, sleep } from "k6";
import tagForTest from module1;

const ciOptions = {
  exec: 'ci',
};
const regressionOptions = {
  exec: "regression",
};

export const options = eval(__ENV.mode || "regressionOptions");
export function ci() {
  eval(`${__ENV.exec}()`)
}
export function regression() {}