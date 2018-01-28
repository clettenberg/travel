user = User.new(
  email:                 "user@mail.com",
  password:              "password",
  password_confirmation: "password"
)
user.skip_confirmation!
user.save!

scotland = user.trips.create(title: "Scotland")
pois = ["The Elephant House", "Arthur's Seat", "Castle", "National Musuem"].map { |poi| { title: poi } }
scotland.pois.create(pois)


south_africa = user.trips.create(title: "South Africa")
pois = ["Table Mountain", "Hout Bay", "City Centre", "Robben Island"].map { |poi| { title: poi } }
south_africa.pois.create(pois)