import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data) => {
    let newErrors = {};
    
    // Name validation
    if (!data.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (data.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name)) {
      newErrors.name = 'El nombre solo puede contener letras';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'El email no tiene un formato válido';
    }

    // Subject validation
    if (!data.subject) {
      newErrors.subject = 'Debes seleccionar un asunto';
    }

    // Message validation
    if (!data.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (data.message.trim().length < 20) {
      newErrors.message = 'El mensaje debe tener al menos 20 caracteres';
    }

    // Privacy validation
    if (!data.privacy) {
      newErrors.privacy = 'Debes aceptar la política de privacidad';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      console.log('Formulario enviado:', formData);
      
      // Simular envío a API
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          privacy: false
        });
      }, 1000);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container reveal">
        <h2>Ponte en <span className="gradient-text">contacto</span></h2>

        {submitted ? (
          <div className="success-message">
            <h3>¡Mensaje enviado con éxito!</h3>
            <p>Gracias por contactarnos. Nuestro equipo de atención al cliente te responderá en un plazo de 24 horas.</p>
            <button 
              onClick={() => setSubmitted(false)} 
              className="btn btn-primary" 
              style={{ marginTop: '1rem' }}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@ejemplo.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <select 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? 'input-error' : ''}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  backgroundColor: '#050505',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  color: 'var(--white)',
                  fontFamily: 'inherit',
                  fontSize: '0.9375rem',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                <option value="">Selecciona un motivo</option>
                <option value="consulta">Consulta General</option>
                <option value="pedido">Estado de Pedido</option>
                <option value="devolucion">Devoluciones</option>
                <option value="mayorista">Venta al por Mayor</option>
              </select>
              {errors.subject && <span className="error">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí (mínimo 20 caracteres)..."
                className={errors.message ? 'input-error' : ''}
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

            <div className="form-group" style={{ textAlign: 'left', marginTop: '1rem' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                fontSize: '0.875rem', 
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}>
                <input 
                  type="checkbox" 
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  style={{ width: 'auto', cursor: 'pointer' }}
                />
                <span>
                  Acepto la <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>política de privacidad</a>.
                </span>
              </label>
              {errors.privacy && <span className="error">{errors.privacy}</span>}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </div>
      <style>{`
        .input-error {
          border-color: var(--error-color) !important;
        }
        select:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
