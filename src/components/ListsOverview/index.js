import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import AddSiteButton from '../AddSiteButton';
import './styles.scss';

export default class ListsOverview extends PureComponent {
  renderSiteList = list => (
    <Link key={list._id} to={`/list/${list._id}`} className="SitesList">
      <div className="list__date">{list.date}</div>
      <div className="list__name">{list.name}</div>
      <div className="list__amount">{list.amount} websites</div>
    </Link>
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
