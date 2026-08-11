import React, { useState, useCallback } from 'react';
import {
  X,
  LayoutDashboard,
  PlusCircle,
  Target,
  PieChart,
  FileText,
  Wallet,
  Sparkles,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Mic,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  account: string;
  date: string;
}

interface SavingsGoal {
  id: number;
  name: string;
  emoji: string;
  target: number;
  saved: number;
  deadline: string;
}

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: 'LUNAS' | 'MENUNGGU';
  dueDate: string;
  createdAt: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, name: 'Gaji Bulanan PT Tech Nusantara', amount: 18500000, type: 'income', category: 'Gaji', account: 'Bank Mandiri', date: 'Kemarin, 09:00' },
  { id: 2, name: 'Project UI Design Freelance', amount: 4800000, type: 'income', category: 'Freelance', account: 'Bank Mandiri', date: '09 Ags 2026' },
  { id: 3, name: 'Kopi Susu Senja', amount: 28000, type: 'expense', category: 'Makanan & Kuliner', account: 'GoPay', date: 'Hari ini, 14:30' },
  { id: 4, name: 'Langganan Netflix 4K', amount: 186000, type: 'expense', category: 'Hiburan', account: 'BCA Credit Card', date: '08 Ags 2026' },
  { id: 5, name: 'Investasi Reksa Dana', amount: 2500000, type: 'expense', category: 'Investasi', account: 'Bibit', date: '07 Ags 2026' },
];

const INITIAL_GOALS: SavingsGoal[] = [
  { id: 1, name: 'Liburan Jepang', emoji: '✈️', target: 30000000, saved: 24600000, deadline: 'Des 2026' },
  { id: 2, name: 'MacBook Pro M4', emoji: '💻', target: 25000000, saved: 8500000, deadline: 'Mar 2027' },
];

const INITIAL_INVOICES: Invoice[] = [
  { id: 'INV-2026-081', client: 'PT Nusantara Tech', amount: 12500000, status: 'LUNAS', dueDate: '15 Ags 2026', createdAt: '01 Ags 2026' },
  { id: 'INV-2026-082', client: 'Studio Creative Keren', amount: 4500000, status: 'MENUNGGU', dueDate: '20 Ags 2026', createdAt: '05 Ags 2026' },
  { id: 'INV-2026-083', client: 'Global Startup Labs', amount: 8900000, status: 'LUNAS', dueDate: '02 Ags 2026', createdAt: '25 Jul 2026' },
];

// ─── NLP Parser ───────────────────────────────────────────────────────────────

function parseTransaction(text: string): Partial<Transaction> {
  const lower = text.toLowerCase();

  // Extract amount
  let amount = 0;
  const jutaMatch = lower.match(/(\d+(?:[.,]\d+)?)\s*(?:juta|jt)/);
  const ribuMatch = lower.match(/(\d+(?:[.,]\d+)?)\s*(?:ribu|rb|k)\b/);
  const rawMatch = lower.match(/rp\.?\s*(\d[\d.,]*)/);
  if (jutaMatch) amount = parseFloat(jutaMatch[1].replace(',', '.')) * 1000000;
  else if (ribuMatch) amount = parseFloat(ribuMatch[1].replace(',', '.')) * 1000;
  else if (rawMatch) amount = parseFloat(rawMatch[1].replace(/\./g, '').replace(',', '.'));

  // Detect category
  let category = 'Pengeluaran Umum';
  if (/kopi|makan|restoran|minum|snack|ayam|nasi|sate|bakso|martabak|boba|teh|juice|pizza|burger|cafe/.test(lower)) category = 'Makanan & Kuliner';
  else if (/bensin|spbu|ojek|grab|gojek|parkir|tol|motor|mobil|bensin|bbm|pertamax/.test(lower)) category = 'Transportasi';
  else if (/netflix|spotify|youtube|game|bioskop|cinema|hiburan|beli|musik/.test(lower)) category = 'Hiburan';
  else if (/listrik|pln|air|pdam|internet|indihome|telkom|tagihan/.test(lower)) category = 'Tagihan & Utilitas';
  else if (/baju|sepatu|fashion|mall|belanja|shopee|tokopedia|lazada/.test(lower)) category = 'Belanja';
  else if (/investasi|saham|reksa|bibit|ajaib|stockbit|deposito/.test(lower)) category = 'Investasi';
  else if (/gaji|salary|freelance|project|klien|honor|upah/.test(lower)) category = 'Pemasukan';
  else if (/obat|dokter|apotek|rumah sakit|klinik/.test(lower)) category = 'Kesehatan';

  // Detect account
  let account = 'Tunai';
  if (/gopay|go-pay/.test(lower)) account = 'GoPay';
  else if (/ovo/.test(lower)) account = 'OVO';
  else if (/dana/.test(lower)) account = 'DANA';
  else if (/mandiri/.test(lower)) account = 'Bank Mandiri';
  else if (/bca/.test(lower)) account = 'BCA';
  else if (/bni/.test(lower)) account = 'BNI';
  else if (/bri/.test(lower)) account = 'BRI';
  else if (/bibit|reksa/.test(lower)) account = 'Bibit';
  else if (/shopee/.test(lower)) account = 'ShopeePay';

  // Extract name: first few words before any number keyword
  const nameRaw = text.replace(/\d+\s*(?:ribu|rb|k|juta|jt)\b.*/i, '').replace(/rp\.?\s*[\d.,]+/gi, '').trim();
  const name = nameRaw.length > 3 ? nameRaw : text.split(' ').slice(0, 4).join(' ');

  return { name: name || text, amount, category, account };
}

// ─── Formatters ───────────────────────────────────────────────────────────────

const fmt = (v: number) => 'Rp ' + v.toLocaleString('id-ID');
const fmtShort = (v: number) => {
  if (v >= 1000000) return 'Rp ' + (v / 1000000).toFixed(1) + ' Jt';
  if (v >= 1000) return 'Rp ' + (v / 1000).toFixed(0) + ' Rb';
  return 'Rp ' + v;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'Makanan & Kuliner': '#f97316',
  'Transportasi': '#3b82f6',
  'Hiburan': '#a855f7',
  'Tagihan & Utilitas': '#64748b',
  'Belanja': '#ec4899',
  'Investasi': '#059669',
  'Kesehatan': '#ef4444',
  'Pengeluaran Umum': '#94a3b8',
  'Pemasukan': '#10b981',
  'Gaji': '#10b981',
  'Freelance': '#6366f1',
};

// Mini SVG Donut Chart
const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[]; size?: number }> = ({ data, size = 180 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#94a3b8' }}>Belum ada data</div>;
  const r = size / 2 - 20;
  const cx = size / 2;
  const cy = size / 2;
  let cumulative = 0;
  const segments = data.map(d => {
    const pct = d.value / total;
    const start = cumulative;
    cumulative += pct;
    return { ...d, pct, start };
  });
  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => ({
    x: cx + r * Math.cos(angle - Math.PI / 2),
    y: cy + r * Math.sin(angle - Math.PI / 2),
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => {
        if (seg.pct === 0) return null;
        const startAngle = seg.start * 2 * Math.PI;
        const endAngle = (seg.start + seg.pct) * 2 * Math.PI;
        const largeArc = seg.pct > 0.5 ? 1 : 0;
        const s = polarToCartesian(cx, cy, r, startAngle);
        const e = polarToCartesian(cx, cy, r, endAngle);
        const inner = 0.65;
        const si = polarToCartesian(cx, cy, r * inner, startAngle);
        const ei = polarToCartesian(cx, cy, r * inner, endAngle);
        return (
          <path
            key={i}
            d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y} L ${ei.x} ${ei.y} A ${r * inner} ${r * inner} 0 ${largeArc} 0 ${si.x} ${si.y} Z`}
            fill={seg.color}
            opacity={0.92}
          />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={11} fill="#475569" fontFamily="Inter, sans-serif">Total</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={13} fontWeight="700" fill="#0f172a" fontFamily="Inter, sans-serif">{fmtShort(total)}</text>
    </svg>
  );
};

// Mini SVG Bar Chart
const BarChart: React.FC<{ data: { label: string; income: number; expense: number }[] }> = ({ data }) => {
  const maxVal = Math.max(...data.flatMap(d => [d.income, d.expense]), 1);
  const W = 480, H = 140, barW = 16, gap = 8, groupW = barW * 2 + gap + 20;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const x = i * groupW + 10;
        const incH = (d.income / maxVal) * (H - 30);
        const expH = (d.expense / maxVal) * (H - 30);
        return (
          <g key={i}>
            <rect x={x} y={H - 20 - incH} width={barW} height={Math.max(incH, 2)} rx={4} fill="#059669" opacity={0.85} />
            <rect x={x + barW + gap} y={H - 20 - expH} width={barW} height={Math.max(expH, 2)} rx={4} fill="#ef4444" opacity={0.7} />
            <text x={x + barW} y={H - 4} textAnchor="middle" fontSize={9} fill="#94a3b8" fontFamily="Inter">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── Tab Components ───────────────────────────────────────────────────────────

const TabDashboard: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const chartData = [
    { label: 'Mar', income: 15200000, expense: 9800000 },
    { label: 'Apr', income: 17800000, expense: 11200000 },
    { label: 'Mei', income: 16500000, expense: 8900000 },
    { label: 'Jun', income: 19200000, expense: 12100000 },
    { label: 'Jul', income: 18700000, expense: 10400000 },
    { label: 'Ags', income: income, expense: expense },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="sim-stat-grid">
        {[
          { label: 'Total Saldo', value: fmt(balance), color: '#004ac6', icon: <Wallet size={18} />, sub: 'Konsolidasi semua akun' },
          { label: 'Pemasukan Bulan Ini', value: fmt(income), color: '#059669', icon: <ArrowUpRight size={18} />, sub: `${transactions.filter(t => t.type === 'income').length} transaksi` },
          { label: 'Pengeluaran Bulan Ini', value: fmt(expense), color: '#ef4444', icon: <ArrowDownRight size={18} />, sub: `${transactions.filter(t => t.type === 'expense').length} transaksi` },
        ].map((c, i) => (
          <div key={i} style={{ padding: '16px 18px', borderRadius: 18, backgroundColor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: c.color + '15', color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {c.icon}
              </div>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{c.label}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', fontFeatureSettings: '"tnum"' }}>{c.value}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Mini Bar Chart */}
      <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '20px 20px 12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Tren Cashflow 6 Bulan</span>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: '#059669', display: 'inline-block' }} />Pemasukan</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: '#ef4444', display: 'inline-block' }} />Pengeluaran</span>
          </div>
        </div>
        <BarChart data={chartData} />
      </div>

      {/* Recent Transactions */}
      <div style={{ backgroundColor: '#fff', borderRadius: 18, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Transaksi Terakhir</span>
          <span style={{ fontSize: 11, color: '#64748b', backgroundColor: '#f1f5f9', padding: '3px 10px', borderRadius: 99, fontWeight: 600 }}>Live Update</span>
        </div>
        <div style={{ maxHeight: 260, overflowY: 'auto' }}>
          {[...transactions].reverse().map((tx) => (
            <div key={tx.id} style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: (CATEGORY_COLORS[tx.category] || '#94a3b8') + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {tx.type === 'income' ? <ArrowUpRight size={18} color={CATEGORY_COLORS[tx.category] || '#94a3b8'} /> : <ArrowDownRight size={18} color={CATEGORY_COLORS[tx.category] || '#94a3b8'} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{tx.category} · {tx.date}</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 14, color: tx.type === 'income' ? '#059669' : '#0f172a', flexShrink: 0, fontFeatureSettings: '"tnum"' }}>
                {tx.type === 'income' ? '+' : '-'}{fmtShort(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Tab Add Transaction ───────────────────────────────────────────────────────

const TabAddTransaction: React.FC<{ onAdd: (tx: Omit<Transaction, 'id' | 'date'>) => void }> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [parsed, setParsed] = useState<Partial<Transaction> | null>(null);
  const [saved, setSaved] = useState(false);
  const [manualAmount, setManualAmount] = useState('');
  const [manualAccount, setManualAccount] = useState('');

  const handleParse = useCallback((val: string, t: 'expense' | 'income') => {
    setText(val);
    if (val.trim().length > 2) {
      const result = parseTransaction(val);
      if (t === 'income') result.category = 'Pemasukan';
      setParsed(result);
      setSaved(false);
    } else {
      setParsed(null);
    }
  }, []);

  const handleSave = () => {
    if (!parsed) return;
    const amount = manualAmount ? parseFloat(manualAmount.replace(/\D/g, '')) : (parsed.amount || 0);
    const account = manualAccount || parsed.account || 'Tunai';
    onAdd({
      name: parsed.name || text,
      amount,
      type,
      category: parsed.category || (type === 'income' ? 'Pemasukan' : 'Pengeluaran Umum'),
      account,
    });
    setSaved(true);
    setTimeout(() => {
      setText(''); setParsed(null); setSaved(false); setManualAmount(''); setManualAccount('');
    }, 2000);
  };

  const presets = type === 'expense'
    ? ['Kopi Latte 35rb GoPay', 'Bensin Pertamax 150rb Mandiri', 'Makan Malam Ayam Goreng 45rb', 'Bayar Listrik PLN 250rb BCA', 'Beli Baju Online Shopee 180rb']
    : ['Gaji Bulanan 8 juta Mandiri', 'Freelance Project 3 juta BCA', 'Transfer dari Klien 1.5 juta GoPay'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Type Selector */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['expense', 'income'] as const).map(t => (
          <button key={t} onClick={() => { setType(t); if (text) handleParse(text, t); }}
            style={{ flex: 1, height: 44, borderRadius: 999, border: type === t ? 'none' : '1px solid #e2e8f0', backgroundColor: type === t ? (t === 'expense' ? '#ef4444' : '#059669') : '#fff', color: type === t ? '#fff' : '#475569', fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>
            {t === 'expense' ? '↓ Pengeluaran' : '↑ Pemasukan'}
          </button>
        ))}
      </div>

      {/* NLP Input */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 8 }}>
          <Sparkles size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle', color: '#004ac6' }} />
          Deskripsikan transaksi (kalimat bebas):
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={text}
            onChange={e => handleParse(e.target.value, type)}
            placeholder={type === 'expense' ? 'Contoh: Kopi Janji Jiwa 28rb GoPay...' : 'Contoh: Gaji bulanan 8 juta Mandiri...'}
            style={{ width: '100%', height: 52, borderRadius: 999, padding: '0 52px 0 22px', border: '1.5px solid #004ac6', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'box-shadow 0.2s', boxShadow: '0 0 0 3px rgba(0,74,198,0.08)' }}
          />
          <Mic size={18} style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          <span style={{ fontSize: 11, color: '#94a3b8', alignSelf: 'center', flexShrink: 0 }}>Coba:</span>
          {presets.map((p, i) => (
            <button key={i} onClick={() => handleParse(p, type)}
              style={{ padding: '4px 12px', borderRadius: 999, backgroundColor: '#f1f5f9', border: 'none', fontSize: 12, fontWeight: 600, color: '#004ac6', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e0eaff')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f1f5f9')}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Parsed Result */}
      {parsed && (
        <div style={{ backgroundColor: '#f8fafc', borderRadius: 20, padding: 20, border: '1.5px dashed #b4c5ff', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <CheckCircle2 size={16} color="#059669" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#059669' }}>Hasil Ekstrasi AI:</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Nama Item</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{parsed.name}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Nominal Terdeteksi</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#004ac6' }}>{parsed.amount ? fmt(parsed.amount) : '—'}</div>
              {!parsed.amount && (
                <input
                  type="number"
                  placeholder="Masukkan nominal (Rp)"
                  value={manualAmount}
                  onChange={e => setManualAmount(e.target.value)}
                  style={{ marginTop: 4, width: '100%', height: 34, borderRadius: 8, border: '1px solid #e2e8f0', padding: '0 10px', fontSize: 13, outline: 'none' }}
                />
              )}
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Kategori</div>
              <span style={{ fontSize: 12, fontWeight: 700, backgroundColor: (CATEGORY_COLORS[parsed.category || ''] || '#94a3b8') + '20', color: (CATEGORY_COLORS[parsed.category || ''] || '#64748b'), padding: '3px 10px', borderRadius: 99 }}>{parsed.category}</span>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Akun / Dompet</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{parsed.account}</div>
            </div>
          </div>

          {saved ? (
            <div style={{ marginTop: 16, height: 44, borderRadius: 999, backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#fff', fontWeight: 700, fontSize: 14 }}>
              <CheckCircle2 size={18} /> Tersimpan! Dashboard diperbarui ✓
            </div>
          ) : (
            <button onClick={handleSave} className="btn-primary" style={{ marginTop: 16, width: '100%', height: 44, fontSize: 14 }}>
              <Plus size={16} /> Simpan ke Keuangan Saya
            </button>
          )}
        </div>
      )}

      {/* Tips */}
      <div style={{ backgroundColor: '#fefce8', border: '1px solid #fde68a', borderRadius: 14, padding: '12px 16px', fontSize: 12, color: '#92400e', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <Sparkles size={14} style={{ flexShrink: 0, marginTop: 1 }} />
        <span><strong>Tips:</strong> Tulis nominal dengan format "35rb", "1.5 juta", atau "150000". Sebutkan nama dompet (GoPay, BCA, dll) untuk mendebet akun yang tepat.</span>
      </div>
    </div>
  );
};

// ─── Tab Savings Goals ────────────────────────────────────────────────────────

const TabSavingsGoals: React.FC<{ goals: SavingsGoal[]; onAddGoal: (g: Omit<SavingsGoal, 'id' | 'saved'>) => void; onDeposit: (id: number, amount: number) => void }> = ({ goals, onAddGoal, onDeposit }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', emoji: '🎯', target: '', deadline: '' });
  const [depositId, setDepositId] = useState<number | null>(null);
  const [depositAmt, setDepositAmt] = useState('');

  const handleAdd = () => {
    if (!form.name || !form.target) return;
    onAddGoal({ name: form.name, emoji: form.emoji, target: parseFloat(form.target.replace(/\D/g, '')), deadline: form.deadline || 'Des 2027' });
    setForm({ name: '', emoji: '🎯', target: '', deadline: '' });
    setShowForm(false);
  };

  const handleDeposit = (id: number) => {
    const amt = parseFloat(depositAmt.replace(/\D/g, ''));
    if (amt > 0) { onDeposit(id, amt); setDepositId(null); setDepositAmt(''); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Target Tabungan</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{goals.length} target aktif</div>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ height: 40, padding: '0 18px', fontSize: 13 }}>
          <Plus size={15} /> Target Baru
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={{ backgroundColor: '#f8faff', border: '1.5px solid #b4c5ff', borderRadius: 20, padding: 20, animation: 'fadeIn 0.2s ease' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Buat Target Baru</div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10, marginBottom: 12 }}>
            <select value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
              style={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 22, textAlign: 'center', cursor: 'pointer', outline: 'none' }}>
              {['🎯', '✈️', '🏠', '💻', '🚗', '💍', '📱', '🎓', '💰', '🌴'].map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nama target (misal: Liburan Bali)"
              style={{ height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14, outline: 'none' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <input type="number" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} placeholder="Target (Rp)"
              style={{ height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14, outline: 'none' }} />
            <input value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} placeholder="Deadline (misal: Jun 2027)"
              style={{ height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14, outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleAdd} className="btn-primary" style={{ flex: 1, height: 42, fontSize: 13 }}>Simpan Target</button>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, height: 42, borderRadius: 999, border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#475569' }}>Batal</button>
          </div>
        </div>
      )}

      {/* Goals List */}
      {goals.map(goal => {
        const pct = Math.min(Math.round((goal.saved / goal.target) * 100), 100);
        const remaining = goal.target - goal.saved;
        return (
          <div key={goal.id} style={{ backgroundColor: '#fff', borderRadius: 20, padding: '20px 22px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 28 }}>{goal.emoji}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{goal.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>Deadline: {goal.deadline}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: pct >= 100 ? '#059669' : '#004ac6' }}>{pct}%</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>tercapai</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ height: 12, backgroundColor: '#e2e8f0', borderRadius: 999, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${pct}%`, backgroundColor: pct >= 100 ? '#059669' : '#004ac6', borderRadius: 999, transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 12, fontFeatureSettings: '"tnum"' }}>
              <span>Terkumpul: <strong style={{ color: '#0f172a' }}>{fmt(goal.saved)}</strong></span>
              <span>Target: <strong>{fmt(goal.target)}</strong></span>
            </div>

            {pct < 100 && (
              depositId === goal.id ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="number" autoFocus value={depositAmt} onChange={e => setDepositAmt(e.target.value)}
                    placeholder="Nominal tabungan (Rp)"
                    style={{ flex: 1, height: 38, borderRadius: 12, border: '1.5px solid #004ac6', padding: '0 14px', fontSize: 13, outline: 'none' }} />
                  <button onClick={() => handleDeposit(goal.id)} className="btn-primary" style={{ height: 38, padding: '0 16px', fontSize: 13 }}>Tabung</button>
                  <button onClick={() => { setDepositId(null); setDepositAmt(''); }}
                    style={{ height: 38, width: 38, borderRadius: 12, border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setDepositId(goal.id)}
                  style={{ width: '100%', height: 38, borderRadius: 999, border: '1.5px solid #004ac6', backgroundColor: 'rgba(0,74,198,0.05)', color: '#004ac6', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#004ac6'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0,74,198,0.05)'; e.currentTarget.style.color = '#004ac6'; }}>
                  <Plus size={14} /> Tabung Sekarang ({fmt(remaining)} lagi)
                </button>
              )
            )}
            {pct >= 100 && (
              <div style={{ backgroundColor: '#ecfdf5', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, color: '#059669', fontWeight: 700, fontSize: 13 }}>
                <CheckCircle2 size={16} /> 🎉 Target tercapai! Selamat!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Tab Analytics ────────────────────────────────────────────────────────────

const TabAnalytics: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);

  const catMap: Record<string, number> = {};
  expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const catData = Object.entries(catMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, value]) => ({ label, value, color: CATEGORY_COLORS[label] || '#94a3b8' }));

  const healthScore = Math.min(100, Math.max(0, Math.round(80 + (transactions.filter(t => t.category === 'Investasi').length * 4) - (expenses.length > 10 ? 10 : 0))));
  const savingsRate = totalExpense > 0 ? Math.round(((transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) - totalExpense) / transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 1)) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Health Score */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="sim-stat-grid">
        <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '16px 18px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>Financial Health Score</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: healthScore >= 80 ? '#059669' : healthScore >= 60 ? '#f59e0b' : '#ef4444' }}>{healthScore}<span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>/100</span></div>
          <div style={{ fontSize: 12, color: healthScore >= 80 ? '#059669' : '#f59e0b', fontWeight: 600 }}>{healthScore >= 80 ? '✦ Sangat Sehat' : '▲ Perlu Perhatian'}</div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '16px 18px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 4 }}>Rasio Tabungan</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#004ac6' }}>{savingsRate}<span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>%</span></div>
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>dari total pemasukan</div>
        </div>
      </div>

      {/* Donut + Legend */}
      <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 20, border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Distribusi Pengeluaran</div>
        {catData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 13 }}>Tambah beberapa transaksi pengeluaran untuk melihat analisis</div>
        ) : (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <DonutChart data={catData} size={160} />
            <div style={{ flex: 1, minWidth: 180 }}>
              {catData.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>{d.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', fontFeatureSettings: '"tnum"' }}>{totalExpense > 0 ? Math.round((d.value / totalExpense) * 100) : 0}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Insight */}
      <div style={{ background: 'linear-gradient(135deg, #004ac6 0%, #2563eb 100%)', borderRadius: 18, padding: '20px 22px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>MONSEF AI Insight</span>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#e0eaff' }}>
          {totalExpense === 0
            ? 'Mulai catat transaksi Anda untuk mendapatkan insight keuangan yang personal dan akurat dari AI MONSEF.'
            : savingsRate >= 30
            ? `Luar biasa! Rasio tabungan Anda ${savingsRate}% — jauh di atas rata-rata Indonesia (15%). Pertahankan momentum ini untuk mencapai kebebasan finansial lebih cepat! 🚀`
            : savingsRate >= 15
            ? `Rasio tabungan Anda ${savingsRate}% sudah di atas rata-rata. Coba alihkan sedikit pengeluaran ${catData[0]?.label || 'terbesar'} untuk meningkatkan target investasi Anda.`
            : `Pengeluaran terbesar Anda adalah ${catData[0]?.label || 'umum'}. Dengan menghemat 15% dari kategori ini, Anda bisa menambah tabungan hingga ${fmt(Math.round(catData[0]?.value * 0.15 || 0))} per bulan.`
          }
        </div>
      </div>
    </div>
  );
};

// ─── Tab Invoice ──────────────────────────────────────────────────────────────

const TabInvoice: React.FC<{ invoices: Invoice[]; onAdd: (inv: Omit<Invoice, 'id' | 'status' | 'createdAt'>) => void; onMarkPaid: (id: string) => void; onDelete: (id: string) => void }> = ({ invoices, onAdd, onMarkPaid, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client: '', amount: '', dueDate: '' });

  const handleAdd = () => {
    if (!form.client || !form.amount) return;
    onAdd({ client: form.client, amount: parseFloat(form.amount.replace(/\D/g, '')), dueDate: form.dueDate || '30 Ags 2026' });
    setForm({ client: '', amount: '', dueDate: '' });
    setShowForm(false);
  };

  const totalPaid = invoices.filter(i => i.status === 'LUNAS').reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'MENUNGGU').reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ backgroundColor: '#ecfdf5', borderRadius: 16, padding: '14px 16px', border: '1px solid #a7f3d0' }}>
          <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, marginBottom: 4 }}>✓ Sudah Terbayar</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#059669', fontFeatureSettings: '"tnum"' }}>{fmt(totalPaid)}</div>
        </div>
        <div style={{ backgroundColor: '#fffbeb', borderRadius: 16, padding: '14px 16px', border: '1px solid #fde68a' }}>
          <div style={{ fontSize: 11, color: '#d97706', fontWeight: 700, marginBottom: 4 }}>⏳ Menunggu Pembayaran</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#d97706', fontFeatureSettings: '"tnum"' }}>{fmt(totalPending)}</div>
        </div>
      </div>

      {/* Header + Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{invoices.length} Invoice Aktif</div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ height: 40, padding: '0 18px', fontSize: 13 }}>
          <Plus size={15} /> Invoice Baru
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ backgroundColor: '#f8faff', border: '1.5px solid #b4c5ff', borderRadius: 20, padding: 20, animation: 'fadeIn 0.2s ease' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Buat Invoice Baru</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} placeholder="Nama klien / perusahaan"
              style={{ height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14, outline: 'none' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="Jumlah (Rp)"
                style={{ height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14, outline: 'none' }} />
              <input value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} placeholder="Jatuh tempo (tgl)"
                style={{ height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleAdd} className="btn-primary" style={{ flex: 1, height: 42, fontSize: 13 }}>Buat & Kirim</button>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, height: 42, borderRadius: 999, border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#475569' }}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {invoices.map(inv => (
          <div key={inv.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '16px 18px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: inv.status === 'LUNAS' ? '#ecfdf5' : '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: inv.status === 'LUNAS' ? '#059669' : '#d97706', flexShrink: 0 }}>
              {inv.status === 'LUNAS' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{inv.client}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{inv.id} · Jatuh tempo: {inv.dueDate}</div>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', fontFeatureSettings: '"tnum"' }}>{fmt(inv.amount)}</div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 99, backgroundColor: inv.status === 'LUNAS' ? '#ecfdf5' : '#fffbeb', color: inv.status === 'LUNAS' ? '#059669' : '#d97706' }}>{inv.status}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {inv.status === 'MENUNGGU' && (
                <button onClick={() => onMarkPaid(inv.id)}
                  style={{ height: 34, padding: '0 12px', borderRadius: 10, border: '1px solid #a7f3d0', backgroundColor: '#ecfdf5', color: '#059669', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                  Lunas ✓
                </button>
              )}
              <button onClick={() => onDelete(inv.id)}
                style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid #fee2e2', backgroundColor: '#fef2f2', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface AppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabId = 'dashboard' | 'add' | 'goals' | 'analytics' | 'invoices';

export const AppSimulator: React.FC<AppSimulatorProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState<SavingsGoal[]>(INITIAL_GOALS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [addedFlash, setAddedFlash] = useState(false);

  const handleAddTransaction = useCallback((tx: Omit<Transaction, 'id' | 'date'>) => {
    setTransactions(prev => [...prev, { ...tx, id: Date.now(), date: 'Baru saja' }]);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 2000);
  }, []);

  const handleAddGoal = useCallback((g: Omit<SavingsGoal, 'id' | 'saved'>) => {
    setGoals(prev => [...prev, { ...g, id: Date.now(), saved: 0 }]);
  }, []);

  const handleDeposit = useCallback((id: number, amount: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, saved: Math.min(g.saved + amount, g.target) } : g));
  }, []);

  const handleAddInvoice = useCallback((inv: Omit<Invoice, 'id' | 'status' | 'createdAt'>) => {
    const num = String(invoices.length + 84).padStart(3, '0');
    setInvoices(prev => [...prev, { ...inv, id: `INV-2026-0${num}`, status: 'MENUNGGU', createdAt: 'Baru saja' }]);
  }, [invoices.length]);

  const handleMarkPaid = useCallback((id: string) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'LUNAS' } : i));
  }, []);

  const handleDeleteInvoice = useCallback((id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  }, []);

  if (!isOpen) return null;

  const tabs: { id: TabId; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'add', label: 'Tambah', icon: <PlusCircle size={20} />, badge: addedFlash ? 1 : undefined },
    { id: 'goals', label: 'Target', icon: <Target size={20} />, badge: goals.length },
    { id: 'analytics', label: 'Analisis', icon: <PieChart size={20} /> },
    { id: 'invoices', label: 'Invoice', icon: <FileText size={20} />, badge: invoices.filter(i => i.status === 'MENUNGGU').length || undefined },
  ];

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="sim-overlay">
      <div className="sim-window">
        {/* Simulator Header */}
        <div className="sim-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #004ac6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>MONSEF — Simulasi App</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>
                Saldo: <strong style={{ color: '#004ac6', fontFeatureSettings: '"tnum"' }}>{fmt(income - expense)}</strong>
                {addedFlash && <span style={{ marginLeft: 8, color: '#059669', fontWeight: 700 }}>✓ Transaksi tersimpan!</span>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 11, color: '#94a3b8', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: 99, fontWeight: 600 }}>
              <span style={{ color: '#059669' }}>●</span> Live Demo
            </div>
            <button onClick={onClose} className="sim-close-btn">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="sim-content">
          {activeTab === 'dashboard' && <TabDashboard transactions={transactions} />}
          {activeTab === 'add' && <TabAddTransaction onAdd={handleAddTransaction} />}
          {activeTab === 'goals' && <TabSavingsGoals goals={goals} onAddGoal={handleAddGoal} onDeposit={handleDeposit} />}
          {activeTab === 'analytics' && <TabAnalytics transactions={transactions} />}
          {activeTab === 'invoices' && <TabInvoice invoices={invoices} onAdd={handleAddInvoice} onMarkPaid={handleMarkPaid} onDelete={handleDeleteInvoice} />}
        </div>

        {/* Bottom Navigation */}
        <div className="sim-bottom-nav">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`sim-nav-btn ${activeTab === tab.id ? 'active' : ''}`}>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                {tab.icon}
                {tab.badge !== undefined && (
                  <div style={{ position: 'absolute', top: -5, right: -7, width: 16, height: 16, borderRadius: '50%', backgroundColor: tab.id === 'add' && addedFlash ? '#059669' : '#ef4444', color: '#fff', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                    {tab.badge}
                  </div>
                )}
              </div>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes simSlideIn { from { opacity: 0; transform: scale(0.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .sim-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(10px); z-index: 3000;
          display: flex; align-items: center; justify-content: center; padding: 16px;
        }
        .sim-window {
          background: #f8fafc; border-radius: 28px; width: 100%; max-width: 780px;
          max-height: 92vh; display: flex; flex-direction: column;
          box-shadow: 0 32px 80px rgba(0, 74, 198, 0.22), 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid rgba(226, 232, 240, 0.8);
          animation: simSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .sim-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 22px; background: #fff; border-bottom: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        .sim-close-btn {
          width: 34px; height: 34px; border-radius: 10px; border: 1px solid #e2e8f0;
          background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #475569; transition: all 0.2s;
        }
        .sim-close-btn:hover { background: #fee2e2; border-color: #fca5a5; color: #ef4444; }
        .sim-content {
          flex: 1; overflow-y: auto; padding: 20px 22px;
          scroll-behavior: smooth;
        }
        .sim-content::-webkit-scrollbar { width: 4px; }
        .sim-content::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        .sim-bottom-nav {
          display: flex; background: #fff; border-top: 1px solid #e2e8f0;
          padding: 8px 10px; gap: 4px; flex-shrink: 0;
        }
        .sim-nav-btn {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; padding: 8px 4px; border-radius: 14px; border: none; background: none;
          color: #94a3b8; font-size: 10px; font-weight: 700; cursor: pointer;
          font-family: 'Inter', sans-serif; transition: all 0.2s; min-height: 60px;
        }
        .sim-nav-btn.active { background: rgba(0,74,198,0.08); color: #004ac6; }
        .sim-nav-btn:hover:not(.active) { background: #f1f5f9; color: #475569; }
        @media (max-width: 600px) {
          .sim-window { max-height: 96vh; border-radius: 20px; }
          .sim-stat-grid { grid-template-columns: 1fr !important; }
          .sim-nav-btn { font-size: 9px; }
        }
      `}</style>
    </div>
  );
};
