import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { useNotification } from '../../context/NotificationContext';
import './Services.css';

// Asegurarse de que el modal se monte en el elemento root de la aplicación
Modal.setAppElement('#root');

interface WebFormData {
  fullName: string;
  email: string;
  projectName: string;
  description: string;
  mainObjective: string;
  features: string;
  targetAudience: string;
  estimatedDeadline: string;
  hasDesign: string;
  hostingManagement: string;
  referenceWebsites: string;
  additionalComments: string;
}

interface MobileFormData {
  fullName: string;
  email: string;
  appName: string;
  description: string;
  operatingSystem: string;
  features: string;
  targetAudience: string;
  estimatedDeadline: string;
  hasDesign: string;
  storePublishing: string;
  referenceApps: string;
  additionalComments: string;
}

interface ConsultingFormData {
  fullName: string;
  email: string;
  companyName: string;
  companySize: string;
  mainObjective: string;
  currentTechnologies: string;
  estimatedStartDate: string;
  hasTechnicalTeam: string;
  needsTraining: string;
  technologiesInterested: string;
  additionalComments: string;
}

interface MarketingFormData {
  fullName: string;
  email: string;
  brandName: string;
  mainObjective: string;
  hasSocialMedia: string;
  socialMediaLinks: string;
  hasWebsite: string;
  websiteUrl: string;
  targetAudience: string;
  previousInvestment: string;
  platformsOfInterest: string;
  strategyType: string;
  additionalComments: string;
}

type ModalType = 'web' | 'mobile' | 'consulting' | 'marketing' | null;

const initialWebFormData: WebFormData = {
  fullName: '',
  email: '',
  projectName: '',
  description: '',
  mainObjective: '',
  features: '',
  targetAudience: '',
  estimatedDeadline: '',
  hasDesign: '',
  hostingManagement: '',
  referenceWebsites: '',
  additionalComments: ''
};

const initialMobileFormData: MobileFormData = {
  fullName: '',
  email: '',
  appName: '',
  description: '',
  operatingSystem: '',
  features: '',
  targetAudience: '',
  estimatedDeadline: '',
  hasDesign: '',
  storePublishing: '',
  referenceApps: '',
  additionalComments: ''
};

const initialConsultingFormData: ConsultingFormData = {
  fullName: '',
  email: '',
  companyName: '',
  companySize: '',
  mainObjective: '',
  currentTechnologies: '',
  estimatedStartDate: '',
  hasTechnicalTeam: '',
  needsTraining: '',
  technologiesInterested: '',
  additionalComments: ''
};

const initialMarketingFormData: MarketingFormData = {
  fullName: '',
  email: '',
  brandName: '',
  mainObjective: '',
  hasSocialMedia: '',
  socialMediaLinks: '',
  hasWebsite: '',
  websiteUrl: '',
  targetAudience: '',
  previousInvestment: '',
  platformsOfInterest: '',
  strategyType: '',
  additionalComments: ''
};

const services = [
  {
    id: 1,
    title: 'Desarrollo Web',
    description: 'Creamos sitios web modernos y responsivos utilizando las últimas tecnologías.',
    icon: '🌐',
    features: ['Diseño Responsivo', 'SEO Optimizado', 'Alto Rendimiento'],
    modalType: 'web' as ModalType
  },
  {
    id: 2,
    title: 'Aplicaciones Móviles',
    description: 'Desarrollamos aplicaciones nativas y multiplataforma para iOS y Android.',
    icon: '📱',
    features: ['UI/UX Intuitivo', 'Rendimiento Nativo', 'Multiplataforma'],
    modalType: 'mobile' as ModalType
  },
  {
    id: 3,
    title: 'Consultoría IT',
    description: 'Asesoramiento experto en tecnología y transformación digital.',
    icon: '💡',
    features: ['Análisis Estratégico', 'Optimización de Procesos', 'Soluciones Personalizadas'],
    modalType: 'consulting' as ModalType
  },
  {
    id: 4,
    title: 'Marketing Digital',
    description: 'Estrategias de marketing digital para potenciar tu presencia online.',
    icon: '📈',
    features: ['SEO/SEM', 'Redes Sociales', 'Email Marketing'],
    modalType: 'marketing' as ModalType
  }
];

const Services: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [webFormData, setWebFormData] = useState<WebFormData>(initialWebFormData);
  const [mobileFormData, setMobileFormData] = useState<MobileFormData>(initialMobileFormData);
  const [consultingFormData, setConsultingFormData] = useState<ConsultingFormData>(initialConsultingFormData);
  const [marketingFormData, setMarketingFormData] = useState<MarketingFormData>(initialMarketingFormData);
  const [webFormErrors, setWebFormErrors] = useState<Partial<WebFormData>>({});
  const [mobileFormErrors, setMobileFormErrors] = useState<Partial<MobileFormData>>({});
  const [consultingFormErrors, setConsultingFormErrors] = useState<Partial<ConsultingFormData>>({});
  const [marketingFormErrors, setMarketingFormErrors] = useState<Partial<MarketingFormData>>({});
  const { showNotification } = useNotification();

  const validateWebForm = () => {
    const errors: Partial<WebFormData> = {};
    const requiredFields: (keyof WebFormData)[] = [
      'fullName',
      'email',
      'projectName',
      'description',
      'mainObjective',
      'features',
      'targetAudience',
      'estimatedDeadline'
    ];

    requiredFields.forEach(field => {
      if (!webFormData[field].trim()) {
        errors[field] = 'Este campo es obligatorio';
      }
    });

    if (webFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(webFormData.email)) {
      errors.email = 'Por favor ingrese un email válido';
    }

    setWebFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateMobileForm = () => {
    const errors: Partial<MobileFormData> = {};
    const requiredFields: (keyof MobileFormData)[] = [
      'fullName',
      'email',
      'appName',
      'description',
      'operatingSystem',
      'features',
      'targetAudience',
      'estimatedDeadline'
    ];

    requiredFields.forEach(field => {
      if (!mobileFormData[field].trim()) {
        errors[field] = 'Este campo es obligatorio';
      }
    });

    if (mobileFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileFormData.email)) {
      errors.email = 'Por favor ingrese un email válido';
    }

    setMobileFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateConsultingForm = () => {
    const errors: Partial<ConsultingFormData> = {};
    const requiredFields: (keyof ConsultingFormData)[] = [
      'fullName',
      'email',
      'companyName',
      'companySize',
      'mainObjective',
      'currentTechnologies',
      'estimatedStartDate'
    ];

    requiredFields.forEach(field => {
      if (!consultingFormData[field].trim()) {
        errors[field] = 'Este campo es obligatorio';
      }
    });

    if (consultingFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultingFormData.email)) {
      errors.email = 'Por favor ingrese un email válido';
    }

    setConsultingFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateMarketingForm = () => {
    const errors: Partial<MarketingFormData> = {};
    const requiredFields: (keyof MarketingFormData)[] = [
      'fullName',
      'email',
      'brandName',
      'mainObjective',
      'hasSocialMedia',
      'hasWebsite',
      'targetAudience'
    ];

    requiredFields.forEach(field => {
      if (!marketingFormData[field].trim()) {
        errors[field] = 'Este campo es obligatorio';
      }
    });

    if (marketingFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(marketingFormData.email)) {
      errors.email = 'Por favor ingrese un email válido';
    }

    if (marketingFormData.hasSocialMedia === 'si' && !marketingFormData.socialMediaLinks.trim()) {
      errors.socialMediaLinks = 'Por favor ingrese los enlaces de sus redes sociales';
    }

    if (marketingFormData.hasWebsite === 'si' && !marketingFormData.websiteUrl.trim()) {
      errors.websiteUrl = 'Por favor ingrese la URL de su sitio web';
    }

    setMarketingFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWebSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateWebForm()) {
      console.log('Formulario web enviado:', webFormData);
      showNotification('¡Gracias por enviar su solicitud! Nuestro equipo se pondrá en contacto con usted a la brevedad para ayudarlo a desarrollar su proyecto.', 'success');
      setActiveModal(null);
      setWebFormData(initialWebFormData);
    }
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateMobileForm()) {
      console.log('Formulario móvil enviado:', mobileFormData);
      showNotification('✅ ¡Gracias por su interés en nuestras soluciones móviles! Nuestro equipo se comunicará con usted pronto para hacer realidad su app.', 'success');
      setActiveModal(null);
      setMobileFormData(initialMobileFormData);
    }
  };

  const handleConsultingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateConsultingForm()) {
      console.log('Formulario de consultoría enviado:', consultingFormData);
      showNotification('✅ ¡Gracias por contactarnos! Nuestro equipo de consultores en tecnología revisará su solicitud y le responderá lo antes posible para comenzar con su transformación digital.', 'success');
      setActiveModal(null);
      setConsultingFormData(initialConsultingFormData);
    }
  };

  const handleMarketingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateMarketingForm()) {
      console.log('Formulario de marketing enviado:', marketingFormData);
      showNotification('🚀 ¡Gracias por confiar en nosotros! Nuestro equipo de marketing digital analizará su información y se pondrá en contacto para diseñar una estrategia que potencie su presencia en línea.', 'success');
      setActiveModal(null);
      setMarketingFormData(initialMarketingFormData);
    }
  };

  const handleWebInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWebFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (webFormErrors[name as keyof WebFormData]) {
      setWebFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMobileFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (mobileFormErrors[name as keyof MobileFormData]) {
      setMobileFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleConsultingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConsultingFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (consultingFormErrors[name as keyof ConsultingFormData]) {
      setConsultingFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMarketingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMarketingFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (marketingFormErrors[name as keyof MarketingFormData]) {
      setMarketingFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <motion.div
      className="services-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="services-header">
        <h1>Nuestros Servicios</h1>
        <p>Soluciones digitales adaptadas a tus necesidades</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => service.modalType && setActiveModal(service.modalType)}
            style={service.modalType ? { cursor: 'pointer' } : undefined}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Modal de Desarrollo Web */}
      <Modal
        isOpen={activeModal === 'web'}
        onRequestClose={() => setActiveModal(null)}
        className="web-dev-modal"
        overlayClassName="web-dev-modal-overlay"
      >
        <div className="modal-content">
          <button 
            onClick={() => setActiveModal(null)}
            className="modal-close-button"
            aria-label="Cerrar modal"
          >
            ×
          </button>
          <h2>Solicitud de Desarrollo Web</h2>
          <form onSubmit={handleWebSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nombre completo *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={webFormData.fullName}
                onChange={handleWebInputChange}
                className={webFormErrors.fullName ? 'error' : ''}
              />
              {webFormErrors.fullName && <span className="error-message">{webFormErrors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={webFormData.email}
                onChange={handleWebInputChange}
                className={webFormErrors.email ? 'error' : ''}
              />
              {webFormErrors.email && <span className="error-message">{webFormErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="projectName">Nombre del proyecto o idea *</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={webFormData.projectName}
                onChange={handleWebInputChange}
                className={webFormErrors.projectName ? 'error' : ''}
              />
              {webFormErrors.projectName && <span className="error-message">{webFormErrors.projectName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción breve de la aplicación web *</label>
              <textarea
                id="description"
                name="description"
                value={webFormData.description}
                onChange={handleWebInputChange}
                className={webFormErrors.description ? 'error' : ''}
              />
              {webFormErrors.description && <span className="error-message">{webFormErrors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mainObjective">Objetivo principal del sitio web *</label>
              <textarea
                id="mainObjective"
                name="mainObjective"
                value={webFormData.mainObjective}
                onChange={handleWebInputChange}
                className={webFormErrors.mainObjective ? 'error' : ''}
              />
              {webFormErrors.mainObjective && <span className="error-message">{webFormErrors.mainObjective}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="features">Funcionalidades deseadas *</label>
              <textarea
                id="features"
                name="features"
                placeholder="Ej: login, carrito de compras, blog, etc."
                value={webFormData.features}
                onChange={handleWebInputChange}
                className={webFormErrors.features ? 'error' : ''}
              />
              {webFormErrors.features && <span className="error-message">{webFormErrors.features}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="targetAudience">Público objetivo *</label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={webFormData.targetAudience}
                onChange={handleWebInputChange}
                className={webFormErrors.targetAudience ? 'error' : ''}
              />
              {webFormErrors.targetAudience && <span className="error-message">{webFormErrors.targetAudience}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="estimatedDeadline">Plazo estimado de entrega *</label>
              <input
                type="text"
                id="estimatedDeadline"
                name="estimatedDeadline"
                placeholder="Ej: 2 meses, 3 semanas, etc."
                value={webFormData.estimatedDeadline}
                onChange={handleWebInputChange}
                className={webFormErrors.estimatedDeadline ? 'error' : ''}
              />
              {webFormErrors.estimatedDeadline && <span className="error-message">{webFormErrors.estimatedDeadline}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="hasDesign">¿Tiene un diseño o maqueta del sitio web?</label>
              <select
                id="hasDesign"
                name="hasDesign"
                value={webFormData.hasDesign}
                onChange={handleWebInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hostingManagement">¿Desea que gestionemos el alojamiento y dominio?</label>
              <select
                id="hostingManagement"
                name="hostingManagement"
                value={webFormData.hostingManagement}
                onChange={handleWebInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                <option value="no_seguro">No estoy seguro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="referenceWebsites">¿Tiene algún ejemplo de sitio web de referencia?</label>
              <textarea
                id="referenceWebsites"
                name="referenceWebsites"
                placeholder="Ingrese las URLs de los sitios web de referencia"
                value={webFormData.referenceWebsites}
                onChange={handleWebInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalComments">Comentarios adicionales</label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                value={webFormData.additionalComments}
                onChange={handleWebInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">Enviar</button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de Aplicaciones Móviles */}
      <Modal
        isOpen={activeModal === 'mobile'}
        onRequestClose={() => setActiveModal(null)}
        className="web-dev-modal"
        overlayClassName="web-dev-modal-overlay"
      >
        <div className="modal-content">
          <button 
            onClick={() => setActiveModal(null)}
            className="modal-close-button"
            aria-label="Cerrar modal"
          >
            ×
          </button>
          <h2>Solicitud de Desarrollo de App Móvil</h2>
          <form onSubmit={handleMobileSubmit}>
            <div className="form-group">
              <label htmlFor="mobile-fullName">Nombre completo *</label>
              <input
                type="text"
                id="mobile-fullName"
                name="fullName"
                value={mobileFormData.fullName}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.fullName ? 'error' : ''}
              />
              {mobileFormErrors.fullName && <span className="error-message">{mobileFormErrors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-email">Correo electrónico *</label>
              <input
                type="email"
                id="mobile-email"
                name="email"
                value={mobileFormData.email}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.email ? 'error' : ''}
              />
              {mobileFormErrors.email && <span className="error-message">{mobileFormErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-appName">Nombre de la aplicación o idea *</label>
              <input
                type="text"
                id="mobile-appName"
                name="appName"
                value={mobileFormData.appName}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.appName ? 'error' : ''}
              />
              {mobileFormErrors.appName && <span className="error-message">{mobileFormErrors.appName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-description">Descripción breve de la app *</label>
              <textarea
                id="mobile-description"
                name="description"
                value={mobileFormData.description}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.description ? 'error' : ''}
              />
              {mobileFormErrors.description && <span className="error-message">{mobileFormErrors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-operatingSystem">Sistema operativo deseado *</label>
              <select
                id="mobile-operatingSystem"
                name="operatingSystem"
                value={mobileFormData.operatingSystem}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.operatingSystem ? 'error' : ''}
              >
                <option value="">Seleccione una opción</option>
                <option value="android">Android</option>
                <option value="ios">iOS</option>
                <option value="both">Ambos</option>
              </select>
              {mobileFormErrors.operatingSystem && <span className="error-message">{mobileFormErrors.operatingSystem}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-features">Funcionalidades principales *</label>
              <textarea
                id="mobile-features"
                name="features"
                placeholder="Ej: Login, GPS, cámara, pagos, notificaciones, etc."
                value={mobileFormData.features}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.features ? 'error' : ''}
              />
              {mobileFormErrors.features && <span className="error-message">{mobileFormErrors.features}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-targetAudience">Público objetivo *</label>
              <input
                type="text"
                id="mobile-targetAudience"
                name="targetAudience"
                value={mobileFormData.targetAudience}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.targetAudience ? 'error' : ''}
              />
              {mobileFormErrors.targetAudience && <span className="error-message">{mobileFormErrors.targetAudience}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-estimatedDeadline">Plazo estimado de entrega *</label>
              <input
                type="text"
                id="mobile-estimatedDeadline"
                name="estimatedDeadline"
                placeholder="Ej: 2 meses, 3 semanas, etc."
                value={mobileFormData.estimatedDeadline}
                onChange={handleMobileInputChange}
                className={mobileFormErrors.estimatedDeadline ? 'error' : ''}
              />
              {mobileFormErrors.estimatedDeadline && <span className="error-message">{mobileFormErrors.estimatedDeadline}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile-hasDesign">¿Cuenta con diseño o wireframe?</label>
              <select
                id="mobile-hasDesign"
                name="hasDesign"
                value={mobileFormData.hasDesign}
                onChange={handleMobileInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mobile-storePublishing">¿Desea que subamos la app a las tiendas?</label>
              <select
                id="mobile-storePublishing"
                name="storePublishing"
                value={mobileFormData.storePublishing}
                onChange={handleMobileInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                <option value="no_seguro">No estoy seguro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mobile-referenceApps">¿Tiene alguna app de referencia?</label>
              <textarea
                id="mobile-referenceApps"
                name="referenceApps"
                placeholder="Ingrese los nombres o enlaces de las apps de referencia"
                value={mobileFormData.referenceApps}
                onChange={handleMobileInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile-additionalComments">Comentarios adicionales</label>
              <textarea
                id="mobile-additionalComments"
                name="additionalComments"
                value={mobileFormData.additionalComments}
                onChange={handleMobileInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">Enviar</button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de Consultoría IT */}
      <Modal
        isOpen={activeModal === 'consulting'}
        onRequestClose={() => setActiveModal(null)}
        className="web-dev-modal"
        overlayClassName="web-dev-modal-overlay"
      >
        <div className="modal-content">
          <button 
            onClick={() => setActiveModal(null)}
            className="modal-close-button"
            aria-label="Cerrar modal"
          >
            ×
          </button>
          <h2>Solicitud de Consultoría IT</h2>
          <form onSubmit={handleConsultingSubmit}>
            <div className="form-group">
              <label htmlFor="consulting-fullName">Nombre completo *</label>
              <input
                type="text"
                id="consulting-fullName"
                name="fullName"
                value={consultingFormData.fullName}
                onChange={handleConsultingInputChange}
                className={consultingFormErrors.fullName ? 'error' : ''}
              />
              {consultingFormErrors.fullName && <span className="error-message">{consultingFormErrors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="consulting-email">Correo electrónico *</label>
              <input
                type="email"
                id="consulting-email"
                name="email"
                value={consultingFormData.email}
                onChange={handleConsultingInputChange}
                className={consultingFormErrors.email ? 'error' : ''}
              />
              {consultingFormErrors.email && <span className="error-message">{consultingFormErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="consulting-companyName">Nombre de la empresa *</label>
              <input
                type="text"
                id="consulting-companyName"
                name="companyName"
                value={consultingFormData.companyName}
                onChange={handleConsultingInputChange}
                className={consultingFormErrors.companyName ? 'error' : ''}
              />
              {consultingFormErrors.companyName && <span className="error-message">{consultingFormErrors.companyName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="consulting-companySize">Tamaño de la empresa *</label>
              <select
                id="consulting-companySize"
                name="companySize"
                value={consultingFormData.companySize}
                onChange={handleConsultingInputChange}
                className={consultingFormErrors.companySize ? 'error' : ''}
              >
                <option value="">Seleccione una opción</option>
                <option value="small">Pequeña</option>
                <option value="medium">Mediana</option>
                <option value="large">Grande</option>
              </select>
              {consultingFormErrors.companySize && <span className="error-message">{consultingFormErrors.companySize}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="consulting-mainObjective">Objetivo principal de la consultoría *</label>
              <textarea
                id="consulting-mainObjective"
                name="mainObjective"
                placeholder="Ej: Optimización de procesos, migración tecnológica, etc."
                value={consultingFormData.mainObjective}
                onChange={handleConsultingInputChange}
                className={consultingFormErrors.mainObjective ? 'error' : ''}
              />
              {consultingFormErrors.mainObjective && <span className="error-message">{consultingFormErrors.mainObjective}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="consulting-currentTechnologies">Tecnologías actuales que utiliza *</label>
              <textarea
                id="consulting-currentTechnologies"
                name="currentTechnologies"
                value={consultingFormData.currentTechnologies}
                onChange={handleConsultingInputChange}
                className={consultingFormErrors.currentTechnologies ? 'error' : ''}
              />
              {consultingFormErrors.currentTechnologies && <span className="error-message">{consultingFormErrors.currentTechnologies}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="consulting-estimatedStartDate">Plazo estimado para comenzar *</label>
              <input
                type="text"
                id="consulting-estimatedStartDate"
                name="estimatedStartDate"
                placeholder="Ej: 1 mes, 2 semanas, etc."
                value={consultingFormData.estimatedStartDate}
                onChange={handleConsultingInputChange}
                className={consultingFormErrors.estimatedStartDate ? 'error' : ''}
              />
              {consultingFormErrors.estimatedStartDate && <span className="error-message">{consultingFormErrors.estimatedStartDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="consulting-hasTechnicalTeam">¿Cuenta con equipo técnico interno?</label>
              <select
                id="consulting-hasTechnicalTeam"
                name="hasTechnicalTeam"
                value={consultingFormData.hasTechnicalTeam}
                onChange={handleConsultingInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="consulting-needsTraining">¿Desea capacitación para su personal?</label>
              <select
                id="consulting-needsTraining"
                name="needsTraining"
                value={consultingFormData.needsTraining}
                onChange={handleConsultingInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                <option value="no_seguro">No estoy seguro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="consulting-technologiesInterested">¿Qué soluciones tecnológicas le interesa explorar?</label>
              <textarea
                id="consulting-technologiesInterested"
                name="technologiesInterested"
                placeholder="Ej: Cloud computing, IA, automatización, etc."
                value={consultingFormData.technologiesInterested}
                onChange={handleConsultingInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="consulting-additionalComments">Comentarios adicionales</label>
              <textarea
                id="consulting-additionalComments"
                name="additionalComments"
                value={consultingFormData.additionalComments}
                onChange={handleConsultingInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">Enviar</button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de Marketing Digital */}
      <Modal
        isOpen={activeModal === 'marketing'}
        onRequestClose={() => setActiveModal(null)}
        className="web-dev-modal"
        overlayClassName="web-dev-modal-overlay"
      >
        <div className="modal-content">
          <button 
            onClick={() => setActiveModal(null)}
            className="modal-close-button"
            aria-label="Cerrar modal"
          >
            ×
          </button>
          <h2>Solicitud de Servicios de Marketing Digital</h2>
          <form onSubmit={handleMarketingSubmit}>
            <div className="form-group">
              <label htmlFor="marketing-fullName">Nombre completo *</label>
              <input
                type="text"
                id="marketing-fullName"
                name="fullName"
                value={marketingFormData.fullName}
                onChange={handleMarketingInputChange}
                className={marketingFormErrors.fullName ? 'error' : ''}
              />
              {marketingFormErrors.fullName && <span className="error-message">{marketingFormErrors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="marketing-email">Correo electrónico *</label>
              <input
                type="email"
                id="marketing-email"
                name="email"
                value={marketingFormData.email}
                onChange={handleMarketingInputChange}
                className={marketingFormErrors.email ? 'error' : ''}
              />
              {marketingFormErrors.email && <span className="error-message">{marketingFormErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="marketing-brandName">Nombre de la marca/empresa/proyecto *</label>
              <input
                type="text"
                id="marketing-brandName"
                name="brandName"
                value={marketingFormData.brandName}
                onChange={handleMarketingInputChange}
                className={marketingFormErrors.brandName ? 'error' : ''}
              />
              {marketingFormErrors.brandName && <span className="error-message">{marketingFormErrors.brandName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="marketing-mainObjective">Objetivo principal *</label>
              <select
                id="marketing-mainObjective"
                name="mainObjective"
                value={marketingFormData.mainObjective}
                onChange={handleMarketingInputChange}
                className={marketingFormErrors.mainObjective ? 'error' : ''}
              >
                <option value="">Seleccione una opción</option>
                <option value="ventas">Aumentar ventas</option>
                <option value="presencia">Mejorar presencia online</option>
                <option value="leads">Captar leads</option>
                <option value="branding">Fortalecer marca</option>
                <option value="otro">Otro</option>
              </select>
              {marketingFormErrors.mainObjective && <span className="error-message">{marketingFormErrors.mainObjective}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="marketing-hasSocialMedia">¿Tiene redes sociales activas? *</label>
              <select
                id="marketing-hasSocialMedia"
                name="hasSocialMedia"
                value={marketingFormData.hasSocialMedia}
                onChange={handleMarketingInputChange}
                className={marketingFormErrors.hasSocialMedia ? 'error' : ''}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {marketingFormErrors.hasSocialMedia && <span className="error-message">{marketingFormErrors.hasSocialMedia}</span>}
            </div>

            {marketingFormData.hasSocialMedia === 'si' && (
              <div className="form-group">
                <label htmlFor="marketing-socialMediaLinks">Enlaces de redes sociales *</label>
                <textarea
                  id="marketing-socialMediaLinks"
                  name="socialMediaLinks"
                  placeholder="Ingrese los enlaces de sus redes sociales (uno por línea)"
                  value={marketingFormData.socialMediaLinks}
                  onChange={handleMarketingInputChange}
                  className={marketingFormErrors.socialMediaLinks ? 'error' : ''}
                />
                {marketingFormErrors.socialMediaLinks && <span className="error-message">{marketingFormErrors.socialMediaLinks}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="marketing-hasWebsite">¿Posee un sitio web actualmente? *</label>
              <select
                id="marketing-hasWebsite"
                name="hasWebsite"
                value={marketingFormData.hasWebsite}
                onChange={handleMarketingInputChange}
                className={marketingFormErrors.hasWebsite ? 'error' : ''}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {marketingFormErrors.hasWebsite && <span className="error-message">{marketingFormErrors.hasWebsite}</span>}
            </div>

            {marketingFormData.hasWebsite === 'si' && (
              <div className="form-group">
                <label htmlFor="marketing-websiteUrl">URL del sitio web *</label>
                <input
                  type="url"
                  id="marketing-websiteUrl"
                  name="websiteUrl"
                  placeholder="https://www.ejemplo.com"
                  value={marketingFormData.websiteUrl}
                  onChange={handleMarketingInputChange}
                  className={marketingFormErrors.websiteUrl ? 'error' : ''}
                />
                {marketingFormErrors.websiteUrl && <span className="error-message">{marketingFormErrors.websiteUrl}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="marketing-targetAudience">¿Tiene definida su audiencia o cliente ideal? *</label>
              <textarea
                id="marketing-targetAudience"
                name="targetAudience"
                placeholder="Describa su audiencia objetivo"
                value={marketingFormData.targetAudience}
                onChange={handleMarketingInputChange}
                className={marketingFormErrors.targetAudience ? 'error' : ''}
              />
              {marketingFormErrors.targetAudience && <span className="error-message">{marketingFormErrors.targetAudience}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="marketing-previousInvestment">¿Ha invertido anteriormente en marketing digital?</label>
              <select
                id="marketing-previousInvestment"
                name="previousInvestment"
                value={marketingFormData.previousInvestment}
                onChange={handleMarketingInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="marketing-platformsOfInterest">Plataformas de interés</label>
              <textarea
                id="marketing-platformsOfInterest"
                name="platformsOfInterest"
                placeholder="Ej: Instagram, Facebook, Google Ads, Email marketing, etc."
                value={marketingFormData.platformsOfInterest}
                onChange={handleMarketingInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="marketing-strategyType">¿Desea una estrategia orgánica, pagada o ambas?</label>
              <select
                id="marketing-strategyType"
                name="strategyType"
                value={marketingFormData.strategyType}
                onChange={handleMarketingInputChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="organica">Orgánica</option>
                <option value="pagada">Pagada</option>
                <option value="ambas">Ambas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="marketing-additionalComments">Comentarios adicionales</label>
              <textarea
                id="marketing-additionalComments"
                name="additionalComments"
                value={marketingFormData.additionalComments}
                onChange={handleMarketingInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">Enviar</button>
            </div>
          </form>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Services; 