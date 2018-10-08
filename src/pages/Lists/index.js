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

  componentWillMount() {
    this.props.list();
  }

  onDeleteWebsite() {
    console.log(this);
    toast.info('Delete list !', {
      position: toast.POSITION.RIGHT_CENTER
    });
  }

  addNewList() {
    console.log(this);
    toast.success('Success Notification !', {
      position: toast.POSITION.RIGHT_CENTER
    });
    this.props.create().then(res => {
      console.log(res.newListId.data._id);
      this.props.history.push(`/list/${res.newListId.data._id}`);
    });
  }

  render() {
    const { isLoading, data } = this.props.lists;

    const lists = data.map(list => (
      <List list={list} onDeleteWebsite={this.onDeleteWebsite} />
    ));

    return (
      <div className="Lists">
        <Helmet title="Your Lists" />
        {!isLoading && (
          <div className="ListsOverview">
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
    list: () => dispatch(listActions.getList())
  })
);

export default connector(Lists);
