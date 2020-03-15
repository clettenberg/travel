import React from 'react'
import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'

import Map from '../Map'
import ThingsToList from '../../models/ThingToList'
import PaperList from '../shared/PaperList'

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

const Trips = ({ trips }) => {
  const points = trips.map(trip => (
    trip.places.map(place => place.point)
  )).reduce((a, b) => a.concat(b), [])
    .filter(Boolean)

  const thingsToList = trips.map(({ id, title }) => (
    new ThingsToList(`/trips/${id}`, title, id)
  ))

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
        <PaperList
          title='Trips'
          actionButtonUrl='/trips/new'
          actionButtonText='Add Trip'
          thingsToList={thingsToList}
        />
      </Paper>
    </React.Fragment>
  )
}

Trips.propTypes = propTypes
export default Trips
