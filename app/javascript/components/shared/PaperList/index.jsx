import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Divider,
  makeStyles
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ThingToList from '../../../models/ThingToList'

const propTypes = {
  title: PropTypes.string.isRequired,
  actionButtonUrl: PropTypes.string.isRequired,
  thingsToList: PropTypes.arrayOf(PropTypes.instanceOf(ThingToList))
}

const ListItemLink = (props) => (
  <ListItem button component='a' {...props} />
)

const useStyles = makeStyles({
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
})

const PaperList = ({ title, actionButtonUrl, actionButtonText, thingsToList }) => {
  const classes = useStyles()
  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component='div' className={classes.subheader}>
          <span id='heading'>{title}</span>
          <ListItemSecondaryAction>
            <Button
              href={actionButtonUrl}
              color='primary'
              variant='contained'
              aria-label={actionButtonText}
              endIcon={<AddIcon />}
            >
              {actionButtonText}
            </Button>
          </ListItemSecondaryAction>
          <Divider />
        </ListSubheader>
      }>
      {thingsToList.map(({ url, title, id }) => (
        <ListItemLink href={url} key={id}>
          <ListItemText primary={title} />
        </ListItemLink>
      ))}
    </List>
  )
}

PaperList.propTypes = propTypes
export default PaperList
