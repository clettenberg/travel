import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

import Map from '../Map'
import styles from './style.module.scss'

const propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    center: PropTypes.arrayOf(PropTypes.number),
    places: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      point: PropTypes.arrayOf(PropTypes.number)
    }))
  }).isRequired
}

const Trip = (props) => {
  const points = props.trip.places.map(place => place.point).filter(Boolean)

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Map
          points={points}
          center={props.trip.center}
          zoom={3}
        />
      </div>
      <Paper className={styles.content}>
        <h1 className={styles.title}>{props.trip.title}</h1>
        <ul>
          {props.trip.places.map(place => (
            <li>
              <a
                href={`/places/${place.id}`}
                key={place.id}
              >
                {place.name}
              </a>
            </li>
          ))}
        </ul>
        <a href={`/trips/${props.trip.id}/places/new`} >
          Add Place
        </a>
      </Paper>
    </React.Fragment>
  )
}

Trip.propTypes = propTypes
export default Trip
