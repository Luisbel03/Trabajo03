import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '../../context/NotificationContext';
import contactService from '../../services/contactService';
import type { ContactFormData } from '../../services/contactService';
import './Contact.css';

const Contact: React.FC = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.sendMessage(formData);
      showNotification(
        'Gracias por contactarnos. Nuestro equipo de trabajo revisará su petición y tratará de resolverla o se pondrá en contacto con usted para resolver su problema.',
        'success'
      );
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      showNotification(
        error.message || 'Ha ocurrido un error al enviar el mensaje. Por favor, intente nuevamente.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      className="contact-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-header">
        <h1>Contacto</h1>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h3>Dirección</h3>
              <p>Universidad de Ciencias Informáticas (UCI), La Habana</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h3>Teléfono</h3>
              <p>+53 51542283</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>info@creativeweb.com</p>
            </div>
          </div>
        </div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre completo"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Asunto"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensaje"
              required
              rows={5}
              disabled={isSubmitting}
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact; 