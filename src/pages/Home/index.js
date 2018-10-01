import React, { PureComponent } from 'react';
// import Helmet from 'react-helmet';

import RankingTable from './components/RankingTable';
import SearchBar from './components/SearchBar';

import './styles.scss';

const DATASET = [
  {
    site: 'google.com',
    rank: 1,
    date: '27/02/2018',
    category: 'Global rank'
  },
  {
    site: 'storyofams.com',
    rank: 2,
    date: '27/02/2018',
    category: 'Global rank'
  }
];
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('WTF');
    return (
      <div className="Home">
        <SearchBar />
        <RankingTable data={DATASET} />
      </div>
    );
  }
}
