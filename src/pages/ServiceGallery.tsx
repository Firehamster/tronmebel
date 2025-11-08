import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/button';
import { siteData } from '@/lib/data';

export default function ServiceGallery() {
  const { slug } = useParams();
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const service = siteData.services.find(s => s.slug === slug);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!service) {
    return <div>Услугата не е намерена</div>;
  }

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(180deg, #689F38 0%, #8BC34A 30%, #AED581 60%, #C8E6C9 80%, #E8F5E8 100%)`
    }}>
      {/*<Header/>  removing for now*/}
      
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${service.image}')`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, rgba(104, 159, 56, 0.8) 0%, rgba(139, 195, 74, 0.7) 50%, rgba(174, 213, 129, 0.6) 100%)`
        }} />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-32 h-32 rounded-full blur-xl"
            style={{
              background: 'rgba(139, 195, 74, 0.3)',
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)`,
            }}
          />
          <div 
            className="absolute top-40 right-20 w-24 h-24 rounded-full blur-xl"
            style={{
              background: 'rgba(174, 213, 129, 0.3)',
              transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.1}px)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center mb-8 px-6 py-3 rounded-full text-white font-bold transition-all duration-300 hover:scale-105" style={{
              background: 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)'
            }}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Назад към началото
            </Link>
            
            <h1 className={`text-6xl md:text-8xl font-black mb-8 transition-all duration-1500 transform ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}>
              <span className="text-white drop-shadow-2xl">
                {service.title}
              </span>
            </h1>
            
            <p className={`text-2xl md:text-3xl text-white mb-16 leading-relaxed font-bold drop-shadow-lg transition-all duration-1500 delay-300 transform ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6" style={{ color: '#689F38' }}>
              ГАЛЕРИЯ
            </h2>
            <div className="w-32 h-2 mx-auto rounded-full" style={{
              background: 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)'
            }}></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.gallery.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <img 
                  src={image} 
                  alt={`${service.title} проект ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'linear-gradient(135deg, rgba(104, 159, 56, 0.8) 0%, rgba(139, 195, 74, 0.6) 100%)'
                }}>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-bold">Проект {index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
