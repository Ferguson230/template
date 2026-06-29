import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from '@microsoft/sp-application-base';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalHeader } from './components/GlobalHeader';
import { GlobalFooter } from './components/GlobalFooter';

export interface ICosfHeaderApplicationCustomizerProperties {
  siteTitle: string;
  tagLine: string;
  logoUrl: string;
}

export default class CosfHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<ICosfHeaderApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders);
    this._renderPlaceholders();
    return Promise.resolve();
  }

  private _renderPlaceholders(): void {
    // ── Header ──────────────────────────────────────────────────
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDisposeTop }
      );
    }

    if (this._topPlaceholder) {
      const headerElement = React.createElement(GlobalHeader, {
        context: this.context,
        siteTitle: this.properties.siteTitle || 'City of South Fulton',
        tagLine: this.properties.tagLine || 'Employee Intranet Portal · A City on the Rise!',
        logoUrl: this.properties.logoUrl || '',
      });
      ReactDOM.render(headerElement, this._topPlaceholder.domElement);
    } else {
      console.error('COSF Header: Could not find the Top placeholder.');
    }

    // ── Footer ──────────────────────────────────────────────────
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDisposeBottom }
      );
    }

    if (this._bottomPlaceholder) {
      const footerElement = React.createElement(GlobalFooter, {
        context: this.context,
        siteTitle: this.properties.siteTitle || 'City of South Fulton',
      });
      ReactDOM.render(footerElement, this._bottomPlaceholder.domElement);
    } else {
      console.error('COSF Footer: Could not find the Bottom placeholder.');
    }
  }

  private _onDisposeTop = (): void => {
    if (this._topPlaceholder && this._topPlaceholder.domElement) {
      ReactDOM.unmountComponentAtNode(this._topPlaceholder.domElement);
    }
  }

  private _onDisposeBottom = (): void => {
    if (this._bottomPlaceholder && this._bottomPlaceholder.domElement) {
      ReactDOM.unmountComponentAtNode(this._bottomPlaceholder.domElement);
    }
  }
}
