import React, {useEffect, useState} from 'react';
import { get, post } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function Drill(){
  const { id } = useParams();
  const [drill,setDrill]=useState(null);
  const [answers,setAnswers]=useState({});
  const [loading,setLoading]=useState(true);
  const [result,setResult]=useState(null);
  const nav = useNavigate();
  useEffect(()=>{ get('/api/drills/'+id).then(d=>setDrill(d)).catch(()=>{}).finally(()=>setLoading(false)); },[id]);
  if(loading) return <div>Loading...</div>;
  if(!drill) return <div>Not found</div>;
  const onChange = (qid, v) => setAnswers(a=>({...a,[qid]:v}));
  const submit = async ()=>{
    const payload = { drillId: drill._id, answers: drill.questions.map(q=>({ qid:q.id, text:answers[q.id]||'' })) };
    try {
      const res = await post('/api/attempts', payload);
      setResult(res.attempt);
    } catch (err) {
      alert('Error: ' + err.message);
      if(err.message.includes('401')) nav('/');
    }
  };
  if(result) return (<div><h3>Your score: {result.score}</h3><button onClick={()=>nav('/history')}>View history</button></div>);
  return (
    <div>
      <h2>{drill.title}</h2>
      {drill.questions.map(q=> (
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontWeight:600}}>{q.prompt}</div>
          <textarea rows={3} style={{width:'100%'}} value={answers[q.id]||''} onChange={e=>onChange(q.id,e.target.value)} />
        </div>
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  );
}
