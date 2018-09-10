import React, { PureComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';
import { Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import './styles.scss';

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      activeTab: '1'
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return [
      <div className="second-menu__container">
        <div className="container">
          <div className="second-menu__container--left">
            {this.props.tabs === true ? (
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '1' ? 'active' : null}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    {this.props.tab1}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '2' ? 'active' : null}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    {this.props.tab2}
                  </NavLink>
                </NavItem>
              </Nav>
            ) : null}
          </div>
          <div className="second-menu__container--right">
            <div className="search">
              <Input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <a href="/" className="btn btn-outline-primary">
              Excel export <FontAwesomeIcon icon={faArrowAltToBottom} />
            </a>
          </div>
        </div>
      </div>,
      <div>
        {this.props.tabs === true ? (
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="container">
                {this.props.filter1}
                {this.props.tableFunction1}
                {this.props.pagination1}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="container">
                {this.props.filter2}
                {this.props.tableFunction2}
                {this.props.pagination2}
              </div>
            </TabPane>
          </TabContent>
        ) : (
          <div className="container">
            {this.props.filter1}
            {this.props.tableFunction1}
            {this.props.pagination1}
          </div>
        )}
      </div>
    ];
  }
}
