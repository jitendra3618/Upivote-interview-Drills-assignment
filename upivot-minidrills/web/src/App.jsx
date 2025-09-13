import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Drill from './pages/Drill';
import History from './pages/History';

export default function App() {
  return (
    <div className="container">
      <nav className="nav"><Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/history">History</Link></nav>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/drill/:id" element={<Drill/>} />
        <Route path="/history" element={<History/>} />
      </Routes>
    </div>
  );
}
