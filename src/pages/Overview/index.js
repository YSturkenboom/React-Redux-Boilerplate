import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Table } from 'reactstrap';

import { map } from 'lodash';
import { formatPrice } from '../../utils/formatting';
import { Filter, PaginationComponent, Tabs } from '../../components';

import './styles.scss';

const DATA_CUSTOMERS = [
  {
    id: 1,
    customerId: 1,
    customer: 'Customer 1',
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
        supplier: 'Supplier 1',
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
        supplier: 'Supplier 2',
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
    customer: 'Customer 2',
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
        supplier: 'Supplier 1',
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
        supplier: 'Supplier 2',
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
        supplier: 'Supplier 3',
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
    customer: 'Customer 3',
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
        supplier: 'Supplier 1',
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
        supplier: 'Supplier 2',
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
        supplier: 'Supplier 3',
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
];
const DATA_SUPPLIERS = [
  {
    id: 1,
    customerId: 1,
    customer: 'Supplier 1',
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
        supplier: 'Customer 1',
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
        supplier: 'Customer 2',
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
    customer: 'Supplier 2',
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
        supplier: 'Customer 1',
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
        supplier: 'Customer 2',
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
        supplier: 'Customer 3',
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
    customer: 'Supplier 3',
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
        supplier: 'Customer 1',
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
        supplier: 'Customer 2',
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
        supplier: 'Customer 3',
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
];
const OVERVIEW_CUSTOMER = {
  total: 124894
};
const OVERVIEW_SUPPLIERS = {
  total: 124894
};
const TITLE = 'Overview';

export default class Overview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activetablerow: '0'
    };
  }

  invoiceTable = item => {
    const table = map(item, this.renderTable);
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

  toggleCollapse = tableRow => {
    const { activetablerow } = this.state;

    if (activetablerow !== tableRow) {
      this.setState({
        activetablerow: tableRow
      });
    } else if (activetablerow === tableRow) {
      this.setState({
        activetablerow: '0'
      });
    }
  };

  renderTable = invoice => {
    const { activetablerow } = this.state;
    const subtableItems = map(invoice.items, this.renderSubtableItems);

    return [
      <tr
        key={invoice.id}
        className={
          activetablerow === invoice.id ? 'table--inner--active' : null
        }
        onClick={() => {
          this.toggleCollapse(invoice.id);
        }}
      >
        <th>{invoice.customer}</th>
        <td>€{formatPrice(invoice.totalPeriod)}</td>
        <td>€{formatPrice(invoice.january)}</td>
        <td>€{formatPrice(invoice.february)}</td>
        <td>€{formatPrice(invoice.march)}</td>
        <td>€{formatPrice(invoice.april)}</td>
        <td>€{formatPrice(invoice.may)}</td>
        <td>€{formatPrice(invoice.total)}</td>
      </tr>,
      <tr
        key={invoice.customerId}
        activetablerow={activetablerow}
        className="table--inner"
        tablerowid={invoice.id}
      >
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
    return (
      <div className="Overview">
        <Helmet title={TITLE} />
        <Tabs
          tabs
          tab1="Afnemers"
          filter1={
            <Filter
              removeQuantity
              title={TITLE}
              total={formatPrice(OVERVIEW_CUSTOMER.total)}
            />
          }
          tableFunction1={this.invoiceTable(DATA_CUSTOMERS)}
          pagination1={<PaginationComponent pageCount={this.pagesCount} />}
          tab2="Leveranciers"
          filter2={
            <Filter
              removeQuantity
              title={TITLE}
              total={formatPrice(OVERVIEW_SUPPLIERS.total)}
            />
          }
          tableFunction2={this.invoiceTable(DATA_SUPPLIERS)}
          pagination2={<PaginationComponent pageCount={this.pagesCount} />}
        />
      </div>
    );
  }
}
