import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah MONSEF aman untuk menyimpan informasi keuangan saya?',
      a: 'Sangat aman. MONSEF menerapkan enkripsi tingkat bank AES-256 bit. Seluruh data sensitif dienkripsi secara lokal di perangkat Anda, dan kami tidak pernah menjual data pribadi kepada pihak ketiga.',
    },
    {
      q: 'Bagaimana cara kerja fitur Magic Text & Input Suara?',
      a: 'Engine AI Monsef dilatih khusus untuk memahami Bahasa Indonesia sehari-hari. Anda cukup mengetik atau menguncapkan "Kopi janji jiwa 22rb gopay" dan sistem akan mendeteksi otomatis kategori (Kuliner), nominal (22.000), dan dompet terdebet.',
    },
    {
      q: 'Apakah aplikasi MONSEF gratis digunakan?',
      a: 'Ya, versi dasar MONSEF gratis selamanya dengan semua fitur utama pencatatan, anggaran, dan laporan visual. Tersedia juga paket MONSEF Premium untuk fitur tingkat lanjut seperti AI receipt scanner tanpa batas dan multi-invoice bisnis.',
    },
    {
      q: 'Apakah saya bisa mengeksport data laporan keuangan ke Excel/PDF?',
      a: 'Tentu saja. Anda dapat mengunduh laporan keuangan bulanan atau tahunan dalam format CSV, Excel, dan PDF kapan saja dengan satu klik.',
    },
    {
      q: 'Apakah MONSEF memerlukan izin akses password bank saya?',
      a: 'Tidak pernah! MONSEF tidak pernah meminta kata sandi atau PIN transaksi bank Anda. Pemantauan transaksi dilakukan melalui pencatatan cerdas dan parse konfirmasi aman tanpa akses login perbankan.',
    },
  ];

  return (
    <section id="faq" style={{ padding: '80px 0', backgroundColor: 'var(--color-surface-container-low)' }}>
      <div className="monsef-container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="label-sm" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}>
            Pertanyaan Populer
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Tanya Jawab (FAQ)
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '8px' }}>
            Temukan jawaban lengkap mengenai keamanan, fitur, dan penggunaan MONSEF.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  boxShadow: isOpen ? 'var(--shadow-level-1)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '17px',
                    color: 'var(--color-on-surface)',
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                      marginLeft: '16px',
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 24px 24px 24px', color: 'var(--color-on-surface-variant)', lineHeight: '1.6', fontSize: '15px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
