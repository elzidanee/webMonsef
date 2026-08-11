import React from 'react';
import { ShieldCheck, Lock, Key, EyeOff, CheckCircle2 } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  return (
    <section id="keamanan" style={{ padding: '90px 0', backgroundColor: 'var(--color-inverse-surface)', color: '#ffffff' }}>
      <div className="monsef-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="security-grid"
        >
          {/* Left Column Text */}
          <div>
            <div
              className="badge-chip"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                marginBottom: '20px',
                padding: '8px 16px',
                fontSize: '13px',
              }}
            >
              <ShieldCheck size={16} style={{ color: '#4ade80' }} />
              <span>Privasi & Keamanan Tingkat Tinggi</span>
            </div>

            <h2 className="display-lg" style={{ fontSize: '38px', lineHeight: '46px', color: '#ffffff', marginBottom: '20px' }}>
              Keamanan Setara Bank. <br />
              Data Anda Milik Anda.
            </h2>

            <p className="body-lg" style={{ color: '#c3c6d7', marginBottom: '36px' }}>
              Kami menggunakan enkripsi end-to-end untuk melindungi data finansial Anda. Akses aplikasi diamankan dengan PIN lokal dan biometrik di perangkat Anda.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                'Enkripsi AES-256 Bit & TLS 1.3 standar perbankan global.',
                'Data disimpan secara lokal & terenkripsi di perangkat Anda.',
                'Tidak ada penjualan data atau pelacakan iklan pihak ketiga.',
                'Proteksi Biometrik (Face ID & Sidik Jari) bawaan.',
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(74, 222, 128, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4ade80',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <span style={{ fontSize: '15px', color: '#eef0ff', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Graphic / Cards */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '32px',
                padding: '40px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(0, 74, 198, 0.3)',
                    border: '1px solid rgba(0, 74, 198, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#ffffff',
                  }}
                >
                  <Lock size={32} />
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
                  Sertifikasi Keamanan Monsef
                </h4>
                <p style={{ fontSize: '13px', color: '#c3c6d7', marginTop: '6px' }}>
                  Keamanan diuji secara rutin oleh firma independen
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center' }}>
                <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <ShieldCheck size={20} style={{ color: '#4ade80', marginBottom: '8px' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>AES-256</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Enkripsi</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <Key size={20} style={{ color: '#60a5fa', marginBottom: '8px' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>Face ID</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Biometrik</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <EyeOff size={20} style={{ color: '#c084fc', marginBottom: '8px' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>Zero Data</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Penjualan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .security-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
