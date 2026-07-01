import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from '@microsoft/sp-application-base';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalFooter } from './components/GlobalFooter';

export interface ICosfHeaderApplicationCustomizerProperties {
  siteTitle: string;
  tagLine: string;
  logoUrl: string;
}

/**
 * COSF Intranet Footer Extension — renders ONLY the bottom footer.
 * The header is native SharePoint (shows real user, search, logo, nav).
 * To edit footer links: update the "Intranet Footer Links" list on this site.
 */
export default class CosfHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<ICosfHeaderApplicationCustomizerProperties> {

  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this._renderFooter);
    this._renderFooter();
    return Promise.resolve();
  }

  private _renderFooter(): void {
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );
    }
    if (!this._bottomPlaceholder) return;
    ReactDOM.render(
      React.createElement(GlobalFooter, { context: this.context }),
      this._bottomPlaceholder.domElement
    );
  }

  private _onDispose = (): void => {
    if (this._bottomPlaceholder && this._bottomPlaceholder.domElement) {
      ReactDOM.unmountComponentAtNode(this._bottomPlaceholder.domElement);
    }
  }
}
