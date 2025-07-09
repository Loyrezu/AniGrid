import React from 'react';

type GameCardProps = {
  title: string;
  description: string;
  image: string;
  onPlay: () => void;
};

const GameCard: React.FC<GameCardProps> = ({ title, description, image, onPlay }) => {
  return (
    <div style={{ border: '2px solid #64ffda', borderRadius: '12px', padding: '1rem', background: '#0a192f', color: '#fff', margin: '1rem', minWidth: '220px', boxShadow: '0 4px 16px #0006' }}>
      <img src={image} alt={title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem', background: '#222' }} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        style={{
          background: '#ffd700',
          color: '#0a192f',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem 1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '1rem',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
        onClick={onPlay}
        aria-label={`Jugar a ${title}`}
        onMouseOver={e => (e.currentTarget.style.background = '#64ffda')}
        onMouseOut={e => (e.currentTarget.style.background = '#ffd700')}
        onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 3px #64ffda88')}
        onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
      >
        JUGAR
      </button>
    </div>
  );
};

export default GameCard; 