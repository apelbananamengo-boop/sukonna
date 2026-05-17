/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  ChevronRight,
  ArrowRight,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";

// Types
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        // Map image keys to their actual generated paths
        const mappedData = data.map((p: Product) => {
          let imagePath = "";
          switch (p.image) {
            case "jamdani":
              imagePath = "/src/assets/images/hero_boutique_saree_1779017066457.png";
              break;
            case "salwar":
              imagePath = "/src/assets/images/category_salwar_kameez_1779017087027.png";
              break;
            case "panjabi_blue":
              imagePath = "/src/assets/images/category_panjabi_1779017106168.png";
              break;
            case "handloom":
              imagePath = "/src/assets/images/boutique_vibe_detail_1779017122669.png";
              break;
            case "katan":
              imagePath = "/src/assets/images/katan_saree_luxury_1779019030114.png";
              break;
            case "muslin":
              imagePath = "/src/assets/images/muslin_floral_saree_1779019048336.png";
              break;
            case "panjabi_emerald":
              imagePath = "/src/assets/images/premium_panjabi_emerald_1779019066757.png";
              break;
            default:
              imagePath = "/src/assets/images/boutique_vibe_detail_1779017122669.png";
          }
          return { ...p, image: imagePath };
        });
        setProducts(mappedData);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const categories = ["All", "Saree", "Salwar Kameez", "Panjabi"];
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-sans text-[#2D241E]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8DCC4] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-[#8B4513]">
            <Menu size={24} />
          </button>
          <div className="text-2xl font-serif font-bold tracking-tight text-[#8B4513] uppercase">
            Sukonna <span className="font-light italic text-[#B8860B]">Boutique</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[#5C4033]">
          {["Home", "Collections", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#B8860B] transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="text-[#5C4033] hover:text-[#B8860B] transition-colors relative">
            <ShoppingBag size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B8860B] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#8B4513] text-white p-8 lg:hidden"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)} className="text-white/80">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-serif">
              {["Home", "Collections", "About", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:italic hover:pl-4 transition-all duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="relative h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/src/assets/images/hero_boutique_saree_1779017066457.png" 
              alt="Luxury Boutique" 
              className="w-full h-full object-cover brightness-75 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl px-8 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-[#E8DCC4] mb-4">
                The Essence of Tradition
              </h2>
              <h1 className="text-5xl lg:text-8xl font-serif font-bold text-white leading-tight mb-8">
                Elegance That <br />
                <span className="italic font-light text-[#E8DCC4]">Speaks Volume</span>
              </h1>
              <p className="text-[#E8DCC4]/80 text-lg lg:text-xl max-w-xl mb-10 font-light">
                Discover our curated collection of hand-woven Jamdanis, elegant Salwar sets, and premium Panjabis crafted for the modern visionary.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#B8860B] text-white px-10 py-4 font-bold tracking-widest uppercase text-xs hover:bg-[#8B4513] transition-colors flex items-center gap-2">
                  Shop Collection <ChevronRight size={16} />
                </button>
                <button className="border border-white text-white px-10 py-4 font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all">
                  Our Story
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-24 px-8 lg:px-20 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-[#8B4513] text-sm font-bold tracking-[0.3em] uppercase mb-4">Curated Selections</h2>
              <h3 className="text-4xl lg:text-6xl font-serif">Explore Categories</h3>
            </div>
            <div className="flex gap-4">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${activeCategory === cat ? 'border-[#B8860B] text-[#B8860B]' : 'border-transparent text-[#5C4033]/60'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5EFE6] mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-white text-black p-4 rounded-full hover:bg-[#B8860B] hover:text-white transition-colors"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                    {idx === 0 && (
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-tighter uppercase">
                        New Arrival
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#B8860B] font-bold tracking-[0.2em] uppercase mb-1">{product.category}</p>
                    <h4 className="text-xl font-serif mb-2">{product.name}</h4>
                    <p className="text-[#8B4513] font-medium">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Brand Vibe Section */}
        <section className="bg-[#1A1A1A] text-white py-24 px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative z-10">
                <img 
                  src="/src/assets/images/boutique_vibe_detail_1779017122669.png" 
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-[#B8860B]/30 hidden lg:block" />
              <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 flex flex-col gap-4 hidden lg:flex">
                <div className="p-4 bg-[#B8860B] text-white">
                  <Star fill="currentColor" size={24} />
                </div>
                <div className="p-4 border border-white/20 text-white backdrop-blur-md">
                  <span className="text-xs uppercase tracking-widest vertical-text">Crafted With Love</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-[#B8860B] text-sm font-bold tracking-[0.3em] uppercase mb-6">Our Heritage</h2>
              <h3 className="text-4xl lg:text-7xl font-serif leading-tight mb-8">Authentic <span className="italic">Dhaka</span> Artistry</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-lg">
                Sukonna Boutique is more than just a brand; it's a celebration of Bangladeshi craftsmanship. Every thread is woven with history, every block print tells a story of tradition meeting modernity. We pride ourselves on sourcing the finest silk and cotton, directly supporting local weavers.
              </p>
              <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                <div>
                  <h5 className="text-3xl font-serif text-[#B8860B] mb-2">10k+</h5>
                  <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Happy Customers</p>
                </div>
                <div>
                  <h5 className="text-3xl font-serif text-[#B8860B] mb-2">500+</h5>
                  <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Master Craftsmen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/CTA */}
        <section id="contact" className="py-24 px-8 lg:px-20 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-[#8B4513] text-sm font-bold tracking-[0.3em] uppercase mb-4">Visit Us</h2>
                <h3 className="text-4xl lg:text-6xl font-serif mb-8">Personalized Shopping</h3>
                <p className="text-[#5C4033]/70 text-lg mb-12">
                    Want to see our collection in person or have custom requirements? Message us on WhatsApp or Visit our Boutique in Dhaka.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <a href="https://wa.me/8801700000000" className="bg-[#25D366] text-white px-10 py-5 font-bold tracking-widest uppercase text-xs hover:opacity-90 transition-all flex items-center justify-center gap-3">
                        <Phone size={18} /> WhatsApp Support
                    </a>
                    <a href="https://www.facebook.com/sukonnaboutiques/" className="bg-[#1877F2] text-white px-10 py-5 font-bold tracking-widest uppercase text-xs hover:opacity-90 transition-all flex items-center justify-center gap-3">
                        <Facebook size={18} /> Messenger
                    </a>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F2ED] border-t border-[#E8DCC4] pt-20 pb-10 px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="text-2xl font-serif font-bold tracking-tight text-[#8B4513] uppercase mb-6">
                Sukonna <span className="font-light italic text-[#B8860B]">Boutique</span>
            </div>
            <p className="text-[#5C4033]/60 mb-8 max-w-xs uppercase text-[10px] tracking-widest leading-loose">
                Redefining Bangladeshi traditional wear with a touch of modern luxury and ethnic elegance.
            </p>
            <div className="flex gap-4">
                <a href="#" className="p-3 border border-[#E8DCC4] text-[#8B4513] hover:bg-[#B8860B] hover:text-white transition-all">
                    <Instagram size={20} />
                </a>
                <a href="#" className="p-3 border border-[#E8DCC4] text-[#8B4513] hover:bg-[#B8860B] hover:text-white transition-all">
                    <Facebook size={20} />
                </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8B4513] mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-[#5C4033]/70">
              <li><a href="#home" className="hover:text-[#B8860B]">Home</a></li>
              <li><a href="#collections" className="hover:text-[#B8860B]">Collections</a></li>
              <li><a href="#about" className="hover:text-[#B8860B]">Our Story</a></li>
              <li><a href="#contact" className="hover:text-[#B8860B]">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8B4513] mb-8">Categories</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-[#5C4033]/70">
              <li><a href="#" className="hover:text-[#B8860B]">Silk Sarees</a></li>
              <li><a href="#" className="hover:text-[#B8860B]">Designer Panjabis</a></li>
              <li><a href="#" className="hover:text-[#B8860B]">Festive Kameez</a></li>
              <li><a href="#" className="hover:text-[#B8860B]">Wedding Collection</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8B4513] mb-8">Boutique</h4>
            <ul className="flex flex-col gap-6 text-sm font-medium text-[#5C4033]/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#B8860B] shrink-0" />
                <span>House #12, Road #4, Dhanmondi, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#B8860B] shrink-0" />
                <span>+880 171 234 5678</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#E8DCC4] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest text-[#5C4033]/40 uppercase">
          <p>© 2026 Sukonna Boutique. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
