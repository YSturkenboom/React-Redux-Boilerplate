import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
import confirm from 'reactstrap-confirm';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { toastAlert } from '../../utils/helpers';
import { listActions } from '../../actions';
import './styles.scss';
import { FloatingCircleButton, List, AddSiteButton } from '../../components';

class Lists extends PureComponent {
  constructor() {
    super();
    this.addNewList = this.addNewList.bind(this);
    this.onDeleteWebsite = this.onDeleteWebsite.bind(this);
  }

  componentDidMount() {
    const { list } = this.props;
    ReactGA.initialize('UA-92045603-2');
    ReactGA.pageview('/lists');
    list();
  }

  onDeleteWebsite = async (id, name) => {
    const confirmed = await confirm({
      title: `Deleting list "${name}"`,
      message: 'Are you sure you want to delete this list?',
      confirmText: `Yes, I'm sure!`,
      confirmColor: 'primary',
      cancelColor: 'link text-danger'
    });
    if (confirmed) {
      const { deleteList } = this.props;
      deleteList(id).then(res => {
        if (res.type === 'LIST_DELETE_FAIL') {
          toastAlert('error', `Something went wrong deleting the list`);
          ReactGA.event({
            category: 'Lists',
            action: 'List deletion failed'
          });
        } else {
          toastAlert('info', `Successfully deleted the list`);
          ReactGA.event({
            category: 'Lists',
            action: 'Deleted list'
          });
        }
      });
    }
  };

  addNewList = async () => {
    const { create, history } = this.props;
    create().then(res => {
      if (res.type === 'CREATE_LIST_REQUEST_FAIL') {
        toastAlert('error', `Something went wrong adding a new list`);
        ReactGA.event({
          category: 'Lists',
          action: 'New list creation failed'
        });
      } else {
        ReactGA.event({
          category: 'Lists',
          action: 'Created new list'
        });
        toastAlert('success', `Successfully added a new list`);
        history.push(`/list/${res.newListId.data._id}`);
      }
    });
  };

  render() {
    const { lists } = this.props;
    const { isLoading, data } = lists;
    let listArr;
    if (data) {
      listArr = orderBy(data, ['createdAt'], ['desc']).map(list => (
        <List
          key={list._id}
          list={list}
          onDelistArrleteWebsite={() =>
            this.onDeleteWebsite(list._id, list.name)
          }
        />
      ));
    } else {
      listArr = [];
    }

    return (
      <div className="Lists body">
        <Helmet title="Your Lists" />
        {!isLoading && (
          <div className="Lists__overview row">
            <AddSiteButton addNewList={this.addNewList} />
            {listArr}
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
