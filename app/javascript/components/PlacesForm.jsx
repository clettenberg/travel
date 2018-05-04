import _ from 'lodash';
import React from "react"
import axios from 'axios';
import PropTypes from "prop-types"
import PlaceSearch from "./PlaceSearch"
import Place from './Place'

class PlacesForm extends React.Component {
  componentWillMount() {
    this.setState({
      places: this.props.places.data,
    });
  }

  savePlace(placeId) {
    axios.post(`/trips/${this.props.tripId}/places`, {
      place_id: placeId
    }, {
      headers: { "X-CSRF-Token": this.props.csrfToken }
    }).then(res => {
      this.setState({
        places: _.concat(this.state.places, res.data.data)
      })
    });
  }

  handlePlacesChanged = (e) => {
    const placeIds = _.map(e, 'place_id');

    this.savePlace(placeIds[0])
  }

  render () {
    return (
      <div className="form-group">
        <PlaceSearch handlePlacesChanged={this.handlePlacesChanged}/>
        {this.state.places.map((place, index) =>
          <div key={place.id + '-' + place.attributes.placeId}>
            <Place placeId={place.attributes.placeId} />
          </div>
        )}
      </div>
    );
  }
}

PlacesForm.propTypes = {
  places: PropTypes.object,
  tripId: PropTypes.number,
  csrfToken: PropTypes.string
};
export default PlacesForm
