import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { listActions } from '../../actions';
import './styles.scss';
import ListsOverview from '../../components/ListsOverview';
import Button from '../../components/FloatingCircleButton';

class Lists extends PureComponent {
  componentWillMount() {
    this.props.list();
  }

  addNewList = () => {
    // do stuff
    console.log('clicked');
    // this.props.create();
  };

  render() {
    return (
      <div className="Lists">
        <Helmet title="Your Lists" />
        <ListsOverview data={this.props.lists.data} />
        <Button className="button-primary">+ Analyze URL(&#39;s)</Button>
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
