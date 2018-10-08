import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import AddSiteButton from '../AddSiteButton';
import './styles.scss';

export default class ListsOverview extends PureComponent {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    console.log(this);
  }

  renderSiteList = list => (
    <div className="SitesList">
      <Link key={list._id} to={`/list/${list._id}`} className="anchor">
        {' '}
      </Link>

      <div className="list__date">{list.date}</div>
      <div className="list__name">{list.name}</div>
      <div className="list__amount">{list.amount} websites</div>
      <FontAwesomeIcon
        className="trashIcon"
        icon={faTrash}
        onClick={list.OnDelete}
      />
    </div>
  );

  render() {
    const lists = map(this.props.data, this.renderSiteList);
    return (
      <div className="ListsOverview">
        <AddSiteButton addNewList={this.props.addNewList} />
        {lists}
      </div>
    );
  }
}
