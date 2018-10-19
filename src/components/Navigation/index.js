import React, { Component } from 'react';

import { connect } from 'react-redux';
import { NavLink as RouterNavLink, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import { toastAlert } from '../../utils/helpers';
import { listActions } from '../../actions';

import './styles.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  addNewList() {
    const { create, history } = this.props;
    create().then(res => {
      if (res.type === 'CREATE_LIST_REQUEST_FAIL') {
        toastAlert('error', `Something went wrong adding a new list`);
      } else {
        toastAlert('success', `Successfully added a new list`);
        history.push(`/list/${res.newListId.data._id}`);
      }
    });
  }

  render() {
    const { auth } = this.props;
    const { isOpen } = this.state;

    if (!auth.isLoggedIn) {
      return null;
    }

    return (
      <div className="navbar--wrapper">
        <Navbar className="nav container" expand="md">
          <NavbarBrand to="/" tag={RouterNavLink}>
            <img
              src={require('../../images/amsalyze-logo.png')}
              alt="amsalyze-logo"
            />
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggle}
            className={!isOpen && 'collapsed'}
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <div>
                <NavItem>
                  <NavLink
                    to="/lists"
                    tag={RouterNavLink}
                    activeClassName="active"
                  >
                    <span>Your Lists</span>
                  </NavLink>
                </NavItem>
              </div>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <span>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <span>Profile</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem to="/logout" tag={RouterNavLink}>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const connector = connect(
  ({ auth, lists }) => ({ auth, lists }),
  dispatch => ({
    create: () => dispatch(listActions.createNewList())
  })
);

export default withRouter(connector(Navigation));
