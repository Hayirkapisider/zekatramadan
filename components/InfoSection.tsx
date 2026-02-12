import React from 'react';
import { Gift, Globe, Sparkles } from 'lucide-react';

const InfoSection: React.FC = () => {
  const points = [
    {
      icon: <Gift size={32} />,
      title: "Paylaşmanın Bereketi",
      text: "Paylaşılan her lokma, sofralara bereket; paylaşılan her tebessüm, gönüllere ferahlık getirir."
    },
    {
      icon: <Globe size={32} />,
      title: "İhtiyaç Sahiplerine Ulaşma",
      text: "Dünyanın dört bir yanındaki mazlum coğrafyalara uzanan iyilik eli oluyoruz."
    },
    {
      icon: <Sparkles size={32} />,
      title: "Manevi Kazanç",
      text: "Bu mübarek ayda yapılan her iyilik, kat kat sevapla karşılık bulur ve ruhu arındırır."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-wider text-sm">Neden Bağış?</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand mt-2">Ramazan’da Bağışın Önemi</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {points.map((p, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center text-brand mb-6 shadow-sm">
                {p.icon}
              </div>
              <h3 className="font-bold text-xl text-brand mb-3">{p.title}</h3>
              <p className="text-muted leading-relaxed px-4">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;