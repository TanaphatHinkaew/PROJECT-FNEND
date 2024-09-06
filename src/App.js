import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Navigation from './customer/components/Navigation/Navigation';
import Footer from './customer/components/Footer/Footer';
import CustomerRouters from './Routers/CustomerRouters';
import './App.css'; // นำเข้าไฟล์ CSS

// สร้าง UserContext เพื่อเก็บสถานะของผู้ใช้
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null); // สถานะของผู้ใช้ที่เข้าสู่ระบบ

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          {/* Navigation bar */}
          <Navigation />

          {/* Main Content Area */}
          <div className="flex-grow">
            <Routes>
              <Route path='/*' element={<CustomerRouters />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
