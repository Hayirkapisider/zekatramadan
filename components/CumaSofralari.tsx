import React, { useState } from 'react';
import { MessageCircle, CreditCard, Landmark, Info } from 'lucide-react';

interface CardProps {
  id: string;
  title: string;
  unitPrice: number;
  image: string;
  activity: string;
  description: string;
  raised: number;
  goal: number;
}

const FoodCard: React.FC<CardProps> = ({ id, title, unitPrice, image, activity, description, raised, goal }) => {
  const [qty, setQty] = useState<number>(25);
  const [mode, setMode] = useState<'pack' | 'other'>('pack');

  const packages = [5, 10, 15, 25, 50, 100];
  const total = qty * unitPrice;
  const percent = Math.min(100, Math.round((raised / goal) * 100));

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);

  const getWaLink = () => {
    const text = `Merhaba, ${activity} için destek vermek istiyorum. (${qty} kişi, toplam ${formatCurrency(total)})`;
    return `https://wa.me/905523935851?text=${encodeURIComponent(text)}`;
  };

  const handleDonate = () => {
    const swal = (window as any).Swal;
    if (swal) {
      swal.fire({
        icon: 'success',
        title: 'Bağış Sepete Eklendi',
        html: `<div class="text-center"><span class="text-brand font-bold text-lg">${title}</span><br/><span class="text-gray-600 mt-2 block">${qty} Kişi için</span><div class="text-accent font-black text-2xl mt-2">${formatCurrency(total)}</div></div>`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'rounded-2xl shadow-xl'
        }
      });
    } else {
      alert(`Bağışınız sepete eklendi: ${title} - ${qty} Kişi`);
    }
  };

  return (
    <div className="bg-white border border-border rounded-[20px] shadow-lg overflow-hidden flex flex-col max-w-[460px] w-full mx-auto transition-all hover:shadow-xl group">
      <div className="h-[220px] relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-4 left-4 bg-brand/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          Ramazan 2026
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading font-bold text-2xl text-brand mb-2">{title}</h3>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[11px] font-bold text-brand/60 mb-1 uppercase tracking-wider">
            <span>₺{raised.toLocaleString('tr-TR')} Toplandı</span>
            <span>%{percent}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-accent h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${percent}%` }}
            >
               <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: description }} />

        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-black text-brand/40 uppercase tracking-widest mb-2 block">Yemek İkramı:</span>
            <div className="grid grid-cols-3 gap-2">
              {packages.map((p) => (
                <button
                  key={p}
                  onClick={() => { setQty(p); setMode('pack'); }}
                  className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                    mode === 'pack' && qty === p 
                    ? 'bg-accent border-accent text-white shadow-md scale-105' 
                    : 'bg-white border-brand/10 text-brand hover:border-brand/30 hover:bg-gray-50'
                  }`}
                >
                  {p} Kişi
                </button>
              ))}
              <button
                onClick={() => setMode('other')}
                className={`py-3 rounded-xl font-bold text-sm transition-all border-2 border-dashed col-span-3 ${
                  mode === 'other' 
                  ? 'bg-brand border-brand text-white shadow-md' 
                  : 'bg-white border-brand/20 text-brand hover:bg-brand/5'
                }`}
              >
                Diğer Tutar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-brand/40 uppercase">Kişi Sayısı</label>
              <input 
                type="number" 
                value={qty} 
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 0))}
                readOnly={mode === 'pack'}
                className="w-full h-12 bg-surface border-2 border-border rounded-xl text-center font-black text-brand text-lg focus:border-brand outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-brand/40 uppercase">Toplam</label>
              <div className="w-full h-12 bg-brand text-white flex items-center justify-center rounded-xl font-black text-lg shadow-inner">
                {formatCurrency(total)}
              </div>
            </div>
          </div>

          <button 
            onClick={handleDonate}
            className="w-full bg-brand hover:bg-brand-light text-white font-black py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
          >
            <CreditCard size={18} />
            Bağış Yap
          </button>

          <div className="grid grid-cols-2 gap-3">
            <a href={getWaLink()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-2 border-accent text-accent font-bold py-3 rounded-xl text-xs hover:bg-accent/5 transition-colors">
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <button className="flex items-center justify-center gap-2 border-2 border-brand/20 text-brand font-bold py-3 rounded-xl text-xs hover:bg-brand/5 transition-colors">
              <Landmark size={16} />
              Hesaplar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CumaSofralari: React.FC = () => {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-4xl text-brand">Ramazan Sofraları</h2>
          <p className="text-muted mt-2">Kardeşlik sofralarımızı Gazze ve Afrika'da kuruyoruz.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FoodCard 
            id="825"
            title="Afrika Yemek - Ramazan 2026"
            unitPrice={80}
            image="https://cdn.hayirkapisi.org.tr/upload/files/bagis/kandil/kandil-sayfa-gorsel-afrika.jpg"
            activity="Afrika Yemek Bağışı"
            description="Ramazan’ın bereketinde Afrika’daki ihtiyaç sahibi kardeşlerimizin sofrasına sıcak yemek ulaştırıyoruz. <strong>1 kişi 80 ₺</strong> katkı ile iyiliğe ortak olabilirsiniz."
            raised={124500}
            goal={500000}
          />
          <FoodCard 
            id="831"
            title="Gazze Yemek - Ramazan 2026"
            unitPrice={150}
            image="https://cdn.hayirkapisi.org.tr/upload/files/bagis/kandil/kandil-sayfa-gorsel-gazze.jpg"
            activity="Gazze Yemek Bağışı"
            description="Ramazan’ın rahmetinde Gazze’deki mazlum kardeşlerimize sıcak yemek ulaştırıyoruz. <strong>1 kişi 150 ₺</strong> destek ile iyiliğe ve berekete ortak olabilirsiniz."
            raised={845000}
            goal={1500000}
          />
        </div>
      </div>
    </section>
  );
};

export default CumaSofralari;