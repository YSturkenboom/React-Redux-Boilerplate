import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';

import Skeleton from '../LoadingSkeleton';

import './styles.scss';

export default class Loader extends PureComponent {
  skeletonContent = () => {
    const { columns, rows } = this.props;
    const rowQuantity = [...Array(rows).keys()];
    const columnQuantity = [...Array(columns).keys()];

    return rowQuantity.map(num => (
      <tr key={`row-${num}`}>
        {columnQuantity.map(i => this.pageSpecific(i))}
      </tr>
    ));
  };

  pageSpecific = i => {
    const { cell, page } = this.props;
    let content;

    if (page === 'invoice' && i === cell) {
      content = (
        <td className="invoice--cell" key={`col-${i}`}>
          <span className="status status--none" />
          <Skeleton />
        </td>
      );
    } else {
      content = (
        <td key={`col-${i}`}>
          <Skeleton />
        </td>
      );
    }

    return content;
  };

  render() {
    const { children } = this.props;

    return (
      <Table className="skeleton-load">
        {children}
        <tbody>{this.skeletonContent()}</tbody>
      </Table>
    );
  }
}
