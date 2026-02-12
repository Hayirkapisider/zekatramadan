import React, { useState } from 'react';

const SadakaSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const STEPS = [150, 300, 450, 600, 1200, 1500];
  const STOPS = [4.15, 75.06, 145.59, 216.13, 286.67, 357.4];
  
  const currentAmount = STEPS[index];
  const fillX2 = STOPS[index];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val);

  return (
    <section className="py-8 bg-surface">
      <div className="max-w-5xl mx-auto px-4">
        <style>{`
          .hk-mini {
            --dark: #024040;
            --green: #5ca77b;
            --green2: #4e916a;
            --track: #a8e0b7;
            --h: 28px;
          }
          .hk-mini .range {
            appearance: none;
            background: transparent;
            cursor: pointer;
            width: 100%;
            height: var(--h);
          }
          .hk-mini .range::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--green);
            border: none;
            margin-top: -2px;
          }
          .hk-mini .range::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--green);
            border: none;
          }
        `}</style>

        <div className="hk-mini">
          <div className="flex flex-col md:flex-row items-center gap-6 p-5 border border-[#e6f0ef] rounded-2xl bg-[#f7fbf8] shadow-sm">
            <p className="flex-1 text-brand font-bold text-base md:text-lg leading-snug">
              Küçük bir bağışla Gazze Acil Yardım’a destek olmak ister misiniz?
            </p>

            <div className="relative flex-1 min-w-[280px] w-full h-[32px]">
              <svg 
                viewBox="0 0 362 32" 
                preserveAspectRatio="none" 
                className="absolute inset-0 w-full h-full block"
              >
                <line x1="4.15" y1="17.19" x2="357.89" y2="17.19" stroke="#a8e0b7" strokeWidth="2"/>
                <line x1="4.15" y1="24.6"  x2="4.15" y2="9.78"  stroke="#024040" strokeWidth="3"/>
                <line x1="75.06" y1="24.6"  x2="75.06" y2="9.78"  stroke="#024040" strokeWidth="2"/>
                <line x1="145.59" y1="24.6" x2="145.59" y2="9.78" stroke="#024040" strokeWidth="2"/>
                <line x1="216.13" y1="24.6" x2="216.13" y2="9.78" stroke="#024040" strokeWidth="2"/>
                <line x1="286.67" y1="24.6" x2="286.67" y2="9.78" stroke="#024040" strokeWidth="2"/>
                <line x1="357.4" y1="23.41" x2="357.4" y2="8.59" stroke="#024040" strokeWidth="3"/>
                <line x2={fillX2} x1="4.15" y1="17.19" y2="17.19" stroke="#024040" strokeWidth="2" />
              </svg>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="1" 
                value={index} 
                onChange={(e) => setIndex(parseInt(e.target.value))}
                className="range absolute inset-0 z-10"
              />
            </div>

            <button 
              onClick={() => alert(`${formatCurrency(currentAmount)} Gazze Acil Yardım bağışınız sepete eklendi!`)}
              className="w-full md:w-auto min-w-[180px] h-14 bg-gradient-to-b from-[#5ca77b] to-[#4e916a] text-white rounded-full font-bold shadow-lg shadow-green-900/10 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <span className="font-black">{formatCurrency(currentAmount)}</span> Ekle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SadakaSlider;