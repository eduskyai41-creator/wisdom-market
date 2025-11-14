import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { AllProducts } from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import About from './pages/About';
import Stories from './pages/Stories';
import Confirmation from './pages/Confirmation';
import QuickViewModal from './components/QuickViewModal';
import ToastContainer from './components/ToastContainer';
import { Product, Page, CartItem, SortOption } from './types';
import { useToast } from './hooks/useToast';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const addToast = useToast();

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page !== 'product-detail') {
      setSelectedProduct(null);
    }
    if (page !== 'all-products') {
      setSearchQuery('');
      setSelectedCategories([]);
      setSelectedProvinces([]);
      setSortOption('default');
    }
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo(0, 0);
  };
  
  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('all-products');
    window.scrollTo(0, 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategorySelect = (category: string) => {
    setSearchQuery('');
    setSelectedCategories([category]);
    setSelectedProvinces([]);
    setCurrentPage('all-products');
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setCurrentPage('all-products');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    addToast({
        id: Date.now(),
        type: 'success',
        title: 'เพิ่มสินค้าสำเร็จ!',
        message: `'${product.name}' ถูกเพิ่มลงในตะกร้าแล้ว`,
    });
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity < 1) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    setCartItems([]);
    handleNavigate('confirmation');
  };

  const allProducts: Product[] = [
    // Pattani - Crafts
    {
      id: 1,
      name: 'ผ้าไหมมัดหมี่ลายจวนตานี',
      producer: 'กลุ่มทอผ้าจวนตานี',
      category: 'เครื่องแต่งกาย',
      province: 'ปัตตานี',
      story: 'มรดกแห่งลวดลายอันเป็นเอกลักษณ์ สะท้อนวัฒนธรรมปาตานี',
      longStory: 'ผ้าไหมมัดหมี่ลายจวนตานีเป็นศิลปะการทอผ้าชั้นสูงที่สืบทอดกันมาจากบรรพบุรุษ ลวดลาย \'จวนตานี\' อันซับซ้อนและงดงามเกิดจากความมานะอุตสาหะของช่างทอที่ต้องใช้ความชำนาญในการมัดย้อมและทออย่างประณีต แต่ละผืนจึงเปรียบเสมือนงานศิลปะที่มีคุณค่าและมีเพียงชิ้นเดียวในโลก',
      price: '3,800 ฿',
      images: ['https://www.nairobroo.com/wp-content/uploads/2019/03/13.2B.jpg'],
      rating: 4.9,
      reviewCount: 32,
    },
    {
      id: 2,
      name: 'กระเฌอชุด',
      producer: 'กลุ่มจักสานบ้านเรา',
      category: 'ของใช้',
      province: 'ปัตตานี',
      story: 'งานจักสานจากวัสดุธรรมชาติ ดีไซน์สวยงาม แข็งแรงทนทาน',
      longStory: 'กระเฌอชุดผลิตจากวัสดุธรรมชาติในท้องถิ่น ผ่านกระบวนการจักสานด้วยมืออย่างพิถีพิถันจากกลุ่มแม่บ้านผู้ชำนาญ ด้วยดีไซน์ที่เป็นเอกลักษณ์และประโยชน์ใช้สอยที่หลากหลาย ทำให้กระเฌอชุดไม่ได้เป็นเพียงภาชนะใส่ของ แต่ยังเป็นของตกแต่งบ้านที่สวยงามและสะท้อนวิถีชีวิตที่เรียบง่าย',
      price: '550 ฿',
      images: ['https://scontent.fhdy2-1.fna.fbcdn.net/v/t39.30808-6/480162188_2097445044036112_662647540854953494_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ka6cp7lU2rcQ7kNvwGnuTeT&_nc_oc=AdlgsFPWdWHbLh8u0e1AesINRkz01Wui51Obn0YayXmAENBrTm1pf-MCiik1GuRZi-E&_nc_zt=23&_nc_ht=scontent.fhdy2-1.fna&_nc_gid=pi2tmdU6DURhha5xjTl1lw&oh=00_AfjqHZT46tv1nRpREteDcyzlcVREspHRgxvTKpr4nZSJ2A&oe=691C638D'],
      rating: 4.7,
      reviewCount: 45,
    },
    {
      id: 3,
      name: 'ผ้าคลุมผมสตรี (ปัก)',
      producer: 'กลุ่มสตรีตัดเย็บปัตตานี',
      category: 'เครื่องแต่งกาย',
      province: 'ปัตตานี',
      story: 'ฮิญาบปักลายด้วยมืออย่างประณีต เนื้อผ้าสวมใส่สบาย',
      longStory: 'เพิ่มความพิเศษให้กับผ้าคลุมผม (ฮิญาบ) ด้วยงานปักมืออันละเอียดอ่อนจากช่างฝีมือในชุมชน ลวดลายที่ได้แรงบันดาลใจจากดอกไม้และธรรมชาติในท้องถิ่น ทำให้ผ้าคลุมผมแต่ละผืนมีความโดดเด่นไม่เหมือนใคร ตัดเย็บจากผ้าเนื้อดีที่ให้ความรู้สึกนุ่มสบายและระบายอากาศได้ดี',
      price: '450 ฿',
      images: ['https://www.xn--12ca9cdcza1fboh6b4ca0evmxcuh.com/uploads/products/215.jpg'],
      rating: 4.8,
      reviewCount: 95,
    },
    {
      id: 4,
      name: 'กรงนกเขาปัตตานี',
      producer: 'ชมรมช่างทำกรงนกเขา',
      category: 'ของตกแต่ง',
      province: 'ปัตตานี',
      story: 'ศิลปะบนกรงนกเขา งานไม้แกะสลักที่สะท้อนความผูกพันกับธรรมชาติ',
      longStory: 'กรงนกเขาปัตตานีไม่ได้เป็นเพียงที่อยู่อาศัยของนก แต่คือผลงานศิลปะที่ต้องใช้ทักษะช่างไม้ชั้นสูงในการสร้างสรรค์ แต่ละส่วนของกรงถูกแกะสลักอย่างวิจิตรบรรจง สะท้อนถึงความรักและความผูกพันระหว่างคนกับสัตว์เลี้ยง และเป็นของตกแต่งบ้านที่แสดงถึงรสนิยมอันเป็นเอกลักษณ์',
      price: '2,500 ฿',
      images: ['https://nokngamphol.wordpress.com/wp-content/uploads/2015/01/001.jpg'],
      rating: 4.9,
      reviewCount: 15,
    },
    {
      id: 5,
      name: 'ผ้าปาเต๊ะ',
      producer: 'กลุ่มทำผ้าปาเต๊ะชายแดนใต้',
      category: 'เครื่องแต่งกาย',
      province: 'ปัตตานี',
      story: 'สีสันและลวดลายแห่งวัฒนธรรมมลายูบนผืนผ้า',
      longStory: 'ผ้าปาเต๊ะ หรือ ผ้าบาติก คือส่วนหนึ่งของวิถีชีวิตและเครื่องแต่งกายของผู้คนในแถบมลายู ลวดลายที่พิมพ์ด้วยมือ (เทียน) และสีสันที่สดใส ทำให้ผ้าปาเต๊ะมีความโดดเด่น เหมาะสำหรับนำไปตัดเย็บเป็นเสื้อผ้า, ผ้าถุง หรือใช้เป็นผ้าอเนกประสงค์',
      price: '600 ฿',
      images: ['https://nokngamphol.wordpress.com/wp-content/uploads/2015/01/batik_malay_2.jpg'],
      rating: 4.7,
      reviewCount: 88,
    },
    {
      id: 6,
      name: 'เครื่องทองเหลือง',
      producer: 'ชุมชนช่างหล่อทองเหลือง',
      category: 'ของตกแต่ง',
      province: 'ปัตตานี',
      story: 'หัตถศิลป์ทองเหลืองหล่อโบราณ ทรงคุณค่าและสง่างาม',
      longStory: 'เครื่องทองเหลืองจากปัตตานีเป็นที่รู้จักในด้านคุณภาพและความงามของการหล่อแบบโบราณ ไม่ว่าจะเป็นพาน, ขัน หรือของตกแต่งต่างๆ ล้วนสร้างสรรค์ขึ้นด้วยความประณีต สะท้อนถึงความรุ่งเรืองของศิลปะในอดีตและเป็นของสะสมที่ทรงคุณค่า',
      price: '1,800 ฿',
      images: ['https://nokngamphol.wordpress.com/wp-content/uploads/2015/01/pic-1260364623.jpg'],
      rating: 4.8,
      reviewCount: 22,
    },
    // Yala - Crafts
    {
      id: 7,
      name: 'ประติมากรรมจากรากไม้ไผ่',
      producer: 'กลุ่มศิลปินรากไม้ไผ่ยะลา',
      category: 'ของตกแต่ง',
      province: 'ยะลา',
      story: 'เปลี่ยนรากไม้ไผ่ไร้ค่าให้เป็นงานศิลปะสุดสร้างสรรค์',
      longStory: 'จากรากไม้ไผ่ที่คนส่วนใหญ่มองข้าม ศิลปินในชุมชนได้ใช้จินตนาการและความสามารถทางศิลปะเปลี่ยนให้กลายเป็นประติมากรรมที่มีชีวิตชีวา ไม่ว่าจะเป็นรูปสัตว์, ตัวละคร หรือรูปทรงอิสระ แต่ละชิ้นงานมีเพียงหนึ่งเดียวและสะท้อนถึงการเห็นคุณค่าในธรรมชาติ',
      price: '950 ฿',
      images: ['https://yalapao.go.th/th/wp-content/uploads/00.jpg'],
      rating: 4.9,
      reviewCount: 38,
    },
    {
      id: 8,
      name: 'กริช',
      producer: 'ช่างทำกริชโบราณ',
      category: 'ของตกแต่ง',
      province: 'ยะลา',
      story: 'ศาสตราวุธคู่กายและสัญลักษณ์แห่งศักดิ์ศรีของลูกผู้ชาย',
      longStory: 'กริชไม่ใช่เป็นเพียงอาวุธ แต่เป็นเครื่องประดับที่บ่งบอกถึงสถานะและเกียรติยศของผู้เป็นเจ้าของ ช่างฝีมือยะลาได้สืบทอดศาสตร์การทำกริชมาอย่างยาวนาน ตั้งแต่การตีใบมีดจนถึงการแกะสลักด้ามและฝักอย่างงดงาม เหมาะสำหรับเป็นของสะสมหรือของตกแต่งที่ทรงพลัง',
      price: '4,500 ฿',
      images: ['https://pheeraya.wordpress.com/wp-content/uploads/2014/12/otop1.jpg'],
      rating: 5.0,
      reviewCount: 19,
    },
    {
      id: 9,
      name: 'แหวนประดับอัญมณี',
      producer: 'กลุ่มเจียระไนอัญมณียะลา',
      category: 'เครื่องประดับ',
      province: 'ยะลา',
      story: 'อัญมณีจากแหล่งใต้เจียระไนอย่างงดงามบนตัวเรือนคุณภาพ',
      longStory: 'ยะลาเป็นแหล่งของอัญมณีหลากหลายชนิด ช่างฝีมือท้องถิ่นได้นำพลอยและหินสีต่างๆ มาเจียระไนด้วยความชำนาญและนำมาขึ้นตัวเรือนเป็นแหวนดีไซน์ต่างๆ ที่สวยงามและทรงคุณค่า เป็นเครื่องประดับที่สะท้อนความงามจากธรรมชาติ',
      price: '3,200 ฿',
      images: ['https://pheeraya.wordpress.com/wp-content/uploads/2014/12/otop9.jpg'],
      rating: 4.8,
      reviewCount: 41,
    },
    // Narathiwat - Crafts
    {
      id: 10,
      name: 'ผลิตภัณฑ์ใบไม้สีทอง',
      producer: 'วิสาหกิจชุมชนใบไม้สีทอง',
      category: 'ของตกแต่ง',
      province: 'นราธิวาส',
      story: 'ความงามอันน่าอัศจรรย์ของใบไม้ที่กลายเป็นสีทองตามธรรมชาติ',
      longStory: 'ใบไม้สีทอง หรือ ใบย่านดาโอ๊ะ เป็นพันธุ์ไม้เลื้อยที่พบในป่าของนราธิวาส เมื่อใบแก่จัดจะเปลี่ยนเป็นสีทองแดงเหลืออร่ามตามธรรมชาติ ชาวบ้านได้นำมาสร้างสรรค์เป็นผลิตภัณฑ์ต่างๆ เช่น ของที่ระลึก, การ์ด หรือภาพประดับผนัง ซึ่งเป็นของขวัญจากธรรมชาติที่มีเอกลักษณ์ไม่เหมือนใคร',
      price: '350 ฿',
      images: ['https://www2.narathiwat.go.th/nara2016/tmp/b4d8abd7095bf1d7c20c8c32f7e33213.jpg'],
      rating: 4.9,
      reviewCount: 105,
    },
    {
      id: 11,
      name: 'ผลิตภัณฑ์กระจูด',
      producer: 'กลุ่มแม่บ้านจักสานกระจูด',
      category: 'ของใช้',
      province: 'นราธิวาส',
      story: 'งานสานจากกระจูด พืชท้องถิ่นที่แปรเปลี่ยนเป็นของใช้ดีไซน์เก๋',
      longStory: 'กระจูด พืชที่ขึ้นอยู่ตามที่ลุ่มในนราธิวาส ถูกนำมาตากแห้งและสานขึ้นรูปเป็นผลิตภัณฑ์ต่างๆ ไม่ว่าจะเป็นกระเป๋า, เสื่อ, หรือของใช้ในบ้าน ด้วยความทนทานและดีไซน์ที่ร่วมสมัย ทำให้ผลิตภัณฑ์กระจูดเป็นที่นิยมและสร้างรายได้ที่ยั่งยืนให้กับชุมชน',
      price: '680 ฿',
      images: ['https://www2.narathiwat.go.th/nara2016/tmp/854401729a5731c7a2136a003e28f848.jpg'],
      rating: 4.7,
      reviewCount: 76,
    },
    {
      id: 12,
      name: 'เรือกอและจำลอง',
      producer: 'กลุ่มช่างจำลองเรือกอและ',
      category: 'ของตกแต่ง',
      province: 'นราธิวาส',
      story: 'ย่อส่วนความงดงามของเรือประมงพื้นบ้าน สู่ของที่ระลึกอันทรงคุณค่า',
      longStory: 'เรือกอและคือสัญลักษณ์ของชาวประมงในภาคใต้ตอนล่าง ด้วยรูปทรงที่เป็นเอกลักษณ์และลวดลายสีสันที่สดใส ช่างฝีมือได้จำลองเรือกอและลงมาเป็นของที่ระลึกขนาดต่างๆ โดยยังคงรักษารายละเอียดและความงดงามของเรือจริงไว้ทุกประการ เหมาะสำหรับเป็นของฝากหรือของตกแต่งบ้าน',
      price: '1,500 ฿',
      images: ['https://www2.narathiwat.go.th/nara2016/tmp/c330fc42b530ba9316b18589cb1b478e.jpg'],
      rating: 4.9,
      reviewCount: 55,
    },
    {
      id: 13,
      name: 'กระเป๋าย่านลิเภา',
      producer: 'กลุ่มจักสานย่านลิเภา',
      category: 'เครื่องแต่งกาย',
      province: 'นราธิวาส',
      story: 'ที่สุดแห่งงานจักสานชั้นสูง สู่กระเป๋าถือที่งดงามและทรงคุณค่า',
      longStory: 'ย่านลิเภาเป็นพืชเถาวัลย์ชนิดหนึ่งที่มีความเหนียวและทนทาน ถูกนำมาสร้างสรรค์เป็นงานจักสานชั้นสูง โดยเฉพาะกระเป๋าถือสำหรับสตรี ซึ่งต้องใช้ความละเอียดและความชำนาญอย่างมากในการสานขึ้นรูปและตกแต่งด้วยโลหะเงินหรือทอง จนกลายเป็นสินค้าหัตถกรรมระดับราชสำนัก',
      price: '5,500 ฿',
      images: ['https://narathiwat.m-culture.go.th/web-upload/1070x682eff4942db5e7ae6989dbcbf1ba368/202303/m_news/5162/170330/file_photo/2aff689479a4942e08bea218b1c22395.jpg'],
      rating: 5.0,
      reviewCount: 28,
    },
    // Pattani - Food
    {
      id: 14,
      name: 'ข้าวเกรียบปลา',
      producer: 'วิสาหกิจชุมชนประมงพื้นบ้าน',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ทำจากเนื้อปลาทะเลสดใหม่ กรอบ อร่อย ไม่ใส่สารกันบูด',
      longStory: 'ข้าวเกรียบปลาแท้จากปัตตานี ผลิตจากเนื้อปลาทะเลสดๆ ที่ชาวประมงพื้นบ้านออกเรือหามาในแต่ละวัน นำมาคลุกเคล้ากับแป้งและเครื่องปรุงรสสูตรเฉพาะของชุมชน ตากแดดจนแห้งสนิท เมื่อนำไปทอดจะพองฟู กรอบ อร่อย และได้รสชาติของเนื้อปลาเต็มๆ คำ',
      price: '80 ฿',
      images: ['https://www.pattanicity.go.th/tmp/3424fd943452912b493e06f297f79bfb.jpg'],
      rating: 4.9,
      reviewCount: 250,
    },
    {
      id: 15,
      name: 'น้ำบูดูสายบุรี',
      producer: 'กลุ่มแม่บ้านเกษตรกรสายบุรี',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'น้ำบูดูสูตรดั้งเดิม หมักด้วยวิธีธรรมชาติ หอม อร่อยกลมกล่อม',
      longStory: 'น้ำบูดูข้าวยำสายบุรี คือหัวใจของอาหารปักษ์ใต้ ผลิตจากปลาไส้ตันที่หมักด้วยกรรมวิธีทางธรรมชาติเป็นเวลานาน ก่อนจะนำมาเคี่ยวกับสมุนไพรและเครื่องปรุงต่างๆ จนได้น้ำบูดูที่มีรสชาติเข้มข้น กลมกล่อม และมีกลิ่นหอมเป็นเอกลักษณ์',
      price: '50 ฿',
      images: ['https://www.pattanicity.go.th/tmp/f456512bc5c571a451f84ded4fc78a81.jpg'],
      rating: 5.0,
      reviewCount: 310,
    },
    {
      id: 16,
      name: 'ลูกหยีกวนสามรส',
      producer: 'กลุ่มแปรรูปลูกหยีปัตตานี',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ลูกหยีสดจากต้น ปรุงรสเปรี้ยว หวาน เค็ม อร่อยลงตัว',
      longStory: 'ลูกหยี ผลไม้ป่าหายากของภาคใต้ ถูกนำมาแปรรูปเป็นลูกหยีกวนสามรส ด้วยสูตรลับที่สืบทอดกันมาในชุมชน คัดสรรเฉพาะลูกหยีคุณภาพดี นำมากวนกับน้ำตาลและพริกเกลือจนได้ที่ ทำให้ได้รสชาติที่จัดจ้าน เปรี้ยวอมหวาน เค็มนิดๆ อร่อยเพลินจนหยุดไม่ได้',
      price: '120 ฿',
      images: ['https://www.pattanicity.go.th/tmp/2a4804e9c8e6a9f930833e6fb3cf8a74.jpg'],
      rating: 4.8,
      reviewCount: 180,
    },
    {
      id: 17,
      name: 'เกลือหวานปัตตานี',
      producer: 'กลุ่มนาเกลือบ้านบางปู',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'เกลือทะเลภูมิปัญญาโบราณ มีรสหวานปนเค็มเป็นเอกลักษณ์',
      longStory: 'เกลือหวานปัตตานีเป็นผลิตภัณฑ์ GI ที่เกิดจากภูมิปัญญาการทำนาเกลือแบบดั้งเดิมในพื้นที่น้ำกร่อย ทำให้เกลือที่ได้มีแร่ธาตุที่เป็นเอกลักษณ์และมีรสชาติหวานเล็กน้อย ไม่เค็มจัดเหมือนเกลือทะเลทั่วไป เหมาะสำหรับใช้ปรุงอาหารที่ต้องการรสชาติกลมกล่อม',
      price: '65 ฿',
      images: ['https://www.pattanicity.go.th/tmp/c4c1e10fcd83e99d2c77b3fb4afc1689.jpg'],
      rating: 4.9,
      reviewCount: 95,
    },
    {
      id: 18,
      name: 'ข้าวยำพร้อมปรุงมะพร้าวคั่ว',
      producer: 'วิสาหกิจชุมชนแม่บ้านตานี',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ชุดข้าวยำสำเร็จรูป พร้อมน้ำบูดูและมะพร้าวคั่วหอมๆ',
      longStory: 'สัมผัสรสชาติอาหารปักษ์ใต้แท้ๆ ได้ง่ายๆ ที่บ้าน ด้วยชุดข้าวยำพร้อมปรุงที่มาครบทั้งน้ำบูดูสูตรเด็ดและมะพร้าวคั่วหอมกรุ่น เพียงแค่หุงข้าวสวยร้อนๆ และเตรียมผักสดตามชอบ ก็สามารถรังสรรค์เมนูข้าวยำที่อร่อยและมีคุณค่าทางโภชนาการได้อย่างง่ายดาย',
      price: '150 ฿',
      images: ['https://scontent.fhdy2-1.fna.fbcdn.net/v/t1.6435-9/78361664_433069904039790_5466280902835306496_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=kVh8CkyzA48Q7kNvwFJUVvK&_nc_oc=AdlXXisRe9padUfelbF2YCsWzdyDBO8pq2CQXeCi7lTwuG7FkJgU4Y2BM5_WWZ3vJRo&_nc_zt=23&_nc_ht=scontent.fhdy2-1.fna&_nc_gid=jy9gcZqYr_ixNcil3Ycu-A&oh=00_AfjU9kYYKt4aI2eYfd5Hym23nNiBj8tx3AUb3BEUz3xw9g&oe=693E0829'],
      rating: 4.7,
      reviewCount: 150,
    },
    {
      id: 19,
      name: 'ถั่วคั่วทราย',
      producer: 'กลุ่มแม่บ้านเกษตรกรยะหริ่ง',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ถั่วลิสงคั่วด้วยทรายร้อนๆ ตามวิธีโบราณ หอม กรอบ มัน',
      longStory: 'ภูมิปัญญาการคั่วถั่วด้วยทรายร้อนระอุ ทำให้ได้ถั่วที่สุกทั่วถึง กรอบนาน และมีกลิ่นหอมเป็นเอกลักษณ์ เป็นของว่างเคี้ยวเพลินที่ทำจากวัตถุดิบเรียบง่าย แต่ผ่านกรรมวิธีที่น่าทึ่งและสืบทอดกันมาอย่างยาวนาน',
      price: '70 ฿',
      images: ['https://www.khaosod.co.th/wpapp/uploads/2021/08/image1-268.jpg'],
      rating: 4.8,
      reviewCount: 135,
    },
    {
      id: 20,
      name: 'ขนมโบว์อิสตานา',
      producer: 'กลุ่มขนมพื้นเมืองปัตตานี',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ขนมโบราณรูปโบว์ กรอบนอกนุ่มใน หอมหวานกลมกล่อม',
      longStory: 'ขนมโบว์ หรือ ขนมเจาะหู เป็นขนมพื้นเมืองที่นิยมทำกันในงานเทศกาลสำคัญ มีลักษณะคล้ายโดนัทจิ๋ว ทำจากแป้งข้าวเจ้าและน้ำตาลโตนด ทอดจนเหลืองกรอบ ให้รสสัมผัสที่กรอบนอกนุ่มในและมีรสหวานหอมเป็นเอกลักษณ์',
      price: '90 ฿',
      images: ['https://thaidet.pttor.com/public/uploads/ResponsiveFilemanager/source/Food%202/10650014-2.jpg'],
      rating: 4.9,
      reviewCount: 210,
    },
    // Yala - Food
    {
      id: 21,
      name: 'กาแฟทุเรียน รอยัล คอฟฟี่',
      producer: 'วิสาหกิจชุมชนกาแฟยะลา',
      category: 'อาหาร',
      province: 'ยะลา',
      story: 'การผสมผสานที่ลงตัวของกาแฟและทุเรียน ราชาแห่งผลไม้',
      longStory: 'สัมผัสประสบการณ์ใหม่ของการดื่มกาแฟ ด้วยการผสมผสานเมล็ดกาแฟคุณภาพกับเนื้อทุเรียนหมอนทองแท้ๆ จนได้กาแฟที่มีกลิ่นหอมละมุนของทุเรียนและรสชาติกาแฟที่เข้มข้น เป็นผลิตภัณฑ์ 4 in 1 ที่ชงดื่มง่าย ได้รสชาติที่เป็นเอกลักษณ์ไม่เหมือนใคร',
      price: '250 ฿',
      images: ['https://yalapao.go.th/th/wp-content/uploads/S__46784516-768x1024.jpg'],
      rating: 4.6,
      reviewCount: 99,
    },
    {
      id: 22,
      name: 'เส้นหมี่เบตง',
      producer: 'โรงงานเส้นหมี่เบตง',
      category: 'อาหาร',
      province: 'ยะลา',
      story: 'เส้นหมี่ไข่ในตำนาน เหนียวนุ่ม สีเหลืองนวลจากธรรมชาติ',
      longStory: 'เส้นหมี่เบตงเป็นของดีขึ้นชื่อของอำเภอเบตง ทำจากแป้งสาลีและไข่ไก่ ไม่ใส่สีและวัตถุกันเสีย ทำให้เส้นมีสีเหลืองนวลตามธรรมชาติและมีความเหนียวนุ่มเป็นพิเศษ เหมาะสำหรับนำไปประกอบอาหารได้หลากหลายเมนู ทั้งผัดและต้ม',
      price: '100 ฿',
      images: ['https://yalapao.go.th/th/wp-content/uploads/S__46768135-844x1024.jpg'],
      rating: 4.9,
      reviewCount: 350,
    },
    {
      id: 23,
      name: 'กาแฟโบราณ',
      producer: 'กลุ่มคั่วกาแฟบ้านๆ',
      category: 'อาหาร',
      province: 'ยะลา',
      story: 'กาแฟคั่วบดสูตรโบราณ หอม เข้มข้น ถึงรสกาแฟแท้',
      longStory: 'เมล็ดกาแฟที่ปลูกในพื้นที่จังหวัดยะลา นำมาคั่วด้วยกรรมวิธีแบบดั้งเดิมที่สืบทอดกันมา ทำให้ได้กาแฟที่มีกลิ่นหอมเฉพาะตัวและมีรสชาติที่เข้มข้น เหมาะสำหรับชงดื่มแบบโบราณ หรือนำไปสร้างสรรค์เมนูกาแฟต่างๆ',
      price: '180 ฿',
      images: ['https://pheeraya.wordpress.com/wp-content/uploads/2014/12/otop2.jpg'],
      rating: 4.8,
      reviewCount: 175,
    },
    {
      id: 24,
      name: 'ทุเรียนกวน',
      producer: 'สวนทุเรียนยะลา',
      category: 'อาหาร',
      province: 'ยะลา',
      story: 'ทุเรียนหมอนทองแท้ 100% กวนจนเหนียวหนึบ หอมหวานมัน',
      longStory: 'คัดสรรทุเรียนหมอนทองคุณภาพดีจากสวนในยะลา นำมากวนด้วยไฟอ่อนๆ อย่างพิถีพิถัน ไม่ผสมแป้งหรือน้ำตาลมากเกินไป เพื่อให้ได้ทุเรียนกวนที่มีรสชาติและกลิ่นหอมของทุเรียนแท้ๆ เนื้อสัมผัสเหนียวหนึบ หวานมันอร่อย',
      price: '350 ฿',
      images: ['https://pheeraya.wordpress.com/wp-content/uploads/2014/12/otop4.jpg'],
      rating: 4.9,
      reviewCount: 280,
    },
    {
      id: 25,
      name: 'ผลิตภัณฑ์แปรรูปกล้วยหิน',
      producer: 'กลุ่มแม่บ้านเกษตรกรแปรรูปกล้วยหิน',
      category: 'อาหาร',
      province: 'ยะลา',
      story: 'กล้วยหินพันธุ์พื้นเมือง สู่ผลิตภัณฑ์แปรรูปหลากหลาย',
      longStory: 'กล้วยหินเป็นกล้วยพันธุ์พื้นเมืองของภาคใต้ มีลักษณะพิเศษคือเนื้อแน่นและไม่มีเมล็ด กลุ่มแม่บ้านเกษตรกรได้นำมาแปรรูปเป็นผลิตภัณฑ์ต่างๆ เช่น กล้วยฉาบ, กล้วยตาก, และกล้วยกรอบแก้ว ซึ่งยังคงรสชาติที่เป็นเอกลักษณ์ของกล้วยหินไว้ได้เป็นอย่างดี',
      price: '85 ฿',
      images: ['https://pheeraya.wordpress.com/wp-content/uploads/2014/12/otop5.jpg'],
      rating: 4.7,
      reviewCount: 190,
    },
    // Narathiwat - Food
    {
      id: 26,
      name: 'ลองกอง ตันหยงมัส',
      producer: 'กลุ่มเกษตรกรสวนลองกอง',
      category: 'อาหาร',
      province: 'นราธิวาส',
      story: 'ราชินีแห่งผลไม้แดนใต้ รสหวานอมเปรี้ยว ชื่นใจ',
      longStory: 'ลองกองตันหยงมัสเป็นที่รู้จักกันดีในเรื่องของคุณภาพและรสชาติที่หวาน หอม อร่อย เนื้อผลแห้ง ไม่แฉะ และมีเปลือกบาง ทำให้เป็นที่ต้องการของตลาด ด้วยสภาพภูมิอากาศที่เหมาะสมของนราธิวาส ทำให้ได้ผลผลิตลองกองที่ดีที่สุดแห่งหนึ่งของประเทศ',
      price: '120 ฿ / กก.',
      images: ['https://narathiwat.prd.go.th/th/file/get/type/thumbnail/file/2024101170862875df0ed90356396320e2ea1cd3115049.jpg'],
      rating: 5.0,
      reviewCount: 450,
    },
    {
      id: 27,
      name: 'น้ำมันมะพร้าวสกัดเย็น',
      producer: 'วิสาหกิจชุมชนน้ำมันมะพร้าวบริสุทธิ์',
      category: 'อาหาร',
      province: 'นราธิวาส',
      story: 'น้ำมันมะพร้าวออร์แกนิก 100% เพื่อสุขภาพและความงาม',
      longStory: 'ผลิตจากมะพร้าวคุณภาพดีในพื้นที่นราธิวาส ผ่านกระบวนการสกัดเย็นที่ทันสมัยและถูกสุขอนามัย ทำให้ได้น้ำมันมะพร้าวบริสุทธิ์ที่คงคุณค่าสารอาหารไว้ครบถ้วน สามารถใช้รับประทานเพื่อบำรุงสุขภาพ หรือใช้บำรุงผิวพรรณและเส้นผม',
      price: '280 ฿',
      images: ['https://narathiwat.m-culture.go.th/web-upload/1070x682eff4942db5e7ae6989dbcbf1ba368/202302/m_news/5162/166692/file_photo/0465b26a1cf43b57c3488d99d333f038.jpg'],
      rating: 4.9,
      reviewCount: 160,
    },
    {
      id: 28,
      name: 'ทุเรียนกวน (นราธิวาส)',
      producer: 'กลุ่มแม่บ้านแปรรูปผลไม้',
      category: 'อาหาร',
      province: 'นราธิวาส',
      story: 'ทุเรียนบ้านรสเลิศ กวนด้วยสูตรดั้งเดิม หอมหวานเป็นเอกลักษณ์',
      longStory: 'ความพิเศษของทุเรียนกวนนราธิวาสคือการใช้ทุเรียนพันธุ์พื้นเมือง (ทุเรียนบ้าน) ซึ่งมีรสชาติและกลิ่นที่เป็นเอกลักษณ์เฉพาะตัว นำมากวนกับน้ำตาลโตนดด้วยวิธีดั้งเดิม ทำให้ได้ทุเรียนกวนที่มีรสชาติหวานหอม เข้มข้น และแตกต่างจากที่อื่น',
      price: '300 ฿',
      images: ['https://narathiwat.m-culture.go.th/web-upload/1070x682eff4942db5e7ae6989dbcbf1ba368/202303/m_news/5162/183682/file_photo/86e6957aa0460d7868801615587c60a9.jpg'],
      rating: 4.8,
      reviewCount: 220,
    },
    // Adding more products to have a good variety
    {
      id: 29,
      name: 'เสื้อยืดลายปัตตานี',
      producer: 'กลุ่มออกแบบลายเสื้อตานี',
      category: 'เครื่องแต่งกาย',
      province: 'ปัตตานี',
      story: 'สวมใส่ความเป็นปัตตานี ด้วยเสื้อยืดดีไซน์เก๋',
      longStory: 'เสื้อยืดที่ออกแบบลวดลายโดยศิลปินท้องถิ่น โดยได้แรงบันดาลใจจากสัญลักษณ์และสถานที่สำคัญของจังหวัดปัตตานี เช่น มัสยิดกลาง, เรือกอและ, และลายผ้าจวนตานี เป็นของฝากที่ระลึกที่ทั้งสวยงามและมีความหมาย',
      price: '250 ฿',
      images: ['https://scontent.fhdy2-1.fna.fbcdn.net/v/t39.30808-6/514234825_1250224213780507_661143071681627233_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=FfnXjxdjOnIQ7kNvwF36bKS&_nc_oc=AdmS2X8Q9VDFEXh6sscvErSCuEe0jl7ODd8CoWhvo3BkTeUrNRvQOrD0IlwlF3F_IBc&_nc_zt=23&_nc_ht=scontent.fhdy2-1.fna&_nc_gid=L9jylN3HNJh4ZIgKtcQzDw&oh=00_AfjBveSE8fTYw5vwRPMqlcgoY5Zvr_511HvNeMtqqmDjGA&oe=691C4A45'],
      rating: 4.7,
      reviewCount: 115,
    },
    {
      id: 30,
      name: 'ผ้าบาติก (ยะลา)',
      producer: 'กลุ่มบาติกเบตง',
      category: 'เครื่องแต่งกาย',
      province: 'ยะลา',
      story: 'ศิลปะบนผืนผ้าบาติก ลวดลายธรรมชาติแห่งเมืองเบตง',
      longStory: 'ผ้าบาติกจากยะลามีความโดดเด่นที่ลวดลายซึ่งได้แรงบันดาลใจจากธรรมชาติอันอุดมสมบูรณ์ของพื้นที่ เช่น ทะเลหมอกอัยเยอร์เวง, ดอกไม้ และนกนานาชนิด สร้างสรรค์ด้วยเทคนิคการเขียนเทียนและลงสีด้วยมือ ทำให้ผ้าแต่ละผืนมีเอกลักษณ์เฉพาะตัว',
      price: '850 ฿',
      images: ['https://pheeraya.wordpress.com/wp-content/uploads/2014/12/otop3.jpg'],
      rating: 4.8,
      reviewCount: 65,
    },
    {
      id: 31,
      name: 'กรงนกหัวจุก',
      producer: 'ชมรมช่างทำกรงนกนราธิวาส',
      category: 'ของตกแต่ง',
      province: 'นราธิวาส',
      story: 'งานฝีมือชั้นครู สู่บ้านของนกหัวจุกแชมเปี้ยน',
      longStory: 'การเลี้ยงนกเขาและนกหัวจุกเป็นวัฒนธรรมที่หยั่งรากลึกในสามจังหวัดชายแดนใต้ กรงนกจึงไม่ได้เป็นเพียงของใช้ แต่เป็นงานศิลปะที่แสดงถึงฐานะและรสนิยม กรงนกจากนราธิวาสขึ้นชื่อเรื่องความละเอียดของงานไม้และการตกแต่งที่สวยงาม',
      price: '3,000 ฿',
      images: ['https://narathiwat.m-culture.go.th/web-upload/1070x682eff4942db5e7ae6989dbcbf1ba368/202302/m_news/5162/166886/file_photo/c91b4866827ac39e352e28674d0c8d53.jpg'],
      rating: 4.9,
      reviewCount: 25,
    },
    {
      id: 32,
      name: 'ผ้าจวนตานี',
      producer: 'กลุ่มทอผ้าจวนตานี',
      category: 'ของใช้',
      province: 'ปัตตานี',
      story: 'ผ้าทอลายโบราณ เอกลักษณ์แห่งปัตตานี สีสันสดใส เนื้อผ้าทนทาน',
      longStory: 'ผ้าจวนตานี หรือ ผ้าลีมา เป็นผ้าทอที่มีชื่อเสียงและเป็นเอกลักษณ์ของจังหวัดปัตตานี มีลวดลายที่สืบทอดกันมาแต่โบราณและใช้สีสันจากธรรมชาติในการย้อม ทำให้ผ้าแต่ละผืนมีสีที่โดดเด่นและสวยงาม เนื้อผ้ามีความทนทาน เหมาะสำหรับนำไปตัดเย็บเป็นเครื่องแต่งกายหรือของใช้ต่างๆ',
      price: '1,200 ฿',
      images: ['https://www.pattanicity.go.th/tmp/10d6260052eee2f7c01b7f78cf6c2843.jpg'],
      rating: 4.8,
      reviewCount: 25,
    },
    {
      id: 33,
      name: 'ปลาหมึกแห้ง',
      producer: 'กลุ่มประมงพื้นบ้านปัตตานี',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ปลาหมึกสดจากทะเลปัตตานี ตากแห้งอย่างดี สะอาด ปลอดภัย',
      longStory: 'ปลาหมึกสดๆ จากเรือประมงจะถูกนำมาล้างทำความสะอาดและตากแห้งด้วยวิธีธรรมชาติ ทำให้เนื้อปลาหมึกมีรสชาติหวานอร่อยและคงคุณค่าทางอาหารไว้ครบถ้วน เหมาะสำหรับนำไปทอด ย่าง หรือประกอบอาหารได้หลากหลายเมนู',
      price: '320 ฿',
      images: ['https://www.pattanicity.go.th/tmp/17cb43cd86eab06d63c4a4ce6b30dcdf.jpg'],
      rating: 4.8,
      reviewCount: 88,
    },
    {
      id: 34,
      name: 'ขิงผงสำเร็จรูป',
      producer: 'กลุ่มสมุนไพรเพื่อสุขภาพ',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ผลิตจากขิงแก่คุณภาพดี ดื่มง่าย ชงสะดวก บำรุงสุขภาพ',
      longStory: 'คัดสรรขิงแก่สายพันธุ์ดี นำมาผ่านกระบวนการผลิตที่สะอาดและทันสมัย จนได้เป็นขิงผงสำเร็จรูปที่ยังคงกลิ่นหอมและคุณประโยชน์ของขิงไว้ครบถ้วน ชงดื่มง่ายได้ทุกเวลา ช่วยให้ร่างกายอบอุ่น บรรเทาอาการหวัด และช่วยเรื่องระบบย่อยอาหาร',
      price: '100 ฿',
      images: ['https://www.xn--12ca9cdcza1fboh6b4ca0evmxcuh.com/uploads/products/images/img_6111e01f1f9de.jpg'],
      rating: 4.9,
      reviewCount: 120,
    },
    {
      id: 35,
      name: 'ผ้าบาติก (นราธิวาส)',
      producer: 'กลุ่มบาติกนราศิลป์',
      category: 'เครื่องแต่งกาย',
      province: 'นราธิวาส',
      story: 'ลวดลายคลื่นและท้องทะเล สะท้อนชีวิตชาวนราธิวาส',
      longStory: 'ผ้าบาติกจากนราธิวาสมักได้รับแรงบันดาลใจจากสภาพแวดล้อมที่ใกล้ชิดกับทะเล ลวดลายคลื่น, สัตว์ทะเล และเรือกอและ ถูกนำมาถ่ายทอดลงบนผืนผ้าด้วยสีสันที่สดใส เป็นงานศิลปะที่สวมใส่ได้และบอกเล่าเรื่องราวของท้องถิ่น',
      price: '900 ฿',
      images: ['https://www2.narathiwat.go.th/nara2016/tmp/24cbb2f54683a2262f1b85c0ec6499a1.jpg'],
      rating: 4.8,
      reviewCount: 72,
    },
    {
      id: 36,
      name: 'เสื้อโต๊ป',
      producer: 'กลุ่มตัดเย็บเสื้อผ้าบุรุษ',
      category: 'เครื่องแต่งกาย',
      province: 'ปัตตานี',
      story: 'เสื้อโต๊ปสำหรับบุรุษ ตัดเย็บด้วยผ้าเนื้อดี สวมใส่สบาย',
      longStory: 'เสื้อโต๊ปสำหรับบุรุษมุสลิม ผลิตจากผ้าคุณภาพสูงที่ให้ความรู้สึกสบายเมื่อสวมใส่ ตัดเย็บอย่างพิถีพิถันเพื่อให้ได้รูปทรงที่สวยงาม เหมาะสมกับการใช้ประกอบศาสนกิจและสวมใส่ในเทศกาลสำคัญต่างๆ เป็นเครื่องแต่งกายที่สะท้อนถึงความศรัทธาและเอกลักษณ์ทางวัฒนธรรม',
      price: '890 ฿',
      images: ['https://scontent.fhdy2-1.fna.fbcdn.net/v/t1.6435-9/55597512_1974927999283363_6621979490346074112_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=YKOdzyeKj0sQ7kNvwGpXN7N&_nc_oc=AdlPb-HQNVQKKg8E4BH7BIGLFOkZPTvwz1hXDyf9EC6fJh6NP-jdTfpQk8sImUEzDKI&_nc_zt=23&_nc_ht=scontent.fhdy2-1.fna&_nc_gid=PYxkD01Jl1wweDpQUA6LpQ&oh=00_AfjkZ-zqW2VsUNDFQhUTTQEcBjVX-C2lCpjYK2WolvP7lg&oe=693E0C2D'],
      rating: 4.9,
      reviewCount: 78,
    },
     {
      id: 37,
      name: 'กรงหัวนก (ยะลา)',
      producer: 'ชมรมช่างฝีมือเบตง',
      category: 'ของตกแต่ง',
      province: 'ยะลา',
      story: 'งานไม้ฝีมือประณีตสำหรับนกเสียงทอง',
      longStory: 'กรงนกหัวจุกและนกเขาจากยะลาเป็นที่ยอมรับในวงการผู้เลี้ยงนกถึงความสวยงามและความทนทาน ช่างฝีมือจะเลือกใช้ไม้เนื้อดีและแกะสลักลวดลายต่างๆ เพื่อให้กรงนกเป็นมากกว่าบ้านของนก แต่เป็นเครื่องประดับบารมีของผู้เลี้ยง',
      price: '2800 ฿',
      images: ['https://pheeraya.wordpress.com/wp-content/uploads/2014/12/otop8.jpg'],
      rating: 4.9,
      reviewCount: 33,
    },
    {
      id: 38,
      name: 'ข้าวเด๋น',
      producer: 'วิสาหกิจชุมชนข้าวพื้นเมือง',
      category: 'อาหาร',
      province: 'ปัตตานี',
      story: 'ขนมข้าวพองโบราณ กรอบ หอม อร่อย',
      longStory: 'ข้าวเด๋น หรือ ข้าวพอง เป็นขนมพื้นบ้านที่ทำจากข้าวเหนียวทอดพองแล้วนำมาคลุกกับน้ำตาลโตนดที่เคี่ยวจนเหนียว เป็นของว่างที่ให้รสชาติหวานหอมและเนื้อสัมผัสที่กรอบอร่อย เป็นภูมิปัญญาการถนอมอาหารของคนสมัยก่อน',
      price: '60 ฿',
      images: ['https://gd.lnwfile.com/_/gd/_raw/k9/hc/b7.jpg'],
      rating: 4.7,
      reviewCount: 90,
    },
     {
      id: 39,
      name: 'ผ้าคลุมผมสตรี',
      producer: 'กลุ่มสตรีตัดเย็บปัตตานี',
      category: 'เครื่องแต่งกาย',
      province: 'ปัตตานี',
      story: 'ผ้าคลุมผมเนื้อดี สวมใส่สบาย ดีไซน์เรียบหรู เหมาะกับทุกโอกาส',
      longStory: 'ผ้าคลุมผมสตรี หรือ ฮิญาบ ที่ตัดเย็บอย่างประณีตจากผ้าเนื้อนุ่มคุณภาพดี ทำให้สวมใส่สบายตลอดวัน ไม่ร้อน ระบายอากาศได้ดี การออกแบบที่เรียบง่ายแต่แฝงไปด้วยความหรูหรา ทำให้สามารถสวมใส่ได้ในทุกโอกาส ทั้งในชีวิตประจำวันและงานพิธีสำคัญ',
      price: '390 ฿',
      images: ['https://scontent.fhdy2-1.fna.fbcdn.net/v/t39.30808-6/495539148_1117963960358739_3927399096824130992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dFZgzYhsvZYQ7kNvwGgUHZx&_nc_oc=AdkEbIwvCm9dWAPqL1ACT3wUuaSC6PTl3M62gWg4USa3QY201-jiAzyYZeNS5ukr9ok&_nc_zt=23&_nc_ht=scontent.fhdy2-1.fna&_nc_gid=CFHrDZxD3X6wlVS6jipbyQ&oh=00_Afiy7cjwnGQJhpFr1TKN0nAUcQlbHvapa-hk1QFquncPzg&oe=691C556E'],
      rating: 4.8,
      reviewCount: 112,
    },
    {
      id: 40,
      name: 'เสื้อเชิ้ตชายแขนยาว',
      producer: 'กลุ่มตัดเย็บบาติก',
      category: 'เครื่องแต่งกาย',
      province: 'ปัตตานี',
      story: 'เสื้อเชิ้ตผ้าบาติก ดีไซน์ทันสมัย สวมใส่ได้ทุกโอกาส',
      longStory: 'นำผ้าบาติกลวดลายสวยงามมาตัดเย็บเป็นเสื้อเชิ้ตแขนยาวสำหรับบุรุษ ด้วยดีไซน์ที่ร่วมสมัย ทำให้สามารถสวมใส่ได้ทั้งในวันทำงานและวันสบายๆ เป็นการผสมผสานระหว่างศิลปะพื้นถิ่นกับแฟชั่นสมัยใหม่ได้อย่างลงตัว',
      price: '750 ฿',
      images: ['https://scontent.fhdy2-1.fna.fbcdn.net/v/t39.30808-6/487542727_1210712947722787_3079525226826309987_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=FQ5P0xubwRoQ7kNvwEksru7&_nc_oc=Adn54inDKlSdZ3NNvb8SmcYq2Em2zeLmR7cIJ0TLPr2RJGtU7pgc2ZusM6XTI_mrAVA&_nc_zt=23&_nc_ht=scontent.fhdy2-1.fna&_nc_gid=qX6kCaDTwv7lPjc6mTdDdg&oh=00_AfgeW73WVKrR8-eGN7TjarBApLfIwJRh7vpy90RDDGZ3eA&oe=691C7860'],
      rating: 4.8,
      reviewCount: 68,
    }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.province.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    if (selectedProvinces.length > 0) {
      filtered = filtered.filter(p => selectedProvinces.includes(p.province));
    }
    
    const getPriceValue = (price: string) => parseFloat(price.replace(/[^0-9.-]+/g,""));

    switch (sortOption) {
      case 'price-asc':
        return [...filtered].sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
      case 'price-desc':
        return [...filtered].sort((a, b) => getPriceValue(b.price) - getPriceValue(a.price));
      default:
        return filtered;
    }
  }, [allProducts, selectedCategories, selectedProvinces, sortOption, searchQuery]);

  const allCategories = useMemo(() => [...new Set(allProducts.map(p => p.category))].sort(), [allProducts]);
  const allProvinces = useMemo(() => [...new Set(allProducts.map(p => p.province))].sort(), [allProducts]);

  const renderPage = () => {
    const pageContent = () => {
      switch(currentPage) {
        case 'home':
          return <Home onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} allProducts={allProducts} onCategorySelect={handleCategorySelect} onQuickView={handleOpenQuickView} />;
        case 'all-products':
          return <AllProducts 
                      products={filteredAndSortedProducts}
                      onSelectProduct={handleSelectProduct} 
                      onQuickView={handleOpenQuickView}
                      searchQuery={searchQuery}
                      onClearSearch={handleClearSearch}
                      allCategories={allCategories}
                      allProvinces={allProvinces}
                      selectedCategories={selectedCategories}
                      selectedProvinces={selectedProvinces}
                      sortOption={sortOption}
                      onCategoryChange={(c) => setSelectedCategories(c)}
                      onProvinceChange={(p) => setSelectedProvinces(p)}
                      onSortChange={(s) => setSortOption(s)}
                  />;
        case 'product-detail':
          if (selectedProduct) {
            return <ProductDetail product={selectedProduct} onBack={handleBackToList} onSelectProduct={handleSelectProduct} allProducts={allProducts} onAddToCart={handleAddToCart} />;
          }
          return <AllProducts products={filteredAndSortedProducts} onSelectProduct={handleSelectProduct} onQuickView={handleOpenQuickView} searchQuery={searchQuery} onClearSearch={handleClearSearch} allCategories={allCategories} allProvinces={allProvinces} selectedCategories={selectedCategories} selectedProvinces={selectedProvinces} sortOption={sortOption} onCategoryChange={setSelectedCategories} onProvinceChange={setSelectedProvinces} onSortChange={setSortOption} />;
        case 'cart':
          return <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onNavigate={handleNavigate} onCheckout={handleCheckout} />;
        case 'stories':
          return <Stories onNavigate={handleNavigate} />;
        case 'about':
          return <About onNavigate={handleNavigate} />;
        case 'confirmation':
          return <Confirmation onNavigate={handleNavigate} />;
        default:
          return <Home onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} allProducts={allProducts} onCategorySelect={handleCategorySelect} onQuickView={handleOpenQuickView} />;
      }
    };
    return <div className="fade-in">{pageContent()}</div>
  }

  return (
    <>
      <div className="bg-white text-gray-800 flex flex-col min-h-screen antialiased">
        <Header onNavigate={handleNavigate} cartItemCount={cartItems.length} onSearch={handleSearch} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        onNavigateToProduct={handleSelectProduct}
      />
      <ToastContainer />
    </>
  );
};

export default App;