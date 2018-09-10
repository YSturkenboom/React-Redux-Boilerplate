import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Table } from 'reactstrap';

import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';

import { formatPrice } from '../../utils/formatting';
import { Filter, PaginationComponent, Tabs } from '../../components';

import './styles.scss';

const ARTICLES = {
  quantity: 348
};
const DATA = [
  {
    id: 1,
    description: 'LOODVERVANGER UBIXFLEX ZWART 30 CM 12',
    articleNumber: 467372,
    supplier: 'Voskamp',
    agreed: 3321.5,
    lowest: 3321,
    highest: 3321,
    quantity: 20,
    total: 66420,
    pdf: 'https://translate.google.com/',
    items: [
      {
        itemNumber: 1,
        name: 'FC-VBT-0436400',
        customer: 'Kilgore Trout',
        date: '9/12/2017',
        quantity: 10,
        price: 71.5
      },
      {
        itemNumber: 2,
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
        itemNumber: 3,
        name: 'FC-VBT-0436400',
        customer: 'Kilgore Trout',
        date: '9/12/2017',
        quantity: 5,
        price: 71.5
      },
      {
        itemNumber: 4,
        name: 'FC-VBT-0436400',
        customer: 'Kilgore Trout',
        date: '9/12/2017',
        quantity: 5,
        price: 71.5
      }
    ]
  }
];
const TITLE = 'Articles';

export default class Articles extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activetablerow: '0'
    };
  }

  invoiceTable = () => {
    const table = map(DATA, this.renderTable);

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
        <td className="text-success">€{formatPrice(invoice.agreed)}</td>
        <td>€{formatPrice(invoice.lowest)}</td>
        <td>€{formatPrice(invoice.highest)}</td>
        <td>{invoice.quantity}</td>
        <td>€{formatPrice(invoice.total)}</td>
        <td>
          <FontAwesomeIcon icon={faArrowAltToBottom} />
          <span className="toggle-collapse" />
        </td>
      </tr>,
      <tr
        key={invoice.articleNumber}
        activetablerow={activetablerow}
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
      <td>€{formatPrice(invoice.price)}</td>
    </tr>
  );

  render() {
    return (
      <div className="Articles">
        <Helmet title={TITLE} />
        <Tabs
          tabs={false}
          filter1={
            <Filter removeText title={TITLE} quantity={ARTICLES.quantity} />
          }
          tableFunction1={this.invoiceTable()}
          pagination1={<PaginationComponent pageCount={this.pagesCount} />}
        />
      </div>
    );
  }
}
