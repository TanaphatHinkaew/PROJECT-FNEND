import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; // นำเข้า sweetalert
import id_Application from '../../../Data/id_Application'; // นำเข้าข้อมูลสินค้า
import id_program from '../../../Data/id_program'; // นำเข้าข้อมูลสินค้าโปรแกรม
import id_Subscription from '../../../Data/id_Subscription'; // นำเข้าข้อมูลสินค้า Subscription
import id_Unbanned from '../../../Data/id_Unbanned'; // นำเข้าข้อมูลสินค้า Unbanned
import { UserContext } from '../../../App'; // นำเข้า UserContext
import PropTypes from 'prop-types'; // นำเข้า PropTypes

const allProducts = [...id_Application, ...id_program, ...id_Subscription, ...id_Unbanned]; // รวมสินค้าจากทุกแหล่งข้อมูล

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ดึงข้อมูลผู้ใช้ที่ล็อกอินจาก UserContext

  const product = location.state?.product; // ดึงข้อมูลสินค้าจาก state ที่ส่งมาจาก ProductDetails
  const [proofImage, setProofImage] = useState(null); // เก็บรูปที่อัปโหลด
  const [uploadedFileName, setUploadedFileName] = useState('');

  // ถ้าผู้ใช้ยังไม่ได้ล็อกอิน ให้นำทางไปที่หน้า login
  useEffect(() => {
    if (!user) {
      navigate('/login'); // นำทางไปที่หน้า login
      swal("คุณยังไม่ได้เข้าสู่ระบบ", "กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อสินค้า", "warning");
    }
  }, [user, navigate]);

  if (!product) {
    return <div>ไม่พบสินค้า กรุณาเลือกสินค้าก่อนทำการชำระเงิน</div>;
  }

  // ฟังก์ชันลดจำนวน stock และอัปเดตสินค้าคงเหลือใน allProducts
  const reduceStock = (productId) => {
    const productIndex = allProducts.findIndex((item) => item.id === productId);

    if (productIndex !== -1 && allProducts[productIndex].stock > 0) {
      // ลดจำนวน stock ลง 1
      allProducts[productIndex].stock -= 1;
      console.log(`Stock ของ ${allProducts[productIndex].brand} เหลือ ${allProducts[productIndex].stock} ชิ้น`);
    } else {
      console.log('ไม่สามารถลด stock ได้ สินค้าหมด');
    }
  };

  // ฟังก์ชันสำหรับบันทึกคำสั่งซื้อแยกตามผู้ใช้ที่ล็อกอิน
  const saveOrderToLocalStorage = (order) => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || {};
    const userOrders = storedOrders[user.email] || []; // ดึงข้อมูลการสั่งซื้อของผู้ใช้ที่ล็อกอิน
    const updatedOrders = [...userOrders, order];
    
    // อัปเดตข้อมูลการสั่งซื้อใน localStorage แยกตามอีเมลของผู้ใช้
    storedOrders[user.email] = updatedOrders;
    localStorage.setItem('orders', JSON.stringify(storedOrders));
  };

  const handlePayment = () => {
    if (!proofImage) {
      swal("กรุณาอัปโหลดหลักฐานการชำระเงิน", "คุณยังไม่ได้อัปโหลดรูปหลักฐานการชำระเงิน!", "warning");
      return;
    }

    reduceStock(product.id); // ลดจำนวน stock เมื่อชำระเงินเสร็จ

    // บันทึกการสั่งซื้อใหม่ลง localStorage แยกตามผู้ใช้ที่ล็อกอิน
    const newOrder = {
      id: new Date().getTime(),
      product: product.brand,
      key: 'สมมติรหัสสินค้า/คีย์ที่ได้รับ', // คุณสามารถปรับให้เป็นข้อมูลจริงที่ได้รับ
      price: product.discountedPrice,
      date: new Date().toLocaleString(),
    };
    saveOrderToLocalStorage(newOrder);

    swal("ชำระเงินสำเร็จ!", `การชำระเงินสำหรับ ${product.brand} จำนวน ${product.discountedPrice} บาท เสร็จสิ้น!`, "success")
      .then(() => {
        navigate('/orderhistory'); // กลับไปยังหน้า OrderHistory หลังชำระเงิน
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProofImage(URL.createObjectURL(file)); // แสดงภาพที่อัปโหลด
    setUploadedFileName(file.name);
    swal("อัปโหลดสำเร็จ", `คุณอัปโหลดไฟล์ ${file.name} เรียบร้อยแล้ว!`, "success");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">ชำระเงิน</h1>

      {/* แสดงสินค้า */}
      <div className="flex flex-col md:flex-row items-center border rounded-lg p-4 shadow-md mb-6">
        <img
          src={product.imageUrl}
          alt={product.brand}
          className="w-32 h-32 object-cover mr-4"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{product.brand}</h2>
          <p className="text-gray-700">{product.details}</p>
          <div className="mt-2">
            <span className="font-bold">ราคา:</span> {product.discountedPrice} บาท
          </div>
          <div className="mt-2">
            <span className="font-bold">สต๊อกที่เหลือ:</span> {product.stock} ชิ้น
          </div>
        </div>
      </div>

      {/* วิธีการชำระเงิน */}
      <h2 className="text-lg font-semibold mb-2">วิธีการชำระเงิน</h2>
      <div className="border rounded-lg p-4 shadow-md mb-6">
        {/* แสดง QR Code */}
        <div className="mb-4">
          <img
            src="https://cdn.discordapp.com/attachments/1112713507679514645/1273217291684810772/IMG_0811.jpg?ex=66dc2201&is=66dad081&hm=696d9b922cb011f112bb2a5f751c0035cf5d4cf51286b6c955a0aca29b66af31&"
            alt="QR Code"
            className="w-48 h-48 object-cover mx-auto"
          />
        </div>

        {/* แสดงเลขบัญชี */}
        <div className="text-center">
          <p className="font-semibold">ธนาคารกสิกร</p>
          <p>099-9999-999</p>
        </div>
      </div>

      {/* อัปโหลดรูปหลักฐานการชำระเงิน */}
      <div className="border rounded-lg p-4 shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">อัปโหลดหลักฐานการชำระเงิน</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {proofImage && (
          <div className="mt-4">
            <p>อัปโหลดรูปสำเร็จ: {uploadedFileName}</p>
            <img src={proofImage} alt="Proof" className="w-32 h-32 object-cover mt-2" />
          </div>
        )}
      </div>

      {/* ปุ่มชำระเงิน */}
      <button 
        onClick={handlePayment}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        ดำเนินการชำระเงิน
      </button>
    </div>
  );
};

// เพิ่มการใช้ PropTypes
Checkout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number,
        brand: PropTypes.string,
        imageUrl: PropTypes.string,
        details: PropTypes.string,
        discountedPrice: PropTypes.number,
        stock: PropTypes.number,
      }),
    }),
  }),
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default Checkout;
