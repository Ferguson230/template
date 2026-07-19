import * as React from 'react';

export interface IAnnouncement {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  date: string;
}

interface IAnnouncementsFeedProps {
  announcements: IAnnouncement[];
  loading: boolean;
  title: string;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  'Important':  '#dc2626',
  'Emergency':  '#7c3aed',
  'HR Update':  '#6B46C1',
  'IT Notice':  '#0A72B8',
  'Event':      '#74B745',
  'General':    '#274B71',
};

const PRIORITY_BG: { [key: string]: string } = {
  'High':   '#fef2f2',
  'Normal': '#f8fafc',
  'Low':    '#f8fafc',
};

const PRIORITY_BORDER: { [key: string]: string } = {
  'High':   '#fecaca',
  'Normal': '#e5e7eb',
  'Low':    '#e5e7eb',
};

const AnnouncementsFeed: React.FC<IAnnouncementsFeedProps> = ({ announcements, loading, title }) => {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  if (loading) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: '#6b7280', fontFamily: "'Poppins','Segoe UI',sans-serif" }}>
        Loading announcements…
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins','Segoe UI',sans-serif", padding: '24px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '0 4px' }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#274B71', fontFamily: "'Lexend Deca','Segoe UI',sans-serif" }}>
          📢 {title}
        </h2>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>{announcements.length} items</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {announcements.map((item) => {
          const isOpen = expanded === item.id;
          const catColor = CATEGORY_COLORS[item.category] || '#274B71';

          return (
            <div
              key={item.id}
              style={{
                background: PRIORITY_BG[item.priority] || '#f8fafc',
                border: `1px solid ${PRIORITY_BORDER[item.priority] || '#e5e7eb'}`,
                borderLeft: `4px solid ${catColor}`,
                borderRadius: 8,
                overflow: 'hidden',
                transition: 'box-shadow 0.15s ease',
              }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '14px 16px', textAlign: 'left', display: 'flex',
                  alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                      color: catColor, background: `${catColor}18`,
                      padding: '2px 8px', borderRadius: 12,
                      textTransform: 'uppercase',
                    }}>
                      {item.category}
                    </span>
                    {item.priority === 'High' && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#dc2626', letterSpacing: '0.06em' }}>
                        ● HIGH PRIORITY
                      </span>
                    )}
                    <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 'auto' }}>{item.date}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>
                    {item.title}
                  </div>
                </div>
                <span style={{ color: '#9ca3af', fontSize: 18, flexShrink: 0, marginTop: 2 }}>
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {isOpen && (
                <div style={{ padding: '0 16px 16px', fontSize: 13, color: '#374151', lineHeight: 1.7, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ paddingTop: 12 }}>{item.body}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { AnnouncementsFeed };
