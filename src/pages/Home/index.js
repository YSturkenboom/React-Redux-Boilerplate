import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/pro-regular-svg-icons';
import RankingTable from '../../components/RankingTable';
import EditableField from '../../components/EditableField';
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
  constructor() {
    super();
    this.state = {};
    this.clickRefresh = this.clickRefresh.bind(this);
  }

  clickRefresh() {
    console.log(this);
    alert('refresh website');
  }

  render() {
    return (
      <div className="Home">
        <Helmet title="Analyze" />
        <SearchBar actionOnSubmit={siteRankActions.getBulkTraffic} />
        <div className="Home__header">
          <EditableField />
          <Button className="button-outline" onClick={this.clickRefresh}>
            Refresh websites
            <FontAwesomeIcon icon={faSync} />
          </Button>
        </div>
        <RankingTable data={DATASET} />
      </div>
    );
  }
}
