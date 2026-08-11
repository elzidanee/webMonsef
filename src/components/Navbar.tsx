import React, { useState } from 'react';
import { Download, Menu, X, Wallet } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - 32px)',
        maxWidth: '920px',
      }}
      className="floating-bottom-dock"
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '999px',
          border: '1px solid rgba(0, 74, 198, 0.15)',
          boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.18), 0 2px 10px rgba(0, 74, 198, 0.1)',
          padding: '8px 12px 8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #004ac6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 74, 198, 0.3)',
            }}
          >
            <Wallet size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              MONSEF
            </span>
            <span
              style={{
                fontSize: '10px',
                color: 'var(--color-primary)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginTop: '2px',
              }}
            >
              FINTECH
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          {[
            { href: '#fitur', label: 'Fitur' },
            { href: '#showcase', label: 'Solusi' },
            { href: '#simulasi', label: 'Kalkulator' },
            { href: '#keamanan', label: 'Keamanan' },
            { href: '#faq', label: 'FAQ' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--color-on-surface-variant)',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
          className="desktop-actions"
        >
          <button
            onClick={onOpenDemo}
            style={{
              height: '42px',
              padding: '0 16px',
              borderRadius: '999px',
              backgroundColor: 'transparent',
              color: 'var(--color-on-surface)',
              border: '1px solid var(--color-outline-variant)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Masuk
          </button>

          <a
            href="https://drive.google.com/uc?export=download&id=1fhApMK8_l1k8XMazdMwgw0v308E4X4ck"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              height: '42px',
              padding: '0 20px',
              fontSize: '13px',
              textDecoration: 'none',
            }}
          >
            <Download size={15} />
            <span>Install App</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'rgba(0, 74, 198, 0.08)',
            border: 'none',
            borderRadius: '999px',
            cursor: 'pointer',
            color: 'var(--color-primary)',
            padding: '10px 14px',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <span>Menu</span>
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Mobile Dropdown Menu — Pops UP Above Floating Dock */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 12px)',
              left: 0,
              right: 0,
              padding: '8px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.2), 0 4px 16px rgba(0, 74, 198, 0.1)',
              border: '1px solid rgba(0, 74, 198, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              animation: 'mobileMenuSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
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
                  padding: '12px 16px',
                  borderRadius: '16px',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'var(--color-on-surface)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '18px' }}>{emoji}</span>
                <span>{label}</span>
              </a>
            ))}

            <div style={{ height: '1px', background: '#e2e8f0', margin: '4px 12px' }} />

            <a
              href="https://drive.google.com/uc?export=download&id=1fhApMK8_l1k8XMazdMwgw0v308E4X4ck"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', height: '48px', fontSize: '14px', textDecoration: 'none', marginTop: '4px' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download size={16} />
              <span>Install APK MONSEF</span>
            </a>
          </div>
        )}
      </div>

      <style>{`
        .nav-link:hover {
          background-color: rgba(0, 74, 198, 0.08) !important;
          color: var(--color-primary) !important;
        }
        @keyframes mobileMenuSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .floating-bottom-dock {
            bottom: 16px !important;
            width: calc(100% - 24px) !important;
          }
        }
      `}</style>
    </header>
  );
};
