export type Product = {
  id: number;
  category: string;
  name: string;
  engname?: string;
  price: number;
  imageurl: string;
  size?: string;
  quantity?: number;
  volume?: number;
  dimensions?: string;
  unit?: string;
  variant?: string;
  description?: string;
};

const legacyImageUrlMap: Record<string, string> = {
  "/cotton/cotton1.png": "/cotton/cottonbuds-200.png",
  "/cotton/cotton2.png": "/cotton/cottonballs-100.png",
  "/cotton/cotton3.png": "/cotton/cottonpads-80.png",
  "/cotton/cotton4.png": "/cotton/cottonbuds-400.png",
  "/cotton/cotton5.png": "/cotton/cottonbuds-250.png",
  "/cotton/cotton6.png": "/cotton/cottonbuds-100.png",
  "/detergent/det1.png": "/detergent/detergent-pinkmirage-1200.png",
  "/detergent/det2.png": "/detergent/detergent-oceanpearl-1200.png",
  "/detergent/det3.png": "/detergent/detergent-mysticviolet-1200.png",
  "/detergent/det4.png": "/detergent/detergent-pinkmirage-600.png",
  "/detergent/det5.png": "/detergent/detergent-mysticviolet-600.png",
  "/detergent/det6.png": "/detergent/detergent-blossomkiss-600.png",
  "/detergent/det7.png": "/detergent/detergent-floralkiss-600.png",
  "/detergent/det8.png": "/detergent/detergent-romanticviolet-600.png",
  "/detergent/det9.png": "/detergent/detergent-impression-600.png",
  "/detergent/det10.png": "/detergent/detergent-morningkiss-800.png",
  "/detergent/det11.png": "/detergent/detergent-blossomkiss-800.png",
  "/detergent/det12.png": "/detergent/detergent-morningkiss-3500.png",
  "/detergent/det13.png": "/detergent/detergent-blossomkiss-3500.png",
  "/dishwashing/dish4.png": "/dishwashing/dishwashing-lemon-450.png",
  "/dishwashing/dish5.png": "/dishwashing/dishwashing-greenapple-450.png",
  "/dishwashing/dish6.png": "/dishwashing/dishwashing-yuzuorange-450.png",
  "/dishwashing/dish7.png": "/dishwashing/dishwashing-kyohogrape-450.png",
  "/floor/floor1.png": "/floor/floor-floral-800.png",
  "/floor/floor2.png": "/floor/floor-lemongrass-800.png",
  "/floor/floor3.png": "/floor/floor-purplegarden-800.png",
  "/garbagebag/garbage1.png": "/garbagebag/garbagebag.png",
  "/garbagebag/garbage2.png": "/garbagebag/garbagebag18x20.png",
  "/garbagebag/garbage3.png": "/garbagebag/garbagebag20x25.png",
  "/garbagebag/garbage4.png": "/garbagebag/garbagebag24x28.png",
  "/garbagebag/garbage5.png": "/garbagebag/garbagebag26x34.png",
  "/garbagebag/garbage6.png": "/garbagebag/garbagebag28x36.png",
  "/softener/softener1.png": "/softener/softener-pinkbaby-500.png",
  "/softener/softener2.png": "/softener/softener-lovelybloom-500.png",
  "/softener/softener3.png": "/softener/softener-bloomingviolet-500.png",
};

export function normalizeProductImageUrl(imageurl: string) {
  return legacyImageUrlMap[imageurl] ?? imageurl;
}

export function normalizeProductImage<T extends { imageurl: string }>(
  product: T
) {
  return {
    ...product,
    imageurl: normalizeProductImageUrl(product.imageurl),
  };
}

export const fallbackProducts: Product[] = [
  {
    id: 1,
    category: "detergent",
    name: "ผลิตภัณฑ์ซักผ้า ลัคกี้คลีน ลักซ์ชูเรียส มิสต์ กลิ่นพิงค์มิราจ 1200 ml",
    engname: "Lucky Clean Luxurious Mist Pink Mirage Detergent 1200 ml",
    price: 2.49,
    imageurl: "/detergent/detergent-pinkmirage-1200.png",
    size: "1200 ml",
    volume: 1200,
    unit: "ml",
  },
  {
    id: 2,
    category: "detergent",
    name: "ผลิตภัณฑ์ซักผ้า ลัคกี้คลีน ลักซ์ชูเรียส มิสต์ กลิ่นโอเชียนเพิร์ล 1200 ml",
    engname: "Lucky Clean Luxurious Mist Ocean Pearl Detergent 1200 ml",
    price: 2.99,
    imageurl: "/detergent/detergent-oceanpearl-1200.png",
    size: "1200 ml",
    volume: 1200,
    unit: "ml",
  },
  {
    id: 3,
    category: "detergent",
    name: "ผลิตภัณฑ์ซักผ้า ลัคกี้คลีน ลักซ์ชูเรียส มิสต์ กลิ่นมิสทิคไวโอเลต 1200 ml",
    engname: "Lucky Clean Luxurious Mist Mystic Violet Detergent 1200 ml",
    price: 2.99,
    imageurl: "/detergent/detergent-mysticviolet-1200.png",
    size: "1200 ml",
    volume: 1200,
    unit: "ml",
  },
  {
    id: 4,
    category: "dishwashing",
    name: "ผลิตภัณฑ์ล้างจาน ลัคกี้คลีน กลิ่นเลมอน 450 ml",
    engname: "Lucky Clean Lemon Dishwashing Liquid 450 ml",
    price: 1.99,
    imageurl: "/dishwashing/dishwashing-lemon-450.png",
    size: "450 ml",
    volume: 450,
    unit: "ml",
  },
  {
    id: 5,
    category: "dishwashing",
    name: "ผลิตภัณฑ์ล้างจาน ลัคกี้คลีน กลิ่นกรีนแอปเปิล 450 ml",
    engname: "Lucky Clean Green Apple Dishwashing Liquid 450 ml",
    price: 1.99,
    imageurl: "/dishwashing/dishwashing-greenapple-450.png",
    size: "450 ml",
    volume: 450,
    unit: "ml",
  },
  {
    id: 6,
    category: "floor",
    name: "ผลิตภัณฑ์ทำความสะอาดพื้น ลัคกี้คลีน กลิ่นฟลอรัล 800 ml",
    engname: "Lucky Clean Floral Floor Cleaner 800 ml",
    price: 2.49,
    imageurl: "/floor/floor-floral-800.png",
    size: "800 ml",
    volume: 800,
    unit: "ml",
  },
  {
    id: 7,
    category: "floor",
    name: "ผลิตภัณฑ์ทำความสะอาดพื้น ลัคกี้คลีน กลิ่นเลมอนกราส 800 ml",
    engname: "Lucky Clean Lemongrass Floor Cleaner 800 ml",
    price: 2.49,
    imageurl: "/floor/floor-lemongrass-800.png",
    size: "800 ml",
    volume: 800,
    unit: "ml",
  },
  {
    id: 8,
    category: "garbagebag",
    name: "ถุงขยะ ลัคกี้คลีน ขนาด 24x28 นิ้ว",
    engname: "Lucky Clean Garbage Bag 24x28 in",
    price: 2.49,
    imageurl: "/garbagebag/garbagebag24x28.png",
    size: "24x28 in",
    unit: "pack",
  },
  {
    id: 9,
    category: "softener",
    name: "ผลิตภัณฑ์ปรับผ้านุ่ม ลัคกี้แคร์ กลิ่นพิงค์เบบี้ 500 ml",
    engname: "Lucky Care Pink Baby Fabric Softener 500 ml",
    price: 2.49,
    imageurl: "/softener/softener-pinkbaby-500.png",
    size: "500 ml",
    volume: 500,
    unit: "ml",
  },
  {
    id: 10,
    category: "cotton",
    name: "สำลีก้านบริสุทธิ์ ลัคกี้แคร์ 200 ก้าน",
    engname: "Lucky Care Cotton Buds 200 pcs",
    price: 2.49,
    imageurl: "/cotton/cottonbuds-200.png",
    size: "200 pcs",
    quantity: 200,
    unit: "pcs",
  },
  {
    id: 11,
    category: "cotton",
    name: "สำลีแผ่นบริสุทธิ์ ลัคกี้แคร์ 80 แผ่น",
    engname: "Lucky Care Cotton Pads 80 pcs",
    price: 3.49,
    imageurl: "/cotton/cottonpads-80.png",
    size: "80 pcs",
    quantity: 80,
    unit: "pcs",
  },
  {
    id: 12,
    category: "tissue",
    name: "ทิชชูเปียก ลัคกี้แคร์ 50 แผ่น กลิ่นแป้งเด็ก",
    engname: "Lucky Care Baby Powder Wet Wipes 50 sheets",
    price: 2.49,
    imageurl: "/tissue/tissue3.png",
    size: "50 sheets",
    quantity: 50,
    unit: "sheets",
  },
  {
    id: 13,
    category: "tissue",
    name: "กระดาษชำระ ลัคกี้แคร์ ชนิดม้วน 6 ม้วนต่อแพ็ค",
    engname: "Lucky Care Toilet Tissue 6 rolls",
    price: 3.49,
    imageurl: "/tissue/tissue8.png",
    size: "6 rolls",
    quantity: 6,
    unit: "rolls",
  },
];
