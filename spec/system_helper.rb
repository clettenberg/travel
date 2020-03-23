require "rails_helper"
require "capybara/rails"

Dir[Rails.root.join("spec", "support", "system", "**", "*.rb")].sort.each { |f| require f }
