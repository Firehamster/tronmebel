import { siteData } from '@/lib/data';

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-20 bg-white/30 backdrop-blur-sm relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6" style={{ color: '#689F38' }}>ЗА НАС</h2>
          <div className="w-32 h-2 mx-auto rounded-full" style={{
            background: 'linear-gradient(135deg, #689F38 0%, #8BC34A 100%)'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <p className="text-xl leading-relaxed text-center font-medium" style={{ color: '#689F38' }}>
              {siteData.company.about}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
