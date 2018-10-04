import React, { PureComponent } from 'react';
import { map } from 'lodash';
import SitesList from '../SitesList';

import './styles.scss';

export default class ListsOverview extends PureComponent {
  renderSiteList = list => (
    <SitesList date={list.date} name={list.name} amount={list.amount} />
  );

  render() {
    const lists = map(this.props.data, this.renderSiteList);
    return <div className="ListsOverview">{lists}</div>;
  }
}
