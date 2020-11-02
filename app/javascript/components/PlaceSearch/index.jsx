import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Card, CardContent } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import MapquestSearchClient from '../../api/MapquestSearchClient'
import PlaceSearchResults from '../PlaceSearchResults'
import Spinner from '../Spinner'

const propTypes = {
  handlePlaceSelection: PropTypes.func.isRequired
}

class PlaceSearch extends React.Component {
  constructor (props) {
    super(props)

    this.handleNameSearchFormSubmit = this.handleNameSearchFormSubmit.bind(this)
    this.handleLatLonSearchFormSubmit = this.handleLatLonSearchFormSubmit.bind(this)
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this)
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this)

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

  handleSearchTypeChange (event, newSearchType) {
    this.setState({ searchType: newSearchType })
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
    this.props.handlePlaceSelection(selectedPlace)
  }

  render () {
    let placeSearchInput

    const {
      searchType,
      errors,
      lat,
      lon,
      name,
      isSearching,
      placeSearchResults,
      selectedPlaceId
    } = this.state

    const errorComponents = errors.map(err => <p key={err.message}>{err.message}</p>)

    if (searchType === 'name') {
      placeSearchInput = (
        <TextField
          placeholder='Place Name'
          type='text'
          name='name'
          fullWidth
          value={name}
          onChange={this.handleSearchValueChange}
        />
      )
    } else {
      placeSearchInput = (
        <>
          <TextField
            placeholder='Latitude'
            type='text'
            name='lat'
            value={lat}
            onChange={this.handleSearchValueChange}
            style={{ marginRight: '5px' }}
          />
          <TextField
            placeholder='Longitude'
            type='text'
            name='lon'
            value={lon}
            onChange={this.handleSearchValueChange}
          />
          <input
            type='submit'
            style={{ display: 'none' }}
          />
        </>
      )
    }

    return (
      <Card>
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <div>
              <ToggleButtonGroup
                value={searchType}
                exclusive
                onChange={this.handleSearchTypeChange}
                aria-label='search type'
              >
                <ToggleButton
                  value='name'
                >
                  Name
                </ToggleButton>
                <ToggleButton
                  value='latlon'
                >
                  LatLon
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            {placeSearchInput}
          </form>

          {isSearching && <Spinner />}

          {placeSearchResults &&
            <div>
              <ul>
                {
                  placeSearchResults.length > 0
                    ? <PlaceSearchResults results={placeSearchResults} selectedId={selectedPlaceId} onPlaceSelection={this.handlePlaceSelection} />
                    : <h1>No results!</h1>
                }
              </ul>
              {errorComponents}
            </div>}
        </CardContent>
      </Card>
    )
  }
}

PlaceSearch.propTypes = propTypes
export default PlaceSearch
