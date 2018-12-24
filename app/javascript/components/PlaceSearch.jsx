import React from 'react';
import PropTypes from 'prop-types';
import MapquestSearchClient from '../api/MapquestSearchClient';
import PlaceSearchResults from './PlaceSearchResults';

const propTypes = {
  onPlaceSelection: PropTypes.func.isRequired,
};

class PlaceSearch extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    this.handleNameSearchFormSubmit = this.handleNameSearchFormSubmit.bind(this);
    this.handleLatLonSearchFormSubmit = this.handleLatLonSearchFormSubmit.bind(this);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this);

    this.state = {
      searchType: 'name',
      name: '',
      lat: '',
      lon: '',
      selectedPlaceId: null,
      errors: [],
      placeSearchResults: [],
    };
  }

  handleSearchTypeChange(changeEvent) {
    this.setState({ searchType: changeEvent.target.value });
  }

  handleSearchValueChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  handleNameSearchFormSubmit(event) {
    event.preventDefault();

    MapquestSearchClient
      .findPlacesByName(this.state.name)
      .then((placeSearchResults) => {
        this.setState({ placeSearchResults, errors: [] });
      });
  }

  handleLatLonSearchFormSubmit(event) {
    event.preventDefault();

    MapquestSearchClient
      .findPlaceByLatLon({ lat: this.state.lat, lon: this.state.lon })
      .then((placeSearchResults) => {
        this.setState({ placeSearchResults: [placeSearchResults], errors: [] });
      })
      .catch((error) => {
        this.setState({ placeSearchResults: [], errors: [error] });
      });
  }

  handlePlaceSelection(changeEvent) {
    const selectedPlaceId = changeEvent.target.value;
    this.setState({ selectedPlaceId });
    const selectedPlace = this.state.placeSearchResults.find(result => (
      result.place_id === selectedPlaceId
    ));
    this.props.onPlaceSelection(selectedPlace);
  }

  render() {
    let placeSearchForm;

    const errors = this.state.errors.map(err => (
      <p key={err.message}>{err.message}</p>
    ));

    if (this.state.searchType === 'name') {
      placeSearchForm = (
        <form onSubmit={this.handleNameSearchFormSubmit}>
          <input
            placeholder="Place Name"
            type="text"
            className="form-control"
            name="name"
            value={this.state.name}
            onChange={this.handleSearchValueChange}
          />
        </form>
      );
    } else {
      placeSearchForm = (
        <form onSubmit={this.handleLatLonSearchFormSubmit}>
          <input
            placeholder="Latitude"
            type="text"
            className="form-control"
            name="lat"
            value={this.state.lat}
            onChange={this.handleSearchValueChange}
          />
          <input
            placeholder="Longitude"
            type="text"
            className="form-control"
            name="lon"
            value={this.state.lon}
            onChange={this.handleSearchValueChange}
          />
          <input
            type="submit"
            style={{ display: 'none' }}
          />
        </form>
      );
    }

    const searchByName = this.state.searchType === 'name';
    const searchByLatLon = this.state.searchType === 'latlon';

    return (
      <div>
        <div className="row">
          <div className="col btn-group btn-group-toggle">
            <label
              className={`btn btn-secondary ${searchByName ? 'active' : ''}`}
              htmlFor="name"
            >
              <input
                type="radio"
                name="options"
                id="name"
                autoComplete="off"
                onChange={this.handleSearchTypeChange}
                value="name"
                checked={searchByName}
              />
              Place Name
            </label>
            <label
              className={`btn btn-secondary ${searchByLatLon ? 'active' : ''}`}
              htmlFor="latlon"
            >
              <input
                type="radio"
                name="options"
                id="latlon"
                autoComplete="off"
                onChange={this.handleSearchTypeChange}
                value="latlon"
                checked={searchByLatLon}
              />
              Lat/Lon
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {placeSearchForm}
          </div>
        </div>
        <div className="row">
          <ul className="col">
            <PlaceSearchResults
              results={this.state.placeSearchResults}
              selectedId={this.state.selectedPlaceId}
              onPlaceSelection={this.handlePlaceSelection}
            />
          </ul>
          {errors}

        </div>
      </div>
    );
  }
}

PlaceSearch.propTypes = propTypes;
export default PlaceSearch;
