import React, { PureComponent } from 'react';
import { map } from 'lodash';
import SitesList from '../SitesList';
import AddSiteButton from '../AddSiteButton';
import './styles.scss';

export default class ListsOverview extends PureComponent {
  renderSiteList = list => (
    <div>
      <SitesList date={list.date} name={list.name} amount={list.amount} />
    </div>
  );

  render() {
    const lists = map(this.props.data, this.renderSiteList);
    return (
      <div className="ListsOverview">
        <AddSiteButton />
        {lists}
      </div>
    );
  }
}
