import React, { PureComponent } from 'react';
// import Helmet from 'react-helmet';
import { Table } from 'reactstrap';

import { map } from 'lodash';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class RankingTable extends PureComponent {
  renderRow = entry => [
    <tr key={entry.site}>
      <td>
        <div className="tablerow__date">{entry.date}</div>
        <div className="tablerow__site">{entry.site}</div>
        <div className="tablerow__delete">Delete</div>
      </td>
      <td>
        <div className="tablerow__rank">#{entry.rank}</div>
        <div className="tablerow__category">{entry.category}</div>
      </td>
    </tr>
  ];

  render() {
    const table = map(this.props.data, this.renderRow);
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Analyzed websites</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>
    );
  }
}
