import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <p className={styles.logo}>Shopr</p>
            <p className={styles.tagline}>
              Tu destino favorito para moda, accesorios y más. Calidad y estilo
              al mejor precio.
            </p>
          </div>

          {/* Compras */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Compras</h4>
            <ul className={styles.linkList}>
              <li>
                <Link to="/ofertas" className={styles.link}>
                  Ofertas especiales
                </Link>
              </li>
              <li>
                <Link to="/category/ropa" className={styles.link}>
                  Ropa
                </Link>
              </li>
              <li>
                <Link to="/category/zapatos" className={styles.link}>
                  Zapatos
                </Link>
              </li>
              <li>
                <Link to="/category/accesorios" className={styles.link}>
                  Accesorios
                </Link>
              </li>
              <li>
                <Link to="/search" className={styles.link}>
                  Buscar productos
                </Link>
              </li>
            </ul>
          </div>

          {/* Mi cuenta */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Mi cuenta</h4>
            <ul className={styles.linkList}>
              <li>
                <Link to="/login" className={styles.link}>
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/cart" className={styles.link}>
                  Mi carrito
                </Link>
              </li>
              <li>
                <Link to="/favorites" className={styles.link}>
                  Mis favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Ayuda</h4>
            <ul className={styles.linkList}>
              <li>
                <span className={styles.linkStatic}>Preguntas frecuentes</span>
              </li>
              <li>
                <span className={styles.linkStatic}>Política de devoluciones</span>
              </li>
              <li>
                <span className={styles.linkStatic}>Envíos y entregas</span>
              </li>
              <li>
                <span className={styles.linkStatic}>Contacto</span>
              </li>
              <li>
                <span className={styles.linkStatic}>Términos y condiciones</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Shopr. Todos los derechos reservados.
          </p>
          <div className={styles.legal}>
            <span className={styles.linkStatic}>Privacidad</span>
            <span className={styles.separator}>·</span>
            <span className={styles.linkStatic}>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
