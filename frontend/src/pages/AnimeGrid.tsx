import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface AnimeGridData {
  rowCategories: string[];
  colCategories: string[];
  correctAnswers: string[][];
}

const defaultGrid: AnimeGridData = {
  rowCategories: ['-', '-', '-'],
  colCategories: ['-', '-', '-'],
  correctAnswers: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
};

const AnimeGrid: React.FC = () => {
  const [grid, setGrid] = useState<AnimeGridData>(defaultGrid);
  const [answers, setAnswers] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [feedback, setFeedback] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGrid = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/animegrid/random');
      if (!res.ok) throw new Error('No se pudo obtener el grid');
      const data = await res.json();
      setGrid(data);
      setAnswers([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
      setFeedback([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
    } catch (err) {
      setError('No se pudo cargar el grid. Verifica tu conexión o que el backend esté activo.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGrid();
  }, []);

  const handleChange = (row: number, col: number, value: string) => {
    const newAnswers = answers.map(arr => [...arr]);
    newAnswers[row][col] = value;
    setAnswers(newAnswers);
  };

  const handleCheck = (row: number, col: number) => {
    const user = answers[row][col].trim().toLowerCase();
    const correct = grid.correctAnswers[row][col].trim().toLowerCase();
    const newFeedback = feedback.map(arr => [...arr]);
    if (user === correct && user !== '') {
      newFeedback[row][col] = 'correcto';
    } else {
      newFeedback[row][col] = 'incorrecto';
    }
    setFeedback(newFeedback);
  };

  // Limpiar y recargar grid
  const handleReset = () => {
    fetchGrid();
  };

  if (loading) {
    return <Loader text="Cargando grid..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleReset} />;
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#112240', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px #0008', color: '#fff' }}>
      <h2 style={{ color: '#64ffda', textAlign: 'center', marginBottom: 24 }}>AnimeGrid</h2>
      <div style={{ overflowX: 'auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px repeat(3, minmax(120px, 1fr))',
            gap: 8,
            minWidth: 480,
          }}
        >
          <div></div>
          {grid.colCategories.map((cat, i) => (
            <div key={i} style={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'center', padding: 8 }}>{cat}</div>
          ))}
          {grid.rowCategories.map((rowCat, row) => (
            <React.Fragment key={row}>
              <div style={{ color: '#ffd700', fontWeight: 'bold', padding: 8 }}>{rowCat}</div>
              {grid.colCategories.map((_, col) => (
                <div key={col} style={{ textAlign: 'center', padding: 8, minWidth: 120 }}>
                  <input
                    type="text"
                    value={answers[row][col]}
                    onChange={e => handleChange(row, col, e.target.value)}
                    style={{
                      width: '90%',
                      padding: 6,
                      borderRadius: 6,
                      border: feedback[row][col] === 'correcto' ? '2px solid #64ffda' : feedback[row][col] === 'incorrecto' ? '2px solid #ffd700' : '1px solid #64ffda',
                      background: feedback[row][col] === 'correcto' ? '#eafff7' : '#fff',
                      color: feedback[row][col] === 'correcto' ? '#0a192f' : '#222',
                      fontWeight: feedback[row][col] === 'correcto' ? 'bold' : 'normal',
                      transition: 'all 0.2s',
                    }}
                    disabled={feedback[row][col] === 'correcto'}
                    aria-label={`Celda ${row + 1},${col + 1}`}
                  />
                  <button
                    onClick={() => handleCheck(row, col)}
                    style={{
                      background: '#64ffda',
                      color: '#0a192f',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0.3rem 1rem',
                      fontWeight: 'bold',
                      cursor: feedback[row][col] === 'correcto' ? 'not-allowed' : 'pointer',
                      marginLeft: 6,
                      marginTop: 4,
                      opacity: feedback[row][col] === 'correcto' ? 0.6 : 1,
                    }}
                    disabled={feedback[row][col] === 'correcto'}
                  >
                    Comprobar
                  </button>
                  {feedback[row][col] === 'correcto' && (
                    <div style={{ color: '#64ffda', fontWeight: 'bold', marginTop: 4, animation: 'pop 0.4s' }}>✔</div>
                  )}
                  {feedback[row][col] === 'incorrecto' && (
                    <div style={{ color: '#ffd700', fontWeight: 'bold', marginTop: 4, animation: 'shake 0.4s' }}>✗</div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 24, color: '#cfd8dc' }}>
        <b>Instrucciones:</b> Escribe un anime/personaje que cumpla ambas categorías y presiona "Comprobar".
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
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
            boxShadow: '0 2px 8px #0003',
          }}
        >
          Limpiar Grid
        </button>
      </div>
      <style>{`
        @keyframes pop {
          0% { transform: scale(1); }
          60% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AnimeGrid; 