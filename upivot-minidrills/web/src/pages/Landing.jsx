import React from 'react';
export default function Landing(){
  const goGoogle = () => { window.location.href = 'http://localhost:4000/auth/google'; };
  return (
    <div>
      <h1>Upivot — Interview Drills</h1>
      <p>Practice short drills to sharpen interview answers.</p>
      <button onClick={goGoogle}>Sign in with Google</button>
    </div>
  );
}
