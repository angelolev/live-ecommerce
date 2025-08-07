// Mock data for the e-commerce homepage

// Price formatting function for product prices
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Props types (data passed to components)
export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Real countdown function that calculates time until target date
export const calculateTimeUntil = (targetDate: Date): CountdownData => {
  // Validate input
  if (!targetDate || !(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const now = Date.now();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Use more precise calculations
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const days = Math.floor(difference / millisecondsPerDay);
  const hours = Math.floor((difference % millisecondsPerDay) / millisecondsPerHour);
  const minutes = Math.floor((difference % millisecondsPerHour) / millisecondsPerMinute);
  const seconds = Math.floor((difference % millisecondsPerMinute) / millisecondsPerSecond);

  return { days, hours, minutes, seconds };
};

export interface CategoryData {
  id: string;
  name: string;
  image: string;
}

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface PropTypes {
  countdown: CountdownData;
  featuredCategories: CategoryData[];
  topDeals: ProductData[];
}

// Data passed as props to the root component
export const mockRootProps = {
  countdown: {
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 59
  },
  featuredCategories: [
    {
      id: "mens-fashion",
      name: "Moda Masculina",
      image: "/images/mens-fashion.png"
    },
    {
      id: "womens-fashion", 
      name: "Moda Femenina",
      image: "/images/womens-fashion.png"
    },
    {
      id: "accessories",
      name: "Accesorios", 
      image: "/images/accessories.png"
    },
    {
      id: "shoes",
      name: "Zapatos",
      image: "/images/shoes.png"
    }
  ],
  topDeals: [
    {
      id: "winter-jacket",
      name: "Chaqueta de Invierno Acogedora",
      price: 79.99,
      image: "/images/winter-jacket.png"
    },
    {
      id: "evening-dress",
      name: "Vestido de Noche Elegante", 
      price: 59.99,
      image: "/images/evening-dress.png"
    },
    {
      id: "running-shoes",
      name: "Zapatillas de Correr de Moda",
      price: 49.99,
      image: "/images/running-shoes.png"
    },
    {
      id: "wrist-watch",
      name: "Reloj de Pulsera Moderno",
      price: 99.99,
      image: "/images/wrist-watch.png"
    }
  ]
};