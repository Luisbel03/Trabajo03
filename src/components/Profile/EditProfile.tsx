import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './Profile.css';
import '../../styles/scrollbar.css';

interface ProfileForm {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
}

const EditProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<ProfileForm>({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      showNotification('Perfil actualizado con éxito', 'success');
      navigate('/perfil');
    } catch (error) {
      showNotification('Error al actualizar el perfil', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-section custom-scrollbar">
      <div className="profile-content">
        <h2>Editar Perfil</h2>
        <div className="profile-info">
          <p>Actualiza tu información personal:</p>
          <ul>
            <li>Tu nombre completo te ayuda a ser reconocido</li>
            <li>Mantén tu email actualizado para notificaciones</li>
            <li>La biografía permite que otros te conozcan mejor</li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">Nombre</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="form-control"
              disabled={isLoading}
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Apellido</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="form-control"
              disabled={isLoading}
              placeholder="Tu apellido"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              disabled={isLoading}
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biografía</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-control"
              rows={4}
              disabled={isLoading}
              placeholder="Cuéntanos un poco sobre ti..."
            />
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
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile; 