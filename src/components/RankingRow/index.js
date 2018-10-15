import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import { formatNumber } from '../../utils/helpers';

import './styles.scss';

export default class RankingRow extends PureComponent {
  render() {
    const { _id, rank, date, url } = this.props.rank;
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
          <div className="tablerow__data">{formatNumber(1234567)}</div>
          <div className="tablerow__subtext">All time</div>
        </td>
        <td className="third_table">
          <div className="tablerow__data">{formatNumber(12345678)}</div>
          <div className="tablerow__subtext">All time</div>
        </td>
        <td className="fourth_table">
          {rank ? (
            <div className="tablerow__data">
              <span className="number_accent"># </span>
              {formatNumber(rank)}
            </div>
          ) : (
            <div className="tablerow__data">
              No ranking
              <div className="position-relative">
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
            </div>
          )}
          <div className="tablerow__subtext">Worldwide</div>
        </td>
        <td className="fifth_table">
          <div className="tablerow__data">
            <span className="number_accent"># </span>
            {formatNumber(123456789)}
          </div>
          <div className="tablerow__subtext">Netherlands</div>
        </td>
      </tr>
    );
  }
}
