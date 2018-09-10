import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from 'reactstrap';

import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons';
import { faTrash, faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';

import { formatPrice } from '../../utils/formatting';
import { Filter, PaginationComponent, Tabs } from '../../components';

import './styles.scss';

const DATASET = [
  {
    id: 1,
    date: '9/12/2017',
    customer: 'Kilgore Trout',
    invoiceNumber: 272,
    supplier: 'Voskamp',
    priceControl: 'Afgekeurd',
    quantity: 2,
    price: 492.95,
    total: 492.95,
    excess: 304.55,
    pdf: 'https://translate.google.com/',
    items: [
      {
        name: 'Verbandtrommel 86583 B-384 Houder',
        itemNumber: 86173,
        price: 30.81,
        lowest: 25.12,
        agreed: 25.12,
        total: 30.81,
        excess: 5.55,
        quantity: 1,
        priceControl: 'Afgekeurd'
      },
      {
        name: 'Verbandtrommel 86583 B-384 Houder',
        itemNumber: 86175,
        price: 35.81,
        lowest: 22.12,
        agreed: 22.12,
        total: 35.81,
        quantity: 1,
        priceControl: 'Goedgekeurd'
      }
    ]
  },
  {
    id: 2,
    date: '9/12/2017',
    customer: 'Kilgore Trout',
    invoiceNumber: 273,
    supplier: 'Voskamp',
    priceControl: 'Goedgekeurd',
    quantity: 3,
    price: 292.95,
    total: 292.95,
    excess: 205.55,
    pdf: 'https://translate.google.com/',
    items: [
      {
        name: 'Verbandtrommel 86583 B-384 Houder',
        itemNumber: 86174,
        price: 31.81,
        lowest: 27.12,
        agreed: 27.12,
        total: 31.81,
        quantity: 1,
        priceControl: 'Goedgekeurd'
      },
      {
        name: 'Verbandtrommel 86588 B-384 Houder',
        itemNumber: 86176,
        price: 21.81,
        lowest: 17.12,
        agreed: 17.12,
        total: 21.81,
        quantity: 1,
        priceControl: 'Goedgekeurd'
      },
      {
        name: 'Verbandtrommel 86587 B-384 Houder',
        itemNumber: 86178,
        price: 41.81,
        lowest: 17.12,
        agreed: 27.12,
        total: 41.81,
        quantity: 1,
        priceControl: 'Goedgekeurd'
      }
    ]
  }
];
const INVOICES = {
  quantity: 348,
  total: 124894
};
const TITLES = ['Facturen', 'Wachtlijst'];
const WAITLIST = [
  {
    id: 3,
    date: '9/12/2017',
    invoiceId: 272,
    customer: 'Kilgore Trout',
    topic: 'Mastermate factuur FC-328393293_s82 vviir Plegt-Vos B.V.',
    problem: 'Verkeerd PDF format ',
    attachments: 2,
    items: [
      {
        attachmentId: 115,
        attachmentName: '3279327293_82745.PDF',
        attachmentProblem: 'Verkeerde PDF format, bedrag onderwerp ontbreekt',
        link: 'https://translate.google.com/'
      },
      {
        attachmentId: 113,
        attachmentName: '3279327293_82747.PDF',
        attachmentProblem: 'Verkeerde PDF format, bedrag onderwerp ontbreekt',
        link: 'https://translate.google.com/'
      }
    ]
  },
  {
    id: 4,
    date: '9/12/2017',
    invoiceId: 273,
    customer: 'Kilgore Trout',
    topic: 'Mastermate factuur FC-328393293_s82 vviir Plegt-Vos B.V.',
    problem: 'Verkeerd PDF format ',
    attachments: 2,
    items: [
      {
        attachmentId: 111,
        attachmentName: '3279327293_82742.PDF',
        attachmentProblem: 'Verkeerde PDF format, bedrag onderwerp ontbreekt',
        link: 'https://translate.google.com/'
      },
      {
        attachmentId: 112,
        attachmentName: '3279327293_82741.PDF',
        attachmentProblem: 'Verkeerde PDF format, bedrag onderwerp ontbreekt',
        link: 'https://translate.google.com/'
      }
    ]
  }
];
const WATCHLIST = {
  quantity: 348,
  total: 124894
};

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.pageSize = 20;
    this.pagesCount = Math.ceil(DATASET.length / this.pageSize);

    this.state = {
      activetablerow: '0',
      modal: false,
      activeInvoice: '0'
    };
  }

  invoiceTable = () => {
    const table = map(DATASET, this.renderTable);

    return (
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
        <tbody>{table}</tbody>
      </Table>
    );
  };

  waitlistTable = () => {
    const table = map(WAITLIST, this.renderWaitlistTable);

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Afnemer</th>
            <th>Onderwerp</th>
            <th>Probleem</th>
            <th>Bijlagen</th>
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

  toggleModal = activeInvoiceNumber => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      activeInvoice: activeInvoiceNumber
    }));
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
        <td>{invoice.date}</td>
        <td>{invoice.customer}</td>
        <td>{invoice.invoiceNumber}</td>
        <td>{invoice.supplier}</td>
        <td>
          {invoice.priceControl === 'Afgekeurd' ? (
            <span className="status status--rejected" />
          ) : (
            <span className="status status--accepted" />
          )}
          {invoice.priceControl}
        </td>
        <td>{invoice.quantity}</td>
        <td>
          €{formatPrice(invoice.price)}
          {invoice.priceControl === 'Afgekeurd' ? (
            <span className="status--rejected__quantity">
              (+€
              {formatPrice(invoice.excess)})
            </span>
          ) : null}
        </td>
        <td>
          <FontAwesomeIcon icon={faArrowAltToBottom} />
          <span className="toggle-collapse" />
        </td>
      </tr>,
      <tr
        activetablerow={activetablerow}
        className="table--inner"
        tablerowid={invoice.id}
        key={invoice.invoiceNumber}
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
            <tbody>{subtableItems}</tbody>
          </Table>
        </td>
      </tr>
    ];
  };

  renderSubtableItems = invoice => (
    <tr
      key={invoice.itemNumber}
      onClick={() => {
        this.toggleModal(invoice.itemNumber);
      }}
    >
      <td>{invoice.name}</td>
      <td>{invoice.itemNumber}</td>
      <td>€{formatPrice(invoice.price)}</td>
      <td>€{formatPrice(invoice.lowest)}</td>
      <td>
        {invoice.priceControl === 'Afgekeurd' ? (
          <span className="status status--rejected" />
        ) : (
          <span className="status status--accepted" />
        )}
        €{formatPrice(invoice.agreed)}
      </td>
      <td>{invoice.quantity}</td>
      <td>
        €{invoice.total.toLocaleString()}
        {invoice.priceControl === 'Afgekeurd' ? (
          <span className="status--rejected__quantity">
            (+€
            {formatPrice(invoice.excess)})
          </span>
        ) : null}
      </td>
      <td>
        Details
        <FontAwesomeIcon icon={faAngleRight} />
      </td>
    </tr>
  );

  renderWaitlistTable = invoice => {
    const { activetablerow } = this.state;
    const subtableItems = map(invoice.items, this.renderWaitlistSubtableItems);

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
        <td>{invoice.date}</td>
        <td>{invoice.customer}</td>
        <td>{invoice.topic}</td>
        <td className="text-danger">{invoice.problem}</td>
        <td>{invoice.attachments}</td>
        <td>
          <FontAwesomeIcon icon={faTrash} />
          <span className="toggle-collapse" />
        </td>
      </tr>,
      <tr
        key={invoice.invoiceId}
        activetablerow={activetablerow}
        className="table--inner"
        tablerowid={invoice.id}
      >
        <td colSpan="8">
          <Table>
            <thead>
              <tr>
                <th>Attachments</th>
                <th>Probleem</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>{subtableItems}</tbody>
          </Table>
        </td>
      </tr>
    ];
  };

  renderWaitlistSubtableItems = invoice => (
    <tr key={invoice.attachmentId}>
      <td>{invoice.attachmentName}</td>
      <td className="text-danger">{invoice.attachmentProblem}</td>
      <td>
        <FontAwesomeIcon icon={faArrowAltToBottom} />
      </td>
    </tr>
  );

  render() {
    const { activeInvoice, modal } = this.state;

    return (
      <div className="Home">
        <Helmet title={TITLES[0]} />
        <Tabs
          tabs
          tab1="Verwerkt"
          filter1={
            <Filter
              filterAdd
              title={TITLES[0]}
              quantity={INVOICES.quantity}
              total={formatPrice(INVOICES.total)}
            />
          }
          tableFunction1={this.invoiceTable()}
          pagination1={<PaginationComponent pageCount={this.pagesCount} />}
          tab2="Wachtlijst"
          filter2={
            <Filter
              title={TITLES[1]}
              quantity={WATCHLIST.quantity}
              total={formatPrice(WATCHLIST.total)}
            />
          }
          tableFunction2={this.waitlistTable()}
          pagination2={<PaginationComponent pageCount={this.pagesCount} />}
        />
        <Modal
          isOpen={modal}
          toggle={this.toggleModal}
          activeInvoice={activeInvoice}
        >
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
