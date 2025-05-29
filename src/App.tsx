import { lazy, Suspense } from 'react';
import './App.css'
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Text, Flex, Spinner, Heading } from '@chakra-ui/react';
import PrivateRoute from './components/auth/PrivateRoute.tsx';
import Layout from './components/layout/Layout.tsx';

// Lazy-loaded public pages
const LandingPage = lazy(() => import('./pages/landing-page/LandingPage.tsx'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage.tsx'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage.tsx'));

// Lazy-loaded private pages
const InboxPage = lazy(() => import('./pages/inbox/InboxPage.tsx'));
const OrdersPage = lazy(() => import('./pages/orders/OrdersPage.tsx'));
const ProductsPage = lazy(() => import('./pages/products/ProductsPage.tsx'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={
          <Flex justify="center" align="center" minH="100vh" direction="column">
            <Spinner size="xl" color="brand.500" />
            <Text mt={4}>Loading application...</Text>
          </Flex>
        }>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Private Routes (Wrapped by PrivateRoute and using Layout) */}
            <Route
              element={
                <PrivateRoute>
                  <Layout>
                    <Outlet /> {/* Outlet renders nested private routes */}
                  </Layout>
                </PrivateRoute>
              }
            >
              <Route path="/app/inbox" element={<InboxPage />} />
              <Route path="/app/orders" element={<OrdersPage />} />
              <Route path="/app/products" element={<ProductsPage />} />
              {/* Redirect /app to /app/inbox if logged in */}
              <Route path="/app" element={<InboxPage />} />
            </Route>

            {/* Catch-all for 404 */}
            <Route path="*" element={
              <Flex justify="center" align="center" minH="100vh" direction="column">
                <Heading size="xl">404 - Not Found</Heading>
                <Text mt={4}>The page you are looking for does not exist.</Text>
              </Flex>
            } />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

export default App;
