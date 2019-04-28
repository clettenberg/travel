import React from 'react'
import PropTypes from 'prop-types'

import Map from '../Map'
import styles from './style.module.scss'

const propTypes = {
  trips: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    places: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      point: PropTypes.arrayOf(PropTypes.number)
    }))
  })).isRequired
}

const Trips = (props) => {
  const points = props.trips.map(trip => (
    trip.places.map(place => place.point)
  )).reduce((a, b) => a.concat(b), [])
    .filter(Boolean)

  return (
    <div className={styles.container} >
      <Map
        className={styles.map}
        points={points}
        center={[-98.2518834, 39.8112442]}
        zoom={1}
      />
      <div className={`${styles.trips}`}>
        <ul className={`list-group list-group-flush`}>
          {props.trips.map(trip => (
            <a
              href={`/trips/${trip.id}`}
              key={trip.id}
              className='list-group-item list-group-item-action'
            >
              {trip.title}
            </a>
          ))}
        </ul>
        <a className={`${styles.sticky} btn btn-primary`} href='/trips/new'>Add Trip</a>
      </div>
    </div>
  )
}

Trips.propTypes = propTypes
export default Trips
