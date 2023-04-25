import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/General/HomePage';
import { LoginPage } from './pages/General/LoginPage';
import { SignUpPage } from './pages/General/SignUpPage';
import { AboutUsPage } from './pages/General/AboutUsPage';
import { ProductPage } from './pages/Customer/ProductPage';
import { MyOrderPage } from './pages/Customer/MyOrderPage';
import { OrderDetailPage } from './pages/Customer/OrderDetailPage';
import { ProductDetailPage } from './pages/Customer/ProductDetailPage';
import CartPage from './pages/Customer/CartPage';
import { ErrorPage } from './pages/General/ErrorPage';
import { PaymentPage } from './pages/Customer/PaymentPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Box>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={<HomePage setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/detail" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order" element={<MyOrderPage />} />
        <Route path="/order/detail" element={<OrderDetailPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
