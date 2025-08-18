import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { Timer, Flame } from "lucide-react";

const SaleSection = () => {
  const saleProducts = products.filter(product => product.sale).slice(0, 6);

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-destructive/5 to-destructive/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-destructive/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-destructive" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary">
              Flash Sale
            </h2>
            <Flame className="w-8 h-8 text-destructive" />
          </div>
          
          <Badge className="bg-destructive text-destructive-foreground text-lg px-6 py-2 mb-4">
            Up to 75% OFF
          </Badge>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Limited time offer! Get incredible discounts on premium Panjabi collections. 
            Don't miss out on these amazing deals!
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-6 text-destructive"
          >
            <Timer className="w-5 h-5" />
            <span className="font-semibold">Limited Time Offer!</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {saleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Discount Badge */}
              {product.originalPrice && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-destructive text-destructive-foreground text-lg font-bold">
                    {calculateDiscount(product.price, product.originalPrice)}% OFF
                  </Badge>
                </div>
              )}
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/sale">
            <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-lg">
              Shop All Sale Items
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SaleSection;