import React, { useState } from 'react';
import { FAQItem } from '../types';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Using the Ramadan questions (as per original request) but applying the provided styling/structure.
  const questions: FAQItem[] = [
    { question: "Fitre bedeli bu yıl ne kadar?", answer: "<p>2024 yılı için Diyanet İşleri Başkanlığı tarafından belirlenen asgari fitre bedeli 130 TL'dir.</p>" },
    { question: "Zekatımı nasıl hesaplayabilirim?", answer: "<p>Sahip olduğunuz altın, döviz ve nakit birikiminizin toplam değeri nisap miktarına ulaşıyorsa, bu toplamın %2.5'ini (1/40) zekat olarak vermelisiniz.</p>" },
    { question: "Bağış sonrası makbuz alabilir miyim?", answer: "<p>Evet, yaptığınız tüm bağışlar için sistemimize kayıtlı e-posta adresinize veya telefonunuza dijital makbuz gönderilmektedir.</p>" },
    { question: "Kurban veya yemek bağışlarım için video gönderiliyor mu?", answer: "<p>Özellikle yurt dışı kurban ve yemek organizasyonlarında, isminizin okunduğu video kayıtları tarafınıza WhatsApp üzerinden iletilmektedir.</p>" },
    { question: "Bağışım ne zaman ihtiyaç sahibine ulaşır?", answer: "<p>Acil yardımlar ve yemek ikramları genellikle 24-48 saat içerisinde, diğer yardımlar ise proje takvimine göre en kısa sürede ulaştırılır.</p>" },
    { question: "Hangi ödeme yöntemlerini kullanabilirim?", answer: "<p>Kredi kartı, banka havalesi/EFT ve online ödeme sistemleri ile güvenli bir şekilde bağış yapabilirsiniz.</p>" },
  ];

  return (
    <section style={{ marginBottom: '50px' }} className="py-16 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <h2 style={{ color: '#024040', fontSize: '22px', marginBottom: '18px' }} className="font-heading font-bold text-center md:text-left">
          Sıkça Sorulan Sorular
        </h2>

        <div className="accordion accordion-wrapper" id="accordion1">
          {questions.map((item, key) => (
            <div 
              key={key} 
              className="card accordion-item bg-white mb-1 border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="card-header" id={`heading${key}`}>
                <button 
                  className={`accordion-button w-full text-left px-6 py-4 font-bold text-gray-800 flex items-center justify-between focus:outline-none ${openIndex === key ? 'bg-gray-50 text-brand' : 'bg-white'}`}
                  type="button"
                  onClick={() => setOpenIndex(openIndex === key ? null : key)}
                  aria-expanded={openIndex === key}
                  aria-controls={`collapse-${key}`}
                >
                  {item.question}
                  <span className={`transform transition-transform duration-200 ${openIndex === key ? 'rotate-180' : ''}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="#024040"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div 
                id={`collapse-${key}`}
                className={`accordion-collapse collapse overflow-hidden transition-all duration-300 ease-in-out ${openIndex === key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                aria-labelledby={`heading${key}`}
              >
                <div 
                  className="card-body px-6 py-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;