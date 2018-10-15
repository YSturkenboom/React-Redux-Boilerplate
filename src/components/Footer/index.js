import React, { PureComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';

import './styles.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <div className="container-fluid footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <a
                href="https://storyofams.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Made with <FontAwesomeIcon icon={faHeart} /> by
                <span>
                  Story of <span>AMS</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
