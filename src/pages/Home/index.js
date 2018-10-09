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
      isEditable: false
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
  onDelete() {
    console.log(this, 'hello button delete');
    toast.info('Info Notification !', {
      position: toast.POSITION.BOTTOM_CENTER
    });
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
  };

  buttonSwitch() {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  }

  // refresh websites
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
    const { name } = this.props.lists.data;

    const rows = ranks.map(rank => (
      <RankingRow rank={rank} onDelete={this.onDelete} />
    ));

    const Title = () => (
      <div>{name === '' ? <h2>Empty String</h2> : <h2>{name}</h2>}</div>
    );

    return (
      <div className="Home">
        <Helmet title="Analyze" />
        <SearchBar actionOnSubmit={siteRankActions.getBulkTraffic} />
        <div className="Home__header">
          <div className="editableField">
            {this.state.isEditable ? (
              <EditableField
                type="text"
                editChange={this.handleChange}
                editPress={this.handleKeyPress}
                placeholder={name}
              />
            ) : (
              <Title />
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
    getBulkTraffic: () => dispatch(siteRankActions.getBulkTraffic()),
    getSingleList: id => dispatch(listActions.getSingleList(id)),
    update: (id, name) => dispatch(listActions.updateTitle(id, name))
  })
);

export default connector(Home);
