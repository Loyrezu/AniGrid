import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const MAX_ATTEMPTS = 6;

const getFeedback = (guess: string, answer: string) => {
  const WORD_LENGTH = answer.length;
  const feedback: ('correct' | 'present' | 'absent')[] = Array(WORD_LENGTH).fill('absent');
  const answerArr = answer.split('');
  const guessArr = guess.split('');
  const used = Array(WORD_LENGTH).fill(false);
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === answerArr[i]) {
      feedback[i] = 'correct';
      used[i] = true;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (feedback[i] === 'correct') continue;
    const idx = answerArr.findIndex((ch, j) => ch === guessArr[i] && !used[j]);
    if (idx !== -1) {
      feedback[i] = 'present';
      used[idx] = true;
    }
  }
  return feedback;
};

const AniWordle: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [feedbacks, setFeedbacks] = useState<Array<('correct' | 'present' | 'absent')[]>>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWord = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/aniwordle/random');
      if (!res.ok) throw new Error('No se pudo obtener la palabra');
      const data = await res.json();
      setAnswer(data.word);
      setGuesses([]);
      setFeedbacks([]);
      setCurrent('');
      setStatus('playing');
    } catch (err) {
      setError('No se pudo cargar la palabra. Verifica tu conexión o que el backend esté activo.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const WORD_LENGTH = answer.length;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (value.length <= WORD_LENGTH) setCurrent(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (current.length !== WORD_LENGTH || status !== 'playing') return;
    const feedback = getFeedback(current, answer);
    const newGuesses = [...guesses, current];
    const newFeedbacks = [...feedbacks, feedback];
    setGuesses(newGuesses);
    setFeedbacks(newFeedbacks);
    setCurrent('');
    if (current === answer) {
      setStatus('won');
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setStatus('lost');
    }
  };

  const handleReset = () => {
    fetchWord();
  };

  if (loading) {
    return <Loader text="Cargando palabra..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleReset} />;
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', background: '#112240', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px #0008', color: '#fff', textAlign: 'center' }}>
      <h2 style={{ color: '#64ffda', marginBottom: 24 }}>AniWordle</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {Array(MAX_ATTEMPTS).fill(null).map((_, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {(guesses[i] || '').padEnd(WORD_LENGTH).split('').map((ch, j) => (
              <div
                key={j}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 6,
                  background:
                    feedbacks[i]?.[j] === 'correct'
                      ? '#64ffda'
                      : feedbacks[i]?.[j] === 'present'
                      ? '#ffd700'
                      : '#223',
                  color:
                    feedbacks[i]?.[j] === 'correct' || feedbacks[i]?.[j] === 'present'
                      ? '#0a192f'
                      : '#fff',
                  fontWeight: 'bold',
                  fontSize: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #112240',
                  transition: 'background 0.2s',
                }}
              >
                {ch}
              </div>
            ))}
          </div>
        ))}
      </div>
      {status === 'playing' && answer && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
          <input
            type="text"
            value={current}
            onChange={handleInput}
            maxLength={WORD_LENGTH}
            style={{
              width: 180,
              padding: 8,
              borderRadius: 6,
              border: '1px solid #64ffda',
              fontSize: 20,
              textAlign: 'center',
              letterSpacing: 8,
              background: '#fff',
              color: '#0a192f',
              fontWeight: 'bold',
              marginRight: 8,
            }}
            disabled={status !== 'playing'}
            autoFocus
            aria-label="Intento de palabra"
          />
          <button
            type="submit"
            style={{
              background: '#64ffda',
              color: '#0a192f',
              border: 'none',
              borderRadius: 8,
              padding: '0.5rem 1.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            disabled={current.length !== WORD_LENGTH}
          >
            Probar
          </button>
        </form>
      )}
      {status === 'won' && (
        <div style={{ color: '#64ffda', fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
          ¡Correcto! La palabra era <span style={{ color: '#ffd700' }}>{answer}</span>
        </div>
      )}
      {status === 'lost' && (
        <div style={{ color: '#ffd700', fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
          Fin del juego. La palabra era <span style={{ color: '#64ffda' }}>{answer}</span>
        </div>
      )}
      <button
        onClick={handleReset}
        style={{
          background: '#ffd700',
          color: '#0a192f',
          border: 'none',
          borderRadius: 8,
          padding: '0.5rem 2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: 8,
        }}
      >
        Reiniciar
      </button>
      <div style={{ color: '#cfd8dc', marginTop: 16 }}>
        <b>Instrucciones:</b> Adivina la palabra relacionada con anime en {MAX_ATTEMPTS} intentos. Verde = letra correcta, Amarillo = letra en otra posición.
      </div>
    </div>
  );
};

export default AniWordle; 