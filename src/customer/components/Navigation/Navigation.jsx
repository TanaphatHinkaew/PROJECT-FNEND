import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { UserContext } from '../../../App'; // นำเข้า UserContext
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types'; // เพิ่ม PropTypes สำหรับการตรวจสอบ prop

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext); // ดึงข้อมูลจาก UserContext
  const navigate = useNavigate();
  
  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปยังหน้าล็อกอิน
  const Clicktologin = () => {
    navigate('/login');
  };

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปยังหน้าลงทะเบียน
  const ClicktoRegis = () => {
    navigate('/register');
  };

  // ฟังก์ชันสำหรับไปยังประวัติการสั่งซื้อ
  const ClicktoOrder = () => {
    if (user) {
      navigate('/orderhistory');
    } else {
      navigate('/login');
    }
  };

  // ฟังก์ชันเมื่อผู้ใช้คลิกปุ่ม Id Game
  const ClicktoGame = () => {
    if (user) {
      navigate('/game'); // เปลี่ยนเส้นทางไปที่หน้าเกม
    } else {
      navigate('/login'); // ถ้ายังไม่ได้ล็อกอิน จะนำไปที่หน้า login
    }
  };

  // ฟังก์ชันออกจากระบบ พร้อมการยืนยันก่อนออก
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setUser(null); // ล้างข้อมูลผู้ใช้เมื่อออกจากระบบ
      navigate('/');
    }
  };

  return (
    <div className="bg-white">
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        {/* Mobile menu */}
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button onClick={() => setOpen(false)} className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img alt="Logo" src="https://cdn.discordapp.com/attachments/1112713507679514645/1281253229773983764/9.png?ex=66dc5d0e&is=66db0b8e&hm=58c02612bbde71ffb88e8cb1a13b8072bbc4fd7035973809089bd4cc075b3273&" className="h-8 w-auto" />
                </Link>
              </div>

              {/* Navigation Links */}
              <div>
                <button onClick={ClicktoGame} className="text-sm font-medium text-gray-700 hover:text-gray-800 ml-5">
                  Id game
                </button>
              </div>
              <div>
                <button onClick={ClicktoOrder} className="text-sm font-medium text-gray-700 hover:text-gray-800 ml-4">
                  Order
                </button>
              </div>

              {/* User Section */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <>
                      <span className="text-sm font-medium text-gray-700">{user.email}</span>
                      <button onClick={handleLogout} className="text-sm font-medium text-gray-700 hover:text-gray-800 ml-4">
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={Clicktologin} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </button>
                      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                      <button onClick={ClicktoRegis} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

// เพิ่ม PropTypes เพื่อตรวจสอบว่าข้อมูลผู้ใช้และฟังก์ชัน setUser ถูกต้อง
Navigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func.isRequired,
};

export default Navigation;
