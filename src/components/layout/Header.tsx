import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/context/StoreContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { state } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for "${searchQuery}"`,
    });
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Sale", href: "/sale" },
    { name: "About", href: "/about" },
  ];

  return (
  <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">

  {/* --- Top Navbar (FULL WIDTH BG) --- */}
  <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-sm text-white">
    <div className="hidden md:flex items-center justify-between h-10 container mx-auto px-4 lg:px-8">
      
      <div className="flex items-center space-x-6">
        <span className="flex items-center space-x-1.5 hover:text-amber-500 transition">
          <Phone size={14} />
          <span>+880 1850 273 117</span>
        </span>
        <span className="flex items-center space-x-1.5 hover:text-amber-500 transition">
          <Mail size={14} />
          <span>info@punjabpalace.com</span>
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <Facebook size={16} className="hover:text-amber-500" />
        <Instagram size={16} className="hover:text-amber-500" />
        <Twitter size={16} className="hover:text-amber-500" />
      </div>

    </div>
  </div>

  {/* --- Middle Navbar --- */}
  <div className="w-full bg-white">
    <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">

      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
       <img
  src="https://d19qnzrkx7fd3b.cloudfront.net/static/images/ILLIYEEN-Logo2.png"
  alt="Punjab Palace"
  className="h-12 md:h-14 lg:h-16 w-auto"
/>
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-11 border-amber-300"
          />
          <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-9 bg-amber-600">
            Search
          </Button>
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center space-x-2">

        {/* Wishlist */}
        <Link to="/wishlist">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="w-6 h-6" />
            {state.wishlist.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-amber-600">
                {state.wishlist.length}
              </Badge>
            )}
          </Button>
        </Link>

        {/* Cart */}
        <Link to="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-6 h-6" />
             {state.cart.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-amber-600">
                {state.cart.length}
              </Badge>
            )}
          </Button>
        </Link>

        {/* User */}
        <Link to="/login">
          <Button variant="ghost" size="icon">
            <User className="w-6 h-6" />
          </Button>
        </Link>

      </div>

    </div>
  </div>

  {/* --- Bottom Navbar --- */}
  <div className="w-full bg-gradient-to-b from-amber-600 to-orange-500">
    <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center h-14">

      <nav className="flex space-x-10 text-white font-medium">
        {navItems.map((item) => (
          <Link key={item.name} to={item.href} className="relative group">
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
          </Link>
        ))}
      </nav>

    </div>
  </div>

</header>
  );
};

export default Header;

// import { Link } from "react-router-dom";
// import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { motion, AnimatePresence } from "framer-motion";
// import { useToast } from "@/hooks/use-toast";
// import { useCart } from "@/context/CartContext";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { toast } = useToast();
//   const { totalItems } = useCart();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Search query:", searchQuery);
//     toast({
//       title: "Search initiated",
//       description: `Searching for "${searchQuery}"`,
//     });
//   };

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Categories", href: "/categories" },
//     { name: "New Arrivals", href: "/new-arrivals" },
//     { name: "Sale", href: "/sale" },
//     { name: "About", href: "/about" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
//       <div className="section-container">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
//               <span className="text-primary-foreground font-bold text-xl">P</span>
//             </div>
//             <span className="font-playfair font-bold text-xl text-primary">
//               Punjab Palace
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className="font-medium text-foreground hover:text-primary transition-colors"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Search Bar - Hidden on mobile */}
//           <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 type="text"
//                 placeholder="Search Panjabi collections..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 bg-muted/50 border-border focus:border-accent"
//               />
//             </div>
//           </form>

//           {/* Action Buttons */}
//           <div className="flex items-center space-x-4">
//             {/* Mobile Search Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => {
//                 toast({
//                   title: "Search",
//                   description: "Mobile search coming soon",
//                 });
//               }}
//             >
//               <Search className="w-5 h-5" />
//             </Button>

//             {/* Wishlist */}
//             <Link to="/wishlist">
//               <Button variant="ghost" size="icon" className="relative">
//                 <Heart className="w-5 h-5" />
//                 <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-secondary">
//                   0
//                 </Badge>
//               </Button>
//             </Link>

//             {/* Cart */}
//             <Link to="/cart">
//               <Button variant="ghost" size="icon" className="relative">
//                 <ShoppingCart className="w-5 h-5" />
//                 {totalItems > 0 && (
//                   <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-accent text-accent-foreground">
//                     {totalItems}
//                   </Badge>
//                 )}
//               </Button>
//             </Link>

//             {/* User Account */}
//             <Link to="/login">
//               <Button variant="ghost" size="icon">
//                 <User className="w-5 h-5" />
//               </Button>
//             </Link>

//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.nav
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden border-t border-border py-4"
//             >
//               <div className="flex flex-col space-y-4">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className="font-medium text-foreground hover:text-primary transition-colors px-2 py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}

//                 {/* Mobile Search */}
//                 <form onSubmit={handleSearch} className="flex items-center space-x-2 px-2">
//                   <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                     <Input
//                       type="text"
//                       placeholder="Search collections..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>
//                 </form>
//               </div>
//             </motion.nav>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   );
// };

// export default Header;
