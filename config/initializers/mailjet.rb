# kindly generated by appropriated Rails generator
Mailjet.configure do |config|
  config.api_key = Travel::Application.credentials.mailjet[:api_key]
  config.secret_key = Travel::Application.credentials.mailjet[:secret_key]
  config.default_from = "notifications@cclettenberg.com"
  config.api_version = "v3.1"
end
