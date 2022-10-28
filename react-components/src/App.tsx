import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.scss';

import Layout from './components/Layout';
import Api from './pages/Api/Api';
import FormPage from './pages/Form/FormPage';
import Main from './pages/Main/Main';
import { About } from './pages/About/About';
import { NotFound } from './pages/NotFound/NotFound';
import Components from './pages/Components/Components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="components" element={<Components />} />
          <Route path="about" element={<About />} />
          <Route path="form" element={<FormPage />} />
          <Route path="api" element={<Api />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
