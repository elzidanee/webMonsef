import React from 'react';
import { Star, TrendingUp } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Rian Prasetya',
      role: 'Product Designer & Freelancer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment:
        'Fitur Magic Text & Voice Command-nya luar biasa! Dulu malas sekali catat kopi atau bensin. Sekarang tinggal ketik kalimat singkat, semuanya rapi otomatis.',
      metric: '+35% Hemat Bulanan',
    },
    {
      name: 'Siti Rahmania',
      role: 'Senior Accountant & Ibu Rumah Tangga',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      comment:
        'Tampilan Aerated Elegance-nya sangat bersih. Tidak seperti aplikasi bank biasa yang penuh iklan dan ribet. Monsef benar-benar fokus pada kejernihan angka.',
      metric: 'Target Rumah Tercapai',
    },
    {
      name: 'Budi Santoso',
      role: 'Founder Startup Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment:
        'Manajemen invoice dan multi-akunnya sangat mempermudah pemisahan dana pribadi dan bisnis kecil saya. Sangat direkomendasikan!',
      metric: 'Invoice Tepat Waktu',
    },
  ];

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="monsef-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <span className="label-sm" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}>
            Bukti Nyata
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Apa Kata Pengguna MONSEF?
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '12px' }}>
            Bergabunglah dengan puluhan ribu orang yang telah mengubah cara mereka mengelola kekayaan.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="monsef-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="badge-chip badge-success" style={{ fontSize: '11px' }}>
                    <TrendingUp size={12} />
                    <span>{rev.metric}</span>
                  </span>
                </div>

                <p style={{ fontSize: '15px', color: 'var(--color-on-surface)', lineHeight: '1.6', marginBottom: '24px', fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-on-surface)' }}>{rev.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
