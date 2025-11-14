import React from 'react';
import { Page } from '../types';

interface StoriesProps {
  onNavigate: (page: Page) => void;
}

const Stories: React.FC<StoriesProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base font-semibold leading-7 text-red-600">เรื่องราวจากชุมชน</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">เร็วๆ นี้</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            เรากำลังรวบรวมเรื่องราวที่น่าสนใจจากชุมชนต่างๆ ทั่วประเทศ เพื่อนำเสนอเบื้องหลังและคุณค่าของผลิตภัณฑ์แต่ละชิ้น โปรดติดตาม!
          </p>
          <div className="mt-10">
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/40"
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;