import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { toastAlert } from '../../utils/helpers';
import { listActions } from '../../actions';
import './styles.scss';
import FloatingCircleButton from '../../components/FloatingCircleButton';
import List from '../../components/List';
import AddSiteButton from '../../components/AddSiteButton';

class Lists extends PureComponent {
  constructor() {
    super();

    this.addNewList = this.addNewList.bind(this);
    this.onDeleteWebsite = this.onDeleteWebsite.bind(this);
  }

  componentDidMount() {
    this.props.list();
  }

  onDeleteWebsite = id => {
    this.props.deleteList(id).then(res => {
      if (res.type === 'LIST_DELETE_FAIL') {
        toastAlert('error', `Something went wrong deleting the list`);
      } else {
        toastAlert('info', `Successfully deleted the list`);
      }
    });
  };

  addNewList() {
    this.props.create().then(res => {
      if (res.type === 'CREATE_LIST_REQUEST_FAIL') {
        toastAlert('error', `Something went wrong adding a new list`);
      } else {
        toastAlert('success', `Successfully added a new list`);
        this.props.history.push(`/list/${res.newListId.data._id}`);
      }
    });
  }

  render() {
    const { isLoading, data } = this.props.lists;
    let lists;
    if (data) {
      lists = data.map(list => (
        <List
          key={list._id}
          list={list}
          onDeleteWebsite={() => this.onDeleteWebsite(list._id)}
        />
      ));
    } else {
      lists = [];
    }

    return (
      <div className="Lists body">
        <Helmet title="Your Lists" />
        {!isLoading && (
          <div className="Lists__overview row">
            <AddSiteButton addNewList={this.addNewList} />
            {lists}
          </div>
        )}
        <FloatingCircleButton addNewList={this.addNewList} />
      </div>
    );
  }
}

const connector = connect(
  ({ lists }) => ({ lists }),
  dispatch => ({
    create: () => dispatch(listActions.createNewList()),
    list: () => dispatch(listActions.getList()),
    deleteList: id => dispatch(listActions.deleteList(id))
  })
);

export default connector(Lists);
