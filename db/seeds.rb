user = User.new(
  email:                 "user@mail.com",
  password:              "password",
  password_confirmation: "password"
)
user.skip_confirmation!
user.save!

user.trips.create(title: "Scotland",
                  start_date: Date.today,
                  end_date: Date.today + 7.days,
                  place_ids: ["ChIJIyaYpQC4h0gRJxfnfHsU8mQ"])


user.trips.create(title: "South Africa",
                  start_date: Date.today,
                  end_date: Date.today + 30.days,
                  place_ids: ["ChIJ1-4miA9QzB0Rh6ooKPzhf2g"])
