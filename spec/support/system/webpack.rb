require 'English'

RSpec.configure do |config|
  config.before :suite do
    `bin/webpack`
    raise "An error occurred while running `bin/webpack`" unless $CHILD_STATUS.success?
    Webpacker.instance.manifest.refresh
  end
end
