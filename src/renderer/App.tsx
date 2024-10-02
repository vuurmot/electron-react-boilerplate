import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Entry from '../components/Entry';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
      </Routes>
    </Router>
  );
}
