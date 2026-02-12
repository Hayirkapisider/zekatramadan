import React, { useState } from 'react';
import { MessageCircle, CreditCard, Landmark, ChevronDown, Plus, Minus } from 'lucide-react';

interface CountryData {
  id: number;
  tur: number;
  minKisi: number;
  maxKisi: number | null;
  paketFiyat: number;
  title: string;
  text: string;
  wa: string;
}

const COUNTRIES: Record<string, CountryData> = {
  afganistan: {
    id: 463, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 9000,
    title: "Afganistan Sofra Kur",
    text: "Afganistan’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.<br><strong>Minimum 100 kişi = 9.000 ₺</strong>",
    wa: "Merhaba, Afganistan'da Sofra Kur bağışı yapmak istiyorum."
  },
  suriye: {
    id: 472, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 10000,
    title: "Suriye Sofra Kur",
    text: "Suriye’de en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.<br><strong>Minimum 100 kişi = 10.000 ₺</strong>",
    wa: "Merhaba, Suriye'de Sofra Kur bağışı yapmak istiyorum."
  },
  banglades: {
    id: 705, tur: 7, minKisi: 100, maxKisi: 2000, paketFiyat: 9000,
    title: "Bangladeş Sofra Kur",
    text: "Bangladeş’te 100–2000 kişi arası sıcak yemek ikramında bulunabilirsiniz.<br><strong>Minimum 100 kişi = 9.000 ₺</strong><br><small>Maksimum 2.000 kişi (20 paket) seçilebilir.</small>",
    wa: "Merhaba, Bangladeş’te Sofra Kur bağışı yapmak istiyorum."
  },
  tanzanya: {
    id: 706, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 9000,
    title: "Tanzanya Sofra Kur",
    text: "Tanzanya’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.<br><strong>Minimum 100 kişi = 9.000 ₺</strong>",
    wa: "Merhaba, Tanzanya’da Sofra Kur bağışı yapmak istiyorum."
  },
  uganda: {
    id: 707, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 8000,
    title: "Uganda Sofra Kur",
    text: "Uganda’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.<br><strong>Minimum 100 kişi = 8.000 ₺</strong>",
    wa: "Merhaba, Uganda’da Sofra Kur bağışı yapmak istiyorum."
  },
  cad: {
    id: 708, tur: 7, minKisi: 100, maxKisi: null, paketFiyat: 9000,
    title: "Çad Sofra Kur",
    text: "Çad’da en az 100 kişilik sıcak yemek ikramında bulunabilirsiniz.<br><strong>Minimum 100 kişi = 9.000 ₺</strong>",
    wa: "Merhaba, Çad’da Sofra Kur bağışı yapmak istiyorum."
  }
};

const SofraKurHorizontal: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [qty, setQty] = useState<number>(1);

  // Mock campaign stats
  const campaignRaised = 3450000;
  const campaignGoal = 5000000;
  const campaignPercent = Math.min(100, Math.round((campaignRaised / campaignGoal) * 100));

  const currentData = selectedKey ? COUNTRIES[selectedKey] : null;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
    setQty(1);
  };

  const updateQty = (delta: number) => {
    if (!currentData) return;
    setQty(prev => {
      const newVal = prev + delta;
      if (newVal < 1) return 1;
      
      // Check max limit if exists
      if (currentData.maxKisi) {
        const maxPaket = Math.floor(currentData.maxKisi / currentData.minKisi);
        if (newVal > maxPaket) return maxPaket;
      }
      return newVal;
    });
  };

  const totalAmount = currentData ? qty * currentData.paketFiyat : 0;
  const totalPerson = currentData ? qty * currentData.minKisi : 0;

  const getWaLink = () => {
    if (!currentData) return '#';
    const text = `${currentData.wa} (${totalPerson} kişi, toplam ${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalAmount)})`;
    return `https://wa.me/905523935851?text=${encodeURIComponent(text)}`;
  };

  const handleDonate = () => {
    if (!currentData) return;
    const swal = (window as any).Swal;
    if (swal) {
      swal.fire({
        icon: 'success',
        title: 'Bağış Sepete Eklendi',
        html: `<div class="text-center"><span class="text-brand font-bold text-lg">${currentData.title}</span><br/><span class="text-gray-600 mt-2 block">${qty} Paket (${totalPerson} Kişi)</span><div class="text-accent font-black text-2xl mt-2">${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalAmount)}</div></div>`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'rounded-2xl shadow-xl'
        }
      });
    }
  };

  return (
    <section className="py-8 bg-white border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-xl duration-500">
          
          {/* Left: Image */}
          <div className="md:w-[320px] flex-shrink-0 relative h-[240px] md:h-auto overflow-hidden group">
            <img 
              src="https://cdn.hayirkapisi.org.tr/upload/files/bagis/afrika/cuma-sofralari-kart.jpg" 
              alt="Sofra Kur" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent"></div>
             
             {/* Progress Overlay Mobile/Small on Image */}
             <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90">
                  <span>Hedef: 5 Milyon ₺</span>
                  <span>%{campaignPercent}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
                  <div className="bg-accent h-full rounded-full" style={{ width: `${campaignPercent}%` }}></div>
                </div>
             </div>
          </div>

          {/* Right: Body */}
          <div className="flex-1 p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-start mb-2">
               <h3 className="font-heading font-bold text-2xl text-brand">
                 {currentData ? currentData.title : 'Sofra Kur'}
               </h3>
               {/* Campaign Progress Desktop */}
               <div className="hidden md:block w-48">
                  <div className="flex justify-between text-[10px] font-bold text-brand/50 mb-1 uppercase tracking-wider">
                    <span>Genel Hedef</span>
                    <span>%{campaignPercent}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-accent h-full rounded-full" style={{ width: `${campaignPercent}%` }}></div>
                  </div>
               </div>
            </div>
            
            <div className="text-muted text-sm leading-relaxed mb-6">
              {currentData ? (
                <span dangerouslySetInnerHTML={{ __html: currentData.text }} />
              ) : (
                <>
                  Sofra Kur bağışınızla farklı ülkelerde ihtiyaç sahibi kardeşlerimize sıcak yemek ulaştırabilirsiniz.<br />
                  Aşağıdan ülke seçip kişi sayısını belirleyerek bağışınızı tamamlayabilirsiniz.
                </>
              )}
            </div>

            {/* Inputs Row */}
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Country Select */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[11px] font-bold text-brand mb-1 uppercase tracking-wider">Ülke Seçin</label>
                <div className="relative">
                  <select 
                    value={selectedKey}
                    onChange={handleCountryChange}
                    className="w-full h-[50px] pl-4 pr-10 rounded-full border-2 border-brand text-brand font-bold appearance-none focus:outline-none focus:bg-brand/5 cursor-pointer transition-colors hover:bg-brand/5"
                  >
                    <option value="">Seçiniz</option>
                    {Object.entries(COUNTRIES).map(([key, data]) => (
                      <option key={key} value={key}>{data.title.replace(' Sofra Kur', '')}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand pointer-events-none" size={20} />
                </div>
              </div>

              {/* Conditional Inputs */}
              {currentData && (
                <>
                  {/* Quantity Stepper */}
                  <div className="w-[140px] animate-in fade-in slide-in-from-left-4">
                    <label className="block text-[11px] font-bold text-brand mb-1 uppercase tracking-wider">Paket Sayısı</label>
                    <div className="relative h-[50px] border-2 border-border rounded-lg flex items-center overflow-hidden">
                      <input 
                        type="text" 
                        readOnly 
                        value={qty} 
                        className="w-full h-full text-center font-bold text-xl text-brand bg-transparent focus:outline-none"
                      />
                      <div className="absolute right-1 top-1 bottom-1 w-[28px] flex flex-col gap-0.5">
                        <button 
                          onClick={() => updateQty(1)}
                          className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-brand rounded-[3px] transition-colors"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => updateQty(-1)}
                          className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-brand rounded-[3px] transition-colors"
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="flex-1 min-w-[140px] animate-in fade-in slide-in-from-left-4">
                    <label className="block text-[11px] font-bold text-brand mb-1 uppercase tracking-wider">Toplam</label>
                    <div className="h-[50px] bg-surface border-2 border-border rounded-lg flex items-center justify-center font-black text-xl text-brand">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalAmount)}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            {currentData && (
              <div className="mt-auto animate-in fade-in zoom-in-95">
                <button 
                  onClick={handleDonate}
                  className="w-full bg-brand hover:bg-brand-light text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 mb-3 flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  Bağış Yap
                </button>
                <div className="flex gap-3">
                  <a 
                    href={getWaLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#3AA977] text-[#3AA977] hover:bg-[#3AA977] hover:text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                  <a 
                    href="https://www.hayirkapisi.org.tr/hesap-numaralarimiz"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    <Landmark size={16} />
                    Hesaplar
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SofraKurHorizontal;