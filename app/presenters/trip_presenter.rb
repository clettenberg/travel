class TripPresenter
  def initialize(trip)
    @trip = trip
  end

  def to_h
    places = @trip.places.map { |place|
      {
        id: place.id,
        name: place.name,
        point: place.point,
        note: place.note
      }
    }

    {id: @trip.id, title: @trip.title, places: places, center: @trip.center}
  end
end

#  trips: PropTypes.shape({
#     title: PropTypes.string.isRequired,
#     places: PropTypes.arrayOf(PropTypes.shape({
#       name: PropTypes.string.isRequired,
#       point: PropTypes.arrayOf(PropTypes.number).isRequired,
#     })),
#   }).isRequired,
