import React from 'react'
import PropTypes from 'prop-types'

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
    <div className={styles.container}>
      <Map
        className={styles.map}
        points={points}
        center={props.trip.center}
        zoom={3}
      />
      <div className={styles.trips}>
        <h1 className={styles.title}>{props.trip.title}</h1>
        <ul className={`list-group list-group-flush`}>

          {props.trip.places.map(place => (
            <a
              href={`/places/${place.id}`}
              key={place.id}
              className='list-group-item list-group-item-action'
            >
              {place.name}
            </a>
          ))}
        </ul>
        <a
          className={`${styles.sticky} btn btn-primary`}
          href={`/trips/${props.trip.id}/places/new`}
        >
          Add Place
        </a>
      </div>
    </div>
  )
}

Trip.propTypes = propTypes
export default Trip