import React from 'react';
import { Zap, BarChart3, Target, Layers, ArrowUpRight } from 'lucide-react';

export const ValuePillars: React.FC = () => {
  const pillars = [
    {
      icon: <Zap size={28} style={{ color: 'var(--color-primary)' }} />,
      title: 'Track',
      tagline: 'Pencatatan Secepat Kilat',
      desc: 'Catat setiap transaksi dengan mudah. Mulai dari manual, perintah suara, hingga scan struk otomatis.',
      bgIcon: 'rgba(0, 74, 198, 0.08)',
    },
    {
      icon: <BarChart3 size={28} style={{ color: 'var(--color-primary)' }} />,
      title: 'Analyze',
      tagline: 'Analisis Grafik Visual',
      desc: 'Pahami pola pengeluaran melalui visualisasi grafik jernih dan wawasan AI untuk keputusan finansial bijak.',
      bgIcon: 'rgba(0, 74, 198, 0.08)',
    },
    {
      icon: <Target size={28} style={{ color: 'var(--color-tertiary)' }} />,
      title: 'Save',
      tagline: 'Target Tabungan Auto-Goal',
      desc: 'Tetapkan target menabung dan pantau kemajuan real-time. Wujudkan impian finansial selangkah demi selangkah.',
      bgIcon: 'rgba(0, 126, 65, 0.1)',
    },
    {
      icon: <Layers size={28} style={{ color: 'var(--color-primary)' }} />,
      title: 'Consolidate',
      tagline: 'Multi Bank & Dompet',
      desc: 'Gabungkan seluruh rekening bank, e-wallet, dan portofolio investasi dalam satu dashboard terpadu.',
      bgIcon: 'rgba(0, 74, 198, 0.08)',
    },
  ];

  return (
    <section id="fitur" style={{ padding: '80px 0', backgroundColor: 'var(--color-background)' }}>
      <div className="monsef-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
          <span
            className="label-sm"
            style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}
          >
            Pilar Finansial Monsef
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Empat Fondasi Kebebasan Finansial Anda
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '12px' }}>
            Dirancang khusus dengan prinsip *Aerated Elegance* untuk memberikan kejernihan visual dan kenyamanan penggunaan sehari-hari.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          className="pillars-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="monsef-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <div>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    backgroundColor: pillar.bgIcon,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    border: '1px solid rgba(0, 74, 198, 0.08)',
                  }}
                >
                  {pillar.icon}
                </div>

                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-primary)',
                    marginBottom: '6px',
                  }}
                >
                  {pillar.title}
                </div>

                <h3
                  className="headline-md"
                  style={{
                    fontSize: '19px',
                    lineHeight: '26px',
                    marginBottom: '10px',
                    color: 'var(--color-on-surface)',
                  }}
                >
                  {pillar.tagline}
                </h3>

                <p
                  className="body-md"
                  style={{
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: 'var(--color-on-surface-variant)',
                  }}
                >
                  {pillar.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                <span>Pelajari Fitur</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
