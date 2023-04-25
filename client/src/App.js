import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { HomePage } from './pages/General/HomePage';
import { LoginPage } from './pages/General/LoginPage';
import { SignUpPage } from './pages/General/SignUpPage';
import { ProductPage } from './pages/Customer/ProductPage';
import { ProductDetailPage } from './pages/Customer/ProductDetailPage';
import { AboutUsPage } from './pages/General/AboutUsPage';
import { ErrorPage } from './pages/General/ErrorPage';
import { UserLayout } from './layout/UserLayout';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import UserList from './pages/Admin/UserList';
import User from './pages/Admin/User';
import NewUser from './pages/Admin/NewUser';
import Product from './pages/Admin/Product';
import ProductList from './pages/Admin/ProductList';
import NewProduct from './pages/Admin/NewProduct';
import DashBoard from './pages/Admin/DashBoard';
import { MyOrderPage } from './pages/Customer/MyOrderPage';
import { OrderDetailPage } from './pages/Customer/OrderDetailPage';
import CartPage from './pages/Customer/CartPage';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  let isAdmin = '';
  if (loggedIn == true) {
    isAdmin = JSON.parse(sessionStorage.getItem('user')).role;
  }
  return (
    <Box>
      <Routes>
        <Route
          path="/"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <HomePage setLoggedIn={setLoggedIn} />
            </UserLayout>
          }
        />
        {isAdmin == 'admin' && (
          <Route
            path="/home"
            element={
              <div>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <DashBoard />
                </div>
              </div>
            }
          />
        )}
        {isAdmin != 'admin' && (
          <Route
            path="/home"
            element={
              <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
                <HomePage setLoggedIn={setLoggedIn} />
              </UserLayout>
            }
          />
        )}
        <Route
          path="/login"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <LoginPage setLoggedIn={setLoggedIn} />
            </UserLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <SignUpPage setLoggedIn={setLoggedIn} />
            </UserLayout>
          }
        />
        <Route
          path="/product"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <ProductPage />
            </UserLayout>
          }
        />
        <Route
          path="/product/:code"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <ProductDetailPage />
            </UserLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <AboutUsPage />
            </UserLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <CartPage />
            </UserLayout>
          }
        />
        <Route
          path="/order"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <MyOrderPage />
            </UserLayout>
          }
        />
        <Route
          path="/order/detail"
          element={
            <UserLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
              <OrderDetailPage />
            </UserLayout>
          }
        />
        {/* page admin */}
        <Route
          path="/dashboard"
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <DashBoard />
              </div>
            </div>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <UserList />
              </div>
            </div>
          }
        />
        <Route
          path="/dashboard/user/:userId"
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <User />
              </div>
            </div>
          }
        />
        <Route
          path="/dashboard/newUser"
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <NewUser />
              </div>
            </div>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <ProductList />
              </div>
            </div>
          }
        />
        <Route
          path="/dashboard/product/:productId"
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Product />
              </div>
            </div>
          }
        />
        <Route
          path="/dashboard/newProduct"
          element={
            <div>
              <Topbar />
              <div className="container">
                <Sidebar />
                <NewProduct />
              </div>
            </div>
          }
        />
        <Route
          path="*"
          element={
            <UserLayout>
              <ErrorPage />
            </UserLayout>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </Box>
  );
}

export default App;
