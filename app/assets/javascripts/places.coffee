document.addEventListener "turbolinks:load", ->
  $startDatepicker = $("#place_start_date")
  $endDatepicker = $("#place_end_date")
  $startDatepicker.blur ->
    unless $endDatepicker.val()
      $endDatepicker.val $startDatepicker.val()
