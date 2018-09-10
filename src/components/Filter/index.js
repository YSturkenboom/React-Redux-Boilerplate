import React, { PureComponent } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';

import './styles.scss';

const DATACUSTOMERS = [
  {
    supplierID: 1,
    parent: 'Customer',
    items: ['Customer', 'Customer', 'Customer']
  },
  {
    supplierID: 2,
    parent: 'Customer',
    items: ['Customer', 'Customer', 'Customer']
  },
  {
    supplierID: 3,
    parent: 'Customer',
    items: ['Customer', 'Customer', 'Customer']
  },
  {
    supplierID: 4,
    parent: 'Customer',
    items: ['Customer', 'Customer', 'Customer']
  },
  {
    supplierID: 5,
    parent: 'Customer',
    items: ['Customer', 'Customer', 'Customer']
  }
];
const DATASUPPLIERS = [
  {
    supplierID: 1,
    parent: 'Supplier Parent',
    items: ['Supplier', 'Supplier', 'Supplier']
  },
  {
    supplierID: 2,
    parent: 'Supplier Parent',
    items: ['Supplier', 'Supplier', 'Supplier']
  },
  {
    supplierID: 3,
    parent: 'Supplier Parent',
    items: [
      'Supplier',
      'Supplier',
      'Supplier',
      'Supplier',
      'Supplier',
      'Supplier',
      'Supplier',
      'Supplier',
      'Supplier'
    ]
  },
  {
    supplierID: 4,
    parent: 'Supplier Parent',
    items: ['Supplier', 'Supplier', 'Supplier']
  },
  {
    supplierID: 5,
    parent: 'Supplier Parent',
    items: ['Supplier', 'Supplier', 'Supplier']
  }
];

export default class Filter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      customer: false,
      supplier: false
    };

    this.toggle = this.toggle.bind(this);
  }

  checkChildren = e => {
    const clickedValue = e.target.value;

    console.log(clickedValue);
  };

  modalItems = which => {
    const table = map(which, this.renderModalItems);

    return <form>{table}</form>;
  };

  toggle = which => {
    this.setState(prevState => ({
      [which]: !prevState[which]
    }));

    if (this.state[which]) {
      document.body.classList.remove(which);
    } else {
      document.body.classList.add(which);
    }
  };

  renderModalItems = item => {
    const children = map(item.items, this.renderModalItemsChildren);

    return [
      <div key={item.supplierID}>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              value={item.supplierID}
              onClick={e => {
                this.checkChildren(e);
              }}
            />
            {item.parent}
          </Label>
        </FormGroup>
        <div className="checkbox__container--subgroup">{children}</div>
      </div>
    ];
  };

  renderModalItemsChildren = (item, i) => (
    <FormGroup key={i} check>
      <Label check>
        <Input type="checkbox" />
        {item}
      </Label>
    </FormGroup>
  );

  render() {
    const { supplier, customer } = this.state;
    const {
      title,
      removeQuantity,
      quantity,
      removeText,
      total,
      filterAdd
    } = this.props;

    return (
      <div className="filter">
        <div>
          <h1 className="h2">
            {title}
            {removeQuantity ? null : <small> ({quantity})</small>}
          </h1>
          {removeText ? null : (
            <p>
              Totaal bedrag
              <b> {total}</b>
            </p>
          )}
        </div>
        <Form>
          <FormGroup>
            <Input type="select" name="select">
              <option value="" disabled>
                08/08/2016
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Input type="select" name="select">
              <option value="" disabled>
                08/08/2016
              </option>
            </Input>
          </FormGroup>
          <FormGroup className="btn-supplier">
            <Button
              onClick={() => {
                this.toggle('supplier');
              }}
              color="link"
            >
              Leveranciers
            </Button>
          </FormGroup>
          <FormGroup className="btn-customer">
            <Button
              onClick={() => {
                this.toggle('customer');
              }}
              color="link"
            >
              Afnemers
            </Button>
          </FormGroup>
          {filterAdd === true ? (
            <FormGroup>
              <Input type="select" name="select">
                <option value="" disabled>
                  Prijsafspraak
                </option>
                <option>Goedgekeurd</option>
                <option>Afgekeurd</option>
              </Input>
            </FormGroup>
          ) : null}
          <Button color="link">Reset filters</Button>
        </Form>
        <Modal
          isOpen={supplier}
          toggle={() => {
            this.toggle('supplier');
          }}
          className="filter-modal"
        >
          <div>
            <ModalHeader>
              <div className="search">
                <Input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search"
                />
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </ModalHeader>
            <ModalBody>{this.modalItems(DATASUPPLIERS)}</ModalBody>
          </div>
          <ModalFooter>
            <Button color="link">Alles selecteren</Button>
            <Button color="link">Alles deselecteren</Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={customer}
          toggle={() => {
            this.toggle('customer');
          }}
          className="filter-modal"
        >
          <div>
            <ModalHeader>
              <div className="search">
                <Input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search"
                />
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </ModalHeader>
            <ModalBody>{this.modalItems(DATACUSTOMERS)}</ModalBody>
          </div>
          <ModalFooter>
            <Button color="link">Alles selecteren</Button>
            <Button color="link">Alles deselecteren</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
