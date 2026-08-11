import React from 'react';
import { Download, Play, TrendingUp, Lock, Star } from 'lucide-react';
import monsef3 from '../assets/monsef3.jpeg';

interface HeroProps {
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  return (
    <section
      style={{
        paddingTop: '60px',
        paddingBottom: '90px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="ambient-glow-container hero-section"
    >
      <div className="monsef-container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} className="hero-left-col">
            {/* Tag Badge */}
            <div
              className="badge-chip badge-primary hero-badge"
              style={{
                marginBottom: '24px',
                padding: '8px 18px',
                fontSize: '13px',
                border: '1px solid rgba(0, 74, 198, 0.15)',
                backgroundColor: 'rgba(0, 74, 198, 0.05)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="pulse-dot" />
              <span>Smart Financial Ecosystem • Monsef v2.0</span>
            </div>

            {/* Headline */}
            <h1
              className="display-lg"
              style={{
                color: 'var(--color-on-surface)',
                marginBottom: '20px',
              }}
            >
              Atur Keuangan.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #004ac6 0%, #2563eb 60%, #007e41 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Jadi Lebih Pintar.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="body-lg"
              style={{
                color: 'var(--color-on-surface-variant)',
                marginBottom: '36px',
                maxWidth: '560px',
              }}
            >
              Dapatkan kejelasan penuh atas target menabung, dan penuhi kesehatan finansial Anda dengan MONSEF — aplikasi intuitif yang memberi Anda kendali penuh atas uang Anda.
            </p>

            {/* Action Buttons */}
            <div
              className="hero-action-btns"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '48px',
              }}
            >
              <a
                href="https://drive.google.com/uc?export=download&id=1fhApMK8_l1k8XMazdMwgw0v308E4X4ck"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <Download size={18} />
                <span>Install App</span>
              </a>

              <button onClick={onOpenDemo} className="btn-secondary">
                <Play size={18} fill="currentColor" />
                <span>Lihat Demo</span>
              </button>
            </div>

            {/* Trust & Ratings */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                paddingTop: '20px',
                borderTop: '1px solid var(--color-surface-container-highest)',
                width: '100%',
              }}
            >
              {/* Avatars */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                ].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="User Avatar"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      marginLeft: idx === 0 ? '0' : '-10px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                  <span style={{ fontSize: '13px', fontWeight: 700, marginLeft: '4px', color: 'var(--color-on-surface)' }}>
                    4.9 / 5.0
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                  Diperoleh 50.000+ pengguna di Indonesia
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Widget & Mockup */}
          <div style={{ position: 'relative' }}>
            {/* Ambient Background Glow Behind Graphic */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(0, 74, 198, 0.02) 70%)',
                filter: 'blur(40px)',
                zIndex: 0,
              }}
            />

            {/* Central Phone Mockup Container */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={monsef3}
                alt="Monsef App Dashboard Preview"
                style={{
                  maxHeight: '520px',
                  width: 'auto',
                  borderRadius: '36px',
                  boxShadow: '0 24px 60px rgba(0, 74, 198, 0.22), 0 4px 16px rgba(19, 27, 46, 0.08)',
                  border: '6px solid #ffffff',
                  transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg)',
                  transition: 'transform 0.5s ease',
                }}
                className="hero-mockup-img"
              />

              {/* Floating Live Card 1: Total Wealth */}
              <div
                className="hero-float-card"
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '-30px',
                  backgroundColor: '#ffffff',
                  padding: '16px 20px',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-level-2)',
                  border: '1px solid rgba(0, 74, 198, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  animation: 'floatSlow 4s ease-in-out infinite alternate',
                  maxWidth: '250px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 126, 65, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-tertiary)',
                  }}
                >
                  <TrendingUp size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                    Portofolio Aset
                  </div>
                  <div className="num-tabular" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                    Rp 148.500.000
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-tertiary)', fontWeight: 700 }}>
                    ▲ +24.8% bulan ini
                  </div>
                </div>
              </div>

              {/* Floating Live Card 2: Savings Goal */}
              <div
                className="hero-float-card"
                style={{
                  position: 'absolute',
                  bottom: '12%',
                  right: '-20px',
                  backgroundColor: '#ffffff',
                  padding: '16px 20px',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-level-2)',
                  border: '1px solid rgba(0, 74, 198, 0.12)',
                  width: '230px',
                  animation: 'floatSlow 4s ease-in-out 2s infinite alternate',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    🎯 Liburan Jepang
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    82%
                  </span>
                </div>
                {/* Custom Thick 12px Progress Bar from Spec */}
                <div
                  style={{
                    height: '12px',
                    width: '100%',
                    backgroundColor: 'var(--color-secondary-container)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '82%',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: '999px',
                      transition: 'width 1s ease-in-out',
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '6px', textAlign: 'right' }}>
                  Rp 24.600.000 / Rp 30.000.000
                </div>
              </div>

              {/* Floating Badge: Security */}
              <div
                className="hero-float-card"
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '40px',
                  backgroundColor: 'var(--color-inverse-surface)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Lock size={14} style={{ color: '#4ade80' }} />
                <span>Bank-Grade Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles removed — now handled by index.css */}
    </section>
  );
};
