import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(19, 27, 46, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '480px',
          padding: '36px',
          boxShadow: '0px 16px 48px rgba(0, 74, 198, 0.2)',
          border: '1px solid rgba(195, 198, 215, 0.4)',
          position: 'relative',
          animation: 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-on-surface-variant)',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="badge-chip badge-primary">
                <Sparkles size={14} />
                <span>Akses Eksklusif Monsef</span>
              </span>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
              Mulai Uji Coba MONSEF
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
              Dapatkan link unduhan instan dan bonus template penganggaran pribadi secara gratis.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '999px',
                    padding: '0 20px',
                    border: '1px solid #c3c6d7',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#faf8ff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                  Alamat Email Utama
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi@domain.com"
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '999px',
                    padding: '0 20px',
                    border: '1px solid #c3c6d7',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#faf8ff',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-outline)' }}>
                <ShieldCheck size={14} style={{ color: 'var(--color-tertiary)' }} />
                <span>Privasi terjamin. Data dienkripsi 256-bit.</span>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                <span>Dapatkan Link Akses Gratis</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 126, 65, 0.1)',
                color: 'var(--color-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
              Terima Kasih, {name}!
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
              Link unduhan MONSEF Premium dan panduan awal telah dikirimkan ke <strong>{email}</strong>.
            </p>

            <button onClick={onClose} className="btn-secondary" style={{ width: '100%' }}>
              Kembali ke Landing Page
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
