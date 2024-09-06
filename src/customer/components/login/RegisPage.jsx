import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'; // นำเข้า axios สำหรับการทำ HTTP request
import { Link, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate สำหรับการนำทาง

const RegisPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับส่งข้อมูลไปยัง backend เพื่อบันทึกผู้ใช้
  const registerUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', newUser);
      
      // ตรวจสอบการตอบกลับจาก backend
      if (response.status === 201 || response.status === 200) {
        alert('Registration successful!');
        navigate('/login'); // นำทางไปยังหน้า login หลังจากลงทะเบียนสำเร็จ
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('This email is already registered. Please use a different email.');
      } else {
        alert('An error occurred during registration. Please try again.');
      }
      console.error('Registration error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = { email, password };
    registerUser(newUser); // เรียกฟังก์ชันเพื่อส่งข้อมูลไปยัง backend
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <IconButton
              onClick={togglePasswordVisibility}
              className="absolute top-1 right-3"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Register
            </button>
            <p className="text-sm text-blue-500 hover:underline">
              <Link to="/login">Already have an account? Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisPage;
