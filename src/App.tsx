import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { EcommerceHomepage } from './components/EcommerceHomepage/EcommerceHomepage';
import { CategoryPage } from './components/CategoryPage/CategoryPage';
import { ProductDetailWrapper } from './components/ProductDetailWrapper/ProductDetailWrapper';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { ShoppingCartPage } from './components/ShoppingCartPage/ShoppingCartPage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { SearchResultsPage } from './components/SearchResultsPage/SearchResultsPage';
import { DealsPage } from './components/DealsPage/DealsPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
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
                  path="/favorites"
                  element={<FavoritesPage />}
                />
                <Route
                  path="/search"
                  element={<SearchResultsPage />}
                />
                <Route
                  path="/ofertas"
                  element={<DealsPage />}
                />
                <Route
                  path="/login"
                  element={<LoginPage />}
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;