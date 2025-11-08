import { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import ServiceCard from '@/components/ui/ServiceCard';
import ProjectsGallery from "@/components/ui/ProjectsGallery";
import ProductCard from '@/components/ui/ProductCard';
import ProjectCard from '@/components/ui/ProjectCard';
import AboutSection from '@/components/ui/AboutSection';
import ContactSection from '@/components/ui/ContactSection';
import FAQSection from '@/components/ui/FAQSection';
import Footer from '@/components/ui/Footer';
import ProjectsCarousel from "@/components/ui/ProjectsCarousel";
import { Button } from '@/components/ui/button';
import { siteData } from '@/lib/data';
import { motion } from 'framer-motion';


export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const modules = import.meta.glob('@/assets/projects/*.{jpg,JPG,jpeg,png}', {
    eager: true,
    import: 'default',
    query: '?url',
  }) as Record<string, string>;

  const projectImages = Object.values(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((url, i) => ({ src: url, title: `Проект ${i + 1}` }));


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: `linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 20%, #A5D6A7 40%, #8BC34A 60%, #689F38 80%, #4CAF50 100%)`
    }}>
      
      
      <div 
  className="absolute inset-0 z-0"
  style={{ background: `linear-gradient(135deg, #7FB95A 0%, #9FD37A 50%, #BEE6A0 100%)` }}
/>

<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
  style={{ backgroundImage: `url('...')`, transform: `translateY(${scrollY * 0.5}px)`, opacity: 0.7 }}
/>

<div
  className="absolute inset-0 z-0"
  style={{ background: `linear-gradient(135deg, rgba(127,185,90,0.35) 0%, rgba(159,211,122,0.28) 50%, rgba(190,230,160,0.2) 100%)` }}
/>

<div
  className="absolute inset-0 z-0"
  style={{ background: `radial-gradient(60% 40% at 50% 45%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)` }}
/>

      {/* Floating Emerald Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-4 h-4 bg-emerald-300/20 rounded-full blur-sm"
          style={{ top: '10%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-6 h-6 bg-emerald-400/15 rounded-full blur-sm"
          style={{ top: '20%', right: '15%' }}
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute w-3 h-3 bg-emerald-200/25 rounded-full blur-sm"
          style={{ top: '60%', left: '20%' }}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            opacity: [0.25, 0.6, 0.25]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute w-5 h-5 bg-emerald-500/10 rounded-full blur-sm"
          style={{ top: '80%', right: '25%' }}
          animate={{
            y: [0, 20, 0],
            x: [0, -12, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-emerald-300/30 rounded-full blur-sm"
          style={{ top: '40%', right: '5%' }}
          animate={{
            y: [0, -18, 0],
            x: [0, 8, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/*<Header/>  removing for now*/}

      
      {/* Hero Section */}
      <section id="home" className="scroll-mt-24 relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Brand Green Background Gradient (warmer & slightly lighter) */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #7FB95A 0%, #9FD37A 50%, #BEE6A0 100%)`
          }}
        />
        
        {/* Furniture Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 0.7
          }}
        />
        
        {/* Lighter Brand Overlay for Better Photo Visibility */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, rgba(127, 185, 90, 0.35) 0%, rgba(159, 211, 122, 0.28) 50%, rgba(190, 230, 160, 0.2) 100%)`
        }} />

        {/* Soft radial highlight behind title for warmth & readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 40% at 50% 45%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)`
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className={`text-6xl md:text-8xl font-black mb-8 transition-all duration-1500 transform ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}>
              <span className="text-white drop-shadow-2xl">
                {siteData.company.name}
              </span>
            </h1>
            <p className={`text-2xl md:text-3xl text-white mb-16 leading-relaxed font-bold drop-shadow-lg transition-all duration-1500 delay-300 transform ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
              {siteData.company.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-24 py-20 bg-white/90 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl font-black mb-6" 
              style={{ color: '#689F38' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              НАШИТЕ УСЛУГИ
            </motion.h2>
            <motion.div 
              className="w-32 h-2 mx-auto rounded-full" 
              style={{
                background: 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)'
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p 
              className="text-xl mt-6 max-w-2xl mx-auto font-semibold" 
              style={{ color: '#689F38' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Предлагаме пълен спектър от услуги за вашия дом и офис
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {siteData.services.map((service, index) => (
              <div
                key={service.id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="scroll-mt-24 py-20 bg-white/70 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6" style={{ color: '#689F38' }}>НАШИТЕ ПРОДУКТИ</h2>
            <div className="w-32 h-2 mx-auto rounded-full" style={{
              background: 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)'
            }}></div>
            <p className="text-xl mt-6 max-w-2xl mx-auto font-semibold" style={{ color: '#689F38' }}>
              Качествени мебели, създадени с внимание към детайла
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {siteData.products.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6" style={{ color: '#689F38' }}>НАШИТЕ ПРОЕКТИ</h2>
            <div className="w-32 h-2 mx-auto rounded-full" style={{
              background: 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)'
            }}></div>
            <p className="text-xl mt-6 max-w-2xl mx-auto font-semibold" style={{ color: '#689F38' }}>
              Реализирани проекти, които говорят за нашето качество
            </p>
          </div>        
   <ProjectsCarousel images={projectImages} height={520} />
  </div>
</section>


      {/* About / FAQ / Contact */}
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

