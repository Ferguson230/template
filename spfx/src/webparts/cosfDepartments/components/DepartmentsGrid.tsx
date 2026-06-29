import * as React from 'react';

export interface IDepartment {
  id: string;
  name: string;
  shortCode: string;
  color: string;
  category: string;
  director: string;
  phone: string;
  description: string;
}

interface IDepartmentsGridProps {
  departments: IDepartment[];
  loading: boolean;
  showSearch: boolean;
  title: string;
}

const NAVY  = '#0A72B8';
const LIME  = '#74B745';
const META  = '#274B71';

const DepartmentsGrid: React.FC<IDepartmentsGridProps> = ({ departments, loading, showSearch, title }) => {
  const [query, setQuery] = React.useState('');

  const filtered = departments.filter((d) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      d.name.toLowerCase().indexOf(q) !== -1 ||
      d.category.toLowerCase().indexOf(q) !== -1 ||
      d.shortCode.toLowerCase().indexOf(q) !== -1
    );
  });

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#6b7280', fontFamily: "'Poppins','Segoe UI',sans-serif" }}>
        Loading departments…
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins','Segoe UI',sans-serif", padding: '32px 24px', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: META, fontFamily: "'Lexend Deca','Segoe UI',sans-serif" }}>{title}</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>{departments.length} departments · City of South Fulton</p>
        </div>
        {showSearch && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 14px', minWidth: 240 }}>
            <span style={{ color: '#9ca3af', fontSize: 14 }}>🔍</span>
            <input
              type="text"
              placeholder="Search departments or categories…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: 13, color: '#374151', background: 'transparent', width: '100%' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 16, lineHeight: 1 }}>×</button>
            )}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
          <p style={{ fontSize: 15, margin: 0 }}>No departments match "{query}"</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {filtered.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
      )}
    </div>
  );
};

const DeptCard: React.FC<{ dept: IDepartment }> = ({ dept }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.14)' : '0 2px 8px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        cursor: 'pointer',
        border: '1px solid #f1f5f9',
      }}
    >
      {/* Color band */}
      <div style={{ backgroundColor: dept.color, height: 6 }} />

      <div style={{ padding: '18px 20px 20px' }}>
        {/* Top row: badge + category chip */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            backgroundColor: dept.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 13,
            fontFamily: "'Lexend Deca','Segoe UI',sans-serif",
            flexShrink: 0,
          }}>
            {dept.shortCode}
          </div>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: dept.color,
            background: `${dept.color}18`,
            padding: '3px 10px', borderRadius: 20,
          }}>
            {dept.category}
          </span>
        </div>

        {/* Name */}
        <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{dept.name}</h3>

        {/* Description */}
        <p style={{ margin: '0 0 14px', fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{dept.description}</p>

        {/* Director + Phone */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {dept.director && (
            <div style={{ fontSize: 11, color: '#9ca3af' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>Director:</span> {dept.director}
            </div>
          )}
          {dept.phone && (
            <div style={{ fontSize: 11 }}>
              <a href={`tel:${dept.phone}`} style={{ color: NAVY, textDecoration: 'none', fontWeight: 600 }}>{dept.phone}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { DepartmentsGrid };
