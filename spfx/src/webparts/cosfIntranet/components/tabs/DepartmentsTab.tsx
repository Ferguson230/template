import * as React from 'react';
import { B, HEADLINE, BODY, S } from '../shared/styles';
import { Badge } from '../shared/Primitives';

const DEPARTMENTS = [
  { name: "Police Department",     short: "PD",    color: B.metallic,  director: "Chief of Police",           phone: "470-809-7750", desc: "Public safety, law enforcement, crime prevention, and community policing.", badge: "Public Safety" },
  { name: "Fire & Rescue",         short: "FIRE",  color: "#C62828",   director: "Fire Chief",                phone: "470-809-7760", desc: "Fire suppression, emergency medical services, hazmat response.", badge: "Public Safety" },
  { name: "Finance",               short: "FIN",   color: B.navy,      director: "Finance Director",          phone: "470-809-7710", desc: "Budget management, accounting, payroll, treasury, and financial reporting.", badge: "Administration" },
  { name: "Procurement",           short: "PROC",  color: B.forest,    director: "Procurement Manager",       phone: "470-809-7715", desc: "Purchasing, vendor management, contract administration, and bidding.", badge: "Administration" },
  { name: "Public Works",          short: "PW",    color: B.darkBlue,  director: "Public Works Director",     phone: "470-809-7720", desc: "Road maintenance, stormwater, sanitation, and infrastructure repair.", badge: "Infrastructure" },
  { name: "Community Development", short: "CD",    color: B.lime,      director: "Community Dev Director",    phone: "470-809-7725", desc: "Planning, zoning, building permits, inspections, and economic development.", badge: "Development" },
  { name: "Parks & Recreation",    short: "PARKS", color: B.pigment,   director: "Parks Director",            phone: "470-809-7730", desc: "City parks, recreation programs, special events, and the Parks Master Plan.", badge: "Quality of Life" },
  { name: "Municipal Court",       short: "COURT", color: B.metallic,  director: "Chief Municipal Judge",     phone: "470-809-7272", desc: "Adjudication of municipal ordinance violations and traffic citations.", badge: "Justice" },
  { name: "City Clerk's Office",   short: "CLERK", color: B.darkBlue,  director: "City Clerk",                phone: "470-809-7272", desc: "Official city records, council meeting agendas, minutes, and elections.", badge: "Administration" },
  { name: "City Attorney",         short: "LAW",   color: B.navy,      director: "City Attorney",             phone: "470-809-7705", desc: "Legal counsel, contract review, litigation support, and compliance.", badge: "Legal" },
  { name: "Human Resources",       short: "HR",    color: B.forest,    director: "HR Director",               phone: "470-809-7740", desc: "Recruitment, employee relations, benefits, training, and workforce development.", badge: "Administration" },
  { name: "Information Technology",short: "IT",    color: B.picton,    director: "IT Director",               phone: "470-809-7745", desc: "City technology infrastructure, cybersecurity, and help desk support.", badge: "Technology" },
  { name: "Communications",        short: "COMM",  color: B.metallic,  director: "Communications Director",   phone: "470-552-4311", desc: "Public affairs, media relations, social media, and branding.", badge: "Administration" },
  { name: "General Services",      short: "GS",    color: B.lime,      director: "General Services Director", phone: "470-809-7755", desc: "Facilities management, city fleet, custodial services, and records.", badge: "Operations" },
  { name: "Code Enforcement",      short: "CODE",  color: "#E65100",   director: "Code Enforcement Director", phone: "470-809-7770", desc: "Property maintenance standards, zoning compliance, and nuisance abatement.", badge: "Enforcement" },
  { name: "Budget & Strategy",     short: "BUDG",  color: B.darkBlue,  director: "Budget Director",           phone: "470-809-7712", desc: "Annual budget preparation, performance management, and fiscal analysis.", badge: "Administration" },
  { name: "Economic Development",  short: "ECON",  color: B.navy,      director: "Economic Dev Director",     phone: "470-809-7780", desc: "Business attraction, retention, small business support, and grant programs.", badge: "Development" },
  { name: "Emergency Management",  short: "EM",    color: "#C62828",   director: "Emergency Mgmt Director",   phone: "470-809-7790", desc: "Disaster preparedness, EOC coordination, and hazard mitigation planning.", badge: "Public Safety" },
];

export function DepartmentsTab() {
  const [search, setSearch] = React.useState('');
  const filtered = DEPARTMENTS.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.badge.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Hero */}
      <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${B.metallic} 0%, ${B.navy} 100%)`, padding: '24px 32px' }}>
        <p style={{ ...BODY, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: B.lime, margin: '0 0 4px' }}>City of South Fulton</p>
        <h2 style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Departments Directory</h2>
        <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.6)', margin: 0 }}>All 18 city departments — find contacts, services, and resources.</p>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
        <span style={{ fontSize: 16, color: '#94A3B8' }}>🔍</span>
        <input type="text" placeholder="Search departments by name or category..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ ...BODY, flex: 1, border: 'none', outline: 'none', fontSize: 13, color: '#1A2332', background: 'transparent' }} />
      </div>

      {/* 3-column card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {filtered.map((dept) => (
          <div key={dept.name} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow .2s' }}>
            {/* Color accent bar */}
            <div style={{ height: 6, backgroundColor: dept.color }} />
            <div style={{ padding: 20 }}>
              {/* Icon + badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${dept.color}18` }}>
                  <span style={{ ...HEADLINE, fontSize: 14, fontWeight: 800, color: dept.color }}>{dept.short}</span>
                </div>
                <Badge label={dept.badge} variant="default" />
              </div>
              {/* Name + desc */}
              <h3 style={{ ...HEADLINE, fontSize: 15, fontWeight: 700, color: B.metallic, margin: '0 0 8px' }}>{dept.name}</h3>
              <p style={{ ...BODY, fontSize: 12, color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>{dept.desc}</p>
              {/* Footer */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ ...BODY, fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{dept.director}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, marginTop: 2, color: dept.color }}>{dept.phone}</div>
                </div>
                <button style={{ ...BODY, fontSize: 12, fontWeight: 600, color: dept.color, background: 'none', border: 'none', cursor: 'pointer' }}>Visit →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748B', ...BODY }}>
          No departments match "<strong>{search}</strong>"
        </div>
      )}
    </div>
  );
}
