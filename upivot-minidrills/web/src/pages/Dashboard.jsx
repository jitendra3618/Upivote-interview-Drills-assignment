import React, {useEffect, useState} from 'react';
import { get } from '../utils/api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [drills,setDrills]=useState([]);
  const [loading,setLoading]=useState(true);
  const [err,setErr]=useState(null);
  useEffect(()=>{ get('/api/drills').then(d=>setDrills(d)).catch(e=>setErr(e.message)).finally(()=>setLoading(false)); },[]);
  if(loading) return <div>Loading...</div>;
  if(err) return <div>Error: {err}</div>;
  return (
    <div>
      <h2>Drills</h2>
      <ul>
        {drills.map(d=> <li key={d._id} className="card" style={{marginBottom:8}}><Link to={'/drill/'+d._id}><strong>{d.title}</strong></Link><div style={{fontSize:13}}>{d.difficulty} — {d.tags?.join(', ')}</div></li>)}
      </ul>
    </div>
  );
}
