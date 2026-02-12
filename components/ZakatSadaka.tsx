import React, { useState } from 'react';
import { Calculator, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

const ZakatSadaka: React.FC = () => {
  // Sadaka Slider State
  const [sadakaIndex, setSadakaIndex] = useState<number>(0);
  const STEPS = [150, 300, 450, 600, 1200, 1500];
  const STOPS = [4.15, 75.06, 145.59, 216.13, 286.67, 357.4];
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val);

  const openZakatCalculator = () => {
    window.Swal.fire({
      title: 'Zekat Hesaplama Formu',
      html: `
        <div class="text-left space-y-4 p-2">
          <p class="text-[11px] text-muted mb-4 italic leading-relaxed">Diyanet İşleri Başkanlığı verileriyle uyumlu zekat hesaplama modülü.</p>
          <div class="space-y-3">
            <div>
              <label class="block text-[11px] font-black text-brand mb-1 uppercase tracking-wider">Nakit ve Banka Mevduatı (₺)</label>
              <input id="z-cash" type="number" class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-brand outline-none transition-all" placeholder="0.00">
            </div>
            <div>
              <label class="block text-[11px] font-black text-brand mb-1 uppercase tracking-wider">Altın ve Gümüş Değeri (₺)</label>
              <input id="z-gold" type="number" class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-brand outline-none transition-all" placeholder="0.00">
            </div>
            <div>
              <label class="block text-[11px] font-black text-brand mb-1 uppercase tracking-wider">Ticari Mallar ve Alacaklar (₺)</label>
              <input id="z-goods" type="number" class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-brand outline-none transition-all" placeholder="0.00">
            </div>
            <div>
              <label class="block text-[11px] font-black text-brand mb-1 uppercase tracking-wider">Borçlar ve Giderler (₺)</label>
              <input id="z-debts" type="number" class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-brand outline-none transition-all" placeholder="0.00">
            </div>
          </div>
          <div id="z-result-box" class="mt-6 p-5 bg-[#f7fbf8] rounded-2xl border-2 border-dashed border-accent/30 hidden animate-in fade-in zoom-in-95">
            <p class="text-[10px] text-brand/60 uppercase font-black tracking-widest mb-1">Hesaplanan Zekat Tutarı</p>
            <p id="z-result-text" class="text-3xl font-heading font-bold text-accent">₺0,00</p>
            <p class="text-[10px] text-muted mt-2">Nisap miktarı üzerinden %2.5 (1/40) oranında hesaplanmıştır.</p>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Hesapla',
      cancelButtonText: 'Kapat',
      didOpen: () => {
        const calculate = () => {
          const cash = parseFloat((document.getElementById('z-cash') as HTMLInputElement).value) || 0;
          const gold = parseFloat((document.getElementById('z-gold') as HTMLInputElement).value) || 0;
          const goods = parseFloat((document.getElementById('z-goods') as HTMLInputElement).value) || 0;
          const debts = parseFloat((document.getElementById('z-debts') as HTMLInputElement).value) || 0;
          
          const total = (cash + gold + goods) - debts;
          const result = total > 0 ? total * 0.025 : 0;
          
          const resultBox = document.getElementById('z-result-box');
          const resultText = document.getElementById('z-result-text');
          if (resultBox && resultText) {
            resultBox.classList.remove('hidden');
            resultText.innerText = formatCurrency(result);
          }
        };
        
        const confirmBtn = window.Swal.getConfirmButton();
        confirmBtn.addEventListener('click', (e: any) => {
           e.preventDefault();
           calculate();
        });
      },
      customClass: {
        popup: 'rounded-3xl border-none shadow-2xl',
        confirmButton: 'bg-brand hover:bg-brand-light text-white font-bold py-4 px-10 rounded-2xl shadow-lg',
        cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 px-10 rounded-2xl'
      }
    });
  };

  return (
    <section className="py-12 bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: ZEKAT CARD */}
          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand/5 rounded-full group-hover:scale-110 transition-transform"></div>
            
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-brand leading-none mb-1">Zekat</h3>
                <span className="text-[10px] font-black text-brand/40 uppercase tracking-widest">Malın Arınması ve Bereket</span>
              </div>
            </div>

            <p className="text-muted text-sm leading-relaxed mb-8">
              Zekatınızı Diyanet uyumlu hesaplama modülümüzle saniyeler içinde belirleyin ve ihtiyaç sahiplerine güvenle ulaştırın.
            </p>

            <div className="mt-auto flex flex-col gap-3">
              <button 
                onClick={openZakatCalculator}
                className="w-full flex items-center justify-center gap-2 border-2 border-brand/10 bg-surface hover:bg-brand/5 text-brand font-bold py-4 rounded-2xl transition-all"
              >
                <Calculator size={20} />
                Zekat Hesapla
              </button>
              <button className="w-full bg-brand hover:bg-brand-light text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand/20 transition-all flex items-center justify-center gap-2 group">
                Zekat Bağışı Yap
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT: SADAKA (SLIDER) CARD */}
          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/5 rounded-full group-hover:scale-110 transition-transform"></div>

            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
                <HeartHandshake size={28} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-brand leading-none mb-1">Sadaka</h3>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">Gazze Acil Yardım (ID:92)</span>
              </div>
            </div>

            <p className="text-muted text-sm leading-relaxed mb-6">
              Küçük bir bağışla Gazze'deki kardeşlerimizin yaralarını sarmaya destek olabilirsiniz. Tutar seçmek için kaydırın.
            </p>

            {/* Slider Logic Integrated into Card */}
            <div className="mb-8">
              <div className="relative w-full h-8 mb-4">
                <svg viewBox="0 0 362 32" preserveAspectRatio="none" className="w-full h-full">
                  <line x1="4.15" y1="17.19" x2="357.89" y2="17.19" stroke="#a8e0b7" strokeWidth="2.5"/>
                  {STOPS.map((s, idx) => (
                    <line key={idx} x1={s} y1="24.6" x2={s} y2="9.78" stroke="#024040" strokeWidth={idx === 0 || idx === 5 ? "3" : "2"} />
                  ))}
                  <line x1="4.15" y1="17.19" x2={STOPS[sadakaIndex]} y2="17.19" stroke="#024040" strokeWidth="2.5"/>
                </svg>
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  step="1" 
                  value={sadakaIndex} 
                  onChange={(e) => setSadakaIndex(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#5ca77b] rounded-full border-2 border-white shadow-md pointer-events-none transition-all duration-200"
                  style={{ left: `calc(${sadakaIndex * 20}% + ${4.15}px - ${sadakaIndex * 2}px)` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-brand/40 uppercase tracking-tighter">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={() => alert(`${formatCurrency(STEPS[sadakaIndex])} Gazze bağışı sepete eklendi!`)}
                className="w-full h-16 bg-gradient-to-b from-[#5ca77b] to-[#4e916a] text-white rounded-2xl font-bold shadow-xl shadow-green-900/10 flex items-center justify-center gap-3 transition-all hover:-translate-y-1"
              >
                <span className="text-2xl font-black">{formatCurrency(STEPS[sadakaIndex])}</span>
                <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold uppercase">Sepete Ekle</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ZakatSadaka;