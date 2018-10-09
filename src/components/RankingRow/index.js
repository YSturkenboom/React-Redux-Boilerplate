import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';

import './styles.scss';

export default class RankingRow extends PureComponent {
  render() {
    return (
      <tr key={this.props._id}>
        <td className="first_table">
          <div className="tablerow__date">{this.props.rank.date}</div>
          <div className="tablerow__site">{this.props.rank.url}</div>
          <button
            type="submit"
            className="tablerow__delete"
            onClick={this.props.onDelete}
          >
            <FontAwesomeIcon className="trashIcon" icon={faTrash} />
            Delete
          </button>
        </td>
        <td className="second_table">
          <div className="tablerow__rank">
            <span className="number_accent">#</span>
            {this.props.rank.rank}
          </div>
          <div className="tablerow__category">{this.props.rank.category}</div>
        </td>
      </tr>
    );
  }
}
