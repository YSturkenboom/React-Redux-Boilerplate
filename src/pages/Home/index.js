import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faEye,
  faUserFriends,
  faGlobe,
  faStar,
  faCaretUp,
  faCaretDown,
  faSyncAlt
} from '@fortawesome/pro-solid-svg-icons';
import { Table } from 'reactstrap';
import {
  RankingRow,
  EditableField,
  SearchBar,
  Skeleton
} from '../../components';
import { siteRankActions, listActions } from '../../actions';
import { toastAlert } from '../../utils/helpers';
import './styles.scss';

class Home extends PureComponent {
  constructor() {
    super();
    this.state = {
      isEditable: false,
      currentEditValue: '',
      currentSortType: 'globalRank',
      currentSortDirection: 'asc',
      amountOfRowsToBeLoaded: 1
    };
    this.onDelete = this.onDelete.bind(this);
    this.buttonSwitch = this.buttonSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    // Google Analytics
    ReactGA.initialize('UA-92045603-2');
    ReactGA.pageview('/list');

    const {
      match,
      create,
      history,
      lists,
      siteRank,
      getSingleList,
      getRanksForWebsitesInList
    } = this.props;

    // the tab was clicked to create a new list, immediately make the list and Redirect
    if (match.params.id === 'new') {
      create().then(res => {
        if (res.type === 'CREATE_LIST_REQUEST_FAIL') {
          toastAlert('error', `Something went wrong adding a new list`);
        } else {
          toastAlert('success', `Successfully added a new list`);
          history.push(`/list/${res.newListId.data._id}`);
        }
      });
    }

    // Load list into state
    getSingleList(match.params.id).then(() =>
      this.setState({ currentEditValue: lists.name })
    );

    // Load ranks from list into state (separate for instantaneous UI updates)
    getRanksForWebsitesInList(match.params.id).then(() => {
      console.log('went fine');
      this.setState(() => ({
        amountOfRowsToBeLoaded: siteRank.stats.length
      }));
    });
  }

  // deletes single website
  onDelete(websiteId) {
    const { deleteSiteFromList, match } = this.props;
    deleteSiteFromList(websiteId, match.params.id).then(res => {
      if (res.type === 'DELETE_SITE_FROM_LIST_FAIL') {
        toastAlert('error', `Something went wrong deleting website`);
        ReactGA.event({
          category: 'Lists',
          action: 'Removing website from list failed'
        });
      } else {
        toastAlert('info', `Successfully deleted websites from your list`);
        this.setState(prevState => ({
          amountOfRowsToBeLoaded: prevState.amountOfRowsToBeLoaded - 1
        }));
        ReactGA.event({
          category: 'Lists',
          action: 'Removed website from list'
        });
      }
    });
  }

  handleKeyPress = event => {
    const { match, update } = this.props;
    if (event.key === 'Enter') {
      const siteID = match.params.id;
      const name = event.target.value;
      update(siteID, name).then(res => {
        if (res.type === 'LIST_TITLE_UPDATE_FAIL') {
          toastAlert('error', `Something went wrong deleting the list`);
        } else {
          toastAlert('success', `Successfully updated list title`);
        }
      });
      this.setState({ isEditable: false, currentEditValue: name });
    }
  };

  handleChange = event => {
    this.setState({ currentEditValue: event.target.value });
  };

  buttonSwitch = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  };

  analyze = async urlsToQuery => {
    const { siteRank } = this.props;
    if (urlsToQuery.length > 0) {
      const { getBulkTraffic } = this.props;
      this.setState(prevState => ({
        amountOfRowsToBeLoaded:
          prevState.amountOfRowsToBeLoaded + urlsToQuery.length
      }));
      const res = await getBulkTraffic(urlsToQuery, siteRank.currentListId);
      if (res.type === 'GET_TRAFFIC_REQUEST_FAIL') {
        ReactGA.event({
          category: 'Lists',
          action: 'Adding websites to list failed'
        });
        toastAlert(
          'error',
          `One or more of the URL's entered are invalid. (Please mind typo's)`
        );
        return false;
      }
      ReactGA.event({
        category: 'Lists',
        action: 'Added websites to list',
        value: urlsToQuery.length
      });
      toastAlert('success', `Successfully added websites to your list`);
      return true;
    }
    // if there are no new sites in the tags, remove the (useless) tags
    return true;
  };

  refreshList = async () => {
    const { refreshList, match } = this.props;
    await refreshList(match.params.id);
  };

  sortStats = sortType => {
    const { currentSortType, currentSortDirection } = this.state;
    if (sortType === currentSortType) {
      if (currentSortDirection === 'asc') {
        this.setState({ currentSortDirection: 'desc' });
      } else {
        this.setState({ currentSortDirection: 'asc' });
      }
    } else {
      this.setState({ currentSortType: sortType, currentSortDirection: 'asc' });
    }
  };

  renderTable = (isLoading, sortedStats) => {
    const { amountOfRowsToBeLoaded } = this.state;
    if (isLoading) {
      return <Skeleton rows={amountOfRowsToBeLoaded} columns={5} />;
    }

    const rows = sortedStats.map(stat => (
      <RankingRow
        key={stat._id}
        stats={stat}
        onDelete={() => this.onDelete(stat._id)}
      />
    ));

    return (
      <Table responsive className="RankTable">
        <thead>
          <th onClick={() => this.sortStats('url')}>
            Website
            {this.renderCaret('url')}
          </th>
          <th onClick={() => this.sortStats('globalPageviews')}>
            <FontAwesomeIcon icon={faEye} />
            Pageviews
            {this.renderCaret('globalPageviews')}
          </th>
          <th onClick={() => this.sortStats('uniquePageViews')}>
            <FontAwesomeIcon icon={faUserFriends} />
            Unique visitors
            {this.renderCaret('uniquePageViews')}
          </th>
          <th onClick={() => this.sortStats('globalRank')}>
            <FontAwesomeIcon icon={faGlobe} />
            Global rank
            {this.renderCaret('globalRank')}
          </th>
          <th>
            <FontAwesomeIcon icon={faStar} />
            Top country
          </th>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  };

  renderCaret = sortType => {
    const { currentSortType, currentSortDirection } = this.state;
    if (currentSortType === sortType) {
      if (currentSortDirection === 'asc') {
        return (
          <FontAwesomeIcon
            icon={faCaretUp}
            className="sortCaret sortCaret--active"
          />
        );
      }
      return (
        <FontAwesomeIcon
          icon={faCaretDown}
          className="sortCaret sortCaret--active"
        />
      );
    }
    return <FontAwesomeIcon icon={faCaretUp} className="sortCaret" />;
  };

  render() {
    const { lists, siteRank } = this.props;
    const { stats, invalidUrls, isLoading } = siteRank;
    const {
      currentEditValue,
      currentSortType,
      currentSortDirection,
      isEditable
    } = this.state;

    const sortedStats = orderBy(
      stats,
      [currentSortType],
      [currentSortDirection]
    );

    return (
      <div className="Home body">
        <Helmet title="Analyze" />
        <div className="row">
          <div className="col">
            <SearchBar
              actionOnSubmit={this.analyze}
              ranks={stats}
              invalidUrls={invalidUrls}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="Home__header">
              <div className="editableField">
                {isEditable ? (
                  <EditableField
                    value={currentEditValue}
                    className="EditableField__placeholder"
                    type="text"
                    editChange={this.handleChange}
                    editPress={this.handleKeyPress}
                    placeholder={lists.name}
                    onBlur={() => {
                      this.buttonSwitch();
                      this.handleKeyPress({
                        key: 'Enter',
                        target: { value: currentEditValue }
                      });
                    }}
                  />
                ) : (
                  <h4 onClick={this.buttonSwitch} role="presentation">
                    {currentEditValue}
                  </h4>
                )}

                <FontAwesomeIcon icon={faPen} onClick={this.buttonSwitch} />
              </div>
              <button
                className="btn btn-primary btn-icon"
                onClick={this.refreshList}
                type="submit"
              >
                Refresh
                <FontAwesomeIcon icon={faSyncAlt} />
              </button>
            </div>
          </div>
        </div>
        {stats.length === 0
          ? 'Get started by entering some websites into the search bar and pressing the Analyze button!'
          : this.renderTable(isLoading, sortedStats)}
      </div>
    );
  }
}

const connector = connect(
  ({ siteRank, lists }) => ({ siteRank, lists }),
  dispatch => ({
    getRanksForWebsitesInList: id =>
      dispatch(siteRankActions.getRanksForWebsitesInList(id)),
    getBulkTraffic: (sites, listId) =>
      dispatch(siteRankActions.getBulkTraffic(sites, listId)),
    getSingleList: id => dispatch(listActions.getSingleList(id)),
    update: (id, name) => dispatch(listActions.updateTitle(id, name)),
    deleteSiteFromList: (siteId, listId) =>
      dispatch(listActions.deleteSiteFromList(siteId, listId)),
    create: () => dispatch(listActions.createNewList()),
    refreshList: listId => dispatch(listActions.refreshList(listId))
  })
);

export default connector(Home);
