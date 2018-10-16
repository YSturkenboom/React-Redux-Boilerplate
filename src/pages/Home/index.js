import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faEye,
  faUserFriends,
  faGlobe,
  faStar
} from '@fortawesome/pro-solid-svg-icons';
import { Table } from 'reactstrap';
import RankingRow from '../../components/RankingRow';

import EditableField from '../../components/EditableField';
import SearchBar from '../../components/SearchBar/index';
import { siteRankActions, listActions } from '../../actions';
import { toastAlert } from '../../utils/helpers';
import './styles.scss';

class Home extends PureComponent {
  constructor() {
    super();
    this.state = {
      isEditable: false,
      currentEditValue: ''
    };
    this.onDelete = this.onDelete.bind(this);
    this.buttonSwitch = this.buttonSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const { getSingleList, getRanksForWebsitesInList } = this.props;

    // the tab was clicked to create a new list, immediately make the list and Redirect
    if (this.props.match.params.id === 'new') {
      this.props.create().then(res => {
        if (res.type === 'CREATE_LIST_REQUEST_FAIL') {
          toastAlert('error', `Something went wrong adding a new list`);
        } else {
          toastAlert('success', `Successfully added a new list`);
          this.props.history.push(`/list/${res.newListId.data._id}`);
        }
      });
    }

    // Load list into state
    getSingleList(this.props.match.params.id).then(() =>
      this.setState({ currentEditValue: this.props.lists.name })
    );

    // Load ranks from list into state (separate for instantaneous UI updates)
    getRanksForWebsitesInList(this.props.match.params.id);
  }

  // deletes single website
  onDelete(websiteId) {
    this.props
      .deleteSiteFromList(websiteId, this.props.match.params.id)
      .then(res => {
        if (res.type === 'DELETE_SITE_FROM_LIST_FAIL') {
          toastAlert('error', `Something went wrong deleting website`);
        } else {
          toastAlert('info', `Successfully deleted websites from your list`);
        }
      });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      const siteID = this.props.match.params.id;
      const name = event.target.value;
      this.props.update(siteID, name).then(res => {
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
    console.log(this.state.currentEditValue);
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  };

  analyze = async urlsToQuery => {
    if (urlsToQuery.length > 0) {
      console.log('urlstoquery', urlsToQuery);
      const { getBulkTraffic } = this.props;
      const res = await getBulkTraffic(
        urlsToQuery,
        this.props.siteRank.currentListId
      );
      if (res.type === 'GET_TRAFFIC_REQUEST_FAIL') {
        toastAlert(
          'error',
          `One or more of the URL's entered are invalid. (Please mind typo's)`
        );
        return false;
      }

      toastAlert('success', `Successfully added websites to your list`);
      return true;
    }
    // if there are no new sites in the tags, remove the (useless) tags
    return true;
  };

  refreshList = async () => {
    await this.props.refreshList(this.props.match.params.id);
  };

  render() {
    const { ranks, invalidUrls, isLoading } = this.props.siteRank;
    const { name } = this.props.lists;
    const { currentEditValue } = this.state;

    const rows = ranks.map(rank => (
      <RankingRow
        key={rank._id}
        rank={rank}
        onDelete={() => this.onDelete(rank._id)}
      />
    ));

    return (
      <div className="Home body">
        <Helmet title="Analyze" />
        <SearchBar
          actionOnSubmit={this.analyze}
          ranks={ranks}
          invalidUrls={invalidUrls}
          isLoading={isLoading}
        />
        <div className="Home__header">
          <div className="editableField">
            {this.state.isEditable ? (
              <EditableField
                value={currentEditValue}
                type="text"
                editChange={this.handleChange}
                editPress={this.handleKeyPress}
                placeholder={name}
              />
            ) : (
              <h2>{currentEditValue}</h2>
            )}

            <FontAwesomeIcon icon={faPen} onClick={this.buttonSwitch} />
          </div>
        </div>
        {ranks.length === 0 ? (
          'Get started by entering some websites into the search bar and pressing the Analyze button!'
        ) : (
          <Table responsive className="RankTable">
            <thead>
              <th>Website</th>
              <th>
                <FontAwesomeIcon icon={faEye} />
                Pageviews
              </th>
              <th>
                <FontAwesomeIcon icon={faUserFriends} />
                Unique visitors
              </th>
              <th>
                <FontAwesomeIcon icon={faGlobe} />
                Global rank
              </th>
              <th>
                <FontAwesomeIcon icon={faStar} />
                Top country
              </th>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
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
    create: () => dispatch(listActions.createNewList())
    // refreshList: listId => dispatch(listActions.refreshList(listId))
  })
);

export default connector(Home);
