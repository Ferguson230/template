import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AnnouncementsFeed, IAnnouncement } from './components/AnnouncementsFeed';

export interface ICosfAnnouncementsWebPartProps {
  listName: string;
  maxItems: number;
  title: string;
}

const DEMO_ANNOUNCEMENTS: IAnnouncement[] = [
  {
    id: '1',
    title: 'Open Enrollment Begins November 1st',
    body: 'Annual benefits open enrollment runs November 1–15. Review your plan options and make changes in the HR portal. Questions? Contact HR at (470) 809-7050.',
    category: 'HR Update',
    priority: 'High',
    date: 'Nov 1, 2026',
  },
  {
    id: '2',
    title: 'IT Maintenance Window — This Saturday',
    body: 'Scheduled network maintenance will occur Saturday 12:00 AM–4:00 AM. Email and VPN services may be intermittently unavailable. Plan accordingly.',
    category: 'IT Notice',
    priority: 'Normal',
    date: 'Oct 28, 2026',
  },
  {
    id: '3',
    title: 'Employee Appreciation Day — Register Now',
    body: 'Join us for the annual Employee Appreciation Day on November 20th at City Hall. Lunch will be provided. Register by November 10th through HR.',
    category: 'Event',
    priority: 'Normal',
    date: 'Oct 25, 2026',
  },
  {
    id: '4',
    title: 'New Procurement Policy Effective December 1',
    body: 'The updated Procurement Policy (v3.2) takes effect December 1. Key changes include new thresholds for competitive bidding. See the policy library for details.',
    category: 'Important',
    priority: 'High',
    date: 'Oct 22, 2026',
  },
  {
    id: '5',
    title: 'Holiday Schedule Published',
    body: 'The FY2027 city holiday schedule has been posted to the HR portal. Please note: City Hall will be closed November 27–28 for Thanksgiving.',
    category: 'General',
    priority: 'Normal',
    date: 'Oct 20, 2026',
  },
];

export default class CosfAnnouncementsWebPart extends BaseClientSideWebPart<ICosfAnnouncementsWebPartProps> {
  private _announcements: IAnnouncement[] = [];
  private _loading: boolean = true;

  public onInit(): Promise<void> {
    return this._loadAnnouncements();
  }

  private _loadAnnouncements(): Promise<void> {
    const listName = this.properties.listName || 'City Announcements';
    const maxItems = this.properties.maxItems || 5;
    const url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${encodeURIComponent(listName)}')/items?$select=Id,Title,Body,AnnouncementCategory,AnnouncementPriority,Modified&$orderby=Modified desc&$top=${maxItems}`;

    return this.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (!response.ok) throw new Error('List not found');
        return response.json();
      })
      .then((data: { value: any[] }) => {
        if (data.value && data.value.length > 0) {
          this._announcements = data.value.map((item: any) => ({
            id: String(item.Id),
            title: item.Title || '',
            body: item.Body || '',
            category: item.AnnouncementCategory || 'General',
            priority: item.AnnouncementPriority || 'Normal',
            date: item.Modified ? new Date(item.Modified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
          }));
        } else {
          this._announcements = DEMO_ANNOUNCEMENTS.slice(0, maxItems);
        }
      })
      .catch(() => {
        this._announcements = DEMO_ANNOUNCEMENTS.slice(0, this.properties.maxItems || 5);
      })
      .then(() => {
        this._loading = false;
        this.render();
      });
  }

  public render(): void {
    const element = React.createElement(AnnouncementsFeed, {
      announcements: this._announcements,
      loading: this._loading,
      title: this.properties.title || 'Latest News & Announcements',
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
        header: { description: 'Announcements Settings' },
        groups: [{
          groupName: 'Data Source',
          groupFields: [
            PropertyPaneTextField('listName', {
              label: 'SharePoint List Name',
              description: "Name of the SharePoint Announcements list. Defaults to 'City Announcements'.",
            }),
            PropertyPaneSlider('maxItems', {
              label: 'Maximum Items to Show',
              min: 1,
              max: 20,
              step: 1,
              showValue: true,
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
