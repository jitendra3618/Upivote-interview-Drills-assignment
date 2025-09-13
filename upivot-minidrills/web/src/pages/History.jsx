import React,{useEffect,useState} from 'react';
import { get } from '../utils/api';

export default function History(){
  const [attempts,setAttempts]=useState([]);
  useEffect(()=>{ get('/api/attempts?limit=5').then(a=>setAttempts(a)).catch(()=>{}); },[]);
  return (
    <div>
      <h2>Last attempts</h2>
      <ul>
        {attempts.map(at=>(<li key={at._id} className="card" style={{marginBottom:8}}>Score: {at.score} — {new Date(at.createdAt).toLocaleString()}</li>))}
      </ul>
    </div>
  );
}
