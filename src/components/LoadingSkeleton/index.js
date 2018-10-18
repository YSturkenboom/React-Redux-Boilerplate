import React, { PureComponent } from 'react';

import './styles.scss';

const defaultBaseColor = '#eee';
const defaultHighlightColor = '#f5f5f5';

export default class LoadingSkeleton extends PureComponent {
  static defaultProps = {
    count: 1,
    duration: 1.2,
    width: null,
    wrapper: null,
    color: defaultBaseColor,
    highlightColor: defaultHighlightColor
  };

  render() {
    const { count, width, color, highlightColor, duration } = this.props;
    const elements = [];

    for (let i = 0; i < count; i += 1) {
      const style = {
        animation: `skeleton-animation ${duration}s ease-in-out infinite`,
        backgroundColor: `${color}`,
        backgroundImage: `linear-gradient(
          90deg,
          ${color},
          ${highlightColor},
          ${color}
        )`
      };

      if (width != null) {
        style.width = width;
      }

      elements.push(
        <span key={i} className="skeleton-loader" style={style}>
          &zwnj;
        </span>
      );
    }

    const Wrapper = this.props.wrapper;
    return (
      <span>
        {Wrapper
          ? elements.map((element, i) => (
              <Wrapper key={`wrapper-${String(i)}`}>
                {element}
                &zwnj;
              </Wrapper>
            ))
          : elements}
      </span>
    );
  }
}
