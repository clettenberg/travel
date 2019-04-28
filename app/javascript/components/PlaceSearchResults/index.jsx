import React from 'react'
import PropTypes from 'prop-types'

const props = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.string,
  onPlaceSelection: PropTypes.func.isRequired
}

const defaultProps = {
  selectedId: null
}

const PlaceSearchResults = ({ results, selectedId, onPlaceSelection }) => (
  results.map((result) => {
    const inputId = `placeSearchResult-${result.place_id}`

    return (
      <div key={result.place_id} className='form-check'>
        <label className='form-check-label' htmlFor={inputId}>
          <input
            type='radio'
            className='form-check-input'
            name='placeSearchResults'
            id={inputId}
            value={result.place_id}
            checked={selectedId === result.place_id}
            onChange={onPlaceSelection}
          />
          <a
            href={`https://www.openstreetmap.org/${result.osm_type}/${result.osm_id}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            {result.display_name}
          </a>
        </label>
      </div>
    )
  })
)

PlaceSearchResults.propTypes = props
PlaceSearchResults.defaultProps = defaultProps
export default PlaceSearchResults
