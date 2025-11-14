import React, { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    cartItemCount: number;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<{ onSearch: (query: string) => void, onFocus?: () => void }> = ({ onSearch, onFocus }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={onFocus}
                placeholder="ค้นหาสินค้า..."
                className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-shadow"
            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label="ค้นหา">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </button>
        </form>
    );
};

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { page: 'all-products' as Page, label: 'สินค้าทั้งหมด' },
    { page: 'stories' as Page, label: 'เรื่องราวจากชุมชน' },
    { page: 'about' as Page, label: 'เกี่ยวกับเรา' },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  }
  
  const handleSearch = (query: string) => {
    onSearch(query);
    setIsMenuOpen(false);
  }

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex-shrink-0">
            <button onClick={() => handleNavigate('home')} className="text-2xl font-bold text-gray-900 tracking-tight">
              ตลาดภูมิปัญญา
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
            <nav className="flex items-center space-x-8">
              {navLinks.map(link => (
                <button key={link.label} onClick={() => handleNavigate(link.page)} className="text-gray-600 hover:text-red-600 font-medium transition-colors whitespace-nowrap">
                    {link.label}
                </button>
              ))}
            </nav>
            <div className="w-full max-w-xs">
                <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => handleNavigate('cart')} className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                <span className="sr-only">ตะกร้าสินค้า</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center ring-2 ring-white">
                    {cartItemCount}
                  </span>
                )}
            </button>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">เปิดเมนู</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen border-t border-gray-200' : 'max-h-0'}`}
      >
        <div className="px-2 pt-4 pb-3 sm:px-3">
          <SearchBar onSearch={handleSearch} onFocus={() => window.scrollTo(0,0)} />
        </div>
        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map(link => (
              <button key={link.label} onClick={() => handleNavigate(link.page)} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-gray-100">
                  {link.label}
              </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;