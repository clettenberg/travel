import _ from "lodash"
import React from "react"
import PropTypes from "prop-types"
import PlaceSearchResult from "./PlaceSearchResult"

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
      markers: nextMarkers,
      places: places,
    });
  }

  render () {
    const MapWithSearchBox = withScriptjs(withGoogleMap(props => {
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
            <PlaceSearchResult key={index} address={place.formatted_address} csrfToken={props.csrfToken} placeId={place.place_id}/>
          )}
        </GoogleMap>
      )
    }))

    return (
      <MapWithSearchBox googleMapURL={this.props.googleMapURL}
                        loadingElement={<div style={{ height: `100%` }} />}
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

PlaceSearch.propTypes = {
  googleMapURL: PropTypes.string
};

export default PlaceSearch
