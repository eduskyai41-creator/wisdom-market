import React from 'react';
import { CartItem, Page } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onNavigate: (page: Page) => void;
  onCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate, onCheckout }) => {
  const getPriceValue = (price: string) => parseFloat(price.replace(/[^0-9.-]+/g, ""));

  const subtotal = cartItems.reduce((sum, item) => {
    const price = getPriceValue(item.price);
    return sum + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-extrabold text-gray-900">ตะกร้าสินค้าของคุณว่างเปล่า</h2>
            <p className="mt-2 text-gray-600">ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าใดๆ ลงในตะกร้า</p>
            <button
                onClick={() => onNavigate('all-products')}
                className="mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/40"
            >
                เลือกซื้อสินค้าต่อ
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">ตะกร้าสินค้า</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48 border border-gray-200"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.producer}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center border border-gray-300 rounded-md w-fit sm:float-right bg-white">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md" aria-label="ลดจำนวน">-</button>
                          <span className="px-4 py-1 text-md font-medium w-12 text-center text-gray-900" aria-live="polite">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md" aria-label="เพิ่มจำนวน">+</button>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:col-start-2 sm:pr-9">
                         <p className="text-lg font-bold text-gray-900 sm:text-right">{new Intl.NumberFormat('th-TH').format(getPriceValue(item.price) * item.quantity)} ฿</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2 text-sm text-gray-500">
                      <button onClick={() => onRemoveItem(item.id)} type="button" className="flex items-center space-x-1 text-red-500 hover:text-red-400">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                         </svg>
                        <span>ลบ</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">สรุปคำสั่งซื้อ</h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">ราคาสินค้า ({cartItems.reduce((total, item) => total + item.quantity, 0)} ชิ้น)</dt>
                <dd className="text-sm font-medium text-gray-900">{new Intl.NumberFormat('th-TH').format(subtotal)} ฿</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">ยอดรวมทั้งหมด</dt>
                <dd className="text-base font-medium text-gray-900">{new Intl.NumberFormat('th-TH').format(subtotal)} ฿</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={onCheckout}
                className="w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
            <div className="mt-6 text-center text-sm">
                <p>
                    <span className="text-gray-500">หรือ</span>{' '}
                    <button onClick={() => onNavigate('all-products')} className="text-red-600 font-medium hover:text-red-500">
                        เลือกซื้อสินค้าต่อ<span aria-hidden="true"> &rarr;</span>
                    </button>
                </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;