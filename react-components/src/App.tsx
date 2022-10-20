import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.scss';

import { NotFound } from './pages/NotFound/NotFound';
import Layout from './components/Layout';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
