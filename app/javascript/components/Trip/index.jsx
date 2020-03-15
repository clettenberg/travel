import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

import Map from '../Map'
import styles from './style.module.scss'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Divider,
  ListItemSecondaryAction,
  Button
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

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

const ListItemLink = (props) => (
  <ListItem button component='a' {...props} />
)

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white'
  },
  subheader: {
    fontSize: '1.7rem',
    padding: 0,
    '& #heading': {
      marginLeft: '10px'
    }
  }
}))

const Trip = (props) => {
  const classes = useStyles()

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
        <List
          className={classes.root}
          subheader={
            <ListSubheader component='div' className={classes.subheader}>
              <span id='heading'>{props.trip.title}</span>
              <ListItemSecondaryAction>
                <Button
                  href={`/trips/${props.trip.id}/places/new`}
                  color='primary'
                  variant='contained'
                  aria-label='new place'
                  endIcon={<AddIcon />}
                >
                  Add Place
                </Button>
              </ListItemSecondaryAction>
              <Divider />
            </ListSubheader>
          }>
          {props.trip.places.map(({ id, name }) => (
            <ListItemLink href={`/places/${id}`} key={id}>
              <ListItemText primary={name} />
            </ListItemLink>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  )
}

Trip.propTypes = propTypes
export default Trip
