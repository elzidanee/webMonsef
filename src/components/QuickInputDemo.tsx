import React, { useState } from 'react';
import { Mic, Camera, Keyboard, CheckCircle, Sparkles } from 'lucide-react';

export const QuickInputDemo: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'text' | 'voice' | 'scan'>('text');
  const [inputText, setInputText] = useState('Bensin Pertamax 150rb di SPBU Mandiri');
  const [parsedResult, setParsedResult] = useState<{
    name: string;
    amount: number;
    category: string;
    account: string;
  } | null>({
    name: 'Bensin Pertamax',
    amount: 150000,
    category: 'Transportasi',
    account: 'Bank Mandiri',
  });

  const handleSimulateParse = (text: string) => {
    setInputText(text);
    setTimeout(() => {
      if (text.toLowerCase().includes('kopi') || text.toLowerCase().includes('makan')) {
        setParsedResult({
          name: text.split(' ')[0] + ' ' + (text.split(' ')[1] || ''),
          amount: 35000,
          category: 'Makanan & Kuliner',
          account: 'GoPay',
        });
      } else if (text.toLowerCase().includes('bensin') || text.toLowerCase().includes('spbu')) {
        setParsedResult({
          name: 'Bensin Pertamax SPBU',
          amount: 150000,
          category: 'Transportasi',
          account: 'Bank Mandiri',
        });
      } else {
        setParsedResult({
          name: text,
          amount: 85000,
          category: 'Pengeluaran Umum',
          account: 'BCA Savings',
        });
      }
    }, 200);
  };

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="monsef-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <span className="label-sm" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}>
            Efisiensi Tanpa Batas
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Input Transaksi Secepat Kilat
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '12px' }}>
            Lupakan formulir panjang. Pilih metode yang paling nyaman untuk Anda mencatat keuangan harian dalam hitungan detik.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
          className="input-demo-grid"
        >
          {/* Left Column: Feature List & Selector */}
          <div>
            {[
              {
                id: 'text',
                icon: <Keyboard size={24} />,
                title: 'Magic Text Command',
                desc: 'Ketik kalimat alami seperti "Makan siang 35rb GoPay" dan AI Monsef akan mengekstrak nominal serta kategorinya otomatis.',
              },
              {
                id: 'voice',
                icon: <Mic size={24} />,
                title: 'Perintah Suara (Voice Command)',
                desc: 'Cukup ucapkan pengeluaran Anda saat berkendara atau beraktivitas tanpa perlu mengetik sepatah kata pun.',
              },
              {
                id: 'scan',
                icon: <Camera size={24} />,
                title: 'Scan Struk AI (OCR Instant)',
                desc: 'Foto struk belanjaan supermarket atau restoran, sistem OCR AI langsung mengenali total dan rincian barang.',
              },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMode(item.id as any)}
                style={{
                  padding: '24px',
                  borderRadius: '24px',
                  backgroundColor: activeMode === item.id ? 'var(--color-surface-container-low)' : '#ffffff',
                  border: activeMode === item.id ? '1.5px solid var(--color-primary)' : '1px solid #e2e8f0',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    backgroundColor: activeMode === item.id ? 'var(--color-primary)' : 'var(--color-surface-container)',
                    color: activeMode === item.id ? '#ffffff' : 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Interactive Tester Card */}
          <div className="monsef-card monsef-card-featured" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span className="badge-chip badge-primary">
                <Sparkles size={14} />
                <span>Simulasi NLP Engine</span>
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Response &lt; 0.1s</span>
            </div>

            {activeMode === 'text' && (
              <div>
                <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-on-surface)', display: 'block', marginBottom: '8px' }}>
                  Coba Ketik Kalimat Bebas:
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => handleSimulateParse(e.target.value)}
                  placeholder="Contoh: Kopi Janji Jiwa 22rb GoPay"
                  style={{
                    width: '100%',
                    height: '52px',
                    borderRadius: '999px',
                    padding: '0 24px',
                    border: '1.5px solid var(--color-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    marginBottom: '16px',
                  }}
                />

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', alignSelf: 'center' }}>Preset:</span>
                  {[
                    'Kopi Latte 35rb GoPay',
                    'Bensin Pertamax 150rb Mandiri',
                    'Makan Malam Ayam Goreng 45rb',
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSimulateParse(preset)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        backgroundColor: 'var(--color-surface-container)',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        cursor: 'pointer',
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeMode === 'voice' && (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 74, 198, 0.1)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    animation: 'pulseGlow 2s infinite',
                  }}
                >
                  <Mic size={36} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  "Makan Siang Nasi Bebek 40 Ribu Rupee"
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                  Suara terdeteksi & diproses oleh AI Monsef...
                </div>
              </div>
            )}

            {activeMode === 'scan' && (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src="/receipt_scan_mockup.png"
                  alt="Receipt AI Scan Mockup"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                  }}
                />
              </div>
            )}

            {/* Parsing Result Output */}
            {parsedResult && (
              <div
                style={{
                  padding: '20px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--color-surface-container-low)',
                  border: '1px dashed var(--color-primary-fixed-dim)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <CheckCircle size={16} style={{ color: 'var(--color-tertiary)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-tertiary)' }}>
                    Hasil Ekstraksi AI Otomatis:
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                  <div>
                    <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px' }}>Nama Item</span>
                    <div style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>{parsedResult.name}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px' }}>Nominal</span>
                    <div className="num-tabular" style={{ fontWeight: 800, color: 'var(--color-primary)' }}>
                      Rp {parsedResult.amount.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px' }}>Kategori</span>
                    <div style={{ fontWeight: 600 }}>{parsedResult.category}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px' }}>Akun Terdebet</span>
                    <div style={{ fontWeight: 600 }}>{parsedResult.account}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 74, 198, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(0, 74, 198, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 74, 198, 0); }
        }
        @media (max-width: 900px) {
          .input-demo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
