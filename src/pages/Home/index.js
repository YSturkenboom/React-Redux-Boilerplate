import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/pro-solid-svg-icons';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import RankingRow from '../../components/RankingRow';

import EditableField from '../../components/EditableField';
import SearchBar from '../../components/SearchBar/index';
import { siteRankActions, listActions } from '../../actions';
import './styles.scss';

class Home extends PureComponent {
  constructor() {
    super();
    this.clickRefresh = this.clickRefresh.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { getSingleList, getRanksForWebsitesInList } = this.props;
    getSingleList(this.props.match.params.id);
    getRanksForWebsitesInList(this.props.lists.data.websites);
  }

  onDelete() {
    console.log(this, 'hello button delete');
    toast.info('Info Notification !', {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

  clickRefresh() {
    console.log(this);
    toast.success('Success Notification !', {
      position: toast.POSITION.RIGHT_CENTER
    });

    toast.error('Error Notification !', {
      position: toast.POSITION.TOP_LEFT
    });
  }

  render() {
    const { ranks } = this.props.siteRank;
    console.log(ranks);

    const rows = ranks.map(rank => (
      <RankingRow rank={rank} onDelete={this.onDelete} />
    ));

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
        <Table responsive className="RankTable">
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}

const connector = connect(
  ({ siteRank, lists }) => ({ siteRank, lists }),
  dispatch => ({
    getRanksForWebsitesInList: websiteIds =>
      dispatch(siteRankActions.getRanksForWebsitesInList(websiteIds)),
    getBulkTraffic: () => dispatch(siteRankActions.getBulkTraffic()),
    getSingleList: id => dispatch(listActions.getSingleList(id))
  })
);

export default withRouter(connector(Home));
