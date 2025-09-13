import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { totalItems } = useCart();

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
    <header className="sticky top-0 z-50 w-full  bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* --- Top Navbar --- */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-8 h-10 bg-gradient-to-r from-gray-700 to-gray-900 text-sm text-white">
        <div className="flex items-center space-x-6 ">
          <span className="flex items-center space-x-1.5 hover:text-amber-500 duration-300 transition-colors">
            <Phone size={14} className="text-white hover:text-amber-500 duration-300" />
            <span>+880 1850 273 117</span>
          </span>
          <span className="flex items-center space-x-1.5  hover:text-amber-500 duration-300 transition-colors">
            <Mail size={14} className="text-white hover:text-amber-500 duration-300" />
            <span>info@punjabpalace.com</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-white transition-colors">
            <Facebook size={16} className="text-white hover:text-amber-500 duration-300" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Instagram size={16} className="text-white hover:text-amber-500 duration-300" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Twitter size={16} className="text-white hover:text-amber-500 duration-300" />
          </a>
        </div>
      </div>

      {/* --- Middle Navbar --- */}
      <div className="px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="group-hover:bg-white transition-colors p-2 rounded-lg">
            <img src="https://d19qnzrkx7fd3b.cloudfront.net/static/images/ILLIYEEN-Logo2.png" alt="Punjab Palace" className="h-8 w-auto"/>
          </div>
          {/* <span className="font-serif font-bold text-2xl text-gray-900 group-hover:text-amber-900 transition-colors">
            Punjab Palace
          </span> */}
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search Panjabi collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-11 bg-white border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 rounded-lg shadow-sm"
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-4 bg-amber-600 hover:bg-white text-white rounded-md"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Wishlist */}
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative rounded-full  hover:bg-amber-50 hover:text-amber-900">
              <Heart className="w-6 h-6" />
              <Badge className="absolute flex items-center justify-center -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-amber-600 hover:bg-amber-900">0</Badge>
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full  hover:bg-amber-50 hover:text-amber-900">
              <ShoppingCart className="w-6 h-6" />
              <Badge className="absolute flex items-center justify-center -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-amber-600 hover:bg-amber-900">0</Badge>
            </Button>
          </Link>

          {/* Cart */}
          {/* <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-amber-50 hover:text-amber-900">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-amber-600 hover:bg-white text-white">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link> */}

          {/* User Account */}
          <Link to="/login">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-amber-50 hover:text-amber-900">
              <User className="w-6 h-6" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full hover:bg-amber-50 hover:text-amber-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* --- Bottom Navbar (Menus) --- */}
      <div className="hidden lg:flex items-center justify-center h-14 bg-gradient-to-b from-amber-600 to-orange-500 border-b border-amber-500">
        <nav className="flex space-x-10 font-medium text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative px-2 py-3 hover:text-white transition-colors group"
            >
              {item.name}
              <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-amber-50 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* --- Mobile Navigation --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white shadow-lg"
          >
            <div className="flex flex-col space-y-1 px-4 py-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search collections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 h-11 border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 rounded-lg"
                  />
                </div>
              </form>
              
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-3 rounded-lg font-medium text-amber-900 hover:bg-amber-50 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  {item.name}
                </Link>
              ))}
              
              <div className="flex justify-around pt-4 mt-2 border-t border-amber-100">
                <Link to="/wishlist" className="flex flex-col items-center text-sm text-white" onClick={() => setIsMenuOpen(false)}>
                  <Heart className="w-5 h-5 mb-1" />
                  Wishlist
                </Link>
                <Link to="/cart" className="flex flex-col items-center text-sm text-white relative" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingCart className="w-5 h-5 mb-1" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-4 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link to="/login" className="flex flex-col items-center text-sm text-white" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-5 h-5 mb-1" />
                  Account
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
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