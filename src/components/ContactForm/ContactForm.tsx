import React, { useState } from "react";
import styles from "./ContactForm.module.css";

interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

const INITIAL_STATE: FormData = { nombre: "", email: "", mensaje: "" };

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    formData.nombre.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.mensaje.trim().length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Simulated async submission — replace with real API call if needed
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData(INITIAL_STATE);
    } catch {
      setError("Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <h2 className={styles.title}>¿Tienes alguna pregunta?</h2>
          <p className={styles.description}>
            Estamos aquí para ayudarte. Completa el formulario y te
            responderemos a la brevedad.
          </p>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactIcon}>✉</span>
              soporte@livestore.com
            </li>
            <li>
              <span className={styles.contactIcon}>📞</span>
              +1 (800) 123-4567
            </li>
            <li>
              <span className={styles.contactIcon}>🕐</span>
              Lun–Vie, 9:00–18:00
            </li>
          </ul>
        </div>

        <div className={styles.formWrapper}>
          {submitted ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>✓</span>
              <h3 className={styles.successTitle}>¡Mensaje enviado!</h3>
              <p className={styles.successText}>
                Gracias por contactarnos. Te responderemos pronto.
              </p>
              <button
                className={styles.resetButton}
                onClick={() => setSubmitted(false)}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="nombre" className={styles.label}>
                  Nombre <span className={styles.required}>*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className={styles.input}
                  disabled={isSubmitting}
                  autoComplete="name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Correo electrónico <span className={styles.required}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className={styles.input}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mensaje" className={styles.label}>
                  Mensaje <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="¿En qué podemos ayudarte?"
                  className={styles.textarea}
                  rows={5}
                  disabled={isSubmitting}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
