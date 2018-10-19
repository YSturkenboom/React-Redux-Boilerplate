import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { format } from 'date-fns';
import './styles.scss';

export default class ListsOverview extends PureComponent {
  render() {
    const { list, onDeleteWebsite } = this.props;
    return (
      <div className="SitesList col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="list__item">
          <Link
            key={list._id}
            to={{
              pathname: `/list/${list._id}`,
              state: { currentEditValue: list.name }
            }}
            className="anchor"
          >
            {' '}
          </Link>

          <div className="list__date">
            <time>{format(list.createdAt, 'DD/MM/YYYY')}</time>
          </div>

          <div className="list__name">{list.name}</div>

          <div className="list__amount">
            {list.websites ? `${list.websites.length} websites` : ''}
          </div>

          <div
            role="presentation"
            className="trashCircle"
            onClick={onDeleteWebsite}
          >
            <FontAwesomeIcon className="trashIcon" icon={faTrash} />
          </div>
        </div>
      </div>
    );
  }
}
