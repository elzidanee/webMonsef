import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Wallet } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(250, 248, 255, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(195, 198, 215, 0.3)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: '16px 0',
      }}
    >
      <div className="monsef-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #004ac6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(0, 74, 198, 0.3)',
              }}
            >
              <Wallet size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--color-on-surface)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  MONSEF
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '99px',
                    backgroundColor: 'var(--color-secondary-container)',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.05em',
                  }}
                >
                  PREMIUM
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--color-on-surface-variant)',
                  fontWeight: 500,
                  marginTop: '-2px',
                }}
              >
                Aerated Wealth Management
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            <a href="#fitur" className="nav-link">
              Fitur
            </a>
            <a href="#showcase" className="nav-link">
              Solusi
            </a>
            <a href="#simulasi" className="nav-link">
              Kalkulator
            </a>
            <a href="#keamanan" className="nav-link">
              Keamanan
            </a>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            className="desktop-actions"
          >
            <button
              onClick={onOpenDemo}
              style={{
                height: '46px',
                padding: '0 20px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'transparent',
                color: 'var(--color-on-surface)',
                border: '1px solid var(--color-outline-variant)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-outline-variant)';
                e.currentTarget.style.color = 'var(--color-on-surface)';
              }}
            >
              Masuk Akun
            </button>

            <a
              href="https://drive.google.com/uc?export=download&id=1fhApMK8_l1k8XMazdMwgw0v308E4X4ck"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                height: '46px',
                padding: '0 24px',
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              <Download size={16} />
              <span>Download App</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-on-surface)',
              padding: '8px',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown — Premium Glassmorphism */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: '12px',
              padding: '8px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(19, 27, 46, 0.15), 0 4px 16px rgba(0, 74, 198, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              animation: 'mobileMenuSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {[
              { href: '#fitur', label: 'Fitur Utama', emoji: '⚡' },
              { href: '#showcase', label: 'Solusi Finansial', emoji: '💡' },
              { href: '#simulasi', label: 'Kalkulator Pertumbuhan', emoji: '📊' },
              { href: '#keamanan', label: 'Keamanan Bank-Grade', emoji: '🔒' },
              { href: '#faq', label: 'Tanya Jawab (FAQ)', emoji: '❓' },
            ].map(({ href, label, emoji }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--color-on-surface)',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0, 74, 198, 0.06)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{emoji}</span>
                <span>{label}</span>
              </a>
            ))}

            <div style={{ height: '1px', background: 'var(--color-outline-variant)', margin: '6px 16px', opacity: 0.5 }} />

            <div style={{ padding: '8px 8px 4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="https://drive.google.com/uc?export=download&id=1fhApMK8_l1k8XMazdMwgw0v308E4X4ck"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', height: '52px', fontSize: '15px', textDecoration: 'none' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Install App Gratis
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .nav-link {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 15px;
          color: var(--color-on-surface-variant);
          text-decoration: none;
          transition: color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-link:hover {
          color: var(--color-primary);
        }
        @keyframes mobileMenuSlide {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
};
