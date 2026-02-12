import React, { useEffect } from 'react';

// Declare Swal type for TypeScript
declare global {
  interface Window {
    Swal: any;
    hkCopyText: (text: string) => void;
    hkStop: (e: any) => boolean;
    hkStopBubble: (e: any) => boolean;
    __hkToastT: any;
  }
}

const TrustSection: React.FC = () => {

  useEffect(() => {
    // Define helper functions globally for the SweetAlert HTML content to access
    window.hkStop = (e: any) => {
      try{ if(e){ e.preventDefault(); e.stopPropagation(); } }catch(_){}
      return false;
    };
    window.hkStopBubble = (e: any) => window.hkStop(e);

    const hkShowToast = (msg: string) => {
      let el = document.getElementById('hk-mini-toast');
      if(!el){
        el = document.createElement('div');
        el.id = 'hk-mini-toast';
        el.className = 'hk-mini-toast';
        document.body.appendChild(el);
      }
      el.textContent = msg || 'Kopyalandı';
      el.classList.add('show');
      clearTimeout(window.__hkToastT);
      window.__hkToastT = setTimeout(()=>el.classList.remove('show'), 1100);
    };

    const hkCopyFallback = (text: string, cb: () => void) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly','');
      ta.style.position='fixed';
      ta.style.top='-9999px';
      document.body.appendChild(ta);
      ta.select();
      try{ document.execCommand('copy'); }catch(e){}
      document.body.removeChild(ta);
      cb && cb();
    };

    window.hkCopyText = (text: string) => {
      const ok = () => hkShowToast('Kopyalandı');
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(ok).catch(()=>hkCopyFallback(text, ok));
      }else{
        hkCopyFallback(text, ok);
      }
    };
  }, []);

  const openTrustPopup = () => {
    const HK_GOOGLE_REVIEWS = [
      {
        name: "Merve Karaduman",
        stars: 5,
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocLIM4tneRhsPy4S3cF68g8SpY3MJx2zzJTZiiTViUI2Hj_M9A=w72-h72-p-rp-mo-br100",
        url: "https://maps.app.goo.gl/xmJfPu5ef6cgsdbm7",
        text: "Dün akşam bağışta bulunduk bugün mesajı geldi biz çok memnun kaldık video olarakta gönderildi Rabbim herkesi böyle iyi insanlarla karşılaştırsın."
      },
      {
        name: "Fethi Aslanmirza",
        stars: 5,
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocIWlb1oWXBaOXnjJL3BiR1_874frDp4-iA6ZsU_D0gttGJMdA=w72-h72-p-rp-mo-br100",
        url: "https://maps.app.goo.gl/X3HPA1i8KpHU59D6A",
        text: "Tüm mazlum coğrafyaya  sizin vesilesiyle yardım gidiyor Allah sizlerden de, yardım edenlerden de razı olsun, uzun ömürlü olması dileğiyle Allah'a emânet olunuz"
      },
      {
        name: "İzzet Arslan",
        stars: 5,
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocKsSLTfIrd4PQClZltjxEOknYkheW6HWvKFreCDno1nM5u7BQ=w72-h72-p-rp-mo-br100",
        url: "https://maps.app.goo.gl/LY338ZtQNUaKWm4z8",
        text: "Çok mutlu oldum teşekkür ederim o güzel insanlara küçük bir dokunuş dünyalara bedel sizlere vesile olduğunuz için çook teşekkür ederim ALLAH razı olsun sizden rabbim bizleri razı olduğu güzel ahlaklı kullarından eylesin inşaALLAH amin"
      }
    ];

    const hkPlusBoxSVG = () => `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2"></rect>
        <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;

    const hkEDvletSVG = () => `
      <span class="edv-ico" aria-hidden="true">
        <svg viewBox="0 0 269.24 205.87" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <g fill="currentColor" fill-rule="evenodd">
            <path d="M217.48,0v.17c25.1,1.41,45.2,8.77,50.58,29.82,3.05,11.92-.31,24.3-4.54,33.32-4.48,9.54-9.69,17-15.87,24.24-12.25,14.34-27.06,26.06-43.43,36.97-16.15,10.77-34.12,19.94-53.02,27.21-9.04,3.48-19.45,6.91-30.87,9.42-10.74,2.36-24.03,4.17-35.75,1.57-10.99-2.44-19.49-8.04-21.1-19.19-1.74-12.02,4.21-21.99,9.59-29.83,10.99-15.98,26.2-27.55,43.43-36.97,17.23-9.42,37.31-17.31,63.65-16.22-21.52,2.36-36.22,8.77-50.58,18.14-12.47,8.14-27.36,20.34-31.91,36.63-3.19,11.41,2.1,19.03,9.94,22.67,7.92,3.68,20.03,3.92,30.17,2.97,20.38-1.92,37.61-9.23,51.63-16.92,21.7-11.91,40.79-28.09,53.72-49.36,4.36-7.17,8.29-15.3,10.12-24.07,5-23.96-6.88-37.28-23.9-42.55-17.35-5.38-42.76-2.61-60.52,2.09-35.87,9.51-64.42,26.86-89.82,47.44-12.3,9.97-23.79,21.55-34.18,34.36-10.35,12.76-19.59,26.73-25.64,42.9-3.27,8.77-5.69,18.65-4.36,29.3,3.55,28.44,33.42,36.96,66.97,35.06,42.6-2.43,74.72-17.11,103.95-33.14-26.49,16.44-58.57,31.68-96.1,37.67-42.09,6.72-86.77-.98-89.64-40.29v-6.97c2.88-26.51,15.48-46,28.25-62.44,13.64-17.56,29.08-31.36,46.22-44.3,17.15-12.95,36.48-24.04,57.73-32.79C153.74,8.05,177.92,1.37,205.8,0h11.69"/>
            <path d="M228.47,49.15c-2.09,5-5.37,10.32-7.85,15.52,6.66.83,14.16.83,21.1,1.4-8.66,3.02-17.49,5.88-26.33,8.72-2.94,5.61-5.86,11.23-8.72,16.92-2.79-3.55-4.88-7.79-7.67-11.33-8.62,2.66-16.92,5.63-25.46,8.37,6.97-5.12,14.08-10.11,21.1-15.17-2.13-3.68-4.71-6.92-6.8-10.64,4.97.38,9.85.57,14.82.87,1.61.1,3.51.61,4.89.35,1.41-.27,3.84-2.54,5.41-3.66,5.23-3.76,10.52-7.74,15.52-11.34"/>
          </g>
        </svg>
      </span>`;

    const hkStarsHTML = (n: number) => {
      const full = Math.max(0, Math.min(5, Number(n)||0));
      let s = '';
      for(let i=1;i<=5;i++){
        const fill = i<=full ? '#F5B301' : '#D8E3E3';
        s += `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="${fill}" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>`;
      }
      return `<div class="hk-stars" aria-label="${full} yıldız">${s}</div>`;
    };

    const hkReviewsHTML = () => {
      const cards = HK_GOOGLE_REVIEWS.map(r => `
        <a href="${r.url || '#'}"
           target="_blank"
           rel="noopener"
           class="hk-review hk-review-link"
           onclick="hkStopBubble(event)">
          <div class="hk-review-avatar">
            <div class="bg-white p-1 rounded-circle border shadow">
              <img src="${r.avatar}" alt="${r.name}">
            </div>
          </div>
          <div class="hk-review-name">${r.name}</div>
          ${hkStarsHTML(r.stars)}
          <p class="hk-review-text">${r.text}</p>
        </a>
      `).join('');

      return `
        <div class="hk-reviews-head">
          <div class="ttl">Google’dan Öne Çıkan Yorumlar</div>
        </div>
        <div class="hk-reviews-grid">${cards}</div>
      `;
    };

    const googleAll = "https://maps.app.goo.gl/siNfUDU6Cv44diu17";

    window.Swal.fire({
      title: 'Güven ve Doğrulama',
      icon: 'info',
      width: 980,
      confirmButtonText: 'Kapat',
      showCloseButton: true,
      focusConfirm: false,
      allowOutsideClick: true,
      customClass:{ popup:'hk-swal' },
      html: `
        <div class="hk-trust-wrap">
          <div class="hk-trust-banner">
            <strong>Resmî doğrulama:</strong>
            E-Devlet üzerinden derneğimizi iki ayrı sorgu ile kontrol edebilirsiniz. (Noktalama işaretlerine dikkat edilmesi gerekmektedir.)
          </div>

          <div class="hk-trust-grid">
            <div class="hk-trust-card">
              <h4>Dernek Sorgulama</h4>

              <div class="hk-chips">
                <div class="hk-chip">
                  <span class="lbl">Ad:</span>
                  <span class="val">HAYIR KAPISI İNSANİ YARDIM</span>
                  <button class="yn-icon-btn" type="button"
                    onclick="hkCopyText('HAYIR KAPISI İNSANİ YARDIM'); return hkStop(event);"
                    aria-label="Kopyala">
                    ${hkPlusBoxSVG()}
                  </button>
                </div>

                <div class="hk-chip">
                  <span class="lbl">Kütük No:</span>
                  <span class="val">34-258-186</span>
                  <button class="yn-icon-btn" type="button"
                    onclick="hkCopyText('34-258-186'); return hkStop(event);"
                    aria-label="Kopyala">
                    ${hkPlusBoxSVG()}
                  </button>
                </div>
              </div>

              <div class="hk-actions">
                <a class="hk-btn-mini e-devlet" href="https://www.turkiye.gov.tr/icisleri-ddb-dernek-sorgulama" target="_blank" rel="noopener">
                  ${hkEDvletSVG()}
                  <span>E-Devlet’te Aç</span>
                </a>
              </div>
            </div>

            <div class="hk-trust-card">
              <h4>Yardım Toplama Yetkisi Sorgulama</h4>

              <div class="hk-chips">
                <div class="hk-chip">
                  <span class="lbl">Faaliyet No:</span>
                  <span class="val">34.2025.3307</span>
                  <button class="yn-icon-btn" type="button"
                    onclick="hkCopyText('34.2025.3307'); return hkStop(event);"
                    aria-label="Kopyala">
                    ${hkPlusBoxSVG()}
                  </button>
                </div>

                <div class="hk-chip">
                  <span class="lbl">Yetkili:</span>
                  <span class="val">Lokman Öztop</span>
                  <button class="yn-icon-btn" type="button"
                    onclick="hkCopyText('Lokman Öztop'); return hkStop(event);"
                    aria-label="Kopyala">
                    ${hkPlusBoxSVG()}
                  </button>
                </div>
              </div>

              <div class="hk-actions">
                <a class="hk-btn-mini e-devlet" href="https://www.turkiye.gov.tr/icisleri-ddb-yardim-toplama-yetki-sorgu" target="_blank" rel="noopener">
                  ${hkEDvletSVG()}
                  <span>E-Devlet’te Aç</span>
                </a>
              </div>
            </div>
          </div>

          ${hkReviewsHTML()}

          <div class="hk-actions" style="margin-top:10px;">
            <a class="hk-btn-mini primary" href="${googleAll}" target="_blank" rel="noopener">Tüm Yorumları Gör</a>
          </div>
        </div>
      `
    });
  };

  return (
    <>
    <style>{`
  #hk-trust-scope,
  .hk-swal{
    --hk:#024040;
    --hk2:#035353;
    --line:#e6efef;
    --soft:#f5fafa;
    --text:#1c2a2a;
    --shadow:0 9px 20px rgba(0,0,0,.06);
  }

  #hk-trust-scope .hk-trust-btn2{
    width:100%; max-width:620px; margin:0 auto; padding:16px 18px;
    border-radius:16px; border:1px solid rgba(255,255,255,.18);
    background:linear-gradient(135deg,#024040,#035353);
    color:#fff; display:flex; align-items:center; gap:14px; cursor:pointer;
    box-shadow:0 14px 34px rgba(2,64,64,.20);
    transition:all .15s ease; text-align:left;
  }
  #hk-trust-scope .hk-trust-btn2:hover{ transform:translateY(-1px); box-shadow:0 18px 44px rgba(2,64,64,.26); }

  #hk-trust-scope .hk-trust-btn2 .hk-ic{
    width:44px; height:44px; border-radius:14px; background:rgba(255,255,255,.16);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  #hk-trust-scope .hk-trust-btn2__text{
    display:flex; flex-direction:column; gap:4px; flex:1;
    font-size:15.5px; font-weight:800; line-height:1.25; letter-spacing:.2px;
  }
  #hk-trust-scope .hk-trust-btn2__text small{ font-size:12.5px; font-weight:500; opacity:.85; line-height:1.3; }
  #hk-trust-scope .hk-trust-btn2 .hk-arrow{
    width:36px; height:36px; border-radius:12px; background:rgba(255,255,255,.14);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }

  .hk-swal .swal2-popup{ border-radius:18px !important; padding:18px !important; }
  .hk-swal .swal2-title{ color:var(--hk) !important; font-weight:900 !important; }

  .hk-swal .swal2-actions{ margin-top:14px !important; }
  .hk-swal .swal2-confirm{
    background:linear-gradient(135deg,var(--hk),var(--hk2)) !important;
    color:#fff !important;
    border:none !important;
    border-radius:999px !important;
    padding:12px 22px !important;
    font-weight:900 !important;
    box-shadow:0 12px 24px rgba(2,64,64,.18) !important;
  }
  .hk-swal .swal2-confirm:focus{ box-shadow:0 0 0 3px rgba(2,64,64,.20) !important; }

  .hk-swal .hk-trust-wrap{ text-align:left; color:var(--text); }
  .hk-swal .hk-trust-banner{
    display:flex; gap:10px; padding:12px; border-radius:14px;
    background:var(--soft); border:1px solid var(--line);
    font-size:13.5px; line-height:1.45;
  }
  .hk-swal .hk-trust-banner strong{ color:var(--hk); }

  .hk-swal .hk-trust-grid{
    display:grid; grid-template-columns:1fr; gap:12px; margin-top:12px;
  }
  @media(min-width:720px){ .hk-swal .hk-trust-grid{ grid-template-columns:1fr 1fr; } }

  .hk-swal .hk-trust-card{
    background:#fff; border:1px solid var(--line); border-radius:16px;
    padding:14px; box-shadow:var(--shadow);
  }
  .hk-swal .hk-trust-card h4{
    margin:0 0 10px; font-size:14px; font-weight:900; color:var(--hk);
  }

  .hk-swal .hk-chips{ display:flex; gap:8px; margin-bottom:10px; flex-wrap:wrap; }
  .hk-swal .hk-chip{
    padding:8px 10px;
    border-radius:999px;
    background:var(--soft);
    border:1px solid var(--line);
    font-size:11px;
    font-weight:700;
    display:flex;
    align-items:center;
    gap:10px;
    min-width:0;
    white-space:nowrap;
    overflow:hidden;
  }
  .hk-swal .hk-chip .lbl{ color:#5c6c6c; font-weight:800; flex:0 0 auto; }
  .hk-swal .hk-chip .val{
    min-width:0;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }

  @media(min-width:720px){
    .hk-swal .hk-chips{ flex-wrap:nowrap; }
    .hk-swal .hk-chip{ flex:1 1 0; }
  }

  .hk-swal .hk-chip .yn-icon-btn{
    border:none;
    background:#eef3f3;
    color:#024040;
    border-radius:8px;
    width:27px !important;
    height:27px !important;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    transition:.2s;
    flex:0 0 auto;
    margin-left:auto;
  }
  .hk-swal .hk-chip .yn-icon-btn:hover{ background:#024040; color:#fff; }
  .hk-swal .hk-chip .yn-icon-btn svg{ width:17px !important; height:17px !important; }

  .hk-swal .hk-actions{ display:flex; gap:10px; flex-wrap:wrap; }
  .hk-swal .hk-btn-mini{
    flex:1; min-width:160px; padding:11px 12px; border-radius:14px;
    border:1.5px solid var(--hk); background:#fff; color:var(--hk);
    font-weight:800; font-size:13.5px; text-decoration:none; text-align:center;
  }
  .hk-swal .hk-btn-mini.primary{ background:var(--hk); color:#fff; }

  .hk-swal .hk-reviews-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:12px; }
  .hk-swal .hk-reviews-head .ttl{ margin:0; font-size:14px; font-weight:900; color:var(--hk); }
  .hk-swal .hk-reviews-grid{ display:grid; grid-template-columns:1fr; gap:10px; margin-top:10px; }
  @media(min-width:720px){ .hk-swal .hk-reviews-grid{ grid-template-columns:1fr 1fr 1fr; } }

  .hk-swal .hk-review{ text-align:center; border:1px solid var(--line); background:#fff; border-radius:16px; padding:12px 12px 10px; box-shadow:var(--shadow); }
  .hk-swal .hk-review-avatar{ display:flex; justify-content:center; margin-bottom:8px; }
  .hk-swal .hk-review-avatar img{ width:48px; height:48px; border-radius:50%; object-fit:cover; }
  .hk-swal .hk-review-name{ font-weight:900; font-size:13.5px; color:#1f2b2b; margin-bottom:6px; }
  .hk-swal .hk-stars{ display:flex; gap:2px; align-items:center; justify-content:center; margin-bottom:8px; }
  .hk-swal .hk-stars svg{ width:16px; height:16px; }
  .hk-swal .hk-review-text{ font-size:12.8px; color:#2a3a3a; line-height:1.45; margin:0; }
  .hk-swal .hk-review-link{ display:block; text-decoration:none !important; color:inherit !important; }
  .hk-swal .hk-review-link:hover{ transform:translateY(-1px); }

  .hk-swal .hk-btn-mini.e-devlet{
    background:#eb212e !important;
    border-color:#eb212e !important;
    color:#fff !important;
    display:flex !important;
    align-items:center !important;
    justify-content:center !important;
    gap:10px !important;
  }
  .hk-swal .hk-btn-mini.e-devlet:hover{ background:#c61c27 !important; border-color:#c61c27 !important; }

  .hk-swal .hk-btn-mini.e-devlet .edv-ico{
    width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; flex:0 0 22px;
  }
  .hk-swal .hk-btn-mini.e-devlet .edv-ico svg{ width:100%; height:100%; display:block; overflow:visible; }

  .hk-swal .hk-actions .hk-btn-mini.primary{ background:#5ca77b !important; border-color:#5ca77b !important; }

  .hk-mini-toast{
    position:fixed; left:50%; bottom:22px; transform:translateX(-50%);
    background:#0f2f2f; color:#fff; padding:10px 14px; border-radius:999px;
    font-weight:800; font-size:13px; box-shadow:0 14px 30px rgba(0,0,0,.18);
    z-index:999999; opacity:0; transition:opacity .18s ease, transform .18s ease;
    pointer-events:none;
  }
  .hk-mini-toast.show{ opacity:1; transform:translateX(-50%) translateY(-4px); }
    `}</style>
    
    <div className="pb-12 bg-surface relative z-20">
      <div id="hk-trust-scope" className="px-4">
        <button type="button" className="hk-trust-btn2" onClick={openTrustPopup}>
          <span className="hk-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8.5 12.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          <span className="hk-trust-btn2__text">
            Bize Nasıl Güvenebilirsiniz?
            <small>Resmi İzinlerimizi ve Bağışcı Yorumlarını İncelemek İçin Tıklayınız.</small>
          </span>

          <span className="hk-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
    </>
  );
};

export default TrustSection;