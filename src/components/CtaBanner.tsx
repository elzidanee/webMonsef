import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenDemo: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenDemo }) => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#faf8ff' }}>
      <div className="monsef-container">
        <div
          style={{
            background: 'linear-gradient(135deg, #004ac6 0%, #1e40af 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '64px 40px',
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 74, 198, 0.3)',
          }}
        >
          {/* Background Ambient Circles */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-120px',
              left: '-100px',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              <Sparkles size={14} />
              <span>Mulai Dalam 2 Menit</span>
            </span>

            <h2 className="display-lg" style={{ color: '#ffffff', marginBottom: '16px' }}>
              Uang Lebih Teratur.<br />Hidup Lebih Tenang.
            </h2>

            <p className="body-lg" style={{ color: '#dbe1ff', marginBottom: '36px' }}>
              Bergabunglah dengan ribuan pengguna lain yang telah mengendalikan keuangan mereka secara penuh.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={onOpenDemo}
                style={{
                  height: '56px',
                  padding: '0 32px',
                  borderRadius: '999px',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span>Download MONSEF Gratis</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ marginTop: '24px', fontSize: '13px', color: '#b4c5ff' }}>
              Tersedia untuk iOS dan Android • Tanpa perlu kartu kredit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
