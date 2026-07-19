// @ts-nocheck
import * as React from 'react';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface IGlobalFooterProps {
  context: ApplicationCustomizerContext;
  siteTitle: string;
}

const TOP_BAR = '#1D3A56';
const META    = '#274B71';
const LIME    = '#74B745';
const NAVY    = '#0A72B8';

const FOOTER_LINKS: { heading: string; links: { label: string; url: string }[] }[] = [
  {
    heading: "City Manager's Office",
    links: [
      { label: 'About the City Manager', url: '/sites/intranet/city-managers-office' },
      { label: 'Strategic Plan',          url: '/sites/intranet/city-managers-office/strategic-plan' },
      { label: 'City Council Updates',    url: '/sites/intranet/city-managers-office/council-updates' },
      { label: 'Policies & Procedures',  url: '/sites/intranet/city-managers-office/policies' },
    ],
  },
  {
    heading: 'Human Resources',
    links: [
      { label: 'Benefits & Enrollment',  url: '/sites/intranet/hr/benefits' },
      { label: 'Employee Handbook',      url: '/sites/intranet/hr/handbook' },
      { label: 'Pay & Timekeeping',      url: '/sites/intranet/hr/payroll' },
      { label: 'Training & Development', url: '/sites/intranet/hr/training' },
    ],
  },
  {
    heading: 'Information Technology',
    links: [
      { label: 'IT Help Desk',           url: '/sites/intranet/it/helpdesk' },
      { label: 'Software Requests',      url: '/sites/intranet/it/software' },
      { label: 'Security Policies',      url: '/sites/intranet/it/security' },
      { label: 'Remote Access',          url: '/sites/intranet/it/remote-access' },
    ],
  },
  {
    heading: 'Communications',
    links: [
      { label: 'Brand Guidelines',       url: '/sites/intranet/communications/brand' },
      { label: 'News & Announcements',   url: '/sites/intranet/communications/news' },
      { label: 'Media Requests',         url: '/sites/intranet/communications/media' },
      { label: 'Social Media Policy',    url: '/sites/intranet/communications/social-media' },
    ],
  },
  {
    heading: 'General Services',
    links: [
      { label: 'Facilities Requests',    url: '/sites/intranet/general-services/facilities' },
      { label: 'Fleet & Vehicles',       url: '/sites/intranet/general-services/fleet' },
      { label: 'Supply & Procurement',   url: '/sites/intranet/general-services/supply' },
      { label: 'Work Orders',            url: '/sites/intranet/general-services/work-orders' },
    ],
  },
];

const GlobalFooter: React.FC<IGlobalFooterProps> = ({ context, siteTitle }) => {
  const year = new Date().getFullYear();
  const webUrl = context.pageContext.web.absoluteUrl;

  return (
    <footer style={{ fontFamily: "'Poppins','Segoe UI',sans-serif", marginTop: 0 }}>
      {/* Lime accent stripe */}
      <div style={{ height: 5, backgroundColor: LIME }} />

      {/* Main footer body */}
      <div style={{ backgroundColor: META, color: '#e2e8f0', padding: '48px 40px 32px' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px 40px',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #74B745, #2D8842)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 10, fontFamily: "'Lexend Deca',sans-serif" }}>CSF</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Lexend Deca',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: '#fff' }}>
                  {siteTitle.toUpperCase()}
                </div>
                <div style={{ fontSize: 10, color: LIME, letterSpacing: '0.1em' }}>EMPLOYEE INTRANET</div>
              </div>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: '#94a3b8', margin: '0 0 16px' }}>
              Connecting city employees with the resources, information, and tools they need to serve our community.
            </p>
            <a
              href="https://www.cityofsouthfultonga.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: LIME, textDecoration: 'none', fontWeight: 600 }}
            >
              cityofsouthfultonga.gov ↗
            </a>
          </div>

          {/* Nav link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 style={{
                margin: '0 0 12px',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: LIME,
              }}>
                {col.heading}
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {col.links.map((link) => (
                  <li key={link.url} style={{ marginBottom: 8 }}>
                    <a
                      href={link.url}
                      style={{ fontSize: 13, color: '#cbd5e1', textDecoration: 'none' }}
                      onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                      onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        backgroundColor: TOP_BAR,
        padding: '14px 40px',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        gap: 12,
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
          © {year} City of South Fulton, Georgia. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Site Settings',  url: `${webUrl}/_layouts/15/settings.aspx` },
            { label: 'Accessibility',  url: '/sites/intranet/accessibility' },
            { label: 'IT Help Desk',   url: '/sites/intranet/it/helpdesk' },
          ].map((item) => (
            <a
              key={item.url}
              href={item.url}
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
              onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'; }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export { GlobalFooter };
