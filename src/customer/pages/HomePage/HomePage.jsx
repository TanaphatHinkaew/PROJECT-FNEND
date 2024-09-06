import React from "react";
import MainCrosel from "../../components/HomeCarosel/MainCrosel";
import HomeSectionCarosel from "../../components/HomeSectionCarosel/HomeSectionCarosel";
import { Link } from 'react-router-dom'; // นำเข้า Link เพื่อทำการเชื่อมโยงไปยังหน้ารายละเอียดสินค้า
import AnnouncementIcon from '@mui/icons-material/Announcement';

import id_Unbanned from "../../../Data/id_Unbanned";
import id_Application from "../../../Data/id_Application";
import id_program from "../../../Data/id_program";
import id_Subscription from "../../../Data/id_Subscription";

const HomePage = () => {
    return (
        <div className="relative mt-16">
            {/* แบนเนอร์หรือ carousel */}
            <MainCrosel />

            {/* ข้อความประกาศ */}
            <div className="flex justify-center items-center text-3xl mt-9 text-red-500">
                <div className="flex items-center">
                    <AnnouncementIcon className="mr-7" />
                    <p>มีปัญหาเรื่องโปรแกรมตัวไหน ไม่เข้าใจตรงไหนลง Discord Contract ได้เลยนะครับ</p>
                    <AnnouncementIcon className="ml-7" />
                </div>
            </div>

            {/* ลิงก์ Discord */}
            <div className="flex justify-center items-center text-3xl mt-9 text-blue-500 underline">
                <a href="https://discord.gg/psTR9BbF" className="text-blue-500 underline">
                    https://discord.gg/psTR9BbF
                </a>
            </div>

            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">

                {/* หมวดหมู่สินค้า: Unbanned */}
                <h2 className="text-2xl font-bold">----- Unbanned -----</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {id_Unbanned.length > 0 ? (
                        id_Unbanned.map((program) => (
                            <Link to={`/product/${program.id}`} key={program.id}>
                                <div className="bg-white border rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300">
                                    <div className="relative">
                                        <img
                                            src={program.imageUrl}
                                            alt={program.brand}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-semibold">
                                            {`ID ${program.brand.toUpperCase()}`}
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-bold text-gray-800">{program.brand}</h3>
                                        <p className="text-sm text-gray-500">{program.title}</p>
                                        <p className="text-lg font-semibold text-gray-800 mt-2">{program.discountedPrice} บาท</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">ไม่มีสินค้าหมวด Unbanned ในขณะนี้</p>
                    )}
                </div>

                {/* หมวดหมู่สินค้า: ID Program */}
                <h2 className="text-2xl font-bold">----- ID Program -----</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {id_program.length > 0 ? (
                        id_program.map((program) => (
                            <Link to={`/product/${program.id}`} key={program.id}>
                                <div className="bg-white border rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300">
                                    <div className="relative">
                                        <img
                                            src={program.imageUrl}
                                            alt={program.brand}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-semibold">
                                            {`ID ${program.brand.toUpperCase()}`}
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-bold text-gray-800">{program.brand}</h3>
                                        <p className="text-sm text-gray-500">{program.title}</p>
                                        <p className="text-lg font-semibold text-gray-800 mt-2">{program.discountedPrice} บาท</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">ไม่มีสินค้าหมวด ID Program ในขณะนี้</p>
                    )}
                </div>

                {/* หมวดหมู่สินค้า: ID Application */}
                <h2 className="text-2xl font-bold">----- ID Application -----</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {id_Application.length > 0 ? (
                        id_Application.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <div className="bg-white border rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300">
                                    <div className="relative">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.brand}
                                            className="w-full h-60 object-cover"
                                        />
                                        <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-semibold">
                                            {`ID ${product.brand.toUpperCase()}`}
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-bold text-gray-800">{product.brand}</h3>
                                        <p className="text-sm text-gray-500">{product.title}</p>
                                        <p className="text-lg font-semibold text-gray-800 mt-2">{product.discountedPrice} บาท</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">ไม่มีสินค้าหมวด ID Application ในขณะนี้</p>
                    )}
                </div>

                {/* หมวดหมู่สินค้า: ID Subscription */}
                <h2 className="text-2xl font-bold">----- ID Subscription -----</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {id_Subscription.length > 0 ? (
                        id_Subscription.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <div className="bg-white border rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300">
                                    <div className="relative">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.brand}
                                            className="w-full h-60 object-cover"
                                        />
                                        <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-semibold">
                                            {`ID ${product.brand.toUpperCase()}`}
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-bold text-gray-800">{product.brand}</h3>
                                        <p className="text-sm text-gray-500">{product.title}</p>
                                        <p className="text-lg font-semibold text-gray-800 mt-2">{product.discountedPrice} บาท</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">ไม่มีสินค้าหมวด ID Subscription ในขณะนี้</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
