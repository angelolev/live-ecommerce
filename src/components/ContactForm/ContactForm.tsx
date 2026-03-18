import React, { useState } from 'react';
import styles from './ContactForm.module.css';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!fields.name.trim()) errs.name = 'El nombre es requerido.';
    if (!fields.email.trim()) {
      errs.email = 'El correo electrónico es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = 'Ingresa un correo electrónico válido.';
    }
    if (!fields.subject.trim()) errs.subject = 'El asunto es requerido.';
    if (!fields.message.trim()) errs.message = 'El mensaje es requerido.';
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Placeholder for actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      setFields({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitError('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <p>¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>Contáctanos</h2>

      {submitError && (
        <div className={styles.submitError} role="alert">
          {submitError}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre <span className={styles.required}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={fields.name}
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          disabled={isSubmitting}
          placeholder="Tu nombre"
        />
        {errors.name && (
          <span className={styles.fieldError} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo electrónico <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          disabled={isSubmitting}
          placeholder="tu@correo.com"
        />
        {errors.email && (
          <span className={styles.fieldError} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="subject" className={styles.label}>
          Asunto <span className={styles.required}>*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={fields.subject}
          onChange={handleChange}
          className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
          disabled={isSubmitting}
          placeholder="Asunto de tu mensaje"
        />
        {errors.subject && (
          <span className={styles.fieldError} role="alert">
            {errors.subject}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Mensaje <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          disabled={isSubmitting}
          placeholder="Escribe tu mensaje aquí..."
          rows={5}
        />
        {errors.message && (
          <span className={styles.fieldError} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
};
