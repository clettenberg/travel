FactoryBot.define do
  factory :place do
    place_id { SecureRandom.hex }
  end

  factory :trip do
    title { FFaker::Lorem.word }
    start_date { Date.today }
    end_date { Date.today + 1.day }

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
        end

        after(:create) do |user, evaluator|
          create_list(:trip_with_places, evaluator.trips_count, users: [user])
        end
      end
    end
  end

end
