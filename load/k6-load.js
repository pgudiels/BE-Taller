import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // ramp up
    { duration: '2m', target: 50 },    // carga sostenida
    { duration: '30s', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<600'],
  },
};

const BASE = 'http://localhost:8081/api/cars';

export default function () {
  const res = http.get(BASE);
  check(res, { 'GET 200': (r) => r.status === 200 });
  sleep(1);
}