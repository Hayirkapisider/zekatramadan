import React, { useState } from 'react';
import { Users, CheckCircle2 } from 'lucide-react';

const FitreCalculator: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const FITRE_PRICE = 130; // Current Fitre Amount

  const handleDonate = () => {
    const swal = (window as any).Swal;
    if (swal) {
      swal.fire({
        icon: 'success',
        title: 'Fitre Bağışı Eklendi',
        html: `<div class="text-center"><span class="text-brand font-bold text-xl">Fitre Bağışı</span><br/><span class="text-gray-600 mt-2 block">${count} Kişi</span><div class="text-accent font-black text-2xl mt-2">₺${(count * FITRE_PRICE).toLocaleString()}</div></div>`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'rounded-2xl shadow-xl'
        }
      });
    }
  };

  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl text-brand mb-3">Fitre Bağışı</h2>
          <p className="text-muted">2024 yılı için belirlenen asgari fitre bedeli <span className="font-bold text-brand">₺{FITRE_PRICE}</span>'dir.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all hover:shadow-2xl duration-500">
          
          <div className="flex-1 w-full space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                <Users size={16} />
                Kişi Sayısı
              </label>
              <div className="flex items-center gap-4">
                 <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={count} 
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
                />
                <div className="w-16 h-12 flex items-center justify-center border-2 border-brand rounded-lg font-bold text-xl text-brand transition-all">
                  {count}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button 
                  key={n}
                  onClick={() => setCount(n)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
                    count === n ? 'bg-brand text-white scale-110 shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2">
            <div className="text-right">
              <span className="block text-sm text-muted text-center md:text-right mb-1">Toplam Fitre Tutarı</span>
              <div className="text-5xl font-heading font-bold text-accent tracking-tight transition-all">
                ₺{(count * FITRE_PRICE).toLocaleString()}
              </div>
            </div>
            <button 
              onClick={handleDonate}
              className="mt-4 w-full md:w-64 bg-accent hover:bg-accent-hover text-white text-lg font-bold py-4 rounded-xl shadow-xl shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} />
              Fitre Bağışı Yap
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FitreCalculator;