FactoryBot.define do
  factory :place do
    transient do
      must_be_valid_place_id false
    end
    place_id { SecureRandom.hex }
    start_date { Date.today }
    end_date { Date.today + 1.day }

    after(:create) do |place, evaluator|
      place.place_id = "ChIJj9dEC-9YdhwRTDw4wzsEnt4" if evaluator.must_be_valid_place_id
    end
  end

  factory :trip do
    title { FFaker::Lorem.word }

    factory :trip_with_places do
      transient do
        places_count 5
      end

      after(:create) do |trip, evaluator|
        create_list(:place, evaluator.places_count, trip: trip)
      end
    end

    factory :trip_with_valid_place do
      after(:create) do |trip, evaluator|
        create_list(:place, 1, must_be_valid_place_id: true, trip: trip)
      end
    end
  end

  factory :user do
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }

    factory :confirmed_user do
      confirmed_at { Time.now }

      factory :user_with_trips do
        transient do
          trips_count 5
          places_count 3
        end

        after(:create) do |user, evaluator|
          create_list(:trip_with_places, evaluator.trips_count, users: [user], places_count: evaluator.places_count)
        end
      end
    end
  end

end
