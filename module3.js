import http from "k6/http";

//private function
function getSomeOtherEndpoint(){
  let res = http.get('https://www.onet.pl')
}

//named export
export function module2Test(){
  getSomeOtherEndpoint();
}

//each module has default export too - for CI
export default function mojTest(){ 
  module2Test();
}