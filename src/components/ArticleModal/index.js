import React, { PureComponent } from 'react';
import { Modal, ModalBody } from 'reactstrap';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { formatPrice } from '../../utils/formatting';

import './styles.scss';

const DATASET = {
  date: '9/12/2017',
  customer: 'Kilgore Trout',
  invoiceNumber: 272,
  supplier: 'Voskamp',
  name: 'Verbandtrommel 86583 B-384 Houder',
  itemNumber: 86173,
  price: 30.81,
  lowest: 25.12,
  highest: 25.12,
  agreed: 25.12,
  total: 30.81,
  excess: 5.55,
  quantity: 1,
  priceControl: 'Afgekeurd'
};

export default class ArticleModal extends PureComponent {
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    const { modal, activeInvoice } = this.props;

    return (
      <Modal
        isOpen={modal}
        toggle={this.toggleModal}
        activeInvoice={activeInvoice}
        shouldCloseOnOverlayClick
        className="articleModal"
      >
        <ModalBody>
          <h2 className="h3">Artikel</h2>
          <h3 className="h4">{DATASET.name}</h3>
          <table className="table--overview">
            <tbody>
              <tr>
                <th>Factuurnummer</th>
                <th>Datum</th>
                <th>Leverancier</th>
                <th>Afnemer</th>
                <th>Artikel</th>
                <th>Afspraak</th>
                <th>Aantal totaal</th>
              </tr>
              <tr>
                <td>{DATASET.invoiceNumber}</td>
                <td>{DATASET.date}</td>
                <td>{DATASET.supplier}</td>
                <td>{DATASET.customer}</td>
                <td>{DATASET.itemNumber}</td>
                <td>€{formatPrice(DATASET.agreed)}</td>
                <td>{DATASET.quantity}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th>Factuurprijs</th>
                <th>Laagst (deze afnemer)</th>
                <th>Hoogst (deze afnemer)</th>
                <th>Aantal</th>
                <th>Bedrag</th>
              </tr>
              <tr>
                <td>€{formatPrice(DATASET.price)}</td>
                <td>€{formatPrice(DATASET.lowest)}</td>
                <td>€{formatPrice(DATASET.highest)}</td>
                <td>{DATASET.quantity}</td>
                <td>€{formatPrice(DATASET.total)}</td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    );
  }
}
