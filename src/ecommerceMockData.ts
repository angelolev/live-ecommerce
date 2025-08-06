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
      name: "Men's Fashion",
      image: "/images/mens-fashion.png"
    },
    {
      id: "womens-fashion", 
      name: "Women's Fashion",
      image: "/images/womens-fashion.png"
    },
    {
      id: "accessories",
      name: "Accessories", 
      image: "/images/accessories.png"
    },
    {
      id: "shoes",
      name: "Shoes",
      image: "/images/shoes.png"
    }
  ],
  topDeals: [
    {
      id: "winter-jacket",
      name: "Cozy Winter Jacket",
      price: 79.99,
      image: "/images/winter-jacket.png"
    },
    {
      id: "evening-dress",
      name: "Elegant Evening Dress", 
      price: 59.99,
      image: "/images/evening-dress.png"
    },
    {
      id: "running-shoes",
      name: "Fashionable Running Shoes",
      price: 49.99,
      image: "/images/running-shoes.png"
    },
    {
      id: "wrist-watch",
      name: "Modern Wrist Watch",
      price: 99.99,
      image: "/images/wrist-watch.png"
    }
  ]
};