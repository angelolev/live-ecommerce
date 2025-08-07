import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { EcommerceHomepage } from './components/EcommerceHomepage/EcommerceHomepage';
import { CategoryPage } from './components/CategoryPage/CategoryPage';
import { ProductDetailWrapper } from './components/ProductDetailWrapper/ProductDetailWrapper';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { ShoppingCartPage } from './components/ShoppingCartPage/ShoppingCartPage';
import { CartProvider } from './contexts/CartContext';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Routes>
          <Route 
            path="/" 
            element={<EcommerceHomepage />} 
          />
          <Route 
            path="/category/:categoryName" 
            element={<CategoryPage />} 
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
    </QueryClientProvider>
  );
}

export default App;