import React from 'react';

const VisualSection: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-0">
      <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group">
        <img 
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop" 
          alt="Helping hands" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-center md:text-left">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
            Bir İyilik,<br/>Bin Tebessüm
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-xl">
            Ramazan ayı, paylaşmanın ve yardımlaşmanın zirveye ulaştığı aydır. Küçük bir yardımın, büyük bir mutluluğa dönüşmesine vesile olun.
          </p>
          <button className="bg-white text-brand font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            İyilik Hareketine Katıl
          </button>
        </div>
      </div>
    </section>
  );
};

export default VisualSection;