import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimeGrid from './pages/AnimeGrid';
import AniWordle from './pages/AniWordle';
import Connections from './pages/Connections';
import Top10 from './pages/Top10';
import Impostor from './pages/Impostor';
import Openings from './pages/Openings';
import UserMenu from './components/UserMenu';

const App: React.FC = () => (
  <UserProvider>
    <BrowserRouter>
      <UserMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/animegrid" element={<AnimeGrid />} />
        <Route path="/aniwordle" element={<AniWordle />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/top10" element={<Top10 />} />
        <Route path="/impostor" element={<Impostor />} />
        <Route path="/openings" element={<Openings />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

export default App;
