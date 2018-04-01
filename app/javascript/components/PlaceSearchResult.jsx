import React from 'react';
import PropTypes from 'prop-types';

const PlaceSearchResult = props => (
  <div className="card">
    <div className="card-body d-flex justify-content-between">
      <div id="place">{props.address}</div>
    </div>
  </div>
);

PlaceSearchResult.propTypes = {
  address: PropTypes.string.isRequired,
};

export default PlaceSearchResult;
