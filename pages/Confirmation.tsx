import React from 'react';
import { Page } from '../types.ts';

interface ConfirmationProps {
  onNavigate: (page: Page) => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-2xl font-extrabold text-gray-900">ขอบคุณสำหรับคำสั่งซื้อ!</h2>
        <p className="mt-2 text-gray-600">เราได้รับคำสั่งซื้อของคุณแล้วและกำลังดำเนินการจัดส่งให้เร็วที่สุด</p>
        <button
          onClick={() => onNavigate('all-products')}
          className="mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/40"
        >
          เลือกซื้อสินค้าต่อ
        </button>
      </div>
    </div>
  );
};

export default Confirmation;