import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AnimeGrid from '../pages/AnimeGrid';
import GuessOpening from '../pages/GuessOpening';
import Connections from '../pages/Connections';
import AniWordle from '../pages/AniWordle';
import Top10 from '../pages/Top10';
import Impostor from '../pages/Impostor';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animegrid" element={<AnimeGrid />} />
      <Route path="/guess-opening" element={<GuessOpening />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/aniwordle" element={<AniWordle />} />
      <Route path="/top10" element={<Top10 />} />
      <Route path="/impostor" element={<Impostor />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes; 