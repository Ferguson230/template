import * as React from 'react';
import { B, HEADLINE, BODY } from './shared/styles';

const NAV_ITEMS = [
  { id: 'home',              label: 'Home' },
  { id: 'city-manager',      label: "City Manager's Office" },
  { id: 'hr',                label: 'Human Resources' },
  { id: 'it',                label: 'Information Technology' },
  { id: 'communications',    label: 'Communications' },
  { id: 'general-services',  label: 'General Services' },
  { id: 'departments',       label: 'Departments' },
];

interface CosfHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CosfHeader({ activeTab, onTabChange }: CosfHeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', fontFamily: "'Poppins', sans-serif" }}>
      {/* Top identity bar */}
      <div style={{ backgroundColor: B.topBar, color: '#fff' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${B.lime}, ${B.forest})`, flexShrink: 0 }}>
              <span style={{ ...HEADLINE, color: '#fff', fontWeight: 800, fontSize: 10 }}>CSF</span>
            </div>
            <div>
              <div style={{ ...HEADLINE, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em' }}>CITY OF SOUTH FULTON</div>
              <div style={{ ...BODY, color: B.lime, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Employee Intranet Portal · A City on the Rise!</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', borderRadius: 6, padding: '6px 12px' }}>
              <span style={{ fontSize: 12, opacity: .5 }}>🔍</span>
              <input placeholder="Search policies, forms, staff..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13, width: 200, ...BODY }} />
            </div>
            <button style={{ position: 'relative', padding: 8, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,.8)' }}>🔔</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, cursor: 'pointer' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: B.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600 }}>DF</div>
              <span style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.9)', fontWeight: 500 }}>Dee Ferg</span>
            </div>
          </div>
        </div>
      </div>
      {/* Nav bar */}
      <div style={{ backgroundColor: B.navBar, boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 32px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => onTabChange(item.id)}
                style={{ position: 'relative', padding: '12px 20px', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, border: 'none', background: 'transparent', cursor: 'pointer', ...BODY,
                  color: activeTab === item.id ? '#fff' : 'rgba(255,255,255,.65)',
                  borderBottom: activeTab === item.id ? `2px solid ${B.lime}` : '2px solid transparent',
                }}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
