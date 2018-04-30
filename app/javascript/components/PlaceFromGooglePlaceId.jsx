import React from "react"
import PropTypes from "prop-types"
class PlaceFromGooglePlaceId extends React.Component {
  render () {
    return (
      <React.Fragment>
        Place: {this.props.placeId}
      </React.Fragment>
    );
  }
}

PlaceFromGooglePlaceId.propTypes = {
  placeId: PropTypes.string
};
export default PlaceFromGooglePlaceId
