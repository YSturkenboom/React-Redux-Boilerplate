import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { toast } from 'react-toastify';
import { Table } from 'reactstrap';
import RankingRow from '../../components/RankingRow';

import EditableField from '../../components/EditableField';
import SearchBar from '../../components/SearchBar/index';
import { siteRankActions, listActions } from '../../actions';
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

    // Load list into state
    getSingleList(this.props.match.params.id).then(() =>
      this.setState({ currentEditValue: this.props.lists.name })
    );

    // console.log('id =', this.props.match.params.id);
    // Load ranks from list into state (separate for instantaneous UI updates)
    getRanksForWebsitesInList(this.props.match.params.id);
  }

  // deletes single website
  onDelete(websiteId) {
    this.props
      .deleteSiteFromList(websiteId, this.props.match.params.id)
      .then(res => {
        if (res.type === 'DELETE_SITE_FROM_LIST_FAIL') {
          toast.error(`Something went deleting website`, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        } else {
          toast.info(`Succesfully deleted websites from your list`, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      const siteID = this.props.match.params.id;
      const name = event.target.value;
      this.props.update(siteID, name).then(res => {
        if (res.type === 'LIST_TITLE_UPDATE_FAIL') {
          toast.error(`Something went wrong deleting the list`, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        } else {
          toast.success(`Succesfully updated list title`, {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      });
      this.setState({ isEditable: false, currentEditValue: name });
    }
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ currentEditValue: event.target.value });
  };

  buttonSwitch = () => {
    console.log(this.state.currentEditValue);
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  };

  analyze = urlsToQuery => {
    if (urlsToQuery.length > 0) {
      console.log('urlstoquery', urlsToQuery);
      const { getBulkTraffic } = this.props;
      getBulkTraffic(urlsToQuery, this.props.siteRank.currentListId).then(
        res => {
          if (res.type === 'GET_TRAFFIC_REQUEST_FAIL') {
            toast.error(`Something went wrong adding websites`, {
              position: toast.POSITION.BOTTOM_CENTER
            });
          } else {
            toast.success(`Succesfully added websites to your list`, {
              position: toast.POSITION.BOTTOM_CENTER
            });
          }
          return false;
        }
      );
    } else {
      // if there are no new sites in the tags, remove the (useless) tags
      return true;
    }
    return true;
  };

  render() {
    const { ranks } = this.props.siteRank;
    const { name } = this.props.lists;
    const { currentEditValue } = this.state;

    const rows = ranks.map(rank => (
      <RankingRow
        key={rank._id}
        rank={rank}
        onDelete={() => this.onDelete(rank._id)}
      />
    ));

    console.log(ranks);

    return (
      <div className="Home">
        <Helmet title="Analyze" />
        <SearchBar
          actionOnSubmit={this.analyze}
          ranks={this.props.siteRank.ranks}
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
      dispatch(listActions.deleteSiteFromList(siteId, listId))
  })
);

export default connector(Home);
