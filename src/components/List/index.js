import Moment from 'react-moment';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import './styles.scss';

export default class ListsOverview extends PureComponent {
  render() {
    const { createdAt } = this.props.list;
    return (
      <div className="SitesList p-0">
        <Link
          key={this.props.list._id}
          to={`/list/${this.props.list._id}`}
          className="anchor"
        >
          {' '}
        </Link>

        <div className="list__date">
          <Moment format="YYYY/MM/DD" date={createdAt} />
        </div>
        <div className="list__name">{this.props.list.name}</div>
        <div className="list__amount">
          {this.props.list.websites
            ? `${this.props.list.websites.length} websites`
            : ''}
        </div>
        <FontAwesomeIcon
          className="trashIcon"
          icon={faTrash}
          onClick={this.props.onDeleteWebsite}
        />
      </div>
    );
  }
}
