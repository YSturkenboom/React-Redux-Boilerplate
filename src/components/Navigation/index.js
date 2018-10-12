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
import { toast } from 'react-toastify';
import { faUser } from '@fortawesome/pro-light-svg-icons';
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
    this.props.create().then(res => {
      if (res.type === 'CREATE_LIST_REQUEST_FAIL') {
        toast.error(`Something went adding a new list`, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else {
        toast.success(`Succesfully added a new list`, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        this.props.history.push(`/list/${res.newListId.data._id}`);
      }
    });
  }

  render() {
    const { auth } = this.props;

    if (!auth.isLoggedIn) {
      return null;
    }

    return (
      <div>
        <Navbar className="nav" expand="md">
          <NavbarBrand to="/" tag={RouterNavLink}>
            <img
              src={require('../../images/amsalyze-logo.png')}
              alt="amsalyze-logo"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <div>
                <NavItem>
                  <NavLink exact to="/" active={false} tag={RouterNavLink}>
                    Your Lists
                  </NavLink>
                </NavItem>
              </div>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <FontAwesomeIcon icon={faUser} />
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
