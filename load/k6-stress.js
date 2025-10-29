import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 150 }, // pico
    { duration: '1m', target: 150 },  // mantener pico
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],    // toleramos hasta 5% en estrés
    http_req_duration: ['p(95)<800'],
  },
};

const BASE = 'http://localhost:8081/api/cars';

export default function () {
  http.get(BASE);
  sleep(0.5);
}