import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../products/productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer, // ตัวอย่าง reducer ที่ใช้สำหรับสินค้า
  },
});

export default store;
