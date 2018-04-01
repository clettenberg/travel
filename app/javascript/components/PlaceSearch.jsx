import _ from "lodash"
import React from "react"
import PropTypes from "prop-types"

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox"

class PlaceSearch extends React.Component {
  componentWillMount() {
    this.setState({
      places: [],
      markers: [],
      center: {
        lat: 41.9, lng: -87.624
      },
    })

    this.csrfToken = document.getElementsByTagName('meta')['csrf-token'].content;
  };

  onPlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    if (_.isEmpty(places)) {
      return;
    }

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });

    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));
    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

    this.setState({
      center: nextCenter,
      markers: _.concat(nextMarkers, this.state.markers),
        places: _.concat(this.searchBox.getPlaces(), this.state.places),
    });
  }

  render () {
    const MapWithSearchBox = withGoogleMap(props => {
      return (
        <GoogleMap ref={props.onMapMounted}
                   defaultZoom={10}
                   center={props.center}>

          <SearchBox ref={props.onSearchBoxMounted}
                     bounds={props.bounds}
                     controlPosition={google.maps.ControlPosition.TOP_LEFT}
                     onPlacesChanged={props.onPlacesChanged}>

            <input type="text"
                   placeholder="Find a Place"
                   style={{
                     boxSizing: `border-box`,
                     border: `1px solid transparent`,
                     width: `240px`,
                     height: `32px`,
                     marginTop: `27px`,
                     padding: `0 12px`,
                     borderRadius: `3px`,
                     boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                     fontSize: `14px`,
                     outline: `none`,
                     textOverflow: `ellipses`,
                   }}/>

          </SearchBox>

          {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position} />
          )}
          {props.places.map((place, index) =>
            <span>
              <input type="hidden" key={index} name="trip[place_ids][]" value={place.id}></input>
              <p key={index}>{place.name}</p>
            </span>
          )}
        </GoogleMap>
      )
    })

    return (
      <MapWithSearchBox loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onPlacesChanged={this.onPlacesChanged}
                        onSearchBoxMounted={(searchBox) => { this.searchBox = searchBox; }}
                        onMapMounted={(map) => { this.map = map; }}
                        markers={this.state.markers}
                        places={this.state.places}
                        center={this.state.center}
                        csrfToken={this.csrfToken} />
    )
  }
}

export default PlaceSearch
