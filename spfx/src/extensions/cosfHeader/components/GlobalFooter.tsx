import * as React from 'react';
import { useState, useEffect } from 'react';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const NAVY = '#0A72B8';
const META = '#274B71';
const LIME = '#74B745';
const TOP  = '#1D3A56';

interface IFooterLink {
  Title: string;
  FooterLinkUrl: string;
  FooterColumn: string;
  SortOrder: number;
}

interface IGlobalFooterProps {
  context: ApplicationCustomizerContext;
}

const DEFAULT_LINKS: IFooterLink[] = [
  // City Manager's Office
  { Title: "City Manager", FooterLinkUrl: "/sites/intranet/city-managers-office", FooterColumn: "City Manager's Office", SortOrder: 1 },
  { Title: "Strategic Plan", FooterLinkUrl: "/sites/intranet/city-managers-office/strategic-plan", FooterColumn: "City Manager's Office", SortOrder: 2 },
  { Title: "Legislative Updates", FooterLinkUrl: "/sites/intranet/city-managers-office/legislative-updates", FooterColumn: "City Manager's Office", SortOrder: 3 },
  // Human Resources
  { Title: "Benefits", FooterLinkUrl: "/sites/intranet/hr/benefits", FooterColumn: "Human Resources", SortOrder: 1 },
  { Title: "Policies & Handbook", FooterLinkUrl: "/sites/intranet/hr/policies", FooterColumn: "Human Resources", SortOrder: 2 },
  { Title: "Training", FooterLinkUrl: "/sites/intranet/hr/training", FooterColumn: "Human Resources", SortOrder: 3 },
  { Title: "Payroll", FooterLinkUrl: "/sites/intranet/hr/payroll", FooterColumn: "Human Resources", SortOrder: 4 },
  // Information Technology
  { Title: "Help Desk", FooterLinkUrl: "/sites/intranet/it/helpdesk", FooterColumn: "Information Technology", SortOrder: 1 },
  { Title: "Software Requests", FooterLinkUrl: "/sites/intranet/it/software", FooterColumn: "Information Technology", SortOrder: 2 },
  { Title: "IT Policies", FooterLinkUrl: "/sites/intranet/it/policies", FooterColumn: "Information Technology", SortOrder: 3 },
  // Communications
  { Title: "City News", FooterLinkUrl: "/sites/intranet/communications/news", FooterColumn: "Communications", SortOrder: 1 },
  { Title: "Press Releases", FooterLinkUrl: "/sites/intranet/communications/press", FooterColumn: "Communications", SortOrder: 2 },
  { Title: "Brand Assets", FooterLinkUrl: "/sites/intranet/communications/brand", FooterColumn: "Communications", SortOrder: 3 },
  // General Services
  { Title: "Fleet & Facilities", FooterLinkUrl: "/sites/intranet/general-services/fleet", FooterColumn: "General Services", SortOrder: 1 },
  { Title: "Procurement", FooterLinkUrl: "/sites/intranet/general-services/procurement", FooterColumn: "General Services", SortOrder: 2 },
  { Title: "Work Orders", FooterLinkUrl: "/sites/intranet/general-services/work-orders", FooterColumn: "General Services", SortOrder: 3 },
  { Title: "Departments", FooterLinkUrl: "/sites/intranet/departments", FooterColumn: "General Services", SortOrder: 4 },
];

function groupByColumn(links: IFooterLink[]): Record<string, IFooterLink[]> {
  return links.reduce((acc, link) => {
    if (!acc[link.FooterColumn]) acc[link.FooterColumn] = [];
    acc[link.FooterColumn].push(link);
    return acc;
  }, {} as Record<string, IFooterLink[]>);
}

export const GlobalFooter: React.FC<IGlobalFooterProps> = ({ context }) => {
  const [links, setLinks] = useState<IFooterLink[]>(DEFAULT_LINKS);
  const [loaded, setLoaded] = useState(false);
  const webUrl = context.pageContext.web.absoluteUrl;

  useEffect(() => {
    const url = `${webUrl}/_api/web/lists/getbytitle('Intranet Footer Links')/items` +
      `?$select=Title,FooterLinkUrl,FooterColumn,SortOrder&$orderby=FooterColumn,SortOrder&$top=200`;

    context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((res: SPHttpClientResponse) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data: { value: IFooterLink[] } | null) => {
        if (data && data.value && data.value.length > 0) {
          setLinks(data.value);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const grouped = groupByColumn(links);
  const columns = Object.keys(grouped).sort();

  return (
    <div style={{ fontFamily: "'Poppins','Segoe UI',sans-serif" }}>
      {/* Lime accent stripe */}
      <div style={{ height: 4, backgroundColor: LIME }} />

      {/* Main footer body */}
      <div style={{ backgroundColor: META, padding: '40px 48px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 40, flexWrap: 'wrap' }}>

          {/* Brand column */}
          <div style={{ flex: '0 0 200px', minWidth: 160 }}>
            <div style={{ color: '#fff', fontFamily: "'Lexend Deca','Segoe UI',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
              City of South Fulton
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, lineHeight: 1.5, marginBottom: 16 }}>
              Employee Intranet Portal
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: LIME }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>South Fulton, Georgia</span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col} style={{ flex: '1 1 140px', minWidth: 120 }}>
              <div style={{ color: LIME, fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                {col}
              </div>
              {grouped[col].map((link, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <a
                    href={link.FooterLinkUrl}
                    style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, textDecoration: 'none', lineHeight: 1.4 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)'; }}
                  >
                    {link.Title}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: TOP, padding: '12px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
          © {new Date().getFullYear()} City of South Fulton, Georgia. All rights reserved.
        </div>
        <a
          href={`${webUrl}/Lists/IntranetFooterLinks`}
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textDecoration: 'none' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = LIME; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'; }}
        >
          ✎ Edit footer links
        </a>
      </div>
    </div>
  );
};
