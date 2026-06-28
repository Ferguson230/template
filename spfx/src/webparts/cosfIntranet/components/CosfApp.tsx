import * as React from 'react';
import { CosfHeader } from './CosfHeader';
import { HomeTab } from './tabs/HomeTab';
import { DepartmentsTab } from './tabs/DepartmentsTab';
import { CityManagerTab, HRTab, ITTab, CommunicationsTab, GeneralServicesTab } from './tabs/SectionTabs';
import { B, HEADLINE, BODY } from './shared/styles';

export interface ICosfAppProps {
  siteUrl: string;
}

export default function CosfApp({ siteUrl }: ICosfAppProps) {
  const [activeTab, setActiveTab] = React.useState('home');

  const tabContent: Record<string, React.ReactElement> = {
    'home':             React.createElement(HomeTab),
    'city-manager':     React.createElement(CityManagerTab),
    'hr':               React.createElement(HRTab),
    'it':               React.createElement(ITTab),
    'communications':   React.createElement(CommunicationsTab),
    'general-services': React.createElement(GeneralServicesTab),
    'departments':      React.createElement(DepartmentsTab),
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F2F5F8', fontFamily: "'Poppins', sans-serif" }}>
      <CosfHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px', minHeight: 'calc(100vh - 110px)' }}>
        {tabContent[activeTab] || tabContent['home']}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: B.metallic, color: '#fff', marginTop: 64 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${B.lime}, ${B.forest})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ ...HEADLINE, color: '#fff', fontWeight: 800, fontSize: 10 }}>CSF</span>
                </div>
                <span style={{ ...HEADLINE, fontWeight: 700, fontSize: 13 }}>City of South Fulton</span>
              </div>
              <p style={{ ...BODY, fontSize: 12, color: 'rgba(255,255,255,.5)', lineHeight: 1.6, margin: 0 }}>Incorporated in 2017 — one of Georgia's newest and fastest-growing cities. A City on the Rise!</p>
            </div>
            {[
              { title: "Quick Links", items: ["City Website", "Council Meeting Videos", "City Code of Ordinances", "Open Records Requests"] },
              { title: "Employee Services", items: ["ADP Workforce Now", "Employee Benefits Portal", "IT Help Desk", "HR Forms Library"] },
              { title: "Contact City Hall", items: ["(470) 809-7700", "5440 Fulton Industrial Blvd SW", "cityofsouthfultonga.gov", "Mon–Fri · 8:30 AM – 5:00 PM"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ ...BODY, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: B.lime, margin: '0 0 12px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ ...BODY, fontSize: 12, color: 'rgba(255,255,255,.6)', marginBottom: 6 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ ...BODY, fontSize: 11, color: 'rgba(255,255,255,.4)', margin: 0 }}>© 2026 City of South Fulton, Georgia · Employee Intranet · For internal use only</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {["Privacy Policy", "Accessibility", "IT Support"].map((l) => (
                <a key={l} href="#" style={{ ...BODY, fontSize: 11, color: 'rgba(255,255,255,.4)', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
