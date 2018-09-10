import React, { PureComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/pro-solid-svg-icons';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './styles.scss';

export default class PaginationComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }

  paginationClick = (e, index) => {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  };

  paginationItems = () => {
    const { pageCount } = this.props;
    const { currentPage } = this.state;

    const dataSet = [...Array(pageCount)].map((a, i) => (
      <PaginationItem active={i === currentPage} key={String(i)}>
        <PaginationLink onClick={e => this.paginationClick(e, i)} href="#">
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ));

    return dataSet;
  };

  render() {
    const { pageCount } = this.props;
    const { currentPage } = this.state;

    return (
      <Pagination aria-label="Page navigation">
        <p>
          Bekijk
          <b> 1-20 </b>
          van
          <b> 348 </b>
        </p>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            previous
            onClick={e => this.paginationClick(e, currentPage - 1)}
            href="#"
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </PaginationLink>
        </PaginationItem>
        {this.paginationItems()}
        <PaginationItem disabled={currentPage >= pageCount - 1}>
          <PaginationLink
            next
            onClick={e => this.paginationClick(e, currentPage + 1)}
            href="#"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}
