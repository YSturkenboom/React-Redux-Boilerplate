import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import RankingTable from '../../components/RankingTable';
import EditableField from '../../components/EditableField';
import SearchBar from '../../components/SearchBar/index';
import { siteRankActions } from '../../actions';
import './styles.scss';

class Home extends PureComponent {
  render() {
    console.log('PROPS', this.props);
    const { siteRank } = this.props;
    return (
      <div className="Home">
        <Helmet title="Analyze" />
        <SearchBar actionOnSubmit={siteRankActions.getBulkTraffic} />
        <div className="Home__header">
          <EditableField />
          <Button className="button-primary">Update</Button>
        </div>
        <RankingTable data={siteRank} />
        <div className="Home__footer">
          <Button className="button-primary"> Save</Button>
        </div>
      </div>
    );
  }
}

const connector = connect(
  ({ siteRank }) => ({ siteRank }),
  dispatch => ({
    getBulkTraffic: () => dispatch(siteRankActions.getBulkTraffic())
  })
);

export default connector(Home);
