import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import AddSiteButton from '../AddSiteButton';
import './styles.scss';

export default class ListsOverview extends PureComponent {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
  }

  renderSiteList = list => (
    <div className="SitesList col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="list__item">
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
          spinner={faSpinnerThird}
        />
      </div>
    </div>
  );

  render() {
    const { data, addNewList } = this.props;
    const lists = map(data, this.renderSiteList);
    return (
      <div className="ListsOverview">
        <AddSiteButton addNewList={addNewList} />
        {lists}
      </div>
    );
  }
}
