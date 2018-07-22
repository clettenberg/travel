document.addEventListener "turbolinks:load", ->
  $startDatepicker = $("#place_start_date")
  $endDatepicker = $("#place_end_date")
  $startDatepicker.blur ->
    unless $endDatepicker.val()
      $endDatepicker.val $startDatepicker.val()

  $('.mapquest-search').on 'submit', ->
    loadingIndicator = """
                        <div class="list-group mapquest-search-results">
                          <li class="list-group-item">
                            <span class="font-weight-bold">searching</span> <i class="fas fa-spinner fa-pulse"></i>
                          </li>
                        </div>
                       """
    $('.mapquest-search-results-wrapper').html loadingIndicator

clearNewPlaceForm = ->
  $(".mapquest-search-results").remove()
  $(":input", ".mapquest-search").val('')
  $(":input", "#new_place_form").val('')
  $("trix-editor", "#new_place_form").val('')

document.addEventListener "turbolinks:before-cache", ->
  clearNewPlaceForm()
