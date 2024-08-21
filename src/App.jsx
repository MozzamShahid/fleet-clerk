import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import Driverd from './pages/Driverd';

function App() {
  return (
    <Router>
      <Header/>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/driverd" element={<Driverd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
