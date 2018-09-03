import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
// import { toast } from 'react-toastify';

// import { Header } from 'components';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight } from '@fortawesome/pro-regular-svg-icons';
import { faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';

import './styles.scss';

import {
  Col,
  Form,
  FormGroup,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';

export default class Articles extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activetablerow: '0',
      data: [
        {
          id: 1,
          description: 'LOODVERVANGER UBIXFLEX ZWART 30 CM 12',
          articleNumber: 467372,
          supplier: 'Voskamp',
          agreed: 3321,
          lowest: 3321,
          highest: 3321,
          quantity: 20,
          total: 66420,
          pdf: 'https://translate.google.com/',
          items: [
            {
              name: 'FC-VBT-0436400',
              customer: 'Kilgore Trout',
              date: '9/12/2017',
              quantity: 10,
              price: 71.5
            },
            {
              name: 'FC-VBT-0436400',
              customer: 'Kilgore Trout',
              date: '9/12/2017',
              quantity: 10,
              price: 71.5
            }
          ]
        },
        {
          id: 2,
          description: 'LOODVERVANGER UBIXFLEX ZWART 30 CM 12',
          articleNumber: 467372,
          supplier: 'Voskamp',
          agreed: 3321,
          lowest: 3321,
          highest: 3321,
          quantity: 10,
          total: 33210,
          pdf: 'https://translate.google.com/',
          items: [
            {
              name: 'FC-VBT-0436400',
              customer: 'Kilgore Trout',
              date: '9/12/2017',
              quantity: 5,
              price: 71.5
            },
            {
              name: 'FC-VBT-0436400',
              customer: 'Kilgore Trout',
              date: '9/12/2017',
              quantity: 5,
              price: 71.5
            }
          ]
        }
      ]
    };
  }

  invoiceTable = () => {
    const table = map(this.state.data, this.renderTable);

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Omschrijving</th>
            <th>Artikel</th>
            <th>Leverancier</th>
            <th>Prijsafspraak</th>
            <th>Laag</th>
            <th>Hoog</th>
            <th>Aantal</th>
            <th>Total</th>
            <th>O</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>
    );
  };

  toggleCollapse = tableRow => {
    if (this.state.activetablerow !== tableRow) {
      this.setState({
        activetablerow: tableRow
      });
    } else if (this.state.activetablerow === tableRow) {
      this.setState({
        activetablerow: '0'
      });
    }
  };

  renderTable = invoice => {
    const subtableItems = map(invoice.items, this.renderSubtableItems);
    return [
      <tr
        key={invoice.id}
        className={
          this.state.activetablerow === invoice.id
            ? 'table--inner--active'
            : null
        }
        onClick={() => {
          this.toggleCollapse(invoice.id);
        }}
      >
        <td>{invoice.description}</td>
        <td>{invoice.articleNumber}</td>
        <td>{invoice.supplier}</td>
        <td className="text-success">€{invoice.agreed.toLocaleString()}</td>
        <td>€{invoice.lowest.toLocaleString()}</td>
        <td>€{invoice.highest.toLocaleString()}</td>
        <td>{invoice.quantity}</td>
        <td>€{invoice.total.toLocaleString()}</td>
        <td>
          <FontAwesomeIcon icon={faArrowAltToBottom} />
          <span className="toggle-collapse" />
        </td>
      </tr>,
      <tr
        activetablerow={this.state.activetablerow}
        className="table--inner"
        tablerowid={invoice.id}
      >
        <td colSpan="9">
          <Table>
            <thead>
              <tr>
                <th>Factuurnr.</th>
                <th>Afnemer</th>
                <th>Datum</th>
                <th>Aantal</th>
                <th>Factuurprijs</th>
              </tr>
            </thead>
            <tbody>{subtableItems}</tbody>
          </Table>
        </td>
      </tr>
    ];
  };

  renderSubtableItems = invoice => (
    <tr key={invoice.itemNumber}>
      <td>
        {invoice.name} <FontAwesomeIcon icon={faArrowAltToBottom} />
      </td>
      <td>{invoice.customer}</td>
      <td>{invoice.date}</td>
      <td>{invoice.quantity}</td>
      <td>€{invoice.price.toLocaleString()}</td>
    </tr>
  );

  render() {
    const title = 'Articles';

    return (
      <div className="Articles">
        <Helmet title={title} />
        <div className="container">
          <div>
            <Row>
              <Col md="6" sm="12">
                <h1 className="h2">
                  Artikelen
                  <small> (348)</small>
                </h1>
              </Col>
              <Col md="6" sm="12">
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
                  <p>Reset filters</p>
                </Form>
              </Col>
            </Row>
          </div>
          {this.invoiceTable()}
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
      </div>
    );
  }
}
