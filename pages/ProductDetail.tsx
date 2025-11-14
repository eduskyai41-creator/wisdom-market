
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useToast } from '../hooks/useToast';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}


const StarRating: React.FC<{ rating: number, reviewCount: number }> = ({ rating, reviewCount }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
        {/* Simplified for now, no half stars */}
        {[...Array(emptyStars + (halfStar ? 1 : 0))].map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
        <a href="#" className="ml-3 text-sm font-medium text-red-600 hover:text-red-500">{reviewCount} รีวิว</a>
      </div>
    );
};  

const ProductDetail: React.FC<ProductDetailProps> = ({ product, allProducts, onBack, onSelectProduct, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const addToast = useToast();

  useEffect(() => {
    // Reset state when a new product is selected (e.g., from related items)
    setActiveImage(product.images[0]);
    setQuantity(1);
  }, [product.id, product.images]);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `ดูสินค้าน่าสนใจ: ${product.name} ที่ตลาดภูมิปัญญา!`,
      url: window.location.href, // This will be the app's URL
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop browsers
        await navigator.clipboard.writeText(shareData.url);
        // FIX: Removed `id` property as it's handled by the context provider.
        addToast({
            type: 'info',
            title: 'คัดลอกลิงก์แล้ว',
            message: 'คุณสามารถวางลิงก์เพื่อแชร์ได้เลย',
        });
      }
    } catch (err) {
      console.error("Error sharing", err);
      // FIX: Removed `id` property as it's handled by the context provider.
      addToast({
        type: 'error',
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถแชร์ได้ในขณะนี้',
      });
    }
  };

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
  
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
            <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            กลับไปหน้าสินค้า
            </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image Gallery */}
          <div>
            <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden group">
                <img 
                    src={activeImage} 
                    alt={product.name} 
                    className="w-full h-full object-center object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white/80 transition opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 lg:opacity-30 lg:hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white/80 transition opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 lg:opacity-30 lg:hover:opacity-100"
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
            </div>
            {/* Thumbnails if more than one image */}
            {product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {product.images.map(img => (
                        <button key={img} onClick={() => setActiveImage(img)} className={`aspect-square w-full bg-gray-100 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 ${activeImage === img ? 'ring-2 ring-offset-2 ring-offset-white ring-red-500' : ''}`}>
                            <img src={img} alt="" className="w-full h-full object-center object-cover" />
                        </button>
                    ))}
                </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:sticky md:top-24 h-fit">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{product.producer}</p>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-1">{product.name}</h1>
              </div>
              <button 
                onClick={handleShare}
                className="ml-4 flex-shrink-0 p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-full transition-colors"
                aria-label="แชร์สินค้า"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <p className="text-3xl text-gray-900 mt-6">{product.price}</p>
            
            <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900">เรื่องราวสินค้า</h3>
                <p className="text-gray-600 mt-2 leading-relaxed text-base">{product.longStory}</p>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md bg-white">
                <button onClick={() => handleQuantityChange(-1)} className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-l-md" aria-label="ลดจำนวน">-</button>
                <span className="px-5 py-2 text-lg font-medium w-16 text-center text-gray-900" aria-live="polite">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-r-md" aria-label="เพิ่มจำนวน">+</button>
              </div>
              <button 
                onClick={handleAddToCartClick}
                className="flex-1 px-8 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/40 text-base flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">สินค้าอื่นที่น่าสนใจ</h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onSelect={onSelectProduct} onQuickView={() => { /* Quick View not available from detail page */ }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
