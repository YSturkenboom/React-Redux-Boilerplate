import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';

class EditableField extends PureComponent {
  constructor() {
    super();
    this.state = {
      isEditable: false
    };
  }

  render() {
    return (
      <div>
        <div>
          {this.state.isEditable ? <input type="text" /> : <h2>Replace</h2>}
          <FontAwesomeIcon icon={faPen} />
        </div>
      </div>
    );
  }
}

export default EditableField;
