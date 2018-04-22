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
    axios.get(`/places/${this.props.id}`)
      .then(res => {
        const name = res.data.result.name
        console.log(name)
        this.setState({name: name});
      });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body d-flex justify-content-between">
          <div id="name">{this.state.name}</div>
        </div>
      </div>
    );
  }
}

Place.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Place;
