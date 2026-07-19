import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import CosfApp, { ICosfAppProps } from './components/CosfApp';

export interface ICosfIntranetWebPartProps {
  siteTitle: string;
  tagLine: string;
  logoUrl: string;
}

export default class CosfIntranetWebPart extends BaseClientSideWebPart<ICosfIntranetWebPartProps> {

  public onInit(): Promise<void> {
    if (!document.getElementById('cosf-fonts')) {
      const link = document.createElement('link');
      link.id = 'cosf-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    return super.onInit();
  }

  public render(): void {
    const user = this.context.pageContext.user;
    const web  = this.context.pageContext.web;

    // Derive initials from display name
    const initials = (user.displayName || 'DF')
      .split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

    const props: ICosfAppProps = {
      siteUrl:      web.absoluteUrl,
      siteTitle:    this.properties.siteTitle || 'City of South Fulton',
      tagLine:      this.properties.tagLine   || 'Employee Intranet Portal · A City on the Rise!',
      logoUrl:      this.properties.logoUrl   || '',
      userName:     user.displayName          || 'City Employee',
      userEmail:    user.email                || '',
      userInitials: initials,
      userPhotoUrl: `${web.absoluteUrl}/_layouts/15/userphoto.aspx?size=S&username=${encodeURIComponent(user.email || '')}`,
    };

    ReactDom.render(React.createElement(CosfApp, props), this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('2.0');
  }

  protected onPropertyPaneFieldChanged(): void {
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'COSF Intranet Portal Settings' },
          groups: [
            {
              groupName: 'Branding',
              groupFields: [
                PropertyPaneTextField('siteTitle', {
                  label: 'Site Title',
                  description: 'Header title text (e.g. City of South Fulton)',
                  value: this.properties.siteTitle,
                }),
                PropertyPaneTextField('tagLine', {
                  label: 'Tag Line',
                  description: 'Subtitle shown under the site title',
                  value: this.properties.tagLine,
                }),
                PropertyPaneTextField('logoUrl', {
                  label: 'Logo Image URL',
                  description: 'Paste the URL of your city logo image (leave blank to use initials)',
                  placeholder: 'https://yourtenant.sharepoint.com/sites/intranet/SiteAssets/logo.png',
                  value: this.properties.logoUrl,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
