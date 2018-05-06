import _ from 'lodash';
import React from "react"
import axios from 'axios';
import PropTypes from "prop-types"
import PlaceSearch from "./PlaceSearch"
import Place from './Place'

class PlacesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: this.props.places.data,
    };

    this.deletePlace = this.deletePlace.bind(this);
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

  deletePlace(id) {
    axios.delete(`/trips/${this.props.tripId}/places/${id}`, {
      headers: { "X-CSRF-Token": this.props.csrfToken }
    }).then( res => {
      let placesMinusDeletedPlace = _.filter(this.state.places, (place) => {
        return parseInt(place.id, 10) !== id
      });
      this.setState({
        places: placesMinusDeletedPlace
      })
    })
  }

  handlePlacesChanged = (e) => {
    const placeId = _.result(_.head(e), 'place_id');

    this.savePlace(placeId);
  }

  render () {
    return (
      <div className="form-group">
        <PlaceSearch handlePlacesChanged={this.handlePlacesChanged}/>
        {this.state.places.map((place, index) =>
          <div key={place.id + '-' + place.attributes.placeId}>
            <Place id={parseInt(place.id, 10)} onDelete={this.deletePlace} />
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
