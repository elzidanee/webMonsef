import React from 'react';
import { UserPlus, Edit3, ShieldAlert, TrendingUp } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Daftar Akun',
      desc: 'Buat akun gratis dan sesuaikan target keuangan Anda dalam waktu kurang dari 2 menit.',
      icon: <UserPlus size={24} />,
    },
    {
      num: '2',
      title: 'Catat Rutin',
      desc: 'Input transaksi dengan mengetik kalimat alami, ucapan suara, atau foto struk.',
      icon: <Edit3 size={24} />,
    },
    {
      num: '3',
      title: 'Pantau Anggaran',
      desc: 'Tetapkan batas per kategori dan terima pengingat ramah sebelum pengeluaran membengkak.',
      icon: <ShieldAlert size={24} />,
    },
    {
      num: '4',
      title: 'Analisis & Nabung',
      desc: 'Lihat grafik perkembangan aset harian Anda dan capai target keuangan lebih cepat.',
      icon: <TrendingUp size={24} />,
    },
  ];

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface-container-low)' }}>
      <div className="monsef-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
          <span className="label-sm" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}>
            Kemudahan Penggunaan
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Cara Kerja Simple
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '12px' }}>
            Mulai atur keuangan Anda dalam 4 langkah mudah tanpa ribet.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="monsef-card"
              style={{
                backgroundColor: '#ffffff',
                padding: '32px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 14px rgba(0, 74, 198, 0.25)',
                }}
              >
                {step.num}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '10px' }}>
                {step.title}
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
