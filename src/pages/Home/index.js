import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
// import { toast } from 'react-toastify';

// import { Header } from 'components';
// import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons';
import { faTrash, faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';

import './styles.scss';

import {
  Col,
  Form,
  FormGroup,
  Input,
  NavLink,
  Nav,
  NavItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  TabContent,
  TabPane,
  Table
} from 'reactstrap';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      activetablerow: '0'
      // invoices: [
      //   {
      //     date: '9/12/2017',
      //     customer: 'Kilgore Trout',
      //     invoiceNumber: '272',
      //     supplier: 'Voskamp',
      //     priceControl: 'Afgekeurd',
      //     price: '€492,95',
      //     excess: '€305,55',
      //     pdf: 'https://translate.google.com/',
      //     items: {
      //       name: 'Verbandtrommel 86583 B-384 Houder',
      //       itemNumber: '86173',
      //       price: '€30,81',
      //       lowest: '€25,12',
      //       agreed: '€25,12',
      //       quantity: '1'
      //     }
      //   }
      // ]
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleCollapse(tableRow) {
    if (this.state.activetablerow !== tableRow) {
      this.setState({
        activetablerow: tableRow
      });
    } else if (this.state.activetablerow === tableRow) {
      this.setState({
        activetablerow: '0'
      });
    }
  }

  // const renderArticleHeadline = invoice => ({ invoice });

  // <tr
  //   className={
  //     this.state.activetablerow === '1' ? 'table--inner--active' : null
  //   }
  //   onClick={() => {
  //     this.toggleCollapse('1');
  //   }}
  // >
  //   <td>{invoice.date}</td>
  //   <td>{invoice.customer}</td>
  //   <td>{invoice.invoiceNumber}</td>
  //   <td>{invoice.supplier}</td>
  //   <td>
  //     <span className="status status--rejected" />
  //     {invoice.priceControl}
  //   </td>
  //   <td>3</td>
  //   <td>
  //     {invoice.priceControl}
  //     <span className="status--rejected__quantity"> {invoice.excess}</span>
  //   </td>
  //   <td>
  //     <FontAwesomeIcon icon={faArrowAltToBottom} />
  //     <span className="toggle-collapse" />
  //   </td>
  // </tr>

  render() {
    const title = 'Home';
    // const items = map(this.state.invoices, invoice => ({ invoice }));

    return (
      <div className="Home">
        <Helmet title={title} />
        <div className="tab__container">
          <div className="container">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '1' ? 'active' : null}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    Verwerkt
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '2' ? 'active' : null}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    Wachtlijst
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        </div>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="container">
              <div>
                <Row>
                  <Col md="5" sm="12">
                    <h1 className="h2">
                      Facturen
                      <small> (348)</small>
                    </h1>
                    <p>
                      Totaal bedrag
                      <b> € 124,894</b>
                    </p>
                  </Col>
                  <Col md="7" sm="12">
                    <Form>
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option value="" disabled selected>
                            08/08/2016
                          </option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option value="" disabled selected>
                            08/08/2016
                          </option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option value="" disabled selected>
                            Leveranciers
                          </option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option value="" disabled selected>
                            Afnemers
                          </option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option value="" disabled selected>
                            Prijsafspraak
                          </option>
                          <option>Goedgekeurd</option>
                          <option>Afgekeurd</option>
                        </Input>
                      </FormGroup>
                      <p>Reset filters</p>
                    </Form>
                  </Col>
                </Row>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Afnemer</th>
                    <th>Factuur nr.</th>
                    <th>Leverancier</th>
                    <th>Prijscontrole</th>
                    <th>Items</th>
                    <th>Bedrag</th>
                    <th>O</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {items} */}
                  <tr
                    className={
                      this.state.activetablerow === '1'
                        ? 'table--inner--active'
                        : null
                    }
                    onClick={() => {
                      this.toggleCollapse('1');
                    }}
                  >
                    <td>9/12/2017</td>
                    <td>Kilgore Trout</td>
                    <td>272</td>
                    <td>Voskamp</td>
                    <td>
                      <span className="status status--rejected" />
                      Afgekeurd
                    </td>
                    <td>3</td>
                    <td>
                      €495,95
                      <span className="status--rejected__quantity">
                        (+€305,55)
                      </span>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faArrowAltToBottom} />
                      <span className="toggle-collapse" />
                    </td>
                  </tr>
                  <tr
                    activetablerow={this.state.activetablerow}
                    className="table--inner"
                    tablerowid="1"
                  >
                    <td colSpan="8">
                      <Table>
                        <thead>
                          <tr>
                            <th>Artikel</th>
                            <th>Artikel nr.</th>
                            <th>Factuurprijs</th>
                            <th>Laagst</th>
                            <th>Prijsafspraak</th>
                            <th>Aantal</th>
                            <th>Totaal</th>
                            <th>D</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Verbandtrommel 86583 B-384 Houder</td>
                            <td>86173</td>
                            <td>€30,81</td>
                            <td>€25,12</td>
                            <td>
                              <span className="status status--rejected" />
                              €28,81
                            </td>
                            <td>1</td>
                            <td>
                              €30,81
                              <span className="status--rejected__quantity">
                                (+€5,55)
                              </span>
                            </td>
                            <td>
                              Details
                              <FontAwesomeIcon icon={faAngleRight} />
                            </td>
                          </tr>
                          <tr>
                            <td>Verbandtrommel 86583 B-384 Houder</td>
                            <td>86173</td>
                            <td>€30,81</td>
                            <td>€25,12</td>
                            <td>
                              <span className="status status--accepted" />
                              €28,81
                            </td>
                            <td>1</td>
                            <td>€30,81</td>
                            <td>
                              Details
                              <FontAwesomeIcon icon={faAngleRight} />
                            </td>
                          </tr>
                          <tr>
                            <td>Verbandtrommel 86583 B-384 Houder</td>
                            <td>86173</td>
                            <td>€30,81</td>
                            <td>€25,12</td>
                            <td>
                              <span className="status status--accepted" />
                              €28,81
                            </td>
                            <td>1</td>
                            <td>€30,81</td>
                            <td>
                              Details
                              <FontAwesomeIcon icon={faAngleRight} />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                  <tr
                    className={
                      this.state.activetablerow === '2'
                        ? 'table--inner--active'
                        : null
                    }
                    onClick={() => {
                      this.toggleCollapse('2');
                    }}
                  >
                    <td>9/12/2017</td>
                    <td>Kilgore Trout</td>
                    <td>272</td>
                    <td>Voskamp</td>
                    <td>
                      <span className="status status--accepted" />
                      Goedgekeurd
                    </td>
                    <td>3</td>
                    <td>€495,95</td>
                    <td>
                      <FontAwesomeIcon icon={faArrowAltToBottom} />
                      <span className="toggle-collapse" />
                    </td>
                  </tr>
                  <tr
                    activetablerow={this.state.activetablerow}
                    className="table--inner"
                    tablerowid="2"
                  >
                    <td colSpan="8">
                      <Table>
                        <thead>
                          <tr>
                            <th>Artikel</th>
                            <th>Artikel nr.</th>
                            <th>Factuurprijs</th>
                            <th>Laagst</th>
                            <th>Prijsafspraak</th>
                            <th>Aantal</th>
                            <th>Totaal</th>
                            <th>D</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Verbandtrommel 86583 B-384 Houder</td>
                            <td>86173</td>
                            <td>€30,81</td>
                            <td>€25,12</td>
                            <td>
                              <span className="status status--accepted" />
                              €28,81
                            </td>
                            <td>1</td>
                            <td>€30,81</td>
                            <td>
                              Details
                              <FontAwesomeIcon icon={faAngleRight} />
                            </td>
                          </tr>
                          <tr>
                            <td>Verbandtrommel 86583 B-384 Houder</td>
                            <td>86173</td>
                            <td>€30,81</td>
                            <td>€25,12</td>
                            <td>
                              <span className="status status--accepted" />
                              €28,81
                            </td>
                            <td>1</td>
                            <td>€30,81</td>
                            <td>
                              Details
                              <FontAwesomeIcon icon={faAngleRight} />
                            </td>
                          </tr>
                          <tr>
                            <td>Verbandtrommel 86583 B-384 Houder</td>
                            <td>86173</td>
                            <td>€30,81</td>
                            <td>€25,12</td>
                            <td>
                              <span className="status status--accepted" />
                              €28,81
                            </td>
                            <td>1</td>
                            <td>€30,81</td>
                            <td>
                              Details
                              <FontAwesomeIcon icon={faAngleRight} />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Pagination aria-label="Page navigation">
                <p>
                  Bekijk
                  <b> 1-20 </b>
                  van
                  <b> 348 </b>
                </p>
                <PaginationItem disabled>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#" />
                </PaginationItem>
              </Pagination>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="container">
              <h1 className="h2">Wachtlijst</h1>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Afnemer</th>
                    <th>Factuur nr.</th>
                    <th>Leverancier</th>
                    <th>Probleem</th>
                    <th>O</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table--inner--active">
                    <td>9/12/2017</td>
                    <td>Kilgore Trout</td>
                    <td>
                      Mastermate factuur FC-328393293_s82 vviir Plegt-Vos B.V.
                    </td>
                    <td className="text-danger">Verkeerd PDF format </td>
                    <td>3</td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="toggle-collapse" />
                    </td>
                  </tr>
                  <tr className="table--inner">
                    <td colSpan="8">
                      <Table>
                        <thead>
                          <tr>
                            <th>Attachments</th>
                            <th>Probleem</th>
                            <th>D</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>3279327293_82747.PDF</td>
                            <td className="text-danger">
                              Verkeerde PDF format, bedrag onderwerp ontbreekt
                            </td>
                            <td>
                              <FontAwesomeIcon icon={faArrowAltToBottom} />
                            </td>
                          </tr>
                          <tr>
                            <td>3279327293_82747.PDF</td>
                            <td className="text-danger">
                              Verkeerde PDF format, bedrag onderwerp ontbreekt
                            </td>
                            <td>
                              <FontAwesomeIcon icon={faArrowAltToBottom} />
                            </td>
                          </tr>
                          <tr>
                            <td>3279327293_82747.PDF</td>
                            <td className="text-danger">
                              Verkeerde PDF format, bedrag onderwerp ontbreekt
                            </td>
                            <td>
                              <FontAwesomeIcon icon={faArrowAltToBottom} />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                  <tr>
                    <td>9/12/2017</td>
                    <td>Kilgore Trout</td>
                    <td>
                      Mastermate factuur FC-328393293_s82 vviir Plegt-Vos B.V.
                    </td>
                    <td className="text-danger">Verkeerd PDF format </td>
                    <td>3</td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="toggle-collapse" />
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Pagination aria-label="Page navigation">
                <p>
                  Bekijk
                  <b> 1-20 </b>
                  van
                  <b> 348 </b>
                </p>
                <PaginationItem disabled>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#" />
                </PaginationItem>
              </Pagination>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
