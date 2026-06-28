import * as React from 'react';
import { B, HEADLINE, BODY, S } from '../shared/styles';
import { SectionHeader, Card, Badge } from '../shared/Primitives';

export function HomeTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Hero Banner */}
      <div style={{ borderRadius: 16, overflow: 'hidden', minHeight: 160, display: 'flex', alignItems: 'center', background: `linear-gradient(135deg, ${B.metallic} 0%, ${B.navy} 100%)`, position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1, padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ ...BODY, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: B.lime, margin: '0 0 4px' }}>Welcome back</p>
            <h1 style={{ ...HEADLINE, fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>City of South Fulton</h1>
            <p style={{ ...BODY, fontSize: 13, color: 'rgba(255,255,255,.7)', margin: 0 }}>Your employee hub for news, resources, and city operations — One City, One Voice.</p>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[{ val: "247", label: "City Employees" }, { val: "18", label: "Departments" }, { val: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }), label: "Today" }].map((s) => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 20px', textAlign: 'center' }}>
                <div style={{ ...HEADLINE, fontSize: 22, fontWeight: 700, color: '#fff' }}>{s.val}</div>
                <div style={{ ...BODY, fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <SectionHeader label="Quick Access" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {[
            { label: "Submit a Form",     color: B.metallic },
            { label: "Time & Attendance", color: B.navy },
            { label: "Benefits Portal",   color: B.forest },
            { label: "IT Help Desk",      color: B.darkBlue },
            { label: "Policy Library",    color: B.lime },
            { label: "Staff Directory",   color: B.picton },
          ].map(({ label, color }) => (
            <button key={label} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${color}18` }}>
                <span style={{ fontSize: 18, color }}>■</span>
              </div>
              <span style={{ ...BODY, fontSize: 11, fontWeight: 600, color: '#1A2332', lineHeight: 1.3 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <div style={{ gridColumn: '1 / 3', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Announcements */}
          <Card style={{ padding: 24 }}>
            <SectionHeader label="Announcements" action="View all" />
            {[
              { title: "FY2026 Budget Approved by City Council", date: "June 27, 2026", tag: "Important", variant: "red" as const, body: "The City Council unanimously approved the FY2026 operating budget of $82.4M." },
              { title: "New Telework Policy Effective July 1", date: "June 24, 2026", tag: "HR Update", variant: "lime" as const, body: "Eligible employees may request up to two remote workdays per week." },
              { title: "All-Staff Town Hall – July 9, 10 AM", date: "June 20, 2026", tag: "Event", variant: "blue" as const, body: "City Manager Kevin Kilpatrick will host an all-staff virtual town hall." },
            ].map((a) => (
              <div key={a.title} style={{ padding: 16, borderRadius: 8, border: '1px solid #E2E8F0', background: '#F5F8FB', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
                  <h3 style={{ ...BODY, fontSize: 13, fontWeight: 600, color: '#1A2332', margin: 0, lineHeight: 1.4 }}>{a.title}</h3>
                  <Badge label={a.tag} variant={a.variant} />
                </div>
                <p style={{ ...BODY, fontSize: 12, color: '#64748B', margin: '0 0 6px', lineHeight: 1.5 }}>{a.body}</p>
                <span style={{ ...BODY, fontSize: 11, color: '#94A3B8' }}>{a.date}</span>
              </div>
            ))}
          </Card>

          {/* News grid */}
          <div>
            <SectionHeader label="City News" action="All stories" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { tag: "Infrastructure", title: "Wolf Creek Pkwy Extension Breaks Ground", date: "June 26, 2026" },
                { tag: "Community",      title: "South Fulton Earns Georgia City of Excellence Award", date: "June 22, 2026" },
                { tag: "Public Safety",  title: "New Police Precinct Opens in Sandtown District", date: "June 18, 2026" },
                { tag: "Operations",     title: "City Hall Renovation Phase II Underway", date: "June 14, 2026" },
              ].map((n) => (
                <div key={n.title} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                  <div style={{ height: 120, background: `linear-gradient(135deg, ${B.metallic}, ${B.navy})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 32 }}>📸</span>
                  </div>
                  <div style={{ padding: 16 }}>
                    <Badge label={n.tag} variant="blue" />
                    <h3 style={{ ...BODY, fontSize: 13, fontWeight: 600, color: '#1A2332', margin: '8px 0 4px', lineHeight: 1.3 }}>{n.title}</h3>
                    <span style={{ ...BODY, fontSize: 11, color: '#94A3B8' }}>{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card style={{ padding: 20 }}>
            <SectionHeader label="Upcoming Events" action="Calendar" />
            {[
              { day: "Jul", num: "1",  title: "New Telework Policy",       time: "All Day",  color: B.lime },
              { day: "Jul", num: "4",  title: "Independence Day — Closed", time: "Holiday",  color: "#C62828" },
              { day: "Jul", num: "9",  title: "All-Staff Town Hall",       time: "10:00 AM", color: B.metallic },
              { day: "Jul", num: "15", title: "Open Enrollment Begins",    time: "Benefits", color: B.forest },
              { day: "Jul", num: "22", title: "City Council Work Session", time: "6:00 PM",  color: B.navy },
            ].map((e) => (
              <div key={e.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', backgroundColor: e.color }}>
                  <span style={{ fontSize: 9, textTransform: 'uppercase', fontWeight: 600, opacity: .8 }}>{e.day}</span>
                  <span style={{ ...HEADLINE, fontSize: 14, fontWeight: 700 }}>{e.num}</span>
                </div>
                <div>
                  <p style={{ ...BODY, fontSize: 12, fontWeight: 600, color: '#1A2332', margin: '0 0 2px', lineHeight: 1.3 }}>{e.title}</p>
                  <p style={{ ...BODY, fontSize: 11, color: '#64748B', margin: 0 }}>{e.time}</p>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ padding: 20 }}>
            <SectionHeader label="Employee Resources" />
            {["Employee Self-Service (ADP)", "Benefits & Insurance", "Policy Handbook 2026", "Performance Reviews", "Leave Request Portal", "Employee Assistance Program"].map((l) => (
              <button key={l} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', marginBottom: 4 }}>
                <span style={{ width: 16, height: 16, borderRadius: 3, background: `${B.navy}20`, flexShrink: 0 }} />
                <span style={{ ...BODY, fontSize: 12, fontWeight: 500, color: '#1A2332' }}>{l}</span>
              </button>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
