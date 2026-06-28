import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import CosfApp from './components/CosfApp';

export interface ICosfIntranetWebPartProps {
  siteUrl: string;
}

export default class CosfIntranetWebPart extends BaseClientSideWebPart<ICosfIntranetWebPartProps> {

  public onInit(): Promise<void> {
    // Inject Google Fonts
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
    const siteUrl = this.context.pageContext.web.absoluteUrl;
    const element = React.createElement(CosfApp, { siteUrl });
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('2.0');
  }
}
