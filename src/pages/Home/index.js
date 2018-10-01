import React, { PureComponent } from 'react';
// import Helmet from 'react-helmet';
import { Table } from 'reactstrap';

import { map } from 'lodash';

import './styles.scss';

const DATASET = [
  { site: 'google.com', rank: 1 },
  { site: 'storyofams.com', rank: 2 }
];
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  rankingTable = () => {
    const table = map(DATASET, this.renderRow);
    console.log(table);
    console.log('GALLO');

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Website</th>
            <th>ranking</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>
    );
  };

  renderRow = entry => [
    <tr key={entry.site}>
      <td>{entry.site}</td>
      <td>{entry.rank}</td>
    </tr>
  ];

  render() {
    console.log('WTF');
    return <div className="Home">{this.rankingTable()}</div>;
  }
}
