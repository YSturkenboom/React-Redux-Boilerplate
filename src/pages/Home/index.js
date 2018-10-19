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
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      currentEditValue: '',
      currentSortType: 'globalRank',
      currentSortDirection: 'asc',
      amountOfRowsToBeLoaded: 1,
      busy: false,
      refreshing: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.buttonSwitch = this.buttonSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    // Google Analytics
    ReactGA.pageview('/list');

    const {
      match,
      create,
      history,
      lists,
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
    getRanksForWebsitesInList(match.params.id);
  }

  // deletes single website
  onDelete(websiteId) {
    const { deleteSiteFromList, match, siteRank } = this.props;
    const { busy } = this.state;
    if (!busy) {
      this.setState({ busy: true });
      deleteSiteFromList(websiteId, match.params.id).then(res => {
        if (res.type === 'DELETE_SITE_FROM_LIST_FAIL') {
          this.setState({ busy: false });
          toastAlert('error', `Something went wrong deleting website`);
          ReactGA.event({
            category: 'Lists',
            action: 'Removing website from list failed'
          });
        } else {
          this.setState({ busy: false });
          toastAlert('info', `Successfully deleted websites from your list`);
          this.setState(() => ({
            amountOfRowsToBeLoaded: siteRank.stats.length
          }));
          ReactGA.event({
            category: 'Lists',
            action: 'Removed website from list'
          });
        }
      });
      this.setState({ busy: false });
    }
  }

  handleKeyPress = async event => {
    const { match, update } = this.props;
    const { busy } = this.state;
    if (!busy) {
      if (event.key === 'Enter') {
        await this.setState({ busy: true });
        const siteID = match.params.id;
        const name = event.target.value;
        update(siteID, name).then(async res => {
          if (res.type === 'LIST_TITLE_UPDATE_FAIL') {
            toastAlert('error', `Something went wrong deleting the list`);
            await this.setState({ busy: false });
          } else {
            toastAlert('success', `Successfully updated list title`);
            await this.setState({ busy: false });
          }
        });
        await this.setState({ isEditable: false, currentEditValue: name });
      }
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
    const { busy } = this.state;

    if (!busy) {
      this.setState({ busy: true });

      if (urlsToQuery.length > 0) {
        const { getBulkTraffic } = this.props;
        this.setState(() => ({
          amountOfRowsToBeLoaded: siteRank.stats.length + urlsToQuery.length
        }));

        const res = await getBulkTraffic(urlsToQuery, siteRank.currentListId);

        if (res.status === 400) {
          ReactGA.event({
            category: 'Lists',
            action: 'Adding websites to list failed'
          });
          this.setState({ busy: false });
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

        this.setState({ busy: false });
        toastAlert('success', `Successfully added websites to your list`);
        return true;
      }

      // if there are no new sites in the tags, remove the (useless) tags
      this.setState({ busy: false });
      return true;
    }
    return false;
  };

  refreshList = async () => {
    const { refreshList, match, siteRank } = this.props;
    this.setState(() => ({
      amountOfRowsToBeLoaded: siteRank.stats.length
    }));
    this.setState({ refreshing: true });
    await refreshList(match.params.id).finally(() => {
      this.setState({ refreshing: false });
    });
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

    const tableHead = (
      <thead>
        <th onClick={() => this.sortStats('url')}>
          Website
          {this.renderCaret('url')}
        </th>

        <th onClick={() => this.sortStats('globalPageviewsPerMonth')}>
          <FontAwesomeIcon icon={faEye} />
          Pageviews
          {this.renderCaret('globalPageviewsPerMonth')}
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
          Most popular in
        </th>
      </thead>
    );

    if (isLoading) {
      return (
        <Skeleton rows={amountOfRowsToBeLoaded} columns={5}>
          {tableHead}
        </Skeleton>
      );
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
        {tableHead}
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
      isEditable,
      refreshing
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
              {refreshing ? (
                <button
                  className="btn btn-primary btn-icon"
                  onClick={this.refreshList}
                  type="submit"
                >
                  Refresh
                  <FontAwesomeIcon icon={faSyncAlt} className="fa-spin" />
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-icon"
                  onClick={this.refreshList}
                  type="submit"
                >
                  Refresh
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              )}
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
