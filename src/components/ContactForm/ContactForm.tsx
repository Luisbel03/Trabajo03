import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedElement from '../AnimatedElement/AnimatedElement';
import { useNotification } from '../../context/NotificationContext';
import './ContactForm.css';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  description: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const ContactForm: React.FC = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Selecciona un tipo de proyecto';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      showNotification('Error en el formulario', 'error');
      return;
    }

    try {
      // Simulación de envío al servidor
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification('¡Formulario enviado!', 'success');

      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        description: ''
      });
    } catch (error) {
      showNotification('Error al enviar', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedElement animation="fadeIn">
      <motion.form
        className="contact-form"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
      >
        <div className="form-grid">
          <motion.div className="form-group">
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              whileFocus={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="form-group">
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu email"
              whileFocus={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="form-group">
            <motion.select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              whileFocus={{ scale: 1.01 }}
            >
              <option value="">Tipo de proyecto</option>
              <option value="web">Desarrollo Web</option>
              <option value="app">Aplicación Móvil</option>
              <option value="ecommerce">E-commerce</option>
              <option value="other">Otro</option>
            </motion.select>
            <AnimatePresence>
              {errors.projectType && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.projectType}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="form-group">
            <motion.select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              whileFocus={{ scale: 1.01 }}
            >
              <option value="">Presupuesto estimado</option>
              <option value="small">Menos de €5,000</option>
              <option value="medium">€5,000 - €10,000</option>
              <option value="large">€10,000 - €20,000</option>
              <option value="enterprise">Más de €20,000</option>
            </motion.select>
          </motion.div>

          <motion.div className="form-group full-width">
            <motion.textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Cuéntanos sobre tu proyecto"
              rows={5}
              whileFocus={{ scale: 1.01 }}
            />
            <AnimatePresence>
              {errors.description && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.description}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </motion.button>
      </motion.form>
    </AnimatedElement>
  );
};

export default ContactForm; 