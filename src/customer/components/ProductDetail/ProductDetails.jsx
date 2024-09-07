import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ใช้ useParams เพื่อดึง ID จาก URL
import swal from 'sweetalert'; // นำเข้าฟังก์ชัน swal เพื่อใช้แสดง alert
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // นำเข้าไอคอนลูกศรกลับ
import id_Application from '../../../Data/id_Application'; // นำเข้าข้อมูลสินค้า
import id_program from '../../../Data/id_program'; // นำเข้าข้อมูลสินค้าโปรแกรม
import id_Subscription from '../../../Data/id_Subscription'; // นำเข้าข้อมูลสินค้า Subscription
import id_Unbanned from '../../../Data/id_Unbanned'; // นำเข้าข้อมูลสินค้า Unbanned
import PropTypes from 'prop-types'; // เพิ่ม PropTypes สำหรับตรวจสอบ prop

const ProductDetails = () => {
  const { id } = useParams(); // ดึง ID ของสินค้า
  const navigate = useNavigate();

  // รวมข้อมูลจากทุกหมวดสินค้าเข้าด้วยกัน
  const allProducts = [...id_Application, ...id_program, ...id_Subscription, ...id_Unbanned];

  // ค้นหาสินค้าด้วย ID
  const product = allProducts.find((item) => item.id === parseInt(id));

  const handleBuy = () => {
    if (product.stock > 0) {
      // ถ้ามี stock นำผู้ใช้ไปยังหน้าจ่ายเงิน
      navigate('/checkout', { state: { product } });
    } else {
      // ถ้าสินค้าหมด ให้แสดง alert
      swal("สินค้าหมด", "ไม่สามารถซื้อสินค้าได้", "error");
    }
  };

  // ฟังก์ชันสำหรับกลับไปยังหน้าหลัก
  const handleGoBack = () => {
    navigate('/');
  };

  if (!product) {
    // เพิ่มการแสดงแจ้งเตือนเมื่อไม่พบสินค้า
    swal("ไม่พบสินค้า", "สินค้าที่คุณค้นหาไม่พบ", "error").then(() => {
      navigate('/'); // กลับไปยังหน้าหลักหลังจากแสดง alert
    });
    return null;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center">
          {/* เพิ่มไอคอน ArrowBackIcon */}
          <ArrowBackIcon 
            onClick={handleGoBack} 
            className="cursor-pointer text-gray-600 hover:text-gray-800 ml-40" 
            style={{ fontSize: '2rem', marginRight: '8px' }} 
          />
          <ol className="max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ml-4">
            <li className="text-sm">
              <a href="/" className="font-medium text-gray-500 hover:text-gray-600">{product.brand}</a>
            </li>
          </ol>
        </nav>

        {/* ข้อมูลสินค้า */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img src={product.imageUrl} alt={product.brand} className="h-full w-full object-cover object-center" />
            </div>
          </div>

          <div className="lg:col-span-1 max-w-3xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{product.brand}</h1>
            <h2 className="text-lg lg:text-xl text-gray-400 pt-1">{product.details}</h2>
            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
              <p className="font-semibold">{product.discountedPrice} บาท</p>
              <p className="text-gray-400 line-through">{product.price} บาท</p>
              <p className="text-green-600 font-semibold">{product.discountPersent}% Off</p>
            </div>

            {/* แสดงจำนวนสินค้าคงเหลือ */}
            {product.stock !== undefined && (
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-800">จำนวนสินค้าคงเหลือ: {product.stock} ชิ้น</p>
                {product.stock === 0 && (
                  <p className="text-red-600 font-bold">สินค้าหมด</p>
                )}
              </div>
            )}

            {/* ปุ่มซื้อ */}
            <button 
              onClick={handleBuy} 
              // ปิดการทำงานของปุ่มเมื่อสินค้าหมด
              className={`mt-10 flex w-full items-center justify-center rounded-md px-8 py-3 text-base font-medium text-white ${product.stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}>
              ซื้อ
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

// เพิ่ม PropTypes เพื่อตรวจสอบว่า prop มีรูปแบบที่ถูกต้อง
ProductDetails.propTypes = {
  id: PropTypes.string,
  product: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    discountPersent: PropTypes.number.isRequired,
    stock: PropTypes.number,
  }),
};

export default ProductDetails;
