import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
      <div className="card">
        <div className="card-body d-flex justify-content-between">
          <a href={`/places/${this.props.id}`} id="name">{this.state.name}</a>
        </div>
      </div>
    );
  }
}

Place.propTypes = {
  id: PropTypes.number.isRequired
};

export default Place;
