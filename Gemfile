source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.2"

gem "rails", "~> 6.0"

gem "pg", "~> 1.2"
gem "activerecord-postgis-adapter"

gem "puma", "~> 5.5"

gem "devise"
gem "mailjet"

gem "sass-rails", "~> 6"
gem "uglifier", ">= 1.3.0"
gem "webpacker", ">= 4.0"
gem "webpacker-react", "~> 0.3.2"

gem "jbuilder", "~> 2.11"
gem "fast_jsonapi"

gem "bootsnap", ">= 1.4.2", require: false
gem "mapquest-api", github: "clettenberg/mapquest-api", branch: "master"

group :development, :test do
  gem "pry-byebug"
  gem "factory_bot_rails"
  gem "awesome_print"
  gem "ffaker"
  gem "dotenv-rails"
  gem "standard"
end

group :test do
  gem "rspec-rails", "~> 5.0.1"
  gem "rspec_junit_formatter"
  gem "capybara"
  gem "webdrivers"
  gem "vcr"
  gem "webmock"
end

group :development do
  gem "letter_opener"
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.6"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "foreman"
end
