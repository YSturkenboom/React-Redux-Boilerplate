import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import RankingTable from '../../components/RankingTable';
import SearchBar from '../../components/SearchBar/index';

import { siteRankActions } from '../../actions';

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

export default class Home extends PureComponent {
  render() {
    return (
      <div className="Home">
        <Helmet title="Analyze" />
        <SearchBar actionOnSubmit={siteRankActions.getBulkTraffic} />
        <h2>Competitor ranking</h2>
        <RankingTable data={DATASET} />
      </div>
    );
  }
}
