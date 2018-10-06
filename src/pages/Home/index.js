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
    console.log('didmount', this.props.match.params.id);
    this.props.getSingleList(this.props.match.params.id);
  }

  clickRefresh() {
    this.setState({ show_error: true });
  }

  render() {
    const { websites } = this.props.lists.data;
    console.log(this.props.match.params.id);

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
        <RankingTable ranks={websites} />
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
    getBulkTraffic: () => dispatch(siteRankActions.getBulkTraffic()),
    getSingleList: id => dispatch(listActions.getSingleList(id))
  })
);

export default connector(Home);
