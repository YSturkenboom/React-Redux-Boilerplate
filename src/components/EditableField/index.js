import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';

class EditableField extends PureComponent {
  constructor() {
    super();
    this.state = {
      isEditable: false,
      title: 'List One'
    };
    this.buttonSwitch = this.buttonSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  buttonSwitch() {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="editableField">
          {this.state.isEditable ? (
            <input
              value={this.state.title}
              type="text"
              onChange={this.handleChange}
            />
          ) : (
            <h2>{this.state.title}</h2>
          )}
          <FontAwesomeIcon icon={faPen} onClick={this.buttonSwitch} />
        </div>
      </div>
    );
  }
}

export default EditableField;
