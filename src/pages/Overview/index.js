import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
// import { toast } from 'react-toastify';

// import { Header } from 'components';
import { map } from 'lodash';
import {
  Col,
  Form,
  FormGroup,
  Input,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  Row,
  Table
} from 'reactstrap';

import { formatPrice } from '../../utils/formatting';
import { SecondNav } from '../../components';

import './styles.scss';

export default class Overview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          customerId: 1,
          customer: 'Trebbe',
          total: 134322,
          totalPeriod: 4984,
          january: 4984,
          february: 4984,
          march: 4984,
          april: 4984,
          may: 4984,
          items: [
            {
              supplierId: 1,
              supplier: 'Trebbe',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            },
            {
              supplierId: 2,
              supplier: 'Trebbe',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            }
          ]
        },
        {
          id: 2,
          customer: 'Plegt Vos Noord',
          customerId: 2,
          total: 134322,
          totalPeriod: 4984,
          january: 4984,
          february: 4984,
          march: 4984,
          april: 4984,
          may: 4984,
          items: [
            {
              supplierId: 3,
              supplier: 'Plegt Vos Noord',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            },
            {
              supplierId: 4,
              supplier: 'Plegt Vos Noord',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            },
            {
              supplierId: 5,
              supplier: 'Plegt Vos Noord',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            }
          ]
        },
        {
          id: 3,
          customer: 'Plegt Vos Noord',
          customerId: 3,
          total: 134322,
          totalPeriod: 4984,
          january: 4984,
          february: 4984,
          march: 4984,
          april: 4984,
          may: 4984,
          items: [
            {
              supplierId: 3,
              supplier: 'Plegt Vos Noord',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            },
            {
              supplierId: 4,
              supplier: 'Plegt Vos Noord',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            },
            {
              supplierId: 5,
              supplier: 'Plegt Vos Noord',
              total: 134322,
              totalPeriod: 4984,
              january: 4984,
              february: 4984,
              march: 4984,
              april: 4984,
              may: 4984
            }
          ]
        }
      ]
    };
  }

  invoiceTable = () => {
    const table = map(this.state.data, this.renderTable);
    const dataAll = {
      id: 1,
      total: 134322,
      totalPeriod: 4984,
      january: 4984,
      february: 4984,
      march: 4984,
      april: 4984,
      may: 4984
    };

    return (
      <Table responsive className="table--main">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden">Total</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mrt</th>
            <th>Apr</th>
            <th>Mei</th>
            <th>Totaal</th>
          </tr>
          <tr className="table--grey">
            <th className="hidden">Name</th>
            <th>Totaal</th>
            <td>€{formatPrice(dataAll.january)}</td>
            <td>€{formatPrice(dataAll.february)}</td>
            <td>€{formatPrice(dataAll.march)}</td>
            <td>€{formatPrice(dataAll.april)}</td>
            <td>€{formatPrice(dataAll.may)}</td>
            <td>€{formatPrice(dataAll.total)}</td>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>
    );
  };

  renderTable = invoice => {
    const subtableItems = map(invoice.items, this.renderSubtableItems);

    return [
      <tr className="table--inner--active" key={invoice.id}>
        <th>{invoice.customer}</th>
        <td>€{formatPrice(invoice.totalPeriod)}</td>
        <td>€{formatPrice(invoice.january)}</td>
        <td>€{formatPrice(invoice.february)}</td>
        <td>€{formatPrice(invoice.march)}</td>
        <td>€{formatPrice(invoice.april)}</td>
        <td>€{formatPrice(invoice.may)}</td>
        <td>€{formatPrice(invoice.total)}</td>
      </tr>,
      <tr key={invoice.customerId} className="table--inner">
        <td colSpan="8">
          <Table>
            <tbody>{subtableItems}</tbody>
          </Table>
        </td>
      </tr>
    ];
  };

  renderSubtableItems = invoice => (
    <tr key={invoice.supplierId}>
      <th>{invoice.supplier}</th>
      <td>€{formatPrice(invoice.totalPeriod)}</td>
      <td>€{formatPrice(invoice.january)}</td>
      <td>€{formatPrice(invoice.february)}</td>
      <td>€{formatPrice(invoice.march)}</td>
      <td>€{formatPrice(invoice.april)}</td>
      <td>€{formatPrice(invoice.may)}</td>
      <td>€{formatPrice(invoice.total)}</td>
    </tr>
  );

  render() {
    const title = 'Overview';

    return (
      <div className="Overview">
        <Helmet title={title} />
        <SecondNav />
        <div className="container">
          <div>
            <Row>
              <Col md="6" sm="12">
                <h1 className="h2">
                  {title}
                  <small> (348)</small>
                </h1>
                <p>
                  Totaal bedrag
                  <b> € 124,894</b>
                </p>
              </Col>
              <Col md="6" sm="12">
                <Form>
                  <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                      <option value="" disabled>
                        08/08/2016
                      </option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                      <option value="" disabled>
                        08/08/2016
                      </option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                      <option value="" disabled>
                        Leveranciers
                      </option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                      <option defaultValue="">Afnemers</option>
                    </Input>
                  </FormGroup>
                  <p>Reset filters</p>
                </Form>
              </Col>
            </Row>
          </div>
          {this.invoiceTable()}
          {/* <Pagination aria-label="Page navigation">
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
          </Pagination> */}
        </div>
      </div>
    );
  }
}
