import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  var randomProductId = Math.floor((Math.random() * 1000000) + 1);
  const res = http.get('http://localhost:3000/reviews/meta?product_id='+randomProductId);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}