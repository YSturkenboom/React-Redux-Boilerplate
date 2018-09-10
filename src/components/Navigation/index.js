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
import {
  faChartBar,
  faEye,
  faFileAlt,
  faFileInvoiceDollar,
  faBoxAlt,
  faUser
} from '@fortawesome/pro-light-svg-icons';
// import { faChartBar } from '@fortawesome/pro-regular-svg-icons';

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
            <img alt="logo" src={require('../../images/logo-white.png')} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <div>
                <NavItem>
                  <NavLink exact to="/" tag={RouterNavLink}>
                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                    Facturen
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/articles/" tag={RouterNavLink}>
                    <FontAwesomeIcon icon={faBoxAlt} />
                    Artikelen
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/overview/" tag={RouterNavLink}>
                    <FontAwesomeIcon icon={faEye} />
                    Overzicht
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/reports/" tag={RouterNavLink}>
                    <FontAwesomeIcon icon={faFileAlt} />
                    Rapporten
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/components/" tag={RouterNavLink}>
                    <FontAwesomeIcon icon={faChartBar} />
                    Statistieken
                  </NavLink>
                </NavItem>
              </div>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faUser} />
                  Welcome
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem divider />
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
