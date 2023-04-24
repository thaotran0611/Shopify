import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/General/HomePage';
import { LoginPage } from './pages/General/LoginPage';
import { SignUpPage } from './pages/General/SignUpPage';
import { ProductPage } from './pages/Customer/ProductPage';
import { MyOrderPage } from './pages/Customer/MyOrderPage';
import { OrderDetailPage } from './pages/Customer/OrderDetailPage';
import { ProductDetailPage } from './pages/Customer/ProductDetailPage';
import CartPage from './pages/Customer/CartPage';
import { ErrorPage } from './pages/General/ErrorPage';
import { PaymentPage } from './pages/Customer/PaymentPage';
import { TestPage } from './pages/Admin/TestPage';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  let isAdmin = false;
  if (loggedIn == true) {
    isAdmin = JSON.parse(sessionStorage.getItem('user')).role == 'admin';
  } else {
    sessionStorage.removeItem('user');
  }
  return (
    <Box>
      {!isAdmin && <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      <Routes>
        <Route path="/" element={<HomePage setLoggedIn={setLoggedIn} />} />
        {isAdmin && <Route path="/home" element={<TestPage />} />}
        <Route path="/home" element={<HomePage setLoggedIn={setLoggedIn} />} />
        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:code" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order" element={<MyOrderPage />} />
        <Route path="/order/detail" element={<OrderDetailPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!isAdmin && <Footer />}
    </Box>
  );
}

export default App;
