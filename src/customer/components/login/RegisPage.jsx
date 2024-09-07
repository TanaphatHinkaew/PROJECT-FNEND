import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate สำหรับการนำทาง
import PropTypes from 'prop-types'; // เพิ่ม PropTypes สำหรับการตรวจสอบ prop

const RegisPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับบันทึกผู้ใช้ลงใน localStorage
  const saveUserToLocalStorage = (newUser) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // ตรวจสอบว่ามีผู้ใช้อีเมลเดียวกันอยู่แล้วหรือไม่
    const isEmailTaken = existingUsers.some(user => user.email === newUser.email);
    
    if (isEmailTaken) {
      alert('This email is already registered. Please use a different email.');
      return false;
    }

    // บันทึกผู้ใช้ใหม่ลงใน localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = { email, password };
    const isRegistered = saveUserToLocalStorage(newUser);

    if (isRegistered) {
      alert('Registration successful!');
      navigate('/login'); // นำทางไปยังหน้า login หลังจากลงทะเบียนสำเร็จ
    }
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

// เพิ่ม PropTypes เพื่อให้แน่ใจว่ามีการใช้งาน props อย่างถูกต้อง (หากต้องการส่ง prop เข้ามา)
RegisPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
};

export default RegisPage;
