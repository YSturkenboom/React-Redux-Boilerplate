import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPen } from '@fortawesome/pro-solid-svg-icons';
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
    this.state = {
      isEditable: false,
      currentEditValue: ''
    };
    this.clickRefresh = this.clickRefresh.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.buttonSwitch = this.buttonSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const { getSingleList, getRanksForWebsitesInList } = this.props;

    // Load list into state
    getSingleList(this.props.match.params.id);
    // console.log('id =', this.props.match.params.id);
    // Load ranks from list into state (separate for instantaneous UI updates)
    getRanksForWebsitesInList(this.props.match.params.id);
  }

  // deletes single website
  onDelete(websiteId) {
    console.log(this, 'hello button delete', websiteId);
    toast.info(`removing site ${websiteId}`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
    this.props.deleteSiteFromList(websiteId, this.props.match.params.id);
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      const siteID = this.props.match.params.id;
      const name = event.target.value;
      this.props.update(siteID, name);
      this.setState({ isEditable: false });
      toast.success('Updated title !', {
        position: toast.POSITION.RIGHT_CENTER
      });
    }
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ currentEditValue: event.target.value });
  };

  buttonSwitch = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  };

  // refresh websites
  clickRefresh = () => {
    console.log(this);
    toast.success('Success Notification !', {
      position: toast.POSITION.RIGHT_CENTER
    });

    toast.error('Error Notification !', {
      position: toast.POSITION.TOP_LEFT
    });
  };

  analyze = urlsToQuery => {
    if (urlsToQuery.length > 0) {
      console.log('urlstoquery', urlsToQuery);
      const { getBulkTraffic } = this.props;
      getBulkTraffic(urlsToQuery, this.props.siteRank.currentListId).then(
        res => {
          if (res.type === 'GET_TRAFFIC_REQUEST_SUCCESS') {
            return true;
          }
          return false;
        }
      );
    } else {
      // if there are no new sites in the tags, remove the (useless) tags
      return true;
    }
    return false;
  };

  render() {
    const { ranks } = this.props.siteRank;
    const { name } = this.props.lists;
    const { currentEditValue } = this.state;

    const rows = ranks.map(rank => (
      <RankingRow rank={rank} onDelete={() => this.onDelete(rank._id)} />
    ));

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
              <h2>{name}</h2>
            )}

            <FontAwesomeIcon icon={faPen} onClick={this.buttonSwitch} />
          </div>

          <Button className="button-outline" onClick={this.clickRefresh}>
            Refresh websites
            <FontAwesomeIcon icon={faSync} onClick={this.clickRefresh} />
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
    getBulkTraffic: (sites, listId) =>
      dispatch(siteRankActions.getBulkTraffic(sites, listId)),
    getSingleList: id => dispatch(listActions.getSingleList(id)),
    update: (id, name) => dispatch(listActions.updateTitle(id, name)),
    deleteSiteFromList: (siteId, listId) =>
      dispatch(listActions.deleteSiteFromList(siteId, listId))
  })
);

export default connector(Home);
