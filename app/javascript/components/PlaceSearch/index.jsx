import React from 'react'
import PropTypes from 'prop-types'
import MapquestSearchClient from '../../api/MapquestSearchClient'
import PlaceSearchResults from '../PlaceSearchResults'
import Spinner from '../Spinner'

const propTypes = {
  onPlaceSelection: PropTypes.func.isRequired
}

class PlaceSearch extends React.Component {
  constructor (props) {
    super(props)

    this.handleNameSearchFormSubmit = this.handleNameSearchFormSubmit.bind(this)
    this.handleLatLonSearchFormSubmit = this.handleLatLonSearchFormSubmit.bind(this)
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this)
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      searchType: 'name',
      name: '',
      lat: '',
      lon: '',
      selectedPlaceId: null,
      errors: [],
      placeSearchResults: null,
      isSearching: false
    }
  }

  handleSearchTypeChange (searchType) {
    this.setState({ searchType })
  }

  handleSearchValueChange (event) {
    const { name } = event.target
    this.setState({ [name]: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()

    if (this.state.searchType === 'name') {
      this.handleNameSearchFormSubmit()
    } else {
      this.handleLatLonSearchFormSubmit()
    }
  }

  handleNameSearchFormSubmit () {
    this.setState({ isSearching: true, placeSearchResults: null })

    MapquestSearchClient
      .findPlacesByName(this.state.name)
      .then((placeSearchResults) => {
        this.setState({ placeSearchResults, errors: [], isSearching: false })
      })
      .catch((error) => {
        this.setState({ placeSearchResults: [], errors: [error], isSearching: false })
      })
  }

  handleLatLonSearchFormSubmit () {
    this.setState({ isSearching: true, placeSearchResults: null })

    MapquestSearchClient
      .findPlaceByLatLon({ lat: this.state.lat, lon: this.state.lon })
      .then((placeSearchResults) => {
        this.setState({ placeSearchResults: [placeSearchResults], errors: [] })
      })
      .catch((error) => {
        this.setState({ placeSearchResults: [], errors: [error] })
      })
  }

  handlePlaceSelection (changeEvent) {
    const selectedPlaceId = changeEvent.target.value
    this.setState({ selectedPlaceId })
    const selectedPlace = this.state.placeSearchResults.find(result => (
      result.place_id === selectedPlaceId
    ))
    this.props.onPlaceSelection(selectedPlace)
  }

  render () {
    let placeSearchInput

    const errors = this.state.errors.map(err => (
      <p key={err.message}>{err.message}</p>
    ))

    if (this.state.searchType === 'name') {
      placeSearchInput = (
        <input
          placeholder='Place Name'
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleSearchValueChange}
        />
      )
    } else {
      placeSearchInput = (
        <React.Fragment>
          <input
            placeholder='Latitude'
            type='text'
            name='lat'
            value={this.state.lat}
            onChange={this.handleSearchValueChange}
          />
          <input
            placeholder='Longitude'
            type='text'
            name='lon'
            value={this.state.lon}
            onChange={this.handleSearchValueChange}
          />
          <input
            type='submit'
            style={{ display: 'none' }}
          />
        </React.Fragment>
      )
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <button
                onClick={() => this.handleSearchTypeChange('name')}
                className={`${this.state.searchType === 'name' ? 'active' : ''}`}
                id='name'
                type='button'
              >
                Place Name
              </button>
              <button
                onClick={() => this.handleSearchTypeChange('latlon')}
                className={`${this.state.searchType === 'latlon' ? 'active' : ''}`}
                id='latlon'
                type='button'
              >
                Lat/Lon
              </button>
            </div>
            {placeSearchInput}
          </div>
        </form>
        {this.state.isSearching &&
          <Spinner />
        }

        {this.state.placeSearchResults &&
          <div>
            <ul>
              {this.state.placeSearchResults.length > 0
                ? <PlaceSearchResults
                  results={this.state.placeSearchResults}
                  selectedId={this.state.selectedPlaceId}
                  onPlaceSelection={this.handlePlaceSelection}
                />
                : <h1>No results!</h1>
              }
            </ul>
            {errors}
          </div>
        }
      </div>
    )
  }
}

PlaceSearch.propTypes = propTypes
export default PlaceSearch
