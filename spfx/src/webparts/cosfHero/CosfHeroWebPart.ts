import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HeroBanner } from './components/HeroBanner';

export interface ICosfHeroWebPartProps {
  headline: string;
  tagline: string;
  backgroundImageUrl: string;
  ctaLabel: string;
  ctaUrl: string;
  overlayOpacity: number;
  showCta: boolean;
}

export default class CosfHeroWebPart extends BaseClientSideWebPart<ICosfHeroWebPartProps> {
  public render(): void {
    const element = React.createElement(HeroBanner, {
      headline: this.properties.headline || 'Welcome to the City of South Fulton Intranet',
      tagline: this.properties.tagline || 'Your one-stop hub for city resources, news, and department information.',
      backgroundImageUrl: this.properties.backgroundImageUrl || '',
      ctaLabel: this.properties.ctaLabel || 'Explore Departments',
      ctaUrl: this.properties.ctaUrl || '/sites/intranet/departments',
      overlayOpacity: this.properties.overlayOpacity !== undefined ? this.properties.overlayOpacity : 60,
      showCta: this.properties.showCta !== false,
      displayMode: this.displayMode,
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
        header: { description: 'Hero Banner Settings — All changes appear live on the page.' },
        groups: [{
          groupName: 'Content',
          groupFields: [
            PropertyPaneTextField('headline', {
              label: 'Headline',
              multiline: false,
              description: 'Main heading displayed on the banner.',
            }),
            PropertyPaneTextField('tagline', {
              label: 'Tagline / Subtitle',
              multiline: true,
              rows: 2,
              description: 'Supporting text below the headline.',
            }),
          ],
        }, {
          groupName: 'Background Image',
          groupFields: [
            PropertyPaneTextField('backgroundImageUrl', {
              label: 'Image URL',
              description: "Paste the URL of any SharePoint image or external photo. Leave blank to use the default COSF gradient.",
              placeholder: 'https://your-tenant.sharepoint.com/sites/intranet/SiteAssets/hero.jpg',
            }),
            PropertyPaneSlider('overlayOpacity', {
              label: 'Dark Overlay Intensity',
              min: 0,
              max: 90,
              step: 5,
              showValue: true,
            }),
          ],
        }, {
          groupName: 'Call to Action Button',
          groupFields: [
            PropertyPaneToggle('showCta', {
              label: 'Show Button',
              onText: 'Visible',
              offText: 'Hidden',
            }),
            PropertyPaneTextField('ctaLabel', {
              label: 'Button Label',
            }),
            PropertyPaneTextField('ctaUrl', {
              label: 'Button URL',
              placeholder: '/sites/intranet/departments',
            }),
          ],
        }],
      }],
    };
  }
}
