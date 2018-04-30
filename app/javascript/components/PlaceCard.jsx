import React from "react"
import PropTypes from "prop-types"
class PlaceCard extends React.Component {
  render () {
    return (
      <div className="card">
        <div className="card-body d-flex justify-content-between">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PlaceCard
