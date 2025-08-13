import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useActiveHeroBanner } from '../../hooks/queries';
import styles from './HeroBanner.module.css';

export const HeroBanner: React.FC = () => {
  const { data: heroBanner, isLoading, error } = useActiveHeroBanner();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset image state when heroBanner changes
  useEffect(() => {
    if (heroBanner?.backgroundImageUrl) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [heroBanner?.backgroundImageUrl]);

  // Preload the full image when heroBanner data is available
  useEffect(() => {
    if (heroBanner?.backgroundImageUrl && !imageLoaded && !imageError) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = () => {
        setImageError(true);
      };
      img.src = heroBanner.backgroundImageUrl;

      // Cleanup function to cancel loading if component unmounts
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [heroBanner?.backgroundImageUrl, imageLoaded, imageError]);

  

  if (isLoading) {
    return (
      <section className={styles.heroBanner}>
        <div className={styles.content}>
          <div className={styles.loadingContent}>
            <h1 className={styles.title}>Cargando...</h1>
            <p className={styles.subtitle}>Preparando contenido especial para ti</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !heroBanner) {
    return (
      <section className={styles.heroBanner}>
        <div className={styles.content}>
          <h1 className={styles.title}>Black Friday Sale</h1>
          <p className={styles.subtitle}>Up to 70% off on selected items. Limited time only!</p>
          {error && <p style={{color: 'red', fontSize: '14px'}}>Error: {error.message}</p>}
          {!error && !heroBanner && <p style={{color: 'orange', fontSize: '14px'}}>No active hero banner found</p>}
          <Button size="large" onClick={() => console.log('Shop Now clicked')}>
            Shop Now
          </Button>
        </div>
      </section>
    );
  }

  // Create styles for different loading states
  const getBackgroundStyle = () => {
    if (!heroBanner?.backgroundImageUrl) {
      return undefined;
    }

    const baseGradient = 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)';
    const imageUrl = heroBanner.backgroundImageUrl;

    // Always show the actual hero image, blur will be handled by CSS
    return {
      background: `${baseGradient}, url('${imageUrl}') center/cover no-repeat`
    };
  };

  return (
    <section 
      className={`${styles.heroBanner} ${heroBanner?.backgroundImageUrl && !imageLoaded ? styles.blurPlaceholder : ''} ${imageLoaded ? styles.imageLoaded : ''}`}
      style={getBackgroundStyle()}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{heroBanner.title}</h1>
        <p className={styles.subtitle}>{heroBanner.subtitle}</p>
        {heroBanner.buttonLink.startsWith('/') ? (
          <Link to={heroBanner.buttonLink}>
            <Button size="large">
              {heroBanner.buttonText}
            </Button>
          </Link>
        ) : (
          <Button 
            size="large" 
            onClick={() => window.open(heroBanner.buttonLink, '_blank')}
          >
            {heroBanner.buttonText}
          </Button>
        )}
      </div>
    </section>
  );
};