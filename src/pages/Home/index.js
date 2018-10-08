import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/pro-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import RankingTable from '../../components/RankingTable';
import EditableField from '../../components/EditableField';
import SearchBar from '../../components/SearchBar/index';
import { siteRankActions, listActions } from '../../actions';
import './styles.scss';

class Home extends PureComponent {
  constructor() {
    super();
    this.state = { show_error: false };
    this.clickRefresh = this.clickRefresh.bind(this);
  }

  componentDidMount() {
    const { getSingleList, getRanksForWebsitesInList } = this.props;
    // Load list into state
    getSingleList(this.props.match.params.id);

    // Load ranks from list into state (separate for instantaneous UI updates)
    getRanksForWebsitesInList(this.props.match.params.id);
  }

  clickRefresh() {
    this.setState({ show_error: true });
  }

  render() {
    const { ranks } = this.props.siteRank;

    return (
      <div className="Home">
        <Helmet title="Analyze" />
        <SearchBar />
        <div className="Home__header">
          <EditableField />
          <Button className="button-outline" onClick={this.clickRefresh}>
            Refresh websites
            <FontAwesomeIcon icon={faSync} />
          </Button>
        </div>
        <RankingTable ranks={ranks} />
        {this.state.show_error ? (
          <ToastContainer className="toast-container" />
        ) : null}
      </div>
    );
  }
}

const connector = connect(
  ({ siteRank, lists }) => ({ siteRank, lists }),
  dispatch => ({
    getRanksForWebsitesInList: listId =>
      dispatch(siteRankActions.getRanksForWebsitesInList(listId)),
    getBulkTraffic: () => dispatch(siteRankActions.getBulkTraffic()),
    getSingleList: listId => dispatch(listActions.getSingleList(listId))
  })
);

export default connector(Home);
