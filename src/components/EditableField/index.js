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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  buttonSwitch() {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState({ title: event.target.value, isEditable: false });
    }
  }

  render() {
    const { title } = this.state;
    const Title = () => (
      <div>{title === '' ? <h2>Empty String</h2> : <h2>{title}</h2>}</div>
    );

    return (
      <div>
        <div className="editableField">
          {this.state.isEditable ? (
            <input
              value={this.state.title}
              type="text"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
          ) : (
            <Title />
          )}
          <FontAwesomeIcon icon={faPen} onClick={this.buttonSwitch} />
        </div>
      </div>
    );
  }
}

export default EditableField;
