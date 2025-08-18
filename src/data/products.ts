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
}

// Sample product data
export const products: Product[] = [
  {
    id: "1",
    name: "Premium Navy Panjabi",
    description: "Elegant navy blue Panjabi with intricate embroidery work perfect for formal occasions.",
    price: 2500,
    originalPrice: 3000,
    image: "/placeholder.svg",
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
  },
  {
    id: "2",
    name: "Traditional Maroon Kurta",
    description: "Classic maroon kurta with golden thread work and comfortable fit.",
    price: 1800,
    image: "/placeholder.svg",
    category: "traditional",
    subcategory: "casual",
    fabric: "cotton",
    colors: ["Maroon", "Green", "Blue"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.6,
    reviews: 89,
    featured: true,
    newArrival: true,
    sale: false,
  },
  {
    id: "3",
    name: "Wedding Special Cream Panjabi",
    description: "Luxurious cream colored Panjabi with heavy embroidery work ideal for weddings.",
    price: 4500,
    image: "/placeholder.svg",
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
  },
  {
    id: "4",
    name: "Casual Cotton Panjabi",
    description: "Comfortable daily wear cotton Panjabi in sky blue color.",
    price: 1200,
    image: "/placeholder.svg",
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
  },
  {
    id: "5",
    name: "Party Wear Black Kurta",
    description: "Stylish black kurta with contemporary design perfect for parties.",
    price: 2200,
    image: "/placeholder.svg",
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
  },
  {
    id: "6",
    name: "Festive Golden Panjabi",
    description: "Rich golden Panjabi with traditional motifs for festive occasions.",
    price: 3200,
    image: "/placeholder.svg",
    category: "festive",
    subcategory: "traditional",
    fabric: "silk",
    colors: ["Golden", "Bronze", "Copper"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.8,
    reviews: 91,
    featured: true,
    newArrival: false,
    sale: false,
  }
];

export const categories = [
  {
    id: "casual",
    name: "Casual Panjabi",
    description: "Comfortable daily wear",
    image: "/placeholder.svg"
  },
  {
    id: "premium",
    name: "Premium Collection",
    description: "Luxury designs",
    image: "/placeholder.svg"
  },
  {
    id: "party",
    name: "Party Wear",
    description: "Modern & stylish",
    image: "/placeholder.svg"
  },
  {
    id: "wedding",
    name: "Wedding Collection",
    description: "Special occasion wear",
    image: "/placeholder.svg"
  },
  {
    id: "cotton",
    name: "Cotton Panjabi",
    description: "Breathable comfort",
    image: "/placeholder.svg"
  },
  {
    id: "festive",
    name: "Festive Wear",
    description: "Traditional celebrations",
    image: "/placeholder.svg"
  }
];