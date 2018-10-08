import React, { PureComponent } from 'react';

import './styles.scss';

class EditableField extends PureComponent {
  render() {
    return (
      <div>
        <input
          value={this.props.title}
          type="text"
          onChange={this.props.editChange}
          onKeyPress={this.props.editPress}
        />
      </div>
    );
  }
}

export default EditableField;
