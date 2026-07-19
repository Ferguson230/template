import * as React from 'react';
import { B, HEADLINE, BODY } from './shared/styles';

const NAV_ITEMS = [
  { id: 'home',             label: 'Home' },
  { id: 'city-manager',     label: "City Manager's Office" },
  { id: 'hr',               label: 'Human Resources' },
  { id: 'it',               label: 'Information Technology' },
  { id: 'communications',   label: 'Communications' },
  { id: 'general-services', label: 'General Services' },
  { id: 'departments',      label: 'Departments' },
];

interface ICosfHeaderProps {
  activeTab:    string;
  onTabChange:  (tab: string) => void;
  siteTitle:    string;
  tagLine:      string;
  logoUrl:      string;
  userName:     string;
  userEmail:    string;
  userInitials: string;
  userPhotoUrl: string;
}

export function CosfHeader(props: ICosfHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', fontFamily: "'Poppins', sans-serif" }}>
      {/* Top identity bar */}
      <div style={{ backgroundColor: B.topBar, color: '#fff' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          {/* Logo + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {props.logoUrl ? (
              <img src={props.logoUrl} alt="Logo" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${B.lime}, ${B.forest})`, flexShrink: 0 }}>
                <span style={{ ...HEADLINE, color: '#fff', fontWeight: 800, fontSize: 10 }}>CSF</span>
              </div>
            )}
            <div>
              <div style={{ ...HEADLINE, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' as 'uppercase' }}>{props.siteTitle}</div>
              <div style={{ ...BODY, color: B.lime, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as 'uppercase' }}>{props.tagLine}</div>
            </div>
          </div>

          {/* Search + user */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', borderRadius: 6, padding: '6px 12px' }}>
              <span style={{ fontSize: 12, opacity: .5 }}>🔍</span>
              <input placeholder="Search policies, forms, staff..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13, width: 200, ...BODY }} />
            </div>
            <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255,255,255,.8)', fontSize: 16 }}>🔔</button>

            {/* User menu */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={props.userPhotoUrl} alt={props.userInitials}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.style.background = B.navy;
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span style="color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;height:100%">${props.userInitials}</span>`;
                    }} />
                </div>
                <span style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.9)', fontWeight: 500 }}>{props.userName}</span>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 10 }}>▼</span>
              </button>

              {userMenuOpen && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, width: 200, background: '#fff', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,.15)', border: '1px solid #E2E8F0', overflow: 'hidden', zIndex: 100 }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ ...BODY, fontWeight: 600, fontSize: 13, color: '#1A2332' }}>{props.userName}</div>
                    <div style={{ ...BODY, fontSize: 11, color: '#64748B', marginTop: 2 }}>{props.userEmail}</div>
                  </div>
                  <div style={{ padding: '4px 0' }}>
                    {["My Profile", "Settings"].map((item) => (
                      <button key={item} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', ...BODY, fontSize: 13, color: '#1A2332', textAlign: 'left' as 'left' }}>
                        {item}
                      </button>
                    ))}
                    <div style={{ borderTop: '1px solid #E2E8F0', margin: '4px 0' }} />
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', ...BODY, fontSize: 13, color: '#DC2626', textAlign: 'left' as 'left' }}>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div style={{ backgroundColor: B.navBar, boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 32px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', overflowX: 'auto' as 'auto' }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => props.onTabChange(item.id)}
                style={{ position: 'relative', padding: '12px 20px', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' as 'nowrap', flexShrink: 0, border: 'none', background: 'transparent', cursor: 'pointer', ...BODY,
                  color: props.activeTab === item.id ? '#fff' : 'rgba(255,255,255,.65)',
                  borderBottom: props.activeTab === item.id ? `2px solid ${B.lime}` : '2px solid transparent',
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
