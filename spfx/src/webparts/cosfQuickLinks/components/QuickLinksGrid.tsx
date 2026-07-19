import * as React from 'react';

export interface IQuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  sort: number;
}

interface IQuickLinksGridProps {
  links: IQuickLink[];
  loading: boolean;
  title: string;
}

const NAVY = '#0A72B8';
const META = '#274B71';
const LIME = '#74B745';

const QuickLinksGrid: React.FC<IQuickLinksGridProps> = ({ links, loading, title }) => {
  if (loading) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: '#6b7280', fontFamily: "'Poppins','Segoe UI',sans-serif" }}>
        Loading links…
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins','Segoe UI',sans-serif", padding: '24px 0' }}>
      <h2 style={{ margin: '0 0 16px 4px', fontSize: 18, fontWeight: 700, color: META, fontFamily: "'Lexend Deca','Segoe UI',sans-serif" }}>
        🔗 {title}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: 12,
      }}>
        {links.map((link) => (
          <QuickLinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
};

const QuickLinkCard: React.FC<{ link: IQuickLink }> = ({ link }) => {
  const [hovered, setHovered] = React.useState(false);
  const isExternal = link.url.indexOf('http') === 0 && link.url.indexOf(window.location.hostname) === -1;

  return (
    <a
      href={link.url}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
        padding: '18px 12px',
        background: hovered ? NAVY : '#fff',
        border: `2px solid ${hovered ? NAVY : '#e5e7eb'}`,
        borderRadius: 12,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 6px 20px rgba(10,114,184,0.25)` : '0 1px 4px rgba(0,0,0,0.06)',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8, lineHeight: 1 }}>
        {link.icon}
      </div>
      <div style={{
        fontSize: 12, fontWeight: 600, lineHeight: 1.3,
        color: hovered ? '#fff' : '#374151',
        wordBreak: 'break-word',
      }}>
        {link.title}
      </div>
      {isExternal && (
        <div style={{ fontSize: 9, color: hovered ? 'rgba(255,255,255,0.6)' : '#9ca3af', marginTop: 4 }}>↗ external</div>
      )}
    </a>
  );
};

export { QuickLinksGrid };
