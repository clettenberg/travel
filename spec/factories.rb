FactoryBot.define do
  factory :trip do
    title { FFaker::Lorem.word }
    start_date { Date.today }
    end_date { Date.today + 1.day }
  end

  factory :poi do
    title { FFaker::Lorem.word }
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
          create_list(:trip, evaluator.trips_count, users: [user])
        end
      end
    end
  end

end