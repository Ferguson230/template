import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DepartmentsGrid, IDepartment } from './components/DepartmentsGrid';

export interface ICosfDepartmentsWebPartProps {
  listName: string;
  showSearch: boolean;
  title: string;
}

const DEMO_DEPARTMENTS: IDepartment[] = [
  { id: '1',  name: 'Police Department',         shortCode: 'PD',   color: '#1D3A56', category: 'Public Safety',    director: 'Chief of Police',             phone: '(470) 809-7300', description: 'Serving and protecting the City of South Fulton with integrity and community partnership.' },
  { id: '2',  name: 'Fire Department',           shortCode: 'FD',   color: '#C0392B', category: 'Public Safety',    director: 'Fire Chief',                  phone: '(470) 809-7400', description: 'Providing fire suppression, rescue, and emergency medical services across the city.' },
  { id: '3',  name: 'Finance',                   shortCode: 'FIN',  color: '#0A72B8', category: 'Administration',   director: 'Finance Director',            phone: '(470) 809-7200', description: 'Managing city revenues, expenditures, financial reporting, and budget administration.' },
  { id: '4',  name: 'Procurement',               shortCode: 'PRO',  color: '#274B71', category: 'Administration',   director: 'Procurement Director',        phone: '(470) 809-7250', description: 'Overseeing purchasing, vendor relationships, and contract management for the city.' },
  { id: '5',  name: 'Public Works',              shortCode: 'PW',   color: '#2D8842', category: 'Infrastructure',   director: 'Public Works Director',       phone: '(470) 809-7500', description: 'Maintaining roads, stormwater systems, and city infrastructure for residents.' },
  { id: '6',  name: 'Community Development',     shortCode: 'CD',   color: '#34AEE3', category: 'Development',      director: 'Community Dev. Director',     phone: '(470) 809-7600', description: 'Planning, zoning, permitting, and building inspection services for the city.' },
  { id: '7',  name: 'Parks & Recreation',        shortCode: 'PRK',  color: '#74B745', category: 'Quality of Life',  director: 'Parks Director',              phone: '(470) 809-7700', description: 'Programming parks, greenways, recreational facilities, and community events.' },
  { id: '8',  name: 'Municipal Court',           shortCode: 'MC',   color: '#6D4C41', category: 'Justice',          director: 'Municipal Court Judge',       phone: '(470) 809-7800', description: 'Adjudicating city ordinance violations, traffic citations, and municipal cases.' },
  { id: '9',  name: 'City Clerk',                shortCode: 'CC',   color: '#4A5568', category: 'Administration',   director: 'City Clerk',                  phone: '(470) 809-7100', description: 'Maintaining official city records, managing elections, and supporting City Council.' },
  { id: '10', name: "City Attorney",             shortCode: 'CA',   color: '#2D3748', category: 'Legal',            director: 'City Attorney',               phone: '(470) 809-7150', description: 'Providing legal counsel and representation for the City of South Fulton.' },
  { id: '11', name: 'Human Resources',           shortCode: 'HR',   color: '#6B46C1', category: 'Administration',   director: 'HR Director',                 phone: '(470) 809-7050', description: 'Managing employee relations, benefits, recruitment, and workforce development.' },
  { id: '12', name: 'Information Technology',    shortCode: 'IT',   color: '#0A72B8', category: 'Technology',       director: 'IT Director',                 phone: '(470) 809-7060', description: 'Delivering technology infrastructure, cybersecurity, and digital services for the city.' },
  { id: '13', name: 'Communications',            shortCode: 'COM',  color: '#D69E2E', category: 'Administration',   director: 'Communications Director',     phone: '(470) 809-7070', description: 'Managing city communications, media relations, social media, and public affairs.' },
  { id: '14', name: 'General Services',          shortCode: 'GS',   color: '#38A169', category: 'Infrastructure',   director: 'General Services Director',   phone: '(470) 809-7080', description: 'Facilities management, fleet services, and operational support for city departments.' },
  { id: '15', name: 'Code Enforcement',          shortCode: 'CE',   color: '#E53E3E', category: 'Development',      director: 'Code Enforcement Director',   phone: '(470) 809-7610', description: 'Enforcing city ordinances, property maintenance codes, and zoning regulations.' },
  { id: '16', name: 'Budget & Strategy',         shortCode: 'BS',   color: '#276749', category: 'Administration',   director: 'Budget Director',             phone: '(470) 809-7210', description: 'Developing the annual budget, performance management, and strategic planning.' },
  { id: '17', name: 'Economic Development',      shortCode: 'ED',   color: '#2B6CB0', category: 'Development',      director: 'Economic Dev. Director',      phone: '(470) 809-7620', description: 'Attracting businesses, supporting entrepreneurs, and fostering economic growth.' },
  { id: '18', name: 'Emergency Management',      shortCode: 'EM',   color: '#C05621', category: 'Public Safety',    director: 'Emergency Mgmt. Director',    phone: '(470) 809-7350', description: 'Coordinating disaster preparedness, response, and recovery for the city.' },
];

export default class CosfDepartmentsWebPart extends BaseClientSideWebPart<ICosfDepartmentsWebPartProps> {
  private _departments: IDepartment[] = [];
  private _loading: boolean = true;

  public onInit(): Promise<void> {
    return this._loadDepartments();
  }

  private _loadDepartments(): Promise<void> {
    const listName = this.properties.listName || 'Department Directory';
    const url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${encodeURIComponent(listName)}')/items?$select=Id,Title,ShortCode,DeptColor,Category,DirectorTitle,Phone,Description&$orderby=Title&$top=500`;

    return this.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (!response.ok) {
          throw new Error('List not found');
        }
        return response.json();
      })
      .then((data: { value: any[] }) => {
        if (data.value && data.value.length > 0) {
          this._departments = data.value.map((item: any) => ({
            id: String(item.Id),
            name: item.Title || '',
            shortCode: item.ShortCode || item.Title.substring(0, 3).toUpperCase(),
            color: item.DeptColor || '#274B71',
            category: item.Category || 'General',
            director: item.DirectorTitle || '',
            phone: item.Phone || '',
            description: item.Description || '',
          }));
        } else {
          this._departments = DEMO_DEPARTMENTS;
        }
      })
      .catch(() => {
        // List doesn't exist yet — use demo data
        this._departments = DEMO_DEPARTMENTS;
      })
      .then(() => {
        this._loading = false;
        this.render();
      });
  }

  public render(): void {
    const element = React.createElement(DepartmentsGrid, {
      departments: this._departments,
      loading: this._loading,
      showSearch: this.properties.showSearch !== false,
      title: this.properties.title || 'City Departments',
    });
    ReactDOM.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDOM.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: 'Departments Grid Settings' },
        groups: [{
          groupName: 'Data Source',
          groupFields: [
            PropertyPaneTextField('listName', {
              label: 'SharePoint List Name',
              description: "Name of the SharePoint list to pull department data from. If the list doesn't exist, built-in demo data is shown.",
              value: this.properties.listName || 'Department Directory',
            }),
          ],
        }, {
          groupName: 'Display',
          groupFields: [
            PropertyPaneTextField('title', {
              label: 'Section Title',
            }),
            PropertyPaneToggle('showSearch', {
              label: 'Show Search Bar',
              onText: 'Visible',
              offText: 'Hidden',
            }),
          ],
        }],
      }],
    };
  }
}
