import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
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
        toast.error(`Something went wrong deleting the list`, {
          position: toast.POSITION.BOTTOM_LEFT
        });
      } else {
        toast.info(`Successfully deleted the list`, {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    });
  };

  addNewList() {
    this.props.create().then(res => {
      if (res.type === 'CREATE_LIST_REQUEST_FAIL') {
        toast.error(`Something went wrong adding a new list`, {
          position: toast.POSITION.BOTTOM_LEFT
        });
      } else {
        toast.success(`Successfully added a new list`, {
          position: toast.POSITION.BOTTOM_LEFT
        });
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
      <div className="Lists">
        <Helmet title="Your Lists" />
        {!isLoading && (
          <div className="Lists__overview d-flex flex-wrap justify-content-start mx-auto my-5">
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
