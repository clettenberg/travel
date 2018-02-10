import React from 'react';
import PropTypes from 'prop-types';

const PlaceSearchResult = props => (
  <div className="card">
    <div className="card-body d-flex justify-content-between">
      <div id="place">{props.address}</div>
      <form acceptCharset="UTF-8" action="/places" className="new_place" id="new_place" method="post">
        <input readOnly id="place_id" value={props.placeId} name="poi[place_id]" type="text" />
        <input type="hidden" name="authenticity_token" value={props.csrfToken} />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
);

PlaceSearchResult.propTypes = {
  address: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  csrfToken: PropTypes.string.isRequired,
};

export default PlaceSearchResult;
