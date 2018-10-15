import React from 'react';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';

// Add 2 decimals to price
const formatNumber = number => {
  if (number == null) {
    return '';
  }

  if (number % 1 !== 0) {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return number.toLocaleString();
};

const CloseToastButton = ({ closeToast }) => (
  <FontAwesomeIcon icon={faTimes} onClick={closeToast} />
);

const toastOptions = {
  position: 'bottom-left',
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  closeButton: <CloseToastButton />
};

const toastAlert = (type, content, options) => {
  toast(content, {
    ...toastOptions,
    ...options,
    className: `toast-${type}`,
    type
  });
};

export { formatNumber, toastAlert };
