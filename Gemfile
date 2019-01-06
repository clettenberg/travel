source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.0'

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
gem 'jbuilder', '~> 2.5'
gem 'fast_jsonapi'

gem 'bootsnap', '>= 1.1.0', require: false
gem 'mapquest-api', github: 'clettenberg/mapquest-api', branch: 'master'

group :development, :test do
  gem 'pry-byebug'
  gem 'factory_bot_rails'
  gem 'awesome_print'
  gem 'ffaker'
  gem 'dotenv-rails'
end

group :test do
  gem "rspec-rails"
  gem "rspec_junit_formatter"
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'vcr'
  gem 'webmock'
end

group :development do
  gem 'letter_opener'
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'solargraph'
  gem 'foreman'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
