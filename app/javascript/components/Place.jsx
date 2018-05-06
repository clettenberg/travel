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

  render() {
    return (
      <PlaceCard>
        <a href={`/places/${this.props.id}`} id="name">{this.state.name}</a>
      </PlaceCard>
    );
  }
}

Place.propTypes = {
  id: PropTypes.number
};

export default Place;
