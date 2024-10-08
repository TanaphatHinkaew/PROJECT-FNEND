import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import HomePage from '../customer/pages/HomePage/HomePage'; 
import ProductDetails from '../customer/components/ProductDetail/ProductDetails'; 
import LoginPage from '../customer/components/login/loginPage'; 
import RegisPage from '../customer/components/login/RegisPage';
import OrderHistory from '../customer/components/Order/OrderHistory';
import Checkout from '../customer/components/Cart/Checkout';
import AddProduct from '../customer/components/AddProduct/AddProduct';

const CustomerRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} /> 
      <Route path="/home" element={<HomePage />} /> 
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/register" element={<RegisPage />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/product/:id" element={<ProductDetails />} /> {/* เส้นทางสำหรับแสดงรายละเอียดสินค้า */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="*" element={<Navigate to="/home" />} /> 
    </Routes>
  );
};

export default CustomerRouters;
