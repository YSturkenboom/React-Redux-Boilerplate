import React, { PureComponent } from 'react';
// import Helmet from 'react-helmet';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';

import { map } from 'lodash';

import './styles.scss';

export default class RankingTable extends PureComponent {
  renderRow = entry => {
    console.log('entry', entry);
    return [
      <tr key={entry._id}>
        <td className="first_table">
          <div className="tablerow__date">{entry.date}</div>
          <div className="tablerow__site">{entry.url}</div>
          <div className="tablerow__delete">
            <FontAwesomeIcon className="trashIcon" icon={faTrash} />
            Delete
          </div>
        </td>
        <td className="second_table">
          <div className="tablerow__rank">#{entry.rank}</div>
          <div className="tablerow__category">{entry.category}</div>
        </td>
      </tr>
    ];
  };

  render() {
    console.log('in the table', this.props);
    const table = map(this.props.ranks, this.renderRow);
    return (
      <Table responsive className="RankTable">
        <tbody>{table}</tbody>
      </Table>
    );
  }
}
