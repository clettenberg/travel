class MapquestService
  MAPQUEST_NOMINATIM_ROOT_URL = "https://open.mapquestapi.com/nominatim/v1"

  def search(query)
    params = default_params.merge({
      q: query,
      addressdetails: 1
    }).to_query

    send_request("#{MAPQUEST_NOMINATIM_ROOT_URL}/search.php?#{params}")
  end

  def reverse(params)
    params[:osm_type] = params[:osm_type]&.first.capitalize
    params = default_params.merge(params).to_query

    resp = send_request("#{MAPQUEST_NOMINATIM_ROOT_URL}/reverse.php?#{params}")
  end

  private

  def send_request(url)
    response = Faraday.get(url)
    if response.success?
      json_body = JSON.parse(response.body)
      if json_body.kind_of?(Array)
        json_body.map(&:deep_symbolize_keys)
      else
        json_body.deep_symbolize_keys
      end
    else
      { errors: response.body }
    end
  end

  def default_params
    {
      "key" => ENV['MAPQUEST_API_KEY'],
      "format" => 'jsonv2',
      "accept-language" => 'en-US,en;q=0.9',
      "addressdetails" => "1",
      "polygon_geojson" => "1",
      "namedetails" => "1",
      "dedup" => "1",
    }
  end
end
