import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';

import { map } from 'lodash';

import './styles.scss';

export default class RankingTable extends PureComponent {
  renderRow = entry => [
    <tr key={entry._id}>
      <td className="table__column">
        <div className="table__row__date">{entry.date}</div>
        <div className="table__row__site">{entry.url}</div>
        <button
          className="table__row__delete"
          type="submit"
          onClick="this.props.onDelete"
        >
          <FontAwesomeIcon className="trashIcon" icon={faTrash} />
          Delete
        </button>
      </td>
      <td className="table__column">
        <div className="table__row__rank">#{entry.rank}</div>
        <div className="table__row__category">{entry.category}</div>
      </td>
      <td className="table__column">
        <div className="table__row__rank">#{entry.rank}</div>
        <div className="table__row__category">{entry.category}</div>
      </td>
    </tr>
  ];

  render() {
    const { ranks } = this.props;
    const table = map(ranks, this.renderRow);
    return (
      <Table responsive className="RankTable">
        <tbody>{table}</tbody>
      </Table>
    );
  }
}
