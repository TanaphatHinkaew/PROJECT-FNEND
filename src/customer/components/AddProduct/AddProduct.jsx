import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ใช้สำหรับส่งข้อมูลไปยัง backend

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [discountPersent, setDiscountPersent] = useState('');
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [highlights, setHighlights] = useState('');
  
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับ handle การส่งข้อมูลฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      price: parseFloat(price), // แปลงเป็น number
      discountedPrice: parseFloat(discountedPrice), // แปลงเป็น number
      discountPersent: parseFloat(discountPersent), // แปลงเป็น number
      category: category,
      details: details,
      stock: parseInt(stock), // แปลงเป็น integer
      imageUrl: imageUrl,
      highlights: highlights.split(',').map((item) => item.trim()), // แปลงเป็น array
    };

    try {
      // ส่งข้อมูลไปยัง backend ผ่าน axios
      await axios.post('http://localhost:8080/api/products', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Product added successfully!');
      navigate('/products'); // หลังจากเพิ่มสินค้าสำเร็จจะไปยังหน้ารายการสินค้า
    } catch (error) {
      console.error('Error adding product', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Original Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Discounted Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountedPrice">
              Discounted Price
            </label>
            <input
              type="number"
              id="discountedPrice"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Discount Percentage */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPersent">
              Discount Percentage
            </label>
            <input
              type="number"
              id="discountPersent"
              value={discountPersent}
              onChange={(e) => setDiscountPersent(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Details */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
