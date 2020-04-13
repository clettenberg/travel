import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Paper from '@material-ui/core/Paper'

import Map from '../Map'
import PaperList from '../shared/PaperList'
import ThingToList from '../../models/ThingToList'

import styles from './style.module.scss'

const propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    places: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      point: PropTypes.arrayOf(PropTypes.number).isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired
    }))
  }).isRequired
}

const Trip = ({ trip }) => {
  const points = trip.places.map(place => place.point).filter(Boolean)
  const thingsToList = trip.places
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .map(({ id, name, startDate, endDate }) => (
      new ThingToList(
        `/places/${id}`,
        name,
        id,
        `${format(new Date(startDate), 'MM/dd/yyyy')} - ${format(new Date(endDate), 'MM/dd/yyyy')}`
      )
    ))

  return (
    <>
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
    </>
  )
}

Trip.propTypes = propTypes
export default Trip
