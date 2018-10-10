import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import { formatNumber } from '../../utils/helpers';

import './styles.scss';

export default class RankingRow extends PureComponent {
  render() {
    const { _id, rank, date, url, category } = this.props.rank;
    return (
      <tr key={_id}>
        <td className="first_table">
          <div className="tablerow__date">{date}</div>
          <div className="tablerow__site">{url}</div>
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
          {rank ? (
            <div className="tablerow__rank">
              <span className="number_accent">#</span>
              {formatNumber(rank)}
            </div>
          ) : (
            <h2>
              No ranking
              <div className="relContainer">
                <div id={`ToolTipRanks${_id}`}>?</div>
              </div>
              <UncontrolledTooltip
                placement="right"
                target={`ToolTipRanks${_id}`}
              >
                No ranking means that the site you are trying to analyze is
                currently too unknown to receive a ranking. Is this your site?
                Contact us at hello@storyofams.com, and we&#39;ll get you out
                this spot in no time!
              </UncontrolledTooltip>
            </h2>
          )}
          <div className="tablerow__category">{category}</div>
        </td>
      </tr>
    );
  }
}
