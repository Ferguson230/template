// @ts-nocheck
import * as React from 'react';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface IGlobalHeaderProps {
  context: ApplicationCustomizerContext;
  siteTitle: string;
  tagLine: string;
  logoUrl: string;
}

interface INavItem {
  label: string;
  url: string;
}

const NAV_ITEMS: INavItem[] = [
  { label: 'Home',                   url: '/sites/intranet' },
  { label: "City Manager's Office",  url: '/sites/intranet/city-managers-office' },
  { label: 'Human Resources',        url: '/sites/intranet/hr' },
  { label: 'Information Technology', url: '/sites/intranet/it' },
  { label: 'Communications',         url: '/sites/intranet/communications' },
  { label: 'General Services',       url: '/sites/intranet/general-services' },
  { label: 'Departments',            url: '/sites/intranet/departments' },
];

// Brand tokens
const TOP_BAR  = '#1D3A56';
const NAV_BAR  = '#274B71';
const LIME     = '#74B745';
const NAVY     = '#0A72B8';

const GlobalHeader: React.FC<IGlobalHeaderProps> = ({ context, siteTitle, tagLine, logoUrl }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [userDisplay, setUserDisplay] = React.useState('...');
  const [userInitials, setUserInitials] = React.useState('?');
  const [userPhotoUrl, setUserPhotoUrl] = React.useState('');
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const user = context.pageContext.user;
    if (user) {
      setUserDisplay(user.displayName || user.email || 'User');
      const parts = (user.displayName || '').split(' ').filter(Boolean);
      if (parts.length >= 2) {
        setUserInitials(parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase());
      } else if (parts.length === 1) {
        setUserInitials(parts[0][0].toUpperCase());
      }
      if (user.email) {
        setUserPhotoUrl(
          context.pageContext.web.absoluteUrl.split('/sites/')[0] +
          `/_layouts/15/userphoto.aspx?size=S&username=${encodeURIComponent(user.email)}`
        );
      }
    }
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (url: string): boolean => currentPath.indexOf(url) !== -1;

  const styles: { [key: string]: React.CSSProperties } = {
    root: { fontFamily: "'Poppins', 'Segoe UI', sans-serif", position: 'relative', zIndex: 1000 },
    topBar: {
      backgroundColor: TOP_BAR,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: 56,
    },
    logoArea: { display: 'flex', alignItems: 'center', gap: 12 },
    logoMark: {
      width: 36, height: 36, borderRadius: '50%',
      background: 'linear-gradient(135deg, #74B745, #2D8842)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    },
    logoMarkText: { color: '#fff', fontWeight: 700, fontSize: 10, fontFamily: "'Lexend Deca', sans-serif", letterSpacing: '0.05em' },
    siteTitleText: { fontFamily: "'Lexend Deca', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', lineHeight: 1.2 },
    tagLineText: { color: LIME, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: 500 },
    rightArea: { display: 'flex', alignItems: 'center', gap: 8 },
    avatar: {
      width: 30, height: 30, borderRadius: '50%',
      backgroundColor: NAVY,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 600, fontSize: 12,
      cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
    },
    avatarImg: { width: '100%', height: '100%', objectFit: 'cover' as const },
    userName: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500, cursor: 'pointer' },
    dropdownCaret: { color: 'rgba(255,255,255,0.5)', marginLeft: 2, fontSize: 10 },
    userMenu: {
      position: 'absolute' as const, top: 56, right: 24,
      background: '#fff', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      border: '1px solid #e5e7eb', minWidth: 200, zIndex: 2000,
    },
    userMenuHeader: { padding: '12px 16px', borderBottom: '1px solid #e5e7eb' },
    userMenuName: { fontWeight: 600, fontSize: 14, color: '#111827' },
    userMenuItem: {
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '9px 16px', fontSize: 13, color: '#374151',
      cursor: 'pointer', textDecoration: 'none' as const,
    },
    navBar: {
      backgroundColor: NAV_BAR,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      overflowX: 'auto' as const,
    },
    navInner: { display: 'flex', alignItems: 'center' },
    navLink: {
      display: 'inline-block',
      padding: '12px 20px',
      fontSize: 13, fontWeight: 600,
      color: 'rgba(255,255,255,0.65)',
      textDecoration: 'none' as const,
      whiteSpace: 'nowrap' as const,
      position: 'relative' as const,
      flexShrink: 0,
    },
    navLinkActive: { color: '#fff' },
    activeBar: {
      position: 'absolute' as const, bottom: 0, left: 12, right: 12,
      height: 3, borderRadius: '2px 2px 0 0',
      backgroundColor: LIME,
    },
    mobileToggle: {
      background: 'none', border: 'none', cursor: 'pointer',
      color: '#fff', padding: 8, display: 'none',
    },
    mobileMenu: {
      backgroundColor: TOP_BAR,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '12px 16px',
    },
    mobileNavLink: {
      display: 'block', padding: '10px 12px',
      fontSize: 14, fontWeight: 600,
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none' as const,
      borderRadius: 6,
    },
    mobileNavLinkActive: { backgroundColor: LIME, color: '#fff' },
  };

  const handleUserMenuToggle = (): void => setUserMenuOpen(!userMenuOpen);

  return (
    <div style={styles.root}>
      {/* Top identity bar */}
      <div style={styles.topBar}>
        <div style={styles.logoArea}>
          <div style={styles.logoMark}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
            ) : (
              <span style={styles.logoMarkText}>CSF</span>
            )}
          </div>
          <div>
            <div style={styles.siteTitleText}>{siteTitle.toUpperCase()}</div>
            <div style={styles.tagLineText}>{tagLine}</div>
          </div>
        </div>

        <div style={styles.rightArea}>
          <div style={{ position: 'relative' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 6 }}
              onClick={handleUserMenuToggle}
            >
              <div style={styles.avatar}>
                {userPhotoUrl ? (
                  <img
                    src={userPhotoUrl}
                    alt={userDisplay}
                    style={styles.avatarImg}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <span>{userInitials}</span>
                )}
              </div>
              <span style={styles.userName}>{userDisplay}</span>
              <span style={styles.dropdownCaret}>▾</span>
            </div>

            {userMenuOpen && (
              <div style={styles.userMenu}>
                <div style={styles.userMenuHeader}>
                  <div style={styles.userMenuName}>{userDisplay}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{context.pageContext.user.email}</div>
                </div>
                <a
                  href={`${context.pageContext.web.absoluteUrl.split('/sites/')[0]}/_layouts/15/me.aspx`}
                  style={styles.userMenuItem}
                >
                  👤 My Profile
                </a>
                <a
                  href={`${context.pageContext.web.absoluteUrl}/_layouts/15/settings.aspx`}
                  style={styles.userMenuItem}
                >
                  ⚙️ Site Settings
                </a>
                <div style={{ borderTop: '1px solid #e5e7eb', margin: '4px 0' }} />
                <a
                  href={`${context.pageContext.web.absoluteUrl.split('/sites/')[0]}/_layouts/15/SignOut.aspx`}
                  style={{ ...styles.userMenuItem, color: '#dc2626' }}
                >
                  🚪 Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop nav bar */}
      <div style={styles.navBar} className="cosf-nav-desktop">
        <nav style={styles.navInner}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.url}
              href={item.url}
              style={{ ...styles.navLink, ...(isActive(item.url) ? styles.navLinkActive : {}) }}
            >
              {item.label}
              {isActive(item.url) && <span style={styles.activeBar} />}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={styles.mobileMenu} className="cosf-nav-mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.url}
              href={item.url}
              style={{ ...styles.mobileNavLink, ...(isActive(item.url) ? styles.mobileNavLinkActive : {}) }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive style injection */}
      <style>{`
        @media (max-width: 768px) {
          .cosf-nav-desktop { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export { GlobalHeader };
