import React, { useState, useEffect } from 'react';
import { Product, Page } from '../types';

interface QuickViewModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
    onNavigateToProduct: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart, onNavigateToProduct }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(product?.images[0] || '');

    useEffect(() => {
        if (product) {
            setQuantity(1);
            setActiveImage(product.images[0]);
        }
    }, [product]);

    if (!product) {
        return null;
    }
    
    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCartClick = () => {
        onAddToCart(product, quantity);
        onClose();
    };
    
    const handleNavigate = () => {
      onNavigateToProduct(product);
      onClose();
    }

    const handleNextImage = () => {
        const currentIndex = product.images.indexOf(activeImage);
        const nextIndex = (currentIndex + 1) % product.images.length;
        setActiveImage(product.images[nextIndex]);
    };

    const handlePrevImage = () => {
        const currentIndex = product.images.indexOf(activeImage);
        const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
        setActiveImage(product.images[prevIndex]);
    };

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 ${product ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`bg-white text-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden transition-transform duration-300 ${product ? 'scale-100' : 'scale-95'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Image Gallery */}
                <div className="w-full md:w-1/2 p-4">
                    <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden group">
                        <img 
                            src={activeImage} 
                            alt={product.name} 
                            className="w-full h-full object-center object-cover"
                        />
                         {product.images.length > 1 && (
                            <>
                                <button onClick={handlePrevImage} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white/80 transition opacity-30 group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                                <button onClick={handleNextImage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white/80 transition opacity-30 group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                            </>
                         )}
                    </div>
                     {product.images.length > 1 && (
                        <div className="mt-2 grid grid-cols-4 gap-2">
                            {product.images.slice(0, 4).map(img => (
                                <button key={img} onClick={() => setActiveImage(img)} className={`aspect-square w-full bg-gray-100 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 ${activeImage === img ? 'ring-2 ring-offset-2 ring-offset-white ring-red-500' : ''}`}>
                                    <img src={img} alt="" className="w-full h-full object-center object-cover" />
                                </button>
                            ))}
                        </div>
                     )}
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
                    <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-500">{product.producer}</p>
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mt-1">{product.name}</h2>
                        <p className="text-2xl text-gray-900 mt-4">{product.price}</p>
                        <p className="text-gray-600 mt-4 text-sm leading-relaxed">{product.story}</p>
                    </div>

                    <div className="mt-6 flex-shrink-0">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                <button onClick={() => handleQuantityChange(-1)} className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                                <span className="px-5 py-2 text-lg font-medium w-16 text-center text-gray-900">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                            </div>
                            <button 
                                onClick={handleAddToCartClick}
                                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg text-sm"
                            >
                                เพิ่มลงตะกร้า
                            </button>
                        </div>
                        <button onClick={handleNavigate} className="w-full mt-4 text-sm text-red-600 font-medium hover:text-red-500">
                            ดูรายละเอียดสินค้าฉบับเต็ม &rarr;
                        </button>
                    </div>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition">
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default QuickViewModal;