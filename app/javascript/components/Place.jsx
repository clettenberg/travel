import React from 'react';
import PropTypes from 'prop-types';

const Place = props => (
  <div className="card">
    <div className="card-body d-flex justify-content-between">
      <div id="name">{props.name}</div>
    </div>
  </div>
);

Place.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Place;
