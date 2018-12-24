import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  active: false,
};

const PlaceSearchButton = ({ text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`btn btn-outline-secondary ${active ? 'active' : ''}`}
    type="button"
  >
    {text}
  </button>
);

PlaceSearchButton.propTypes = propTypes;
PlaceSearchButton.defaultProps = defaultProps;
export default PlaceSearchButton;
