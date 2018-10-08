import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { listActions } from '../../actions';
import './styles.scss';
import ListsOverview from '../../components/ListsOverview';
import FloatingCircleButton from '../../components/FloatingCircleButton';

class Lists extends PureComponent {
  componentWillMount() {
    this.props.list();
  }

  addNewList = () => {
    this.props.create().then(res => {
      console.log(res.newListId.data._id);
      this.props.history.push(`/list/${res.newListId.data._id}`);
    });
  };

  render() {
    const { isLoading, data } = this.props.lists;

    return (
      <div className="Lists">
        <Helmet title="Your Lists" />
        {!isLoading && <ListsOverview data={data} />}
        <FloatingCircleButton actionOnClick={this.addNewList} />
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
