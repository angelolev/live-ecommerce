import { Routes, Route } from 'react-router-dom';
import { EcommerceHomepage } from './components/EcommerceHomepage/EcommerceHomepage';
import { ProductDetailWrapper } from './components/ProductDetailWrapper/ProductDetailWrapper';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { ShoppingCartPage } from './components/ShoppingCartPage/ShoppingCartPage';
import { CartProvider } from './contexts/CartContext';
import { mockRootProps } from './ecommerceMockData';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route 
          path="/" 
          element={<EcommerceHomepage 
            countdown={mockRootProps.countdown}
            featuredCategories={mockRootProps.featuredCategories}
          />} 
        />
        <Route 
          path="/product/:id" 
          element={<ProductDetailWrapper />} 
        />
        <Route 
          path="/cart" 
          element={<ShoppingCartPage />} 
        />
        <Route 
          path="/admin" 
          element={<AdminDashboard />} 
        />
      </Routes>
    </CartProvider>
  );
}

export default App;