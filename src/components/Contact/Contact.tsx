import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: '¡Mensaje enviado!',
        message: 'Nos pondremos en contacto contigo pronto.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
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
        <h1>Contáctanos</h1>
        <p>¿Tienes un proyecto en mente? ¡Hablemos!</p>
      </div>

      <div className="contact-content">
        <motion.div
          className="contact-info"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="info-item">
            <h3>📍 Ubicación</h3>
            <p>Universidad de Ciencias Informáticas (UCI) La Habana</p>
          </div>
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>luisbeltellezfajardo@gmail.com</p>
          </div>
          <div className="info-item">
            <h3>📱 Teléfono</h3>
            <p>+53 51542283</p>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
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
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enviar mensaje
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact; 