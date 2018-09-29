class MapquestService
  MAPQUEST_NOMINATIM_ROOT_URL = "https://open.mapquestapi.com/nominatim/v1"

  def search(params)
    params = default_params.merge(params)

    results = client.search(params)

    results_with_indifferent_access(results)
  end

  def reverse(params)
    params = default_params.merge(params)

    results = client.reverse(params)

    results_with_indifferent_access(results)
  end

private

  def default_params
    {
      "format" => 'jsonv2',
      "accept-language" => 'en-US,en;q=0.9',
      "addressdetails" => "1",
      "polygon_geojson" => "1",
      "namedetails" => "1",
      "dedup" => "1",
    }
  end

  def client
    @client ||= Mapquest::API::Client.new
  end

  def results_with_indifferent_access(results)
    results.is_a?(Array) ? results.map(&:with_indifferent_access) : results.with_indifferent_access
  end
end
