import { fetch } from 'whatwg-fetch';
import React, { Component } from 'react';
import PlaceSearch from './PlaceSearch';

class PlaceForm extends Component {
  constructor(props) {
    super(props);
    this.trixRef = React.createRef();
    this.state = {
      selectedPlace: null,
      errors: [],
    };

    this.onPlaceSelection = this.onPlaceSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onPlaceSelection(selectedPlace) {
    this.setState({ selectedPlace });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      start_date, end_date, name, selectedPlace,
    } = this.state;

    let place = {
      start_date,
      end_date,
      note: this.trixRef.current.value,
      name,
    };

    if (selectedPlace) {
      place = Object.assign(place, {
        osm_id: selectedPlace.osm_id,
        osm_type: selectedPlace.osm_type,
      });
    }

    fetch(window.location.pathname.replace('/new', ''), {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ place }),
    }).then(results => results.json())
      .then((results) => {
        if (results.errors !== undefined) {
          const errors = Object.keys(results.errors).map(key => (
            `${key} ${results.errors[key].join(' ')}`
          ));
          this.setState(prevState => (
            { errors: prevState.errors.concat(errors) }
          ));
        } else {
          window.location.assign(results.url);
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.errors.length > 0 &&
          <div className="alert alert-warning" role="alert">
            {this.state.errors.join('\n')}
          </div>
        }
        <PlaceSearch onPlaceSelection={this.onPlaceSelection} />
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <input id="place_osm_id" type="hidden" name="place[osm_id]" />
            <input id="place_osm_type" type="hidden" name="place[osm_type]" />
            <input id="place_osm_display_name" type="hidden" name="place[osm_display_name]" />

            <div className="form-group col-md-12 col-lg-12 col-sm-12">
              <input
                className="form-control"
                placeholder="Name"
                type="text"
                name="name"
                id="place_name"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group input-group col-md-6 col-lg-6 col-sm-12">
              <div className="input-group-prepend">
                <span className="input-group-text">Start Date</span>
              </div>
              <input
                className="form-control"
                type="date"
                name="start_date"
                id="place_start_date"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group input-group col-md-6 col-lg-6 col-sm-12">
              <div className="input-group-prepend">
                <span className="input-group-text">End Date</span>
              </div>
              <input
                className="form-control"
                type="date"
                name="end_date"
                id="place_end_date"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <input ref={this.trixRef} id="place_note" type="hidden" name="note" />
          <trix-editor input="place_note" class="trix-content" placeholder="Note" />
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PlaceForm;
