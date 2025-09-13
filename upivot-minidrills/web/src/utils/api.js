const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function get(path){ const res = await fetch(API_BASE + path, { credentials:'include' }); if(!res.ok) throw new Error(await res.text()); return res.json(); }
export async function post(path, body){ const res = await fetch(API_BASE + path, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), credentials:'include' }); if(!res.ok) throw new Error(await res.text()); return res.json(); }
