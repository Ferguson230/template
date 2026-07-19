import * as React from 'react';
import { B, HEADLINE, BODY, S } from './styles';

// ── Section Header
export function SectionHeader({ label, action }: { label: string; action?: string }) {
  return (
    <div style={{ ...S.flexBetween, marginBottom: 16 }}>
      <h2 style={{ ...HEADLINE, ...S.textLg, ...S.bold, color: B.metallic, margin: 0 }}>{label}</h2>
      {action && (
        <button style={{ ...BODY, ...S.textXs, ...S.semibold, color: B.navy, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          {action} ›
        </button>
      )}
    </div>
  );
}

// ── Card
export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...S.card, ...style }}>{children}</div>;
}

// ── Badge
type BadgeVariant = "default" | "green" | "red" | "blue" | "lime";
export function Badge({ label, variant = "default" }: { label: string; variant?: BadgeVariant }) {
  const map: Record<BadgeVariant, [string, string]> = {
    default: ["#EAF3FB", B.metallic],
    green:   ["#E8F5E9", "#2E7D32"],
    red:     ["#FFEBEE", "#C62828"],
    blue:    ["#E3F2FD", B.navy],
    lime:    ["#F1F8E9", B.forest],
  };
  const [bg, clr] = map[variant];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600, background: bg, color: clr, ...BODY }}>
      {label}
    </span>
  );
}

// ── Sub-tab bar (used inside each dept section)
export function SubTabBar({ tabs, active, onChange, bgColor }: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  bgColor?: string;
}) {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingLeft: 32, display: 'flex', gap: 0, background: bgColor || 'transparent', overflowX: 'auto' }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)}
          style={{
            ...BODY, padding: '12px 16px', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            color: active === t.id ? '#fff' : 'rgba(255,255,255,.55)',
            borderBottom: active === t.id ? `2px solid ${B.lime}` : '2px solid transparent',
          }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── Dept Hero Banner
export function DeptHero({ title, subtitle, color1, color2, actions }: {
  title: string; subtitle: string; color1: string; color2: string;
  actions: { label: string; primary?: boolean }[];
}) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)` }}>
      <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>{title}</h2>
          <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.6)', margin: 0 }}>{subtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {actions.map((a) => (
            <button key={a.label}
              style={{ ...BODY, padding: '8px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: a.primary ? B.lime : 'rgba(255,255,255,.1)', color: '#fff' }}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
