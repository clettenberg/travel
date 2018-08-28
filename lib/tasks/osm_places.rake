namespace :osm_places do
  desc "sync osm places from Mapquest API"
  task sync: :environment do
    puts "Syncing #{OsmPlace.count} OsmPlaces..."
    OsmPlace.find_each do |place|
      puts "Syncing OsmPlace: #{place.id}..."
      place.sync
      puts "Finished."
    end
  end

end
