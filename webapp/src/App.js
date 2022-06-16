import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';
import Visual from './pages/visual';
import Home from './pages/home';
import DataContextProvider from './app/context';

function App() {
  return (
    <DataContextProvider>
        <HashRouter>
            <Routes>
                <Route path="/visual/:tokenId" element={<Visual />} />
                <Route path="/visual" element={<Visual />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </HashRouter>
    </DataContextProvider>
  );
}

export default App;
