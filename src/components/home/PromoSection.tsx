import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw, Phone } from "lucide-react";

const PromoSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping on orders above ৳2000"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% authentic premium fabrics"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "7-day hassle-free return policy"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Customer support when you need it"
    }
  ];

  return (
    <section className="py-16 bg-gradient-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-secondary-foreground rounded-full" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-secondary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-secondary-foreground rotate-45" />
      </div>

      <div className="section-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-secondary-foreground"
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
              Experience Premium
              <span className="text-accent block">Panjabi Fashion</span>
            </h2>
            <p className="text-lg mb-6 text-secondary-foreground/90">
              Join thousands of satisfied customers who trust us for authentic, 
              high-quality Panjabi wear that combines tradition with modern comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/categories">
                <Button className="btn-gold">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-secondary-foreground/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-secondary-foreground/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;