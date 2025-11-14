import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-2">ตลาดภูมิปัญญา</h3>
            <p className="text-gray-600 text-sm">
              เชื่อมโยงภูมิปัญญาของชาติกับโอกาสทางเศรษฐกิจยุคใหม่
            </p>
            <div className="mt-6 flex items-center space-x-6">
                <img src="https://www.sbpac.go.th/home/wp-content/uploads/2024/02/Sbpac_LOGO.jpg" alt="SBPAC Logo" className="h-14 w-auto object-contain flex-shrink-0 bg-white p-1 rounded border border-gray-200" />
                <img src="https://thainews.prd.go.th/_next/image/?url=https%3A%2F%2Fnnt-storage-thainews.prd.go.th%2Fmedia-news%2Fraw%2F2025%2F10%2F08%2Fef41841114f302d226a051ab124d0474.jpg&w=1080&q=75" alt="Partner Logo 2" className="h-14 w-auto object-contain flex-shrink-0 bg-white p-1 rounded border border-gray-200" />
                <img src="https://www.xn--l3ca2hb.com/logo-removebg-preview.png" alt="Partner Logo 3" className="h-14 w-auto object-contain flex-shrink-0" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-red-600 tracking-wider uppercase text-sm mb-3">สำหรับผู้ซื้อ</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('all-products')} className="text-gray-600 hover:text-red-600 text-sm transition-colors">สินค้าทั้งหมด</button></li>
              <li><a href="#" className="text-gray-600 hover:text-red-600 text-sm transition-colors">โปรโมชั่น</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-600 text-sm transition-colors">วิธีการสั่งซื้อ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-600 tracking-wider uppercase text-sm mb-3">สำหรับผู้ขาย</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-red-600 text-sm transition-colors">สมัครเป็นผู้ขาย</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-600 text-sm transition-colors">คู่มือการขาย</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-600 text-sm transition-colors">ศูนย์ช่วยเหลือ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ตลาดภูมิปัญญา. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <span className="sr-only">Instagram</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.273 0-3.663.014-4.942.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.67-.073 4.942s.014 3.661.072 4.942c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.67.072 4.942.072s3.661-.014 4.942-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.669.073-4.942s-.014-3.661-.072-4.942c-.198-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.67-.073-4.942-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
                </svg>
              </a>
               <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <span className="sr-only">Line</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 64 64">
                   <path d="M54.2,4.2C49.1-0.9,41.9-0.9,36.8,4.2L32,9l-4.8-4.8c-5.1-5.1-12.3-5.1-17.4,0C4.7,9.3,2.2,15,3.3,20.9l-2,4.8c-1,2.4-0.1,5.2,2,6.9l12.4,9.6c1,0.8,2.4,0.9,3.5,0.4l5.4-2.2l-4.2,4.2c-1.3,1.3-1.3,3.3,0,4.5l5.1,5.1c1.3,1.3,3.3,1.3,4.5,0l4.2-4.2l2.2,5.4c0.5,1.1,1.7,1.8,2.9,1.8c0.2,0,0.5,0,0.7-0.1l9.6-12.4c1.8-2.2,2.8-5,1.8-7.4l-4.8-2L59.8,21.6c5.1-5.1,5.1-12.3,0-17.4C59.3,4.2,54.2,4.2,54.2,4.2z M27,33.5L16.2,22.7c1-1.1,1.9-2.3,2.7-3.4L29.8,29c1.3,1.3,3.3,1.3,4.5,0l2.8-2.8l-9.6,3.9c-1.2,0.5-2.6,0.2-3.5-0.6H27z M51.1,18.9L40.4,29.7c-0.8,0.8-2.2,0.8-3,0l-2.8-2.8l9.6-3.9c1.2-0.5,2.6-0.2,3.5,0.6c0.8,0.9,1.7,1.8,2.7,2.8L51.1,18.9z"/>
                 </svg>
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;