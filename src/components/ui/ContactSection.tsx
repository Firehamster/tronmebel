import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteData } from "@/lib/data";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapControls = useAnimation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          mapControls.start({ opacity: 1, scale: 1, transition: { duration: 0.8 } });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [mapControls]);

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-24 text-white relative overflow-hidden scroll-mt-24"
      style={{
        background: 'linear-gradient(135deg, #9FD37A 0%, #7FB95A 35%, #3F8F3A 75%, #2F6F2C 100%)',
        clipPath: 'polygon(0 4%, 100% 0%, 100% 100%, 0% 100%)'
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/office.jpg')] bg-cover bg-center opacity-15" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">

        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            КОНТАКТИ
          </motion.h2>
        </div>

        {/* Contact Info Grid */}
        <div className="max-w-5xl w-full mx-auto">
          <div className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

              {/* Address */}
              <Card className="bg-white/20 border-white/40 backdrop-blur-md shadow-xl ring-1 ring-white/30 transition-all hover:bg-white/25">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <MapPin className="h-12 w-12 text-white" />
                  <div>
                    <p className="text-white font-bold text-xl mb-2">АДРЕС</p>
                    <p className="text-white/90 text-lg break-words">
                      {siteData.company.contact.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="bg-white/20 border-white/40 backdrop-blur-md shadow-xl ring-1 ring-white/30 transition-all hover:bg-white/25">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <a href={`tel:${siteData.company.contact.phone.replace(/\s+/g, "")}`}>
                    <Phone className="h-12 w-12 text-white" />
                  </a>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">ТЕЛЕФОН</p>
                    <a
                      href={`tel:${siteData.company.contact.phone}`}
                      className="text-white/90 text-lg underline underline-offset-4"
                    >
                      {siteData.company.contact.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="bg-white/20 border-white/40 backdrop-blur-md shadow-xl ring-1 ring-white/30 transition-all hover:bg-white/25">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <a href={`mailto:${siteData.company.contact.email}`}>
                    <Mail className="h-12 w-12 text-white" />
                  </a>
                  <div>
                    <p className="text-white font-bold text-xl mb-2">EMAIL</p>
                    <a
                      href={`mailto:${siteData.company.contact.email}`}
                      className="text-white/90 text-lg underline underline-offset-4 break-all"
                    >
                      {siteData.company.contact.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>

        {/* Map with pin for: обл. София, село Мировяне, ул. Индустриален път 4 */}
        <div className="w-full max-w-5xl mx-auto mt-12 h-[420px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 relative z-10">
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            // place-search embed (no API key needed)
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              "обл. София, село Мировяне, ул. Индустриален път 4"
            )}&hl=bg&output=embed`}
            title="ТРОН МЕБЕЛ — обл. София, с. Мировяне, ул. Индустриален път 4"
          />s
        </div>

        {/* Social Media Section */}
        <div className="w-full max-w-4xl mx-auto mt-16 flex flex-col items-center">
          <motion.h3
            className="text-2xl sm:text-3xl font-semibold mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Последвайте ни в социалните мрежи
          </motion.h3>

          {/* ✅ TWO CARD LAYOUT (Facebook + Instagram) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

            {/* Facebook Card */}
            <Card className="bg-white/20 border-white/40 backdrop-blur-md shadow-xl ring-1 ring-white/30">
              <CardContent className="p-8 text-center space-y-4">
                <h4 className="text-xl font-semibold text-white mb-2">Facebook</h4>
                <p className="text-white/90 text-lg">
                  Следете нашите най-нови проекти и актуализации
                </p>
                <a
                  href="https://www.facebook.com/people/%D0%A2%D1%80%D0%BE%D0%BD-%D0%9C%D0%B5%D0%B1%D0%B5%D0%BB/100063679471780/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Facebook
                </a>
              </CardContent>
            </Card>

            {/* Instagram Card */}
            <Card className="bg-white/20 border-white/40 backdrop-blur-md shadow-xl ring-1 ring-white/30">
              <CardContent className="p-8 text-center space-y-4">
                <h4 className="text-xl font-semibold text-white mb-2">Instagram</h4>
                <p className="text-white/90 text-lg">
                  Вижте нашите последни реализации и идеи
                </p>
                <a
                  href="https://www.instagram.com/tron.mebell?igsh=cHRudXRkOXFmeGs1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-all"
                >
                  Instagram
                </a>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </motion.section>
  );
}
