import React, { PureComponent } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import './styles.scss';

export default class Filter extends PureComponent {
  render() {
    return (
      <div className="filter">
        <div>
          <h1 className="h2">
            {this.props.title}
            {this.props.removeQuantity ? null : (
              <small> ({this.props.quantity})</small>
            )}
          </h1>
          {this.props.removeText ? null : (
            <p>
              Totaal bedrag
              <b> {this.props.total}</b>
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
          <FormGroup>
            <Input type="select" name="select">
              <option value="" disabled>
                Leveranciers
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Input type="select" name="select">
              <option value="" disabled>
                Afnemers
              </option>
            </Input>
          </FormGroup>
          {this.props.filterAdd === true ? (
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
      </div>
    );
  }
}
