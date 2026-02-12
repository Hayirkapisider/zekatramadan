import React, { useState } from 'react';
import { Calculator, ShieldCheck, UserPlus, Heart, ArrowRight } from 'lucide-react';

const ZakatFidye: React.FC = () => {
  // Fidye State
  const [fidyeCount, setFidyeCount] = useState<number>(30); // Default to full Ramadan (30 days) often preferred
  const FIDYE_UNIT = 130;
  
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
            <button onclick="window.location.href='https://www.hayirkapisi.org.tr/bagis/zekat'" class="w-full mt-4 bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand-light transition-colors shadow-lg active:scale-95 transform">
              Bu Tutarla Bağış Yap
            </button>
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
        window.Swal.getConfirmButton().addEventListener('click', (e: any) => { e.preventDefault(); calculate(); });
      },
      customClass: {
        popup: 'rounded-3xl border-none shadow-2xl',
        confirmButton: 'bg-accent hover:bg-accent-hover text-white font-bold py-4 px-10 rounded-2xl shadow-lg',
        cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 px-10 rounded-2xl'
      }
    });
  };

  const handleFidyeDonate = () => {
    const swal = (window as any).Swal;
    if (swal) {
      swal.fire({
        icon: 'success',
        title: 'Fidye Bağışı Eklendi',
        html: `<div class="text-center"><span class="text-brand font-bold text-xl">Fidye Bağışı</span><br/><span class="text-gray-600 mt-2 block">${fidyeCount} Gün/Kişi</span><div class="text-accent font-black text-2xl mt-2">${formatCurrency(fidyeCount * FIDYE_UNIT)}</div></div>`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'rounded-2xl shadow-xl'
        }
      });
    }
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ZEKAT CARD */}
          <div className="bg-white rounded-3xl p-8 border border-border flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-brand leading-none mb-1">Zekat</h3>
                <span className="text-[10px] font-black text-brand/40 uppercase tracking-widest">Malın Arınması ve Bereket</span>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Zekatınızı Diyanet uyumlu modülümüzle saniyeler içinde belirleyin. Hesaplama sonucunda bağışınızı güvenle gerçekleştirebilirsiniz.
            </p>
            <div className="mt-auto">
              <button 
                onClick={openZakatCalculator}
                className="w-full bg-brand hover:bg-brand-light text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3 group"
              >
                <Calculator size={22} />
                Zekat Hesapla ve Bağış Yap
                <ArrowRight size={20} className="opacity-60 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* FIDYE CARD */}
          <div className="bg-white rounded-3xl p-8 border border-border flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Heart size={28} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-brand leading-none mb-1">Fidye</h3>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">2024 Fidye Bedeli: ₺{FIDYE_UNIT}</span>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Oruç tutmaya gücü yetmeyenler için fidye bedeli, bir günlük fitre miktarı olan <strong>₺{FIDYE_UNIT}</strong> üzerinden hesaplanmaktadır.
            </p>

            {/* Quick Select Buttons */}
            <div className="flex gap-2 mb-6">
              {[1, 10, 30].map(val => (
                <button
                  key={val}
                  onClick={() => setFidyeCount(val)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    fidyeCount === val 
                    ? 'bg-accent text-white shadow-md' 
                    : 'bg-surface border border-border text-brand hover:bg-gray-100'
                  }`}
                >
                  {val} Gün
                </button>
              ))}
            </div>

            <div className="flex flex-row gap-4 mb-6">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[10px] font-black text-brand/40 uppercase tracking-widest">Gün / Kişi Sayısı</label>
                <input 
                  type="number" 
                  min="1"
                  value={fidyeCount}
                  onChange={(e) => setFidyeCount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full h-14 border-2 border-brand/10 rounded-xl text-center font-black text-brand text-xl outline-none focus:border-accent bg-surface transition-colors focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[10px] font-black text-brand/40 uppercase tracking-widest">Toplam Tutar</label>
                <div className="w-full h-14 bg-accent text-white flex items-center justify-center rounded-xl font-black text-xl shadow-inner">
                  {formatCurrency(fidyeCount * FIDYE_UNIT)}
                </div>
              </div>
            </div>

            <button 
              onClick={handleFidyeDonate}
              className="mt-auto w-full bg-accent hover:bg-accent-hover text-white font-bold py-5 rounded-2xl shadow-xl shadow-green-900/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3"
            >
              <UserPlus size={22} />
              Fidye Bağışı Yap
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ZakatFidye;