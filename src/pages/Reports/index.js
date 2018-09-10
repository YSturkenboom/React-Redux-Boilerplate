import React, { PureComponent } from 'react';

import { map } from 'lodash';
import Helmet from 'react-helmet';
import { Table } from 'reactstrap';

import { formatPrice } from '../../utils/formatting';
import { Filter, PaginationComponent, Tabs } from '../../components';

import './styles.scss';

const DATA_CUSTOMERS = [
  {
    id: 1,
    discription: 'SPLIT PULSA800 NAGEL XH+GAS',
    supplier: 'Mastermate',
    afspraal: 18613,
    laag: 18613,
    hoog: 18613,
    aantal: 18613,
    totaal: 4984
  },
  {
    id: 2,
    discription: 'SPLIT PULSA800 NAGEL XH+GAS',
    supplier: 'Mastermate',
    afspraal: 18613,
    laag: 18613,
    hoog: 18613,
    aantal: 18613,
    totaal: 4984
  },
  {
    id: 3,
    discription: 'SPLIT PULSA800 NAGEL XH+GAS',
    supplier: 'Mastermate',
    afspraal: 18613,
    laag: 18613,
    hoog: 18613,
    aantal: 18613,
    totaal: 4984
  }
];
const DATA_SUPPLIERS = [
  {
    id: 1,
    discription: 'SPLIT PULSA800 NAGEL XH+GAS',
    supplier: 'Mastermate',
    afspraal: 18613,
    laag: 18613,
    hoog: 18613,
    aantal: 18613,
    totaal: 4984
  },
  {
    id: 2,
    discription: 'SPLIT PULSA800 NAGEL XH+GAS',
    supplier: 'Mastermate',
    afspraal: 18613,
    laag: 18613,
    hoog: 18613,
    aantal: 18613,
    totaal: 4984
  },
  {
    id: 3,
    discription: 'SPLIT PULSA800 NAGEL XH+GAS',
    supplier: 'Mastermate',
    afspraal: 18613,
    laag: 18613,
    hoog: 18613,
    aantal: 18613,
    totaal: 4984
  }
];
const REPORT_CUSTOMERS = { total: 319 };
const REPORT_SUPPLIERS = { total: 319 };
const TITLE = 'Reports';

export default class Reports extends PureComponent {
  invoiceTable = data => {
    const table = map(data, this.renderTable);

    return (
      <Table responsive className="table--main">
        <thead>
          <tr>
            <th>Omschrijving</th>
            <th>Leverancier</th>
            <th>Afspraal</th>
            <th>Laag</th>
            <th>Hoog</th>
            <th>Aantal</th>
            <th>Totaal</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>
    );
  };

  renderTable = invoice => [
    <tr key={invoice.id}>
      <td>{invoice.discription}</td>
      <td>{invoice.supplier}</td>
      <td>€{formatPrice(invoice.afspraal)}</td>
      <td>€{formatPrice(invoice.laag)}</td>
      <td>€{formatPrice(invoice.hoog)}</td>
      <td>€{formatPrice(invoice.aantal)}</td>
      <td>€{formatPrice(invoice.totaal)}</td>
    </tr>
  ];

  render() {
    return (
      <div className="Reports">
        <Helmet title={TITLE} />
        <Tabs
          tabs
          tab1="Afnemers"
          filter1={
            <Filter
              removeText
              title={TITLE}
              quantity={formatPrice(REPORT_CUSTOMERS.total)}
            />
          }
          tableFunction1={this.invoiceTable(DATA_CUSTOMERS)}
          pagination1={<PaginationComponent pageCount={this.pagesCount} />}
          tab2="Leveranciers"
          filter2={
            <Filter
              removeText
              title={TITLE}
              quantity={formatPrice(REPORT_SUPPLIERS.total)}
            />
          }
          tableFunction2={this.invoiceTable(DATA_SUPPLIERS)}
          pagination2={<PaginationComponent pageCount={this.pagesCount} />}
        />
      </div>
    );
  }
}
