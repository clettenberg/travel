import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

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
    <React.Fragment>
      <div className={styles.container} >
        <Map
          points={points}
          center={[-98.2518834, 39.8112442]}
          zoom={1}
        />
      </div>
      <Paper elevation={3} className={styles.content}>
        <div >
          <ul>
            {props.trips.map(trip => (
              <li key={trip.id}>
                <a
                  href={`/trips/${trip.id}`}
                >
                  {trip.title}
                </a>
              </li>
            ))}
          </ul>
          <a href='/trips/new'>Add Trip</a>
        </div>
      </Paper>
    </React.Fragment>
  )
}

Trips.propTypes = propTypes
export default Trips
