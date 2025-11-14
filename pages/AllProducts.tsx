import React, { useState } from 'react';
import { Product, SortOption } from '../types.ts';
import ProductCard from '../components/ProductCard.tsx';

interface AllProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  searchQuery: string;
  onClearSearch: () => void;
  allCategories: string[];
  allProvinces: string[];
  selectedCategories: string[];
  selectedProvinces: string[];
  sortOption: SortOption;
  onCategoryChange: (categories: string[]) => void;
  onProvinceChange: (provinces: string[]) => void;
  onSortChange: (sort: SortOption) => void;
}

export const AllProducts: React.FC<AllProductsProps> = ({ 
  products, 
  onSelectProduct,
  onQuickView,
  searchQuery, 
  onClearSearch,
  allCategories,
  allProvinces,
  selectedCategories,
  selectedProvinces,
  sortOption,
  onCategoryChange,
  onProvinceChange,
  onSortChange
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newSelection);
  };

  const handleProvinceChange = (province: string) => {
    const newSelection = selectedProvinces.includes(province)
      ? selectedProvinces.filter(p => p !== province)
      : [...selectedProvinces, province];
    onProvinceChange(newSelection);
  };

  const FilterSidebar: React.FC = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">หมวดหมู่สินค้า</h3>
        <div className="space-y-2">
          {allCategories.map(category => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 bg-white text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">จังหวัด</h3>
        <div className="space-y-2">
          {allProvinces.map(province => (
            <label key={province} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedProvinces.includes(province)}
                onChange={() => handleProvinceChange(province)}
                className="h-4 w-4 rounded border-gray-300 bg-white text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">{province}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">เรียงตาม</h3>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full rounded-md border-gray-300 bg-white text-gray-700 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="default">ค่าเริ่มต้น</option>
          <option value="price-asc">ราคา: น้อยไปมาก</option>
          <option value="price-desc">ราคา: มากไปน้อย</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">สินค้าทั้งหมด</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">เลือกซื้อผลิตภัณฑ์จากภูมิปัญญาไทยที่คัดสรรมาอย่างดีจากทั่วประเทศ</p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <aside className="hidden lg:block bg-gray-50 p-6 rounded-lg border border-gray-200">
              <FilterSidebar />
            </aside>

            <main className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                  <h2 className="text-lg font-medium text-gray-900">ตัวกรอง</h2>
                  <button onClick={() => setIsFiltersOpen(!isFiltersOpen)} className="p-2 text-gray-500 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                  </button>
              </div>

              {isFiltersOpen && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 lg:hidden border border-gray-200">
                    <FilterSidebar />
                </div>
              )}

              {searchQuery && (
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                    <div>
                        <span className="text-gray-600">ผลการค้นหาสำหรับ:</span>
                        <strong className="text-red-600 font-semibold ml-2">"{searchQuery}"</strong>
                    </div>
                    <button onClick={onClearSearch} className="text-sm font-medium text-red-500 hover:text-red-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        ล้างการค้นหา
                    </button>
                </div>
              )}

              {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {products.map(product => (
                    <ProductCard key={product.id} product={product} onSelect={onSelectProduct} onQuickView={onQuickView} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">ไม่พบสินค้าที่ตรงกัน</h3>
                    <p className="text-gray-600 mt-2">{searchQuery ? 'ลองใช้คำค้นหาอื่น' : 'ลองปรับเปลี่ยนตัวกรองของคุณ'}</p>
                </div>
              )}
            </main>
        </div>
    </div>
    </div>
  );
};