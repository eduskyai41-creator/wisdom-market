import React from 'react';
import ProductCard from '../components/ProductCard.tsx';
import { Product, Page } from '../types.ts';

interface HomeProps {
    onNavigate: (page: Page) => void;
    onSelectProduct: (product: Product) => void;
    onQuickView: (product: Product) => void;
    allProducts: Product[];
    onCategorySelect: (category: string) => void;
}


const CategoryIcon: React.FC<{ name: string }> = ({ name }) => {
    const icons: { [key: string]: React.ReactElement } = {
        'อาหาร': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.75l-9-5.25L3 15.75m18 0l-9 5.25L3 15.75m18 0V8.25l-9-5.25L3 8.25v7.5M3 15.75l9 5.25l9-5.25" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25" />
            </svg>
        ),
        'เครื่องแต่งกาย': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m15 0h1.5m-1.5-9l-3-3m0 0l-3 3m3-3v12" />
            </svg>
        ),
        'ของใช้': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m0 5.043a15.998 15.998 0 01-3.388-1.62m-1.622 3.385a15.998 15.998 0 01-1.622 3.385m0-5.043a15.998 15.998 0 00-1.622 3.385m7.732-4.22a15.998 15.998 0 00-3.388-1.622m0-5.043a15.998 15.998 0 003.388 1.622m-7.732 4.22a15.998 15.998 0 013.388 1.622m1.622-3.385a15.998 15.998 0 011.622-3.385m-5.043-.025a15.998 15.998 0 00-1.622-3.385" />
            </svg>
        ),
        'ของตกแต่ง': (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
            </svg>
        ),
        'เครื่องประดับ': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 01-4.874-1.954.5.5 0 01.374-.838h17a.5.5 0 01.374.838A9.75 9.75 0 0116.5 18.75z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75L12 3m0 0l-3 3m3-3l3 3" />
            </svg>
        ),
    };
    return icons[name] || <div className="h-10 w-10" />;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onSelectProduct, onQuickView, allProducts, onCategorySelect }) => {

    const categories = [
        { name: 'อาหาร' },
        { name: 'เครื่องแต่งกาย' },
        { name: 'ของใช้' },
        { name: 'ของตกแต่ง' },
        { name: 'เครื่องประดับ' },
    ];

    const featuredProducts: Product[] = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 14);

    const valueProps = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M17 3v4m-2-2h4M5 21v-4m2 2H3m14-4v4m2-2h-4" />
                </svg>
            ),
            title: 'สินค้าแท้จากชุมชน',
            description: 'เรารับประกันสินค้าทุกชิ้นส่งตรงจากผู้ผลิตและวิสาหกิจชุมชนทั่วประเทศ'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: 'สนับสนุนเศรษฐกิจท้องถิ่น',
            description: 'ทุกการสั่งซื้อของคุณช่วยสร้างรายได้ที่ยั่งยืนและส่งเสริมชีวิตที่ดีขึ้นของผู้คนในชุมชน'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: 'เรื่องราวที่คัดสรร',
            description: 'เรานำเสนอเรื่องราวเบื้องหลังผลิตภัณฑ์ เพื่อให้คุณได้สัมผัสถึงคุณค่าและภูมิปัญญาที่แท้จริง'
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                <span className="block">สัมผัสคุณค่าจากมือผู้สร้างสรรค์</span>
                                <span className="block text-red-600 mt-2">ส่งตรงจากชุมชนถึงบ้านคุณ</span>
                            </h1>
                            <p className="mt-6 max-w-lg mx-auto md:mx-0 text-lg text-gray-600">
                                'ตลาดภูมิปัญญา' คือศูนย์รวมสินค้า OTOP และวิสาหกิจชุมชนไทย ที่เราคัดสรรคุณภาพและเรื่องราวมาให้คุณโดยเฉพาะ
                            </p>
                            <div className="mt-8 flex justify-center md:justify-start gap-4">
                                <button onClick={() => onNavigate('all-products')} className="px-8 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/40">
                                    เลือกซื้อสินค้า
                                </button>
                                <button onClick={() => onNavigate('stories')} className="px-8 py-3 bg-white text-gray-800 font-bold rounded-md hover:bg-gray-100 transition-colors duration-300 border border-gray-300">
                                    เรื่องราวของเรา
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <img src="https://www.nairobroo.com/wp-content/uploads/2019/03/13.2B.jpg" alt="ผ้าไหมมัดหมี่ลายจวนตานี" className="rounded-lg shadow-xl" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">เลือกชมตามหมวดหมู่</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                        {categories.map(cat => (
                            <button key={cat.name} onClick={() => onCategorySelect(cat.name)} className={`group flex flex-col items-center justify-center p-6 rounded-lg text-center transition-all duration-300 bg-gray-50 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 border border-gray-200`}>
                                <div className="text-red-500 transition-transform duration-300 group-hover:scale-110">
                                   <CategoryIcon name={cat.name} />
                                </div>
                                <span className="font-semibold text-gray-800 mt-4">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>


            {/* Featured Products Section */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">สินค้าแนะนำจากชุมชน</h2>
                        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">ผลิตภัณฑ์เด่นที่เราคัดสรรมาเพื่อคุณโดยเฉพาะ</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onSelect={onSelectProduct} onQuickView={onQuickView} />
                    ))}
                    </div>
                    <div className="text-center mt-12">
                        <button onClick={() => onNavigate('all-products')} className="px-8 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/40">
                            ดูสินค้าทั้งหมด
                        </button>
                    </div>
                </div>
            </section>
            
            {/* Why Choose Us Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                    <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                       {valueProps.map(prop => (
                           <div key={prop.title} className="flex flex-col items-center">
                               <div className="bg-red-100 p-4 rounded-full">
                                   {prop.icon}
                               </div>
                               <h3 className="text-xl font-bold text-gray-900 mt-4">{prop.title}</h3>
                               <p className="text-gray-600 mt-2">{prop.description}</p>
                           </div>
                       ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;