import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { register, loading, error, clearError, user } = useUser();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, name, password);
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', background: '#112240', borderRadius: 12, padding: 32, boxShadow: '0 4px 24px #0008', color: '#fff' }}>
      <h2 style={{ color: '#64ffda', marginBottom: 24, textAlign: 'center' }}>Registro</h2>
      {loading && <Loader text="Registrando..." />}
      {error && <ErrorMessage message={error} onRetry={clearError} />}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 12 }}>
            Nombre
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #223', marginTop: 4, marginBottom: 16 }}
              autoFocus
            />
          </label>
          <label style={{ display: 'block', marginBottom: 12 }}>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #223', marginTop: 4, marginBottom: 16 }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: 12 }}>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #223', marginTop: 4, marginBottom: 16 }}
            />
          </label>
          <button
            type="submit"
            style={{ width: '100%', background: '#64ffda', color: '#0a192f', border: 'none', borderRadius: 8, padding: '0.7rem 0', fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginBottom: 12 }}
          >
            Registrarse
          </button>
        </form>
      )}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: '#ffd700', textDecoration: 'underline' }}>
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default Register; 