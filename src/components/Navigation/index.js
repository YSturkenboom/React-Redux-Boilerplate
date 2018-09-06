import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
          <NavbarBrand href="/">
            <img alt="logo" src={require('../../images/logo-white.png')} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <div>
                <NavItem>
                  <NavLink href="/">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                    Facturen
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/articles/">
                    <FontAwesomeIcon icon={faBoxAlt} />
                    Artikelen
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/overview/">
                    <FontAwesomeIcon icon={faEye} />
                    Overzicht
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/components/">
                    <FontAwesomeIcon icon={faFileAlt} />
                    Rapporten
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/components/">
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
                  <DropdownItem>Log out</DropdownItem>
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
