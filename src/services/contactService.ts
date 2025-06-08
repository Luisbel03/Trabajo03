import api from './api';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactService = {
  sendMessage: async (data: ContactFormData) => {
    try {
      const response = await api.post('/contact/', data);
      return response.data;
    } catch (error: any) {
      // Si hay un mensaje de error específico del servidor, úsalo
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      // Si no hay un mensaje específico, usa el mensaje genérico
      throw new Error('Error al enviar el mensaje. Por favor, intente nuevamente.');
    }
  },
};

export default contactService; 