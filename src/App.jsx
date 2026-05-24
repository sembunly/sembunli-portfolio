import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './portfolio';
import Resume from './pages/Resume';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;