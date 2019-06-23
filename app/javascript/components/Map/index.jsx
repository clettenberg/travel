import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.MAPBOX_TOKEN

const propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  mapClassName: PropTypes.string
}

const defaultProps = {
  center: [-74.50, 40],
  zoom: 4,
  mapClassName: 'this-is-the-map'
}
class Map extends React.Component {
  componentDidMount () {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: this.props.center,
      zoom: this.props.zoom,
      style: 'mapbox://styles/mapbox/streets-v9',
      pitchWithRotate: false
    })

    this.props.points.map(point => (
      new mapboxgl.Marker()
        .setLngLat(point)
        .addTo(this.map)
    ))
  }

  componentWillUnmount () {
    this.map.remove()
  }

  render () {
    return (
      <div
        className={this.props.mapClassName}
        ref={(el) => { this.mapContainer = el }}
      />
    )
  }
}

Map.propTypes = propTypes
Map.defaultProps = defaultProps

export default Map
