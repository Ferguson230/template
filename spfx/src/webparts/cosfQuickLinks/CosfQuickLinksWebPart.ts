import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QuickLinksGrid, IQuickLink } from './components/QuickLinksGrid';

export interface ICosfQuickLinksWebPartProps {
  listName: string;
  title: string;
}

const DEMO_LINKS: IQuickLink[] = [
  { id: '1', title: 'Submit a Form',       url: '/SitePages/forms.aspx',         icon: '📋', sort: 1 },
  { id: '2', title: 'Time & Attendance',   url: 'https://workforcenow.adp.com',  icon: '🕐', sort: 2 },
  { id: '3', title: 'Benefits Portal',     url: '/SitePages/hr-benefits.aspx',   icon: '❤️', sort: 3 },
  { id: '4', title: 'IT Help Desk',        url: '/SitePages/it-helpdesk.aspx',   icon: '💻', sort: 4 },
  { id: '5', title: 'Policy Library',      url: '/SitePages/hr-policies.aspx',   icon: '📖', sort: 5 },
  { id: '6', title: 'Staff Directory',     url: '/SitePages/departments.aspx',   icon: '👥', sort: 6 },
];

export default class CosfQuickLinksWebPart extends BaseClientSideWebPart<ICosfQuickLinksWebPartProps> {
  private _links: IQuickLink[] = [];
  private _loading: boolean = true;

  public onInit(): Promise<void> {
    return this._loadLinks();
  }

  private _loadLinks(): Promise<void> {
    const listName = this.properties.listName || 'Intranet Quick Links';
    const url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${encodeURIComponent(listName)}')/items?$select=Id,Title,QuickLinkUrl,QuickLinkIcon,QuickLinkSort&$orderby=QuickLinkSort&$top=20`;

    return this.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (!response.ok) throw new Error('List not found');
        return response.json();
      })
      .then((data: { value: any[] }) => {
        if (data.value && data.value.length > 0) {
          this._links = data.value.map((item: any) => ({
            id: String(item.Id),
            title: item.Title || '',
            url: item.QuickLinkUrl || '#',
            icon: item.QuickLinkIcon || '🔗',
            sort: item.QuickLinkSort || 99,
          }));
        } else {
          this._links = DEMO_LINKS;
        }
      })
      .catch(() => {
        this._links = DEMO_LINKS;
      })
      .then(() => {
        this._loading = false;
        this.render();
      });
  }

  public render(): void {
    const element = React.createElement(QuickLinksGrid, {
      links: this._links,
      loading: this._loading,
      title: this.properties.title || 'Quick Links',
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
        header: { description: 'Quick Links Settings' },
        groups: [{
          groupName: 'Data Source',
          groupFields: [
            PropertyPaneTextField('listName', {
              label: 'SharePoint List Name',
              description: "Name of the Quick Links list. Add/remove/reorder items directly in that list.",
            }),
          ],
        }, {
          groupName: 'Display',
          groupFields: [
            PropertyPaneTextField('title', {
              label: 'Section Title',
            }),
          ],
        }],
      }],
    };
  }
}
