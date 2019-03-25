require "vcr"

VCR.configure do |c|
  c.cassette_library_dir = "spec/cassettes"
  c.hook_into :webmock
  c.configure_rspec_metadata!
  c.ignore_localhost = true
  c.filter_sensitive_data("<API_KEY>") { ENV["MAPQUEST_API_KEY"]}
end
