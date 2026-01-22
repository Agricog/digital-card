import { useState } from 'react';

const CARD_DATA = {
  name: 'Mick Stevenson',
  title: 'Founder',
  company: 'Autaimate',
  tagline: 'Building software for underserved industries',
  email: 'mick@autaimate.com',
  phone: '+44 7501 439406',
  website: 'https://autaimate.com',
  location: 'United Kingdom',
  photo: '/mick_headshot.jpg',
  logo: '/autaimate_logo.png',
  socials: {
    linkedin: 'https://www.linkedin.com/in/mickstevenson/',
  },
  products: [
    { name: 'TradeCalcs', desc: 'BS 7671 calculators for electricians', url: 'https://tradecalcs.com' },
    { name: 'EquipSafety', desc: 'QR-based safety compliance', url: 'https://equipsafety.com' },
    { name: 'DetailRecon', desc: 'AI reconnaissance for close protection', url: 'https://detailrecon.com' },
  ],
};

function generateVCard(): string {
  const { name, title, company, email, phone, website, location } = CARD_DATA;
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `ORG:${company}`,
    `TITLE:${title}`,
    `TEL;TYPE=CELL:${phone}`,
    `EMAIL:${email}`,
    `URL:${website}`,
    `ADR;TYPE=WORK:;;;;;;${location}`,
    'END:VCARD',
  ].join('\n');
}

function downloadVCard() {
  const vcard = generateVCard();
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${CARD_DATA.name.replace(/\s+/g, '_')}_${CARD_DATA.company}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function BusinessCard() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    downloadVCard();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-24 bg-gradient-to-br from-stone-800 to-stone-900 relative">
            <div className="absolute -bottom-12 left-6">
              {CARD_DATA.photo ? (
                <img
                  src={CARD_DATA.photo}
                  alt={CARD_DATA.name}
                  className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {CARD_DATA.name.split(' ').map(n => n.charAt(0)).join('')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-16 pb-6 px-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                {CARD_DATA.name}
              </h1>
              <p className="text-stone-600 font-medium">
                {CARD_DATA.title} · {CARD_DATA.company}
              </p>
              {CARD_DATA.tagline && (
                <p className="text-stone-500 text-sm mt-1">{CARD_DATA.tagline}</p>
              )}
            </div>

            <div className="space-y-3 mb-6">
              
                href={`mailto:${CARD_DATA.email}`}
                className="flex items-center gap-3 text-stone-700 hover:text-amber-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-amber-50 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm">{CARD_DATA.email}</span>
              </a>

              
                href={`tel:${CARD_DATA.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-stone-700 hover:text-amber-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-amber-50 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm">{CARD_DATA.phone}</span>
              </a>

              
                href={CARD_DATA.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-700 hover:text-amber-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-amber-50 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-sm">{CARD_DATA.website.replace('https://', '')}</span>
              </a>

              {CARD_DATA.socials.linkedin && (
                
                  href={CARD_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-stone-700 hover:text-amber-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-amber-50 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Save Contact
                </>
              )}
            </button>
          </div>
        </div>

        {CARD_DATA.products.length > 0 && (
          <div className="mt-4 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
              Projects
            </h2>
            <div className="space-y-3">
              {CARD_DATA.products.map((product) => (
                
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-stone-900 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm text-stone-500">{product.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-stone-300 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-3 mt-6">
          {CARD_DATA.logo && (
            <img src={CARD_DATA.logo} alt={CARD_DATA.company} className="h-8 object-contain" />
          )}
          <p className="text-stone-400 text-xs">
            © {new Date().getFullYear()} {CARD_DATA.company}
          </p>
        </div>
      </div>
    </div>
  );
}
