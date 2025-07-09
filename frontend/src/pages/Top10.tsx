import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface Top10Data {
  elements: string[];
  correctOrder: string[];
}

const defaultData: Top10Data = {
  elements: Array(10).fill('-'),
  correctOrder: Array(10).fill('-'),
};

const Top10: React.FC = () => {
  const [data, setData] = useState<Top10Data>(defaultData);
  const [order, setOrder] = useState<string[]>(defaultData.elements);
  const [feedback, setFeedback] = useState<string[]>(Array(10).fill(''));
  const [status, setStatus] = useState<'playing' | 'won'>('playing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchTop10 = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiUrl}/api/top10/random`);
      if (!res.ok) throw new Error('No se pudo obtener la lista');
      const json = await res.json();
      setData(json);
      setOrder(json.elements);
      setFeedback(Array(10).fill(''));
      setStatus('playing');
    } catch (err) {
      setError('No se pudo cargar la lista. Verifica tu conexión o que el backend esté activo.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTop10();
  }, []);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length) return;
    const newOrder = order.slice();
    const temp = newOrder[from];
    newOrder[from] = newOrder[to];
    newOrder[to] = temp;
    setOrder(newOrder);
  };

  const handleCheck = () => {
    const newFeedback = order.map((el, i) =>
      el === data.correctOrder[i] ? 'correcto' : 'incorrecto'
    );
    setFeedback(newFeedback);
    if (newFeedback.every(f => f === 'correcto')) {
      setStatus('won');
    }
  };

  const handleReset = () => {
    fetchTop10();
  };

  if (loading) {
    return <Loader text="Cargando lista..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleReset} />;
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#112240', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px #0008', color: '#fff', textAlign: 'center' }}>
      <h2 style={{ color: '#64ffda', marginBottom: 24 }}>Anime Top 10</h2>
      <div style={{ marginBottom: 24, color: '#cfd8dc' }}>
        <b>Instrucciones:</b> Ordena los personajes por el criterio indicado. Usa las flechas para moverlos y presiona "Comprobar".
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {order.map((el, i) => (
          <div key={el} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#223', borderRadius: 6, padding: '0.5rem 1rem', border: feedback[i] === 'correcto' ? '2px solid #64ffda' : feedback[i] === 'incorrecto' ? '2px solid #ffd700' : '1px solid #112240', transition: 'border 0.2s' }}>
            <span style={{ width: 24, fontWeight: 'bold', color: '#ffd700' }}>{i + 1}</span>
            <span style={{ flex: 1, fontWeight: 'bold', color: '#fff' }}>{el}</span>
            <button onClick={() => move(i, i - 1)} disabled={i === 0 || status === 'won'} style={{ background: '#64ffda', color: '#0a192f', border: 'none', borderRadius: 4, padding: '0.2rem 0.7rem', fontWeight: 'bold', cursor: i === 0 || status === 'won' ? 'not-allowed' : 'pointer', opacity: i === 0 || status === 'won' ? 0.5 : 1 }}>↑</button>
            <button onClick={() => move(i, i + 1)} disabled={i === order.length - 1 || status === 'won'} style={{ background: '#ffd700', color: '#0a192f', border: 'none', borderRadius: 4, padding: '0.2rem 0.7rem', fontWeight: 'bold', cursor: i === order.length - 1 || status === 'won' ? 'not-allowed' : 'pointer', opacity: i === order.length - 1 || status === 'won' ? 0.5 : 1 }}>↓</button>
          </div>
        ))}
      </div>
      {status === 'won' && (
        <div style={{ color: '#64ffda', fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
          ¡Correcto! Has ordenado la lista perfectamente.
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={handleCheck}
          disabled={status === 'won'}
          style={{
            background: '#64ffda',
            color: '#0a192f',
            border: 'none',
            borderRadius: 8,
            padding: '0.5rem 2rem',
            fontWeight: 'bold',
            cursor: status === 'won' ? 'not-allowed' : 'pointer',
            marginRight: 8,
            opacity: status === 'won' ? 0.6 : 1,
          }}
        >
          Comprobar
        </button>
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
            marginLeft: 8,
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Top10; 