import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [

    {
      duration: '10s',
      vus: 10,
      target: 1000,
    },

  ],

};

export default function () {
  var randomProductId = Math.floor((Math.random() * 1000000) + 1);
  const res = http.get('http://localhost:3000/reviews/meta?product_id='+randomProductId);
  check(res, { 'status was 200': (r) => r.status === 200 });
}