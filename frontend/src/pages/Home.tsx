import React from 'react';
import GameCard from '../components/GameCard';
import { GAME_MODES } from '../utils/constants';
import { theme } from '../styles/theme';
import '../styles/global.css';
import { useNavigate } from 'react-router-dom';

const ROUTES: Record<string, string> = {
  animegrid: '/animegrid',
  'guess-opening': '/openings',
  connections: '/connections',
  aniwordle: '/aniwordle',
  top10: '/top10',
  impostor: '/impostor',
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <h1 style={{ color: theme.accent, textAlign: 'center', marginBottom: '2rem', fontFamily: 'Montserrat, Poppins, Roboto, sans-serif' }}>
        AniGrid
      </h1>
      <div className="grid-container">
        {GAME_MODES.map((mode) => (
          <GameCard
            key={mode.key}
            title={mode.title}
            description={mode.description}
            image={mode.image}
            onPlay={() => navigate(ROUTES[mode.key])}
          />
        ))}
      </div>
    </div>
  );
};

export default Home; 