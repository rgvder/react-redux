import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.scss';

import Layout from './components/Layout';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
