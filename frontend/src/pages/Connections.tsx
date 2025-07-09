import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

interface ConnectionsData {
  elements: string[];
  groups: string[][];
}

const defaultData: ConnectionsData = {
  elements: Array(16).fill('-'),
  groups: [],
};

const Connections: React.FC = () => {
  const [data, setData] = useState<ConnectionsData>(defaultData);
  const [selected, setSelected] = useState<string[]>([]);
  const [foundGroups, setFoundGroups] = useState<string[][]>([]);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchConnections = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiUrl}/api/connections/random`);
      if (!res.ok) throw new Error('No se pudo obtener los datos');
      const json = await res.json();
      setData(json);
      setSelected([]);
      setFoundGroups([]);
      setFeedback('');
    } catch (err) {
      setError('No se pudo cargar el juego. Verifica tu conexión o que el backend esté activo.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleSelect = (el: string) => {
    if (selected.includes(el) || foundGroups.flat().includes(el)) return;
    if (selected.length < 4) {
      setSelected([...selected, el]);
    }
  };

  const handleCheck = () => {
    if (selected.length !== 4) return;
    // Verificar si el grupo seleccionado es uno de los correctos
    const isCorrect = data.groups.some(group =>
      group.every(el => selected.includes(el)) && selected.every(el => group.includes(el))
    );
    if (isCorrect) {
      setFoundGroups([...foundGroups, selected]);
      setFeedback('¡Grupo correcto!');
    } else {
      setFeedback('Grupo incorrecto. Intenta de nuevo.');
    }
    setSelected([]);
    setTimeout(() => setFeedback(''), 1500);
  };

  const handleReset = () => {
    fetchConnections();
  };

  if (loading) {
    return <Loader text="Cargando set..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleReset} />;
  }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#112240', borderRadius: 12, padding: 24, boxShadow: '0 4px 24px #0008', color: '#fff', textAlign: 'center' }}>
      <h2 style={{ color: '#64ffda', marginBottom: 24 }}>Anime Connections</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {data.elements.map(el => {
          const isSelected = selected.includes(el);
          const isFound = foundGroups.flat().includes(el);
          return (
            <button
              key={el}
              onClick={() => handleSelect(el)}
              disabled={isFound}
              style={{
                background: isFound ? '#64ffda' : isSelected ? '#ffd700' : '#223',
                color: isFound ? '#0a192f' : isSelected ? '#0a192f' : '#fff',
                border: isSelected ? '2px solid #ffd700' : '1px solid #64ffda',
                borderRadius: 8,
                padding: '1.2rem 0',
                fontWeight: 'bold',
                fontSize: 18,
                cursor: isFound ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 2px 8px #ffd70055' : isFound ? '0 2px 8px #64ffda55' : 'none',
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={handleCheck}
          disabled={selected.length !== 4}
          style={{
            background: '#64ffda',
            color: '#0a192f',
            border: 'none',
            borderRadius: 8,
            padding: '0.5rem 2rem',
            fontWeight: 'bold',
            cursor: selected.length === 4 ? 'pointer' : 'not-allowed',
            marginRight: 8,
            opacity: selected.length === 4 ? 1 : 0.6,
          }}
        >
          Comprobar grupo
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
      {feedback && (
        <div style={{ color: feedback.includes('correcto') ? '#64ffda' : '#ffd700', fontWeight: 'bold', fontSize: 18, marginBottom: 12, minHeight: 24, transition: 'color 0.2s' }}>
          {feedback}
        </div>
      )}
      <div style={{ color: '#cfd8dc', marginTop: 16 }}>
        <b>Instrucciones:</b> Selecciona 4 elementos y presiona "Comprobar grupo". Encuentra los 4 grupos correctos.
      </div>
      {foundGroups.length === 4 && (
        <div style={{ color: '#64ffda', fontWeight: 'bold', fontSize: 22, marginTop: 24 }}>
          ¡Felicidades! Has encontrado todos los grupos.
        </div>
      )}
    </div>
  );
};

export default Connections; 