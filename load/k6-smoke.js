import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = { vus: 5, duration: '10s' };

export default function () {
  const res = http.get('http://localhost:8081/api/cars');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}