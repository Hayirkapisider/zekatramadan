import React from 'react';
import { Calculator, ShieldCheck } from 'lucide-react';

const ZakatSection: React.FC = () => {
  const openZakatCalculator = () => {
    window.Swal.fire({
      title: 'Zekat Hesaplama',
      html: `
        <div class="text-left space-y-4 p-2">
          <p class="text-xs text-muted mb-4 italic">Lütfen elinizdeki varlıkların değerini Türk Lirası cinsinden giriniz.</p>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-brand mb-1">Nakit Para ve Banka Mevduatı (₺)</label>
              <input id="z-cash" type="number" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand outline-none" placeholder="0">
            </div>
            <div>
              <label class="block text-xs font-bold text-brand mb-1">Altın ve Ziynet Eşyası Değeri (₺)</label>
              <input id="z-gold" type="number" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand outline-none" placeholder="0">
            </div>
            <div>
              <label class="block text-xs font-bold text-brand mb-1">Ticari Mallar ve Alacaklar (₺)</label>
              <input id="z-goods" type="number" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand outline-none" placeholder="0">
            </div>
            <div>
              <label class="block text-xs font-bold text-brand mb-1">Borçlar (Düşülecek Tutar) (₺)</label>
              <input id="z-debts" type="number" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand outline-none" placeholder="0">
            </div>
          </div>
          <div id="z-result-box" class="mt-6 p-4 bg-surface rounded-xl border border-dashed border-brand/20 hidden">
            <p class="text-xs text-brand/60 uppercase font-black">Tahmini Zekat Tutarınız</p>
            <p id="z-result-text" class="text-3xl font-heading font-bold text-accent">₺0,00</p>
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
            resultText.innerText = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(result);
          }
        };
        
        // Add listener to the confirm button
        const confirmBtn = window.Swal.getConfirmButton();
        confirmBtn.addEventListener('click', (e: any) => {
           e.preventDefault();
           calculate();
        });
      },
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'bg-brand hover:bg-brand-light text-white font-bold py-3 px-8 rounded-full',
        cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-8 rounded-full'
      }
    });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-brand rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 text-accent font-bold mb-4">
              <ShieldCheck size={24} />
              <span className="uppercase tracking-widest text-xs">Arınma ve Bereket</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Zekat Bağışı</h2>
            <p className="text-white/70 max-w-lg mb-0">
              Varlıklarınızı zekatla bereketlendirin. İhtiyaç sahiplerine ulaşacak zekatlarınızla toplumsal dayanışmaya katkıda bulunun.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={openZakatCalculator}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-2xl transition-all backdrop-blur-sm"
            >
              <Calculator size={20} />
              Zekat Hesapla
            </button>
            <button className="bg-accent hover:bg-accent-hover text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-green-900/20 transition-all flex items-center justify-center gap-2">
              Zekat Bağışı Yap
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZakatSection;