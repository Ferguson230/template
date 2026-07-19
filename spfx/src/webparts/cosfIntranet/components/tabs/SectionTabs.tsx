import * as React from 'react';
import { B, HEADLINE, BODY, S } from '../shared/styles';
import { SectionHeader, Card, Badge, SubTabBar, DeptHero } from '../shared/Primitives';

// ── CITY MANAGER TAB
export function CityManagerTab() {
  const [active, setActive] = React.useState('overview');
  const subTabs = [
    { id: 'overview',   label: 'Overview' },
    { id: 'priorities', label: 'Strategic Priorities' },
    { id: 'memos',      label: 'Memos & Directives' },
    { id: 'budget',     label: 'Budget' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${B.metallic} 0%, ${B.navy} 100%)` }}>
        <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${B.navy}, ${B.metallic})`, border: `2px solid ${B.lime}`, color: '#fff', fontWeight: 700, fontSize: 18, ...HEADLINE }}>KK</div>
          <div>
            <p style={{ ...BODY, fontSize: 11, color: B.lime, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 2px' }}>City Manager's Office</p>
            <h2 style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>Kevin Kilpatrick</h2>
            <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.6)', margin: 0 }}>City Manager · City of South Fulton, Georgia</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{ ...BODY, padding: '8px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', background: B.lime, color: '#fff' }}>Schedule Meeting</button>
            <button style={{ ...BODY, padding: '8px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.1)', color: '#fff' }}>Contact Office</button>
          </div>
        </div>
        <SubTabBar tabs={subTabs} active={active} onChange={setActive} />
      </div>
      {active === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Card style={{ padding: 24 }}>
            <SectionHeader label="Office at a Glance" />
            {[["City Manager", "Kevin Kilpatrick"], ["Deputy City Manager", "TBD"], ["Chief of Staff", "TBD"], ["Main Line", "470-809-7700"], ["Email", "citymanager@southfultonga.gov"]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ ...BODY, fontSize: 12, color: '#64748B' }}>{k}</span>
                <span style={{ ...BODY, fontSize: 12, fontWeight: 600, color: '#1A2332' }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card style={{ padding: 24 }}>
            <SectionHeader label="Recent Activity" />
            {["FY2026 Budget signed", "Telework policy approved", "Wolf Creek groundbreaking", "Town Hall scheduled for July 9"].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: B.lime, flexShrink: 0 }} />
                <span style={{ ...BODY, fontSize: 12, color: '#1A2332' }}>{item}</span>
              </div>
            ))}
          </Card>
        </div>
      )}
      {active !== 'overview' && (
        <Card style={{ padding: 24 }}>
          <SectionHeader label={subTabs.find(t => t.id === active)?.label || ''} />
          <p style={{ ...BODY, fontSize: 13, color: '#64748B' }}>Content for this section is managed by the City Manager's Office. Contact citymanager@southfultonga.gov to update.</p>
        </Card>
      )}
    </div>
  );
}

// ── HR TAB
export function HRTab() {
  const [active, setActive] = React.useState('overview');
  const subTabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'benefits',  label: 'Benefits' },
    { id: 'policies',  label: 'Policies & Handbook' },
    { id: 'training',  label: 'Training & Dev' },
    { id: 'onboarding',label: 'Onboarding' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${B.forest} 0%, ${B.navy} 100%)` }}>
        <div style={{ padding: '24px 32px' }}>
          <p style={{ ...BODY, fontSize: 11, color: B.lime, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>Department</p>
          <h2 style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Human Resources</h2>
          <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.6)', margin: 0 }}>Recruitment, benefits, training, and employee relations for all city staff.</p>
        </div>
        <SubTabBar tabs={subTabs} active={active} onChange={setActive} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {[
          { label: "Open Positions", value: "12", sub: "Active job postings" },
          { label: "Benefits Enrollment", value: "Open", sub: "Until Aug 31, 2026" },
          { label: "Training Courses", value: "34", sub: "Available this quarter" },
        ].map((s) => (
          <Card key={s.label} style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ ...HEADLINE, fontSize: 32, fontWeight: 700, color: B.navy, marginBottom: 4 }}>{s.value}</div>
            <div style={{ ...BODY, fontSize: 14, fontWeight: 600, color: '#1A2332', marginBottom: 2 }}>{s.label}</div>
            <div style={{ ...BODY, fontSize: 12, color: '#64748B' }}>{s.sub}</div>
          </Card>
        ))}
      </div>
      <Card style={{ padding: 24 }}>
        <SectionHeader label="Quick HR Links" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {["ADP Workforce Now", "Benefits Portal", "Submit a Leave Request", "Policy Handbook 2026", "Performance Reviews", "Training & Dev Calendar", "Employee Assistance Program", "Job Postings"].map((l) => (
            <button key={l} style={{ ...BODY, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#F5F8FB', cursor: 'pointer', fontSize: 13, color: '#1A2332', textAlign: 'left' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: B.forest, flexShrink: 0 }} />
              {l}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── IT TAB
export function ITTab() {
  const [active, setActive] = React.useState('overview');
  const subTabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'status',    label: 'System Status' },
    { id: 'helpdesk',  label: 'Help Desk' },
    { id: 'resources', label: 'Resources & Guides' },
    { id: 'security',  label: 'Security' },
  ];
  const systems = [
    { name: "Email (Microsoft 365)", status: "Operational", color: "#16A34A" },
    { name: "SharePoint Intranet",   status: "Operational", color: "#16A34A" },
    { name: "ADP Workforce Now",     status: "Operational", color: "#16A34A" },
    { name: "VPN",                   status: "Operational", color: "#16A34A" },
    { name: "Phone System",          status: "Maintenance", color: "#D97706" },
    { name: "Tyler Munis ERP",       status: "Operational", color: "#16A34A" },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${B.picton} 0%, ${B.navy} 100%)` }}>
        <div style={{ padding: '24px 32px' }}>
          <p style={{ ...BODY, fontSize: 11, color: B.lime, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>Department</p>
          <h2 style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Information Technology</h2>
          <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.6)', margin: 0 }}>City technology infrastructure, cybersecurity, and employee support.</p>
        </div>
        <SubTabBar tabs={subTabs} active={active} onChange={setActive} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card style={{ padding: 24 }}>
          <SectionHeader label="System Status" />
          {systems.map((s) => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0' }}>
              <span style={{ ...BODY, fontSize: 13, color: '#1A2332' }}>{s.name}</span>
              <span style={{ ...BODY, fontSize: 12, fontWeight: 600, color: s.color, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: s.color, display: 'inline-block' }} />
                {s.status}
              </span>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 24 }}>
          <SectionHeader label="Submit a Help Desk Ticket" />
          <p style={{ ...BODY, fontSize: 13, color: '#64748B', marginBottom: 16 }}>Get help with hardware, software, network, or account issues. Average response: 4 hours.</p>
          <button style={{ ...BODY, padding: '10px 20px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', background: B.navy, color: '#fff', marginBottom: 16 }}>Submit a Ticket</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {["Emergency IT Support: x2301", "Help Desk Email: it@southfultonga.gov", "Hours: Mon–Fri 8 AM – 5 PM"].map((l) => (
              <span key={l} style={{ ...BODY, fontSize: 12, color: '#64748B' }}>{l}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── COMMUNICATIONS TAB
export function CommunicationsTab() {
  const [active, setActive] = React.useState('overview');
  const subTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'press',    label: 'Press & Media' },
    { id: 'social',   label: 'Social Media' },
    { id: 'brand',    label: 'Brand Assets' },
    { id: 'internal', label: 'Internal Comms' },
    { id: 'submit',   label: 'Submit a Request' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${B.metallic} 0%, ${B.darkBlue} 100%)` }}>
        <div style={{ padding: '24px 32px' }}>
          <p style={{ ...BODY, fontSize: 11, color: B.lime, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>Department</p>
          <h2 style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Communications</h2>
          <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.6)', margin: 0 }}>Public affairs, media relations, social media, and brand stewardship.</p>
        </div>
        <SubTabBar tabs={subTabs} active={active} onChange={setActive} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card style={{ padding: 24 }}>
          <SectionHeader label="Brand Guidelines" />
          <p style={{ ...BODY, fontSize: 13, color: '#64748B', marginBottom: 16 }}>All external-facing materials must follow the City of South Fulton 2024 Brand Standards.</p>
          {[["Primary Color", B.navy, "Navy Blue #0A72B8"], ["Accent Color", B.lime, "Lime Green #74B745"], ["Secondary", B.metallic, "Metallic Blue #274B71"]].map(([label, color, hex]) => (
            <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: color as string, flexShrink: 0 }} />
              <div>
                <div style={{ ...BODY, fontSize: 12, fontWeight: 600, color: '#1A2332' }}>{label as string}</div>
                <div style={{ ...BODY, fontSize: 11, color: '#64748B' }}>{hex as string}</div>
              </div>
            </div>
          ))}
          <button style={{ ...BODY, marginTop: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', background: B.navy, color: '#fff' }}>Download Brand Kit</button>
        </Card>
        <Card style={{ padding: 24 }}>
          <SectionHeader label="Submit a Communications Request" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {["Press Release / Media Inquiry", "Social Media Post Request", "Event Photography / Videography", "Newsletter Feature", "Signage / Design Request", "Internal Announcement"].map((item) => (
              <button key={item} style={{ ...BODY, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#F5F8FB', cursor: 'pointer', fontSize: 13, color: '#1A2332', textAlign: 'left' }}>
                <span style={{ color: B.metallic }}>→</span> {item}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── GENERAL SERVICES TAB
export function GeneralServicesTab() {
  const [active, setActive] = React.useState('overview');
  const subTabs = [
    { id: 'overview',   label: 'Overview' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'fleet',      label: 'Fleet Management' },
    { id: 'purchasing', label: 'Purchasing & Vendors' },
    { id: 'records',    label: 'Records Management' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${B.lime} 0%, ${B.forest} 100%)` }}>
        <div style={{ padding: '24px 32px' }}>
          <p style={{ ...BODY, fontSize: 11, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px', opacity: .7 }}>Department</p>
          <h2 style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>General Services</h2>
          <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.7)', margin: 0 }}>Facilities, fleet, purchasing, records management, and city operations support.</p>
        </div>
        <SubTabBar tabs={subTabs} active={active} onChange={setActive} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {[{ label: "City Facilities", value: "12", sub: "Managed locations" }, { label: "Fleet Vehicles", value: "79", sub: "Active city vehicles" }, { label: "Active Contracts", value: "43", sub: "Vendor agreements" }].map((s) => (
          <Card key={s.label} style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ ...HEADLINE, fontSize: 32, fontWeight: 700, color: B.forest, marginBottom: 4 }}>{s.value}</div>
            <div style={{ ...BODY, fontSize: 14, fontWeight: 600, color: '#1A2332', marginBottom: 2 }}>{s.label}</div>
            <div style={{ ...BODY, fontSize: 12, color: '#64748B' }}>{s.sub}</div>
          </Card>
        ))}
      </div>
      <Card style={{ padding: 24 }}>
        <SectionHeader label="Service Requests" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {["Submit Facility Work Order", "Reserve a City Vehicle", "Submit a Purchase Request", "Records Request (FOIA)", "Report a Facilities Issue", "Vendor Registration"].map((l) => (
            <button key={l} style={{ ...BODY, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#F5F8FB', cursor: 'pointer', fontSize: 13, color: '#1A2332', textAlign: 'left' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: B.lime, flexShrink: 0 }} />
              {l}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
