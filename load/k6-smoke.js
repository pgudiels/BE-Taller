import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,           // pocos usuarios para "smoke"
  duration: '30s',  // prueba rápida
  thresholds: {
    http_req_failed: ['rate<0.01'],  // <1% errores
    http_req_duration: ['p(95)<500'] // 95% < 500ms
  },
};

const BASE = 'http://localhost:8081/api/cars';

export default function () {
  // GET all
  let res = http.get(BASE);
  check(res, {
    'GET /cars 200': (r) => r.status === 200,
  });

  // POST create
  const payload = JSON.stringify({ brand: 'Toyota', model: 'Corolla' });
  res = http.post(BASE, payload, { headers: { 'Content-Type': 'application/json' } });
  check(res, {
    'POST /cars 200': (r) => r.status === 200,
    'POST returns id': (r) => r.json('id') !== undefined,
  });

  // GET by id
  const id = res.json('id');
  const resById = http.get(`${BASE}/${id}`);
  check(resById, {
    'GET /cars/{id} 200': (r) => r.status === 200,
  });

  // DELETE
  const del = http.del(`${BASE}/${id}`);
  check(del, {
    'DELETE /cars/{id} 204': (r) => r.status === 204,
  });

  sleep(1);
}