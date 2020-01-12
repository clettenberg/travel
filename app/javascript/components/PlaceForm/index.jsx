import { fetch } from 'whatwg-fetch'
import React, { Component } from 'react'
import PlaceSearch from '../PlaceSearch'

import styles from './style.module.scss'

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
      <div className={styles.container}>
        <h1>Add Place</h1>
        {this.state.errors.length > 0 &&
          <div role='alert'>
            {this.state.errors.join('\n')}
          </div>
        }
        <PlaceSearch onPlaceSelection={this.onPlaceSelection} />
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <input
                placeholder='Name'
                type='text'
                name='name'
                id='place_name'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <div>
                <span>Start Date</span>
              </div>
              <input
                type='date'
                name='start_date'
                id='place_start_date'
                onBlur={this.handleStartDateBlur}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <div>
                <span>End Date</span>
              </div>
              <input
                type='date'
                name='end_date'
                id='place_end_date'
                onChange={this.handleChange}
                value={this.state.end_date}
              />
            </div>
          </div>

          <div>
            <input ref={this.trixRef} id='place_note' type='hidden' name='note' />
            <trix-editor input='place_note' class='trix-content' placeholder='Note' />
          </div>

          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default PlaceForm
