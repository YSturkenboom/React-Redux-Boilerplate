import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import { formatNumber } from '../../utils/helpers';

import './styles.scss';

export default class RankingRow extends PureComponent {
  render() {
    const {
      _id,
      globalRank,
      globalPageviews,
      globalPageviewsPerUser,
      mostVisitingCountry,
      rankInMostVisitedCountry,
      date,
      url
    } = this.props.stats;
    return (
      <tr key={_id}>
        <td className="table__column">
          <div className="table__row__date">{date}</div>
          <div className="table__row__site">{url}</div>
          <button
            type="submit"
            className="table__row__delete"
            onClick={this.props.onDelete}
          >
            <FontAwesomeIcon className="trashIcon" icon={faTrashAlt} />
            Delete
          </button>
        </td>
        <td className="table__column">
          <div className="table__row__data">
            {formatNumber(globalPageviews)}
          </div>
          <div className="table__row__subtext">All time</div>
        </td>
        <td className="table__column">
          <div className="table__row__data">
            {formatNumber(globalPageviewsPerUser)}
          </div>
          <div className="table__row__subtext">All time</div>
        </td>
        <td className="table__column">
          {globalRank ? (
            <div className="table__row__data">
              <span className="number_accent"># </span>
              {formatNumber(globalRank)}
            </div>
          ) : (
            <div className="table__row__data">
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
          <div className="table__row__subtext">Worldwide</div>
        </td>
        <td className="table__column">
          <div className="table__row__data">
            <span className="number_accent"># </span>
            {formatNumber(rankInMostVisitedCountry)}
          </div>
          <div className="table__row__subtext">{mostVisitingCountry}</div>
        </td>
      </tr>
    );
  }
}
