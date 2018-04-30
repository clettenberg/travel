import _ from 'lodash';
import React from "react"
import PropTypes from "prop-types"
import PlaceSearch from "./PlaceSearch"
import Place from './Place'

class PlacesForm extends React.Component {
  componentWillMount() {
    this.setState({
      placeIds: this.props.placeIds,
    });
  }

  handlePlacesChanged = (e) => {
    const placeIds = _.map(e, 'place_id');

    this.setState((prevState) => {
      return { placeIds: _.union(placeIds, prevState.placeIds) }
    });
  }

  render () {
    return (
      <div>
        <PlaceSearch handlePlacesChanged={this.handlePlacesChanged}/>
        {this.state.placeIds.map((id, index) =>
          <div key={id}>
            <input type="hidden" name={`trip[places_attributes][${index}][place_id]`} value={id}></input>
            <Place placeId={id} />
          </div>
        )}
      </div>
    );
  }
}

PlacesForm.propTypes = {
  placeIds: PropTypes.array
};
export default PlacesForm
