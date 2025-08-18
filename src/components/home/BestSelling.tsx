import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { Crown, TrendingUp } from "lucide-react";

const BestSelling = () => {
  const bestSellingProducts = products.filter(product => product.bestSelling).slice(0, 4);

  return (
    <section className="py-16 bg-muted/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary">
              Best Selling Panjabi
            </h2>
            <TrendingUp className="w-8 h-8 text-accent" />
          </div>
          
          <Badge className="bg-accent text-accent-foreground text-lg px-6 py-2 mb-4">
            Customer Favorites
          </Badge>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most loved Panjabi collections chosen by thousands of satisfied customers. 
            These are the styles that never go out of fashion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bestSellingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Best Seller Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-accent text-accent-foreground font-bold">
                  <Crown className="w-3 h-3 mr-1" />
                  Best Seller
                </Badge>
              </div>
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/categories?filter=bestSelling">
            <Button className="btn-gold">
              View All Best Sellers
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSelling;