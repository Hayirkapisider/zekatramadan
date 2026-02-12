import React from 'react';
import { Menu, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white">
            <Heart fill="white" size={20} />
          </div>
          <span className="font-heading font-bold text-2xl text-brand tracking-tight">HAYIR KAPISI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <a href="#" className="hover:text-brand transition-colors">Ana Sayfa</a>
          <a href="#projects" className="hover:text-brand transition-colors">Projeler</a>
          <a href="#about" className="hover:text-brand transition-colors">Hakkımızda</a>
          <a href="#contact" className="hover:text-brand transition-colors">İletişim</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 text-brand">
            <Menu size={24} />
          </button>
          <button className="hidden md:block bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-accent/20">
            Bağış Yap
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;