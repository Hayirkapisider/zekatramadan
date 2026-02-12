import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-brand">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1551041697-854727e02e86?q=80&w=2000&auto=format&fit=crop" 
          alt="Ramadan atmosphere" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/60 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4 backdrop-blur-md">
          🌙 Ramazan 2024
        </span>
        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
          Ramazan’da Paylaş,<br/>Bereket Artsın
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Bu Ramazan, kardeşliğimizi pekiştirelim. Bağışlarınızla ihtiyaç sahiplerinin sofrasına bereket, yüzüne tebessüm olun.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl shadow-green-900/20 transition-transform active:scale-95 flex items-center justify-center gap-2">
            Şimdi Bağış Yap
            <ArrowRight size={20} />
          </button>
          <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white text-lg font-bold px-8 py-4 rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2">
            <MessageCircle size={20} />
            WhatsApp Bilgi
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;