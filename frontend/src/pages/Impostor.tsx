import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface ImpostorData {
  elements: string[];
  impostorIndex: number;
  group: string;
}

const defaultData: ImpostorData = {
  elements: Array(8).fill('-'),
  impostorIndex: -1,
  group: '',
};

const Impostor: React.FC = () => {
  const [data, setData] = useState<ImpostorData>(defaultData);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchImpostor = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/impostor/random');
      if (!res.ok) throw new Error('No se pudo obtener el set');
      const json = await res.json();
      setData(json);
      setSelected(null);
      setStatus('playing');
    } catch (err) {
      setError('No se pudo cargar el set. Verifica tu conexión o que el backend esté activo.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImpostor();
  }, []);

  const handleSelect = (idx: number) => {
    if (status !== 'playing') return;
    setSelected(idx);
    if (idx === data.impostorIndex) {
      setStatus('won');
    } else {
      setStatus('lost');
    }
  };

  const handleReset = () => {
    fetchImpostor();
  };

  if (loading) {
    return <Loader text="Cargando set..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleReset} />;
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#112240', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px #0008', color: '#fff', textAlign: 'center' }}>
      <h2 style={{ color: '#64ffda', marginBottom: 18 }}>The Impostor</h2>
      <div style={{ marginBottom: 18, color: '#cfd8dc', fontWeight: 'bold' }}>{data.group}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {data.elements.map((el, i) => (
          <button
            key={el}
            onClick={() => handleSelect(i)}
            disabled={status !== 'playing'}
            style={{
              background:
                selected === i && status === 'won'
                  ? '#64ffda'
                  : selected === i && status === 'lost'
                  ? '#ffd700'
                  : '#223',
              color:
                selected === i && (status === 'won' || status === 'lost')
                  ? '#0a192f'
                  : '#fff',
              border:
                selected === i && status === 'won'
                  ? '2px solid #64ffda'
                  : selected === i && status === 'lost'
                  ? '2px solid #ffd700'
                  : '1px solid #112240',
              borderRadius: 8,
              padding: '1.2rem 0.5rem',
              fontWeight: 'bold',
              fontSize: 18,
              cursor: status === 'playing' ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow:
                selected === i && (status === 'won' || status === 'lost')
                  ? '0 0 12px #64ffda88'
                  : 'none',
            }}
          >
            {el}
          </button>
        ))}
      </div>
      {status === 'won' && (
        <div style={{ color: '#64ffda', fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
          ¡Correcto! Has encontrado al impostor.
        </div>
      )}
      {status === 'lost' && (
        <div style={{ color: '#ffd700', fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>
          Incorrecto. El impostor era: <span style={{ color: '#64ffda' }}>{data.elements[data.impostorIndex]}</span>
        </div>
      )}
      <button
        onClick={handleReset}
        style={{
          background: '#64ffda',
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
    </div>
  );
};

export default Impostor; 