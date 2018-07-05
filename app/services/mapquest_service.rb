class MapquestService
  def search(query)
    url = "https://open.mapquestapi.com/nominatim/v1/search.php?key=#{ENV['MAPQUEST_API_KEY']}&format=json&q=#{query}&addressdetails=1"
    response = Faraday.get(url)
    JSON.parse(response.body).map(&:deep_symbolize_keys)
  end
end
