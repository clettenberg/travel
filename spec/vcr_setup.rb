require "vcr"
require "webdrivers"

driver_hosts = (ObjectSpace.each_object(Webdrivers::Common.singleton_class).to_a - [Webdrivers::Common]).map { |driver| URI(driver.base_url).host }

VCR.configure do |c|
  c.cassette_library_dir = "spec/cassettes"
  c.hook_into :webmock
  c.configure_rspec_metadata!
  c.ignore_localhost = true
  c.allow_http_connections_when_no_cassette = true
  c.filter_sensitive_data("<API_KEY>") { ENV["MAPQUEST_API_KEY"] }
  c.ignore_hosts(*driver_hosts)
end
