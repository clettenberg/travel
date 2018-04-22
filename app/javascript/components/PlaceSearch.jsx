import _ from 'lodash';
import PropTypes from "prop-types"
import React from 'react';

import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

class PlaceSearch extends React.Component {
  componentWillMount() {
    this.setState({
      places: [],
    });
  }

  onKeyPress = (event) => {
    if (event.which == 13) {
      event.preventDefault();
    }
  }

  onPlacesChanged = () => {
    const places = this.searchBox.getPlaces()

    if (_.isEmpty(places)) {
      return;
    }

    this.setState((prevState) => {
      return { places: _.concat(places, prevState.places) }
    });

    if (this.props.handlePlacesChanged) {
      this.props.handlePlacesChanged(this.state.places);
    }
  }

  render() {
    const SearchBox = props => (
      <div style={{paddingBottom: "10px"}}>
        <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.onPlacesChanged}
        >

          <input
            onKeyPress={props.onKeyPress}
            type="text"
            placeholder="Find a Place"
            id="place_search"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
            }}
          />
        </StandaloneSearchBox>
      </div>
    );

    return (
      <SearchBox
        onPlacesChanged={this.onPlacesChanged}
        onSearchBoxMounted={(searchBox) => { this.searchBox = searchBox; }}
        places={this.state.places}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

PlaceSearch.propTypes = {
  handlePlacesChanged: PropTypes.func
}
export default PlaceSearch;
