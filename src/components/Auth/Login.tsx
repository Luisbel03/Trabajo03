import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './Auth.css';

interface LoginForm {
  identifier: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    identifier: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showNotification } = useNotification();
  
  // Check for success message from registration
  const message = location.state?.message || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.identifier || !formData.password) {
      showNotification('Por favor, completa todos los campos', 'error');
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.identifier, formData.password);
      showNotification('¡Inicio de sesión exitoso!', 'success');
      navigate('/');
    } catch (error) {
      showNotification('Error al iniciar sesión. Verifica tus credenciales.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Iniciar Sesión</h2>
        {message && <div className="success-message">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifier">Email o nombre de usuario</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="form-control"
              disabled={isLoading}
              placeholder="Ingresa tu email o nombre de usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              disabled={isLoading}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 