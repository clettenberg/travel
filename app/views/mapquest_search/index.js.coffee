selectPlace = (e) ->
  $place = $(e.currentTarget)
  $place.addClass('border-success')

  $notSelectedPlaces = $('.mapquest-search-result:not(.border-success)')
  $notSelected.remove() for $notSelected in $notSelectedPlaces

  osmId = $place.data('osmId')
  osmType = $place.data('osmType')
  osmDisplayName = $place.data('osmDisplayName')

  $("#new_place_form #place_osm_id").val(osmId)
  $("#new_place_form #place_osm_type").val(osmType)
  $("#new_place_form #place_osm_display_name").val(osmDisplayName)

addSelectPlaceOnClickEvent = (element) ->
  $(element).on('click', selectPlace)

$('.mapquest-search-results-wrapper')
  .html("<%= escape_javascript (render partial: 'results', locals: { places: @places }) %>")

addSelectPlaceOnClickEvent element for element in $('.mapquest-search-result')
