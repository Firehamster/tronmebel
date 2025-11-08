import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { siteData } from '@/lib/data';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="scroll-mt-24 py-20 bg-white/10 backdrop-blur-sm relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6" style={{ color: '#689F38' }}>
            ЧЕСТО ЗАДАВАНИ ВЪПРОСИ
          </h2>
          <div className="w-32 h-2 mx-auto rounded-full" style={{
            background: 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)'
          }}></div>
          <p className="text-xl mt-6 max-w-2xl mx-auto font-semibold" style={{ color: '#689F38' }}>
            Отговори на най-често задаваните въпроси от нашите клиенти
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {siteData.faq.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between transition-all duration-300"
                style={{ 
                  background: openItems.includes(item.id) 
                    ? 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)' 
                    : 'transparent'
                }}
              >
                <h3 className={`text-xl font-bold transition-colors duration-300 ${
                  openItems.includes(item.id) ? 'text-white' : ''
                }`} style={{ 
                  color: openItems.includes(item.id) ? 'white' : '#689F38' 
                }}>
                  {item.question}
                </h3>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="h-6 w-6 text-white" />
                ) : (
                  <ChevronDown className="h-6 w-6" style={{ color: '#689F38' }} />
                )}
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-8 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-lg leading-relaxed" style={{ color: '#689F38' }}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
