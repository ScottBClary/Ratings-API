import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  duration: '10s',
  vus: 100,

};

export default function () {
  var randomProductId = Math.floor((Math.random() * 1000000) + 1);
  const res = http.get('http://localhost:3000/reviews/meta?product_id='+randomProductId);
  check(res, { 'status was 200': (r) => r.status === 200 });
}

//http://ec2-18-118-111-158.us-east-2.compute.amazonaws.com:3000/reviews/meta?product_id=
//http://localhost:3000/reivews/meta?product_id=