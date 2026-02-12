import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const FooterCTA: React.FC = () => {
  const handleDonate = () => {
    const swal = (window as any).Swal;
    if (swal) {
      swal.fire({
        icon: 'info',
        title: 'Yönlendiriliyorsunuz...',
        text: 'Online bağış sayfasına yönlendiriliyorsunuz.',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'rounded-2xl shadow-xl'
        }
      });
    }
  };

  return (
    <footer className="bg-brand text-white pt-16 pb-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-heading font-bold text-4xl mb-6">Ramazan’da İyiliğe Ortak Ol</h2>
        <p className="text-brand-light/80 text-lg mb-10 max-w-2xl mx-auto">
          Bağışlarınızla yetimin başını okşayın, mazlumun yüzünü güldürün. Şimdi harekete geçme vakti.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={handleDonate}
            className="w-full sm:w-64 bg-accent hover:bg-accent-hover text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
          >
            <Heart size={20} fill="currentColor" />
            Online Bağış Yap
          </button>
          <button className="w-full sm:w-64 bg-transparent border-2 border-white/20 hover:bg-white/10 text-white text-lg font-bold py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
            <MessageCircle size={20} />
            WhatsApp İletişim
          </button>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <p>© 2024 Hayır Kapısı Derneği. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">KVKK</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCTA;