import React from 'react'
import PropTypes from 'prop-types'

import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Divider,
  makeStyles,
  IconButton
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
    fontSize: '1.3rem',
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
          <div id='heading'>{title}</div>
          <ListItemSecondaryAction>
            <IconButton
              color='primary'
              href={actionButtonUrl}
              aria-label={actionButtonText}
            >
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
          <Divider />
        </ListSubheader>
      }
    >
      {thingsToList.map(({ url, title, id, date }) => (
        <ListItemLink href={url} key={id}>
          <ListItemText primary={title} secondary={date} />
        </ListItemLink>
      ))}
    </List>
  )
}

PaperList.propTypes = propTypes
export default PaperList
