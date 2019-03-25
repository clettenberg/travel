require "rails_helper"
require "capybara/rails"

Dir[Rails.root.join("spec", "support", "system", "**", "*.rb")].each { |f| require f }
