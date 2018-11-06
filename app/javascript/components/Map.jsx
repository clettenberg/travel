import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

class Map extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: this.props.center,
      zoom: 4,
      style: 'mapbox://styles/mapbox/streets-v9',
      pitchWithRotate: false,
    });

    this.props.points.map(point => (
      new mapboxgl.Marker()
        .setLngLat(point)
        .addTo(this.map)
    ));
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: 'relative',
      top: 0,
      bottom: 0,
      width: '100%',
      height: '400px',
    };

    return <div style={style} ref={(el) => { this.mapContainer = el; }} />;
  }
}

Map.defaultProps = {
  center: [-74.50, 40],
};

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
};

export default Map;