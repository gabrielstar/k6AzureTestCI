import http from "k6/http";

//private function
function getSomeEndpoint(){
  let res = http.get('https://www.onet.pl')
}

//named export
export function module1Test(){
  getSomeEndpoint();
}

//each module has default export too
export default function ci_check(){ 
  module1Test();
}