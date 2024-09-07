import React, { useState, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import Navigation from './customer/components/Navigation/Navigation';
import Footer from './customer/components/Footer/Footer';
import CustomerRouters from './Routers/CustomerRouters';
import { store } from './store/store'; // นำเข้า Redux Store
import './App.css'; // นำเข้าไฟล์ CSS

// สร้าง UserContext เพื่อเก็บสถานะของผู้ใช้
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null); // สถานะของผู้ใช้ที่เข้าสู่ระบบ

  return (
    <Provider store={store}> {/* ผูก Redux Store */}
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            {/* Navigation bar */}
            <Navigation />

            {/* Main Content Area */}
            <div className="flex-grow">
              <CustomerRouters />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;