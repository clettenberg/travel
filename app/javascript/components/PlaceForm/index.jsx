import { fetch } from 'whatwg-fetch'
import React, { Component } from 'react'
import PlaceSearch from '../PlaceSearch'

import styles from './style.module.scss'

import { TextField, Button, Grid, Container, Card, CardContent } from '@material-ui/core'

class PlaceForm extends Component {
  constructor (props) {
    super(props)
    this.trixRef = React.createRef()
    this.state = {
      selectedPlace: null,
      errors: [],
      end_date: ''
    }

    this.onPlaceSelection = this.onPlaceSelection.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStartDateBlur = this.handleStartDateBlur.bind(this)
  }

  onPlaceSelection (selectedPlace) {
    this.setState({ selectedPlace })
  }

  handleStartDateBlur () {
    if (this.state.start_date && !this.state.end_date) {
      this.setState(prevState => ({ end_date: prevState.start_date }))
    }
  }

  handleChange (event) {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const {
      start_date, end_date, name, selectedPlace // eslint-disable-line camelcase
    } = this.state

    let place = {
      start_date,
      end_date,
      note: this.trixRef.current.value,
      name
    }

    if (selectedPlace) {
      place = Object.assign(place, {
        osm_id: selectedPlace.osm_id,
        osm_type: selectedPlace.osm_type
      })
    }

    fetch(window.location.pathname.replace('/new', ''), {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ place })
    }).then(results => results.json())
      .then((results) => {
        if (results.errors !== undefined) {
          const errors = Object.keys(results.errors).map(key => (
            `${key} ${results.errors[key].join(' ')}`
          ))
          this.setState(prevState => (
            { errors: prevState.errors.concat(errors) }
          ))
        } else {
          window.location.assign(results.url)
        }
      })
  }

  render () {
    return (
      <Container className={styles.container}>
        <h1>Add Place</h1>
        {this.state.errors.length > 0 &&
          <div role='alert'>
            {this.state.errors.join('\n')}
          </div>}

        <PlaceSearch handlePlaceSelection={this.onPlaceSelection} />

        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={4}>
                <TextField
                  placeholder='Name'
                  type='text'
                  name='name'
                  id='place_name'
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label='Start Date'
                  type='date'
                  name='start_date'
                  id='place_start_date'
                  InputLabelProps={{
                    shrink: true
                  }}
                  onBlur={this.handleStartDateBlur}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type='date'
                  label='End Date'
                  name='end_date'
                  id='place_end_date'
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange}
                  value={this.state.end_date}
                />
              </Grid>
              <Grid item xs={12}>
                <input ref={this.trixRef} id='place_note' type='hidden' name='note' />
                <trix-editor input='place_note' class='trix-content' placeholder='Note' />
              </Grid>
            </Grid>

            <Button onClick={this.handleSubmit} type='submit' variant='contained' color='primary'>Submit</Button>
          </CardContent>
        </Card>
      </Container>
    )
  }
}

export default PlaceForm
