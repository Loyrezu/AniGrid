import React from 'react';

const Loader: React.FC<{ text?: string }> = ({ text = 'Cargando...' }) => (
  <div style={{ color: '#64ffda', textAlign: 'center', marginTop: '5rem' }} role="status" aria-live="polite">
    <div
      style={{
        margin: '0 auto 1.5rem',
        width: 48,
        height: 48,
        border: '6px solid #223',
        borderTop: '6px solid #64ffda',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    {text}
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader; 