FactoryBot.define do
  factory :osm_place do
    osm_id { SecureRandom.hex }
  end

  factory :place do
    osm_place

    note { FFaker::Lorem.paragraph }
    start_date { Date.today }
    end_date { Date.today + 1.day }
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
