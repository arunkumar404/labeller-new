import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import TemplateList from './pages/TemplateList';
import ScreenList from './pages/ScreenList';
import Label from './pages/Label';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TemplateList />} />
          <Route path="/:templateId/screens" element={<ScreenList />} />
          <Route path="/:templateId/:screenId" element={<Label />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
