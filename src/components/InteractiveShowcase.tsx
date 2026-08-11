import React, { useState } from 'react';
import {
  LayoutDashboard,
  PieChart,
  Wallet,
  FileText,
  Plus,
  Download,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const InteractiveShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'accounts' | 'invoices'>('dashboard');

  const transactions = [
    { id: 1, name: 'Kopi Susu Senja', category: 'Makanan & Minum', date: 'Hari ini, 14:30', amount: -28000, type: 'expense', account: 'GoPay' },
    { id: 2, name: 'Gaji Bulanan PT Tech', category: 'Pemasukan', date: 'Kemarin, 09:00', amount: 18500000, type: 'income', account: 'Bank Mandiri' },
    { id: 3, name: 'Langganan Netflix 4K', category: 'Hiburan', date: '08 Ags 2026', amount: -186000, type: 'expense', account: 'BCA Credit Card' },
    { id: 4, name: 'Investasi Reksa Dana', category: 'Tabungan & Investasi', date: '07 Ags 2026', amount: -2500000, type: 'expense', account: 'Bibit' },
    { id: 5, name: 'Project UI Design Client', category: 'Freelance', date: '05 Ags 2026', amount: 4800000, type: 'income', account: 'Bank Mandiri' },
  ];

  const accounts = [
    { name: 'Bank Mandiri Utama', type: 'Rekening Giro', balance: 84500000, number: '•••• 8821', color: '#004ac6' },
    { name: 'BCA Savings', type: 'Tabungan Impian', balance: 42300000, number: '•••• 1092', color: '#007e41' },
    { name: 'GoPay Premium', type: 'Dompet Digital', balance: 1850000, number: '0812 •••• 992', color: '#2563eb' },
    { name: 'Portofolio Bibit', type: 'Investasi Reksa Dana', balance: 19850000, number: 'INV-77312', color: '#596578' },
  ];

  const invoices = [
    { id: 'INV-2026-081', client: 'PT Nusantara Tech', amount: 12500000, status: 'LUNAS', dueDate: '15 Ags 2026' },
    { id: 'INV-2026-082', client: 'Studio Creative Keren', amount: 4500000, status: 'MENUNGGU', dueDate: '20 Ags 2026' },
    { id: 'INV-2026-083', client: 'Global Startup Labs', amount: 8900000, status: 'LUNAS', dueDate: '02 Ags 2026' },
  ];

  return (
    <section id="showcase" style={{ padding: '80px 0', backgroundColor: '#faf8ff' }}>
      <div className="monsef-container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="label-sm" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}>
            Eksplorasi Fitur
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Fitur Premium. Tanpa Biaya Premium.
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '12px' }}>
            Semua alat yang Anda butuhkan untuk mengelola keuangan pribadi dalam satu aplikasi yang indah dan intuitif.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {[
            { id: 'dashboard', label: 'Smart Dashboard', icon: <LayoutDashboard size={18} /> },
            { id: 'analytics', label: 'Analisis Mendalam', icon: <PieChart size={18} /> },
            { id: 'accounts', label: 'Multi Akun & Dompet', icon: <Wallet size={18} /> },
            { id: 'invoices', label: 'Invoice & Cashflow Pro', icon: <FileText size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                height: '48px',
                padding: '0 24px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '15px',
                border: activeTab === tab.id ? 'none' : '1px solid var(--color-outline-variant)',
                backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : 'var(--color-on-surface-variant)',
                boxShadow: activeTab === tab.id ? '0 4px 16px rgba(0, 74, 198, 0.25)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Workspace Window */}
        <div
          className="monsef-card monsef-card-featured"
          style={{
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#ffffff',
            minHeight: '480px',
          }}
        >
          {/* TAB 1: SMART DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Summary Cards Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                  marginBottom: '32px',
                }}
              >
                <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--color-surface-container-low)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Total Saldo Konsolidasi</div>
                  <div className="num-tabular" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-on-surface)', marginTop: '4px' }}>
                    Rp 148.500.000
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-tertiary)', fontWeight: 700, marginTop: '4px' }}>
                    ▲ +14.2% dibanding bulan lalu
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--color-surface-container-low)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Pemasukan Bulan Ini</div>
                  <div className="num-tabular" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-tertiary)', marginTop: '4px' }}>
                    Rp 23.300.000
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                    2 Sumber pemasukan utama
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--color-surface-container-low)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Pengeluaran Bulan Ini</div>
                  <div className="num-tabular" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-error)', marginTop: '4px' }}>
                    Rp 2.714.000
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-tertiary)', fontWeight: 700, marginTop: '4px' }}>
                    ✔ 38% di bawah batas anggaran
                  </div>
                </div>
              </div>

              {/* Transactions Table Showcase */}
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    Aktivitas Transaksi Terakhir
                  </h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge-chip badge-secondary">Real-time Stream</span>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
                        <th style={{ padding: '12px 16px' }}>Deskripsi Transaksi</th>
                        <th style={{ padding: '12px 16px' }}>Kategori</th>
                        <th style={{ padding: '12px 16px' }}>Akun / Rekening</th>
                        <th style={{ padding: '12px 16px' }}>Waktu</th>
                        <th style={{ padding: '12px 16px', textAlign: 'right' }}>Jumlah (IDR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr
                          key={tx.id}
                          style={{
                            borderBottom: '1px solid #f1f5f9',
                            transition: 'background-color 0.2s ease',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <td style={{ padding: '16px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                            {tx.name}
                          </td>
                          <td style={{ padding: '16px' }}>
                            <span
                              className={`badge-chip ${
                                tx.type === 'income' ? 'badge-success' : 'badge-primary'
                              }`}
                            >
                              {tx.category}
                            </span>
                          </td>
                          <td style={{ padding: '16px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                            {tx.account}
                          </td>
                          <td style={{ padding: '16px', fontSize: '13px', color: 'var(--color-outline)' }}>
                            {tx.date}
                          </td>
                          <td
                            className="num-tabular"
                            style={{
                              padding: '16px',
                              textAlign: 'right',
                              fontWeight: 700,
                              fontSize: '15px',
                              color: tx.amount > 0 ? 'var(--color-tertiary)' : 'var(--color-on-surface)',
                            }}
                          >
                            {tx.amount > 0 ? `+Rp ${tx.amount.toLocaleString('id-ID')}` : `-Rp ${Math.abs(tx.amount).toLocaleString('id-ID')}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANALISIS MENDALAM */}
          {activeTab === 'analytics' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="analytics-grid">
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                    Distribusi Pengeluaran Bulan Ini
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
                    Kategori terbesar Anda bulan ini adalah Makanan & Minum. Semua terkendali secara proporsional.
                  </p>

                  {/* Expense Breakdown Progress Bars */}
                  {[
                    { label: 'Makanan & Kuliner', percent: 34, amount: 'Rp 922.760', color: '#004ac6' },
                    { label: 'Investasi & Tabungan', percent: 26, amount: 'Rp 705.640', color: '#007e41' },
                    { label: 'Belanja & Gaya Hidup', percent: 22, amount: 'Rp 597.080', color: '#2563eb' },
                    { label: 'Tagihan & Langganan', percent: 18, amount: 'Rp 488.520', color: '#596578' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px', fontWeight: 600 }}>
                        <span>{item.label}</span>
                        <span className="num-tabular">{item.amount} ({item.percent}%)</span>
                      </div>
                      <div style={{ height: '12px', width: '100%', backgroundColor: 'var(--color-surface-container-highest)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${item.percent}%`,
                            backgroundColor: item.color,
                            borderRadius: '999px',
                            transition: 'width 0.8s ease',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    padding: '28px',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div className="badge-chip badge-primary" style={{ marginBottom: '16px' }}>
                      ✨ AI Financial Intelligence Insights
                    </div>
                    <h5 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '12px' }}>
                      "Anda menghemat 18% lebih banyak dibanding bulan sebelumnya."
                    </h5>
                    <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: '1.6' }}>
                      Algoritma Monsef mendeteksi bahwa pengeluaran impulsif akhir pekan berkurang 25%. Pertahankan tren ini untuk mencapai target tabungan rumah impian 4 bulan lebih cepat!
                    </p>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(195, 198, 215, 0.4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                        Kesehatan Anggaran (Health Score)
                      </span>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-tertiary)' }}>
                        94 / 100 (Sangat Sehat)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MULTI AKUN & DOMPET */}
          {activeTab === 'accounts' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    Rekening & Dompet Terhubung
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                    Sinkronisasi otomatis atau catat saldo dompet tunai secara langsung.
                  </p>
                </div>
                <button
                  className="btn-primary"
                  style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}
                >
                  <Plus size={16} />
                  <span>Tambah Rekening</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {accounts.map((acc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '24px',
                      borderRadius: '24px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: 'var(--shadow-level-1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
                          {acc.type}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                          {acc.name}
                        </div>
                      </div>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: acc.color,
                        }}
                      />
                    </div>

                    <div className="num-tabular" style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                      Rp {acc.balance.toLocaleString('id-ID')}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
                      No: {acc.number}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MANAJEMEN INVOICE PRO */}
          {activeTab === 'invoices' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    Manajemen Invoice & Penagihan
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                    Buat invoice profesional dan pantau pembayaran masuk dari klien Anda.
                  </p>
                </div>
                <button className="btn-primary" style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}>
                  <Plus size={16} />
                  <span>Invoice Baru</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    style={{
                      padding: '20px 24px',
                      borderRadius: '20px',
                      backgroundColor: 'var(--color-surface-container-low)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '14px',
                          backgroundColor: inv.status === 'LUNAS' ? 'rgba(0, 126, 65, 0.1)' : 'rgba(234, 88, 12, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: inv.status === 'LUNAS' ? 'var(--color-tertiary)' : '#c2410c',
                        }}
                      >
                        {inv.status === 'LUNAS' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--color-on-surface)' }}>
                          {inv.client}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                          {inv.id} • Jatuh tempo: {inv.dueDate}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div className="num-tabular" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                          Rp {inv.amount.toLocaleString('id-ID')}
                        </div>
                        <span
                          className={`badge-chip ${
                            inv.status === 'LUNAS' ? 'badge-success' : 'badge-warning'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>

                      <button
                        style={{
                          background: 'none',
                          border: '1px solid #c3c6d7',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--color-on-surface)',
                        }}
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
