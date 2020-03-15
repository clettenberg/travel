import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

import Map from '../Map'
import PaperList from '../shared/PaperList'
import ThingToList from '../../models/ThingToList'

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

const Trip = ({ trip }) => {
  const points = trip.places.map(place => place.point).filter(Boolean)
  const thingsToList = trip.places.map(({ id, name }) => (
    new ThingToList(`/places/${id}`, name, id)
  ))

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Map
          points={points}
          center={trip.center}
          zoom={3}
        />
      </div>
      <Paper className={styles.content}>
        <PaperList
          title={trip.title}
          actionButtonUrl={`/trips/${trip.id}/places/new`}
          actionButtonText='Add Place'
          thingsToList={thingsToList}
        />
      </Paper>
    </React.Fragment>
  )
}

Trip.propTypes = propTypes
export default Trip
