import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { ChangePasswordData } from '../../types/user';
import './Profile.css';
import '../../styles/scrollbar.css';

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState<ChangePasswordData>({
    current_password: '',
    new_password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const navigate = useNavigate();
  const { changePassword } = useAuth();
  const { showNotification } = useNotification();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.current_password) {
      newErrors.current_password = 'La contraseña actual es requerida';
    }
    
    if (!formData.new_password) {
      newErrors.new_password = 'La nueva contraseña es requerida';
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (formData.new_password !== confirmPassword) {
      newErrors.confirm_password = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirm_password') {
      setConfirmPassword(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await changePassword(formData);
      showNotification('Contraseña actualizada con éxito', 'success');
      navigate('/perfil');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al cambiar la contraseña';
      showNotification(errorMessage, 'error');
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-section custom-scrollbar">
      <div className="profile-content">
        <h2>Cambiar Contraseña</h2>
        <div className="profile-info">
          <p>Actualiza tu contraseña de acceso. Asegúrate de usar una contraseña segura que:</p>
          <ul>
            <li>Tenga al menos 8 caracteres</li>
            <li>Incluya números y letras</li>
            <li>Contenga caracteres especiales</li>
            <li>Combine mayúsculas y minúsculas</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current_password">Contraseña Actual</label>
            <input
              type="password"
              id="current_password"
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              required
              className={`form-control ${errors.current_password ? 'error' : ''}`}
              disabled={isLoading}
              placeholder="Ingresa tu contraseña actual"
            />
            {errors.current_password && (
              <span className="error-message">{errors.current_password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="new_password">Nueva Contraseña</label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              required
              className={`form-control ${errors.new_password ? 'error' : ''}`}
              disabled={isLoading}
              placeholder="Ingresa tu nueva contraseña"
              minLength={8}
            />
            {errors.new_password && (
              <span className="error-message">{errors.new_password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={confirmPassword}
              onChange={handleChange}
              required
              className={`form-control ${errors.confirm_password ? 'error' : ''}`}
              disabled={isLoading}
              placeholder="Confirma tu nueva contraseña"
            />
            {errors.confirm_password && (
              <span className="error-message">{errors.confirm_password}</span>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => navigate('/perfil')}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword; 