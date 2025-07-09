import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 100 }}>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#223', borderRadius: 8, padding: '0.5rem 1rem', boxShadow: '0 2px 8px #0006' }}>
          <span style={{ color: '#64ffda', fontWeight: 'bold' }}>👤 {user.name}</span>
          <button
            onClick={logout}
            style={{ background: '#ffd700', color: '#0a192f', border: 'none', borderRadius: 6, padding: '0.3rem 1rem', fontWeight: 'bold', cursor: 'pointer', marginLeft: 8 }}
            aria-label="Cerrar sesión"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/login" style={{ color: '#64ffda', fontWeight: 'bold', textDecoration: 'none', background: '#223', borderRadius: 6, padding: '0.3rem 1rem' }}>
            Iniciar sesión
          </Link>
          <Link to="/register" style={{ color: '#ffd700', fontWeight: 'bold', textDecoration: 'none', background: '#223', borderRadius: 6, padding: '0.3rem 1rem' }}>
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 