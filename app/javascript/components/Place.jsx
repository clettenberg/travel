import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import PlaceCard from './PlaceCard'

class Place extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
  }

  componentDidMount() {
    axios.get(`/places/${this.props.id}.json`)
      .then(res => {
        const name = res.data.result.name
        this.setState({name: name});
    });
  }

  handleDelete = () => {
    const message = `Are you sure you want to delete ${this.state.name}?\nYou will lose ALL data related to ${this.state.name}!`

    if (window.confirm(message)) {
      this.props.onDelete(this.props.id)
    }
  }


  render() {
    if(this.props.onDelete) {
      return (
        <PlaceCard>
          <a href={`/places/${this.props.id}`} id="name">{this.state.name}</a>
          <a className="delete-place"
            onClick={this.handleDelete}>
            <i className="fas fa-minus-circle" style={{color: "#dd3645"}}></i>
          </a>
        </PlaceCard>
      )
    }

    return (
      <PlaceCard>
        <a href={`/places/${this.props.id}`} id="name">{this.state.name}</a>
      </PlaceCard>
    );
  }
}

Place.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func
};

export default Place;
