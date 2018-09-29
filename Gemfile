source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'rails', '~> 5.2.0'

gem 'pg', '~> 0.18'
gem 'activerecord-postgis-adapter'

gem 'puma', '~> 3.11'

gem 'devise'
gem 'mailjet'

gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'react-rails'

gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'fast_jsonapi'

gem 'bootsnap', '>= 1.1.0', require: false
gem 'mapquest-api', github: 'clettenberg/mapquest-api', branch: 'master'

group :development, :test do
  gem 'pry-byebug'
  gem 'factory_bot_rails'
  gem "rspec-rails"
  gem "rspec_junit_formatter"
  gem 'capybara', '~> 2.15'
  gem "capybara-webkit"
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'awesome_print'
  gem 'ffaker'
  gem 'vcr'
  gem 'webmock'
  gem 'dotenv-rails'
end

group :development do
  gem 'letter_opener'
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'solargraph'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
