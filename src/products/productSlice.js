import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ตัวอย่างการใช้ RESTful API สำหรับการดึงข้อมูลสินค้า
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/products'); // ตัวอย่าง API จริง
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // บันทึกข้อมูลสินค้าเมื่อโหลดสำเร็จ
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
