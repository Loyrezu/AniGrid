import React, { useEffect, useState } from 'react';

interface Opening {
  id: number;
  anime: string;
  song: string;
  artist: string;
  year: number;
  audio: string;
  hint: string;
}

const GuessOpening: React.FC = () => {
  const [opening, setOpening] = useState<Opening | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState('');

  const fetchOpening = async () => {
    setLoading(true);
    setFeedback('');
    setUserAnswer('');
    setShowHint(false);
    setIsCorrect(false);
    setShowDetails(false);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/openings/random');
      if (!res.ok) throw new Error('No se pudo obtener el opening');
      const data = await res.json();
      setOpening(data);
    } catch (err) {
      setError('No se pudo cargar el opening. Verifica tu conexión o que el backend esté activo.');
      setOpening(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOpening();
    // Accesibilidad: enfocar el input al cargar
    setTimeout(() => {
      const input = document.getElementById('guess-input');
      if (input) input.focus();
    }, 500);
  }, []);

  const handleCheck = () => {
    if (!opening) return;
    if (userAnswer.trim().toLowerCase() === opening.anime.trim().toLowerCase()) {
      setFeedback('¡Correcto!');
      setIsCorrect(true);
      setTimeout(() => setShowDetails(true), 600);
    } else {
      setFeedback('Incorrecto. Intenta de nuevo o pide una pista.');
      setIsCorrect(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: '#64ffda', textAlign: 'center', marginTop: '5rem' }}>
        <div className="loader" style={{ margin: '0 auto 1.5rem', width: 48, height: 48, border: '6px solid #223', borderTop: '6px solid #64ffda', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        Cargando opening...
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: '#ffd700', textAlign: 'center', marginTop: '5rem', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', background: '#222', borderRadius: 12, padding: 24 }}>
        <b>Error:</b> {error}
        <br />
        <button onClick={fetchOpening} style={{ marginTop: 16, background: '#64ffda', color: '#0a192f', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!opening) {
    return (
      <div style={{ color: '#ffd700', textAlign: 'center', marginTop: '5rem' }}>
        No hay datos de opening disponibles.
        <br />
        <button onClick={fetchOpening} style={{ marginTop: 16, background: '#64ffda', color: '#0a192f', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '3rem auto', background: '#112240', borderRadius: 12, padding: 32, boxShadow: '0 4px 24px #0008', color: '#fff', textAlign: 'center' }}>
      <h2 style={{ color: '#64ffda' }}>Guess the Opening</h2>
      <audio controls src={opening.audio} style={{ width: '100%', margin: '1rem 0' }}>
        Tu navegador no soporta el elemento de audio.
      </audio>
      <div style={{ margin: '1rem 0' }}>
        <input
          id="guess-input"
          type="text"
          placeholder="¿De qué anime es este opening?"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: isCorrect ? '2px solid #64ffda' : '1px solid #64ffda',
            width: '80%',
            background: isCorrect ? '#eafff7' : '#fff',
            color: isCorrect ? '#0a192f' : '#222',
            fontWeight: isCorrect ? 'bold' : 'normal',
            transition: 'all 0.2s',
          }}
          disabled={isCorrect}
          aria-label="Adivina el anime del opening"
        />
      </div>
      <button
        onClick={handleCheck}
        style={{
          background: isCorrect ? '#64ffda' : '#ffd700',
          color: '#0a192f',
          border: 'none',
          borderRadius: 8,
          padding: '0.5rem 1.5rem',
          fontWeight: 'bold',
          cursor: isCorrect ? 'not-allowed' : 'pointer',
          marginRight: 8,
          opacity: isCorrect ? 0.6 : 1,
          transition: 'all 0.2s',
        }}
        disabled={isCorrect}
        aria-disabled={isCorrect}
      >
        Comprobar
      </button>
      <button
        onClick={() => setShowHint(true)}
        style={{
          background: '#64ffda',
          color: '#0a192f',
          border: 'none',
          borderRadius: 8,
          padding: '0.5rem 1.5rem',
          fontWeight: 'bold',
          cursor: isCorrect ? 'not-allowed' : 'pointer',
          marginLeft: 8,
          opacity: isCorrect ? 0.6 : 1,
        }}
        disabled={isCorrect}
        aria-disabled={isCorrect}
      >
        Pista
      </button>
      <button
        onClick={fetchOpening}
        style={{
          background: '#222',
          color: '#64ffda',
          border: '1px solid #64ffda',
          borderRadius: 8,
          padding: '0.5rem 1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginLeft: 8,
        }}
      >
        Siguiente
      </button>
      <div style={{ marginTop: 16, minHeight: 32 }}>
        {feedback && (
          <span
            style={{
              color: isCorrect ? '#64ffda' : '#ffd700',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'color 0.2s',
              display: 'inline-block',
              animation: feedback && isCorrect ? 'pop 0.4s' : undefined,
            }}
          >
            {feedback}
          </span>
        )}
        {showHint && !isCorrect && (
          <div style={{ color: '#ffd700', marginTop: 8 }}>
            <b>Pista:</b> {opening.hint} | Año: {opening.year}
          </div>
        )}
        {showDetails && isCorrect && (
          <div style={{ color: '#fff', marginTop: 16, background: '#223', borderRadius: 8, padding: 12 }}>
            <b>¡Era:</b> {opening.anime}<br />
            <b>Canción:</b> {opening.song}<br />
            <b>Artista:</b> {opening.artist}
          </div>
        )}
      </div>
      <style>{`
        @keyframes pop {
          0% { transform: scale(1); }
          60% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default GuessOpening; 