// Import product images
import navyPremiumImg from "@/assets/products/navy-premium-panjabi.jpg";
import maroonTraditionalImg from "@/assets/products/maroon-traditional-kurta.jpg";
import creamWeddingImg from "@/assets/products/cream-wedding-panjabi.jpg";
import skyBlueCasualImg from "@/assets/products/sky-blue-casual-panjabi.jpg";
import blackPartyImg from "@/assets/products/black-party-kurta.jpg";
import goldenFestiveImg from "@/assets/products/golden-festive-panjabi.jpg";
import whiteEidImg from "@/assets/products/white-eid-panjabi.jpg";
import greenPremiumImg from "@/assets/products/green-premium-panjabi.jpg";
import burgundyFormalImg from "@/assets/products/burgundy-formal-panjabi.jpg";
import pinkCasualImg from "@/assets/products/pink-casual-panjabi.jpg";
import royalBluePremiumImg from "@/assets/products/royal-blue-premium.jpg";
import grayModernImg from "@/assets/products/gray-modern-panjabi.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  fabric: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  featured: boolean;
  newArrival: boolean;
  sale: boolean;
  bestSelling: boolean;
  eidSpecial: boolean;
  festivalSpecial: boolean;
}

// Expanded product data with real images
export const products: Product[] = [
  {
    id: "1",
    name: "Premium Navy Panjabi",
    description: "Elegant navy blue Panjabi with intricate golden embroidery work perfect for formal occasions.",
    price: 2500,
    originalPrice: 5000,
    image: navyPremiumImg,
    category: "premium",
    subcategory: "formal",
    fabric: "cotton",
    colors: ["Navy", "Black", "Maroon"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.8,
    reviews: 124,
    featured: true,
    newArrival: false,
    sale: true,
    bestSelling: true,
    eidSpecial: false,
    festivalSpecial: false,
  },
  {
    id: "2",
    name: "Traditional Maroon Kurta",
    description: "Classic maroon kurta with silver thread work and comfortable fit.",
    price: 1800,
    originalPrice: 3600,
    image: maroonTraditionalImg,
    category: "traditional",
    subcategory: "casual",
    fabric: "cotton",
    colors: ["Maroon", "Green", "Blue"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.6,
    reviews: 89,
    featured: true,
    newArrival: true,
    sale: true,
    bestSelling: false,
    eidSpecial: false,
    festivalSpecial: true,
  },
  {
    id: "3",
    name: "Wedding Special Cream Panjabi",
    description: "Luxurious cream colored Panjabi with heavy golden embroidery work ideal for weddings.",
    price: 4500,
    image: creamWeddingImg,
    category: "wedding",
    subcategory: "luxury",
    fabric: "silk",
    colors: ["Cream", "Gold", "White"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.9,
    reviews: 56,
    featured: true,
    newArrival: true,
    sale: false,
    bestSelling: true,
    eidSpecial: false,
    festivalSpecial: false,
  },
  {
    id: "4",
    name: "Casual Sky Blue Panjabi",
    description: "Comfortable daily wear cotton Panjabi in sky blue color with minimal embroidery.",
    price: 1200,
    originalPrice: 2400,
    image: skyBlueCasualImg,
    category: "casual",
    subcategory: "daily",
    fabric: "cotton",
    colors: ["Sky Blue", "White", "Light Green"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.5,
    reviews: 203,
    featured: false,
    newArrival: false,
    sale: true,
    bestSelling: true,
    eidSpecial: false,
    festivalSpecial: false,
  },
  {
    id: "5",
    name: "Party Wear Black Kurta",
    description: "Stylish black kurta with contemporary design perfect for parties and events.",
    price: 2200,
    image: blackPartyImg,
    category: "party",
    subcategory: "modern",
    fabric: "blended",
    colors: ["Black", "Navy", "Gray"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.7,
    reviews: 67,
    featured: true,
    newArrival: true,
    sale: false,
    bestSelling: false,
    eidSpecial: false,
    festivalSpecial: false,
  },
  {
    id: "6",
    name: "Festive Golden Panjabi",
    description: "Rich golden Panjabi with traditional paisley motifs perfect for festive occasions.",
    price: 3200,
    originalPrice: 4800,
    image: goldenFestiveImg,
    category: "festive",
    subcategory: "traditional",
    fabric: "silk",
    colors: ["Golden", "Bronze", "Copper"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.8,
    reviews: 91,
    featured: true,
    newArrival: false,
    sale: true,
    bestSelling: false,
    eidSpecial: false,
    festivalSpecial: true,
  },
  {
    id: "7",
    name: "Eid Special White Panjabi",
    description: "Pure white Panjabi with silver embroidery work perfect for Eid celebrations.",
    price: 2800,
    image: whiteEidImg,
    category: "eid",
    subcategory: "religious",
    fabric: "cotton",
    colors: ["White", "Cream", "Light Gray"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.9,
    reviews: 156,
    featured: true,
    newArrival: true,
    sale: false,
    bestSelling: true,
    eidSpecial: true,
    festivalSpecial: false,
  },
  {
    id: "8",
    name: "Premium Green Panjabi",
    description: "Deep green luxury Panjabi with copper-colored embroidery and premium finishing.",
    price: 3500,
    originalPrice: 7000,
    image: greenPremiumImg,
    category: "premium",
    subcategory: "luxury",
    fabric: "silk",
    colors: ["Green", "Navy", "Maroon"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.8,
    reviews: 78,
    featured: true,
    newArrival: false,
    sale: true,
    bestSelling: true,
    eidSpecial: false,
    festivalSpecial: true,
  },
  {
    id: "9",
    name: "Burgundy Formal Panjabi",
    description: "Rich burgundy Panjabi with golden thread work perfect for formal occasions.",
    price: 2900,
    image: burgundyFormalImg,
    category: "formal",
    subcategory: "office",
    fabric: "cotton",
    colors: ["Burgundy", "Navy", "Black"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.7,
    reviews: 94,
    featured: false,
    newArrival: true,
    sale: false,
    bestSelling: false,
    eidSpecial: false,
    festivalSpecial: false,
  },
  {
    id: "10",
    name: "Pink Casual Panjabi",
    description: "Light pink casual Panjabi with delicate embroidery perfect for spring occasions.",
    price: 1600,
    originalPrice: 3200,
    image: pinkCasualImg,
    category: "casual",
    subcategory: "spring",
    fabric: "cotton",
    colors: ["Pink", "Peach", "Light Blue"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.4,
    reviews: 112,
    featured: false,
    newArrival: true,
    sale: true,
    bestSelling: false,
    eidSpecial: false,
    festivalSpecial: true,
  },
  {
    id: "11",
    name: "Royal Blue Premium",
    description: "Royal blue premium Panjabi with silver embroidery perfect for special occasions.",
    price: 3800,
    image: royalBluePremiumImg,
    category: "premium",
    subcategory: "special",
    fabric: "silk",
    colors: ["Royal Blue", "Navy", "Purple"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.9,
    reviews: 143,
    featured: true,
    newArrival: true,
    sale: false,
    bestSelling: true,
    eidSpecial: true,
    festivalSpecial: false,
  },
  {
    id: "12",
    name: "Gray Modern Panjabi",
    description: "Contemporary charcoal gray Panjabi with modern cut perfect for office wear.",
    price: 2100,
    originalPrice: 4200,
    image: grayModernImg,
    category: "modern",
    subcategory: "office",
    fabric: "blended",
    colors: ["Gray", "Black", "Navy"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.6,
    reviews: 87,
    featured: false,
    newArrival: false,
    sale: true,
    bestSelling: false,
    eidSpecial: false,
    festivalSpecial: false,
  }
];

export const categories = [
  {
    id: "casual",
    name: "Casual Panjabi",
    description: "Comfortable daily wear",
    image: pinkCasualImg
  },
  {
    id: "premium",
    name: "Premium Collection",
    description: "Luxury designs",
    image: navyPremiumImg
  },
  {
    id: "party",
    name: "Party Wear",
    description: "Modern & stylish",
    image: blackPartyImg
  },
  {
    id: "wedding",
    name: "Wedding Collection",
    description: "Special occasion wear",
    image: creamWeddingImg
  },
  {
    id: "cotton",
    name: "Cotton Panjabi",
    description: "Breathable comfort",
    image: whiteEidImg
  },
  {
    id: "festive",
    name: "Festive Wear",
    description: "Traditional celebrations",
    image:goldenFestiveImg
  }
];