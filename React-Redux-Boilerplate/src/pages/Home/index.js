import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import './styles.scss';

class Home extends PureComponent {
  render() {
    return (
      <div className="Home body">
        <Helmet title="Boilerplate" />
        <h1>Hello World!</h1>
        <p>Lets build something cool.</p>
      </div>
    );
  }
}

/* Redux connector */
/*
const connector = connect(
  ({ reducer }) => ({ reducer }),
  dispatch => ({
    action1: arg =>
      dispatch(actions.action1(arg)),
  })
);
*/

export default Home;
