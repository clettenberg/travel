import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

import Map from '../Map'
import styles from './style.module.scss'
import { List, ListItem, ListItemText, Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

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

const ListItemLink = (props) => (
  <ListItem button component='a' {...props} />
)

const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}))

const Trips = (props) => {
  const classes = useStyles()

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
        <List>
          {props.trips.map(({ id, title }) => (
            <ListItemLink href={`/trips/${id}`} key={id}>
              <ListItemText primary={title} />
            </ListItemLink>
          ))}
          <Fab
            href='/trips/new'
            className={classes.fab}
            variant='extended'
            color='primary'
          >
            New Trip
            <AddIcon />
          </Fab>
        </List>
      </Paper>
    </React.Fragment>
  )
}

Trips.propTypes = propTypes
export default Trips
