import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold">P</span>
              </div>
              <span className="font-playfair font-bold text-lg">Punjab Palace</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Premium Panjabi clothing collection featuring authentic designs with modern comfort.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-accent transition-colors">Categories</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="hover:text-accent transition-colors">Sale</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/category/casual" className="hover:text-accent transition-colors">Casual Panjabi</Link></li>
              <li><Link to="/category/premium" className="hover:text-accent transition-colors">Premium Collection</Link></li>
              <li><Link to="/category/party" className="hover:text-accent transition-colors">Party Wear</Link></li>
              <li><Link to="/category/wedding" className="hover:text-accent transition-colors">Wedding Collection</Link></li>
              <li><Link to="/category/cotton" className="hover:text-accent transition-colors">Cotton Panjabi</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span>123 Fashion Street, Dhaka 1000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent" />
                <span>+880 1234 567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@punjabpalace.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Punjab Palace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;