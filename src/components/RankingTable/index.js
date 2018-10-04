import React, { PureComponent } from 'react';
// import Helmet from 'react-helmet';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';

import { map } from 'lodash';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class RankingTable extends PureComponent {
  renderRow = entry => [
    <tr key={entry.site}>
      <td className="first_table">
        <div className="tablerow__date">{entry.date}</div>
        <div className="tablerow__site">{entry.site}</div>
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

  render() {
    const table = map(this.props.data, this.renderRow);
    return (
      <Table responsive>
        <tbody>{table}</tbody>
      </Table>
    );
  }
}
