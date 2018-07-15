class MapquestService
  MAPQUEST_NOMINATIM_ROOT_URL = "https://open.mapquestapi.com/nominatim/v1"

  def search(query)
    params = default_params.merge({
      q: query,
      addressdetails: 1
    })

    send_request("#{MAPQUEST_NOMINATIM_ROOT_URL}/search.php?#{params.to_query}")
  end

  def reverse(osm_id:, osm_type:)
    osm_type_code = osm_type.first.capitalize
    params = default_params.merge({
      osm_type: osm_type.first.capitalize,
      osm_id: osm_id
    })

    send_request("#{MAPQUEST_NOMINATIM_ROOT_URL}/reverse.php?#{params.to_query}")
  end

  private

  def send_request(url)
    response = Faraday.get(url)
    json_body = JSON.parse(response.body)
    if json_body.kind_of?(Array)
      json_body.map(&:deep_symbolize_keys)
    else
      json_body.deep_symbolize_keys
    end
  end

  def default_params
    {
      key: ENV['MAPQUEST_API_KEY'],
      format: 'json'
    }
  end
end
