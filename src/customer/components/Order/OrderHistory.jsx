import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate เพื่อนำทาง
import id_Application from '../../../Data/id_Application';
import id_program from '../../../Data/id_program';
import id_Subscription from '../../../Data/id_Subscription'; 
import id_Unbanned from '../../../Data/id_Unbanned';
import { UserContext } from '../../../App'; // ดึงข้อมูลผู้ใช้ที่ล็อกอินจาก Context
import PropTypes from 'prop-types'; // เพิ่ม PropTypes สำหรับการตรวจสอบ

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // สำหรับการนำทาง
  const { user } = useContext(UserContext); // ดึงข้อมูลผู้ใช้ที่ล็อกอินจาก Context

  useEffect(() => {
    // ตรวจสอบการล็อกอิน
    if (!user) {
      navigate('/login'); // นำทางไปยังหน้า login ถ้ายังไม่ได้ล็อกอิน
      return;
    }

    // ดึงข้อมูลการสั่งซื้อของผู้ใช้ที่ล็อกอินจาก localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || {};
    const userOrders = storedOrders[user.email] || []; // ดึงเฉพาะข้อมูลการสั่งซื้อของผู้ใช้ปัจจุบัน
    setOrders(userOrders);
  }, [user, navigate]);

  // ฟังก์ชันสำหรับกรองข้อมูลตามการค้นหา
  const filteredOrders = orders.filter(order => 
    order.product.toLowerCase().includes(search.toLowerCase()) || 
    order.id.toString().includes(search)
  );

  // ฟังก์ชันสำหรับรวมข้อมูลจากไฟล์ต่างๆ
  const mergeOrderWithData = (order) => {
    const productData = id_Application.find(item => item.brand.toLowerCase() === order.product.toLowerCase()) ||
                       id_program.find(item => item.brand.toLowerCase() === order.product.toLowerCase()) ||
                       id_Subscription.find(item => item.brand.toLowerCase() === order.product.toLowerCase()) ||
                       id_Unbanned.find(item => item.brand.toLowerCase() === order.product.toLowerCase());

    return {
      ...order,
      imageUrl: productData ? productData.imageUrl : 'https://via.placeholder.com/150', // กรณีไม่มีภาพสินค้า
      details: productData ? productData.details : 'No additional details',
      discountedPrice: productData ? productData.discountedPrice : order.price,
      originalPrice: productData ? productData.price : order.price,
    };
  };

  // เพิ่มข้อมูลที่รวมจากไฟล์ต่างๆ
  const mergedOrders = filteredOrders.map(mergeOrderWithData);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Order History</h2>

        {/* กล่องค้นหา */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ตารางแสดงข้อมูลการสั่งซื้อ */}
        <table className="min-w-full table-auto bg-gray-50">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">ID / Key</th>
              <th className="px-4 py-2 text-left">Discounted Price</th>
              <th className="px-4 py-2 text-left">Original Price</th>
              <th className="px-4 py-2 text-left">Details</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {mergedOrders.length > 0 ? (
              mergedOrders.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{order.product}</td>
                  <td className="px-4 py-2">{order.key}</td>
                  <td className="px-4 py-2">{order.discountedPrice.toFixed(2)} บาท</td>
                  <td className="px-4 py-2">{order.originalPrice.toFixed(2)} บาท</td>
                  <td className="px-4 py-2">{order.details}</td>
                  <td className="px-4 py-2">{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// เพิ่ม PropTypes สำหรับตรวจสอบ prop
OrderHistory.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

export default OrderHistory;
