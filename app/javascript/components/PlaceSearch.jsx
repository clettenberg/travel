import _ from 'lodash';
import React from 'react';

import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

class PlaceSearch extends React.Component {
  componentWillMount() {
    this.setState({
      places: [],
    });

    this.csrfToken = document.getElementsByTagName('meta')['csrf-token'].content;
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

    this.setState({
      places: _.concat(places, this.state.places),
    });
  }

  render() {
    const SearchBox = props => (
      <span>
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
              marginTop: '27px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
            }}
          />
        </StandaloneSearchBox>

        <ol>
          {props.places.map(({place_id, name}, index) =>
            <span key={index}>
              <input type="hidden" name="trip[place_ids][]" value={place_id}></input>
              <p>{name}</p>
            </span>
          )}
        </ol>
      </span>
    );

    return (
      <SearchBox
        onPlacesChanged={this.onPlacesChanged}
        onSearchBoxMounted={(searchBox) => { this.searchBox = searchBox; }}
        places={this.state.places}
        csrfToken={this.csrfToken}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

export default PlaceSearch;
