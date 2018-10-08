import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import './styles.scss';

export default class ListsOverview extends PureComponent {
  render() {
    return (
      <div className="SitesList">
        <Link
          key={this.props.list._id}
          to={`/list/${this.props.list._id}`}
          className="anchor"
        >
          {' '}
        </Link>

        <div className="list__date">{this.props.list.date}</div>
        <div className="list__name">{this.props.list.name}</div>
        <div className="list__amount">{this.props.list.amount} websites</div>
        <FontAwesomeIcon
          className="trashIcon"
          icon={faTrash}
          onClick={this.props.onDeleteWebsite}
        />
      </div>
    );
  }
}
