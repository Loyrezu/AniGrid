import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <div
    style={{
      color: '#ffd700',
      textAlign: 'center',
      marginTop: '5rem',
      maxWidth: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      background: '#222',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 4px 24px #0008',
    }}
    role="alert"
    aria-live="assertive"
  >
    <b>Error:</b> {message}
    <br />
    <button
      onClick={onRetry}
      style={{
        marginTop: 16,
        background: '#64ffda',
        color: '#0a192f',
        border: 'none',
        borderRadius: 8,
        padding: '0.5rem 1.5rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      aria-label="Reintentar"
      onMouseOver={e => (e.currentTarget.style.background = '#ffd700')}
      onMouseOut={e => (e.currentTarget.style.background = '#64ffda')}
      onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 3px #ffd70088')}
      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      Reintentar
    </button>
  </div>
);

export default ErrorMessage; 