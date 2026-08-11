import React from 'react';
import { Wallet } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="monsef-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #004ac6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Wallet size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                MONSEF
              </span>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: '1.6', maxWidth: '320px', marginBottom: '20px' }}>
              Aplikasi pencatat keuangan pintar untuk membantu Anda mencapai kebebasan finansial dengan laporan yang elegan dan mudah dipahami.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-tertiary)', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#007e41', display: 'inline-block' }} />
              <span>Sistem Berjalan Normal 100%</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '16px' }}>Produk</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <a href="#fitur" style={{ textDecoration: 'none', color: 'inherit' }}>Fitur Utama</a>
              <a href="#showcase" style={{ textDecoration: 'none', color: 'inherit' }}>Smart Dashboard</a>
              <a href="#simulasi" style={{ textDecoration: 'none', color: 'inherit' }}>Kalkulator Pertumbuhan</a>
              <a href="#keamanan" style={{ textDecoration: 'none', color: 'inherit' }}>Enkripsi Keamanan</a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '16px' }}>Perusahaan</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Tentang Kami</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Blog Finansial</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Karir</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Kontak Media</a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '16px' }}>Legal & Privasi</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Kebijakan Privasi</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Syarat & Ketentuan</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Pemberitahuan Hak Cipta</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Pusat Keamanan</a>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '13px',
            color: 'var(--color-outline)',
          }}
        >
          <div>
            © {new Date().getFullYear()} MONSEF Premium Fintech. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Dibuat dengan Aerated Elegance untuk Indonesia</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
