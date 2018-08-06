import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Grid, MenuItem, NavDropdown, NavItem } from 'react-bootstrap';

import './styles.scss';

class Navigation extends Component {
  render() {
    return (
      <nav
        className="Navigation"
        ref={ref => {
          this._header = ref;
        }}
      >
        <Grid className="nav-container">
          <Grid>
            <Link className="nav-logo hidden-xs" to="/">
              LOGO
            </Link>

            <ul className="nav-left">
              <IndexLinkContainer to="/">
                <NavItem className="nav-item">Home</NavItem>
              </IndexLinkContainer>
              <LinkContainer to="/page">
                <NavItem className="nav-item">Page</NavItem>
              </LinkContainer>
            </ul>

            <ul className="nav-right">
              <li className="nav-item hidden-xs">
                <Link className="btn hidden-sm hidden-xs" to="/page">
                  Page
                </Link>
              </li>
              <NavDropdown
                className="nav-item"
                title="Account"
                id="dropdown-profile"
                pullRight
              >
                <LinkContainer to="/account">
                  <MenuItem>My account</MenuItem>
                </LinkContainer>
                <MenuItem divider className="hidden-lg" />
                <LinkContainer to="/logout">
                  <MenuItem className="hidden-lg">Log out</MenuItem>
                </LinkContainer>
              </NavDropdown>
              <li className="nav-item visible-lg">
                <Link to="/logout">Log out</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </nav>
    );
  }
}

const connector = connect(({ auth }) => ({ auth }));

export default withRouter(connector(Navigation));
