import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 100,
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<150']
  }
};

export default function () {
  const BASE = 'http://localhost:4000';
  const res = http.get(BASE + '/api/drills');
  check(res, { 'status 200': (r) => r.status === 200 });
  try {
    const list = JSON.parse(res.body);
    if (Array.isArray(list) && list.length) http.get(BASE + `/api/drills/${list[0]._id}`);
  } catch (e) {}
}
