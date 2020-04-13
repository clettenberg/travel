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
        note: place.note,
        startDate: place.start_date,
        endDate: place.end_date
      }
    }

    {
      id: @trip.id,
      title: @trip.title,
      places: places,
      center: @trip.center,
      startDate: @trip.start_date,
      endDate: @trip.end_date
    }
  end
end
