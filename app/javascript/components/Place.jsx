import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import PlaceCard from './PlaceCard'

class Place extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isGooglePlaceId: !_.isEmpty(props.placeId)
    }
  }

  componentDidMount() {
    let placeDetailsUrl = "";
    if (this.state.isGooglePlaceId) {
      placeDetailsUrl = `/google-places/${this.props.placeId}.json`;
    } else {
      placeDetailsUrl = `/places/${this.props.id}.json`;
    }

    axios.get(placeDetailsUrl)
      .then(res => {
        const name = res.data.result.name
        this.setState({name: name});
      });
  }

  render() {
    if (this.state.isGooglePlaceId) {
      return(
        <PlaceCard>
          {this.state.name}
        </PlaceCard>
      );
    }

    return (
      <PlaceCard>
        <a href={`/places/${this.props.id}`} id="name">{this.state.name}</a>
      </PlaceCard>
    );
  }
}

Place.propTypes = {
  id: PropTypes.number,
  googlePlaceId: PropTypes.string
};

export default Place;
