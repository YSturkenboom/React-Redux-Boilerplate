import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/pro-solid-svg-icons';
import { toast } from 'react-toastify';
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
    const { getRanksForWebsitesInList } = this.props;

    // Load list into state
    // getSingleList(this.props.match.params.id);
    // console.log('id =', this.props.match.params.id);
    // Load ranks from list into state (separate for instantaneous UI updates)
    getRanksForWebsitesInList(this.props.match.params.id);
  }

  onDelete(siteId) {
    toast.info(`deleted site ${siteId}`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
    this.props.deleteSiteFromList(siteId, this.props.match.params.id);
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
      <RankingRow rank={rank} onDelete={() => this.onDelete(rank._id)} />
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
    getRanksForWebsitesInList: id =>
      dispatch(siteRankActions.getRanksForWebsitesInList(id)),
    getBulkTraffic: () => dispatch(siteRankActions.getBulkTraffic()),
    deleteSiteFromList: (siteId, listId) =>
      dispatch(listActions.deleteSiteFromList(siteId, listId))
    // getSingleList: id => dispatch(listActions.getSingleList(id))
  })
);

export default connector(Home);
