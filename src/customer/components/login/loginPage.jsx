import React, { useState, useContext } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      setUser(user);
      swal({
        title: "Login Successful!",
        text: "You will be redirected to the homepage.",
        icon: "success",
        button: "OK",
      }).then(() => {
        navigate('/homepage');
      });
    } else {
      swal({
        title: "Error!",
        text: "อีเมลหรือพาสเวิร์ดไม่ถูกต้อง กรุณาลองใหม่",
        icon: "error",
        button: "ลองใหม่",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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

          {/* Password Field with MUI Icon */}
          <div className="mb-6 relative">
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

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </div>

          {/* Link to Registration Page */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};


Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
