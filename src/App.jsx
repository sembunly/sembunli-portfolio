import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './portfolio';
import Resume from './pages/Resume';
import SplashScreen from './components/SplashScreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <div className={`portfolio-entry ${showSplash ? 'portfolio-entry--loading' : 'portfolio-entry--revealed'}`}>
            <Portfolio />
          </div>
          {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
        </>} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
