import React from 'react';
import type { Product } from '../types.ts';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
        {halfStar && (
          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
      </div>
    );
};  

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onQuickView }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-lg hover:shadow-red-500/10 flex flex-col">
      <div className="relative aspect-square">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-2">
            <span className="text-xs font-semibold px-2 py-1 bg-white/80 backdrop-blur-sm text-red-600 rounded-full shadow-sm">{product.province}</span>
            <span className="text-xs font-semibold px-2 py-1 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full shadow-sm">{product.category}</span>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center p-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }} 
            className="text-white text-sm font-bold bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            ดูแบบด่วน
          </button>
        </div>
        <div 
          onClick={() => onSelect(product)} 
          className="absolute inset-0 cursor-pointer" 
          aria-label={`View details for ${product.name}`}
        ></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 flex-grow">
          <button onClick={() => onSelect(product)} className="text-left hover:text-red-600 transition-colors focus:outline-none focus:text-red-600">
            {product.name}
          </button>
        </h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;