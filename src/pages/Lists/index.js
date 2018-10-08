import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { listActions } from '../../actions';
import './styles.scss';
import ListsOverview from '../../components/ListsOverview';
import FloatingCircleButton from '../../components/FloatingCircleButton';

class Lists extends PureComponent {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
    this.addNewList = this.addNewList.bind(this);
  }

  componentWillMount() {
    this.props.list();
  }

  onDelete() {
    console.log(this);
  }

  addNewList() {
    console.log(this);
    alert('Connect redux to make new list');
  }

  render() {
    const { isLoading, data } = this.props.lists;

    return (
      <div className="Lists">
        <Helmet title="Your Lists" />
        {!isLoading && (
          <ListsOverview
            data={data}
            onDelete={this.onDelete}
            addNewList={this.addNewList}
          />
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
