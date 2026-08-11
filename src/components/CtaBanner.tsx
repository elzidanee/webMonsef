import { Download, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenDemo?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = () => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)' }}>
      <div className="monsef-container">
        <div
          style={{
            background: 'linear-gradient(135deg, #004ac6 0%, #1d4ed8 50%, #059669 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '64px 40px',
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 74, 198, 0.28)',
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
                backdropFilter: 'blur(8px)',
              }}
            >
              <Sparkles size={14} />
              <span>Mulai Bebas Finansial Hari Ini</span>
            </span>

            <h2 className="display-lg" style={{ color: '#ffffff', marginBottom: '16px' }}>
              Uang Lebih Teratur.<br />Hidup Lebih Tenang.
            </h2>

            <p className="body-lg" style={{ color: '#e0e7ff', marginBottom: '36px' }}>
              Bergabunglah dengan puluhan ribu pengguna lain di Indonesia yang telah mengendalikan keuangan mereka secara penuh.
            </p>

            <div className="cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="https://drive.google.com/uc?export=download&id=1fhApMK8_l1k8XMazdMwgw0v308E4X4ck"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '56px',
                  padding: '0 36px',
                  borderRadius: '999px',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Download size={20} />
                <span>Install APK MONSEF</span>
              </a>
            </div>

            <div style={{ marginTop: '24px', fontSize: '13px', color: '#c7d2fe' }}>
              Aplikasi Android (.APK) • 100% Gratis & Bebas Iklan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
