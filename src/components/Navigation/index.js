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
import { faUser } from '@fortawesome/pro-light-svg-icons';

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

  render() {
    return (
      <div>
        <Navbar className="nav" expand="md">
          <NavbarBrand exact to="/" tag={RouterNavLink}>
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
                  <NavLink exact to="/" tag={RouterNavLink}>
                    Analyze websites
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/" tag={RouterNavLink}>
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

const connector = connect(({ auth }) => ({ auth }));

export default withRouter(connector(Navigation));
