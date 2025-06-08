import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, RegisterData, ChangePasswordData } from '../types/user';
import { authService } from '../services/api';
import { useNotification } from './NotificationContext';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser()
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setUser(null);
        });
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const response = await authService.login(identifier, password);
      localStorage.setItem('token', response.access);
      localStorage.setItem('refreshToken', response.refresh);
      const userData = await authService.getCurrentUser();
      setUser(userData);
      return response;
    } catch (error) {
      showNotification('Error al iniciar sesión', 'error');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);
    } catch (error) {
      showNotification('Error al cerrar sesión', 'error');
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      showNotification('Error al actualizar el perfil', 'error');
      throw error;
    }
  };

  const changePassword = async (data: ChangePasswordData) => {
    try {
      await authService.changePassword(data);
      showNotification('Contraseña actualizada exitosamente', 'success');
    } catch (error) {
      showNotification('Error al cambiar la contraseña', 'error');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 