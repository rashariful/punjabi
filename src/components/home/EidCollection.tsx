import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { Star, Moon } from "lucide-react";

const EidCollection = () => {
  const eidProducts = products.filter(product => product.eidSpecial).slice(0, 3);

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-20 h-20">
          <Star className="w-full h-full text-accent" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16">
          <Moon className="w-full h-full text-primary" />
        </div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12">
          <Star className="w-full h-full text-secondary" />
        </div>
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-8 h-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary">
              Eid Collection
            </h2>
            <Star className="w-8 h-8 text-accent" />
          </div>
          
          <Badge className="bg-primary text-primary-foreground text-lg px-6 py-2 mb-4">
            Eid Mubarak Special
          </Badge>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrate Eid in style with our exclusive collection of traditional Panjabi 
            designed for this blessed occasion. Premium quality for precious moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {eidProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Eid Special Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-primary text-primary-foreground font-bold">
                  <Moon className="w-3 h-3 mr-1" />
                  Eid Special
                </Badge>
              </div>
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
          <Link to="/category/eid">
            <Button className="btn-hero">
              Shop Eid Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EidCollection;