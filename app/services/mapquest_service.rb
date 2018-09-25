class MapquestService
  MAPQUEST_NOMINATIM_ROOT_URL = "https://open.mapquestapi.com/nominatim/v1"

  def search(query)
    params = default_params.merge({
      q: query,
      addressdetails: 1
    })

    client = Mapquest::API::Client.new
    results = client.search(params)
    results.map(&:deep_symbolize_keys)
  end

  def reverse(params)
    params[:osm_type] = params[:osm_type]&.first.capitalize
    params = default_params.merge(params).to_query

    resp = send_request("#{MAPQUEST_NOMINATIM_ROOT_URL}/reverse.php?#{params}")
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
end
