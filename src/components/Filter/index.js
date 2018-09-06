import React, { PureComponent } from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/pro-regular-svg-icons';
// import { faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';

import { Form, FormGroup, Input } from 'reactstrap';

import './styles.scss';

export default class Filter extends PureComponent {
  render() {
    return (
      <div className="filter">
        <div>
          <h1 className="h2">
            Facturen
            <small> (348)</small>
          </h1>
          <p>
            Totaal bedrag
            <b> € 124,894</b>
          </p>
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
            <Input type="select" name="select" id="exampleSelect">
              <option value="" disabled>
                Leveranciers
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option value="" disabled>
                Afnemers
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option value="" disabled>
                Prijsafspraak
              </option>
              <option>Goedgekeurd</option>
              <option>Afgekeurd</option>
            </Input>
          </FormGroup>
          <p>Reset filters</p>
        </Form>
      </div>
    );
  }
}
