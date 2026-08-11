import React, { useState } from 'react';
import { Calculator, Sparkles, ArrowRight } from 'lucide-react';

interface FinancialCalculatorProps {
  onOpenDemo: () => void;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({ onOpenDemo }) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(15000000);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(10000000);
  const [savingsRatePercent, setSavingsRatePercent] = useState<number>(18);

  // Calculations
  const monthlySavingsWithMonsef = Math.round((monthlyExpense * savingsRatePercent) / 100);
  const annualSavingsWithMonsef = monthlySavingsWithMonsef * 12;
  
  // 3-year projection (7% CAGR compound interest on total annual savings with Monsef)
  const totalAnnualSavingsWithMonsef = (monthlyIncome - monthlyExpense + monthlySavingsWithMonsef) * 12;
  const projected3YearWealth = Math.round(
    totalAnnualSavingsWithMonsef * 1 +
    totalAnnualSavingsWithMonsef * 1.07 +
    totalAnnualSavingsWithMonsef * 1.1449
  );

  const formatIDR = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  return (
    <section id="simulasi" style={{ padding: '80px 0', backgroundColor: 'var(--color-surface-container-low)' }}>
      <div className="monsef-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px' }}>
          <span className="label-sm" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}>
            Simulasi Interaktif
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Hitung Potensi Hemat & Pertumbuhan Aset Anda
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '12px' }}>
            Geser slider di bawah untuk mengestimasi berapa banyak dana yang bisa Anda hemat dan kembangkan dengan asistensi penganggaran MONSEF AI.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
          className="calc-grid"
        >
          {/* Controls Card */}
          <div className="monsef-card" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 74, 198, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <Calculator size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                Parameter Keuangan Anda
              </h3>
            </div>

            {/* Slider 1: Monthly Income */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
                  Pendapatan Bulanan
                </label>
                <span className="num-tabular" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {formatIDR(monthlyIncome)}
                </span>
              </div>
              <input
                type="range"
                min={3000000}
                max={100000000}
                step={1000000}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-primary)',
                  height: '6px',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Slider 2: Monthly Expense */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
                  Pengeluaran Bulanan Saat Ini
                </label>
                <span className="num-tabular" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-on-surface)' }}>
                  {formatIDR(monthlyExpense)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={Math.min(monthlyIncome, 80000000)}
                step={500000}
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-primary)',
                  height: '6px',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Slider 3: Optimization Rate */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
                  Target Efisiensi Pengeluaran (MONSEF AI)
                </label>
                <span className="num-tabular" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-tertiary)' }}>
                  {savingsRatePercent}%
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={35}
                step={1}
                value={savingsRatePercent}
                onChange={(e) => setSavingsRatePercent(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-tertiary)',
                  height: '6px',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-on-surface-variant)',
                backgroundColor: 'var(--color-surface-container)',
                padding: '12px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
              <span>Rata-rata pengguna Monsef mampu memotong pengeluaran tak terduga hingga 18% dalam 60 hari pertama.</span>
            </div>
          </div>

          {/* Projection Result Card */}
          <div className="monsef-card monsef-card-featured" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="badge-chip badge-success">Proyeksi Pertumbuhan</span>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                Potensi Penghematan Ekstra per Tahun
              </span>
              <div className="num-tabular" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-tertiary)', marginTop: '4px' }}>
                +{formatIDR(annualSavingsWithMonsef)}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Setara dengan {formatIDR(monthlySavingsWithMonsef)} / bulan dimasukkan ke tabungan.
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                marginBottom: '28px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '12px' }}>
                Proyeksi Akumulasi Aset (3 Tahun)
              </div>
              <div className="num-tabular" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>
                {formatIDR(projected3YearWealth)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '6px' }}>
                Termasuk akumulasi tabungan pokok dan pertumbuhan investasi moderat 7% per tahun.
              </div>
            </div>

            <button onClick={onOpenDemo} className="btn-primary" style={{ width: '100%' }}>
              <span>Wujudkan Target Ini Sekarang</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
