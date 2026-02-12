import React, { useState, useEffect } from 'react';
import { MessageCircle, CreditCard, ChevronDown, Plus, Minus } from 'lucide-react';
import { CountryData } from '../types';

const COUNTRIES: Record<string, CountryData> = {
  afganistan: {
    id: 463, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 9000,
    title: "Afganistan Sofra Kur",
    text: "Afganistan’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.",
    wa: "Merhaba, Afganistan'da Sofra Kur bağışı yapmak istiyorum."
  },
  suriye: {
    id: 472, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 10000,
    title: "Suriye Sofra Kur",
    text: "Suriye’de en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.",
    wa: "Merhaba, Suriye'de Sofra Kur bağışı yapmak istiyorum."
  },
  banglades: {
    id: 705, tur: 7, minKisi: 100, maxKisi: 2000, paketFiyat: 9000,
    title: "Bangladeş Sofra Kur",
    text: "Bangladeş’te 100–2000 kişi arası sıcak yemek ikramında bulunabilirsiniz.",
    wa: "Merhaba, Bangladeş’te Sofra Kur bağışı yapmak istiyorum."
  },
  tanzanya: {
    id: 706, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 9000,
    title: "Tanzanya Sofra Kur",
    text: "Tanzanya’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.",
    wa: "Merhaba, Tanzanya’da Sofra Kur bağışı yapmak istiyorum."
  },
  uganda: {
    id: 707, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 8000,
    title: "Uganda Sofra Kur",
    text: "Uganda’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.",
    wa: "Merhaba, Uganda’da Sofra Kur bağışı yapmak istiyorum."
  },
  cad: {
    id: 708, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 9000,
    title: "Çad Sofra Kur",
    text: "Çad’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.",
    wa: "Merhaba, Çad’da Sofra Kur bağışı yapmak istiyorum."
  }
};

const FeaturedCampaign: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [currentData, setCurrentData] = useState<CountryData | null>(null);

  useEffect(() => {
    if (selectedCountry && COUNTRIES[selectedCountry]) {
      setCurrentData(COUNTRIES[selectedCountry]);
      setQty(1);
    } else {
      setCurrentData(null);
    }
  }, [selectedCountry]);

  const handleIncrement = () => {
    if (!currentData) return;
    if (currentData.maxKisi) {
      const currentPeople = (qty + 1) * currentData.minKisi;
      if (currentPeople > currentData.maxKisi) return;
    }
    setQty(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) setQty(prev => prev - 1);
  };

  const calculateTotal = () => {
    if (!currentData) return 0;
    return qty * currentData.paketFiyat;
  };

  const totalPeople = currentData ? qty * currentData.minKisi : 0;
  const totalPrice = calculateTotal();

  const getWhatsappLink = () => {
    if (!currentData) return '#';
    const text = `${currentData.wa} (${totalPeople} kişi, toplam ₺${totalPrice.toLocaleString('tr-TR')})`;
    return `https://wa.me/905523935851?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="pt-8 pb-12 bg-surface">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border">
          {/* Left Visual Area */}
          <div className="md:w-[400px] relative h-64 md:h-auto flex-shrink-0">
             <img 
              src="https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1000&auto=format&fit=crop" 
              alt="Sofra Kur" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white z-10">
              <span className="bg-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Ramazan 2024</span>
              <h2 className="text-2xl font-heading font-bold drop-shadow-lg">Bir Sofra Da Sen Kur</h2>
            </div>
          </div>

          {/* Right Interactive Area */}
          <div className="flex-1 p-6 md:p-10 flex flex-col">
            <h3 className="font-heading font-bold text-3xl text-brand mb-3">
              {currentData ? currentData.title : 'Sofra Kur Bağışı'}
            </h3>
            <p className="text-muted text-sm md:text-base mb-8 leading-relaxed max-w-xl">
              {currentData ? currentData.text : 'Bu mübarek ayda kardeşlik sofralarımızı büyütüyoruz. Bir ülke seçin ve kaç kişiye iftar ulaştırmak istediğinizi belirleyin.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-brand/60 uppercase tracking-widest">ÜLKE SEÇİMİ</label>
                <div className="relative">
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full h-14 pl-4 pr-10 rounded-xl border-2 border-brand/10 text-brand font-bold bg-white appearance-none focus:outline-none focus:border-brand transition-colors cursor-pointer"
                  >
                    <option value="">Seçiniz</option>
                    {Object.entries(COUNTRIES).map(([key, data]) => (
                      <option key={key} value={key}>{data.title.replace(' Sofra Kur', '')}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand pointer-events-none" size={20} />
                </div>
              </div>

              {currentData && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-black text-brand/60 uppercase tracking-widest">PAKET ADEDİ</label>
                  <div className="relative flex items-center h-14 border-2 border-brand/10 rounded-xl overflow-hidden bg-white">
                    <button onClick={handleDecrement} className="w-12 h-full flex items-center justify-center text-brand hover:bg-gray-50 active:bg-gray-100 transition-colors">
                      <Minus size={18} strokeWidth={3} />
                    </button>
                    <input 
                      type="text" 
                      readOnly 
                      value={qty} 
                      className="flex-1 text-center font-black text-xl text-brand h-full focus:outline-none bg-transparent"
                    />
                    <button onClick={handleIncrement} className="w-12 h-full flex items-center justify-center text-brand hover:bg-gray-50 active:bg-gray-100 transition-colors">
                      <Plus size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              )}

              {currentData && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300 delay-75">
                  <label className="text-[10px] font-black text-brand/60 uppercase tracking-widest">TOPLAM TUTAR</label>
                  <div className="h-14 rounded-xl bg-brand text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-brand/20">
                    ₺{totalPrice.toLocaleString('tr-TR')}
                  </div>
                </div>
              )}
            </div>

            {currentData ? (
              <div className="flex flex-col gap-4 mt-auto animate-in fade-in zoom-in-95 duration-500">
                <button className="w-full bg-accent hover:bg-accent-hover text-white font-black py-5 rounded-2xl shadow-xl shadow-accent/20 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 text-lg">
                  <CreditCard size={22} strokeWidth={2.5} />
                  HEMEN BAĞIŞ YAP
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a 
                    href={getWhatsappLink()} 
                    target="_blank" 
                    rel="noreferrer"
                    className="border-2 border-[#25D366] text-[#25D366] bg-white hover:bg-[#25D366] hover:text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle size={20} />
                    WhatsApp ile Sor
                  </a>
                  <a 
                    href="https://www.hayirkapisi.org.tr/hesap-numaralarimiz" 
                    target="_blank" 
                    rel="noreferrer"
                    className="border-2 border-brand/20 text-brand bg-white hover:bg-brand hover:text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    Banka Hesapları
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-auto p-6 bg-surface border-2 border-dashed border-border rounded-2xl text-center text-muted font-medium flex items-center justify-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand/30 animate-pulse"></div>
                Lütfen bağış yapmak istediğiniz ülkeyi seçiniz.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaign;