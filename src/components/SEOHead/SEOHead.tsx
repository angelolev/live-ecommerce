import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object | object[];
}

const DEFAULT_SITE_NAME = 'Live E-commerce';
const DEFAULT_DESCRIPTION = 'Descubre las mejores ofertas en moda, accesorios, zapatos y más. Compra online con envío rápido y devoluciones gratis.';
const DEFAULT_IMAGE = 'https://live-ecommerce.com/images/hero-background.png';
const BASE_URL = 'https://live-ecommerce.com';

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  structuredData,
}) => {
  useEffect(() => {
    // Update document title
    const fullTitle = title
      ? `${title} | ${DEFAULT_SITE_NAME}`
      : `${DEFAULT_SITE_NAME} - Tu Tienda Online de Moda y Accesorios`;
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const attribute = selector.includes('property') ? 'property' : 'name';
        const value = selector.match(/["']([^"']+)["']/)?.[1] || '';
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('meta[name="title"]', fullTitle);
    updateMetaTag('meta[name="description"]', description);

    if (keywords) {
      updateMetaTag('meta[name="keywords"]', keywords);
    }

    if (author) {
      updateMetaTag('meta[name="author"]', author);
    }

    // Update canonical URL
    const canonicalUrl = url ? `${BASE_URL}${url}` : window.location.href;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', fullTitle);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="og:url"]', canonicalUrl);
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:site_name"]', DEFAULT_SITE_NAME);

    if (publishedTime) {
      updateMetaTag('meta[property="article:published_time"]', publishedTime);
    }

    if (modifiedTime) {
      updateMetaTag('meta[property="article:modified_time"]', modifiedTime);
    }

    // Update Twitter Card tags
    updateMetaTag('meta[property="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[property="twitter:title"]', fullTitle);
    updateMetaTag('meta[property="twitter:description"]', description);
    updateMetaTag('meta[property="twitter:image"]', image);
    updateMetaTag('meta[property="twitter:url"]', canonicalUrl);

    // Handle structured data
    let scriptElement = document.querySelector('script[data-dynamic-structured-data]');

    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('data-dynamic-structured-data', 'true');
        document.head.appendChild(scriptElement);
      }

      // Handle array or single object
      const dataToInject = Array.isArray(structuredData)
        ? structuredData
        : [structuredData];

      scriptElement.textContent = JSON.stringify(dataToInject);
    } else if (scriptElement) {
      // Remove structured data if none is provided
      scriptElement.remove();
    }

    // Cleanup function (optional)
    return () => {
      // We don't remove tags on unmount to avoid flickering
    };
  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, structuredData]);

  return null; // This component doesn't render anything
};
