class GooglePlaceService
  class NoPlaceFoundError < StandardError; end

  class << self
    def get_details(place_id)
      token = ENV['GOOGLE_PLACES_API_KEY']
      base_url = "https://maps.googleapis.com/maps/api/place/details/json"
      url = "#{base_url}?placeid=#{place_id}&key=#{token}"
      responseJSON = get_place_info_from_google(url)

      raise GooglePlaceService::NoPlaceFoundError unless responseJSON["status"] == 'OK'

      responseJSON
    end

    private

    def get_place_info_from_google(web_address)
      url = URI(web_address)
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(url)

      response = http.request(request)
      JSON.parse(response.body)
    end
  end

end
